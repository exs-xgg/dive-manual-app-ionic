import { Component, ViewChild } from '@angular/core';
import { NavController, Content, NavParams } from 'ionic-angular';
import { SQLite, SQLiteObject } from '@ionic-native/sqlite';
import { Toast } from '@ionic-native/toast';
import { Dialogs } from '@ionic-native/dialogs';

@Component({
  selector: 'page-formula15',
  templateUrl: 'formula15.html'
})
export class Formula15Page {

  ata: any;
  fv: any;
  n: any;


  @ViewChild(Content) content: Content;
  constructor(public navCtrl: NavController, private sqlite: SQLite, 
      private toast: Toast,
      public navParams: NavParams,
      private dialogs: Dialogs) {

    // this.ata = navParams.get("ata");
    // this.fv = navParams.get("fv");
    // this.n = navParams.get("n");

    if( navParams.get("var1") != null ){
      this.ata = navParams.get("var1");
    }
  
    if( navParams.get("var2") != null ){
      this.fv = navParams.get("var2");
    }
  
    if( navParams.get("var3") != null ){
      this.n = navParams.get("var3");
    }

  }

  ionViewDidEnter() {
    this.computeSfc();
  }


  computeSfc(){

    let a = Number(this.ata) * Number(this.fv) * Number(this.n);
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
      db.executeSql("INSERT INTO saved_calculation (date, note, formula_id, formula_name, formula_page, var1, var2, var3) VALUES(strftime('%Y-%m-%d %H-%M-%S','now'),?,?,?,?,?,?,?)",[note, '15', '"T" Formula for Equalization', 'Formula15Page', this.ata, this.fv, this.n])
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
