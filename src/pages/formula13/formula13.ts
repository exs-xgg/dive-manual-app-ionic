import { Component, ViewChild } from '@angular/core';
import { NavController, Content, NavParams } from 'ionic-angular';
import { SQLite, SQLiteObject } from '@ionic-native/sqlite';
import { Toast } from '@ionic-native/toast';
import { Dialogs } from '@ionic-native/dialogs';

@Component({
  selector: 'page-formula13',
  templateUrl: 'formula13.html'
})
export class Formula13Page {

  ppoDesired: any;
  ppoPresent: any;
  gas: any;


  @ViewChild(Content) content: Content;
  constructor(public navCtrl: NavController, private sqlite: SQLite, 
      private toast: Toast,
      public navParams: NavParams,
      private dialogs: Dialogs) {

    // this.ppoDesired = navParams.get("ppoDesired");
    // this.ppoPresent = navParams.get("ppoPresent");
    // this.gas = navParams.get("gas");

    if( navParams.get("var1") != null ){
      this.ppoDesired = navParams.get("var1");
    }
  
    if( navParams.get("var2") != null ){
      this.ppoPresent = navParams.get("var2");
    }
  
    if( navParams.get("var3") != null ){
      this.gas = navParams.get("var3");
    }

  }

  compute(){
    
    let a = (Number(this.ppoDesired) -  Number(this.ppoPresent)) * 33 * (Number(this.gas) / 100);
    document.getElementById("result-sfc").innerHTML = a.toFixed(2).toString();

  }

  ionViewDidEnter() {
    this.compute();
  }

  save(){
    this.dialogs.prompt("Add Note", "", ["Save", "Cancel"], "")
    .then((result) => 
    { 
      if(result.buttonIndex == 1) {
        this.saveCalculation(result.input1);
      }
    })
    .catch(e => alert("Error in saving calculation"));
  }

  saveCalculation(note) {
    this.sqlite.create({
      name: 'ionicdb.db',
      location: 'default'
    }).then((db: SQLiteObject) => {
      db.executeSql("INSERT INTO saved_calculation (date, note, formula_id, formula_name, formula_page, var1, var2, var3) VALUES(strftime('%Y-%m-%d %H-%M-%S','now'),?,?,?,?,?,?,?)",[note, '13', 'Metabolic Makeup Formula', 'Formula13Page', this.ppoDesired, this.ppoPresent, this.gas])
        .then(res => {
          console.log(res);
          this.toast.show('Data saved', '1000', 'center').subscribe(
            toast => {}
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
