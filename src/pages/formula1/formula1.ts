import { Component, ViewChild } from '@angular/core';
import { NavController, Content, NavParams } from 'ionic-angular';
import { SQLite, SQLiteObject } from '@ionic-native/sqlite';
import { Toast } from '@ionic-native/toast';

@Component({
  selector: 'page-formula1',
  templateUrl: 'formula1.html'
})
export class Formula1Page {

  depth: any;
  rmv: any;

  pc: any;
  pm: any;
  fv: any;
  noc: any;

  ca: any;
  cr: any;


  @ViewChild(Content) content: Content;
  constructor(public navCtrl: NavController, private sqlite: SQLite, 
      private toast: Toast,
      public navParams: NavParams) {

    this.depth = navParams.get("depth");
    this.rmv = navParams.get("rmv");

    this.pc = navParams.get("pc");
    this.pm = navParams.get("pm");
    this.fv = navParams.get("fv");
    this.noc = navParams.get("noc");

    this.ca = navParams.get("ca");
    this.cr = navParams.get("cr");

  }

  ionViewDidEnter() {
    this.changeDepth();
    this.changeRmv();
  }

  changeDepth(){
    this.computeConsumptionRate();
  }

  changeRmv(){
    this.computeConsumptionRate();
  }

  computeConsumptionRate(){

    let a = Number(this.rmv) * (Number(this.depth) + 33) / 33;
    document.getElementById("result-cubic").innerHTML = a.toFixed(2).toString();
    document.getElementById("consumption-rate").innerHTML = a.toFixed(2).toString();
    this.computeDuration();
  }

  computeCapacityAvailable(){
    
    let a = ( (Number(this.pc) - Number(this.pm)) / 14.7 ) * this.fv * this.noc;
    document.getElementById("result-capacity-available").innerHTML = a.toFixed(2).toString();
    document.getElementById("capacity-available").innerHTML = a.toFixed(2).toString();
    this.computeDuration();
  }

  computeDuration(){
    
    let a = Number(document.getElementById("result-capacity-available").innerHTML) / Number(document.getElementById("result-cubic").innerHTML);
    document.getElementById("result-duration").innerHTML = a.toFixed(2).toString();

  }

  saveCalculation() {
    this.sqlite.create({
      name: 'ionicdb.db',
      location: 'default'
    }).then((db: SQLiteObject) => {
      db.executeSql("INSERT INTO saved_mod VALUES(NULL,strftime('%Y-%m-%d %H-%M-%S','now'),?, ?)",[this.depth, this.rmv])
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
