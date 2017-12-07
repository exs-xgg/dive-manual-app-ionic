import { Component, ViewChild } from '@angular/core';
import { NavController, Content, NavParams } from 'ionic-angular';
import { SQLite, SQLiteObject } from '@ionic-native/sqlite';
import { Toast } from '@ionic-native/toast';

@Component({
  selector: 'page-formula9',
  templateUrl: 'formula9.html'
})
export class Formula9Page {

  fv1: any;
  fv2: any;
  pressure1: any;
  pressure2: any;


  @ViewChild(Content) content: Content;
  constructor(public navCtrl: NavController, private sqlite: SQLite, 
      private toast: Toast,
      public navParams: NavParams) {

    this.fv1 = navParams.get("fv1");
    this.fv2 = navParams.get("fv2");
    this.pressure1 = navParams.get("pressure1");
    this.pressure2 = navParams.get("pressure2");

  }

  ionViewDidEnter() {
  }


  computeSfc(){

    let ata1 = ( Number(this.fv1) + 14.7 ) / 14.7;
    let ata2 = ( Number(this.fv2) + 14.7 ) / 14.7;

    let scf1 = ata1 * this.pressure1;
    let scf2 = ata2 * this.pressure2;

    let scf3 = Number(scf1) + Number(scf2);
    let pressure3 = Number(this.pressure1) + Number(this.pressure2);

    let ata3 = ( (scf3 / pressure3) - 1 ) * 14.7;

    document.getElementById("result-sfc").innerHTML = ata3.toFixed(2).toString();

  }

  saveCalculation() {
    this.sqlite.create({
      name: 'ionicdb.db',
      location: 'default'
    }).then((db: SQLiteObject) => {
      db.executeSql("INSERT INTO saved_mod VALUES(NULL,strftime('%Y-%m-%d %H-%M-%S','now'),?, ?)",[this.ata, this.fv])
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
