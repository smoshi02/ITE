from django.urls import path
from django_act2_app import views
from rest_framework.routers import DefaultRouter
from .views import TodoListViewSets


#path('', views.renderIndex),
#path('addUserWithHash', views.AddUserWithHash),  # Register calls this
#path('login', views.Authenticate),     
#path('website/', )          # Login calls this
    #path('addTodo/', views.addTodo),
    #path('getTodo/', views.readTodo),
    #path('deleteTodo/<int:id>/', views.deleteTodo),
    #path('updateTodo/<int:id>/', views.updateTodo),
router = DefaultRouter()
router.register('todolists', TodoListViewSets)
urlpatterns = router.urls