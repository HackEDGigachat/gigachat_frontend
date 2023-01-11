from flask import Flask, jsonify, request
from utils.client import send_query
from utils.storage import get_user_col
import pdb
app = Flask(__name__)

@app.route('/api/check_user', methods=['POST'])
def check_cred():
  print(request)

  if request.method == 'POST':
    print("goes here")
    data = request.get_json()
    query = {
      "username" : data["userName"],
      "password" : data["password"]
    }
    collection = get_user_col()
    doc = collection.find(query)
    if(len(list(doc)) == 1):
      return jsonify({"valid":True})
    else:
      return jsonify({"valid":False})




@app.route('/api/latest_msg', methods=['POST', 'GET'])
def get_lastest_msg():
  if request.method == 'POST':
    data = request.get_json()
    print(data)
    return jsonify({'received_data': data}), 200
  elif request.method == 'GET':
    answer = send_query("what is your name")
    print(answer)
    return jsonify({'received_data': answer}), 200

@app.route('/api/data', methods=['POST', 'GET'])
def get_data():
  if request.method == 'POST':
    data = request.get_json()
    print(data)
    return jsonify({'received_data': data}), 200
  elif request.method == 'GET':
    return jsonify({'received_data': 'Hello from the backend!'}), 200

if __name__ == '__main__':
  
  app.run(debug=True, host='0.0.0.0')