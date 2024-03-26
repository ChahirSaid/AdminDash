from flask import Flask
from flask_migrate import Migrate
from flask_cors import CORS
from models import db
from flask import request, jsonify
from werkzeug.security import check_password_hash
from routes.product_routes import product_bp
from routes.team_routes import team_bp

app = Flask(__name__)
app.config['SECRET_KEY'] = 'SuperAdmin'
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///admindash.db'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
db.init_app(app)
app.register_blueprint(product_bp)
app.register_blueprint(team_bp)
migrate = Migrate(app, db)
CORS(app, resources={r"/auth": {"origins": "*"}}, supports_credentials=True)
CORS(app, resources={r"/api/*": {"origins": "http://localhost:5173"}})
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
