import { NgModule } from '@angular/core';
import { CKEditorModule } from '@ckeditor/ckeditor5-angular';
import { EditorComponent } from './editor.component';
import { FormsModule } from '@angular/forms';

@NgModule( {
	declarations: [
		EditorComponent
		
	],
	imports: [
		CKEditorModule,
		FormsModule
	],
	providers: [],
	bootstrap: [ EditorComponent ],
	exports: [
		EditorComponent
	]
} )
export class EditorModule { }