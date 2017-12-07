import { Component, ViewChild } from '@angular/core';
import { NavController, Content, NavParams } from 'ionic-angular';
import { SQLite, SQLiteObject } from '@ionic-native/sqlite';
import { Toast } from '@ionic-native/toast';

@Component({
  selector: 'page-formula6',
  templateUrl: 'formula6.html'
})
export class Formula6Page {

  aata: any;
  an: any;
  at: any;


  @ViewChild(Content) content: Content;
  constructor(public navCtrl: NavController, private sqlite: SQLite, 
      private toast: Toast,
      public navParams: NavParams) {

    this.aata = navParams.get("aata");
    this.an = navParams.get("an");
    this.at = navParams.get("at");

  }

  ionViewDidEnter() {
  }


  computeSfc(){

    let a = Number(this.aata) * Number(this.an) * Number(this.at);
    document.getElementById("result-sfc").innerHTML = a.toFixed(2).toString();

  }

  saveCalculation() {
    this.sqlite.create({
      name: 'ionicdb.db',
      location: 'default'
    }).then((db: SQLiteObject) => {
      db.executeSql("INSERT INTO saved_mod VALUES(NULL,strftime('%Y-%m-%d %H-%M-%S','now'),?, ?)",[this.aata, this.an])
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
  }

}
