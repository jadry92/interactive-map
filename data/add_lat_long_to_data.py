import json
import time
from geopy.geocoders import Nominatim
from geopy.exc import GeocoderTimedOut, GeocoderServiceError
from random import randint

def location_lat_long(address, geolocator):
    
    try :
        location = geolocator.geocode(f"Colombia, {address}")
        if location:            
            print(f"found -> {address}")
            return [location.latitude, location.longitude]
        else:
            print(f"No found -> {address}")
            return [0,0]
    except GeocoderTimedOut:
        print(f"TIME OUT -> GeocoderTimedOut: Retrying...{address}")
        time.sleep(randint(100,1000)/100)
        location_lat_long(address, geolocator)
    except GeocoderServiceError as e:
        print('CONNECTION REFUSED: GeocoderServiceError encountered.')
        print(e)
        return [0,0]
    except Exception as e:
        print(f'Error -> {e}')
        return[0,0]

def main():
    user_agent = 'johan_me_{}'.format(randint(10000,99999))
    geolocator = Nominatim(user_agent=user_agent)
    data = None
    with open('./data.json', 'r', encoding='utf-8') as f:
        data = json.load(f)
    
    locations = {}
    for row in data:
        locations[f"{row['regonal']}, {row['location']}"] = None
        
    for key in locations.keys():
        corr = location_lat_long(key, geolocator)
        locations[key] = corr

    for row in data:
        key = f"{row['regonal']}, {row['location']}"
        row['corr'] = locations[key]

    with open('./data.json', 'w', encoding='utf-8') as f:
        json.dump(data, f)


if __name__ == "__main__":
    main()