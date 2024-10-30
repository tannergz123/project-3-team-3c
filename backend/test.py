from flask import Flask, request, jsonify
import connection

app = Flask(__name__)

@app.route("/get-test", methods=["GET"])
def add_data():
       
    if request.method == "GET":     
        
        return jsonify(), 400
        


if __name__ == '__main__':
   app.run(port=8000)