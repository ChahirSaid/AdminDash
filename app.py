from flask import Flask
from flask_sqlalchemy import SQLAlchemy
from flask_migrate import Migrate
from flask_cors import CORS
from models import db, User, Product
from flask import render_template, redirect, url_for
from flask import request, jsonify
from datetime import datetime
from werkzeug.security import check_password_hash


app = Flask(__name__)
app.config['SECRET_KEY'] = 'SuperAdmin'
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///admindash.db'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
db.init_app(app)
migrate = Migrate(app, db)
CORS(app, resources={r"/auth": {"origins": "*"}}, supports_credentials=True)
CORS(app, resources={r"/api/*": {"origins": "http://localhost:5173"}})
DEFAULT_ADMIN_USERNAME = 'admin'
DEFAULT_ADMIN_PASSWORD = 'admin'


@app.route('/api/products', methods=['GET'])
def get_products():
    products = Product.query.all()
    products_list = []
    for product in products:
        products_list.append({
            'id': product.id,
            'name': product.name,
            'brand': product.brand,
            'price': product.price,
            'status': product.status
        })
    return jsonify(products_list)


@app.route('/api/products/<int:id>', methods=['GET'])
def get_product(id):
    product = Product.query.get_or_404(id)
    return jsonify({
        'id': product.id,
        'name': product.name,
        'brand': product.brand,
        'price': product.price,
        'status': product.status
    })


@app.route('/api/products', methods=['POST'])
def create_product():
    data = request.json
    new_product = Product(
        name=data['name'],
        brand=data['brand'],
        price=data['price'],
        status=data['status']
    )
    db.session.add(new_product)
    db.session.commit()
    return jsonify({'message': 'Product Created Successfully'}), 201


@app.route('/api/products/<int:id>', methods=['DELETE'])
def delete_product(id):
    product = Product.query.get_or_404(id)
    db.session.delete(product)
    db.session.commit()
    return jsonify({'message': 'Product Deleted Successfully'}), 200


@app.route('/api/products/<int:id>', methods=['PUT'])
def update_product(id):
    product = Product.query.get_or_404(id)
    data = request.json
    product.name = data['name']
    product.brand = data['brand']
    product.price = data['price']
    product.status = data['status']
    db.session.commit()
    return jsonify({'message': 'Product Updated Successfully'})


@app.route('/auth', methods=['POST', 'OPTIONS'])
def auth():
    print("Request received!")
    if request.method == 'OPTIONS':
        return jsonify({'message': 'Preflight request received'}), 200
    if request.method == 'POST':
        data = request.get_json()
        print("Data:", data)

        username = data.get('username')
        password = data.get('password')

        print("Username:", username)
        print("Password:", password)

        if username == DEFAULT_ADMIN_USERNAME and password == DEFAULT_ADMIN_PASSWORD:
            response_data = {
                'message': 'Login Successful',
                'user_info': {
                    'username': username,
                    'role': 'admin',
                    'email': 'admin@example.com'
                }
            }
            print("Response:", response_data)
            return jsonify(response_data)
        else:
            print("Response: Invalid Credentials")
            return jsonify({'message': 'Invalid Credentials'}), 401

    print("Response: Method not allowed")
    return jsonify({'message': 'Method not allowed'}), 405

if __name__ == '__main__':
    app.run(debug=True)
