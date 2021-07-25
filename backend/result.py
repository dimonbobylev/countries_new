from operator import itemgetter

import database_setup as bd
from pyproj import Geod

g = Geod(ellps='WGS84')


def array_json(count):
    list_bd = []
    for item_country, item_capital in bd.all_countries(count):
        row_data = {'country': item_country.country,
                    'capital': item_capital.capital,
                    'population': item_country.population,
                    'square': item_country.square}
        list_bd.append(row_data)

    return list_bd


def distance(list_point):
    # print(f'shir1 = {list_point[0][0]} dolg1 = {list_point[0][1]}')
    # print(f'shir2 = {list_point[1][0]} dolg2 = {list_point[1][1]}')
    angle1, angle2, dist = g.inv(list_point[0][1], list_point[0][0], list_point[1][1], list_point[1][0])
    # print('distance python', dist)
    return dist


def information_cap(capital):
    array = []
    # print(capital)
    # for capital, latitude, longitude in bd.more_information():
    cap = bd.get_1cap(capital)
    # print(cap)
    lon1 = float(cap['longitude'])
    lat1 = float(cap['latitude'])
    for item in bd.more_information():
        if item['capital'] != capital:
            # print(item)
            lon2 = float(item['longitude'])
            lat2 = float(item['latitude'])
            angle1, angle2, dist = g.inv(lon1, lat1, lon2, lat2)
            # print(f'{item["capital"]} - {dist}')
            list1 = {
                'capital': item["capital"],
                'distance': dist}
            array.append(list1)
    array.sort(key=itemgetter('distance'))
    array_min = array[0:3]
    array_max = array[-3:]
    return array_min + array_max
