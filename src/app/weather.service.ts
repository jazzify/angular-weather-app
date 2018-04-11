import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class WeatherService {
  constructor(private http: HttpClient) { }

  api_key = "56c9249c54474e3b2072bcceb69b36ff";

  getWeather(city){
    return this.http.get(`http://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${this.api_key}&units=metric`);
  }
}
