import { Component, ViewChild } from '@angular/core';
import { NavController, Content, NavParams } from 'ionic-angular';
import { SQLite, SQLiteObject } from '@ionic-native/sqlite';
import { Toast } from '@ionic-native/toast';
import { Dialogs } from '@ionic-native/dialogs';

@Component({
  selector: 'page-formula8',
  templateUrl: 'formula8.html'
})
export class Formula8Page {

  scf: any;
  pressure: any;
  fv: any;

  ata: any;

  @ViewChild(Content) content: Content;
  constructor(public navCtrl: NavController, private sqlite: SQLite, 
      private toast: Toast,
      public navParams: NavParams,
      private dialogs: Dialogs) {

    // this.scf = navParams.get("scf");
    // this.pressure = navParams.get("pressure");
    // this.fv = navParams.get("fv");

    if( navParams.get("var1") != null ){
      this.scf = navParams.get("var1");
    }
  
    if( navParams.get("var2") != null ){
      this.pressure = navParams.get("var2");
    }
  
    if( navParams.get("var3") != null ){
      this.fv = navParams.get("var3");
    }

    if( navParams.get("var4") != null ){
      this.ata = navParams.get("var4");
    }

  }

  ionViewDidEnter() {
    this.compute();
  }


  computeT(){
    
    if(this.scf != undefined && this.fv != undefined ){
        let b = (Number(this.scf) / Number(this.fv)).toFixed(5);
        let c = ((Number(b) - 1) * 14.7).toFixed(2).toString();
        this.pressure = Number(c);

        let a = ( Number(c) + 14.7 ) / 14.7;
        document.getElementById("ata-value").innerHTML = "ATA: "+a.toFixed(6).toString();
    }

  }

  computeP(){

    if ( this.pressure != undefined && this.fv != undefined ){
      let a = Number(this.fv) * Number(this.ata);
      this.scf = a.toFixed(2).toString();
    }
    
  }

  compute(){

    var ctr = 0;
    var computeFor = "";
    if(this.scf == undefined || this.scf == ""){
      ctr++;
      computeFor = "scf";
    }
    if(this.pressure == undefined || this.pressure == ""){
      ctr++;
      computeFor = "pressure";
    }
    if(this.fv == undefined || this.fv == ""){
      ctr++;
      computeFor = "";
    }

    if( ctr == 1 && computeFor != "" ){
      if (computeFor == "scf") {
        this.computeP();
      } else if (computeFor == "pressure") {
        this.computeT();
      } else if (computeFor == "fv") {
        
      }
    } else {
      alert("Make sure that at least two fields are not blank; either pressure or scf field should be blank.");
    }
  }


  computeAta(callComputeT){
    
    let a = ( Number(this.pressure) + 14.7 ) / 14.7;
    this.ata = a.toFixed(6);
    document.getElementById("ata-value").innerHTML = "ATA: "+this.ata.toString();
    if(callComputeT){
      this.computeP();
    }

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
      db.executeSql("INSERT INTO saved_calculation (date, note, formula_id, formula_name, formula_page, var1, var2, var3) VALUES(strftime('%Y-%m-%d %H-%M-%S','now'),?,?,?,?,?,?,?)",[note, '8', '"T" Formula for Standard Cubic Feet of Gas', 'Formula8Page', this.scf, this.pressure, this.fv])
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
