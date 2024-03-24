from flask import Flask
from config import Config
from flask_migrate import Migrate
from models import db
from flask_cors import CORS
from flask import render_template, redirect, url_for
from flask import request, jsonify
from models import db, User
from werkzeug.security import check_password_hash


app = Flask(__name__)
app.config.from_object(Config)
db.init_app(app)
CORS(app, resources={r"/auth": {"origins": "*"}}, supports_credentials=True)
migrate = Migrate(app, db)
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
