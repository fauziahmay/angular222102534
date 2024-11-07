import { Component, Renderer2} from '@angular/core';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [RouterModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent {
  constructor(private renderer: Renderer2) {
    this.renderer.addClass(document.body, "register-page");

    this.renderer.removeClass(document.body, "sidebar-mini");
    this.renderer.removeClass(document.body, "layout-fixed");

    this.renderer.setAttribute(document.body, "style", "min-height: 464px;");
  }
}
