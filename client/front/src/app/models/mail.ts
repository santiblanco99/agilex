
//Dummy class para integrar back con front
export class Mail {
   from: String;
   to: String;
   subject: String;
   text: String;

    constructor(from: String, to: String, subject: String, text: String ){
        this.from = from;
        this.to= to;
        this.subject = subject;
        this.text = text;
    }
}