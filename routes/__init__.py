from flask import Blueprint

product_bp = Blueprint('product', __name__, url_prefix='/api/products')
team_bp = Blueprint('team', __name__, url_prefix='/api/team')
