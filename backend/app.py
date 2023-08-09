from flask import Flask, request, jsonify
from flask_cors import CORS, cross_origin

app = Flask(__name__)
cors = CORS(app)
app.config["CORS_HEADERS"] = "Content-Type"
app.config["Access-Control-Allow-Origin"] = "*"


@app.route("/")
def hello_world():
    return "<p>Hello, World!</p>"


@app.route("/login", methods=["POST"])
@cross_origin()
def login():
    data = request.get_json()

    # pretend that record was found and fetched from database
    EMAIL = "admin@admin.co"
    PASSWORD = "admin123"

    response = jsonify({'Login Status': 'Failed'})
    if data["email"] == EMAIL and data["password"] == PASSWORD:
        response = jsonify({'Login Status': 'Success'})
    return response


if __name__ == '__main__':
    app.run(debug=True)
