import { Component, OnInit } from '@angular/core';
import { DocumentService } from 'src/app/services/document.service';
import {Doc} from 'src/app/models/document';

@Component({
  selector: 'app-documents',
  templateUrl: './documents.component.html',
  styleUrls: ['./documents.component.css']
})
export class DocumentsComponent implements OnInit {

  constructor(private documentService:DocumentService) { }

  documents: Doc[];

  ngOnInit(): void {
    console.log('loading docs');
    this.documentService.getDocuments().subscribe(docs=>{
      console.log(docs);
      this.documents = docs;
    })
  }

}
