import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { SQLite, SQLiteObject } from '@ionic-native/sqlite';
import { CalculatorPage } from '../calculator/calculator';
import { Formula1Page } from '../formula1/formula1';
import { Formula2Page } from '../formula2/formula2';
import { Formula3Page } from '../formula3/formula3';
import { Formula4Page } from '../formula4/formula4';
import { Formula5Page } from '../formula5/formula5';
import { Formula6Page } from '../formula6/formula6';
import { Formula7Page } from '../formula7/formula7';
import { Formula8Page } from '../formula8/formula8';
import { Formula9Page } from '../formula9/formula9';
import { Formula10Page } from '../formula10/formula10';
import { Formula11Page } from '../formula11/formula11';
import { Formula12Page } from '../formula12/formula12';
import { Formula13Page } from '../formula13/formula13';
import { Formula14Page } from '../formula14/formula14';
import { Formula15Page } from '../formula15/formula15';
import { Formula16Page } from '../formula16/formula16';

@Component({
  selector: 'page-list',
  templateUrl: 'savedCalculations.html'
})
export class SavedCalculationsPage {

  fo2: any;
  ppo2:any;
  savedCalculations: any = [];

  classes = {
    'Formula1Page': Formula1Page,
    'Formula2Page': Formula2Page,
    'Formula3Page': Formula3Page,
    'Formula4Page': Formula4Page,
    'Formula5Page': Formula5Page,
    'Formula6Page': Formula6Page,
    'Formula7Page': Formula7Page,
    'Formula8Page': Formula8Page,
    'Formula9Page': Formula9Page,
    'Formula10Page': Formula10Page,
    'Formula11Page': Formula11Page,
    'Formula12Page': Formula12Page,
    'Formula13Page': Formula13Page,
    'Formula14Page': Formula14Page,
    'Formula15Page': Formula15Page,
    'Formula16Page': Formula16Page
  }

  constructor(public navCtrl: NavController, private sqlite: SQLite) {}

  ionViewDidLoad() {
    this.getData();
  }
  
  ionViewWillEnter() {
    this.getData();
  }
  
  getData() {
    this.sqlite.create({
      name: 'ionicdb.db',
      location: 'default'
    }).then((db: SQLiteObject) => {
      db.executeSql('SELECT * FROM saved_calculation ORDER BY rowid DESC', {})
      .then(res => {
        this.savedCalculations = [];
        for(var i=0; i<res.rows.length; i++) {
          this.savedCalculations.push(
            {
              rowid :  res.rows.item(i).rowid,
              date  :  res.rows.item(i).date,
              name  :  res.rows.item(i).formula_name,
              page  :  res.rows.item(i).formula_page,
              note  :  res.rows.item(i).note,
              var1   :  res.rows.item(i).var1,
              var2   :  res.rows.item(i).var2,
              var3   :  res.rows.item(i).var3,
              var4   :  res.rows.item(i).var4,
              var5   :  res.rows.item(i).var5,
              var6   :  res.rows.item(i).var6,
              var7   :  res.rows.item(i).var7,
              var8   :  res.rows.item(i).var8,
              var9   :  res.rows.item(i).var9,
              var10   :  res.rows.item(i).var10,
              var11   :  res.rows.item(i).var11,
              var12   :  res.rows.item(i).var12,
              var13   :  res.rows.item(i).var13,
              var14   :  res.rows.item(i).var14,
              var15   :  res.rows.item(i).var15,
              var16   :  res.rows.item(i).var16,
              var17   :  res.rows.item(i).var17,
              var18   :  res.rows.item(i).var18,
              var19   :  res.rows.item(i).var19,
              var20   :  res.rows.item(i).var20,
              var21   :  res.rows.item(i).var21,
              var22   :  res.rows.item(i).var22,
              var23   :  res.rows.item(i).var23,
              var24   :  res.rows.item(i).var24,
              var25   :  res.rows.item(i).var25,
              var26   :  res.rows.item(i).var26,
              var27   :  res.rows.item(i).var27
            }
          )
        }
      })
      .catch(e => console.log(e));
    }).catch(e => console.log(e));
  }

  editData(description){
    this.navCtrl.push(CalculatorPage, {
      description:description
    });
  }

  deleteData(rowid) {
    this.sqlite.create({
      name: 'ionicdb.db',
      location: 'default'
    }).then((db: SQLiteObject) => {
      db.executeSql('DELETE FROM saved_calculation WHERE rowid=?', [rowid])
      .then(res => {
        console.log(res);
        this.getData();
      })
      .catch(e => console.log(e));
    }).catch(e => console.log(e));
  }

  goToCalculator(calculation) {
    this.navCtrl.push(this.classes[calculation.page], {
        var1   : calculation.var1,
        var2   : calculation.var2,
        var3   : calculation.var3,
        var4   : calculation.var4,
        var5   : calculation.var5,
        var6   : calculation.var6,
        var7   : calculation.var7,
        var8   : calculation.var8,
        var9   : calculation.var9,
        var10   : calculation.var10,
        var11   : calculation.var11,
        var12   : calculation.var12,
        var13   : calculation.var13,
        var14   : calculation.var14,
        var15   : calculation.var15,
        var16   : calculation.var16,
        var17   : calculation.var17,
        var18   : calculation.var18,
        var19   : calculation.var19,
        var20   : calculation.var20,
        var21   : calculation.var21,
        var22   : calculation.var22,
        var23   : calculation.var23,
        var24   : calculation.var24,
        var25   : calculation.var25,
        var26   : calculation.var26,
        var27   : calculation.var27
    });
  }

}
