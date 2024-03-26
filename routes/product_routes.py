from flask import jsonify, request
from models import db, Product
from . import product_bp


@product_bp.route('', methods=['GET'])
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


@product_bp.route('/<int:id>', methods=['GET'])
def get_product(id):
    product = Product.query.get_or_404(id)
    return jsonify({
        'id': product.id,
        'name': product.name,
        'brand': product.brand,
        'price': product.price,
        'status': product.status
    })


@product_bp.route('', methods=['POST'])
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


@product_bp.route('/<int:id>', methods=['DELETE'])
def delete_product(id):
    product = Product.query.get_or_404(id)
    db.session.delete(product)
    db.session.commit()
    remaining_products = Product.query.all()

    for idx, remaining_product in enumerate(remaining_products):
        remaining_product.id = idx + 1

    db.session.commit()
    return jsonify({'message': 'Product Deleted Successfully'}), 200


@product_bp.route('/<int:id>', methods=['PUT'])
def update_product(id):
    product = Product.query.get_or_404(id)
    data = request.json
    product.name = data['name']
    product.brand = data['brand']
    product.price = data['price']
    product.status = data['status']
    db.session.commit()
    return jsonify({'message': 'Product Updated Successfully'})
