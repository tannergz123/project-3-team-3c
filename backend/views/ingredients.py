from flask import jsonify, Blueprint
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