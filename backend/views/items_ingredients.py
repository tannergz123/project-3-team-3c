from flask import jsonify, Blueprint
from ..connection import conn

items_ingredients = Blueprint("items_ingredients", __name__)

#debugging 
print("running items_ingredients.py")