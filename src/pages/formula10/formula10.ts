import { Component, ViewChild } from '@angular/core';
import { NavController, Content, NavParams } from 'ionic-angular';
import { SQLite, SQLiteObject } from '@ionic-native/sqlite';
import { Toast } from '@ionic-native/toast';
import { Dialogs } from '@ionic-native/dialogs';

@Component({
  selector: 'page-formula10',
  templateUrl: 'formula10.html'
})
export class Formula10Page {

  fv1: any;
  fv2: any;
  fv3: any;
  pressure1: any;
  pressure2: any;
  pressure3: any;


  @ViewChild(Content) content: Content;
  constructor(public navCtrl: NavController, private sqlite: SQLite, 
      private toast: Toast,
      public navParams: NavParams,
      private dialogs: Dialogs) {

    // this.fv1 = navParams.get("fv1");
    // this.fv2 = navParams.get("fv2");
    // this.fv3 = navParams.get("fv3");
    // this.pressure1 = navParams.get("pressure1");
    // this.pressure2 = navParams.get("pressure2");
    // this.pressure3 = navParams.get("pressure3");

    if( navParams.get("var1") != null ){
      this.fv1 = navParams.get("var1");
    }
  
    if( navParams.get("var2") != null ){
      this.fv2 = navParams.get("var2");
    }
  
    if( navParams.get("var3") != null ){
      this.fv3 = navParams.get("var3");
    }

    if( navParams.get("var4") != null ){
      this.pressure1 = navParams.get("var4");
    }

    if( navParams.get("var5") != null ){
      this.pressure2 = navParams.get("var5");
    }
  
    if( navParams.get("var6") != null ){
      this.pressure3 = navParams.get("var6");
    }
  
  }

  ionViewDidEnter() {
    this.computeSfc();
  }


  computeSfc(){

    let ata1 = ( Number(this.pressure1) + 14.7 ) / 14.7;
    let ata2 = ( Number(this.pressure3) - Number(this.pressure2) ) / 33;

    let scf1 = ata1 * Number(this.fv1);
    let scf2 = ata2 * Number(this.fv2);
    
    let scf3 = Number(scf1) - Number(scf2);

    let ata3 = ( (scf3 / this.fv1) - 1 ) * 14.7;

    document.getElementById("result-sfc").innerHTML = Math.round(ata3).toString();

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
      db.executeSql("INSERT INTO saved_calculation (date, note, formula_id, formula_name, formula_page, var1, var2, var3, var4, var5, var6) VALUES(strftime('%Y-%m-%d %H-%M-%S','now'),?,?,?,?,?,?,?,?,?,?)",[note, '10', '"T" Formula for Final Pressure', 'Formula10Page', this.fv1, this.fv2, this.fv3, this.pressure1, this.pressure2, this.pressure3])
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
