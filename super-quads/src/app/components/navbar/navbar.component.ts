import { Component } from '@angular/core';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.scss'
})
export class NavbarComponent {

  menuOpen: boolean = false;

  toggleMenu(): void{
    this.menuOpen = !this.menuOpen;
  }

}
