import { AfterViewInit, OnDestroy, Component, ElementRef, EventEmitter, Input, Output, ViewChild } from '@angular/core';
import * as Editor from '../../../../vendor/ckeditor5/build/classic-editor-with-real-time-collaboration.js';
import { CloudServicesConfig } from './common-interfaces';
import { CKEditor5, ChangeEvent } from '@ckeditor/ckeditor5-angular';
import { DocumentService } from 'src/app/services/document.service.js';
import { Doc } from 'src/app/models/document.js';
import { CommonModule } from '@angular/common';
import { User } from '../../auth/user';
import { UserService } from '../../services/user.service';
import { MailService } from '../../services/mail.service';
import { AuthService } from '../../auth/auth.service';
import { NgForm } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Mail } from '../../models/mail';
import { DocusignService } from 'src/app/services/docusign.service.js';
import { DocuSignData } from 'src/app/models/DocusignData.js';

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

	public guest: Map<String, String>;

	public online: String[];

	public correoAgilex = 'agilexgroupcol@gmail.com';


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

	constructor(private documentService: DocumentService, private authService: AuthService, private userService: UserService, private mailService: MailService, private route: ActivatedRoute, private docSignService: DocusignService) {

	};

	ngOnInit(): void {
		this.bottonName = 'Guardar';
		var docId = this.route.snapshot.params.id;
		var email = this.authService.getUserEmail();
		if (email != null && email != undefined) {
			this.userService.getDocumentById(email).subscribe(user => {
				this.loggedUser = user;
				this.loggedIn = true;
				console.log(user.email);
				//this.dataReady = true;
				if (this.online == undefined) {
					this.online = [];
				}
				this.online.push(this.loggedUser.email);

			});
		}
		if (this.route.snapshot.params.id2 == undefined) {
			console.log('entrando por aqui');
			if (docId != null && docId != undefined) {
				console.log('loading previous info');
				this.documentService.getDocumentById(docId).subscribe(doc => {
					console.log('Angular is ' + doc.id);
					this.doc = doc;
					try {
						this.online = this.doc.online;
					} catch ({ error }) {

					}
					this.documentService.putDocument(this.doc).subscribe(result => {
						console.log('doc updated with id ' + result.id);
						this.doc = result;
						this.data = result.content;
						this.docTitle = doc.name;
						console.log(this.data);
						this.bottonName = 'Actualizar';
						this.dataReady = true;
					});
					
					try {
						this.online = doc.online;
						this.online.push(this.loggedUser.email);
						this.documentService.putDocument(this.doc).subscribe(result => {
							console.log('doc updated with id ' + result.id);
							this.doc = result;
						});
					} catch ({ error }) {

					}
					try {
						this.guest = doc.guest;
					} catch ({ error }) {

					}

				});
			} else {

				this.dataReady = true;
			}


		} else {
			console.log('Guest');

			if (docId != null && docId != undefined) {
				console.log('loading previous info');
				this.documentService.getDocumentById(docId).subscribe(doc => {
					console.log('Angular is ' + doc);
					this.guest = doc.guest;
					if (this.guest == undefined) {
						this.guest = new Map();
					}
					this.data = doc.content;
					this.bottonName = 'Actualizar';
					this.doc = doc;
					this.dataReady = true;
					this.online = doc.online;
					var date = new Date(Date.now());

					this.doc.guest = this.guest;
					this.doc.online = this.online;

					if (this.route.snapshot.params.id2 in this.guest) {
						this.loggedUser = new User();
						this.loggedUser.email = this.guest[this.route.snapshot.params.id2];
						this.online.push(this.loggedUser.email);
						doc.online = this.online;
						this.documentService.putDocument(this.doc).subscribe(result => {
							console.log('doc updated with id ' + result.id);
							this.doc = result;
						});
						console.log(" EXISTE");
					} else {
						console.log("NO EXISTE");
						this.guest = undefined;
						//console.log(doc.content);
						this.data = undefined;
						this.bottonName = 'Actualizar';
						this.doc = undefined;
						this.dataReady = false;
					}
				});
			}


		}

	}

	public onChange({ editor }: ChangeEvent) {
		this.currentState = editor.getData();

		console.log(this.currentState);
	}
	compartir() {

		if(this.doc == null){
			alert('debes guardar el documento primero');
			return;
		}
		var correo = prompt("Correo al que desea compartir", "");
		var random = randomString();
		var esta = false;
		if (correo != null && correo != "")
		for (const v in this.guest )
		{
			console.log(this.guest);
			console.log("VEA "+v);
			if (this.guest[v] == correo)
			{
				esta=true;
			this.mailService.sendMail(correo, this.docTitle, this.doc.id, v, this.loggedUser.email).subscribe(email => {
				console.log(email);
			});
			}
				
		}
		if (correo != null && correo != "" && !esta)  {
			if (this.guest == undefined || this.guest == null) {
				this.guest = new Map();
			}
			this.guest[random] = correo;

			var date = new Date(Date.now());

			this.doc.guest = this.guest;
			this.doc.online = this.online;

			this.mailService.sendMail(correo, this.docTitle, this.doc.id, random, this.loggedUser.email).subscribe(email => {
				console.log(email);
			});

			this.documentService.putDocument(this.doc).subscribe(result => {
				console.log('doc updated with id ' + result.id);
				this.doc = result;
			});

			alert("El link es: " + "http://localhost:4200/guest/" + this.doc.id + "/" + random);
		}


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
			if (this.online == undefined)
				this.online = [this.loggedUser.email];
			if (this.guest == undefined) {
				this.guest = new Map();
			}
			let newDoc =new Doc(this.guest,this.currentState,date,this.loggedUser.email,this.docTitle,this.online);
			this.doc = newDoc;
			console.log('doc data:' + this.currentState);
			this.documentService.postDocument(this.doc).subscribe(result => {
				console.log(result);
				console.log('posted ' + result.id);
				console.log('doc data:' + result.lastEdited);
				this.doc = result;
				this.bottonName = 'Actualizar';
			}, error => {
				console.log(error);
				alert('Hubo un error al procesar el documento');
			});
		}
		else {
			console.log(this.doc);
			this.doc.name = this.docTitle;
			this.doc.content = this.currentState;
			this.doc.lastEdited = new Date(Date.now());
			if (this.online == undefined)
				this.online = [];
			this.online.push(this.loggedUser.email);
			this.doc.guest = this.guest;
			this.doc.online = this.online;
			this.documentService.putDocument(this.doc).subscribe(result => {
				console.log('doc updated with id ' + result.id);
				this.doc = result;
			});
		}

	}

	accept() {
		this.isDisabled = !this.isDisabled;
	}

	generateSignature(){
		let data = new DocuSignData(this.loggedUser.nombre,this.loggedUser.email,'');
		this.docSignService.getSignature(data).subscribe(result =>{
			console.log(result);
			alert('Petición de firma generada al correo ' + this.loggedUser.email );
		});

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


window.onbeforeunload = function () {
	// Do something
	const index = this.online.indexOf(this.loggedUser.email);
	if (index > -1) {
		this.online.splice(index, 1);
	}
	this.doc.online = this.online;

	this.documentService.removeOnlineDocument(this.doc.id, this.loggedUser.email).subscribe(result => {
		console.log('doc updated with id ' + result.id);
		this.doc = result;
	});


}


