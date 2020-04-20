
//Dummy class para integrar back con front
export class Doc {
    id: String;
    name: String;
    author: String;
    content: String;
    constructor(name:String, author:String, content: String){
        this.name = name;
        this.author = author;
        this.content = content;
    }
}