CSCE 331 - Project 3 
Abhi
Tanner
William
Kane
Ashwin
## Link
https://project-3-team-3c.vercel.app/  

## Backend Organization and Overview
```
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
```

## Using the Backend (Note to Frontend Devs)  
- Documentation for all backend endpoints and there usage is available here:  
https://docs.google.com/spreadsheets/d/1bq5GKnWesEZaCweNOO3kiXcpDGl0d-IX0HfmVjUvZJ8/edit?gid=0#gid=0    
- How to use the backend:  
1. The backend takes in JSON requests, and ouputs a JSON output.  
2. Address information for the endpoints.
    - General format: Link/table/method
    - Example: https://project-3-team-3c.onrender.com/employees/get-employees

