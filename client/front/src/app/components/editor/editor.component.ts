import { Component, OnInit, Input } from '@angular/core';
import * as Editor from '../../../../vendor/ckeditor5/build/classic-editor-with-real-time-collaboration.js';

@Component({
  selector: 'app-editor',
  templateUrl: './editor.component.html',
  styleUrls: ['./editor.component.css']
})
export class EditorComponent implements OnInit {

  public Editor = Editor;

  private presenceList = document.createElement( 'div' );
  public channelId = handleDocIdInUrl();
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



