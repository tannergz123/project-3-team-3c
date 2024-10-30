from flask import Flask, request, jsonify, Blueprint
from ..connection import conn

employees = Blueprint("employees", __name__)

@employees.route("/get-employees", methods=["GET"])
def get_employees():
    cur = conn.cursor()
    cur.execute('SELECT employee_name FROM Employees;')
    employees = cur.fetchall()
    conn.commit()
    cur.close()

    return jsonify(employees), 400
