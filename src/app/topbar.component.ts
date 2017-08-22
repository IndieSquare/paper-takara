import { Component } from '@angular/core';
import { DataService } from './shared/data.service';
@Component({
    selector:'topbar',
   templateUrl: './topbar.component.html',
   styleUrls: ['./topbar.component.css'],
})
export class TopbarComponent {
  
  constructor(public dataService:DataService){


  }


  public setJapanese(){
   this.dataService.setJapanese();
  }
  public setEnglish(){
    this.dataService.setEnglish();
  }

}