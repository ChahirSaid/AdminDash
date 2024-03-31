from flask import request, jsonify
from . import order_bp
from datetime import datetime
from models import db, Order, Product, Customer


@order_bp.route('', methods=['POST'])
def create_order():
    data = request.json

    # Validate input data
    required_fields = ['product_name', 'customer_name', 'status', 'date']
    if not all(field in data for field in required_fields):
        return jsonify({'error': 'Missing required fields'}), 400

    try:
        date_str = data['date']
        formatted_date = datetime.strptime(date_str, '%Y-%m-%dT%H:%M')

        product = Product.query.filter_by(name=data['product_name']).first()
        customer = Customer.query.filter_by(name=data['customer_name']).first()

        if product is None:
            return jsonify({'error': 'Product not found'}), 404
        if customer is None:
            return jsonify({'error': 'Customer not found'}), 404

        new_order = Order(
            product_name=data['product_name'],
            customer_name=data['customer_name'],
            price=product.price,
            status=data['status'],
            product_id=product.id,
            customer_id=customer.id,
            date=formatted_date
        )

        db.session.add(new_order)
        db.session.commit()

        return jsonify({'message': 'Order created successfully'}), 201
    except ValueError:
        return jsonify({'error': 'Invalid date format'}), 400
    except Exception as e:
        db.session.rollback()
        return jsonify({'error': str(e)}), 500


@order_bp.route('', methods=['GET'])
def get_all_orders():
    try:
        orders = Order.query.all()
        orders_data = []
        total_sales_revenue = 0
        total_profit = 0

        if orders:
            for order in orders:
                product_price = order.price
                cost_price = 0.7 * product_price
                profit_per_order = product_price - cost_price

                order_data = {
                    'id': order.id,
                    'product_name': order.product_name,
                    'customer_name': order.customer_name,
                    'price': order.price,
                    'status': order.status,
                    'date': order.date.strftime('%Y-%m-%d %H:%M:%S') if order.date else None
                }
                orders_data.append(order_data)

                total_sales_revenue += product_price

        total_profit = sum(order['price'] * 0.7 if order['status'] != 'Refunded' else 0 for order in orders_data)

        response_data = {
            'total_sales_revenue': total_sales_revenue,
            'total_profit': total_profit,
            'profit_per_order': profit_per_order
        }

        return jsonify({
            'orders': orders_data,
            'totals': response_data
        }), 200
    except Exception as e:
        return jsonify({'error': str(e)}), 500


@order_bp.route('/<int:order_id>', methods=['GET'])
def get_order(order_id):
    order = Order.query.get_or_404(order_id)
    order_dict = {
        'id': order.id,
        'product_name': order.product_name,
        'customer_name': order.customer_name,
        'status': order.status,
        'product_price': order.price,
        'date': order.date.strftime('%Y-%m-%d %H:%M:%S')  # Format date as string
    }
    return jsonify(order_dict), 200


@order_bp.route('/<int:order_id>', methods=['PUT'])
def update_order(order_id):
    order = Order.query.get_or_404(order_id)
    data = request.json

    try:
        order.product_name = data.get('product_name', order.product_name)
        order.customer_name = data.get('customer_name', order.customer_name)
        order.price = data.get('price', order.price)
        order.status = data.get('status', order.status)
        order.product_id = data.get('product_id', order.product_id)
        order.customer_id = data.get('customer_id', order.customer_id)

        if 'date' in data:
            order.date = datetime.fromisoformat(data['date'])

        db.session.commit()

        updated_order = Order.query.get(order_id)
        updated_order_dict = {
            'id': updated_order.id,
            'product_name': updated_order.product_name,
            'customer_name': updated_order.customer_name,
            'status': updated_order.status,
            'product_price': updated_order.price,
            'date': updated_order.date.strftime('%Y-%m-%d %H:%M:%S')
        }
        return jsonify({'message': 'Order Updated Successfully', 'order': updated_order_dict}), 200
    except Exception as e:
        db.session.rollback()
        return jsonify({'error': str(e)}), 500


@order_bp.route('/<int:order_id>', methods=['DELETE'])
def delete_order(order_id):
    order = Order.query.get_or_404(order_id)
    db.session.delete(order)
    db.session.commit()
    return jsonify({'message': 'Order Deleted Successfully'})
