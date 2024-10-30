from flask import jsonify, Blueprint
from ..connection import conn

items = Blueprint("items", __name__)

#debugging 
print("running items.py")