import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import {HttpClient} from "@angular/common/http";

/**
 * Generated class for the HomePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-home',
  templateUrl: 'home.html',
})
export class HomePage {
  items=[];
  products;
  page:number=1;
  hasmoredata:boolean=true;
  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              private  httpClient:HttpClient
              ) {

  }

  ionViewDidLoad() {
    let url='/products/1';
    this.httpClient.get(url)
      .subscribe(res=>{
        console.log(res);
        this.products=res;
      },
        err=>{
        console.log(err)
        }
        )
  }


  loadmoredata(InfiniteScroll) {
       let url=`/products/${++this.page}`;
       this.httpClient.get(url)
         .subscribe(
           res=>{
             console.log(res);
             let length=res['length'];
             if(length<20 || length===0){
               this.hasmoredata=false
             }else{
               this.products=this.products.concat(res)
             }

           },
           err=>{}
         );
    InfiniteScroll.complete()
  }
}
