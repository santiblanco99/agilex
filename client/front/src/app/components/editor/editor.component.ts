import { AfterViewInit, OnDestroy, Component, ElementRef, EventEmitter, Input, Output, ViewChild } from '@angular/core';
import * as Editor from '../../../../vendor/ckeditor5/build/classic-editor-with-real-time-collaboration.js';
import { CloudServicesConfig } from './common-interfaces';
import { CKEditor5, ChangeEvent } from '@ckeditor/ckeditor5-angular';
import { DocumentService } from 'src/app/services/document.service.js';
import { Doc } from 'src/app/models/document.js';
import { CommonModule } from '@angular/common';
import { User } from '../../auth/user';
import { UserService } from '../../services/user.service';
import { AuthService } from '../../auth/auth.service';
import { NgForm } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';

@Component({
	selector: 'app-editor',
	templateUrl: './editor.component.html',
	styleUrls: ['./editor.component.css']
})
export class EditorComponent {
	@Input() public configuration!: CloudServicesConfig;
	@Output() public ready = new EventEmitter<CKEditor5.Editor>();
	@ViewChild('sidebar', { static: true }) private sidebarContainer?: ElementRef<HTMLDivElement>;
	@ViewChild('presenceList', { static: true }) private presenceListContainer?: ElementRef<HTMLDivElement>;

	public Editor = Editor;

	/* Propiedades para verificar el usuario*/
	public loggedIn = false;
	public loggedUser: User;

	public docTitle: String | null;

	private sidebar = document.createElement('div');
	private presenceList = document.createElement('div');

	public channelId = handleDocIdInUrl();

	public data: String;

	public dataReady = false;

	public currentState: String;

	public isDisabled = false;

	public doc: Doc;

	public bottonName: String;

	public config = {
		cloudServices: {
			uploadUrl: 'https://70531.cke-cs.com/easyimage/upload/',
			webSocketUrl: '70531.cke-cs.com/ws',
			tokenUrl: 'https://70531.cke-cs.com/token/dev/BjcS6wdYY6HmV7T3knVJdnijvkGMocYTgpTcPYwR15gXdjqhnn9Vryd44YbJ',
		},
		collaboration: {
			channelId: this.channelId,
		},
		presenceList: {
			container: this.presenceList,
		}

	};

	constructor(private documentService: DocumentService, private authService: AuthService, private userService: UserService, private route: ActivatedRoute) {

	};

	ngOnInit(): void {
		this.bottonName = 'Guardar';
		var docId = this.route.snapshot.params.id;
		if (docId != null && docId != undefined) {
			console.log('loading previous info');
			this.documentService.getDocumentById(docId).subscribe(doc => {
				console.log('Angular is ' + doc.id);
				//console.log(doc.content);
				this.data = doc.content;
				this.bottonName = 'Actualizar';
				this.doc = doc;
				this.dataReady = true;
			});
		}
		var email = this.authService.getUserEmail();
		if (email != null && email != undefined) {
			this.userService.getDocumentById(email).subscribe(user => {
				this.loggedUser = user;
				this.loggedIn = true;
				console.log(user.email);
				this.dataReady = true;
			});
		}
	}

	public onChange({ editor }: ChangeEvent) {
		this.currentState = editor.getData();

		console.log(this.currentState);
	}

	/* Método para guardar el documento*/
	onClicked(form: NgForm) {
		if (this.currentState == null) {
			this.currentState = this.data;
		}
		// if (this.docTitle == null) {
		// 	this.docTitle = 'prueba';
		// }
		if (this.doc == null) {
			var date = new Date(Date.now());
			let newDoc = new Doc(this.docTitle, this.loggedUser.email, this.currentState, date);
			this.documentService.postDocument(newDoc).subscribe(result => {
				console.log(result);
				console.log('posted ' + result.id);
				console.log('doc data:' + result.lastEdited);
				this.doc = result;
				this.bottonName = 'Actualizar';
			},error=>{
				console.log(error);
				alert('Hubo un error al procesar el documento');
			});
		}
		else {
			console.log(this.doc);
			this.doc.name = this.docTitle;
			this.doc.content = this.currentState;
			this.doc.lastEdited = new Date(Date.now());
			this.documentService.putDocument(this.doc).subscribe(result=>{
				console.log('doc updated with id '+result.id );
				this.doc=result;
			});
		}

	}

	accept() {
		this.isDisabled = !this.isDisabled;
	}
}

function handleDocIdInUrl() {
	let id = getDocIdFromUrl();

	if (!id) {
		id = randomString();
		updateDocIdInUrl(id);
	}

	return id;
}

function getDocIdFromUrl() {
	const channelIdMatch = location.search.match(/channelId=(.+)$/);

	return channelIdMatch ? decodeURIComponent(channelIdMatch[1]) : null;
}

function randomString() {
	return Math.floor(Math.random() * Math.pow(2, 52)).toString(32);
}

function updateDocIdInUrl(id: string) {
	window.history.replaceState({}, document.title, generateUrlWithDocId(id));
}

function generateUrlWithDocId(id: string) {
	return `${window.location.href.split('?')[0]}?channelId=${id}`;
}



