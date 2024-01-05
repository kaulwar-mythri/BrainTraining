import { Component, OnInit } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { filter } from 'rxjs';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  title = 'BrainTraining';
  display: boolean = true;

  toggleDisplay() {
    this.display = !this.display;
  }

  constructor(private router: Router) {
    console.log('AppComponent initialized');
  }

  ngOnInit(): void {
    this.display = true;
    console.log('On init');
  }

}
