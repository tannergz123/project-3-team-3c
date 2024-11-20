from flask import jsonify, Blueprint
from ..connection import conn

order_items = Blueprint("order_items", __name__)

#debugging 
print("running order_items.py")

# helper function used by place_order to add its respective items to order-items table
def add_order_item(order_id, employee_id, price, order_date):
    try:
        # initialize a cursor
        cur = conn.cursor()

        cur.execute(f"INSERT INTO order_items (order_id, employee_id, price, order_date) VALUES ({order_id}, {employee_id}, {price}, '{order_date}') RETURNING order_item_id;")

        order_item_id = cur.fetchall()[0][0]
        conn.commit()
        cur.close()

        return order_item_id

    except Exception as e:
        return "Error querying @ add_order_item helper function ||", e