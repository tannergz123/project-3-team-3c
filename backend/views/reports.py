from flask import jsonify, Blueprint, request
from ..connection import conn

reports = Blueprint("reports", __name__)

#debugging 
print("running reports.py")


@reports.route("/x-report", methods=["GET"])
def x_report():
    '''
    This gives sales per hour for the current day of operation. This can be run as many times as needed.
    
    Returns:
        JSON: 10 rows which details how many sales have been performed during a particular hour
        - 11 : 2
    '''
    try:
        rows = []

        #initialize a cursor
        cur = conn.cursor()

        for i in range(10, 20, 1):
            cur.execute(f"SELECT SUM(total_price) FROM Orders WHERE EXTRACT(HOUR FROM order_date) = {i} AND CAST(order_date AS DATE) = CAST(CURRENT_DATE AT TIME ZONE 'America/Chicago' AS DATE);")
            result = cur.fetchall()[0][0]
            rows.append(result if result != None else 0)

        #get column names 
        items = dict(zip(range(10,20, 1), rows))

        conn.commit()
        cur.close()

        return jsonify(items), 200
    
    except Exception as e:
        print("Error querying @ /reports/x-report ||", e)
        return jsonify({
            "status": "error",
            "message": str(e)
        }), 500


@reports.route("/z-report", methods=["GET"])
def z_report():
    '''
    Generates a report of the total sales in dollars for the current day.

    Returns:
        the total sales in dollars for the current day 
    '''
    try:
        #initialize a cursor
        cur = conn.cursor()

        cur.execute("SELECT SUM(total_price) FROM Orders WHERE CAST(order_date AS DATE) = CAST(CURRENT_DATE AT TIME ZONE 'America/Chicago' AS DATE);");

        total_sales = cur.fetchall()[0][0]
        if total_sales is None:
            total_sales = 0
    
        conn.commit()
        cur.close()

        return jsonify(total_sales), 200
    
    except Exception as e:
        print("Error querying @ /reports/z-report ||", e)
        return jsonify({
            "status": "error",
            "message": str(e)
        }), 500

@reports.route("/sales-report", methods=["GET"])
def sales_report():
    '''
    Generates a report of all items and their sales within a given start and end date.

    Parameters:
    start_date (YYYY-MM-DD): starting date that the sales report should generate from
    end_date (YYYY-MM-DD): ending date that the sales report should generate from 
    
    Returns:
    The number of sales of each item in the database within the range of the given start and end date as a JSON list.
    '''
    try:
        # Extract parameters from query arguments
        start_date = request.args.get("start_date")
        end_date = request.args.get("end_date")


        #initialize a cursor
        cur = conn.cursor()
        cur.execute(f"""
        SELECT i.item_name, SUM(i.quantity) AS total_sold FROM Order_Items oi 
        JOIN Items i ON oi.order_item_id = i.item_id 
            WHERE oi.order_date >= '{start_date} 00:00:00.000' AND oi.order_date <= '{end_date} 23:59:59.999' AND oi.order_item_id != '21'
        GROUP BY i.item_name;
        """)

        rows = cur.fetchall()

        #get column names 
        column_names = [desc[0] for desc in cur.description]
        items = [dict(zip(column_names, row)) for row in rows]

        conn.commit()
        cur.close()

        return jsonify(items), 200
    
    except Exception as e:
        print("Error querying @ /reports/sales-report ||", e)
        return jsonify({
            "status": "error",
            "message": str(e)
        }), 500

