import { Component } from '@angular/core';
import {Storage} from "@ionic/storage";


@Component({
  templateUrl: 'tabs.html'
})
export class TabsPage {
  homePage='HomePage';
  findPage='FindPage';
  catPage='CatPage';
  cartPage='CartPage';
  userPage='UserPage';


  constructor(private storage:Storage) {
    //this.storage.clear();
        this.storage.get('user')
          .then(value => {
            if(!value){
              this.userPage='SignInPage'
            }
          })
  }
}
