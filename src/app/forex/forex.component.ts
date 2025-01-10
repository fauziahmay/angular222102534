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
  lastUpdated: string = "";

  constructor(private renderer: Renderer2, private httpClient: HttpClient) {}

  ngAfterViewInit(): void {
    this.renderer.removeClass(document.body, "sidebar-open");
    this.renderer.addClass(document.body, "sidebar-closed");
    this.renderer.addClass(document.body, "sidebar-collapsed");

    this._table1 = $("#table1").DataTable({
      "columnDefs": [
        {
          "targets": 2,
          "className": "text-left" // Nama Mata Uang rata kiri
        },
        {
          "targets": 3,
          "className": "text-right" // Kurs rata kanan
        }
      ]
    });
    this.bindTable1();
  }

  bindTable1(): void {
    console.log("bindTable1()");
    const ratesUrl = "https://openexchangerates.org/api/latest.json?app_id=077bdeacc65e4a98bef6c50247fcbff6";
    const currenciesUrl = "https://openexchangerates.org/api/currencies.json";

    this.lastUpdated = new Date().toLocaleString(); // Set last updated time when page loads

    // Fetch currency names
    this.httpClient.get(currenciesUrl).subscribe((currencies: any) => {
      // Fetch exchange rates
      this.httpClient.get(ratesUrl).subscribe((data: any) => {
        const rates = data.rates;
        this.lastUpdated = new Date(data.timestamp * 1000).toLocaleString(); // Update the last updated time from API
        let index = 1;

        // Iterate over the rates and add rows to the table
        for (const currency in rates) {
          if (rates.hasOwnProperty(currency)) {
            const currencyName = currencies[currency] || "Unknown"; // Fetch the currency name
            const rate = rates.IDR / rates[currency]; // Calculate rate
            const formatRate = formatCurrency(rate, "en-US", "", currency); // Format rate

            console.log(`${currency}: ${currencyName}: ${formatRate}`);

            // Add row to the table
            const row = [index++, currency, currencyName, formatRate];
            this._table1.row.add(row);
          }
        }

        // Draw table
        this._table1.draw(false);

        // Additional example: Add specific currencies like HKD and BTC if needed
        const hkd = rates.IDR / rates.HKD;
        const hkdFormatted = formatCurrency(hkd, "en-US", "", "HKD");
        this._table1.row.add([index++, "HKD", "Hong Kong Dollar", hkdFormatted]);

        const btc = rates.IDR / rates.BTC;
        const btcFormatted = formatCurrency(btc, "en-US", "", "BTC");
        this._table1.row.add([index++, "BTC", "Bitcoin", btcFormatted]);

        this._table1.draw(false);
      });
    });
  }
}
