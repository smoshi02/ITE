from django.shortcuts import render, redirect
from django.http import JsonResponse
from .models import TodoList
from django.views.decorators.csrf import csrf_exempt
import json


# Get API details
def renderIndex(request):
    details = list(ApiDetails.objects.all().values())
    return JsonResponse({"message": details})


# Add API user
@csrf_exempt
def fetchFromForm(request):
    if request.method == "POST":
        data = json.loads(request.body)

        username = data.get("username")
        password = data.get("password")

        ApiDetails.objects.create(
            username=username,
            password=password
        )

        return JsonResponse({
            "username": username,
            "password": password
        })


# Add Todo
@csrf_exempt
def addTodo(request):
    if request.method == "POST":
        data = json.loads(request.body)

        title = data.get("title")
        desc = data.get("description")
        status = data.get("status")

        TodoList.objects.create(
            title=title,
            description=desc,
            status=status
        )

        return JsonResponse({"message": "Added successfully"})


# Read all todos
def readTodo(request):
    if request.method == "GET":

        todolists = list(TodoList.objects.all().values())

        return JsonResponse({"lists": todolists})


# Delete todo
@csrf_exempt
def deleteTodo(request, id):
    if request.method == "POST":

        TodoList.objects.filter(id=id).delete()

        return JsonResponse({"message": "Deleted Successfully"})
    
@csrf_exempt
def updateTodo(request, id):
    if request.method == "POST":
        data = json.loads(request.body)

        TodoList.objects.filter(id=id).update(
            title=data.get("title"),
            description=data.get("description"),
            status=data.get("status")
        )

        return JsonResponse({"message": "Updated Successfully"})