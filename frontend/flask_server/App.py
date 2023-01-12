from flask import Flask, jsonify, request
from utils.client import send_query
from utils.storage import get_user_col , get_gpt_msg_col
import pdb
app = Flask(__name__)
gpt_count = 0
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




@app.route('/api/reply', methods=['POST', 'GET'])
def reply():
  if request.method == 'POST':
    data = request.get_json()
    print(data)
    query=data["message"]
    answer = send_query(query)
    return jsonify({'reply': answer}), 200


@app.route('/api/data', methods=['POST', 'GET'])
def get_data():
  if request.method == 'POST':
    data = request.get_json()
    print(data)
    return jsonify({'received_data': data}), 200
  elif request.method == 'GET':
    return jsonify({'received_data': 'Hello from the backend!'}), 200
def get_count(): 
  gpt_col = get_gpt_msg_col()
  gpt_count = gpt_col.count_documents({})

def main():
  get_count()
  app.run(debug=True, host='0.0.0.0')

if __name__ == "__main__":
  main()
