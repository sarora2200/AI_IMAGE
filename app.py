from flask import Flask, render_template, request, jsonify
import os
from dotenv import load_dotenv
import openai

load_dotenv()

app = Flask(__name__)
app.secret_key = os.environ.get('FLASK_SECRET_KEY')
openai.api_key = os.environ.get('OPENAI_API_KEY')

@app.route('/')
def home():
    return render_template('index.html')

@app.route('/generate_image', methods=['POST'])
def generate_image():
    prompt = request.json.get('prompt')
    response = openai.Image.create(prompt=prompt, num_images=2, size="256x256")
    image_url = response.data[0].url if response and response.data else ''
    return jsonify({'url': image_url})

if __name__ == '__main__':
    app.run(debug=True)

