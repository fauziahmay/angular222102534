import { AfterViewInit, Component, Renderer2 } from '@angular/core';
import { RouterModule } from '@angular/router';
import { SidebarComponent } from '../sidebar/sidebar.component';
import { HeaderComponent } from '../header/header.component';
import { HttpClient } from '@angular/common/http';

declare const $: any;
declare const moment: any;

@Component({
  selector: 'app-cuaca',
  standalone: true,
  imports: [HeaderComponent, SidebarComponent, RouterModule],
  templateUrl: "./cuaca.component.html",
  styleUrl: "./cuaca.component.css",
})
export class CuacaComponent implements AfterViewInit {
  private table1: any;

  constructor(private renderer: Renderer2, private http: HttpClient) {
    this.renderer.removeClass(document.body, 'sidebar-open');
    this.renderer.addClass(document.body, 'sidebar-closed');
  }

  ngAfterViewInit(): void {
    this.table1 = $('#table1').DataTable({
      columnDefs: [
        {
          targets: 0,
          render: function (data: string) {
            const waktu = moment.utc(data).local(); // Konversi ke waktu lokal
            console.log(waktu.format()); // Debugging

            const html =
              waktu.format("YYYY-MM-DD") + "<br />" +
              waktu.format("HH:mm") + " WIB"; // Format waktu lebih jelas

            return html;
          },
        },
        {
          targets: [1],
          render: function (data: string) {
            return "<img src='" + data + "' style='filter: drop-shadow(5px 5px 10px rgba(0, 0, 0, 0.7));' />";
          },
        },
        {
          targets: [2],
          render: function (data: string) {
            const array = data.split("||");
            const cuaca = array[0];
            const description = array[1];
            return "<strong>" + cuaca + "</strong> <br />" + description;
          },
        },
      ],
    });

    this.getData();
  }

  getData(city: string = "pontianak"): void {
    city = encodeURIComponent(city);

    this.http
      .get('https://api.openweathermap.org/data/2.5/forecast?q=Pontianak&appid=c728c75997ff2fb778cd506c05885982')
      .subscribe((data: any) => {
        let list = data.list;
        console.log(list);

        this.table1.clear();

        list.forEach((element: any) => {
          const weather = element.weather[0];
          console.log(weather);

          const iconUrl = "https://openweathermap.org/img/wn/" + weather.icon + "@2x.png";
          const cuacaDeskripsi = weather.main + "|| " + weather.description;

          const main = element.main;
          console.log(main);

          const tempMin = this.KelvinToCelcius(main.temp_min);
          console.log({ tempMin });

          const tempMax = this.KelvinToCelcius(main.temp_max);
          console.log({ tempMax });

          const temp = tempMin + "°C - " + tempMax + "°C";

          const row = [element.dt_txt, iconUrl, cuacaDeskripsi, temp];

          this.table1.row.add(row);
        });

        this.table1.draw(false);
      }, (error: any) => {
        alert(error.error.message);
        this.table1.clear();
        this.table1.draw(false);
      });
  }

  KelvinToCelcius(kelvin: any): any {
    let celcius = kelvin - 273.15;
    return Math.round(celcius * 100) / 100;
  }

  handleEnter(event: any) {
    const cityName = event.target.value;

    if (cityName == "") {
      this.table1.clear();
      this.table1.draw(false);
    }

    this.getData(cityName);
  }
}
