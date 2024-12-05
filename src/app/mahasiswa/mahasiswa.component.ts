import { AfterViewInit, Component, Renderer2 } from '@angular/core';
import { HeaderComponent } from '../header/header.component';
import { FooterComponent } from '../footer/footer.component';
import { SidebarComponent } from '../sidebar/sidebar.component';
import { HttpClient } from '@angular/common/http';

declare const $: any;

@Component({
  selector: 'app-mahasiswa',
  standalone: true,
  imports: [ HeaderComponent, FooterComponent, SidebarComponent],
  templateUrl: './mahasiswa.component.html',
  styleUrl: './mahasiswa.component.css'
})
export class MahasiswaComponent implements AfterViewInit{
showTambahModal() {
throw new Error('Method not implemented.');
}
  data: any;
  table1: any;

  constructor(private httpClient: HttpClient,  private renderer: Renderer2) {}

  ngAfterViewInit(): void {
    this.renderer.removeClass(document.body, "sidebar-open");
    this.renderer.addClass(document.body, "sidebar-closed");
    this.renderer.addClass(document.body, "sidebar-collapse");

    this.table1 = $("#table1").DataTable();
    
    this.bindMahasiswa();
  }

  bindMahasiswa(): void {
    this.httpClient.get("https://stmikpontianak.cloud/011100862/tampilMahasiswa.php").subscribe((data: any) => {
      console.log(data);

      this.table1.clear();

      data.forEach((element: any) => {
        var tempatTanggalLahir = element.TempatLahir + ", " + element.tempatTanggalLahir;

        var row = [
          element.NIM,
          element.Nama, 
          element.JenisKelamin,
          tempatTanggalLahir,
          element.JP,
          element.Alamat,
          element.StatusNikah,
          element.TahunMasuk
        ]
        this.table1.row.add(row);
      });
      this.table1.draw(false);
    });
  }
  
}