import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { SQLite, SQLiteObject } from '@ionic-native/sqlite';
import { CalculatorPage } from '../calculator/calculator';

@Component({
  selector: 'page-list',
  templateUrl: 'savedCalculations.html'
})
export class SavedCalculationsPage {

  fo2: any;
  ppo2:any;
  savedCalculations: any = [];

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
      db.executeSql('SELECT * FROM saved_mod ORDER BY rowid DESC', {})
      .then(res => {
        this.savedCalculations = [];
        for(var i=0; i<res.rows.length; i++) {
          this.savedCalculations.push({rowid:res.rows.item(i).rowid,date:res.rows.item(i).date,fo2:res.rows.item(i).fo2,ppo2:res.rows.item(i).ppo2})
        }
      })
      .catch(e => console.log(e));
    }).catch(e => console.log(e));
  }

  editData(description){
    this.navCtrl.push(CalculatorPage, {
      description:description
    });
  }

  deleteData(rowid) {
    this.sqlite.create({
      name: 'ionicdb.db',
      location: 'default'
    }).then((db: SQLiteObject) => {
      db.executeSql('DELETE FROM saved_mod WHERE rowid=?', [rowid])
      .then(res => {
        console.log(res);
        this.getData();
      })
      .catch(e => console.log(e));
    }).catch(e => console.log(e));
  }

  goToCalculator(fo2, ppo2) {
    this.navCtrl.push(CalculatorPage, {
      fo2: fo2,
      ppo2: ppo2
    });
  }

}
