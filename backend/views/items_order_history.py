from flask import jsonify, Blueprint, request
from ..connection import conn
from datetime import datetime

items_order_history = Blueprint("items_order_history", __name__)

print("running items_order_history.py")

@items_order_history.route("/add-record", methods=['POST'])
def add_record():
    """
    Inserts a new record of an item order.

    Parameters:
    item : the menu item that was ordered
    quantity_ordered : the number of units of the menu item that was orderd
    """
    try:
        # Extract parameters from query arguments
        item = request.args.get('item')
        quantity_ordered = request.args.get('quantity_ordered', type=float)
        id = -1

        # Ensure acceptable parameters are provided 
        if item is None or quantity_ordered is None:
            return jsonify({ "status": "error", "message": "Both item and quantity_ordered are required." }), 400
        
        if quantity_ordered < 0 or quantity_ordered > 1000:
            return jsonify({ "status": "error", "message": "quantity_ordered must be a positive value and be less than or equal 1000." }), 400
        
        #get primary key and verify if the item does actually exist
        cur = conn.cursor()
        cur.execute(f"SELECT item_id from items WHERE item_name = '{item}';")

        if cur.rowcount == 0:
            return jsonify({ "status": "error", "message": "Given item does not exist." }), 404
        else:
            id = cur.fetchall()[0][0]

        #add a new entry into the items_order_history table
        current_datetime = str(datetime.now())
        cur.execute("SELECT MAX(items_order_id) FROM items_order_history;")
        item_order_id = cur.fetchall()[0][0] + 1

        cur.execute(f"INSERT INTO items_order_history (item_order_id, item_id, item, ordered, quantity_ordered) VALUES ({item_order_id}, {id}, '{item}', '{current_datetime}', {quantity_ordered});")

        if cur.rowcount == 0:
            return jsonify({ "status": "error", "message": "some error" }), 404
        else:
            print(f"{quantity_ordered} units of {item} [{id}] successfully ordered on {current_datetime}")

        #close cursor
        conn.commit()
        cur.close()

        return jsonify({"status": "successful"}), 200
    except Exception as e:
        print("Error querying @ /items_order_history/add_record ||", e)
        return jsonify({
            "status": "error",
            "message": str(e)
        }), 500