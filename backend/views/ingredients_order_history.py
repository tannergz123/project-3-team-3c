from flask import jsonify, Blueprint
from ..connection import conn

ingredients_order_history = Blueprint("ingredients_order_history", __name__)

print("running ingredients_order_history.py")