import { Component, ViewChild } from '@angular/core';
import { NavController, Content, NavParams } from 'ionic-angular';
import { SQLite, SQLiteObject } from '@ionic-native/sqlite';
import { Toast } from '@ionic-native/toast';
import { Dialogs } from '@ionic-native/dialogs';

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
      public navParams: NavParams,
      private dialogs: Dialogs) {

    // this.pf = navParams.get("pf");
    // this.mf = navParams.get("mf");
    // this.mmp = navParams.get("mmp");
    // this.fv = navParams.get("fv");
    // this.n = navParams.get("n");

    if( navParams.get("var1") != null ){
      this.pf = navParams.get("var1");
    }

    if( navParams.get("var2") != null ){
      this.mf = navParams.get("var2");
    }

    if( navParams.get("var3") != null ){
      this.mmp = navParams.get("var3");
    }

    if( navParams.get("var4") != null ){
      this.fv = navParams.get("var4");
    }

    if( navParams.get("var5") != null ){
      this.n = navParams.get("var5");
    }

  }

  ionViewDidEnter() {
    this.computeSfc();
  }


  computeSfc(){

    if ( this.mmp == undefined ) {
      this.mmp = 0;
    }
    
    let a = ((Number(this.pf) - (Number(this.mf) + Number(this.mmp))) / 14.7) * this.fv * this.n;
    a = Math.round(Number(a)+0.5);
    document.getElementById("result-sfc").innerHTML = a.toFixed(2).toString();

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
      db.executeSql("INSERT INTO saved_calculation (date, note, formula_id, formula_name, formula_page, var1, var2, var3, var4, var5) VALUES(strftime('%Y-%m-%d %H-%M-%S','now'),?,?,?,?,?,?,?,?,?)",[note, '3', 'Air / Oxygen / Mixed Gas Available for Use', 'Formula3Page', this.pf, this.mf, this.mmp, this.fv, this.n])
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
