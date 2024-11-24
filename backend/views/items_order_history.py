from flask import jsonify, Blueprint, request
from ..connection import conn
from datetime import datetime

items_order_history = Blueprint("items_order_history", __name__)

print("running items_order_history.py")

#helper method 
def add_record(item:str, quantity_made:int):
    """
    Inserts a new record of an item order.

    Parameters:
    item : the menu item that was ordered
    quantity_ordered : the number of units of the menu item that was made
    """
    try:
        id = -1

        #basic input validation        
        if quantity_made < 0 or quantity_made > 1000:
            print("Error querying @ /items_order_history/add_record ||", "quantity_ordered must be a positive value and be less than or equal 1000.")
            return False
                
        #get primary key and verify if the item does actually exist
        cur = conn.cursor()
        cur.execute(f"SELECT item_id from items WHERE item_name = '{item}';")

        if cur.rowcount == 0:
            print(f"{item} does not exist in the table.")
            return False
        else:
            id = cur.fetchall()[0][0]

        #add a new entry into the items_order_history table
        current_datetime = str(datetime.now())
        cur.execute("SELECT MAX(item_order_id) FROM items_order_history;")
        item_order_id = cur.fetchall()[0][0] + 1

        cur.execute(f"INSERT INTO items_order_history (item_order_id, item_id, item, item_made, quantity_made) VALUES ({item_order_id}, {id}, '{item}', '{current_datetime}', {quantity_made});")

        if cur.rowcount == 0:
            print(f"Unable to add record of {quantity_made} order of {item}.")
            return False

        #close cursor
        conn.commit()
        cur.close()

        return True
    except Exception as e:
        print("Error querying @ /items_order_history/add_record ||", e)
        return jsonify({
            "status": "error",
            "message": str(e)
        }), 500