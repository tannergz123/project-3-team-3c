from flask import Flask, request, jsonify

from .views.employees import employees

def create_app():
    app = Flask(__name__)

    #register blueprints
    app.register_blueprint(employees, url_prefix = '/employees')

    return app