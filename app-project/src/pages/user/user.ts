import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import {Storage} from "@ionic/storage";

/**
 * Generated class for the UserPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-user',
  templateUrl: 'user.html',
})
export class UserPage {
    user={
      email:'',
      password:'',
      avatar:''
    };
  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              private storage:Storage
              ) {
  }

  ionViewDidLoad() {//视图加载完成
    console.log('ionViewDidLoad UserPage');
    this.init();
  }


  init() {
    this.storage.get('user')
      .then(value => {
        if (value) {
          console.log(value)
          this.user = value;

        }
      })
  }
  signOut(){
    this.storage.clear();
    this.navCtrl.push('SignInPage')
  }

  toUserInfoPage() {
    this.navCtrl.push('UserInfoPage')
  }
}
