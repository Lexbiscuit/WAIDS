from flask import Flask, jsonify, Blueprint
from flask_cors import CORS, cross_origin
from manageIDS import manageIDS
from manageHistory import manageHistory

app = Flask(__name__)
app.register_blueprint(manageIDS)
app.register_blueprint(manageHistory)
# enable cors
CORS(app, resources={r'/*': {'origins': "*"}})


@app.route("/")
@cross_origin()
def hello_world():
    return "<p>Hello, World!</p>"


if __name__ == '__main__':
    app.run(port=5000)
