import os
import base64
from flask import jsonify
from flask import request, current_app
from werkzeug.utils import secure_filename
from models import db
from io import BytesIO
from models import Product
from PIL import Image
from . import product_bp


def truncate_encoded_image(encoded_image, length=40):
    if len(encoded_image) > length:
        truncated_encoded_image = encoded_image[:length] + '...'
        return truncated_encoded_image
    return encoded_image


@product_bp.route('', methods=['GET'])
def get_products():
    products = Product.query.all()
    products_list = []
    for product in products:
        product_data = {
            'id': product.id,
            'name': product.name,
            'brand': product.brand,
            'price': product.price,
            'status': product.status
        }
        if product.picture:
            try:
                image_path = os.path.join(current_app.root_path, 'React-app',
                                          'src', 'components',
                                          'Products', 'image', product.picture)
                with open(image_path, 'rb') as img_file:
                    encoded_image = base64.b64encode(img_file.read()).decode('utf-8')
                    truncated_encoded_image = truncate_encoded_image(encoded_image)
                product_data['picture'] = 'data:image/jpeg;base64,' + truncated_encoded_image
            except FileNotFoundError:
                product_data['picture'] = None
        else:
            product_data['picture'] = None
        products_list.append(product_data)
    return jsonify(products_list)


@product_bp.route('/complete', methods=['GET'])
def get_complete_products():
    products = Product.query.all()
    products_list = []
    for product in products:
        product_data = {
            'id': product.id,
            'name': product.name,
            'brand': product.brand,
            'price': product.price,
            'status': product.status,
            'picture': None
        }
        if product.picture:
            try:
                image_path = os.path.join(current_app.root_path, 'React-app',
                                          'src', 'components',
                                          'Products', 'image', product.picture)
                with open(image_path, 'rb') as img_file:
                    encoded_image = base64.b64encode(img_file.read()).decode('utf-8')
                product_data['picture'] = 'data:image/jpeg;base64,' + encoded_image
            except FileNotFoundError:
                pass
        products_list.append(product_data)
    return jsonify(products_list)


@product_bp.route('/<int:id>', methods=['GET'])
def get_product(id):
    product = Product.query.get_or_404(id)
    product_data = {
        'id': product.id,
        'name': product.name,
        'brand': product.brand,
        'price': product.price,
        'status': product.status
    }
    if product.picture:
        try:
            image_path = os.path.join(current_app.root_path, 'React-app',
                                      'src', 'components',
                                      'Products', 'image', product.picture)
            with open(image_path, 'rb') as img_file:
                encoded_image = base64.b64encode(img_file.read()).decode('utf-8')
            product_data['picture'] = 'data:image/jpeg;base64,' + encoded_image
        except FileNotFoundError:
            product_data['picture'] = None
    else:
        product_data['picture'] = None
    return jsonify(product_data)


@product_bp.route('', methods=['POST'])
def create_product():
    data = request.form
    print("Received data:", data)
    new_product = Product(
        name=data['name'],
        brand=data['brand'],
        price=data['price'],
        status=data['status']
    )
    if 'picture' in request.files:
        picture = request.files['picture']
        picture_filename = secure_filename(picture.filename)
        
        directory = os.path.join('React-app', 'src', 'components', 'Products', 'image')
        os.makedirs(directory, exist_ok=True)
        

        picture.save(os.path.join(directory, picture_filename))
        new_product.picture = picture_filename 
        
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
    data = request.form
    product.name = data['name']
    product.brand = data['brand']
    product.price = data['price']
    product.status = data['status']

    if 'picture' in request.files:
        picture = request.files['picture']
        if picture.filename != '':
            picture_filename = secure_filename(picture.filename)

            directory = os.path.join('React-app', 'src', 'components', 'Products', 'image')
            os.makedirs(directory, exist_ok=True)
            picture_path = os.path.join(directory, picture_filename)
            picture.save(picture_path)

            product.picture = picture_filename

    db.session.commit()
    return jsonify({'message': 'Product Updated Successfully'})
