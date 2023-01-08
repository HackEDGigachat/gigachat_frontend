from flask import Flask, jsonify, request

app = Flask(__name__)


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