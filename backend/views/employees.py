from flask import jsonify, Blueprint
from ..connection import conn

employees = Blueprint("employees", __name__)

#debugging 
print("running employees.py")

@employees.route("/get-employees", methods=["GET"])
def get_employees():
    """
    Queries the employees database and returns all the values.

    Returns:
        JSON: A list of employees with values employee_name, hourly_salary, active_employee.
    """
    try:
        #initialize a cursor and execute a query
        cur = conn.cursor()
        cur.execute('SELECT employee_name, hourly_salary, active_employee FROM employees;')

        #get output
        rows = cur.fetchall()

        #get column names 
        column_names = [desc[0] for desc in cur.description]
        items = [dict(zip(column_names, row)) for row in rows]

        conn.commit()
        cur.close()

        return jsonify(items), 200
    
    except Exception as e:
        print("Error querying @ /employees/get-employees ||", e)
        return jsonify({
            "status": "error",
            "message": str(e)
        }), 500
