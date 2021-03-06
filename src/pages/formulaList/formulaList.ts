import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { Formula1Page } from '../formula1/formula1';
import { Formula2Page } from '../formula2/formula2';
import { Formula3Page } from '../formula3/formula3';
//import { Formula4Page } from '../formula4/formula4';
import { Formula5Page } from '../formula5/formula5';
import { Formula6Page } from '../formula6/formula6';
import { Formula7Page } from '../formula7/formula7';
import { Formula8Page } from '../formula8/formula8';
import { Formula9Page } from '../formula9/formula9';
import { Formula10Page } from '../formula10/formula10';
import { Formula11Page } from '../formula11/formula11';
import { Formula12Page } from '../formula12/formula12';
import { Formula13Page } from '../formula13/formula13';
import { Formula14Page } from '../formula14/formula14';
import { Formula15Page } from '../formula15/formula15';
import { Formula16Page } from '../formula16/formula16';

@Component({
  selector: 'page-formulaList',
  templateUrl: 'formulaList.html'
})
export class FormulaListPage {

  pages: Array<{title: string, component: any, color: string}>;

  constructor(public navCtrl: NavController) {
    // used for an example of ngFor and navigation
    this.pages = [
      { title: 'Duration of SCUBA Air Supply', component: Formula1Page, color: "",},
      { title: 'Air / Oxygen / Mixed Gas in Storage', component: Formula2Page, color: "",},
      { title: 'Air / Oxygen / Mixed Gas Available for Use', component: Formula3Page, color: "",},
      //{ title: 'EGS Pressure Calculation', component: Formula4Page, color: "",},
      { title: 'Equivalent Air Depth Calculations', component: Formula5Page, color: "",},
      { title: 'Surfaced Supplied Air / Mixed Gas Requirements', component: Formula6Page, color: "",},
      { title: 'Chamber / Air O2 Requirements', component: Formula7Page, color: "",},
      { title: '"T" Formula for Standard Cubic Feet of Gas', component: Formula8Page, color: "",},
      { title: '"T" Formula for Equalization', component: Formula9Page, color: "",},
      { title: '"T" Formula for Final Pressure', component: Formula10Page, color: "",},
      { title: '"T" Formula for Partial Pressure, Maximum O2  and Cutoff Depth', component: Formula11Page, color: "",},
      { title: 'General Gas Law Formula', component: Formula12Page, color: "",},
      { title: 'Metabolic Makeup Formula', component: Formula13Page, color: "",},
      { title: '', component: Formula14Page, color: "",},
      { title: '', component: Formula15Page, color: "",},
      { title: 'AAAAAA', component: Formula16Page, color: "",}
    ];    

  }

  openChapter(component) {
    this.navCtrl.push(component, {});
  }
}
