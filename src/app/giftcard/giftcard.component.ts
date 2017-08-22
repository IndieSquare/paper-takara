import { ElementRef,Component,ViewChild,OnInit} from '@angular/core';
import { DataService } from '../shared/data.service';
import { Wallet } from "../shared/wallet.model";
import * as jsPDF from 'jspdf'; 
import * as html2canvas from "html2canvas";
declare var bitcore: any;
declare var qr: any;
declare var saveAs: any;
declare var JSZip: any;
declare var QRCode: any;
@Component({
    selector:'giftcard',
   templateUrl: './giftcard.component.html',
  styleUrls: ['./giftcard.component.css'],
})
export class GiftcardComponent {
 wallet:Wallet;

qrCode:any;

    constructor(public dataService:DataService, private el: ElementRef){
 
      
    }

   public getCenter(doc,text){
       var fontSize = doc.internal.getFontSize();
       var pageWidth = doc.internal.pageSize.width;
   var txtWidth = doc.getStringUnitWidth(text)*fontSize/doc.internal.scaleFactor;
   return( pageWidth - txtWidth ) / 2;
   }
 public isInt(n) {
   return n % 1 === 0;
}
    
     public download() {
 this.dataService.alertText = "";

var getCenter = this.getCenter;
 var tokenNum = -1;
 var tokenName = "";
 var printNum = this.dataService.printNumber;
 var customFee = this.dataService.customFee;




if(customFee < 0.0001 || customFee > 0.01){

    
     this.dataService.alertText =  this.dataService.errorFee;
   return;
}

var dustSize = ( customFee * 100000000) + 5430;
if(this.wallet.tokenName.length == 0 || this.wallet.tokenName == "1 tokenname"){
     this.dataService.alertText = this.dataService.error1;
    return;
}

    console.log(customFee+" dust "+dustSize);
var formatError = false;

var res = this.wallet.tokenName.split(" ");

if(res.length != 2){
    formatError = true;
}else{

    tokenNum = parseFloat(res[0]);
    tokenName = res[1];

}



if(formatError){

    this.dataService.alertText = this.dataService.error2;
    return;

}

if(this.dataService.imageSet == false){
     this.dataService.alertText =  this.dataService.error3;
    return;
}

var isAnInt = this.isInt(printNum);
if(printNum < 1 || printNum > 1000 || isAnInt == false){
    
     this.dataService.alertText =  this.dataService.error4;
   return;
}


document.getElementById("generate").style.display = "none"; 
 
document.getElementById("loading").style.display = "block"; 

var giftCardHowToClaim =  this.dataService.giftCardHowToClaim;
var giftCardHowToClaim1 =  this.dataService.giftCardHowToClaim1;
var giftCardHowToClaim2 =  this.dataService.giftCardHowToClaim2;
var giftCardHowToClaim3 =  this.dataService.giftCardHowToCharge;
var giftCardHowToCharge =  this.dataService.giftCardHowToCharge;

var giftCardPrintMeInstructions =  this.dataService.giftCardPrintMeInstructions;
var giftCardPrintMeInstructions2 =  this.dataService.giftCardPrintMeInstructions2;

var charged = this.dataService.charged;
var  giftCardChargeInstructions =  this.dataService.giftCardChargeInstructions;

var img1:any = new Image();
var img2:any = new Image();
var img3:any = new Image();

var orbsImg:any = new Image();
var indieSquareImg:any = new Image();

var orbsURL:any;
var indieWalletURL:any;

var scratchCanvas = document.createElement('canvas');
var orbsCanvas = document.createElement('canvas');
var indieWalletCanvas = document.createElement('canvas');
var canvas = document.createElement("canvas");
   
 canvas.width = 500;
    canvas.height = canvas.width * 0.9;
    // Copy the image contents to the canvas
    var context = canvas.getContext("2d");

//orbsImg.src = 'assets/images/boo_logo.png';
  
indieSquareImg.src = 'assets/images/indiesquare_logo.png';
/*
orbsImg.onload = function() {


var orbsCanvasCtx = orbsCanvas.getContext('2d');

 orbsCanvasCtx.globalAlpha = 1.0;
 orbsCanvasCtx.drawImage(orbsImg, 0, 0,orbsCanvas.width,orbsCanvas.height);

orbsURL = orbsCanvas.toDataURL("image/jpeg");
    orbsURL.replace(/^data:image\/(png|jpg);base64,/, "");


   indieSquareImg.src = 'assets/images/indiesquare_logo.png';
  
};
*/
indieSquareImg.onload = function() {

var indieWalletCanvasCtx = indieWalletCanvas.getContext('2d');
 indieWalletCanvasCtx.globalAlpha = 1.0;
 indieWalletCanvasCtx.drawImage(indieSquareImg, 0, 0,indieWalletCanvas.width,indieWalletCanvas.height);

   indieWalletURL = indieWalletCanvas.toDataURL("image/jpeg");
    indieWalletURL.replace(/^data:image\/(png|jpg);base64,/, "");

   img1.src = 'assets/images/takara_box_blue.png';
};

img1.onload = function() {
   
    img2.src = document.getElementById("uploadImage").getAttribute('src');
};

img2.onload = function() {

scratchCanvas.width = canvas.width * 0.48;
scratchCanvas.height = scratchCanvas.width;
var scratchCtx = scratchCanvas.getContext('2d');

 scratchCtx.save();
   scratchCtx.beginPath();
   scratchCtx.arc(scratchCanvas.width/2,scratchCanvas.width/2,scratchCanvas.width/2, 0, Math.PI * 2, true);
 
   scratchCtx.closePath();
    scratchCtx.clip();

   scratchCtx.drawImage(img2, 0, 0, scratchCanvas.width, scratchCanvas.height);


    img3.src = 'assets/images/takara_box_overlay.png';
};
img3.onload = function() {
    context.globalAlpha = 1.0;
    context.drawImage(img1, 0, 0,canvas.width,canvas.height);
   context.drawImage(scratchCanvas, (canvas.width*0.49) - (scratchCanvas.width / 2), (canvas.height*0.4) - (scratchCanvas.height / 2),scratchCanvas.width,scratchCanvas.height*1.08);
    context.drawImage(img3, 0, 0,canvas.width,canvas.height);
     
    var dataURL = canvas.toDataURL("image/jpeg");
    dataURL.replace(/^data:image\/(png|jpg);base64,/, "");
   

var pageCount = 0;

var width = 160;
var height = width * 0.44

var x = 25;
var yStart = 8;
var y = yStart;
var yInc = 70;

var addressArray = [];

var doc = new jsPDF();



var title = giftCardHowToCharge;
codeCenter =x+1;

 title = giftCardPrintMeInstructions;

    doc.text(title,getCenter(doc,title), 12);
    doc.setFontSize(12);
    title = giftCardPrintMeInstructions2;
    doc.text(23, 25, title);

    y = 50;

 pageCount = 1;

for(var i = 0; i < printNum; i++){

    if(pageCount == 4){

        pageCount = 0;
        y = yStart;
        doc.addPage();
    
    }

var privateKey = new bitcore.PrivateKey();
var wif = privateKey.toWIF();
var address = privateKey.toAddress();
addressArray.push(address.toString());

//var scheme = "paper-takara://sweep_single?amount="+tokenNum+"&token="+tokenName+"&wif="+wif;
var scheme = "counterparty:"+wif;
doc.setFillColor(92,139,168)
doc.setDrawColor(255,255,255)
doc.rect(x,y,width,height,'FD')
doc.setFillColor(255,255,255)
doc.rect(x+(width*0.65),y,width*0.35,height,'F')
doc.setTextColor(0)
var secondAreaCenter = x+(width*0.65) - 25;
doc.setFontSize(9)


doc.addImage(qr.toDataURL(scheme), 139,y + 7,38,38);

var text1 = tokenNum + " "+tokenName;
var textWidth = doc.getStringUnitWidth(text1) * doc.internal.getFontSize() / doc.internal.scaleFactor;
var textOffset = (secondAreaCenter/ 2) + (doc.internal.pageSize.width - textWidth) / 2;
    doc.text(textOffset, y + 5, text1);
    
var text2 = giftCardHowToClaim;
var textWidth = doc.getStringUnitWidth(text2) * doc.internal.getFontSize() / doc.internal.scaleFactor;
var textOffset = (secondAreaCenter/ 2) + (doc.internal.pageSize.width - textWidth) / 2;
doc.text(textOffset, y + 49, text2);

doc.setFontSize(5)
var text3 = giftCardHowToClaim1;
var textWidth = doc.getStringUnitWidth(text3) * doc.internal.getFontSize() / doc.internal.scaleFactor;
var textOffset = (secondAreaCenter/ 2) + (doc.internal.pageSize.width - textWidth) / 2;
doc.text(textOffset, y + 52, text3);

doc.setFontSize(5)
var text4 = giftCardHowToClaim2;
var textWidth = doc.getStringUnitWidth(text4) * doc.internal.getFontSize() / doc.internal.scaleFactor;
var textOffset = (secondAreaCenter/ 2) + (doc.internal.pageSize.width - textWidth) / 2;
doc.text(textOffset, y + 55, text4);

doc.setFontSize(5)
doc.setTextColor(100)
var text5 = address.toString();
var textWidth = doc.getStringUnitWidth(text5) * doc.internal.getFontSize() / doc.internal.scaleFactor;
var textOffset = (secondAreaCenter/ 2) + (doc.internal.pageSize.width - textWidth) / 2;
doc.text(textOffset, y + 68.5, text5);
    
    
doc.addImage(dataURL,x+10,y+1,height * 1.2,height-2);
doc.addImage(indieWalletURL,x+120,y+58,25,7);
//doc.addImage(orbsURL,x+133,y+58,25,7);


doc.setDrawColor(0,0,0)
doc.rect(x,y,width,height,'D')

pageCount++;

y += yInc;



}

var d = new Date()

		var dMonth = d.getMonth()+1
		var dDate = d.getDate()
		var dYear = d.getFullYear()
		var dHour = ((d.getHours()+1)<12 ? d.getHours() : d.getHours()-12);
		var dMinutes = d.getMinutes()
		var dM = ((d.getHours()+1)<12 ? 'AM' : 'PM');
		var df = dMonth + '-' + dDate + '-' + dYear +' '+dHour+'_'+dMinutes+' '+dM


yStart = 20;    

y = yStart;
var xStart = 20;
x = xStart;
var rowNum = 0;
var qrCodeSize = 40;
var bitSplitString = "";
pageCount = 1;
doc.addPage();
doc.setFontSize(20);
var title = giftCardHowToCharge;
codeCenter =x+1;

    doc.text(getCenter(doc,title), 12, title);
doc.setFontSize(12);
title =  giftCardChargeInstructions;

   
    doc.text(17, 25, title);

y = 50;

doc.setFontSize(5);
 bitSplitString = "address,amount\r\n";
for(var i = 0; i < printNum; i++){
    var aWalletAddress = addressArray[i];
    var codeCenter = x+1;

  
    
    console.log(customFee+" dust "+dustSize);

     var scheme = "counterparty:"+aWalletAddress+"?asset="+tokenName+"&amount="+tokenNum+"&regular_dust_size="+dustSize;
    doc.addImage(qr.toDataURL(scheme),x,y + 6,qrCodeSize,qrCodeSize);

    var text = aWalletAddress;
    var textWidth = doc.getStringUnitWidth(text) * doc.internal.getFontSize() / doc.internal.scaleFactor;
    var textOffset = (codeCenter/ 2) + (doc.internal.pageSize.width - textWidth) / 2;
    doc.text(x+3, y + qrCodeSize+7, text);

    
    doc.text( charged,x+3,y+qrCodeSize+11)

    doc.setLineWidth(0.4)
    doc.setDrawColor(0)
    doc.setFillColor(255,255,255)
    doc.circle(x+14,y + qrCodeSize+11,2,'FD')

    x += qrCodeSize+27;
    rowNum++;
    if(rowNum == 3){
    
        y += qrCodeSize + 25;
        rowNum = 0; 
        x = xStart;
        pageCount++;
        if(pageCount == 4){
            y = yStart;
            pageCount = 0;
            doc.addPage();
        }
    }

    bitSplitString = bitSplitString + aWalletAddress+","+tokenNum+"\r\n";



setTimeout(function() {
document.getElementById("generate").style.display = "block"; 
document.getElementById("loading").style.display = "none"; 

}, 1000);





}

doc.save('PAPER_TAKARA'+df+'.pdf');

 

var a = document.createElement("a");
    a.setAttribute('style', 'display:none;');
    document.body.appendChild(a);
    var blob = new Blob([bitSplitString], { type: 'text/csv' });
    var url= window.URL.createObjectURL(blob);
    a.href = url;
    a.download = 'bitsplit_'+df+'.csv';
    a.click();
};      






    }


    
    ngOnInit(){
        this.wallet = this.dataService.getWallet();
        
        this.dataService.gift = this;
        this.wallet.qrTemp = "this is a temp qrcode";

        if(this.qrCode != null){


this.qrCode.makeCode(this.wallet.qrTemp); // make another code.

}
else{
       this.qrCode = new QRCode("qrcode",{
    text:this.wallet.qrTemp,
    width: 175,
    height: 175,
    colorDark : "#000000",
    colorLight : "#ffffff",
    correctLevel : QRCode.CorrectLevel.H
});
     
}
       
    }

}