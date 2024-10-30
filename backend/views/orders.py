from flask import jsonify, Blueprint
from ..connection import conn

orders = Blueprint("orders", __name__)

#debugging 
print("running orders.py")