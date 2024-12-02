from flask import jsonify, Blueprint, request
from ..connection import conn
import jwt

auth = Blueprint("auth", __name__)

#debugging 
print("auth.py")

@auth.route("/get-scope", methods=["GET"])
def get_scope():
    try:
        token = request.args.get('token')
        
        if not token:
            return jsonify({ "status": "error", "message": "You have entered an improper JWT. This needs to be the token returned from google oAuth." }), 404
        
        decoded_payload = jwt.decode(token, options={"verify_signature": False})
        email = decoded_payload['email']

        cur = conn.cursor()
        cur.execute(f"SELECT access_level FROM internal_user_access WHERE email = '{email}';")

        access_level = cur.fetchall()[0][0]

        #Quick reminder:
        # E : employee
        # M : manager
        # EM : employee and manager

        return jsonify(access_level), 200
    except Exception as e:
        print(f"There was an issue verifying the users access level @ auth/get-scope. Error: {e}"), 500