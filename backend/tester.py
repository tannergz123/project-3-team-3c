import connection

conn = connection.conn

cur = conn.cursor()
cur.execute('SELECT * FROM Items;')
rows = cur.fetchall()
print(rows)
conn.commit()
conn.close()