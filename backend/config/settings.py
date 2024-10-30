# backend/config/settings.py

import os
from dotenv import load_dotenv

#load environment veriables
load_dotenv()

class Config:
    # Retrieve database credentials from environment variables
    DB_NAME = os.getenv('DB_NAME')
    DB_USER_NAME = os.getenv('DB_USER_NAME')
    DB_PASSWORD = os.getenv('DB_PASSWORD')
    DB_HOST_NAME = os.getenv('DB_HOST_NAME')