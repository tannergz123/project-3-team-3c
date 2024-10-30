from flask import Flask, request, jsonify

from backend.views import employees
# from .views import ingredients_order_history
# from .views import ingredients
# from backend.views import items_ingredients
# from backend.views import items_order_history
# from backend.views import items
# from backend.views import menu_item_prices
# from backend.views import order_items
# from backend.views import order_sub_items
# from backend.views import orders

def create_app():
    app = Flask(__name__)

    #register blueprints
    app.register_blueprint(employees)

    return app