import { Component, ViewChild } from '@angular/core';
import { NavController, Content, NavParams } from 'ionic-angular';
import { SQLite, SQLiteObject } from '@ionic-native/sqlite';
import { Toast } from '@ionic-native/toast';

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
      public navParams: NavParams) {

    this.depth = navParams.get("depth");
    this.fv = navParams.get("fv");

    this.ata = navParams.get("ata");
    this.tvr = navParams.get("tvr");
    this.time = navParams.get("time");

    this.dl = navParams.get("dl");
    this.dr = navParams.get("dr");
    this.ata2 = navParams.get("ata2");
    this.time2 = navParams.get("time2");

    this.ventb = navParams.get("ventb");
    this.cprn = navParams.get("cprn");
    this.vents = navParams.get("vents");
    this.venta = navParams.get("venta");

    this.scfr = navParams.get("scfr");
    this.scfa = navParams.get("scfa");
    this.tvr2 = navParams.get("tvr2");

    this.ventb = navParams.get("ventb");
    this.cprn = navParams.get("cprn");
    this.vents = navParams.get("vents");
    this.venta = navParams.get("venta");
    this.venta = navParams.get("venta");

    this.bsata = navParams.get("bsata");
    this.acfm = navParams.get("acfm");
    this.nof = navParams.get("nof");
    this.time3 = navParams.get("time3");

    this.aata = navParams.get("aata");
    this.acfm2 = navParams.get("acfm2");
    this.nof2 = navParams.get("nof2");
    this.time4 = navParams.get("time4");
  }

  ionViewDidEnter() {
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

  saveCalculation() {
    this.sqlite.create({
      name: 'ionicdb.db',
      location: 'default'
    }).then((db: SQLiteObject) => {
      db.executeSql("INSERT INTO saved_mod VALUES(NULL,strftime('%Y-%m-%d %H-%M-%S','now'),?, ?)",[this.depth, this.fv])
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
