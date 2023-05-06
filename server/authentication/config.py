import os

from datetime import timedelta

basedir = os.path.abspath(os.path.dirname(__file__))

class Config(object):
    DEBUG = False
    SQLALCHEMY_DATABASE_URI = 'mysql://root:232423@localhost:3306/claimsystem'
    # SECRET_KEY = b'_5#y2L"F4Q8z\n\xec]/'
    # SESSION_PERMANENT = False
    # SESSION_TYPE = "filesystem"
    JWT_SECRET_KEY = 'some_password'
    JWT_ACCESS_TOKEN_EXPIRES = timedelta(minutes=2)

class DevConfig(Config):
    ENV = "development"
    DEBUG = True
    SQLALCHEMY_TRACK_MODIFICATIONS = False

# class ProdConfig(Config):
#     """Production config."""
#     FLASK_ENV = "production"
#     FLASK_DEBUG = False