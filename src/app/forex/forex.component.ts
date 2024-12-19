import { AfterViewInit, Component, Renderer2 } from '@angular/core';
import { HeaderComponent } from "../header/header.component";
import { SidebarComponent } from "../sidebar/sidebar.component";
import { FooterComponent } from "../footer/footer.component";
import { HttpClient } from '@angular/common/http';
import { formatCurrency } from '@angular/common';

declare const $: any;

@Component({
  selector: 'app-forex',
  standalone: true,
  imports: [HeaderComponent, SidebarComponent, FooterComponent],
  templateUrl: './forex.component.html',
  styleUrls: ['./forex.component.css']
})
export class ForexComponent implements AfterViewInit {
  private _table1: any;

  constructor(private renderer: Renderer2, private httpClient: HttpClient) {}

  ngAfterViewInit(): void {
    this.renderer.removeClass(document.body, "sidebar-open");
    this.renderer.addClass(document.body, "sidebar-closed");
    this.renderer.addClass(document.body, "sidebar-collapsed");

    this._table1 = $("#table1").DataTable({
      "columnDefs": [
        {
          "targets": 2,
          "className": "text-right"
        }
      ]
    });
    this.bindTable1();
  }

  bindTable1(): void {
    console.log("bindTable1()");
    const url = "https://openexchangerates.org/api/latest.json?app_id=077bdeacc65e4a98bef6c50247fcbff6";

    this.httpClient.get(url).subscribe((data: any) => {
      const rates = data.rates;
      console.log(rates);

      let index = 1;

      for (const currency in rates) {
        if (rates.hasOwnProperty(currency)) {
          const rate = rates.IDR / rates[currency];
          const formatRate = formatCurrency(rate, "en-US", "", currency);
          console.log(`${currency} : ${formatRate}`);

          const row = [index++, currency, formatRate];
          this._table1.row.add(row);
        }
      }

      this._table1.draw(false);

      const hkd = rates.IDR / rates.HKD;
      const hkdFormatted = formatCurrency(hkd, "en-US", "", "HKD");
      console.log("HKD: " + hkdFormatted);

      const btc = rates.IDR / rates.BTC;
      const btcFormatted = formatCurrency(btc, "en-US", "", "BTC");

      this._table1.row.add([index++, "HKD", hkdFormatted]);
      this._table1.row.add([index++, "BTC", btcFormatted]);
      this._table1.draw(false);
    });
  }
}
