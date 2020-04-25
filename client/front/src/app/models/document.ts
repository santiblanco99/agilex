
//Dummy class para integrar back con front
export class Doc {
    id: String;
    name: String;
    author: String;
    content: String;
    lastEdited: Date;

    constructor(name:String, author:String, content: String, date : Date){
        this.name = name;
        this.author = author;
        this.content = content;
        this.lastEdited = date;
    }
}