import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams,ToastController,AlertController } from 'ionic-angular';
import {HttpClient} from "@angular/common/http";
import {Storage} from "@ionic/storage";

/**
 * Generated class for the SignInPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-sign-in',
  templateUrl: 'sign-in.html',
})
export class SignInPage {
  user={
    email:'dingding@qq.com',
    password:'123',
    avatar:'default.png'
  }
  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              private httpClient:HttpClient,
              private alert:AlertController,
              private toast:ToastController,
              private storage:Storage
              ) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad SignInPage');
  }
  toSignUpPage():void{
    this.navCtrl.push("SignUpPage")
  }
  jump(){
    //this.navCtrl.push('UserPage')
    console.log(this.user)
    //let user=this.user;
    let url="/signin";
    this.httpClient.post(url,{user:this.user})
      .subscribe(res=>{
        console.log(res['user'])
         let status=res['status'];
         console.log(status)
         if(status==='ok'){
           this.toast.create({
             message:'登录成功',
             duration:1000,
             position:'top'
           }).present();
           this.storage.set("user",res['user']);
           this.navCtrl.push('UserPage')
         }
         if(status=="err"){
           this.alert.create({
             title:'error',
             subTitle:'Invaild email or password',
             buttons:['ok']
           }).present()
         }


      },
        err=>{
          console.log(err)
        }
      )
  }

}
