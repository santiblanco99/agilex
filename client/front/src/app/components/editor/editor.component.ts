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
import * as html2pdf from 'html2pdf.js'
import { PdfData } from 'src/app/models/PdfData.js';
import { getLoadSaveIntegration } from './load-save-integration';
import { ReturnStatement } from '@angular/compiler';
import { element } from 'protractor';

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

	public userReady = false;
	public miData;
	public trackChanges;
	public comments;
	public disabled = false;

	// Application data will be available under a global variable `appData`.
	private appData = {
		// The ID of the current user.
		userId: 'user-1',
		// Users data.
		users: [

		],
		// Suggestion threads data.
		suggestions: [

		],
		// Comment threads data.
		commentThreads: [

		]
	};

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
		},
		extraPlugins: [
			getLoadSaveIntegration(this.appData)
		]


	};

	constructor(private documentService: DocumentService, private authService: AuthService, private userService: UserService, private mailService: MailService, private route: ActivatedRoute, private docSignService: DocusignService) {

	};

	ngOnInit(): void {
		this.bottonName = 'Guardar';

		var docId = this.route.snapshot.params.id;
		var email = this.authService.getUserEmail();

		//Dueño
		if (email != null && email != undefined) {
			this.userService.getDocumentById(email).subscribe(user => {
				this.loggedUser = user;
				this.loggedIn = true;
				console.log(user.email);
				//this.dataReady = true;
				if (this.online == undefined) {
					this.online = [];
				}
				if (!(this.loggedUser.email in this.online))
					this.online.push(this.loggedUser.email);

			});
		}

		//Dueño del documento  -> próximamente el que tenga cuenta
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
					try {
						this.trackChanges = this.doc.trackChanges;
					} catch ({ error }) {

					}
					try {
						this.comments = doc.commets;
					} catch ({ error }) {

					}
					this.documentService.putDocument(this.doc).subscribe(result => {
						console.log('doc updated with id ' + result.id);
						this.doc = result;
						//this.data = result.content;
						//this.data=" ";
						this.miData = result.content;
						this.docTitle = doc.name;
						//console.log(this.data);
						this.bottonName = 'Actualizar';
						this.dataReady = true;
					});

					try {
						this.online = doc.online;
						if (!(this.loggedUser.email in this.online))
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
		}
		//Invitado
		else {
			console.log('Guest');
			this.disabled = true;
			if (docId != null && docId != undefined) {
				console.log('loading previous info');
				this.documentService.getDocumentById(docId).subscribe(doc => {
					console.log('Angular is ' + doc);
					this.guest = doc.guest;
					if (this.guest == undefined) {
						this.guest = new Map();
					}
					//this.data = doc.content;
					//this.data = result.content;
					//this.data=" ";
					this.miData = doc.content;

					this.bottonName = 'Actualizar';
					this.doc = doc;
					this.dataReady = true;
					this.online = doc.online;
					var date = new Date(Date.now());

					this.doc.guest = this.guest;
					this.doc.online = this.online;
					this.comments = doc.commets;
					this.docTitle = doc.name;

					if (this.route.snapshot.params.id2 in this.guest) {
						this.loggedUser = new User();
						this.loggedUser.email = this.guest[this.route.snapshot.params.id2];
						if (!(this.loggedUser.email in this.online))
							this.online.push(this.loggedUser.email);
						this.trackChanges = doc.trackChanges;
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
		//console.log("NO MAMES" + this.Editor.plugins);


	}


	public onChange({ editor }: ChangeEvent) {

		const usersPlugin = editor.plugins.get('Users');
		const trackPlugin = editor.plugins.get('TrackChanges');
		const commetsPlugin = editor.plugins.get('CommentsRepository');
		this.currentState = editor.getData();
		//editor.execute( 'trackChanges' );
		//console.log(this.userReady+" HELP");

		//La primera vez que se edita
		if (!this.userReady) {
			editor.execute( 'trackChanges' );
			this.userReady = true;

			//Agregar nombre e email
			usersPlugin.me.name = this.loggedUser.email;
			usersPlugin.me.id = this.loggedUser.email;
			if (this.loggedUser.nombre != null && this.loggedUser.nombre != undefined)
				usersPlugin.me.name = this.loggedUser.nombre;
			usersPlugin.addUser({
				id: this.loggedUser.email,
				name: usersPlugin.me.name
			});

			//Agregar demás usuarios
			for (const v in this.guest) {
				try {
					usersPlugin.addUser({
						id: this.guest[v],
						name: this.guest[v]
					});
				}
				catch (err) {

				}
			}

			try {
				usersPlugin.addUser({
					id: this.doc.author,
					name: this.doc.author
				});
			}
			catch (err) {

			}

			//Agregar comentarios
			if (this.comments != null && this.comments != undefined) {

				console.log(commetsPlugin.getCommentThreads());
				for (const v in this.comments) {
					try {
						this.comments[v].isFromAdapter = true;

						commetsPlugin.addCommentThread(this.comments[v]);

					}
					catch (err) {

					}
				}
				console.log(commetsPlugin.getCommentThreads());
				for (const v in commetsPlugin.getCommentThreads())
				{
					console.log(v);
					console.log(commetsPlugin.getCommentThreads()[v])
				}

			}
			try {
				editor.data.set(this.miData, { suppressErrorInCollaboration: true });
			} catch (error) {

			}
		}
		// Por si algun momento sirve track changes 
		if (!this.userReady && false) {


			if (this.trackChanges != null && this.trackChanges != undefined) {
				for (const v in this.trackChanges) {
					console.log("TRA" + this.trackChanges[v]);
					trackPlugin.addSuggestion({
						id: this.trackChanges[v].id,         // String
						type: this.trackChanges[v].type,          // String
						authorId: this.trackChanges[v].authorId,         // String
						createdAt: new Date(this.trackChanges[v].createdAt), // Date
						hasComments: this.trackChanges[v].hasComments,       // Boolean
						data: this.trackChanges[v].data             // Object|null
					});
					// trackPlugin.addSuggestion({
					// });
					trackPlugin.addSuggestion({
						id: this.trackChanges[v].id,
						type: 'insertion',
						authorId: this.trackChanges[v].authorId,
						createdAt: new Date(2019, 1, 13, 11, 20, 48)
					});
					// console.log("PUEDE");
					// console.log(trackPlugin.getSuggestions());
					try {
						// console.log("TRA"+this.trackChanges[v]);
						// trackPlugin.addSuggestion({
						// 	id: this.trackChanges[v].id,         // String
						// 	type: this.trackChanges[v].type,          // String
						// 	authorId: this.trackChanges[v].authorId,         // String
						// 	createdAt: new Date(this.trackChanges[v].createdAt ), // Date
						// 	hasComments: this.trackChanges[v].hasComments,       // Boolean
						// 	data: this.trackChanges[v].data             // Object|null
						// });
					}
					catch (err) {
						console.log("ERROR :C");
					}
				}
			}
			usersPlugin.me.id = this.loggedUser.email;
			console.log("YO" + editor.plugins.get('Users'));
			console.log(editor.plugins.get('TrackChanges'));
			var yo = editor.plugins.get('TrackChanges').getSuggestions()[0];
			yo.id = "BUENIS";
			editor.plugins.get('TrackChanges').addSuggestion(yo);
			//editor.data.set( this.miData, { suppressErrorInCollaboration: true } );

		}






		if (editor.plugins.get('CommentsRepository') != null ||
			editor.plugins.get('CommentsRepository').getCommentThreads() != null)
			this.comments = editor.plugins.get('CommentsRepository').getCommentThreads();
		//console.log(editor.plugins.get('TrackChanges').getSuggestions());
		if (editor.plugins.get('TrackChanges') != null ||
			editor.plugins.get('TrackChanges').getSuggestions() != null)
			this.trackChanges = editor.plugins.get('TrackChanges').getSuggestions();
	}
	disable() {
		//console.log("DEBE ESTAR  "+this.disable);
		return this.disabled;
	}
	compartir() {

		if (this.doc == null) {
			alert('debes guardar el documento primero');
			return;
		}
		var correo = prompt("Correo al que desea compartir", "");
		var random = randomString();
		var esta = false;
		if (correo != null && correo != "")
			for (const v in this.guest) {
				console.log(this.guest);
				console.log("VEA " + v);
				if (this.guest[v] == correo) {
					esta = true;
					this.mailService.sendMail(correo, this.docTitle, this.doc.id, v, this.loggedUser.email).subscribe(email => {
						console.log(email);
					});
				}

			}
		if (correo != null && correo != "" && !esta) {
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

	compartirProvisional() {
		if (this.doc == null) {
			alert('debes guardar el documento primero');
			return;
		}
		let correo = prompt("Correo al que desea compartir", "");
		if (correo != null && correo != "") {
			let doc;
			this.documentService.getDocumentById(this.doc.id.toString()).subscribe(result => {
				console.log(result);
				doc = result;
				let shared = doc.shared;
				if (shared.length == 0) {
					shared.push(correo);
					doc.shared = shared;
					this.documentService.putDocument(doc).subscribe(update => {
						console.log('Shared updated, array legnth 0');
						alert(`Documento compartido con ${correo}`);
					});
				}
				else {
					console.log(shared);
					var i = 0;
					while (i < shared.length) {
						if (shared[i] == correo) {
							alert('Ya se compartió el documento con ese correo previamente');
							return;
						}
						i++;
					}
					console.log('siguió')
					shared.push(correo);
					doc.shared = shared;
					this.documentService.putDocument(doc).subscribe(update => {
						console.log('Shared updated');
						alert(`Documento compartido con ${correo}`);
					});
				}
			});

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
			if (this.trackChanges == undefined) {
				this.trackChanges = [new Map()];
			}
			if (this.comments == undefined) {
				this.comments = [new Map()];
			}
			let shared = [];
			let newDoc = new Doc(this.guest, this.currentState, date, this.loggedUser.email, this.docTitle, this.online, this.trackChanges, this.comments, shared);
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
			if (!(this.loggedUser.email in this.online))
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

	generateSignature() {
		let signerEmails = [];
		let signerNames = [];
		this.documentService.getDocumentById(this.doc.id.toString()).subscribe(result => {
			this.userService.getDocumentById(result.author.toString()).subscribe(author => {
				signerNames.push(author.nombre);
				signerEmails.push(author.email);
				for (var i = 0; i < result.shared.length; i++) {
					let element = result.shared[i];
					console.log('entre a shared');
					console.log(element);
					this.userService.getDocumentById(element.toString()).subscribe(user => {
						signerEmails.push(element);
						signerNames.push(user.nombre);
						console.log(signerNames);
						console.log(signerEmails);
						if (signerNames.length == result.shared.length + 1) {
							let data = new DocuSignData(signerNames, signerEmails, [], [], this.currentState);
							this.docSignService.getSignature(data).subscribe(result => {
								console.log(result);
								alert('Petición de firma generada al correo ' + this.loggedUser.email);
							});
						}
					});
				}

			});

		});


	}

	toPdf() {
		if (this.currentState == null) {
			this.currentState = this.data;
		}
		var docId = this.route.snapshot.params.id;

		let data = new PdfData(docId, this.currentState);
		this.docSignService.createpdf(data).subscribe(result => {
			console.log(result);
			alert('Petición de creación pdf' + this.loggedUser.email);
		})
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


