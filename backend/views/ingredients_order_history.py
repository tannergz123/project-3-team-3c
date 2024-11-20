from flask import jsonify, Blueprint, request
from ..connection import conn
from datetime import datetime

ingredients_order_history = Blueprint("ingredients_order_history", __name__)

print("running ingredients_order_history.py")

@ingredients_order_history.route("/add-record", methods=['POST'])
def add_record():
    """
    Inserts a new record of an ingredient order.

    Parameters:
    ingredient : the ingredient that was ordered
    quantity_ordered : the number of units of the ingredient that was orderd
    """
    try:
        # Extract parameters from query arguments
        data = request.get_json()
        ingredient = data.get('ingredient')
        quantity_ordered = data.get('quantity_ordered', type=float)
        id = -1

        # Ensure acceptable parameters are provided 
        if ingredient is None or quantity_ordered is None:
            return jsonify({ "status": "error", "message": "Both ingredient and quantity_ordered are required." }), 400
        
        if quantity_ordered < 0 or quantity_ordered > 1000:
            return jsonify({ "status": "error", "message": "quantity_ordered must be a positive value and be less than or equal 1000." }), 400
        
        #get primary key and verify if the ingredient does actually exist
        cur = conn.cursor()
        cur.execute(f"SELECT ingredient_id from ingredients WHERE ingredient_name = '{ingredient}';")

        if cur.rowcount == 0:
            return jsonify({ "status": "error", "message": "Given ingredient does not exist." }), 404
        else:
            id = cur.fetchall()[0][0]

        #add a new entry into the ingredients_order_history table
        current_datetime = str(datetime.now())
        cur.execute("SELECT MAX(ingredients_order_id) FROM ingredients_order_history;")
        ingredients_order_id = cur.fetchall()[0][0] + 1

        cur.execute(f"INSERT INTO ingredients_order_history (ingredients_order_id, ingredient_id, item, ordered, quantity_ordered) VALUES ({ingredients_order_id}, {id}, '{ingredient}', '{current_datetime}', {quantity_ordered});")

        if cur.rowcount == 0:
            return jsonify({ "status": "error", "message": "some error" }), 404
        else:
            print(f"{quantity_ordered} units of {ingredient} [{id}] successfully ordered on {current_datetime}")

        #close cursor
        conn.commit()
        cur.close()

        return jsonify({"status": "successful"}), 200
    except Exception as e:
        print("Error querying @ /ingredients_order_history/add_record ||", e)
        return jsonify({
            "status": "error",
            "message": str(e)
        }), 500