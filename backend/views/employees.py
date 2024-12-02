from flask import jsonify, Blueprint, request
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
        cur.execute("SELECT employee_name, hourly_salary, active_employee FROM employees WHERE employee_name != 'CUSTOMER_KIOSK';")

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

@employees.route("/update-employees", methods=["PUT"])
def update_employees():
    """
    Updating an exployee's salary given an existing employee. 

    Parameters:
    employee_name : the name of the employee whose salary is intended to be changed
    hourly_salary : the new hourly salary of the employee
    """
    try:
        #Extract parameters from query parameters
        data = request.get_json()
        employee_name = data.get('employee_name')
        hourly_salary = data.get('hourly_salary')

        # Ensure parameters are provided
        if employee_name is None or hourly_salary is None:
            return jsonify({ "status": "error", "message": "Both employee_name and hourly_salary are required." }), 400

        #initialize a cursor and execute a query
        cur = conn.cursor()
        cur.execute('UPDATE employees SET hourly_salary = ' + str(hourly_salary) + 'WHERE employee_name = \'' + str(employee_name) + '\';')

        if cur.rowcount == 0:
            return jsonify({ "status": "error", "message": "Given employee does not exist." }), 404
        else:
            print(f"{employee_name} hourly_salary changed to: ${hourly_salary}")
        
        #close cursor
        conn.commit()
        cur.close()

        return jsonify({"status": "successful"}), 200
    except Exception as e:
        print("Error querying @ /employees/update-employees ||", e)
        return jsonify({
            "status": "error",
            "message": str(e)
        }), 500


@employees.route("/create-employees", methods=["POST"])
def create_employees():
    """
    Create a new employee in the database with a specified hourly salary.

    Parameters:
    employee_name : the name of the employee 
    hourly_salary : the new hourly salary of the employee
    """
    try:
        #Extract parameters from query parameters
        data = request.get_json()
        employee_name = data.get('employee_name')
        hourly_salary = data.get('hourly_salary')

        # Ensure parameters are provided
        if employee_name is None or hourly_salary is None:
            return jsonify({ "status": "error", "message": "Both employee_name and hourly_salary are required." }), 400

        #initialize a cursor and execute a query
        cur = conn.cursor()
        cur.execute("INSERT INTO employees (employee_name, hourly_salary, active_employee) VALUES (%s, %s, true);", (employee_name, hourly_salary))

        if cur.rowcount == 0:
            return jsonify({ "status": "error", "message": "There is an error with your input." }), 404
        else:
            print(f"{employee_name} with salary ${hourly_salary} has been added to the employees table.")
        
        #close cursor
        conn.commit()
        cur.close()

        return jsonify({"status": "successful"}), 200
    except Exception as e:
        print("Error querying @ /employees/create-employees ||", e)
        return jsonify({
            "status": "error",
            "message": str(e)
        }), 500
    
@employees.route("/fire-employees", methods=["PUT"])
def fire_employees():
    """
    Fires an employee by setting their active status to false. 

    Parameters:
    employee_name : the name of the employee 
    """
    try:
        #Extract parameters from query parameters
        data = request.get_json()
        employee_name = data.get('employee_name')

        # Ensure parameters are provided
        if employee_name is None:
            return jsonify({ "status": "error", "message": "An employee name needs to be provided." }), 400
        if employee_name == "CUSTOMER_KIOSK":
            return jsonify({ "status": "error", "message": "CUSTOMER_KIOSK employee cannot be deleted. It is a placeholder value to be used in the backend." }), 400

        #initialize a cursor and execute a query
        cur = conn.cursor()
        print(f"UPDATE employees SET active_employee = False WHERE employee_name = '{employee_name}';")
        cur.execute(f"UPDATE employees SET active_employee = False WHERE employee_name = '{employee_name}';")

        if cur.rowcount == 0:
            return jsonify({ "status": "error", "message": "There is an error with your input." }), 404
        else:
            print(f"{employee_name} has been fired.")
        
        #close cursor
        conn.commit()
        cur.close()

        return jsonify({"status": "successful"}), 200
    except Exception as e:
        print("Error querying @ /employees/fire-employees ||", e)
        return jsonify({
            "status": "error",
            "message": str(e)
        }), 500