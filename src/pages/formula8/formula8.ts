import { Component, ViewChild } from '@angular/core';
import { NavController, Content, NavParams } from 'ionic-angular';
import { SQLite, SQLiteObject } from '@ionic-native/sqlite';
import { Toast } from '@ionic-native/toast';

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
      public navParams: NavParams) {

    this.scf = navParams.get("scf");
    this.pressure = navParams.get("pressure");
    this.fv = navParams.get("fv");

  }

  ionViewDidEnter() {
  }


  computeT(){

    if(this.scf != undefined && this.fv != undefined ){
        let b = (Number(this.scf) / Number(this.fv)).toFixed(5);
        b = ((Number(b) - 1) * 14.7).toFixed(2).toString();
        //document.getElementById("pressure").innerHTML = b;
        this.pressure = b;

        let a = ( Number(b) + 14.7 ) / 14.7;
        document.getElementById("ata-value").innerHTML = "ATA: "+a.toFixed(6).toString();
    }

  }

  computeP(){

    if ( this.pressure != undefined && this.fv != undefined ){
      let a = Number(this.fv) * Number(this.ata);
      this.scf = a.toFixed(2).toString();
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

  saveCalculation() {
    this.sqlite.create({
      name: 'ionicdb.db',
      location: 'default'
    }).then((db: SQLiteObject) => {
      db.executeSql("INSERT INTO saved_mod VALUES(NULL,strftime('%Y-%m-%d %H-%M-%S','now'),?, ?)",[this.ata, this.fv])
        .then(res => {
          console.log(res);
          this.toast.show('Data saved', '1000', 'center').subscribe(
            toast => {
              this.navCtrl.popToRoot();
            }
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
