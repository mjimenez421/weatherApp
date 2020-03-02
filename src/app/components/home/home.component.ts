import { Component, OnInit} from '@angular/core';
import { HttpClient } from '@angular/common/http';

interface WeatherData {
  coord:
    {lon: number,
    lat: number};
  weather: [{
      id: string,
      main: string,
      description: string,
      icon: string}];
  base: string;
  main:
    {temp: number,
     feels_like: number,
     temp_min: number,
     temp_max: number,
     pressure: number,
     humidity: number,
     sea_level: number,
     grnd_level: number};
  wind:
    {speed: number,
    deg: number};
  clouds: {all: string};
  dt: string;
  sys: {
    country: string;
    sunrise: string,
    sunset: string};
  timezone: string;
  id: string;
  name: string;
  cod: string;
}

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  showWeather: boolean;
  locations: number;
  lat: number[] = [];
  long: number[] = [];
  description: string[] = [];
  temp: number[] = [];
  windChill: number[] = [];
  humidity: number[] = [];
  wind: number[] = [];
  city: string[] = [];
  country: string[] = [];

  constructor(private httpClient: HttpClient) { }

  ngOnInit() {
    this.showWeather = false;
  }

 

  onBlur(event) {
    this.locations = event.target.value;
  }

  getWeather() {
    console.log('weather click');
    this.lat.length = 0;
    this.long.length = 0;
    this.description.length = 0;
    this.temp.length = 0;
    this.windChill.length = 0;
    this.humidity.length = 0;
    this.wind.length = 0;
    this.city.length = 0;
    this.country.length = 0;

    for (let i = 0; i < this.locations; i++) {
      this.httpClient.get<WeatherData>('http://localhost:3001/get').subscribe(
        response => {
          switch (response.base) {
            case('random'):
              console.log('random number can\'t be accessed');
              break;
            case('weather'):
              console.log('weather can\'t be accessed');
              break;
            case('stations'):
              console.log(response);
              this.showWeather = true;
              this.lat.push(response.coord.lat);
              this.long.push(response.coord.lon);
              this.description.push(response.weather[0].description);
              this.temp.push(response.main.temp);
              this.windChill.push(response.main.feels_like);
              this.humidity.push(response.main.humidity);
              this.wind.push(response.wind.speed);
              if (response.name) {
                this.city.push(response.name);
              } else {
                this.city.push('middle of nowhere');
              }
              if (response.sys.country) {
                this.country.push(response.sys.country);
              } else {
                this.country.push('');
              }
              break;
          }
        }
      );
    } 
  }

}
