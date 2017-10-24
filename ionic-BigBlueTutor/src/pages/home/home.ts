import { Component } from '@angular/core';
import { NavController, Events } from 'ionic-angular';
import { ProfilePage } from '../profilepage/profilepage';
import { UserPage } from '../userpage/userpage';
import { Category } from '../category/category';
import { DsService } from '../../shared/ds.service';
import { RecordListenService } from '../../shared/recordlisten.service';
import * as $ from 'jquery';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  private search;
  categories;
  tutors;
  tutorsData;
  searchCategories;
  searchTutors;
  imageLocations;

  constructor(public navCtrl: NavController, public events: Events, private ds: DsService, private rls:RecordListenService) {
    this.imageLocations = {
      "Math" : "./assets/icon/math.png",
      "Language": "./assets/icon/language.png",
      "Social Sciences": "./assets/icon/social.png",
      "Science": "./assets/icon/science.png",
      "Arts": "./assets/icon/art.png",
      "Business": "./assets/icon/business.png"
    }
    var categoryData = ds.dataRecord.get('categories');
    this.categories = [];
    for (var category in categoryData) {
      this.categories.push({category: category, img: this.imageLocations[category]});
    }
  }

  onInput(event) {
    if (this.search == "") {
      this.searchCategories = [];
      this.searchTutors = [];
    }else {
      this.ds.dsInstance.rpc.make('search', {param: this.search}, function(error, data) {
        this.searchTutors = data.data;
      }.bind(this));
      var categoryData = this.ds.dataRecord.get('categories');
      this.searchCategories = [];
      for (var category in categoryData) {
        this.searchCategories.push(category);
      }
      for (var category in categoryData) {
        var subCategories = categoryData[category];
        for (var i =0;i<subCategories.length;i++) {
          this.searchCategories.push(subCategories[i]);
        }
      }
      this.searchCategories = this.searchCategories.filter(function(text) {
        return text.toLowerCase().includes(this.search.toLowerCase());
      }.bind(this));
      this.searchCategories = this.searchCategories.sort(function(a, b){
        if(a.firstname < b.firstname) return -1;
        if(a.firstname > b.firstname) return 1;
        return 0;
      });
    }
    $('.searchresults').css({'display':'block'});
  }

  categorySelected(category) {
    this.navCtrl.push(Category, {category:category});
  }

  userSelected(tutor) {
    if (tutor.username === this.ds.profileRecord.get('username')) {
      this.navCtrl.setRoot(ProfilePage);
    }else {
      this.navCtrl.push(UserPage, {user:tutor});
    }
  }

  searchbar(){
    $('.home-bkg').animate({'height':'20vh','opacity':'0.5'}, 300);
    $('#backgroundcontent, .categorycontainer, .logo').animate({'opacity':'0'},200)
      .queue(function(next){
        $('#backgroundcontent, .categorycontainer, .logo').css({'display':'none'})
      next();
      });
    $('.menubtn').hide();
    $('.search').animate({'top':'7vh'},300)
      .queue(function(next){
        $('.searchcancel').animate({'opacity':'1'});
        $('.searchcancel').css('display','block');
      next();
    });
  }

  cancelsearch(ev){
    var HTMLElement = document.getElementsByClassName("searchbar");
    console.log(HTMLElement);
    //ev.HTMLElement.value = '';
    $('.menubtn').show();
    $('.searchresults').css('display','none');
    $('.home-bkg').animate({'height':'63vh','opacity':'1'}, 300);
    $('#backgroundcontent, .logo').css({'display':'block'})
    $('.categorycontainer').css({'display':'flex'})
    $('#backgroundcontent, .categorycontainer, .logo').animate({'opacity':'1'},400);
    $('.searchcancel').animate({'opacity':'0'},300);
    $('.search').animate({'top':'37vh'},300)
      .queue(function(next){
        $('.searchcancel').css('display','none');
      next();
    });

  }

}
