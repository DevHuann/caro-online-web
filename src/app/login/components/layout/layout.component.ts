import { Component, OnInit } from '@angular/core';
import {MediaObserver} from "@angular/flex-layout";

@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.scss']
})
export class LayoutComponent implements OnInit {

  isMobile = true;
  constructor(
    private mediaObserver : MediaObserver,
  ) { }

  ngOnInit(): void {

    this.mediaObserver.media$.subscribe(e => {
      console.log(e.mqAlias);
      this.isMobile = e.mqAlias === 'xs';
    })
  }


}
