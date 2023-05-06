from flask import request, jsonify, session
from flask_jwt_extended import create_access_token
from app.authentication import authen
from werkzeug.security import check_password_hash, generate_password_hash

@authen.route('/login', methods=['POST'])
def login():
    login_data = request.get_json()
    email = login_data.get('email')
    password = login_data.get('password')    

    user = User.query.filter_by(email=email).first()    

    if not user:
        return {
            "message": "Email does not exist!"
        }, 401
    if 'login_attempts' not in session:
        session['login_attempts'] = 1
    if not check_password_hash(user.password, password):    
        session['login_attempts'] += 1
        if session['login_attempts'] > 3:
            return {
                "message": "Password is incorrect! You've logged in more than 3 times wrongly!"
            }, 403
        
        return {
            "message": "Password is incorrect!"
        }, 401
    
    session.pop('login_attemps', None)
    if 'name' not in session:
        session['name'] = user.name
    access_token = create_access_token(identity=user.name)
    return {
        "access_token": access_token
    }