from flask import jsonify, Blueprint, request
import json
from ..connection import conn
from datetime import datetime
from .order_items import add_order_item
from .order_sub_items import add_order_sub_item

orders = Blueprint("orders", __name__)

#debugging 
print("running orders.py")


@orders.route("/place-order", methods=["POST"])
def place_order():
    '''
    Takes in information after a customer submits an order and populates all order tables:
        - orders
        - order-items
        - order_sub_items
    Relies on multiple helper functions to do this. Simply, this is the function called to place an order.

    Parameters:
    [optional] employee_name: the employee who placed the order.
        - if it is not provided, it indicates that the customer placed the order on the customer kiosk
    customer_name: the customer who places the order
    total_price: the total price of the order
    prices: an array representing the prices of each order item in the order
    sub_items: a 2D array representing all items in the order (bowl, plate, bigger plate, drink, appetizer) and all their associaated sub items

    Example of Usage:
    I order one plate with Orange Chicken, Mushroom Chicken, and Chow Mein with Cream Cheese Rangoons.

    employee_name: Riccardo Calafiori
    customer_name: Bob
    total_price: 10.50
    prices: [8.50, 2.00]
    sub_items: [['Orange Chicken', 'Mushroom Chicken', 'Chow Mein], ['Cream Cheese Rangoons']]
    '''

    try:
        # Extract parameters from query arguments
        data = request.get_json()
        employee_name = data.get('employee_name')
        employee_id = None
        customer_name = data.get('customer_name')
        total_price = data.get('total_price')
        prices = data.get('prices')
        sub_items = data.get('sub_items')
        sub_items_ids = []

        order_date = str(datetime.now())
        
        # Ensure acceptable parameters are provided 
        if employee_name != None and type(employee_name) != str:
            return jsonify({ "status": "error", "message": "employee_name is an optional parameter but it must be a string." }), 400
        if customer_name == None or type(customer_name) != str:
            return jsonify({ "status": "error", "message": "customer_name is an required parameter and it must be a string." }), 400
        if total_price == None or (type(total_price) != float and type(total_price) != int):
            return jsonify({ "status": "error", "message": "total_price is an required parameter and it must be a float or int." }), 400
        if prices == None or type(prices) != list:
            return jsonify({ "status": "error", "message": "prices is an required parameter and it must be a list." }), 400
        if sub_items == None or type(sub_items) != list or type(sub_items[0]) != list:
            return jsonify({ "status": "error", "message": "sub_items is an required parameter and it must be a list containing lists (2D array)." }), 400    

        # initialize a cursor
        cur = conn.cursor()
        
        #get the employee_id given the name
        if employee_name != None:
            cur.execute(f"SELECT employee_id FROM employees WHERE employee_name = '{employee_name}';")
            if cur.rowcount == 0:
                return jsonify({ "status": "error", "message": "No employee exists with this name." }), 400
            employee_id = cur.fetchall()[0][0]
        else:
            #hardcoded id in the database for customer kiosk (customer placed order)
            employee_id = 28

        #convert sub_items into sub_items_ids
        for item in range(len(sub_items)):
            sub_items_ids.append([])
            for item_name in sub_items[item]:
                cur.execute(f"SELECT item_id FROM items WHERE item_name = '{item_name}';")
                if cur.rowcount == 0:
                    return jsonify({ "status": "error", "message": f"No item exists with name: {item_name}." }), 400
                sub_items_ids[item].append(cur.fetchall()[0][0])

        order_id = None
        # add an entry to orders
        cur.execute(f"INSERT INTO orders (employee_id, customer_name, total_price, order_date) VALUES ({employee_id}, '{customer_name}', {total_price}, '{order_date}') RETURNING order_id;")
        order_id = cur.fetchall()[0][0]

        # add an entry to order_items for each item
        order_item_ids = []
        for i in prices:
            order_item_id = add_order_item(order_id, employee_id, i, order_date)
            order_item_ids.append(order_item_id)

        # add an entry to order_sub items for each order_sub_item
        for item in range(len(sub_items_ids)):
            for sub_item in range(len(sub_items_ids[item])):
                order_item_id = order_item_ids[item]
                sub_item_id = sub_items_ids[item][sub_item]
                performed = add_order_sub_item(order_item_id, order_id, sub_item_id, employee_id, order_date)
                if(not performed):
                    return jsonify({ "status": "error", "message": "Issue adding to order_sub_items." }), 400    

        
        conn.commit()
        cur.close()

        return jsonify({"status": "successful"}), 200

    except Exception as e:
        print("Error querying @ /orders/place_order ||", e)
        return jsonify({
            "status": "error",
            "message": str(e)
        }), 500