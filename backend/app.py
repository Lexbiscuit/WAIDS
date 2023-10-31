from flask import Flask, jsonify, Blueprint
from flask_cors import CORS
from manageIDS import manageIDS

app = Flask(__name__)
app.register_blueprint(manageIDS)
# enable cors
CORS(app, resources={r'/*': {'origins': 'http://localhost:3000'}})


@app.route("/")
def hello_world():
    return "<p>Hello, World!</p>"


if __name__ == '__main__':
    app.run(debug=True)
