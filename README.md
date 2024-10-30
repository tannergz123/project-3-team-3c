CSCE 331 - Project 3 
Abhi
Tanner
William
Kane
Ashwin
## Getting Started

How to create hello world flask

https://linuxize.com/post/how-to-install-flask-on-ubuntu-20-04/

## Backend Organization and Overview

project-3-team-3c/
│
├── backend/
│   ├── __init__.py          # Initialize the backend package and create the app
│   ├── connection.py        # Database connection logic
│   ├── views/               # API endpoints (CRUD operations)
│   │   ├── __init__.py
│   │   ├── employees.py     # Employee-related endpoints
│   │   ├── ingredients.py    # Ingredient-related endpoints
│   │   └── ...
│   ├── services/            # Business logic and complex operations (yet to implement)
│   │   ├── __init__.py
│   │   └── ...
│   └── config/              # Configuration settings (creating environment variable, etc.)
│       └── settings.py
├── .env                     # Environment variables
└── app.py                # Entry point to run the app
