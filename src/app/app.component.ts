import { Component, ViewChild, ElementRef } from '@angular/core';
import { Weather } from './weather.model';
import { WeatherService } from './weather.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers: [WeatherService]
})
export class AppComponent {
  @ViewChild('cityName') cityName: ElementRef;
  showInfo:boolean = false;
  errorMessage: string = '';
  weather_element: Weather;

  constructor(private weatherService: WeatherService){ }

  onGetWeather() {
    let cityName = this.cityName.nativeElement.value;

    if (!cityName) {
      this.errorMessage = 'Please type a city name.';
      this.showInfo = false;
    }
    else {
      this.errorMessage = '';
      this.weatherService.getWeather(cityName)
      .subscribe(
        weather_obj => {
          this.weather_element = new Weather(
            weather_obj['name'],
            weather_obj['sys'].country,
            weather_obj['main'].temp,
            weather_obj['main'].humidity,
            weather_obj['weather'][0].description
          );
          this.showInfo = true;
        },
        error => {
          this.errorMessage = error.error['message'];
          this.showInfo = false;
        }
      );
    }
  }

}
