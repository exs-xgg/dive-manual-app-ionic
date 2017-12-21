import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { SQLite, SQLiteObject } from '@ionic-native/sqlite';
import { PdfPage } from '../pdf/pdf';

@Component({
  selector: 'page-list',
  templateUrl: 'savedItems.html'
})
export class SavedItemsPage {

  savedTexts: any = [];

  /* selectedItem: any;
  icons: string[];
  titles: string[];
  items: Array<{title: string, icon: string}>;

  constructor(public navCtrl: NavController, public navParams: NavParams) {
    // If we navigated to this page, we will have an item available as a nav param
    this.selectedItem = navParams.get('item');

    // Let's populate this page with some filler content for funzies
    this.icons = ['bookmark'];

    this.titles = ['text1 saved', 'saved calculation 1', 'second saved text', 'third text', 'second calc'];

    this.items = [];
    for (let i = 0; i < this.titles.length; i++) {
      this.items.push({
        title: this.titles[i],
        icon: this.icons[0]
      });
    }
  }

  itemTapped(event, item) {
    // That's right, we're pushing to ourselves!
    this.navCtrl.push(SavedItemsPage, {
      item: item
    });
  } */

  constructor(public navCtrl: NavController, private sqlite: SQLite) {}

  ionViewDidLoad() {
    this.getData();
  }
  
  ionViewWillEnter() {
    this.getData();
  }
  
  getData() {
    this.sqlite.create({
      name: 'ionicdb.db',
      location: 'default'
    }).then((db: SQLiteObject) => {
      db.executeSql('SELECT * FROM saved_text ORDER BY rowid DESC', {})
      .then(res => {
        this.savedTexts = [];
        for(var i=0; i<res.rows.length; i++) {
          this.savedTexts.push(
            {
              rowid:res.rows.item(i).rowid,
              date:res.rows.item(i).date,
              description:res.rows.item(i).description
            }
          )
        }
      })
      .catch(e => console.log(e));
    }).catch(e => console.log(e));
  }

  editData(description){
    this.navCtrl.push(PdfPage, {
      description:description
    });
  }

  deleteData(rowid) {
    this.sqlite.create({
      name: 'ionicdb.db',
      location: 'default'
    }).then((db: SQLiteObject) => {
      db.executeSql('DELETE FROM saved_text WHERE rowid=?', [rowid])
      .then(res => {
        console.log(res);
        this.getData();
      })
      .catch(e => console.log(e));
    }).catch(e => console.log(e));
  }

  goToManual(description) {
    this.navCtrl.push(PdfPage, {
      description: description
    });
  }

}
