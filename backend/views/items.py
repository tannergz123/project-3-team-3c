from flask import jsonify, Blueprint
from ..connection import conn

items = Blueprint("items", __name__)

#debugging 
print("running items.py")


@items.route("/get-items", methods=["GET"])
def get_items():
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