import { Component,NgModule,ViewChild } from '@angular/core';
import { DataService } from './shared/data.service';
import { Wallet } from "./shared/wallet.model";
import {ImageCropperComponent, CropperSettings, Bounds} from 'ng2-img-cropper';
@Component({
    selector:'inputs',
   templateUrl: './inputs.component.html',
    styleUrls: ['./inputs.component.css'],
})



export class InputsComponent {

  str = "";
  printNum = 0;
  customFee  = 0.0001;
 wallet:Wallet;
 
updateTokenName(): void {
   
    this.str = this.str.toUpperCase();
 this.wallet.tokenName = this.str;
 
}

updatePrintNumber(): void {
   
 this.dataService.printNumber = this.printNum;

}

updateFee(): void {
   
 this.dataService.customFee = this.customFee;

}

 imageData: any;
    cropperSettings: CropperSettings;


@ViewChild('cropper', undefined) 
cropper:ImageCropperComponent;
    
   constructor(public dataService:DataService){


        this.cropperSettings = new CropperSettings();
        this.cropperSettings.width = 500;
        this.cropperSettings.height = 500;
        this.cropperSettings.croppedWidth = 500;
        this.cropperSettings.croppedHeight = 500;
        this.cropperSettings.canvasWidth = 150;
        this.cropperSettings.rounded = true;
        this.cropperSettings.canvasHeight = 150;
        this.cropperSettings.noFileInput = true;
       this.dataService.customFee = this.customFee;

     
}

fileChangeListener($event) {
    var image:any = new Image();
    var file:File = $event.target.files[0];
    var myReader:FileReader = new FileReader();
    var that = this;
    myReader.onloadend = function (loadEvent:any) {

        image.src = loadEvent.target.result;
      
        that.cropper.setImage(image);

    };
  this.dataService.imageSet = true;
    myReader.readAsDataURL(file);
}



 ngOnInit(){
     this.wallet = this.dataService.getWallet();
     this.imageData =  this.wallet.imageData;
      this.dataService.imageSet = false;


      
    }

}