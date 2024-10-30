from flask import jsonify, Blueprint
from ..connection import conn

employees = Blueprint("employees", __name__)
print("running employees.py")

@employees.route("/get-employees", methods=["GET"])
def get_employees():
    try:
        cur = conn.cursor()
        cur.execute('SELECT employee_name FROM Employees;')
        employees = cur.fetchall()
        conn.commit()
        cur.close()

        return jsonify(employees), 400
    except Exception as e:
        print("Error querying /get_employees ||", e)
