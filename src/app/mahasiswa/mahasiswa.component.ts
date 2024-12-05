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
  showTambahModal(): void{
    $("#tambahModal").modal();
  }
  postRecord(): void{
    
    var nim = $("#nimText").val();
    var nama = $("#namaText").val();
    var jenisKelamin = $("#jenisKelaminSelect").val();
    var tempatLahir = $("#tempatLahirText").val();
    var tanggalLahir = $("#tanggalLahirText").val();
    var jp = $("#jpSelect").val();
    var alamat = $("#alamatText").val();
    var statusNikah = $("#statusNikahSelect").val();
    var tahunMasuk = $("#tahunMasukText").val();
    

    if (nim.length == 0){
      alert("NIM Belum Di Isi");
      return;
    } 

    if (nama.length == 0){
      alert("Nama Belum Di Isi");
      return;
    }

    if (tempatLahir.length == 0){
      alert("Tempat Lahir Belum Di Isi");
      return;
    }
    if (tanggalLahir.length == 0){
      alert("Tanggal Lahir Belum Di Isi");
      return;
    }
    if (alamat.length == 0){
      alert("Alamat Belum Di Isi");
      return;
    }
    if (tahunMasuk.length == 0){
      alert("Tahun Masuk Belum Di Isi");
      return;
    }
    
    nim = encodeURIComponent(nim);
    nama = encodeURIComponent(nama);
    jenisKelamin = encodeURIComponent(jenisKelamin);
    tempatLahir = encodeURIComponent(tempatLahir);
    tanggalLahir = encodeURIComponent(tanggalLahir);
    jp = encodeURIComponent(jp);
    alamat = encodeURIComponent(alamat);
    statusNikah = encodeURIComponent(statusNikah);
    tahunMasuk = encodeURIComponent(tahunMasuk);
    
    var url="https://stmikpontianak.cloud/011100862/tampilMahasiswa.php" + 
    "?nim=" +nim +
    "&nama=" +nama +
    "&jenisKelamin=" +jenisKelamin +
    "&tempatLahir=" +tempatLahir;
    "&tanggalLahir=" +tanggalLahir +
    "&jp=" +jp +
    "&alamat=" +alamat +
    "&statusNikah=" +statusNikah +
    "&tahunMasuk=" +tahunMasuk +

    this.httpClient.get(url)
    .subscribe((data: any) => {
      console.log(data); // Debugging: lihat respons di konsol
      alert(data.status + "-->" + data.message);

      this.bindMahasiswa();
      $("#tambahModal").modal("hide");
  });
  }
}