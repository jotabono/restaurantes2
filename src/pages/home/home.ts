import { Platform } from 'ionic-angular';
import { StatusBar, Splashscreen } from 'ionic-native';
import { Component } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Router, ActivatedRoute, Params } from '@angular/router';
import 'rxjs/add/operator/switchMap';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import { Observable } from 'rxjs/Observable';
import { TabsPage } from '../pages/tabs/tabs';
import { NavController } from 'ionic-angular';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  menus = new Array();
  menus_show: Array<{ name: string, cats: Array<{ name: string, dishes: Array<{ name: string, description: string }> }> }>;
  urlMenus = "http://appr.deideasmarketing.solutions/wp-json/appr/v1/menus-list/";

  constructor(public navCtrl: NavController, platform: Platform, private http: Http) {}

  ionViewDidLoad() {
    this.getMenus().subscribe(
      data => {
        // START
        var count_menus = Object.keys(data).length;
        var array_menus = new Array();
        console.log(data);
        console.log(count_menus);
        for (var i = 1; i < (count_menus)+1; i++) {
          // MENUS
          var name_menu = 'menu_' + i;
          var menu = new Menu(data[name_menu]['name']);
          var count_cats = Object.keys(data[name_menu]).length;
          var menu_name = data[name_menu]['name'];
          array_menus[i] = new Array();

          // var array_cats = new Array();
          //
          array_menus[i].push(data[name_menu]['name']);

          for (var j = 1; j < (count_cats); j++) {
            // CATS
            var name_cat = 'cat_' + j;
            var cat = new Category(data[name_menu][name_cat]['name']);
            array_menus[i][j] = new Array();
            var count_dishes = Object.keys(data[name_menu][name_cat]).length;
            var menu_cat = data[name_menu][name_cat];
            var array_dishes = new Array();
            array_menus[i][j].push(data[name_menu][name_cat]['name']);
            for (var y = 1; y < (count_dishes); y++) {
              // DISHES
              var name_dish = 'dish_' + y;
              var description = data[name_menu][name_cat][name_dish]["Description"];
              var title = data[name_menu][name_cat][name_dish]["Name"];
              var dish = new Dish(description, title);

              array_menus[i][j][y] = new Array();
              array_dishes.push({ title: title, description: description });
              array_menus[i][j][y].push(data[name_menu][name_cat][name_dish]["Name"]);
              // cat.dishes.push(dish);
            }
            // 	array_cats.push({name: data[name_menu][name_cat]['name'], dishes: array_dishes});
            //
            // 	// menu.categories.push(cat);
          }
          // this.menus.push(menu);
          // array_menus.push({name: data[name_menu]['name'], cats: array_cats});
          this.menus.push(array_menus[i]);
        }

        // this.menus = array_menus;
        console.log(this.menus);


      },
      err => { console.log(err) }
    );
  }

  isString(val) {
    if(typeof String(val)) {
      return true;
    } else {
      return false;
    }
  }

  getMenus(): any {
  		return this.http.get(this.urlMenus)
      .map(res => res.json());
  }
}


export class Menu {
  public name: String;
  public categories = new Array();
  constructor(name) {
    this.name = name;
  }
}


export class Category {
  public name: String;
  public dishes = new Array();
  constructor(name) {
    this.name = name;
  }
}

export class Dish {
  public description;
  public title;
  constructor(description, title) {
    this.description = description;
    this.title = title;
  }
}
