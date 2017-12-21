import { Component, ViewChild } from '@angular/core';
import { NavController, Content, NavParams } from 'ionic-angular';
import { SQLite, SQLiteObject } from '@ionic-native/sqlite';
import { Toast } from '@ionic-native/toast';
import { Dialogs } from '@ionic-native/dialogs';

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
      public navParams: NavParams,
      private dialogs: Dialogs) {

    // this.depth = navParams.get("depth");
    // this.rmv = navParams.get("rmv");

    // this.pc = navParams.get("pc");
    // this.pm = navParams.get("pm");
    // this.fv = navParams.get("fv");
    // this.noc = navParams.get("noc");

    // this.ca = navParams.get("ca");
    // this.cr = navParams.get("cr");

    if( navParams.get("var1") != null ){
      this.depth = navParams.get("var1");
    }

    if( navParams.get("var2") != null ){
      this.rmv = navParams.get("var2");
    }

    if( navParams.get("var3") != null ){
      this.pc = navParams.get("var3");
    }

    if( navParams.get("var4") != null ){
      this.pm = navParams.get("var4");
    }

    if( navParams.get("var5") != null ){
      this.fv = navParams.get("var5");
    }

    if( navParams.get("var6") != null ){
      this.noc = navParams.get("var6");
    }

    if( navParams.get("var7") != null ){
      this.ca = navParams.get("var7");
    }

    if( navParams.get("var8") != null ){
      this.cr = navParams.get("var8");
    }

  }

  ionViewDidEnter() {
    this.computeConsumptionRate();
    this.computeCapacityAvailable();
    this.computeDuration();
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
      db.executeSql("INSERT INTO saved_calculation (date, note, formula_id, formula_name, formula_page, var1, var2, var3, var4, var5, var6, var7, var8) VALUES(strftime('%Y-%m-%d %H-%M-%S','now'),?,?,?,?,?,?,?,?,?,?,?,?)",[note, '1', 'Duration of SCUBA Air Supply', 'Formula1Page',  this.depth, this.rmv, this.pc, this.pm, this.fv, this.noc, this.ca, this.cr])
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
