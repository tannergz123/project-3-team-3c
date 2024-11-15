from flask import jsonify, Blueprint, request
from ..connection import conn

items_ingredients = Blueprint("items_ingredients", __name__)

#debugging 
print("running items_ingredients.py")

def add_mapping(item_name:str = None, ingredient_name:str = None, internal: bool = False): 
    """
    Adds a mapping between a given ingredient and a given item

    Parameters:
        item_name : the name of the item that needs to be added from the table
        ingredient_name : the name of the ingredient that needs to be added from the table
    
    Note: 
        If the internal flag is called, this method will operate as a function and not as an endpoint.
        In other words, this means that it will be used as a helper function by another function if internal is true. 
    """
    try:
        # Extract parameters from query arguments
        if not internal:
            item_name = request.args.get('item_name')
            ingredient_name = request.args.get('ingredient_name')

        # Ensure parameters are provided
        if ingredient_name is None or item_name is None:
            return jsonify({ "status": "error", "message": "ingredient_name and item_name is required" }), 400 if not internal else False
        
        #get ingredient and item ids if they exist
        cur = conn.cursor()
        cur.execute(f"SELECT ingredient_id FROM ingredients where ingredient_name = '{ingredient_name}';")

        if cur.rowcount == 0:
            return jsonify({ "status": "error", "message": "There is no ingredient in the database with this name." }), 404 if not internal else False
        
        ingredient_id = cur.fetchall()[0][0]

        cur.execute(f"SELECT item_id FROM items where item_name = '{item_name}';")

        if cur.rowcount == 0:
            return jsonify({ "status": "error", "message": "There is no item in the database with this name." }), 404 if not internal else False
        
        item_id = cur.fetchall()[0][0]

        #add the mapping
        cur.execute(f"INSERT INTO items_ingredients (ingredient_id, ingredient_name, item_id, item_name) VALUES ({ingredient_id}, '{ingredient_name}', {item_id}, '{item_name}');")

        #close cursor
        conn.commit()
        cur.close()

        return jsonify({"status": "successful"}), 200 if not internal else True
    
    except Exception as e:
        print("Error querying @ /item-ingredients/add-mapping ||", e)
        return jsonify({
            "status": "error",
            "message": str(e)
        }), 500 if not internal else False
