import { Wallet } from "./wallet.model";
import {Injectable} from '@angular/core';
import {GiftcardComponent} from '../giftcard/giftcard.component';
@Injectable()
export class DataService {
 private wallet : Wallet = {tokenName:"1 tokenname", imageData:{"image":"assets/images/placeholder.png"},qrTemp:"this is a temp string"};
  gift:GiftcardComponent;
  alertText:string;
  imageSet:boolean;
  printNumber:number;
   customFee:number;



title = "";
  subTitle = "";
  instruc1 = "";
   instruc1Warning = "*make sure to enter token name correctly";
   instruc2 = "";
    instruc3 = "";
      instrucFee = "";
      advancedOptional = "";

    instruc4 = "";
    instrucBitSplit= "";
    instruc5= "";
    chooseFile = "";

    giftCardHowToClaim = "";
     giftCardHowToClaim1 = "";
      giftCardHowToClaim2 = "";


       giftCardPrintMeInstructions = "Instructions";
        giftCardPrintMeInstructions2 = "Below are the giftcards for you to print and distribute\nAfter that there is a seperate sheet with instructions on how to charge each giftcard";


      giftCardHowToCharge= "";
       giftCardChargeInstructions = "Each qr code below represents a giftcard\nTo charge use indiesquare wallet and scan each qrcode with the “systemlinkage” button\nYou can also use bitsplit.csv to batch charge via bitsplit.tokenly.com tool\nIf using bitsplit set a custom dust size in bitsplit to include a sweep fee e.g. 0.0001543"
    
      


   charged = "";
loading = "";


 error1 = "";
    error2= "";
     error3= "";
    error4= "";
      errorFee= "";
  
   constructor(){
    

    var userLang = navigator.language;
     console.log("lang"+userLang);
    if(userLang == "ja-JP"){
     

    this.setJapanese();

    }else{
      this.setEnglish();
    }




  }
  

  setEnglish(){


    this.title = "paper takara";
    this.subTitle = "generate and print counterparty token giftcards";
    this.instruc1 = "1.Enter amount and token";
    this.instruc1Warning = "*make sure to enter token name correctly";
    this. instruc2 = "2.Upload a token image";
     this. instruc3 = "3. Number of giftcards to generate";

       this. instrucFee = "*fee to use when gift card is swept (btc)";
  this.  advancedOptional = "optional:";
     this. instruc4 = "4.After generating a printable pdf of the gift cards will be downloaded along with charge instructions";
     this. instrucBitSplit = "(an optional bitsplit csv for batch charging will also be downloaded)";
     this. instruc5 = "5.After printing, charging and distributing the giftcards users can sweep the token via IndieSquare Wallet";
     this. chooseFile = "Choose file";

      this.giftCardHowToClaim = "How to claim";
      this. giftCardHowToClaim1 = "1. Download and open IndieSquare Wallet";
       this. giftCardHowToClaim2 = "2. Press 'System Linkage' in settings and scan the code above";
      this.loading = "generating...";

       this. giftCardHowToCharge = "How to charge";
    
     this.charged = "Charged?";


       this.giftCardPrintMeInstructions = "Instructions";
        this.giftCardPrintMeInstructions2 = "Below are the giftcards for you to print and distribute\nFollowing that there is a seperate sheet with instructions on how to charge each giftcard";


   this.error1 = "please enter a token amount and name";
     this. error2 = "please enter a in the format NUM TOKENNAME e.g. 1 BITCRYSTAL";
      this. error3 = "please upload an image";
     this. error4 = "please enter a quantity between 1 and 1000";
       this. errorFee = "please enter a fee between 0.0001 btc and 0.01 btc";
  


}


setJapanese(){

    this.title = "paper takara";
    this.subTitle = "generate and print counterparty token giftcards";
    this.instruc1 = "1.Enter amount and token";
    this.instruc1Warning = "*make sure to enter token name correctly";
    this. instruc2 = "2.Upload a token image";
     this. instruc3 = "3. Number of giftcards to generate";

         this. instrucFee = "*fee to use when gift card is swept (btc)";
  this.  advancedOptional = "optional:";
     this. instruc4 = "4.After generating a printable pdf of the gift cards will be downloaded along with charge instructions";
     this. instrucBitSplit = "(an optional bitsplit csv for batch charging will also be downloaded)";
     this. instruc5 = "5.After printing, charging and distributing the giftcards users can sweep the token via IndieSquare Wallet";
     this. chooseFile = "Choose file";

      this.giftCardHowToClaim = "How to claim";
      this. giftCardHowToClaim1 = "1. Download and open IndieSquare Wallet";
       this. giftCardHowToClaim2 = "2. Press 'System Linkage' in settings and scan the code above";
      this.loading = "generating...";

       this. giftCardHowToCharge = "How to charge";
    
     this.charged = "Charged?";


       this.giftCardPrintMeInstructions = "Instructions";
        this.giftCardPrintMeInstructions2 = "Below are the giftcards for you to print and distribute\nFollowing that there is a seperate sheet with instructions on how to charge each giftcard";


   this.error1 = "please enter a token amount and name";
     this. error2 = "please enter a in the format NUM TOKENNAME e.g. 1 BITCRYSTAL";
      this. error3 = "please upload an image";
     this. error4 = "please enter a quantity between 1 and 1000";
       this. errorFee = "please enter a fee between 0.0001 btc and 0.01 btc";


}
    getWallet(){
      return this.wallet;
    }

    generatePDF(){
      this.gift.download();
    }

}