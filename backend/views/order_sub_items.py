from flask import jsonify, Blueprint
from ..connection import conn

order_sub_items = Blueprint("order_sub_items", __name__)

#debugging 
print("running order_sub_items.py")

# helper function used by place_order to add its respective items to order-sub-items table
def add_order_sub_item(order_item_id, order_id, item_id, employee_id, order_date):
    try:
        # initialize a cursor
        cur = conn.cursor()

        cur.execute(f"INSERT INTO order_sub_items (order_item_id, order_id, item_id, employee_id, order_date) VALUES ({order_item_id}, {order_id}, {item_id}, {employee_id}, '{order_date}');")

        rows = cur.rowcount()

        #close cursor
        conn.commit()
        cur.close()

        return True if rows == 1 else False

    except Exception as e:
        return "Error querying @ add_order_item helper function ||", e