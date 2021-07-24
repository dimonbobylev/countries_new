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


def all_countries(count):
    countries_array = []
    query = session.query(Countries, Capitals).select_from(Capitals).join(Countries)[0:count]
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

