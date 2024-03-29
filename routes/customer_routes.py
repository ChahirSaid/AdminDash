from flask import request, jsonify
from . import customer_bp
from models import db, Customer


@customer_bp.route('', methods=['POST'])
def create_customer():
    data = request.json
    new_customer = Customer(name=data['name'],
                            email=data['email'],
                            age=data['age'],
                            city=data['city'],
                            phone=data['phone'])
    db.session.add(new_customer)
    db.session.commit()
    return jsonify({'message': 'Customer Created Successfully'}), 201


@customer_bp.route('', methods=['GET'])
def get_all_customers():
    customers = Customer.query.all()
    customer_list = []
    for customer in customers:
        customer_dict = {
            'id': customer.id,
            'name': customer.name,
            'age': customer.age,
            'email': customer.email,
            'city': customer.city,
            'phone': customer.phone
        }
        customer_list.append(customer_dict)
    return jsonify(customer_list)


@customer_bp.route('/<int:customer_id>', methods=['GET'])
def get_customer(customer_id):
    customer = Customer.query.get_or_404(customer_id)
    customer_dict = {
        'id': customer.id,
        'name': customer.name,
        'age': customer.age,
        'email': customer.email,
        'city': customer.city,
        'phone': customer.phone
    }
    return jsonify(customer_dict)


@customer_bp.route('/<int:customer_id>', methods=['PUT'])
def update_customer(customer_id):
    customer = Customer.query.get_or_404(customer_id)
    data = request.json
    customer.name = data.get('name', customer.name)
    customer.email = data.get('email', customer.email)
    customer.age = data.get('age', customer.age)
    customer.city = data.get('city', customer.city)
    customer.phone = data.get('phone', customer.phone)
    db.session.commit()
    return jsonify({'message': 'Customer Updated Successfully'})


@customer_bp.route('/<int:customer_id>', methods=['DELETE'])
def delete_customer(customer_id):
    customer = Customer.query.get_or_404(customer_id)
    db.session.delete(customer)
    db.session.commit()
    return jsonify({'message': 'Customer Deleted Successfully'})
