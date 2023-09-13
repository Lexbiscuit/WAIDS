from flask import Flask, Response, request, jsonify
from flask_cors import CORS, cross_origin
from pymongo import MongoClient
from bson.json_util import dumps

app = Flask(__name__)
cors = CORS(app)
app.config["CORS_HEADERS"] = "Content-Type"
app.config["Access-Control-Allow-Origin"] = "*"

client = MongoClient('localhost', 27017)
db = client.WAIDS
suricata = db.Suricata
snort = db.Snort

@app.route("/")
def hello_world():
    return "<p>Hello, World!</p>"

@app.route("/fetchAllLogs", methods=["GET"])
@cross_origin()
def fetchAllLogs():
    skip = request.args.get('skip')
    limit = request.args.get('limit')
    suricataData = list(suricata.find({}).skip(int(skip)).limit(int(limit)))
    response = Response(response = dumps(suricataData), status=200, mimetype='application/json')
    return response

@app.route("/fetchDocumentCount", methods=["GET"])
@cross_origin()
def fetchDocumentCount():
    return Response(response = dumps(suricata.aggregate(
        [{
            "$group": {"_id": "null", "count": {"$sum" : 1}} 
            }]
        )), status=200, mimetype="application/json")

@app.route("/fetchCategory", methods=["GET"])
@cross_origin()
def fetchLogs():
    category = request.args.get('category')
    print(category)
    return Response(response=dumps(suricata.aggregate(
        [{"$group": {
            "_id": f"${category}", "count": {"$count": {}},
        }}, 
        {"$sort": {"count": 1}},
        {
            "$project": {"_id": 0, "id": "$_id", "value": "$count", "label": "$_id"}
        }]
          )), status=200, mimetype='application/json')

@app.route("/api/login", methods=["POST"])
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
