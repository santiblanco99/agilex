import { AfterViewInit, OnDestroy, Component, ElementRef, EventEmitter, Input, Output, ViewChild } from '@angular/core';
import * as Editor from '../../../../vendor/ckeditor5/build/classic-editor-with-real-time-collaboration.js';
import { CloudServicesConfig } from './common-interfaces';
import { CKEditor5 } from '@ckeditor/ckeditor5-angular';

@Component({
  selector: 'app-editor',
  templateUrl: './editor.component.html',
  styleUrls: ['./editor.component.css']
})
export class EditorComponent implements AfterViewInit, OnDestroy {
  @Input() public configuration!: CloudServicesConfig;
	@Output() public ready = new EventEmitter<CKEditor5.Editor>();
	@ViewChild( 'sidebar', { static: true } ) private sidebarContainer?: ElementRef<HTMLDivElement>;
	@ViewChild( 'presenceList', { static: true } ) private presenceListContainer?: ElementRef<HTMLDivElement>;
  
  public Editor = Editor;
  public editor?: CKEditor5.Editor;

  private sidebar = document.createElement( 'div' );
  private presenceList = document.createElement( 'div' );

  public channelId = handleDocIdInUrl();
  public data : string | null;

  public config = {
    cloudServices: {
      uploadUrl: 'https://70531.cke-cs.com/easyimage/upload/',
      webSocketUrl: '70531.cke-cs.com/ws',
      tokenUrl: 'https://70531.cke-cs.com/token/dev/BjcS6wdYY6HmV7T3knVJdnijvkGMocYTgpTcPYwR15gXdjqhnn9Vryd44YbJ',
    },
    collaboration:{
      channelId: this.channelId,
    },
    presenceList: {
      container: this.presenceList,
    }

  }; 

	private boundRefreshDisplayMode = this.refreshDisplayMode.bind( this );
  private boundCheckPendingActions = this.checkPendingActions.bind( this );

  public ngAfterViewInit() {
		if ( !this.sidebarContainer || !this.presenceListContainer ) {
			throw new Error( 'Div containers for sidebar or presence list were not found' );
		}
    this.sidebarContainer.nativeElement.appendChild( this.sidebar );
		this.presenceListContainer.nativeElement.appendChild( this.presenceList );
  }
  
  public ngOnDestroy() {
		window.removeEventListener( 'resize', this.boundRefreshDisplayMode );
		window.removeEventListener( 'beforeunload', this.boundCheckPendingActions );
	}

	private onReady( editor: CKEditor5.Editor ) {
		this.editor = editor;
		this.ready.emit( editor );

		// Prevent closing the tab when any action is pending.
		window.addEventListener( 'beforeunload', this.boundCheckPendingActions );

		// Switch between inline and sidebar annotations according to the window size.
		window.addEventListener( 'resize', this.boundRefreshDisplayMode );
		this.refreshDisplayMode();
	}

	private checkPendingActions( domEvt ) {
		if ( this.editor.plugins.get( 'PendingActions' ).hasAny ) {
			domEvt.preventDefault();
			domEvt.returnValue = true;
		}
	}

	private refreshDisplayMode() {
		const annotations = this.editor.plugins.get( 'Annotations' );
		const sidebarElement = this.sidebarContainer.nativeElement;

		if ( window.innerWidth < 1070 ) {
			sidebarElement.classList.remove( 'narrow' );
			sidebarElement.classList.add( 'hidden' );
			annotations.switchTo( 'inline' );
		}
		else if ( window.innerWidth < 1300 ) {
			sidebarElement.classList.remove( 'hidden' );
			sidebarElement.classList.add( 'narrow' );
			annotations.switchTo( 'narrowSidebar' );
		}
		else {
			sidebarElement.classList.remove( 'hidden', 'narrow' );
			annotations.switchTo( 'wideSidebar' );
		}
	}

  constructor() { }

  ngOnInit(): void {
  }
}

function handleDocIdInUrl() {
  let id = getDocIdFromUrl();

  if ( !id ) {
    id = randomString();
    updateDocIdInUrl( id );
  }

  return id;
}

function getDocIdFromUrl() {
  const channelIdMatch = location.search.match( /channelId=(.+)$/ );

  return channelIdMatch ? decodeURIComponent( channelIdMatch[ 1 ] ) : null;
}

function randomString() {
  return Math.floor( Math.random() * Math.pow( 2, 52 ) ).toString( 32 );
}

function updateDocIdInUrl( id: string ) {
  window.history.replaceState( {}, document.title, generateUrlWithDocId( id ) );
}

function generateUrlWithDocId( id: string ) {
  return `${ window.location.href.split( '?' )[ 0 ] }?channelId=${ id }`;
}  



