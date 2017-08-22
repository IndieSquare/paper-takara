export class Wallet{
    public tokenName:string;
    public qrTemp:string;
    public imageData:any;
    

    constructor(tokenName: string, imageData:any, qrTemp:string){
        this.tokenName = tokenName;
        this.imageData = imageData;
        this.qrTemp = qrTemp;
       
    }
}