@reports.route("/insights-report", methods =["GET"])
def insights_report():
    '''
    Generates a series of relevant insights given a particular month. 

    Parameters:
    month = string or int representing the month which the insights report should be generated off of.

    Output:
    A JSON list containing the below information
    - Index 0: Top selling day
    - Index 1: Total sales for the top selling day
    - Index 2: Worst selling day
    - Index 3: Total sales for the worst selling day
    - Index 4: Top selling item for the month
    - Index 5: Total sales for the month
    '''
    try:
        month = int(request.args.get("month"))

        #validate data and convert it to the correct type
        if month is None:
            return jsonify({ "status": "error", "message": "The month name is required and can be either a string (January or january for example) or an int (1)." }), 400
        if type(month) == int and month < 1 or month > 12:
            return jsonify({ "status": "error", "message": "The month name must be between 1 and 12." }), 400
        if type(month) == str:
            match month:
                case  "January" | "january":
                    month = 1
                case "February" | "february":
                    return 2
                case "March" | "march":
                    return 3
                case "April" | "april":
                    return 4
                case "May" | "may":
                    return 5
                case "June" | "june":
                    return 6
                case "July" | "july":
                    return 7
                case "August" | "august":
                    return 8
                case "September" | "september":
                    return 9
                case "October" | "october":
                    return 10
                case "November" | "november":
                    return 11
                case "December" | "december":
                    return 12
        
        #initialize a cursor
        cur = conn.cursor()
        results = []

        queries = [
        f"SELECT EXTRACT(DAY FROM order_date), SUM(total_price) AS total_sales FROM Orders WHERE EXTRACT(MONTH FROM order_date) = {month} GROUP BY EXTRACT(DAY FROM order_date) ORDER BY total_sales DESC LIMIT 1;",
        f"SELECT EXTRACT(DAY FROM order_date), SUM(total_price) AS total_sales FROM Orders WHERE EXTRACT(MONTH FROM order_date) = {month} GROUP BY EXTRACT(DAY FROM order_date) ORDER BY total_sales ASC LIMIT 1;",
        f"SELECT item_name FROM Items WHERE item_id = (SELECT item_id FROM Order_Sub_Items WHERE EXTRACT(MONTH FROM order_date) = {month} GROUP BY item_id ORDER BY COUNT(*) DESC LIMIT 1);",
        f"SELECT SUM(total_price) FROM Orders WHERE EXTRACT(MONTH FROM order_date) = {month};"]

        output = []

        for i in range(4):
            cur.execute(queries[i])
            results = cur.fetchall()
            if i == 0 or i == 1:
                output.append(results[0][0] if len(results) != 0 else 0)
                output.append(results[0][1] if len(results) != 0 else 0)
                
            else:
                cur.execute(queries[i])
                output.append(results[0][0] if len(results) != 0 else 0)

        #get column names 
        column_names = [
            "Top selling day",
            "Total sales for the top selling day",
            "Worst selling day",
            "Total sales for the worst selling day",
            "Top selling item for the month",
            "Total sales for the month"
        ]

        items = dict(zip(column_names, output))

        #close the cursor
        conn.commit()
        cur.close()

        return jsonify(items), 200
    except Exception as e:
        print("Error querying @ /reports/insights-report ||", e)
        return jsonify({
            "status": "error",
            "message": str(e)
        }), 500

@reports.route("/product-usage-map", methods=["GET"])
def product_usage_map():
    '''
    Outputs a map of all the ingredients and their usage given a time period.

    Parameters:
    start_date (YYYY-MM-DD): starting date that the map should generate from
    end_date (YYYY-MM-DD): ending date that the map should generate from 

    Returns:
    A JSON map of all the ingredients with their units of usage
    '''
    try:
        # Extract parameters from query arguments
        data = request.get_json()
        start_date = data.get('start_date')
        end_date = data.get('end_date')

        #initialize a cursor
        cur = conn.cursor()
        cur.execute(f" SELECT item, SUM(quantity_ordered) FROM ingredients_order_history WHERE ordered >= '{start_date} 00:00:00.000' AND ordered <= '{end_date} 23:59:59.999' GROUP BY item;")

        rows = cur.fetchall()

        #get column names 
        column_names = [desc[0] for desc in cur.description]
        items = [dict(zip(column_names, row)) for row in rows]

        conn.commit()
        cur.close()

        return jsonify(items), 200
    
    except Exception as e:
        print("Error querying @ /reports/product-usage-map ||", e)
        return jsonify({
            "status": "error",
            "message": str(e)
        }), 500