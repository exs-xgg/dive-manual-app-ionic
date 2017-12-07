import { Component, ViewChild } from '@angular/core';
import { NavController, Content, NavParams } from 'ionic-angular';
import { SQLite, SQLiteObject } from '@ionic-native/sqlite';
import { Toast } from '@ionic-native/toast';

@Component({
  selector: 'page-formula3',
  templateUrl: 'formula3.html'
})
export class Formula3Page {

  pf: any;
  mf: any;
  mmp: any;
  fv: any;
  n: any;


  @ViewChild(Content) content: Content;
  constructor(public navCtrl: NavController, private sqlite: SQLite, 
      private toast: Toast,
      public navParams: NavParams) {

    this.pf = navParams.get("pf");
    this.mf = navParams.get("mf");
    this.mmp = navParams.get("mmp");
    this.fv = navParams.get("fv");
    this.n = navParams.get("n");

  }

  ionViewDidEnter() {
  }


  computeSfc(){

    if ( this.mmp == undefined ) {
      this.mmp = 0;
    }
    
    let a = ((Number(this.pf) - (Number(this.mf) + Number(this.mmp))) / 14.7) * this.fv * this.n;
    a = Math.round(Number(a)+0.5);
    document.getElementById("result-sfc").innerHTML = a.toFixed(2).toString();

  }

  saveCalculation() {
    this.sqlite.create({
      name: 'ionicdb.db',
      location: 'default'
    }).then((db: SQLiteObject) => {
      db.executeSql("INSERT INTO saved_mod VALUES(NULL,strftime('%Y-%m-%d %H-%M-%S','now'),?, ?)",[this.pf, this.fv])
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
