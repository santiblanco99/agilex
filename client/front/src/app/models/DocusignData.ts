export class DocuSignData {
    signerNames: string[];
    signerEmails: string[];
    ccEmails: string[];
    ccNames: string[];
    fileContent: String;
    
    constructor(signerNames: string[], signerEmails: string[], ccEmails: string[], ccNames: string[], fileContent: String){
        this.signerNames = signerNames;
        this.signerEmails = signerEmails;
        this.ccNames = ccNames;
        this.ccEmails = ccEmails;
        this.fileContent = fileContent;
    }
    
}