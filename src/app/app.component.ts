import { Component } from '@angular/core';
import {Http} from '@angular/http';
import {InputsComponent} from './inputs.component';
import {GiftcardComponent} from './giftcard/giftcard.component';
import { DataService } from './shared/data.service';
import { Wallet } from "./shared/wallet.model";
import 'rxjs/Rx';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers: [DataService],
  
  
})
export class AppComponent {
   spaceScreens: Array<any>;
wallet:Wallet;

  constructor(private http:Http,private dataService:DataService) {
   
     

  }
  ngOnInit(){
     this.wallet = this.dataService.getWallet();
     
    }

  download(){

    this.dataService.generatePDF();
  }
}
