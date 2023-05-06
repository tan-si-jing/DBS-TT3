import os

basedir = os.path.abspath(os.path.dirname(__file__))

class Config(object):
    DEBUG = False
    SQLALCHEMY_DATABASE_URI = 'postgresql://umer2:232423@localhost:5432/mydb'
    SECRET_KEY = b'_5#y2L"F4Q8z\n\xec]/'

class DevConfig(Config):
    ENV = "development"
    DEBUG = True
    SQLALCHEMY_TRACK_MODIFICATIONS = False

# class ProdConfig(Config):
#     """Production config."""
#     FLASK_ENV = "production"
#     FLASK_DEBUG = False