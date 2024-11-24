from flask import jsonify, Blueprint, request
from ..connection import conn
from datetime import datetime

ingredients_order_history = Blueprint("ingredients_order_history", __name__)

print("running ingredients_order_history.py")

#helper method
def add_record(ingredient:str, quantity_ordered:int):
    """
    Inserts a new record of an ingredient order.

    Parameters:
    ingredient : the ingredient that was ordered
    quantity_ordered : the number of units of the ingredient that was orderd
    """
    try:
        id = -1

        # Ensure acceptable parameters are provided 
        if ingredient is None or quantity_ordered is None:
            print("All of ingredient, quantity_ordered, and ingredients_order_id are required.")
            return False
        
        if quantity_ordered < 0 or quantity_ordered > 1000:
            print("quantity_ordered must be a positive value and be less than or equal 1000.")
            return False

        #get primary key and verify if the ingredient does actually exist
        cur = conn.cursor()
        cur.execute(f"SELECT ingredient_id from ingredients WHERE ingredient_name = '{ingredient}';")

        if cur.rowcount == 0:
            print(f"{ingredient} does not exist in the table.")
            return False
        else:
            id = cur.fetchall()[0][0]

        #add a new entry into the ingredients_order_history table
        current_datetime = str(datetime.now())
        cur.execute("SELECT MAX(ingredients_order_id) FROM ingredients_order_history;")
        ingredients_order_id = cur.fetchall()[0][0] + 1

        cur.execute(f"INSERT INTO ingredients_order_history (ingredients_order_id, ingredient_id, item, ordered, quantity_ordered) VALUES ({ingredients_order_id}, {id}, '{ingredient}', '{current_datetime}', {quantity_ordered});")

        if cur.rowcount == 0:
            print(f"Unable to add record of {quantity_ordered} order of {ingredient}.")
            return False

        #close cursor
        conn.commit()
        cur.close()

        return True
    except Exception as e:
        print("Error querying @ /ingredients_order_history/add_record ||", e)
        return False