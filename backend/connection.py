from backend.config.settings import Config
import psycopg2

# Print debug information to confirm variables are loaded
print("Database credentials loaded:")
print(f"DB Name: {Config.DB_NAME}, DB User: {Config.DB_USER_NAME}, DB Host: {Config.DB_HOST_NAME}")

# Establish the database connection
try:
    conn = psycopg2.connect(
        dbname= Config.DB_NAME,
        user= Config.DB_USER_NAME,
        password= Config.DB_PASSWORD,
        host= Config.DB_HOST_NAME,
        port= 5432
    )
    print("Database connection successful")
except Exception as e:
    print("Error connecting to database:", e)