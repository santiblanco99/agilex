export class DocuSignData {
    signerName: string;
    signerEmail: string;
    fileName: string;
    
    constructor(signerName: string, signerEmail: string, fileName: string){
        this.signerName = signerName;
        this.signerEmail = signerEmail;
        this.fileName = fileName;
    }
    
}