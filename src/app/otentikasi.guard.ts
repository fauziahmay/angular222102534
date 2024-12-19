import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import{CookieService} from 'ngx-cookie-service';

export const otentikasiGuard: CanActivateFn = (route, state) => {
console.log("Otentikasi dimulai");

var userId = inject(CookieService).get("userId");
console.log("userId: " + userId);

if (userId == null) {
  //anggap blm login
}else if (userId == "undefined") {
  //anggap blm login
}else if (userId == "") {
  //anggap blm login
}else{
  return true; //sudah login
}

inject(Router).navigate(["/login"]);
return false;

};
