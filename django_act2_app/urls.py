from django.urls import path
from django_act2_app import views

urlpatterns = [
    path('', views.renderIndex),
    path('addTodo/', views.addTodo),                 
    path('getTodo/', views.readTodo),               
    path('deleteTodo/<int:id>/', views.deleteTodo), 
    path('updateTodo/<int:id>/', views.updateTodo)  
]