import { Component, ViewChild } from '@angular/core';
import { NavController, Content, NavParams } from 'ionic-angular';
import { SQLite, SQLiteObject } from '@ionic-native/sqlite';
import { Toast } from '@ionic-native/toast';
import { Dialogs } from '@ionic-native/dialogs';

@Component({
  selector: 'page-formula5',
  templateUrl: 'formula5.html'
})
export class Formula5Page {

  depth: any;
  fo: any;


  @ViewChild(Content) content: Content;
  constructor(public navCtrl: NavController, private sqlite: SQLite, 
      private toast: Toast,
      public navParams: NavParams,
      private dialogs: Dialogs) {

    // this.depth = navParams.get("depth");
    // this.fo = navParams.get("fo");

    if( navParams.get("var1") != null ){
      this.depth = navParams.get("var1");
    }

    if( navParams.get("var2") != null ){
      this.fo = navParams.get("var2");
    }

  }

  ionViewDidEnter() {
    this.compute();
  }


  compute(){

    let a = (Number(this.depth) + 33) * ((1 - (Number(this.fo)/100)) / 0.79) - 33;
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
      db.executeSql("INSERT INTO saved_calculation (date, note, formula_id, formula_name, formula_page, var1, var2) VALUES(strftime('%Y-%m-%d %H-%M-%S','now'),?,?,?,?,?,?)",[note, '5', 'Equivalent Air Depth Calculations', 'Formula5Page', this.depth, this.fo])
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
