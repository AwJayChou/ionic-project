import { Component } from '@angular/core';
import { AlertController,IonicPage, NavController, NavParams } from 'ionic-angular';
import {HttpClient} from "@angular/common/http";
import  {Storage} from "@ionic/storage";

/**
 * Generated class for the UserInfoPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-user-info',
  templateUrl: 'user-info.html',
})
export class UserInfoPage {
  user={
    email:'',
    password:'',
    avatar:"default.png"
  }
  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              private httpClient:HttpClient,
              private  alertCtrl:AlertController,
              private storage:Storage
              ) {
     //this.user=navParams.get('user')
    storage.get('user').then(value=>{
      this.user=value
    })
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad UserInfoPage');
  }
  saveUserInfo():void{
     console.log(this.user);
    let url='/userinfo';
    let alert=this.alertCtrl.create({
      title:'err',
      subTitle:'',
      buttons:["ok"]
    });
    this.httpClient.post(url,{user:this.user})
      .subscribe(
        res=>{
          console.log(res);
          let status=res['status'];
          console.log(status)
          if(status==='usernameAndNickExist'){
            alert.setSubTitle("用户名和昵称被占用")
            alert.present()
          }
          else if(status ==='usernameExist'){
            alert.setSubTitle("用户名被占用")
            alert.present()
          }
            else if(status==='nickExist'){
            alert.setSubTitle("昵称被占用")
              alert.present()
          }
             else{
               this.storage.set("user",this.user)
                this.navCtrl.push("UserPage")
              }
            }
      ,err=>{
              console.log(err)

  })


}}
