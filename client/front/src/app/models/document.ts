
//Dummy class para integrar back con front
export class Doc {
    id: String;
    name: String;
    author: String;
    content: String;
    lastEdited: Date;
    guest : Map <String,String>;
    online: String [];
    constructor(guest: Map <String,String>, content: String,date : Date,author:String, name:String, online: String[] ){
        this.name = name;
        this.author = author;
        this.content = content;
        this.lastEdited = date;
        this.guest = guest;
        this.online = online;
    }
}