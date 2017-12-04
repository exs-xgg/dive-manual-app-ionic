import { Component, ViewChild } from '@angular/core';
import { NavController, NavParams, Content } from 'ionic-angular';
import { SQLite, SQLiteObject } from '@ionic-native/sqlite';
import { Toast } from '@ionic-native/toast';

@Component({
  selector: 'page-pdf',
  templateUrl: 'pdf.html'
})


export class PdfPage {

  @ViewChild(Content) content: Content;
  data = { date:"", type:"", description:"", amount:0 };
  selectedText = "";
  public selectedChapter : any;

  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    private sqlite: SQLite,
    private toast: Toast) {

      this.selectedChapter = navParams.get("chapterParam");
      this.selectedText = navParams.get("description");

    }
    
  saveData() {

    this.selectedText = window.getSelection().toString();

    if ( this.selectedText != "" ) {
      this.selectedText = window.getSelection().getRangeAt(0).toString();
    }
    if ( this.selectedText != "" ) {
      this.selectedText = document.getSelection().getRangeAt(0).toString();
    }
    if ( this.selectedText != "" ) {
      this.selectedText = document.getSelection().toString();
    }

    if( this.selectedText != "" ){

      this.sqlite.create({
        name: 'ionicdb.db',
        location: 'default'
      }).then((db: SQLiteObject) => {
        db.executeSql("INSERT INTO saved_text VALUES(NULL,strftime('%Y-%m-%d %H-%M-%S','now'),?)",[this.selectedText])
          .then(res => {
            console.log(res);
            this.toast.show('Data saved', '1000', 'center').subscribe(
              toast => {
                this.navCtrl.popToRoot();
              }
            );
          })
          .catch(e => {
            console.log(e);
            this.toast.show(e, '1000', 'center').subscribe(
              toast => {
                console.log(toast);
              }
            );
          });
      }).catch(e => {
        console.log(e);
        this.toast.show(e, '1000', 'center').subscribe(
          toast => {
            console.log(toast);
          }
        );
      });

    } else {
      alert("Reselect text");
    }
    
  }

  ionViewDidEnter() {
    if( this.selectedText != undefined && this.selectedText != "" ){
      this.content.getNativeElement().innerHTML = this.content.getNativeElement().innerHTML.replace(this.selectedText, "<span id='highlightedText' class='highlightedText'>"+this.selectedText+"</span>");
      this.highlight();
    }

    if(this.selectedChapter != undefined){
      let yOffset = document.getElementById(this.selectedChapter).offsetTop;
      this.content.scrollTo(0, yOffset, 2000);
    }
  }

  highlight()
  {
    let element = document.getElementById('highlightedText');
    element.scrollIntoView()
  }
}
