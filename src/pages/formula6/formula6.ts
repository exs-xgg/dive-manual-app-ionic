import { Component, ViewChild } from '@angular/core';
import { NavController, Content, NavParams } from 'ionic-angular';
import { SQLite, SQLiteObject } from '@ionic-native/sqlite';
import { Toast } from '@ionic-native/toast';
import { Dialogs } from '@ionic-native/dialogs';

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
      public navParams: NavParams,
      private dialogs: Dialogs) {

    // this.aata = navParams.get("aata");
    // this.an = navParams.get("an");
    // this.at = navParams.get("at");

    if( navParams.get("var1") != null ){
      this.aata = navParams.get("var1");
    }

    if( navParams.get("var2") != null ){
      this.an = navParams.get("var2");
    }

    if( navParams.get("var3") != null ){
      this.at = navParams.get("var3");
    }

  }

  ionViewDidEnter() {
    this.computeSfc();
  }


  computeSfc(){

    let a = Number(this.aata) * Number(this.an) * Number(this.at);
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
      db.executeSql("INSERT INTO saved_calculation (date, note, formula_id, formula_name, formula_page, var1, var2, var3) VALUES(strftime('%Y-%m-%d %H-%M-%S','now'),?,?,?,?,?,?,?)",[note, '6', 'Surfaced Supplied Air / Mixed Gas Requirements', 'Formula6Page', this.aata, this.an, this.at])
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
