import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';

import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { PdfPage } from '../pages/pdf/pdf';
import { SavedItemsPage } from '../pages/savedItems/savedItems';
import { CalculatorPage } from '../pages/calculator/calculator';
import { SavedCalculationsPage } from '../pages/savedCalculations/savedCalculations';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { IonicStorageModule } from '@ionic/storage';
import { SQLite } from '@ionic-native/sqlite';
import { Toast } from '@ionic-native/toast';
import { LibraryPage } from '../pages/library/library';
import { FormulaListPage } from '../pages/formulaList/formulaList';
import { Formula1Page } from '../pages/formula1/formula1';
import { Formula2Page } from '../pages/formula2/formula2';
//import { Formula3Page } from '../pages/formula3/formula3';
//import { Formula4Page } from '../pages/formula4/formula4';
//import { Formula5Page } from '../pages/formula5/formula5';
//import { Formula6Page } from '../pages/formula6/formula6';
//import { Formula7Page } from '../pages/formula7/formula7';
//import { Formula8Page } from '../pages/formula8/formula8';
//import { Formula9Page } from '../pages/formula9/formula9';

@NgModule({
  declarations: [
    MyApp,
    HomePage,
    PdfPage,
    SavedItemsPage,
    CalculatorPage,
    SavedCalculationsPage,
    LibraryPage,
    FormulaListPage,
    Formula1Page,
    Formula2Page,
    // Formula3Page,
    // Formula4Page,
    // Formula5Page,
    // Formula6Page,
    // Formula7Page,
    // Formula8Page,
    // Formula9Page
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
    IonicStorageModule.forRoot()
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    PdfPage,
    SavedItemsPage,
    CalculatorPage,
    SavedCalculationsPage,
    LibraryPage,
    FormulaListPage,
    Formula1Page,
    Formula2Page,
    Formula2Page,
    // Formula3Page,
    // Formula4Page,
    // Formula5Page,
    // Formula6Page,
    // Formula7Page,
    // Formula8Page,
    // Formula9Page
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    SQLite,
    Toast
  ]
})
export class AppModule {}
