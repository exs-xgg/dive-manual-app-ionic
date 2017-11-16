import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

@Component({
  selector: 'page-list',
  templateUrl: 'savedItems.html'
})
export class SavedItemsPage {
  selectedItem: any;
  icons: string[];
  titles: string[];
  items: Array<{title: string, icon: string}>;

  constructor(public navCtrl: NavController, public navParams: NavParams) {
    // If we navigated to this page, we will have an item available as a nav param
    this.selectedItem = navParams.get('item');

    // Let's populate this page with some filler content for funzies
    this.icons = ['bookmark'];

    this.titles = ['text1 saved', 'saved calculation 1', 'second saved text', 'third text', 'second calc'];

    this.items = [];
    for (let i = 0; i < this.titles.length; i++) {
      this.items.push({
        title: this.titles[i],
        icon: this.icons[0]
      });
    }
  }

  itemTapped(event, item) {
    // That's right, we're pushing to ourselves!
    this.navCtrl.push(SavedItemsPage, {
      item: item
    });
  }
}
