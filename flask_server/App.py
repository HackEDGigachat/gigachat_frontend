from flask import Flask, jsonify

app = Flask(__name__)

@app.route('/data')
def testfunc():
    # retrieve data from database or generate data
    
    return {"key":["data1","data2"]}







if __name__ == '__main__':
    app.run(debug=True)