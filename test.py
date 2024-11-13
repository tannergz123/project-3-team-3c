import requests

def add(user_id, file):
    #ENTER THE USER ID
    user_id = "roop"

    url = "http://127.0.0.1:5000/user-add-file?user_id=" + user_id

    #files = {'file': open('/Users/apendela10/Downloads/test.txt', 'rb')}
    #files = {'file': open('/Users/apendela10/Downloads/test.png', 'rb')}
    response = requests.post(url, files=file)

    print(response.text)

def get(user_id):
    url = "http://127.0.0.1:5000/user-get-file?user_id=" + user_id
    response = requests.get(url)
    print(response.text)


files = [{'file': open('/Users/apendela10/Downloads/roopvid1.mov', 'rb')},
         {'file': open('/Users/apendela10/Downloads/roopvid2.mov', 'rb')},
         {'file': open('/Users/apendela10/Downloads/roopvid3.mov', 'rb')},
         {'file': open('/Users/apendela10/Downloads/roopvid4.mov', 'rb')},  
         {'file': open('/Users/apendela10/Downloads/rooppic1.png', 'rb')},
         {'file': open('/Users/apendela10/Downloads/rooppdf1.png', 'rb')}]

for f in files:
    add("roop", f)

get("roop")