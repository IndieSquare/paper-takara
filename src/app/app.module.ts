import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http'; 
import { TopbarComponent } from './topbar.component';
import { InputsComponent } from './inputs.component';
import { AppComponent } from './app.component';
import { GiftcardComponent } from './giftcard/giftcard.component';
import { DataService } from './shared/data.service';
import { ImageCropperModule } from 'ng2-img-cropper';

import 'hammerjs';
@NgModule({
  declarations: [
    AppComponent,
    TopbarComponent,
    GiftcardComponent,
    InputsComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule, 
    ImageCropperModule
  ],
  
  providers: [DataService],
  bootstrap: [AppComponent]
})
export class AppModule { }
