from flask import request, jsonify, session
from flask_jwt_extended import create_access_token
from flask_jwt_extended import jwt_required
from flask_jwt_extended import set_access_cookies 
from flask_jwt_extended import unset_jwt_cookies
from app.authentication import authen
from werkzeug.security import check_password_hash
from app.models import Employee

@authen.route('/auth/login', methods=['POST'])
def login():
    login_data = request.get_json()
    employee_id = login_data.get('username')
    password = login_data.get('password')  

    user = Employee.query.filter_by(EmployeeID=employee_id).first()    

    if not user:
        return {
            "message": "Employee ID does not exist!"
        }, 401
    if user.Password != password:    
        return {
            "message": "Password is incorrect!"
        }, 401
    
    response = jsonify({"message": "login successful"})
    access_token = create_access_token(identity=user)
    set_access_cookies(response, access_token)
    return response, 200

@authen.route('/auth/logout')
@jwt_required()
def logout():
    response = jsonify({"message": "logout successful"})
    unset_jwt_cookies(response)
    return response, 200
