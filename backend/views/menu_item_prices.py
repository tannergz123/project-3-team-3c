from flask import jsonify, Blueprint, request
from ..connection import conn

menu_item_prices = Blueprint("menu_item_prices", __name__)

#debugging 
print("running menu_item_prices.py")

@menu_item_prices.route("/get-menu-item-prices", methods=['GET'])
def get_menu_item_prices():
    """
    Queries the menu_item_prices and returns all values.

    Returns:
        JSON: A list of all menu items and their prices and values menu_item_name, menu_item_price.
    """

    try:
        #initialize a cursor and execute a query
        cur = conn.cursor()
        cur.execute('SELECT menu_item_name, menu_item_price FROM menu_item_prices;')
        
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
        print("Error querying @ /menu_item_prices/get-menu-item-prices ||", e)
        return jsonify({
            "status": "error",
            "message": str(e)
        }), 500

@menu_item_prices.route("/update-menu-item-prices", methods=['PUT'])
def update_menu_item_prices():
    """
    Updates menu_item_prices by changing the price of an existing menu_item

    Parameters:
    menu_item : the menu item whose price needs to be modified
    price : the new price that you want to set the menu item to
    """
    try:
        # Extract parameters from query arguments
        menu_item = request.args.get('menu_item')
        price = request.args.get('price', type=float)

        # Ensure parameters are provided
        if menu_item is None or price is None:
            return jsonify({ "status": "error", "message": "Both menu_item and price are required." }), 400
        
        #initialize a cursor and execute a query
        cur = conn.cursor()
        cur.execute('UPDATE menu_item_prices SET menu_item_price = ' + str(price) + 'WHERE menu_item_name = \'' + str(menu_item) + '\';')

        if cur.rowcount == 0:
            return jsonify({ "status": "error", "message": "Given menu item does not exist." }), 404
        else:
            print(f"{menu_item} price changed to: ${price}")
        
        #close cursor
        conn.commit()
        cur.close()

        return jsonify({"status": "successful"}), 200
    except Exception as e:
        print("Error querying @ /menu_item_prices/update-menu-item-prices ||", e)
        return jsonify({
            "status": "error",
            "message": str(e)
        }), 500