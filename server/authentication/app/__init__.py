from flask import Flask
from flask_jwt_extended import JWTManager
# from flask_session import Session
import config
# from app.models import User

def create_app(configuration):
    app = Flask(__name__)
    app.config.from_object(configuration)

    # from authen.models import db
    # db.init_app(app)

    # Session(app)

    jwt = JWTManager(app)

    # @jwt.user_identity_loader
    # def user_identity_lookup(user):
    #     return user.id

    # @jwt.user_lookup_loader
    # def user_lookup_callback(_jwt_header, jwt_data):
    #     identity = jwt_data["sub"]
    #     return User.query.filter_by(id=identity).one_or_none()
    
    """
    The above 2 blocks of code allow the current user to be serialized as json objects
    """

    from app.authentication import authen
    app.register_blueprint(authen)

    return app

app = create_app(config.DevConfig)