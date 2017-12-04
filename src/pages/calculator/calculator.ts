import { Component, ViewChild } from '@angular/core';
import { NavController, Content, NavParams } from 'ionic-angular';
import { SQLite, SQLiteObject } from '@ionic-native/sqlite';
import { Toast } from '@ionic-native/toast';

@Component({
  selector: 'page-calculator',
  templateUrl: 'calculator.html'
})
export class CalculatorPage {

  fo2: any;
  ppo2:any;

  @ViewChild(Content) content: Content;
  constructor(public navCtrl: NavController, private sqlite: SQLite, 
      private toast: Toast,
      public navParams: NavParams) {
    console.log("On Calculator Page");
    this.fo2 = navParams.get("fo2");
    this.ppo2 = navParams.get("ppo2");
  }

  ionViewDidEnter() {
    this.changefo2();
    this.changeppo2();
  }

  changefo2(){
    document.getElementById("fo2-value").innerHTML = (this.fo2*100).toFixed(0).toString();
    this.computeForFeet();
  }

  changeppo2(){
    document.getElementById("ppo2-value").innerHTML = this.ppo2;
    this.computeForFeet();
  }

  computeForFeet(){

    let a = ((this.ppo2 / (this.fo2)) - 1) * 33;
    document.getElementById("result-feet").innerHTML = a.toFixed(2).toString();

    let b = a * 0.3048;
    document.getElementById("result-meter").innerHTML = b.toFixed(2).toString();

  }

  saveCalculation() {
    this.sqlite.create({
      name: 'ionicdb.db',
      location: 'default'
    }).then((db: SQLiteObject) => {
      db.executeSql("INSERT INTO saved_mod VALUES(NULL,strftime('%Y-%m-%d %H-%M-%S','now'),?, ?)",[this.fo2, this.ppo2])
        .then(res => {
          console.log(res);
          this.toast.show('Data saved', '5000', 'center').subscribe(
            toast => {
              this.navCtrl.popToRoot();
            }
          );
        })
        .catch(e => {
          console.log(e);
          this.toast.show(e, '5000', 'center').subscribe(
            toast => {
              console.log(toast);
            }
          );
        });
    }).catch(e => {
      console.log(e);
      this.toast.show(e, '5000', 'center').subscribe(
        toast => {
          console.log(toast);
        }
      );
    });
  }

}
