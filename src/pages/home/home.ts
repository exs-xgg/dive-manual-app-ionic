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
      db.executeSql('CREATE TABLE IF NOT EXISTS saved_calculation(rowid INTEGER PRIMARY KEY, note TEXT, formula_id TEXT, formula_name TEXT, formula_page TEXT, date TEXT, var1 TEXT, var2 TEXT, var3 TEXT, var4 TEXT, var5 TEXT, var6 TEXT, var7 TEXT, var8 TEXT, var9 TEXT, var10 TEXT, var11 TEXT, var12 TEXT, var13 TEXT, var14 TEXT, var15 TEXT, var16 TEXT, var17 TEXT, var18 TEXT, var19 TEXT, var20 TEXT, var21 TEXT, var22 TEXT, var23 TEXT, var24 TEXT, var25 TEXT, var26 TEXT, var27 TEXT)', {})
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
