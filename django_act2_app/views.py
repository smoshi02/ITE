from django.shortcuts import render, redirect
from django.http import JsonResponse
from .models import TodoList, Users
from django.contrib.auth.hashers import make_password, check_password
from django.views.decorators.csrf import csrf_exempt
import json
from rest_framework import  viewsets
from .serializers import TodoListSerializer

# def renderIndex(request):
#     return JsonResponse({"message": "API is running"})


# # ── Register ──────────────────────────────────────────────────────────────────
# # React sends: application/x-www-form-urlencoded  { username, password }
# # Returns: 200 OK on success, 409 if username taken
@csrf_exempt
def AddUserWithHash(request):
    if request.method == "POST":
        username = request.POST.get('username')
        password = request.POST.get('password')

        if not username or not password:
            return JsonResponse({"error": "Missing fields"}, status=400)

        if Users.objects.filter(username=username).exists():
            return JsonResponse({"error": "Username already taken"}, status=409)

        hashed_password = make_password(password)
        Users.objects.create(username=username, password=hashed_password)

        return JsonResponse({"message": "Registered successfully"}, status=200)

    return JsonResponse({"error": "Method not allowed"}, status=405)


# # ── Login ─────────────────────────────────────────────────────────────────────
# # React sends: application/json  { username, password }
# # Returns: 200 OK on success, 401 on bad credentials
@csrf_exempt
def Authenticate(request):
    if request.method == "POST":
        try:
            data = json.loads(request.body)
            username = data.get('username')
            password = data.get('password')
        except Exception:
            return JsonResponse({"error": "Invalid request body"}, status=400)

        try:
            user = Users.objects.get(username=username)
        except Users.DoesNotExist:
            return JsonResponse({"error": "Invalid credentials"}, status=401)

        if check_password(password, user.password):
            return JsonResponse({"message": "Login successful"}, status=200)
        else:
            return JsonResponse({"error": "Invalid credentials"}, status=401)

    return JsonResponse({"error": "Method not allowed"}, status=405)


# # ── Todo CRUD ─────────────────────────────────────────────────────────────────
# @csrf_exempt
# def addTodo(request):
#     if request.method == "POST":
#         data = json.loads(request.body)
#         TodoList.objects.create(
#             title=data.get("title"),
#             description=data.get("description"),
#             status=data.get("status"),
#         )
#         return JsonResponse({"message": "Added successfully"})


# def readTodo(request):
#     if request.method == "GET":
#         todolists = list(TodoList.objects.all().values())
#         return JsonResponse({"lists": todolists})


# @csrf_exempt
# def deleteTodo(request, id):
#     if request.method == "POST":
#         TodoList.objects.filter(id=id).delete()
#         return JsonResponse({"message": "Deleted Successfully"})


# @csrf_exempt
# def updateTodo(request, id):
#     if request.method == "POST":
#         data = json.loads(request.body)
#         TodoList.objects.filter(id=id).update(
#             title=data.get("title"),
#             description=data.get("description"),
#             status=data.get("status"),
#         )
#         return JsonResponse({"message": "Updated Successfully"})

class TodoListViewSets(viewsets.ModelViewSet):
    queryset=TodoList.objects.all()
    serializer_class=TodoListSerializer