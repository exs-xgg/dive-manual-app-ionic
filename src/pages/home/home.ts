import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { SQLite, SQLiteObject } from '@ionic-native/sqlite';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  savedTexts: any = [];

  constructor(public navCtrl: NavController,
    private sqlite: SQLite) {
  }

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
      db.executeSql('CREATE TABLE IF NOT EXISTS saved_text(rowid INTEGER PRIMARY KEY, date TEXT, description TEXT)', {})
      .then(res => console.log('Executed SQL'))
      .catch(e => console.log(e));
      db.executeSql('CREATE TABLE IF NOT EXISTS saved_mod(rowid INTEGER PRIMARY KEY, date TEXT, fo2 TEXT, ppo2 TEXT)', {})
      .then(res => console.log('Executed SQL'))
      .catch(e => console.log(e));
      db.executeSql('SELECT * FROM saved_text ORDER BY rowid DESC', {})
      .then(res => {
        this.savedTexts = [];
        for(var i=0; i<res.rows.length; i++) {
          this.savedTexts.push({rowid:res.rows.item(i).rowid,date:res.rows.item(i).date,description:res.rows.item(i).description})
        }
      })
      .catch(e => console.log(e));
    }).catch(e => console.log(e));
  }
  
  deleteData(rowid) {
    this.sqlite.create({
      name: 'ionicdb.db',
      location: 'default'
    }).then((db: SQLiteObject) => {
      db.executeSql('DELETE FROM expense WHERE rowid=?', [rowid])
      .then(res => {
        console.log(res);
        this.getData();
      })
      .catch(e => console.log(e));
    }).catch(e => console.log(e));
  }

}
