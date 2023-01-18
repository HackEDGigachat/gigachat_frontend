from flask import Flask, jsonify, request, send_file
from client import send_query
from storage import get_user_col , get_gpt_msg_col,get_msg_col
import pdb
import json
from query import main_query
app = Flask(__name__)
gpt_count = 0
def updateDictionary(user,collection_msg):
  for message in collection_msg:
    message["from"] = user
    del message['_id']
  return collection_msg

@app.route('/api/get_history', methods=['POST'])
def get_history():
  print(request)

  if request.method == 'POST':
    print("goes here")
    data = request.get_json()
    username = data["username"]
    query = {
      "username" : username,
    }
    user_msg_col = list(get_msg_col().find(query))
    gpt_msg_col = list(get_gpt_msg_col().find(query))
    user_msg_col = updateDictionary(0,user_msg_col) #0 = user , 1 = chat
    gpt_msg_col = updateDictionary(1,gpt_msg_col)
    combined_msgs = gpt_msg_col+user_msg_col
    sorted_msgs = sorted(combined_msgs,key=lambda d:d['timestamp'])
    return jsonify({"sorted_msgs":sorted_msgs})
    
@app.route('/api/check_user', methods=['POST'])
def check_cred():
  print(request)

  if request.method == 'POST':
    print("goes here")
    data = request.get_json()
    query = {
      "username" : data["username"],
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
    username = "rpi_user"
    doc ={
      "username" :username,
      "text" : query
    }
    answer = main_query(doc)["text"]
    return jsonify({'reply': answer}), 200
    


@app.route('/api/data', methods=['POST', 'GET'])
def get_data():
  if request.method == 'POST':
    data = request.get_json()
    print(data)
    return jsonify({'received_data': data}), 200
  elif request.method == 'GET':
    return jsonify({'received_data': 'Hello from the backend!'}), 200

@app.route('/video')
def send_video():
    return send_file('resources/login_video.mp4', mimetype='video/mp4')

def main():
  app.run(debug=True, host='0.0.0.0')


if __name__ == "__main__":
  print("hello")
  main()
