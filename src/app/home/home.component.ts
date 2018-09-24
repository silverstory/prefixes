import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  template: `<div class="row"><p>Yay! You are logged in!</p></div>`,
  styles: []
})
export class HomeComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
