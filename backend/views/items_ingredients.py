from flask import jsonify, Blueprint, request
from ..connection import conn

items_ingredients = Blueprint("items_ingredients", __name__)

#debugging 
print("running items_ingredients.py")

@items_ingredients.route("/add-mapping", methods=["POST"])
def add_mapping(item_name = None, ingredient_name = None): 
    """
    Adds a mapping between a given ingredient and a given item

    Parameters:
        item_name : the name of the item that needs to be added from the table
        ingredient_name : the name of the ingredient that needs to be added from the table
    """
    try:
        # Extract parameters from query arguments
        item_name = request.args.get('item_name')
        ingredient_name = request.args.get('ingredient_name')

        # Ensure parameters are provided
        if ingredient_name is None or item_name is None:
            return jsonify({ "status": "error", "message": "ingredient_name and item_name is required" }), 400
        
        #get ingredient and item ids if they exist
        cur = conn.cursor()
        cur.execute(f"SELECT ingredient_id FROM ingredients where ingredient_name = '{ingredient_name}';")

        if cur.rowcount == 0:
            return jsonify({ "status": "error", "message": "There is no ingredient in the database with this name." }), 404
        
        ingredient_id = cur.fetchall()[0][0]

        cur.execute(f"SELECT item_id FROM items where item_name = '{item_name}';")

        if cur.rowcount == 0:
            return jsonify({ "status": "error", "message": "There is no item in the database with this name." }), 404
        
        item_id = cur.fetchall()[0][0]


        #add the mapping
        cur.execute(f"INSERT INTO items_ingredients (ingredient_id, ingredient_name, item_id, item_name) VALUES ({ingredient_id}, '{ingredient_name}', {item_id}, '{item_name}');")
        
        #close cursor
        conn.commit()
        cur.close()

        return jsonify({"status": "successful"}), 200
    
    except Exception as e:
        print("Error querying @ /item-ingredients/add-mapping ||", e)
        return jsonify({
            "status": "error",
            "message": str(e)
        }), 500



@items_ingredients.route("/delete-mapping", methods=["DELETE"])
def delete_mapping(item_name = None, ingredient_name = None):
    """
    deletes a mapping between a given ingredient and a given item

    Parameters:
        item_name : the name of the item that needs to be deleted from the table
        ingredient_name : the name of the ingredient that needs to be deleted from the table
    """
    try:
        # Extract parameters from query arguments
        item_name = request.args.get('item_name')
        ingredient_name = request.args.get('ingredient_name')

        # Ensure parameters are provided
        if ingredient_name is None or item_name is None:
            return jsonify({ "status": "error", "message": "ingredient_name and item_name is required" }), 400
        
        #get ingredient and item ids if they exist
        cur = conn.cursor()
        cur.execute(f"SELECT ingredient_id FROM ingredients where ingredient_name = '{ingredient_name}';")

        if cur.rowcount == 0:
            return jsonify({ "status": "error", "message": "There is no ingredient in the database with this name." }), 404

        cur.execute(f"SELECT item_id FROM items where item_name = '{item_name}';")

        if cur.rowcount == 0:
            return jsonify({ "status": "error", "message": "There is no item in the database with this name." }), 404

        #delete the mapping
        cur.execute(f"DELETE FROM items_ingredients WHERE ingredient_name = '{ingredient_name}' AND item_name = '{item_name}';")
        
        #close cursor
        conn.commit()
        cur.close()

        return jsonify({"status": "successful"}), 200
    
    except Exception as e:
        print("Error querying @ /item-ingredients/delete-mapping ||", e)
        return jsonify({
            "status": "error",
            "message": str(e)
        }), 500