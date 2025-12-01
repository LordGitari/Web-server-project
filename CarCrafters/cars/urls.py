from django.urls import path
from . import views

urlpatterns = [
    path('', views.index, name='index'),
    path('gallery/', views.gallery, name='gallery'),
    path('car/<int:car_id>/', views.car_detail, name='car_detail'),
    path('car/', views.car_detail, name='car_detail_default'),
]