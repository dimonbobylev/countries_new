from flask import Flask, jsonify, request
from flask_cors import CORS

import database_setup
import result


app = Flask(__name__)
CORS(app)


@app.route("/getCountries", methods=['GET'])
def get_countries():
    count = int(request.args.get("_limit"))
    # print(count)
    # count = 7  # count - количество стран для отображения
    list_bd = result.array_json(count)
    # print(list_bd)
    return jsonify(list_bd)


@app.route("/informationCapital", methods=['GET'])
def get_information():
    capital = request.args.get("_limit")
    print(f'Информация о {capital}')
    list_bd = result.information_cap(capital)
    print(list_bd)
    # list_bd = sorted(list_bd, key=lambda x: x[1])
    # list_min = list_bd[0:3]
    # list_max = list_bd[-3:]
    return jsonify(list_bd)


@app.route("/populationCapital", methods=['GET'])
def get_population():
    capital = request.args.get("_limit")
    print(f'populationCapital {capital}')
    return jsonify(database_setup.get_population(capital))


@app.route("/onCalculationRoute", methods=['POST'])
def calculation_route():
    f = request.json
    # print(f)
    # print(f'start {f["pointStart"]} finish {f["pointFinish"]}')
    list_bd = database_setup.calc(f["pointStart"], f["pointFinish"])
    # print(list_bd)
    dist = result.distance(list_bd)
    # print(dist)
    return jsonify(dist)


if __name__ == '__main__':
    app.run(debug=True)
