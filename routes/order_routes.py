from flask import request, jsonify
from . import order_bp
from models import db, Order, Product, Customer

@order_bp.route('', methods=['POST'])
def create_order():
    data = request.json

    # Retrieve product from product name
    product_name = data.get('product_name')
    product = Product.query.filter_by(name=product_name).first()
    if product is None:
        return jsonify({'error': 'Product not found'}), 404

    # Retrieve customer from customer name
    customer_name = data.get('customer_name')
    customer = Customer.query.filter_by(name=customer_name).first()
    if customer is None:
        return jsonify({'error': 'Customer not found'}), 404

    # Create the order with product and customer details
    new_order = Order(
        product_name=product_name,
        customer_name=customer_name,
        price=product.price,
        status=data['status'],
        product_id=product.id,
        customer_id=customer.id
    )

    db.session.add(new_order)
    db.session.commit()

    return jsonify({'message': 'Order Created successfully'}), 201


@order_bp.route('', methods=['GET'])
def get_all_orders():
    orders = Order.query.all()
    order_list = []
    for order in orders:
        order_dict = {
            'id': order.id,
            'product_name': order.product_name,
            'customer_name': order.customer_name,
            'status': order.status,
            'product_price': order.product.price
        }
        order_list.append(order_dict)
    return jsonify(order_list)

@order_bp.route('/<int:order_id>', methods=['GET'])
def get_order(order_id):
    order = Order.query.get_or_404(order_id)
    order_dict = {
        'id': order.id,
        'product_name': order.product_name,
        'customer_name': order.customer_name,
        'price': order.price,
        'status': order.status
    }
    return jsonify(order_dict)

@order_bp.route('/<int:order_id>', methods=['PUT'])
def update_order(order_id):
    order = Order.query.get_or_404(order_id)
    data = request.json
    order.product_name = data.get('product_name', order.product_name)
    order.customer_name = data.get('customer_name', order.customer_name)
    order.price = data.get('price', order.price)
    order.status = data.get('status', order.status)
    order.product_id = data.get('product_id', order.product_id)
    order.customer_id = data.get('customer_id', order.customer_id)
    db.session.commit()
    return jsonify({'message': 'Order Updated Successfully'})

@order_bp.route('/<int:order_id>', methods=['DELETE'])
def delete_order(order_id):
    order = Order.query.get_or_404(order_id)
    db.session.delete(order)
    db.session.commit()
    return jsonify({'message': 'Order Deleted Successfully'})
