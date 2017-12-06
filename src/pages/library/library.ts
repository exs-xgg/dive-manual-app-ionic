import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';

import { PdfPage } from '../pdf/pdf';

@Component({
  selector: 'page-library',
  templateUrl: 'library.html'
})
export class LibraryPage {

  pages: Array<{title: string, chapterId: string}>;

  constructor(public navCtrl: NavController) {
    // used for an example of ngFor and navigation
    this.pages = [
      { title: 'Introduction', chapterId: 'pdfIntro',},
      { title: 'Chapter 1', chapterId: 'chapter1',},
      { title: 'Chapter 2', chapterId: 'chapter2',},
      { title: 'Chapter 3', chapterId: 'chapter3',},
      { title: 'Chapter 4', chapterId: 'pdfIntro',},
      { title: 'Chapter 5', chapterId: 'pdfIntro',},
      { title: 'Chapter 6', chapterId: 'pdfIntro',},
      { title: 'Chapter 7', chapterId: 'pdfIntro',},
      { title: 'Chapter 8', chapterId: 'pdfIntro',},
      { title: 'Chapter 9', chapterId: 'pdfIntro',},
      { title: 'Chapter 10', chapterId: 'pdfIntro',}
    ];    

  }

  openChapter(chapter) {
    this.navCtrl.push(PdfPage, {
      chapterParam: chapter
    });
    
  }
}
