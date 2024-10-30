from flask import Flask, request, jsonify

from .views.employees import employees
from .views.ingredients_order_history import ingredients_order_history
from .views.ingredients import ingredients
from .views.items_order_history import items_order_history
from .views.items import items
from .views.menu_item_prices import menu_item_prices
from .views.order_items import order_items
from .views.order_sub_items import order_sub_items
from .views.orders import orders


def create_app():
    app = Flask(__name__)

    #register blueprints for all views
    app.register_blueprint(employees, url_prefix ='/employees')
    app.register_blueprint(ingredients_order_history, url_prefix ='/ingredients_order_history')
    app.register_blueprint(ingredients, url_prefix ='/ingredients')
    app.register_blueprint(items_order_history, url_prefix ='/items_order_history')
    app.register_blueprint(items, url_prefix ='/items')
    app.register_blueprint(menu_item_prices, url_prefix= '/menu_item_prices')
    app.register_blueprint(order_items, url_prefix="/order_items")
    app.register_blueprint(order_sub_items, url_prefix="/order_sub_items")
    app.register_blueprint(orders, url_prefix="/orders")

    return app