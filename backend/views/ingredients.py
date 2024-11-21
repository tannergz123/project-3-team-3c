from flask import jsonify, Blueprint, request
from ..connection import conn

ingredients = Blueprint("ingredients", __name__)

#debugging
print("running ingredients.py")

@ingredients.route("/get-ingredients", methods=["GET"])
def get_ingredients():
    """
    Queries the ingredients database and returns all values. 

    Returns:
        JSON: A list of all ingredients in the database and values ingredient_name, quantity.
    """
    try:
        #initialize a cursor and execute a query
        cur = conn.cursor()
        cur.execute('SELECT ingredient_name, quantity FROM ingredients;')
        
        #get output
        rows = cur.fetchall()

        #get column names 
        column_names = [desc[0] for desc in cur.description]
        items = [dict(zip(column_names, row)) for row in rows]
        
        #close cursor
        conn.commit()
        cur.close()

        return jsonify(items), 200
    
    except Exception as e:
        print("Error querying @ /ingredients/get-ingredients ||", e)
        return jsonify({
            "status": "error",
            "message": str(e)
        }), 500
    

@ingredients.route("/add-ingredients", methods=["POST"])
def add_ingredients():
    """
    Inserts a new ingredient to the table of ingredients.

    Parameters:
    ingredient_name : the new ingredient thats going to be added
    """

    try:
        #Extract parameters from query parameters
        data = request.get_json()
        ingredient_name = data.get('ingredient_name')

        # Ensure parameters are provided
        if ingredient_name is None:
            return jsonify({ "status": "error", "message": "ingredient_name is required" }), 400
        
        # verify that the ingredient doesn't already exist
        cur = conn.cursor()
        cur.execute(f"SELECT COUNT(*) FROM ingredients WHERE ingredient_name = '{ingredient_name}';")
        exists = cur.fetchall()

        if exists == 1:
            return jsonify({ "status": "error", "message": "ingredient_name already exists in the table" }), 400

        #add the new ingredient to the ingredients table
        cur.execute("SELECT MAX(ingredient_id) FROM ingredients;")
        ingredient_id = cur.fetchall()[0][0] + 1

        print(f"INSERT INTO ingredients (ingredient_id, ingredient_name, quantity) VALUES ({ingredient_id}, '{ingredient_name}', {0});")
        cur.execute(f"INSERT INTO ingredients (ingredient_id, ingredient_name, quantity) VALUES ({ingredient_id}, '{ingredient_name}', {0});")

        if cur.rowcount == 0:
            return jsonify({ "status": "error", "message": "There is an error with your input." }), 404
        else:
            print("has been added to the employees table.")
        
        #close cursor
        conn.commit()
        cur.close()

        return jsonify({"status": "successful"}), 200
    except Exception as e:
        print("Error querying @ /ingredients/add-ingredients ||", e)
        return jsonify({
            "status": "error",
            "message": str(e)
        }), 500

@ingredients.route("/order-ingredients", methods=["PUT"])
def order_ingredients():
    """
    Orders [quantity] number of [ingredient_name] ingredient.  

    Parameters:
    ingredient_name : the name of the ingredient you want to order more of
    quantity: the amount of the ingredient that you want to order more of
    """

    try:
        #Extract parameters from query parameters
        data = request.get_json()
        ingredient_name = data.get('ingredient_name')
        quantity = data.get('quantity')

        # Ensure parameters are provided
        if ingredient_name is None and type(ingredient_name) != str:
            return jsonify({ "status": "error", "message": "ingredient_name is required" }), 400
        if quantity is None and type(quantity) != int:
            return jsonify({ "status": "error", "message": "quantity is required" }), 400
        
        # update the quantity of the ingredient
        cur = conn.cursor()
        cur.execute(f"UPDATE ingredients SET quantity = quantity + {quantity}  WHERE ingredient_name = '{ingredient_name}';")

        # ensure that a row has been updated
        if cur.rowcount == 0:
            return jsonify({ "status": "error", "message": f"{ingredient_name} doesn't exist in the ingredients table." }), 400

        
        #close cursor
        conn.commit()
        cur.close()

        return jsonify({"status": "successful"}), 200
    except Exception as e:
        print("Error querying @ /ingredients/order-ingredients ||", e)
        return jsonify({
            "status": "error",
            "message": str(e)
        }), 500