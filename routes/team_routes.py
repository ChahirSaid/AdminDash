from flask import jsonify, request, session
from models import db, TeamMember
from . import team_bp
from datetime import datetime
from werkzeug.security import generate_password_hash, check_password_hash
import random
import string, secrets


def get_current_user(username):
    if 'username' in session:
        username = session['username']
        user = TeamMember.query.filter_by(username=username).first()
        return user
    else:
        return None


def generate_unique_username(employee_name):
    username = employee_name.lower().replace(" ", "")
    existing_user = TeamMember.query.filter_by(employeeName=employee_name).first()
    if existing_user:
        username += ''.join(random.choices(string.ascii_lowercase + string.digits, k=4))
    return username


def generate_random_password():
    alphabet = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789'
    password = ''.join(secrets.choice(alphabet) for i in range(10))
    return password


@team_bp.route('', methods=['GET'])
def get_team_members():
    t_members = TeamMember.query.all()
    t_members_list = []
    for member in t_members:
        t_members_list.append({
            'id': member.id,
            'name': member.employeeName,
            'age': member.employeeAge,
            'city': member.employeeCity,
            'email': member.employeeEmail,
            'phone': member.employeePhone,
            'post': member.employeePost,
            'start_date': member.startDate.strftime('%Y-%m-%d')
        })
    return jsonify(t_members_list)


@team_bp.route('/<int:id>', methods=['GET'])
def get_team_member(id):
    member = TeamMember.query.get_or_404(id)
    return jsonify({
        'id': member.id,
        'name': member.employeeName,
        'age': member.employeeAge,
        'city': member.employeeCity,
        'email': member.employeeEmail,
        'phone': member.employeePhone,
        'post': member.employeePost,
        'start_date': member.startDate
    })


@team_bp.route('', methods=['POST'])
def create_team_member():
    data = request.json
    username = generate_unique_username(data['employeeName'])
    password = generate_random_password()
    password_hash = generate_password_hash(password)
    start_date = datetime.strptime(data['startDate'], '%Y-%m-%d').date()
    n_member = TeamMember(
        username=username,
        password_hash=password_hash,
        employeeName=data['employeeName'],
        employeeAge=data['employeeAge'],
        employeeCity=data['employeeCity'],
        employeeEmail=data['employeeEmail'],
        employeePhone=data['employeePhone'],
        employeePost=data['employeePost'],
        startDate=start_date
    )
    db.session.add(n_member)
    db.session.commit()
    return jsonify({
        'message': 'Team Member Created Successfully',
        'username': username,
        'password': password
    }), 201


@team_bp.route('/<int:id>', methods=['DELETE'])
def delete_team_member(id):
    member = TeamMember.query.get_or_404(id)
    db.session.delete(member)
    db.session.commit()

    remaining_members = TeamMember.query.all()
    for idx, rem_member in enumerate(remaining_members):
        rem_member.id = idx + 1
    db.session.commit()
    return jsonify({'message': 'Team Member Deleted Successfully'}), 200


@team_bp.route('/update_password', methods=['PUT'])
def update_passwd_member():
    print("Request received for updating password")
    if 'username' not in session:
        print("User not authenticated")
        return jsonify({'message': 'User not authenticated'}), 401
    data = request.json

    old_password = data.get('oldPassword')
    new_password = data.get('newPassword')

    current_user = get_current_user(session['username'])
    if not current_user:
        print("Current user not found")
        return jsonify({'message': 'User not found'}), 404

    if not check_password_hash(current_user.password_hash, old_password):
        print("Incorrect old password")
        return jsonify({'message': 'Incorrect old password'}), 401

    current_user.password_hash = generate_password_hash(new_password)
    db.session.commit()
    print("Password updated successfully")
    return jsonify({'message': 'Password Updated Successfully'}), 200

@team_bp.route('/<int:id>', methods=['PUT'])
def update_team_member(id):
    member = TeamMember.query.get_or_404(id)
    data = request.json
    member.employeeName = data['employeeName']
    member.employeeAge = data['employeeAge']
    member.employeeCity = data['employeeCity']
    member.employeeEmail = data['employeeEmail']
    member.employeePhone = data['employeePhone']
    member.employeePost = data['employeePost']
    member.startDate = datetime.strptime(data['startDate'], '%Y-%m-%d').date()
    db.session.commit()
    return jsonify({'message': 'Team Member Updated Successfully'})
