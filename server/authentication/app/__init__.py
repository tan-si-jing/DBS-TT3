from flask import Flask
from flask_jwt_extended import JWTManager
from flask_jwt_extended import create_access_token
from flask_jwt_extended import get_jwt
from flask_jwt_extended import get_jwt_identity
from flask_jwt_extended import set_access_cookies
from datetime import timezone, datetime, timedelta
from app.models import Employee
from flask_cors import CORS

# from flask_session import Session
import config

def create_app(configuration):
    app = Flask(__name__)
    app.config.from_object(configuration)

    CORS(app)
    from app.models import db
    db.init_app(app)

    # Session(app)

    jwt = JWTManager(app)

    @jwt.user_identity_loader
    def user_identity_lookup(user):
        return user.EmployeeID

    @jwt.user_lookup_loader
    def user_lookup_callback(_jwt_header, jwt_data):
        identity = jwt_data["sub"]
        return Employee.query.filter_by(EmployeeID=identity).one_or_none()

    # Using an `after_request` callback, we refresh any token that is within 1
    # minutes of expiring.
    @app.after_request
    def refresh_expiring_jwts(response):
        try:
            exp_timestamp = get_jwt()["exp"]
            now = datetime.now(timezone.utc)
            print('refreshing token')
            target_timestamp = datetime.timestamp(now + timedelta(minutes=1))
            if target_timestamp > exp_timestamp:
                access_token = create_access_token(identity=get_jwt_identity())
                set_access_cookies(response, access_token)
            return response
        except (RuntimeError, KeyError):
            return response
    

    from app.authentication import authen
    app.register_blueprint(authen)

    return app

app = create_app(config.DevConfig)