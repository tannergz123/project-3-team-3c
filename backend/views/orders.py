from flask import jsonify, Blueprint, request
from ..connection import conn
from datetime import datetime

orders = Blueprint("orders", __name__)

@orders.route("/add-order", methods={"POST"})
def add_order(employee_id:int=None, customer_name:str=None, total_price:float=None, internal:bool=True):
    '''
    Adds an order in the orders database given an employee_id, customer_name, and total_price. 
    
    Parameters:
    [optional] employee_name : the employee who placed the order
    customer_name : the customer whom the order was placed for 
    total_price :  the total price of the order
    
    Note: 
    If the internal flag is called, this method will operate as a function and not as an endpoint.
    In other words, this means that it will be used as a helper function by another function if internal is true. 
    '''
    try:
        # Extract parameters from query arguments
        employee_name = request.args.get('employee_name')
        employee_id = None
        customer_name = request.args.get('customer_name')
        total_price = request.args.get('total_price')

        # initialize a cursor
        cur = conn.cursor()

        # Ensure acceptable parameters are provided 
        if customer_name is None or total_price is None:
            return jsonify({ "status": "error", "message": "Both customer_name and total_price are required." }), 400
        
        if employee_name is None:
            # indicate that the customer ordererd this in the kiosk
            employee_name = 'CUSTOMER_SELF_ORDER'
            employee_id = 28 # hardcoded value for the id of the CUSTOMER_SELF_ORDER from the database
        else:
            cur.execute(f"SELECT employee_id FROM employees WHERE employee_name = '{employee_name}';")
            if cur.rowcount == 0:
                return jsonify({ "status": "error", "message": "No employee exists with this name." }), 400
            employee_id = cur.fetchall()[0][0]
        
        current_datetime = str(datetime.now())

        # add to the table
        cur.execute(f"INSERT INTO orders (employee_id, customer_name, order_date, total_price) VALUES ({employee_id}, '{customer_name}', '{current_datetime}', {total_price});")
        
        if cur.rowcount == 0:
             return jsonify({ "status": "error", "message": "There has been an error with your order" }), 400
        conn.commit()
        cur.close()

        return jsonify({"status": "successful"}), 200
    except Exception as e:
            print("Error querying @ /orders/add-order ||", e)
            return jsonify({
                "status": "error",
                "message": str(e)
            }), 500


#debugging 
print("running orders.py")