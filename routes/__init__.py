from flask import Blueprint

product_bp = Blueprint('product', __name__, url_prefix='/api/products')
team_bp = Blueprint('team', __name__, url_prefix='/api/team')
customer_bp = Blueprint('customer', __name__, url_prefix='/api/customer')
order_bp = Blueprint('order', __name__, url_prefix='/api/orders')
