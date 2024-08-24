from flask import Flask, jsonify, request
from flask_cors import CORS
import random
import string

app = Flask(__name__)
CORS(app)

@app.route('/generate-password', methods=['POST'])
def generate_password():
    # Get parameters from the request
    length = request.json.get('length', 12)
    use_uppercase = request.json.get('useUppercase', True)
    use_lowercase = request.json.get('useLowercase', True)
    use_numbers = request.json.get('useNumbers', True)
    use_symbols = request.json.get('useSymbols', True)

    # Define the character set based on user preferences
    characters = ''
    if use_uppercase:
        characters += string.ascii_uppercase
    if use_lowercase:
        characters += string.ascii_lowercase
    if use_numbers:
        characters += string.digits
    if use_symbols:
        characters += string.punctuation

    # Check if at least one character type is selected
    if not characters:
        return jsonify({"error": "At least one character type must be selected"}), 400

    # Generate the password
    password = ''.join(random.choice(characters) for _ in range(length))
    return jsonify({"password": password})

if __name__ == '__main__':
    app.run(debug=True, host='0.0.0.0')