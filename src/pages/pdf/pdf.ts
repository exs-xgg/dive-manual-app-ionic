import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';

@Component({
  selector: 'page-pdf',
  templateUrl: 'pdf.html'
})
export class PdfPage {

  constructor(public navCtrl: NavController) {
    console.log("On Manual Page");
  }

}
