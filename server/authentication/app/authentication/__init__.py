from flask import Blueprint

authen = Blueprint('authen', __name__)

from app.authentication import routes