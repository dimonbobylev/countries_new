export class Countries {
  country: string;
  capital: string;
  population: number;
  square: number;

  constructor(country: string, capital: string, population: number, square: number) {
    this.country = country;
    this.capital = capital;
    this.population = population;
    this.square = square;
  }
}
export class Distance {
  capital: string;
  distance: number;

  constructor(capital: string, distance: number) {
    this.capital = capital;
    this.distance = distance;
  }
}

