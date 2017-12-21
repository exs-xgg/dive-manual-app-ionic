import { Component, ViewChild } from '@angular/core';
import { NavController, Content, NavParams } from 'ionic-angular';
import { SQLite, SQLiteObject } from '@ionic-native/sqlite';
import { Toast } from '@ionic-native/toast';
import { Dialogs } from '@ionic-native/dialogs';

@Component({
  selector: 'page-formula7',
  templateUrl: 'formula7.html'
})
export class Formula7Page {

  depth: any;
  fv: any;

  ata: any;
  tvr: any;
  time: any;

  dl: any;
  dr: any;
  ata2: any;
  time2: any;

  cprn: any;
  ventb: any;
  vents: any;
  venta: any;

  scfr: any;
  scfa: any;
  tvr2: any;

  bsata: any;
  acfm: any;
  nof: any;
  time3: any;

  aata: any;
  acfm2: any;
  nof2: any;
  time4: any;

  descent: number;
  ascent: number;

  @ViewChild(Content) content: Content;
  constructor(public navCtrl: NavController, private sqlite: SQLite, 
      private toast: Toast,
      public navParams: NavParams,
      private dialogs: Dialogs) {

    // this.depth = navParams.get("depth");
    // this.fv = navParams.get("fv");

    // this.ata = navParams.get("ata");
    // this.tvr = navParams.get("tvr");
    // this.time = navParams.get("time");

    // this.dl = navParams.get("dl");
    // this.dr = navParams.get("dr");
    // this.ata2 = navParams.get("ata2");
    // this.time2 = navParams.get("time2");

    // this.ventb = navParams.get("ventb");
    // this.cprn = navParams.get("cprn");
    // this.vents = navParams.get("vents");
    // this.venta = navParams.get("venta");

    // this.scfr = navParams.get("scfr");
    // this.scfa = navParams.get("scfa");
    // this.tvr2 = navParams.get("tvr2");

    // this.bsata = navParams.get("bsata");
    // this.acfm = navParams.get("acfm");
    // this.nof = navParams.get("nof");
    // this.time3 = navParams.get("time3");

    // this.aata = navParams.get("aata");
    // this.acfm2 = navParams.get("acfm2");
    // this.nof2 = navParams.get("nof2");
    // this.time4 = navParams.get("time4");

    if( navParams.get("var1") != null ){
      this.depth = navParams.get("var1");
    }
  
    if( navParams.get("var2") != null ){
      this.fv = navParams.get("var2");
    }
  
    if( navParams.get("var3") != null ){
      this.ata = navParams.get("var3");
    }
  
    if( navParams.get("var4") != null ){
      this.tvr = navParams.get("var4");
    }
  
    if( navParams.get("var5") != null ){
      this.time = navParams.get("var5");
    }

    if( navParams.get("var6") != null ){
      this.dl = navParams.get("var6");
    }
  
    if( navParams.get("var7") != null ){
      this.dr = navParams.get("var7");
    }
  
    if( navParams.get("var8") != null ){
      this.ata2 = navParams.get("var8");
    }
  
    if( navParams.get("var9") != null ){
      this.time2 = navParams.get("var9");
    }

    if( navParams.get("var10") != null ){
      this.cprn = navParams.get("var10");
    }
  
    if( navParams.get("var11") != null ){
      this.ventb = navParams.get("var11");
    }
  
    if( navParams.get("var12") != null ){
      this.vents = navParams.get("var12");
    }
  
    if( navParams.get("var13") != null ){
      this.venta = navParams.get("var13");
    }

    if( navParams.get("var14") != null ){
      this.scfr = navParams.get("var14");
    }
  
    if( navParams.get("var15") != null ){
      this.scfa = navParams.get("var15");
    }
  
    if( navParams.get("var16") != null ){
      this.tvr2 = navParams.get("var16");
    }
  
    if( navParams.get("var17") != null ){
      this.bsata = navParams.get("var17");
    }
  
    if( navParams.get("var18") != null ){
      this.acfm = navParams.get("var18");
    }
  
    if( navParams.get("var19") != null ){
      this.nof = navParams.get("var19");
    }
  
    if( navParams.get("var20") != null ){
      this.time3 = navParams.get("var20");
    }
  
    if( navParams.get("var21") != null ){
      this.aata = navParams.get("var21");
    }
  
    if( navParams.get("var22") != null ){
      this.acfm2 = navParams.get("var22");
    }
  
    if( navParams.get("var23") != null ){
      this.nof2 = navParams.get("var23");
    }
  
    if( navParams.get("var24") != null ){
      this.time4 = navParams.get("var24");
    }

  }

  ionViewDidEnter() {
    this.computeSfc();
    this.computeVentReq();
    this.computeAirReq();
    this.computeTotalAirVent();
    this.computeRenInVent();
    this.computeDescent();
    this.computeAscent();
    this.computeDescentAscent();
  }


  computeSfc(){

    let a = (Number(this.depth) * Number(this.fv)) / 33;
    document.getElementById("result-sfc").innerHTML = a.toFixed(2).toString();

  }

  computeVentReq(){
    
    let a = Number(this.ata) * Number(this.tvr) * Number(this.time);
    document.getElementById("result-sfc-2").innerHTML = a.toFixed(2).toString();

  }

  computeAirReq(){
    
    let a = ((Number(this.dl) + Number(this.dr)) / 2) * Number(this.ata2) * Number(this.time2);
    document.getElementById("result-sfc-3").innerHTML = a.toFixed(2).toString();

  }

  computeTotalAirVent(){
    
    let a = Number(this.cprn) + Number(this.ventb) + Number(this.venta) + Number(this.vents);
    a = Math.round(Number(a)+0.5);
    document.getElementById("result-sfc-4").innerHTML = a.toFixed(2).toString();

  }

  computeRenInVent(){
    
    let a = (Number(this.scfr) / Number(this.scfa)) * Number(this.tvr2);
    a = Math.round(Number(a)+0.5);
    document.getElementById("result-sfc-5").innerHTML = a.toFixed(2).toString();

  }

  computeDescent(){
    
    let a = Number(this.bsata) * Number(this.time3) * Number(this.nof) * Number(this.acfm);
    document.getElementById("result-sfc-6").innerHTML = a.toFixed(2).toString();
    this.descent = a;
    this.computeDescentAscent();

  }

  computeAscent(){
    
    let a = Number(this.aata) * Number(this.time4) * Number(this.nof2) * Number(this.acfm2);
    document.getElementById("result-sfc-7").innerHTML = a.toFixed(2).toString();
    this.ascent = a;
    this.computeDescentAscent();

  }

  computeDescentAscent(){
    
    let a = Math.round(Number(this.descent) + Number(this.ascent) + 0.5);
    document.getElementById("result-sfc-8").innerHTML = a.toFixed(2).toString();

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
      db.executeSql("INSERT INTO saved_calculation (date, note, formula_id, formula_name, formula_page, var1, var2, var3, var4, var5, var6, var7, var8, var9, var10, var11, var12, var13, var14, var15, var16, var17, var18, var19, var20, var21, var22, var23, var24) VALUES(strftime('%Y-%m-%d %H-%M-%S','now'),?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)",[note, '7', 'Chamber / Air O2 Requirements', 'Formula7Page', this.depth, this.fv, this.ata, this.tvr, this.time, this.dl, this.dr, this.ata2, this.time2, this.cprn, this.ventb, this.vents, this.venta, this.scfr, this.scfa, this.tvr2, this.bsata, this.acfm, this.nof, this.time3, this.aata, this.acfm2, this.nof2, this.time4])
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
