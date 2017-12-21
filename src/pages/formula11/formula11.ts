import { Component, ViewChild } from '@angular/core';
import { NavController, Content, NavParams } from 'ionic-angular';
import { SQLite, SQLiteObject } from '@ionic-native/sqlite';
import { Toast } from '@ionic-native/toast';
import { Dialogs } from '@ionic-native/dialogs';

@Component({
  selector: 'page-formula11',
  templateUrl: 'formula11.html'
})
export class Formula11Page {

  ppo: any;
  depth: any;
  oxy: any;


  @ViewChild(Content) content: Content;
  constructor(public navCtrl: NavController, private sqlite: SQLite, 
      private toast: Toast,
      public navParams: NavParams,
      private dialogs: Dialogs) {

    // this.ppo = navParams.get("ppo");
    // this.depth = navParams.get("depth");
    // this.oxy = navParams.get("oxy");

    if( navParams.get("var1") != null ){
      this.ppo = navParams.get("var1");
    }
  
    if( navParams.get("var2") != null ){
      this.depth = navParams.get("var2");
    }
  
    if( navParams.get("var3") != null ){
      this.oxy = navParams.get("var3");
    }

  }

  ionViewDidEnter() {
    if ( this.ppo == null || this.ppo != "" ) {
      this.computePpo();
    }

    if ( this.depth == null || this.depth != "" ) {
      this.computeDepth();
    }

    if ( this.oxy == null || this.oxy != "" ) {
      this.computeOxy();
    }
  }


  computeOxy(){

    let ata = (Number(this.depth) + 33 ) / 33;
    this.oxy = ((Number(this.ppo) / ata) * 100).toFixed(2);
    
  }

  computePpo(){
    
    let ata = (Number(this.depth) + 33 ) / 33;
    this.ppo = (this.oxy / 100) * ata;

  }

  computeDepth(){
    
    let oxy = this.oxy / 100;
    this.depth = ((this.ppo / oxy) - 1 ) * 33;

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
      db.executeSql("INSERT INTO saved_calculation (date, note, formula_id, formula_name, formula_page, var1, var2, var3) VALUES(strftime('%Y-%m-%d %H-%M-%S','now'),?,?,?,?,?,?,?)",[note, '11', '"T" Formula for Partial Pressure, Maximum O2 and Cutoff Depth', 'Formula11Page', this.ppo, this.depth, this.oxy])
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
