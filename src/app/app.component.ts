import { Component, ViewChild } from '@angular/core';
import { Nav, Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { HomePage } from '../pages/home/home';
import { SavedItemsPage } from '../pages/savedItems/savedItems';
import { PdfPage } from '../pages/pdf/pdf';
import { SavedCalculationsPage } from '../pages/savedCalculations/savedCalculations';
import { LibraryPage } from '../pages/library/library';
import { FormulaListPage } from '../pages/formulaList/formulaList';


@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  @ViewChild(Nav) nav: Nav;

  rootPage: any = HomePage;

  pages: Array<{title: string, component: any}>;

  showSubmenu: boolean = false;

  menuItemHandler(): void {
    this.showSubmenu = !this.showSubmenu;
  }

  constructor(public platform: Platform, public statusBar: StatusBar, public splashScreen: SplashScreen) {
    this.initializeApp();

    // used for an example of ngFor and navigation
    this.pages = [
      { title: 'Library', component: LibraryPage,},
      { title: 'Calculator', component: FormulaListPage,},
      { title: 'Saved Items', component: SavedItemsPage},
      { title: 'Saved Calculations', component: SavedCalculationsPage}
    ];    

  }

  initializeApp() {
    this.platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      this.statusBar.styleDefault();
      this.splashScreen.hide();
    });
  }

  openPage(page) {
    // Reset the content nav to have just this page
    // we wouldn't want the back button to show in this scenario
    this.nav.setRoot(page.component);
  }

  openChapter(chapter) {
    
    this.nav.push(PdfPage, {
      chapterParam: chapter
    });
    
  }

  

}