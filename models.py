from flask_sqlalchemy import SQLAlchemy
from datetime import datetime
db = SQLAlchemy()


class TeamMember(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(20), unique=True, nullable=False)
    password_hash = db.Column(db.String(128), nullable=False)
    employeeName = db.Column(db.String(100))
    employeeAge = db.Column(db.Integer)
    employeeCity = db.Column(db.String(50))
    employeeEmail = db.Column(db.String(100))
    employeePhone = db.Column(db.String(20))
    employeePost = db.Column(db.String(100))


class Product(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(100), nullable=False)
    brand = db.Column(db.String(100), nullable=False)
    price = db.Column(db.Float, nullable=False)
    status = db.Column(db.String(20), default="In Stock")
    created_at = db.Column(db.DateTime, default=datetime.now)
    picture = db.Column(db.String(100))


class Customer(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(100), nullable=False)
    age = db.Column(db.Integer, nullable=False)
    city = db.Column(db.String(100), nullable=False)
    email = db.Column(db.String(100), nullable=False)
    phone = db.Column(db.String(20), nullable=False)


class Order(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    product_name = db.Column(db.String(100), nullable=False)
    customer_name = db.Column(db.String(100), nullable=False)
    status = db.Column(db.String(20), nullable=False, default='Pending')
    _price = db.Column('price', db.Float, nullable=False)
    date = db.Column(db.DateTime, default=datetime.utcnow)
    product_id = db.Column(db.Integer, db.ForeignKey('product.id'), nullable=False)
    customer_id = db.Column(db.Integer, db.ForeignKey('customer.id'), nullable=False)

    product = db.relationship('Product', backref='orders')
    customer = db.relationship('Customer', backref='orders')

    @property
    def price(self):
        return self._price

    @price.setter
    def price(self, value):
        self._price = value
