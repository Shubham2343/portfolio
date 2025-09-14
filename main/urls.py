from django.urls import path
from . import views

urlpatterns = [
    path('', views.home, name='home'),
    path('services/', views.services, name='services'),
    path('projects/', views.projects, name='projects'),
    path('contact/', views.contact, name='contact'),
    path('track-project/<str:project_name>/', views.track_project_view, name='track_project'),
]

