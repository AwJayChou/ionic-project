import { Component } from '@angular/core';
import { IonicPage, NavController,
  NavParams,ToastController,AlertController
} from 'ionic-angular';
import {HttpClient} from "@angular/common/http";
import {Storage} from "@ionic/storage";

/**
 * Generated class for the SignUpPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-sign-up',
  templateUrl: 'sign-up.html',
})
export class SignUpPage {
   user={
     email:'',
     password:'',
     avatar:'default.png'
   };
  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              private toast:ToastController,
              private alert:AlertController,
              private httpClient:HttpClient,
              private storage:Storage
              ) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad SignUpPage');
  }
   sign(){
    console.log(this.user)
      let url='/sign';
      this.httpClient.post(url,{user:this.user})
        .subscribe(res=>{
          let status=res['status'];
          console.log(status)
          if(status==='exist'){
            this.alert.create({
              title:'error',
              subTitle:'email is used',
              buttons:['ok']
            }).present()
          }
          if(status=='ok'){
            this.toast.create({
              message:'注册成功',
              duration:1000,
              position:'top'
            }).present();
            this.storage.set('user',this.user)
            this.navCtrl.push('UserPage')
          }
        },
          err=>{
               console.log(err)
          }
        )
   }
}
