import { Component, ViewChild } from '@angular/core';
import { Content } from 'ionic-angular';
import { DocumentViewer, DocumentViewerOptions } from '@ionic-native/document-viewer';

@Component({
  selector: 'page-formula16',
  templateUrl: 'formula16.html'
})
export class Formula16Page {

  @ViewChild(Content) content: Content;
  constructor() {


  }
  
  this.platform.ready().then(() => {
    let options: DocumentViewerOptions = {
      title: 'My PDF'
    }
    // this.document.viewDocument('https://vadimdez.github.io/ng2-pdf-viewer/pdf-test.pdf', 'application/pdf', options);
    this.document.viewDocument('../assets/myFile.pdf', 'application/pdf', options)
  });  
}
