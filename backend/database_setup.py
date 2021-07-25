# для настройки баз данных
from sqlalchemy import Column, ForeignKey, Integer, String, Float, or_

# для определения таблицы и модели
from sqlalchemy.ext.declarative import declarative_base

# для создания отношений между таблицами
from sqlalchemy.orm import relationship, sessionmaker

# для настроек
from sqlalchemy import create_engine

# создание экземпляра declarative_base
Base = declarative_base()


class Countries(Base):
    __tablename__ = 'countries'

    id = Column(Integer, primary_key=True, autoincrement=True)
    country = Column(String(50), nullable=False)
    population = Column(Float)
    square = Column(Integer)


class Capitals(Base):
    __tablename__ = 'capitals'

    id = Column(Integer, primary_key=True, autoincrement=True)
    country_id = Column(Integer, ForeignKey('countries.id'))
    capital = Column(String(50), nullable=False)
    population = Column(Float)
    latitude = Column(Float)
    longitude = Column(Float)


# создает экземпляр create_engine в конце файла
engine = create_engine('sqlite:///countries-collection.db')

Base.metadata.create_all(engine)

Session = sessionmaker(bind=engine)

session = Session()


def all_countries(count_frontend):
    countries_array = []
    count_bd = session.query(Countries).count()
    if count_frontend > count_bd:
        count_frontend = count_bd
    # print("count = ", count_frontend)
    query = session.query(Countries, Capitals).select_from(Capitals).join(Countries)[0:count_frontend]
    for instance in query:
        countries_array.append(instance)
    return countries_array


def calc(start, finish):
    array = []
    query = session.query(Capitals).filter(or_(Capitals.capital == start, Capitals.capital == finish))
    for item in query:
        # print(item.latitude, item.longitude)
        array.append((item.latitude, item.longitude))
    return array


def more_information():
    array = []
    for item in session.query(Capitals):
        row_data = {'capital': item.capital,
                    'latitude': item.latitude,
                    'longitude': item.longitude}
        array.append(row_data)
    # print(array)
    return array


def get_1cap(capital):
    cap = {}
    for item in session.query(Capitals).filter(Capitals.capital == capital):
        cap = {'capital': item.capital,
               'latitude': item.latitude,
               'longitude': item.longitude}
    return cap


def get_population(capital):
    for item in session.query(Capitals).filter(Capitals.capital == capital):
        population = item.population
    return population

