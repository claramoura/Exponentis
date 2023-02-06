from django.urls import path

from . import views

urlpatterns = [
    path('user/signin', views.MyTokenViewBase.as_view(), name='token_view_base'),
    path('user/signup', views.registerUser, name='signup'),
    path('user/submissions', views.submitPractice, name='submissions'),
    path('users', views.getUsers, name='users'),
    path('user/<str:id>', views.getUser, name='user'),
    path('courses', views.getCourses, name='courses'),
    path('course/<str:id>', views.getCourse, name='course'),
    path('graphs', views.getGraphs, name='graphs'),
    path('graph/<str:id>', views.getGraph, name='graph'),
    path('images', views.getImages, name='images'),
    path('image/<str:id>', views.getImage, name='image'),
    path('lessons', views.getLessons, name='lessons'),
    path('unit/<str:unitId>', views.getUnitLessons, name='unitLessons'),
    path('lesson/<str:id>', views.getLesson, name='lesson'),
    path('examples', views.getExamples, name='examples'),
    path('example/<str:id>', views.getExample, name='example'),
    path('exercises', views.getExercises, name='exercises'),
    path('exercise/<str:id>', views.getExercise, name='exercise'),
]