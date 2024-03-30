from flask import Flask, session
from flask_migrate import Migrate
from flask_cors import CORS
from models import db, TeamMember
from flask import request, jsonify
from werkzeug.security import check_password_hash
from routes.product_routes import product_bp
from routes.team_routes import team_bp
from routes.customer_routes import customer_bp
from routes.order_routes import order_bp

app = Flask(__name__)
app.config['SECRET_KEY'] = 'SuperAdmin'
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///admindash.db'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
db.init_app(app)
app.register_blueprint(product_bp)
app.register_blueprint(team_bp)
app.register_blueprint(customer_bp)
app.register_blueprint(order_bp)
migrate = Migrate(app, db)
CORS(app, resources={r"/auth": {"origins": "http://localhost:5173"}}, supports_credentials=True)
CORS(app, resources={r"/api/*": {"origins": "http://localhost:5173"}}, supports_credentials=True)
DEFAULT_ADMIN_USERNAME = 'admin'
DEFAULT_ADMIN_PASSWORD = 'admin'


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

        if username == DEFAULT_ADMIN_USERNAME and password == DEFAULT_ADMIN_PASSWORD:
            # Set session for admin user
            session['username'] = username
            session['role'] = 'admin'
            session['email'] = 'admin@example.com'

            response_data = {
                'message': 'Login Successful',
                'user_info': {
                    'username': username,
                    'role': 'admin',
                    'email': 'admin@example.com'
                }
            }
            return jsonify(response_data)
        else:
            team_member = TeamMember.query.filter_by(username=username).first()
            if team_member:
                if check_password_hash(team_member.password_hash, password):
                    # Set session for team member
                    session['username'] = username
                    session['role'] = 'team_member'
                    session['email'] = team_member.employeeEmail

                    response_data = {
                        'message': 'Login Successful',
                        'user_info': {
                            'username': username,
                            'role': 'team_member',
                            'email': team_member.employeeEmail
                        }
                    }
                    return jsonify(response_data), 200
                else:
                    return jsonify({'message':'Invalid Credentials'}), 401
            else:
                return jsonify({'message': 'User not found'}), 404
    return jsonify({'message': 'Method not allowed'}), 405


if __name__ == '__main__':
    app.run(debug=True)
