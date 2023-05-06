import json 
import uuid
def open_json(file_name):
    with open(file_name, 'r', encoding='utf-8') as f:
        data = json.load(f)
        return data
    
def save_json(data):
    with open('../src/assets/data/data.json', 'w', encoding='utf-8') as f:
        json.dump(data, f)

def main():
    data_old = open_json('./data.json')
    dir_data = {}

    for row in data_old:
        key = row['place'] + ", " + row['regonal']
        if dir_data.get(key) :
            dir_data[key]["count"] += int(row["total"])
        else:
            if row["corr"]:
                dir_data[key] = {
                    "id" : str(uuid.uuid4()),
                    "name": row['place'],
                    "location": row['location'],
                    "coordinates": row["corr"],
                    "count": int(row["total"])
                }
            else :
                print(row['location'],)

    data = []
    for _, value in dir_data.items():
        data.append(value)

    data = sorted(data, key=lambda x:x['count'], reverse=True)
    save_json(data)


if "__main__" == __name__ :
    main()