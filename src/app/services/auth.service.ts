import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service'; // Impor CookieService

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private router: Router, private cookieService: CookieService) { }

  // Fungsi untuk login
  login(username: string, password: string): boolean {
    // Contoh login (harus diganti dengan logika login yang sesuai, misalnya menggunakan API)
    if (username === 'admin' && password === 'password') {
      // Simpan token autentikasi dalam cookie (berlaku untuk 1 jam)
      this.cookieService.set('authToken', 'dummy-jwt-token', 1, '/'); // Cookie akan kedaluwarsa dalam 1 jam
      return true;
    }
    return false;
  }

  // Fungsi untuk logout
  logout(): void {
    this.cookieService.delete('authToken'); // Hapus cookie yang menyimpan token
    this.router.navigate(['/login']); // Arahkan ke halaman login setelah logout
  }

  // Fungsi untuk memeriksa apakah pengguna sudah login
  isAuthenticated(): boolean {
    // Mengecek apakah ada token di dalam cookie
    return this.cookieService.check('authToken');
  }

  // Mendapatkan token dari cookie
  getToken(): string | null {
    return this.cookieService.get('authToken');
  }
}
