import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MainlayoutRoutingModule } from './mainlayout-routing.module';
import { MainlayoutComponent } from './mainlayout/mainlayout.component';


@NgModule({
    declarations: [
        MainlayoutComponent
    ],
    exports: [
        MainlayoutComponent
    ],
    imports: [
        CommonModule,
        MainlayoutRoutingModule
    ]
})
export class MainlayoutModule { }
