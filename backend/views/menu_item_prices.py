from flask import jsonify, Blueprint
from ..connection import conn

menu_item_prices = Blueprint("menu_item_prices", __name__)

#debugging 
print("running menu_item_prices.py")