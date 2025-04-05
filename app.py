from flask import Flask, render_template, jsonify, request
import os
import base64

app = Flask(__name__)

# Configure static folder for images
app.static_folder = 'static'

@app.route('/')
def index():
    return render_template('index.html')

@app.route('/get_image/<image_name>')
def get_image(image_name):
    image_path = os.path.join(app.static_folder, 'images', f'{image_name}.png')
    if os.path.exists(image_path):
        return jsonify({'status': 'success', 'path': f'/static/images/{image_name}.png'})
    else:
        return jsonify({'status': 'error', 'message': 'Image not found'})

@app.route('/update_counter', methods=['POST'])
def update_counter():
    data = request.json
    counter = data.get('counter', 0)
    return jsonify({'status': 'success', 'counter': counter})

if __name__ == '__main__':
    # Create static/images directory if it doesn't exist
    os.makedirs(os.path.join('static', 'images'), exist_ok=True)
    
    # Copy existing screenshots to static/images
    for i in range(1, 6):
        source = f"Screenshot_{i}.png"
        if os.path.exists(source):
            import shutil
            dest = os.path.join('static', 'images', f"screenshot_{i}.png")
            shutil.copy(source, dest)
    
    app.run(debug=True)