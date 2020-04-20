import { AfterViewInit, OnDestroy, Component, ElementRef, EventEmitter, Input, Output, ViewChild } from '@angular/core';
import * as Editor from '../../../../vendor/ckeditor5/build/classic-editor-with-real-time-collaboration.js';
import { CloudServicesConfig } from './common-interfaces';
import { CKEditor5, ChangeEvent } from '@ckeditor/ckeditor5-angular';
import { DocumentService } from 'src/app/services/document.service.js';
import { Doc } from 'src/app/models/document.js';

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


	private sidebar = document.createElement('div');
	private presenceList = document.createElement('div');

	public channelId = handleDocIdInUrl();

	public data: String;

	public dataReady: boolean;

	public currentState: String;

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

	constructor(private documentService: DocumentService) {

	}

	ngOnInit(): void {
		console.log('loading dummy info');
		this.documentService.getDocumentById('59qYVVDOUM85HOz37d92').subscribe(doc => {
			console.log('Angular is ' + doc.id);
			this.data = doc.content;
			this.dataReady = true;
		});
	}
	public onChange({ editor }: ChangeEvent) {
		this.currentState = editor.getData();

		console.log(this.currentState);
	}
	onClicked() {
		if(this.currentState==null){
			this.currentState = this.data;
		}
		var doc = new Doc('prueba', 'Santi Blancoooo', this.currentState);
		this.documentService.postDocument(doc).subscribe(result => {
			console.log('posted ' + result.id);
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



