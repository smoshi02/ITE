from django.db import models

# Create your models here.
class Player(models.Model):
    name = models.CharField(max_length=100)
    email = models.EmailField(unique=True)
    birth_date = models.DateField(null=True, blank=True)

class TodoList(models.Model):
    title = models.CharField(max_length=100)
    description = models.CharField(max_length=100)
    status = models.BooleanField(default=False)

class Users(models.Model):
    username = models.CharField(max_length=100)
    password = models.CharField(max_length=100)