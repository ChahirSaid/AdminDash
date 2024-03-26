from flask import jsonify, request
from models import db, TeamMember
from . import team_bp
from datetime import datetime

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
        'start_date': member.startDate.strftime('%Y-%m-%d')
    })


@team_bp.route('', methods=['POST'])
def create_team_member():
    data = request.json
    start_date = datetime.strptime(data['startDate'], '%Y-%m-%d').date()  # Convert string to date object
    n_member = TeamMember(
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
    return jsonify({'message': 'Team Member Created Successfully'}), 201


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
