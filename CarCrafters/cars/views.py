from django.shortcuts import render
import json
import os
from django.conf import settings

def index(request):
    return render(request, 'index.html')

def gallery(request):
    # load car data
    cars_file = os.path.join(settings.BASE_DIR, 'static', 'data', 'cars.json')
    try:
        with open(cars_file, 'r') as f:
            cars_data = json.load(f)
    except:
        cars_data = []
    
    return render(request, 'gallery.html', {'cars': cars_data})

def car_detail(request, car_id=None):
    # load specific car data
    cars_file = os.path.join(settings.BASE_DIR, 'static', 'data', 'cars.json')
    try:
        with open(cars_file, 'r') as f:
            cars_data = json.load(f)
        
        car = None
        if car_id:
            car = next((c for c in cars_data if c.get('id') == int(car_id)), None)
        
        if not car and cars_data:
            car = cars_data[0]  # default to first car
            
    except:
        car = None
    
    return render(request, 'car_detail.html', {'car': car})

def custom_404(request, exception):
    return render(request, 'error.html', status=404)