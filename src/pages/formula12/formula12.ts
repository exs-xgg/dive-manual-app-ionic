import { Component, ViewChild } from '@angular/core';
import { NavController, Content, NavParams } from 'ionic-angular';
import { SQLite, SQLiteObject } from '@ionic-native/sqlite';
import { Toast } from '@ionic-native/toast';
import { Dialogs } from '@ionic-native/dialogs';

@Component({
  selector: 'page-formula12',
  templateUrl: 'formula12.html'
})
export class Formula12Page {

  p1: any;
  v1: any;
  t1: any;
  p2: any;
  v2: any;
  t2: any;


  @ViewChild(Content) content: Content;
  constructor(public navCtrl: NavController, private sqlite: SQLite, 
      private toast: Toast,
      public navParams: NavParams,
      private dialogs: Dialogs) {

    // this.p1 = navParams.get("p1");
    // this.v1 = navParams.get("v1");
    // this.t1 = navParams.get("t1");
    // this.p2 = navParams.get("p2");
    // this.v2 = navParams.get("v2");
    // this.t2 = navParams.get("t2");

    if( navParams.get("var1") != null ){
      this.p1 = navParams.get("var1");
    }
  
    if( navParams.get("var2") != null ){
      this.v1 = navParams.get("var2");
    }
  
    if( navParams.get("var3") != null ){
      this.t1 = navParams.get("var3");
    }

    if( navParams.get("var4") != null ){
      this.p2 = navParams.get("var4");
    }

    if( navParams.get("var5") != null ){
      this.v2 = navParams.get("var5");
    }
  
    if( navParams.get("var6") != null ){
      this.t2 = navParams.get("var6");
    }

  }

  ionViewDidEnter() {
    this.compute();
  }


  compute(){
    var ctr = 0;
    var computeFor = "";
    if(this.p1 ==undefined || this.p1 == ""){
      ctr++;
      computeFor = "p1";
    }
    if(this.v1 ==undefined || this.v1 == ""){
      ctr++;
      computeFor = "v1";
    }
    if(this.t1 ==undefined || this.t1 == ""){
      ctr++;
      computeFor = "t1";
    }
    if(this.p2 ==undefined || this.p2 == ""){
      ctr++;
      computeFor = "p2";
    }
    if(this.v2 ==undefined || this.v2 == ""){
      ctr++;
      computeFor = "v2";
    }
    if(this.t2 ==undefined || this.t2 == ""){
      ctr++;
      computeFor = "t2";
    }

    if(ctr == 1){
      if(this.p1 ==undefined || this.p1 == ""){
        this.computep1();
      }
      if(this.v1 ==undefined || this.v1 == ""){
        this.computev1();
      }
      if(this.t1 ==undefined || this.t1 == ""){
        this.computet1();
      }
      if(this.p2 ==undefined || this.p2 == ""){
        this.computep2();
      }
      if(this.v2 ==undefined || this.v2 == ""){
        this.computev2();
      }
      if(this.t2 ==undefined || this.t2 == ""){
        this.computet2();
      }
    }
    

  }

  computep1(){

    
    let localp2 = (Number(this.p2) + 33 ) /33;
    let localt1 = Number(this.t1) + 460;
    let localt2 = Number(this.t2) + 460;
    let localv1 = this.v1;
    let localv2 = this.v2;

    let localp1 = (localp2 * localv2 * localt1) / (localt2 * localv1);
    this.p1 = ( Number(localp1) - 1 ) * 33;

  }

  computev1(){

    let localp1 = (Number(this.p1) + 33 ) /33;
    let localp2 = (Number(this.p2) + 33 ) /33;
    let localt1 = Number(this.t1) + 460;
    let localt2 = Number(this.t2) + 460;
    let localv2 = this.v2;

    let localv1 = ( localp2 * localv2 * localt1 ) / ( localt2 * localp1 );
    this.v1 = localv1;

  }

  computet1(){

    let localp1 = (Number(this.p1) + 33 ) /33;
    let localp2 = (Number(this.p2) + 33 ) /33;
    let localt2 = Number(this.t2) + 460;
    let localv1 = this.v1;
    let localv2 = this.v2;

    let localt1 = ( localt2 * localp1 * localv1 ) / ( localp2 * localv2 );
    this.t1 = localt1;

  }
  
  computep2(){

    let localP1 = (Number(this.p1) + 33 ) /33;
    let localt2 = Number(this.t2) + 460;
    let localt1 = Number(this.t1) + 460;
    let localv1 = this.v1;
    let localv2 = this.v2;

    let localp2 = (localP1 * localv1 * localt2) / (localt1 * localv2);
    this.p2 = ( Number(localp2) - 1 ) * 33;

  }

  computev2(){

    let localp1 = (Number(this.p1) + 33 ) /33;
    let localp2 = (Number(this.p2) + 33 ) /33;
    let localt1 = Number(this.t1) + 460;
    let localt2 = Number(this.t2) + 460;
    let localv1 = this.v1;

    let localv2 = ( localp1 * localv1 * localt2 ) / ( localp2 * localt1 );
    this.v2 = localv2;

  }
  computet2(){

    let localp1 = (Number(this.p1) + 33 ) /33;
    let localp2 = (Number(this.p2) + 33 ) /33;
    let localt1 = Number(this.t1) + 460;
    let localv1 = this.v1;
    let localv2 = this.v2;

    let localt2 = ( localp2 * localv2 * localt1) / ( localp1 * localv1 );
    this.t2 = (Number(localt2) - 460);

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
      db.executeSql("INSERT INTO saved_calculation (date, note, formula_id, formula_name, formula_page, var1, var2, var3, var4, var5, var6) VALUES(strftime('%Y-%m-%d %H-%M-%S','now'),?,?,?,?,?,?,?,?,?,?)",[note, '12', 'General Gas Law Formula', 'Formula12Page', this.p1, this.v1, this.t1, this.p2, this.v2, this.t2])
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
