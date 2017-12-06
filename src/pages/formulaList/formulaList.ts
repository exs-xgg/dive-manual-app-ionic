import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { Formula1Page } from '../formula1/formula1';
import { Formula2Page } from '../formula2/formula2';


@Component({
  selector: 'page-formulaList',
  templateUrl: 'formulaList.html'
})
export class FormulaListPage {

  pages: Array<{title: string, component: any}>;

  constructor(public navCtrl: NavController) {
    // used for an example of ngFor and navigation
    this.pages = [
      { title: 'Duration of SCUBA Air Supply', component: Formula1Page,},
      { title: 'Air / Oxygen / Mixed Gas in Storage', component: Formula2Page,},
      { title: 'Formula 3', component: 'chapter3',},
      { title: 'Formula 4', component: 'pdfIntro',},
      { title: 'Formula 5', component: 'pdfIntro',},
      { title: 'Formula 6', component: 'pdfIntro',},
      { title: 'Formula 7', component: 'pdfIntro',},
      { title: 'Formula 8', component: 'pdfIntro',},
      { title: 'Formula 9', component: 'pdfIntro',},
      { title: 'Formula 10', component: 'pdfIntro',}
    ];    

  }

  openChapter(component) {
    this.navCtrl.push(component, {});
  }
}
