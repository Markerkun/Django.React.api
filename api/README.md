# Simple REST API
```
py --version
py -m venv .venv
```

## Activate venv
```
.venv\Scripts\activate.bat
python.exe -m pip install --upgrade pip
py -m pip install django
pip freeze > requirements.txt
python -m django --version
django-admin startproject atbapi
cd atbapi
py manage.py runserver 4099
```


## Install Postgres
```
pip install psycopg2-binary
py manage.py migrate
```

## Add CustomUser
```
py manage.py startapp users
pip install -r requirements.txt
py -m pip install Pillow

py manage.py makemigrations users
py manage.py migrate
py manage.py runserver 4099
```

## Options REST API
```
pip install djangorestframework
pip install drf-spectacular
pip install django-cors-headers
pip install djangorestframework_simplejwt
```

## Clone Project
```
git clone https://github.com/novakvova/Python-PD411.git
cd Python-PD411
cd api
py -m venv .venv
.venv\Scripts\activate.bat

python.exe -m pip install --upgrade pip
pip install -r requirements.txt
cd atbapi
py manage.py migrate
py manage.py runserver 4099
```


