import psycopg2
import os
from dotenv import load_dotenv

load_dotenv()

conn = psycopg2.connect(database = os.getenv('DB_NAME'), 
                        user = os.getenv("DB_USER_NAME"), 
                        host= os.getenv("DB_HOST_NAME"),
                        password = os.getenv("DB_PASSWORD"),
                        port = 5432)

