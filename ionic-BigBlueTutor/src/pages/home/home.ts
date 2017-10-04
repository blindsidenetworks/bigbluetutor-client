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
    this.imageLocations = [
      "./assets/icon/math.png",
      "./assets/icon/language.png",
      "./assets/icon/social.png",
      "./assets/icon/science.png",
      "./assets/icon/art.png",
      "./assets/icon/business.png"
    ]
    var categoryData = ds.dataRecord.get('categories');
    this.categories = [];
    this.tutorsData = {};
    this.tutors = {};
    for (var category in categoryData) {
      this.categories.push(category);
      ds.dsInstance.rpc.make('search/tutor', {subject:category}, function(error, data) {
        if (error) throw error
        this.tutorsData[data.subject] = data.data;
        this.tutors[data.subject] = data.data;
      }.bind(this));
      ds.dsInstance.event.subscribe('tutor/'+category, function(data) {
        this.tutorsData[data.subject] = data.data;
        this.tutors[data.subject] = data.data;
      }.bind(this));
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
        return text.includes(this.search);
      }.bind(this));
      this.searchCategories = this.searchCategories.sort(function(a, b){
        if(a.firstname < b.firstname) return -1;
        if(a.firstname > b.firstname) return 1;
        return 0;
      });
    }
    /*
    var categoryData = this.ds.dataRecord.get('categories');
    this.categories = [];
    for (var category in categoryData) {
      var subCategories = categoryData[category];
      for (var i =0;i<subCategories.length;i++) {
        this.categories.push(subCategories[i]);
      }
    }
    this.categories = this.categories.filter(function(text) {
      return text.includes(this.search);
    }.bind(this));*/

//    this.tutors = tutorsData.filter(function(text) {
//      return text.includes(this.search);
//    }.bind(this));
  }

  categorySelected(category) {
    this.navCtrl.setRoot(Category, {category:category});
  }

  userSelected(tutor) {
    if (tutor.username === this.ds.profileRecord.get('username')) {
      this.navCtrl.setRoot(ProfilePage);
    }else {
      this.navCtrl.setRoot(UserPage, {user:tutor});
    }
  }

  searchbar(){
    $('#backgroundcontent, .categorycontainer').animate({'opacity':'0'},200)
      .queue(function(next){
        $('#backgroundcontent, .categorycontainer').css({'display':'none'})
      next();
      });
    $('.search').animate({'top':'7vh'},300);
  }

}
