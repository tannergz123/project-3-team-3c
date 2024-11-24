from flask import jsonify, Blueprint, request
import json
from ..connection import conn
from .items_ingredients import add_mapping
from .items_order_history import add_record

items = Blueprint("items", __name__)

#Global variables
ITEM_TYPES = ['Appetizer', 'Entree', 'Side', 'Drink', 'Packaging']

#debugging 
print("running items.py")


@items.route("/get-all-items", methods=["GET"])
def get_all_items():
    """
    Queries the items table and returns item_name, item_type, calories, protein, calories for all active items.

    Returns:
        JSON: A list of entries from the items table with values item_name, item_type, calories, protein, calories and protein
    """
    try:
        #initialize a cursor and execute a query
        cur = conn.cursor()
        cur.execute('SELECT item_name, item_type, calories, protein, calories FROM items WHERE active_item = True;')

        #get output
        rows = cur.fetchall()

        #get column names 
        column_names = [desc[0] for desc in cur.description]
        items = [dict(zip(column_names, row)) for row in rows]

        conn.commit()
        cur.close()

        return jsonify(items), 200
    
    except Exception as e:
        print("Error querying @ /items/get-all-items ||", e)
        return jsonify({
            "status": "error",
            "message": str(e)
        }), 500

@items.route("/get-item", methods=["GET"])
def get_item():
    """
    Queries the items table and returns entries that are valid.

    Returns:
        JSON: A list of entries from the items table with values item_name, item_type
    """

    try:
        #initialize a cursor and execute a query
        cur = conn.cursor()
        cur.execute('SELECT item_name, item_type FROM items WHERE active_item = True;')

        #get output
        rows = cur.fetchall()

        #get column names 
        column_names = [desc[0] for desc in cur.description]
        items = [dict(zip(column_names, row)) for row in rows]

        conn.commit()
        cur.close()

        return jsonify(items), 200
    
    except Exception as e:
        print("Error querying @ /items/get-items ||", e)
        return jsonify({
            "status": "error",
            "message": str(e)
        }), 500

@items.route("/add-item", methods=["POST"])
def add_item():
    '''
    Adds an item to the item's table given all ingredients exist as ingredients. 

    Parameters: 
    item_name = the name of the new menu item
    item_type = the type of the new item (Appetizer, Entree, Packaging, Side, Drink)
    ingredient_names = an array on ingredients required to make the new menu item
    '''
    try:
        # Extract parameters from query arguments
        data = request.get_json()
        item_name = data.get('item_name')
        ingredients = data.get('ingredients')
        item_type = data.get('item_type')

        # Ensure acceptable parameters are provided 
        if item_name is None or ingredients is None or item_type is None:
            return jsonify({ "status": "error", "message": "Both item_name and ingredients and item_type are required." }), 400
        
        if item_type not in ITEM_TYPES:
            return jsonify({ "status": "error", "message": f"The item type you have entered is not a valid item type. The valid item types are {ITEM_TYPES}." }), 400
        
        if type(ingredients) != list:
            return jsonify({ "status": "error", "message": "The ingredients parameter must be a list/array." }), 400


        # initialize a cursor
        cur = conn.cursor()

        # verify that all ingredients given do exist in the database
        for ingredient in ingredients:
            cur.execute(f"SELECT COUNT(*) FROM ingredients WHERE ingredient_name = '{ingredient}';")
            count = cur.fetchall()[0][0]
            if count == 0:
                return jsonify({ "status": "error", "message": f"The ingredient {ingredient} does not exist in the database." }), 400

        # add the new item to the items table
        cur.execute(f"INSERT INTO items (item_name, item_type, quantity, active_item) VALUES ('{item_name}', '{item_type}', 0, 'TRUE');")

        # add the relevant item and ingredient mappings to the item_ingredients table
        for ingredient in ingredients:
            res = add_mapping(item_name, ingredient, True)

        conn.commit()
        cur.close()

        return jsonify({"status": "successful"}), 200
    
    except Exception as e:
        print("Error querying @ /items/add-item ||", e)
        return jsonify({
            "status": "error",
            "message": str(e)
        }), 500

@items.route("/delete-item", methods=["DELETE"])
def delete_item():
    '''
    Makes the active_item status of the requested item False if it exists.

    Parameters: 
    item_name = the name of the menu item
    '''

    try:
        # Extract parameters from query arguments
        data = request.get_json()
        item_name = data.get('item_name')

        # Ensure acceptable parameters are provided 
        if item_name is None:
            return jsonify({ "status": "error", "message": "item_name is required." }), 400

        # initialize a cursor
        cur = conn.cursor()

        # set the item's active status to false if it doesn't exist
        cur.execute(f"UPDATE items SET active_item = false WHERE item_name = '{item_name}';")

        if cur.rowcount == 0:
            return jsonify({ "status": "error", "message": f"The item {item_name} does not exist in the items table." }), 400

        conn.commit()
        cur.close()

        return jsonify({"status": "successful"}), 200

    except Exception as e:
        print("Error querying @ /items/delete-item ||", e)
        return jsonify({
            "status": "error",
            "message": str(e)
        }), 500

@items.route("/make-items", methods=["PUT"])
def make_items():
    """
    Make [quantity] number of [item_name] items.  

    Parameters:
    item_name : the name of the item you want to make more of
    quantity: the amount of the item that you want to make more of
    """

    try:
        #Extract parameters from query parameters
        data = request.get_json()
        item_name = data.get('item_name')
        quantity = data.get('quantity')

        # Ensure parameters are provided
        if item_name is None and type(item_name) != str:
            return jsonify({ "status": "error", "message": "item_name is required" }), 400
        if quantity is None and type(quantity) != int:
            return jsonify({ "status": "error", "message": "quantity is required" }), 400
        
        # update the quantity of the ingredient
        cur = conn.cursor()
        cur.execute(f"UPDATE items SET quantity = quantity + {quantity}  WHERE item_name = '{item_name}' AND active_item = 'true';")

        # ensure that a row has been updated
        if cur.rowcount == 0:
            return jsonify({ "status": "error", "message": f"{item_name} must exist in the items table and be an active item." }), 400

        # call helper function to add a record of this order
        record_added = add_record(item_name, quantity)
        if not record_added:
            return jsonify({ "status": "error", "message": f"Issue with adding a record of this make item order into the database."}), 400
        

        # close cursor
        conn.commit()
        cur.close()

        return jsonify({"status": "successful"}), 200
    except Exception as e:
        print("Error querying @ /items/make-items ||", e)
        return jsonify({
            "status": "error",
            "message": str(e)
        }), 500


