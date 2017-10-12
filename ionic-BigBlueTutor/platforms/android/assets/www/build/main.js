webpackJsonp([0],{

/***/ 113:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return UserPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(7);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__shared_ds_service__ = __webpack_require__(13);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__inbox_inbox__ = __webpack_require__(60);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__message_message__ = __webpack_require__(61);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__request_request__ = __webpack_require__(211);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};








var UserPage = (function () {
    function UserPage(modalCtrl, navCtrl, navParams, ds, pc) {
        this.modalCtrl = modalCtrl;
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.ds = ds;
        this.pc = pc;
        this.user = navParams.get('user');
        this.username = this.user.username;
        this.categories = this.user.categories;
    }
    UserPage.prototype.star = function () {
        var stars = this.ds.profileRecord.get('stars');
        if (stars.indexOf(this.username) == -1) {
            stars.push(this.username);
            this.ds.profileRecord.set('stars', stars);
        }
    };
    UserPage.prototype.message = function () {
        this.navCtrl.setRoot(__WEBPACK_IMPORTED_MODULE_3__inbox_inbox__["a" /* Inbox */]);
        this.navCtrl.push(__WEBPACK_IMPORTED_MODULE_4__message_message__["a" /* Message */], { username: this.user.username });
    };
    UserPage.prototype.request = function (myEvent) {
        var contactModal = this.modalCtrl.create(__WEBPACK_IMPORTED_MODULE_5__request_request__["a" /* RequestPopover */], { user: this.user, username: this.user.username, userpage: this });
        contactModal.present({
            ev: myEvent
        });
    };
    return UserPage;
}());
UserPage = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["n" /* Component */])({
        selector: 'page-user',template:/*ion-inline-start:"/home/cody/Desktop/bigbluetutor-client/ionic-BigBlueTutor/src/pages/userpage/userpage.html"*/'<ion-header>\n  <ion-navbar>\n    <button ion-button menuToggle>\n      <ion-icon name=\'menu\'></ion-icon>\n    </button>\n    <ion-title>\n      {{username}}\n    </ion-title>\n  </ion-navbar>\n</ion-header>\n\n<ion-content padding>\n  <div id="userInfo">\n    <div id="imageContainer">\n      <img class="profilepic" src="images/icon.png"/>\n          <button (click)="star()" class="icononlybtn favouritebtn"><ion-icon name="star" class="favourite"></ion-icon></button>\n    </div>\n    <div id="name" class="profilename">{{username}}</div>\n    <button (click)="request($event)" class="bluebutton" ion-button round>Request Session</button>\n    <button (click)="message()" ion-button round class="bluebutton"><img class="buttonicon" src="./assets/icon/messageicon.png"/></button>\n  </div>\n  <ion-list>\n    <ion-item *ngFor="let category of categories">\n      {{ category }}\n    </ion-item>\n  </ion-list>\n</ion-content>\n'/*ion-inline-end:"/home/cody/Desktop/bigbluetutor-client/ionic-BigBlueTutor/src/pages/userpage/userpage.html"*/,
    }),
    __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["g" /* ModalController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["i" /* NavController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["j" /* NavParams */], __WEBPACK_IMPORTED_MODULE_2__shared_ds_service__["a" /* DsService */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["l" /* PopoverController */]])
], UserPage);

//# sourceMappingURL=userpage.js.map

/***/ }),

/***/ 114:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return LoginPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(7);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__home_home__ = __webpack_require__(45);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__createusername_createusername__ = __webpack_require__(215);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__onboarding_roleChoice_roleChoice__ = __webpack_require__(115);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__shared_ds_service__ = __webpack_require__(13);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__ionic_native_google_plus__ = __webpack_require__(212);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};







var LoginPage = (function () {
    function LoginPage(navCtrl, menuCtrl, ds, googlePlus) {
        this.navCtrl = navCtrl;
        this.menuCtrl = menuCtrl;
        this.ds = ds;
        this.googlePlus = googlePlus;
    }
    LoginPage.prototype.login = function () {
        this.ds.login({ username: this.username, password: this.password }, this.handleLogin.bind(this));
    };
    LoginPage.prototype.handleLogin = function (success, data) {
        if (success) {
            this.ds.dsInstance.record.has("profile/" + this.username, this.linkProfile.bind(this));
        }
        else {
            console.log(success);
        }
    };
    LoginPage.prototype.linkProfile = function (error, hasRecord) {
        var _this = this;
        var record = this.ds.getRecord("profile/" + this.username);
        if (!hasRecord) {
            record.set({
                username: this.username,
                password: '',
                stars: [],
                pendingMeetings: [],
                requestMeetings: [],
                messages: {},
                profilePic: "http://www.freeiconspng.com/uploads/msn-people-person-profile-user-icon--icon-search-engine-16.png",
                meeting: ""
            });
            this.ds.profileRecord = record;
            this.ds.dataRecord = this.ds.getRecord("data");
            this.ds.dataRecord.whenReady(function () {
                _this.goToOnboarding();
            });
        }
        else {
            this.ds.profileRecord = record;
            this.ds.dataRecord = this.ds.getRecord("data");
            this.ds.dataRecord.whenReady(function () {
                _this.goToHome();
            });
        }
    };
    LoginPage.prototype.googleLogin = function () {
        var _this = this;
        this.googlePlus.login({ webClientId: "591220975174-hqfbvf7iuegj6nf1h6jkldeuh3ia72v7.apps.googleusercontent.com", offline: true }).then(function (res) {
            _this.idToken = res.idToken;
            _this.ds.login({ idToken: _this.idToken }, _this.handleGoogleLogin.bind(_this));
        }).catch(function (error) {
            console.log("Login error:", error);
        });
    };
    LoginPage.prototype.handleGoogleLogin = function (success, data) {
        console.log("Google login success:", success);
        console.log(data);
        if (success && data && data.username) {
            this.username = data.username;
            this.ds.dsInstance.record.has("profile/" + this.username, this.linkGoogleProfile.bind(this));
        }
        else if (data && data.needsUsername) {
            this.goToCreateUsername();
        }
    };
    LoginPage.prototype.linkGoogleProfile = function (error, hasRecord) {
        var _this = this;
        if (!hasRecord) {
            this.goToCreateUsername();
        }
        else {
            this.ds.getRecord("profile/" + this.username).whenReady(function (profileRecord) {
                _this.ds.profileRecord = profileRecord;
                console.log(profileRecord);
                _this.ds.getRecord("data").whenReady(function (dataRecord) {
                    _this.ds.dataRecord = dataRecord;
                    // if(profileRecord.get("onboardingComplete"))
                    _this.goToHome();
                    // else
                    // this.goToOnboarding();
                });
            });
        }
    };
    LoginPage.prototype.googleLogout = function () {
        //this.ds.dsInstance.close();
        this.googlePlus.logout().then(function () {
            console.log("Logged out of Google Account");
        });
    };
    LoginPage.prototype.goToCreateUsername = function () {
        this.navCtrl.setRoot(__WEBPACK_IMPORTED_MODULE_3__createusername_createusername__["a" /* CreateUsernamePage */], { idToken: this.idToken });
    };
    LoginPage.prototype.goToOnboarding = function () {
        this.navCtrl.setRoot(__WEBPACK_IMPORTED_MODULE_4__onboarding_roleChoice_roleChoice__["a" /* RoleChoice */]);
    };
    LoginPage.prototype.goToHome = function () {
        this.navCtrl.setRoot(__WEBPACK_IMPORTED_MODULE_2__home_home__["a" /* HomePage */]);
    };
    LoginPage.prototype.ionViewWillEnter = function () {
        this.menuCtrl.swipeEnable(false);
    };
    return LoginPage;
}());
LoginPage = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["n" /* Component */])({
        selector: 'page-login',template:/*ion-inline-start:"/home/cody/Desktop/bigbluetutor-client/ionic-BigBlueTutor/src/pages/login/login.html"*/'<ion-content view-title="Login" name="login-view">\n  <div class=background>\n      <img class="circles" src="./assets/icon/circles.png"/>\n  </div>\n\n  <ion-content padding>\n    <div class="logincontent">\n      <div class="logo">\n        <ion-img class="logoimg" src="./assets/icon/logo.png"></ion-img>\n      </div>\n      <h1 class="welcome">Welcome to <br/> BigBlueTutor</h1>\n\n      <div class="loginenter">\n        <div class="loginlist">\n          <div class="list list-inset">\n            <ion-list>\n            <ion-item class="item item-input">\n              <ion-input type="text" placeholder="Username" [(ngModel)]="username"></ion-input>\n            </ion-item>\n            <ion-item class="item item-input">\n              <ion-input type="password" placeholder="Password" [(ngModel)]="password"></ion-input>\n            </ion-item>\n            </ion-list>\n          </div>\n        </div>\n      </div>\n\n      <div class="login">\n        <button ion-button round class="button button-block whitebutton loginbtn" (tap)="login()">LOGIN</button>\n        <button ion-button round class="button button-block whitebutton loginbtn" (tap)="googleLogin()">Login with Google Account</button>\n      </div>\n    </div>\n  </ion-content>\n\n</ion-content>\n'/*ion-inline-end:"/home/cody/Desktop/bigbluetutor-client/ionic-BigBlueTutor/src/pages/login/login.html"*/
    }),
    __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["i" /* NavController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["f" /* MenuController */], __WEBPACK_IMPORTED_MODULE_5__shared_ds_service__["a" /* DsService */], __WEBPACK_IMPORTED_MODULE_6__ionic_native_google_plus__["a" /* GooglePlus */]])
], LoginPage);

//# sourceMappingURL=login.js.map

/***/ }),

/***/ 115:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return RoleChoice; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(7);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__tutorRegister_tutorRegister__ = __webpack_require__(216);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__shared_ds_service__ = __webpack_require__(13);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__onboarding_onboarding__ = __webpack_require__(116);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};





var RoleChoice = (function () {
    function RoleChoice(navCtrl, navParams, menuCtrl, ds) {
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.menuCtrl = menuCtrl;
        this.ds = ds;
    }
    RoleChoice.prototype.student = function () {
        this.navCtrl.setRoot(__WEBPACK_IMPORTED_MODULE_4__onboarding_onboarding__["a" /* OnboardingPage */]);
    };
    RoleChoice.prototype.tutor = function () {
        this.navCtrl.push(__WEBPACK_IMPORTED_MODULE_2__tutorRegister_tutorRegister__["a" /* TutorRegister */]);
    };
    RoleChoice.prototype.ionViewWillEnter = function () {
        this.menuCtrl.swipeEnable(false);
    };
    //Enable swipe again
    RoleChoice.prototype.ionViewDidLeave = function () {
        this.menuCtrl.swipeEnable(true);
    };
    return RoleChoice;
}());
RoleChoice = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["n" /* Component */])({
        selector: 'page-roleChoice',template:/*ion-inline-start:"/home/cody/Desktop/bigbluetutor-client/ionic-BigBlueTutor/src/pages/onboarding/roleChoice/roleChoice.html"*/'<ion-content padding>\n  <h1 class="OBtitle">I AM A</h1>\n\n  <div class="selection">\n    <div class="vertical_side" id="left">\n      <ion-img class="img" id="studentimg" src="./assets/OBimgs/student.png"></ion-img>\n      <button (click)="student()" ion-button round class="whitebtn nextbtn">STUDENT</button>\n    </div>\n    <div class="vertical_side" id="right">\n      <ion-img class="img" id="tutorimg" src="./assets/OBimgs/tutor.png"></ion-img>\n      <button (click)="tutor()" ion-button round class="whitebtn nextbtn">TUTOR</button>\n    </div>\n  </div>\n\n  <!--button ion-button class="choicenext fulldiv"> NEXT </button-->\n</ion-content>\n'/*ion-inline-end:"/home/cody/Desktop/bigbluetutor-client/ionic-BigBlueTutor/src/pages/onboarding/roleChoice/roleChoice.html"*/,
    }),
    __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["i" /* NavController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["j" /* NavParams */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["f" /* MenuController */], __WEBPACK_IMPORTED_MODULE_3__shared_ds_service__["a" /* DsService */]])
], RoleChoice);

//# sourceMappingURL=roleChoice.js.map

/***/ }),

/***/ 116:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return OnboardingPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(7);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__home_home__ = __webpack_require__(45);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__shared_ds_service__ = __webpack_require__(13);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_jquery__ = __webpack_require__(214);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_jquery___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_4_jquery__);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};





var OnboardingPage = (function () {
    function OnboardingPage(navCtrl, navParams, menuCtrl, ds) {
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.menuCtrl = menuCtrl;
        this.ds = ds;
    }
    OnboardingPage.prototype.register = function () {
        console.log('hi');
        this.ds.dsInstance.rpc.make('changeDescription', { description: this.bio }, function () { });
        //do additional calls first
        this.navCtrl.setRoot(__WEBPACK_IMPORTED_MODULE_2__home_home__["a" /* HomePage */]);
    };
    OnboardingPage.prototype.ionViewWillEnter = function () {
        this.menuCtrl.swipeEnable(false);
    };
    //Enable swipe again
    OnboardingPage.prototype.ionViewDidLeave = function () {
        this.menuCtrl.swipeEnable(true);
    };
    OnboardingPage.prototype.bioInput = function () {
        __WEBPACK_IMPORTED_MODULE_4_jquery__('.bioInput').css('border-color', '#5576FF');
    };
    return OnboardingPage;
}());
OnboardingPage = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["n" /* Component */])({
        selector: 'page-onboarding',template:/*ion-inline-start:"/home/cody/Desktop/bigbluetutor-client/ionic-BigBlueTutor/src/pages/onboarding/onboarding/onboarding.html"*/'<ion-content padding class="onboarding">\n  <div class="OBpage">\n    <ion-slides pager>\n      <ion-slide>\n        <div class="OBcontainer">\n          <h2 class="OBTitle">Tell us a little about yourself</h2>\n          <div class="bioInput" [(ngModel)]="bio">\n            <ion-input (click)="bioInput()" placeholder="Tap to Start Typing"></ion-input>\n          </div>\n        </div>\n      </ion-slide>\n\n      <!--NEEDS A SWITCH STATEMENT NOT SURE IF IT\'LL MESS UP THE SLIDER COUNT THO-->\n      <!--STUDENTS ONLY-->\n      <ion-slide>\n        <div class="OBcontainer">\n          <h2 class="OBTitle">What is your current grade level</h2>\n          <div class="gradeLevel">\n            <div class="gradecol">\n              <button class="gradebutton">\n                <img class="gradeimg" src="./assets/OBimgs/K-8.png"/>\n                <p class="gradetext">K-8</p>\n              </button>\n              <button class="gradebutton">\n                <img class="gradeimg" src="./assets/OBimgs/Highschool.png"/>\n                <p class="gradetext">Highschool</p>\n              </button>\n              <button class="gradebutton">\n                <img class="gradeimg" src="./assets/OBimgs/Uni.png"/>\n                <p class="gradetext">University</p>\n              </button>\n            </div>\n          </div>\n        </div>\n        <div class="OBbuttondiv" (click)="register()" >\n          <button ion-button round class="nextbtn bluebutton registerbtn">REGISTER</button>\n        </div>\n      </ion-slide>\n\n    </ion-slides>\n  </div>\n</ion-content>\n'/*ion-inline-end:"/home/cody/Desktop/bigbluetutor-client/ionic-BigBlueTutor/src/pages/onboarding/onboarding/onboarding.html"*/,
    }),
    __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["i" /* NavController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["j" /* NavParams */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["f" /* MenuController */], __WEBPACK_IMPORTED_MODULE_3__shared_ds_service__["a" /* DsService */]])
], OnboardingPage);

//# sourceMappingURL=onboarding.js.map

/***/ }),

/***/ 124:
/***/ (function(module, exports) {

function webpackEmptyAsyncContext(req) {
	// Here Promise.resolve().then() is used instead of new Promise() to prevent
	// uncatched exception popping up in devtools
	return Promise.resolve().then(function() {
		throw new Error("Cannot find module '" + req + "'.");
	});
}
webpackEmptyAsyncContext.keys = function() { return []; };
webpackEmptyAsyncContext.resolve = webpackEmptyAsyncContext;
module.exports = webpackEmptyAsyncContext;
webpackEmptyAsyncContext.id = 124;

/***/ }),

/***/ 13:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return DsService; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_deepstream_io_client_js__ = __webpack_require__(285);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_deepstream_io_client_js___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_deepstream_io_client_js__);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};


var DsService = (function () {
    function DsService() {
    }
    DsService.prototype.login = function (credentials, loginHandler) {
        //this code is moved here to prevent the login timeouts
        //this.ds = this.dsInstance = deepstream('tutor-back.blindside-dev.com:6020')
        if (this.ds)
            this.ds.close();
        this.ds = this.dsInstance = __WEBPACK_IMPORTED_MODULE_1_deepstream_io_client_js__('10.130.218.198:6020')
            .on('error', function (error) { return console.log(error); });
        this.ds.login(credentials, loginHandler);
    };
    DsService.prototype.getRecord = function (name) {
        return this.ds.record.getRecord(name);
    };
    DsService.prototype.getList = function (name) {
        return this.ds.record.getList(name);
    };
    return DsService;
}());
DsService = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["B" /* Injectable */])(),
    __metadata("design:paramtypes", [])
], DsService);

//# sourceMappingURL=ds.service.js.map

/***/ }),

/***/ 165:
/***/ (function(module, exports) {

function webpackEmptyAsyncContext(req) {
	// Here Promise.resolve().then() is used instead of new Promise() to prevent
	// uncatched exception popping up in devtools
	return Promise.resolve().then(function() {
		throw new Error("Cannot find module '" + req + "'.");
	});
}
webpackEmptyAsyncContext.keys = function() { return []; };
webpackEmptyAsyncContext.resolve = webpackEmptyAsyncContext;
module.exports = webpackEmptyAsyncContext;
webpackEmptyAsyncContext.id = 165;

/***/ }),

/***/ 211:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return RequestPopover; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(7);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__shared_ds_service__ = __webpack_require__(13);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__inbox_inbox__ = __webpack_require__(60);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__message_message__ = __webpack_require__(61);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};






var RequestPopover = (function () {
    function RequestPopover(navCtrl, viewCtrl, ds, navParams) {
        this.navCtrl = navCtrl;
        this.viewCtrl = viewCtrl;
        this.ds = ds;
        this.navParams = navParams;
        this.categoriesSelected = {};
        this.user = navParams.data.user;
        this.username = navParams.data.username;
        this.categories = navParams.data.user.categories;
        this.userpage = navParams.data.userpage;
        this.times = [30, 60, 90, 120];
    }
    RequestPopover.prototype.request = function () {
        var categories = this.categoriesSelected;
        var selected = [];
        for (var category in categories) {
            if (categories[category]) {
                selected.push(categories[category]);
            }
        }
        if (selected.length > 0 && this.time) {
            this.ds.dsInstance.rpc.make('requestMeeting', { client: this.ds.profileRecord.get('username'), contact: this.user.username, data: { categories: selected } }, function () { });
            this.viewCtrl.dismiss();
            this.userpage.navCtrl.setRoot(__WEBPACK_IMPORTED_MODULE_3__inbox_inbox__["a" /* Inbox */]);
            this.userpage.navCtrl.push(__WEBPACK_IMPORTED_MODULE_4__message_message__["a" /* Message */], { username: this.user.username });
        }
    };
    RequestPopover.prototype.closeModal = function () {
        this.viewCtrl.dismiss();
    };
    return RequestPopover;
}());
RequestPopover = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["n" /* Component */])({
        selector: 'page-request',template:/*ion-inline-start:"/home/cody/Desktop/bigbluetutor-client/ionic-BigBlueTutor/src/pages/request/request.html"*/'<ion-header>\n</ion-header>\n\n\n  <ion-content>\n    <div class="requestmodal">\n      <ion-list-header class="requestheader">\n        <p class="headertext">Request Session with:</p>\n        <h1 class="requesttitle"> {{username}} </h1>\n        <ion-icon name="ios-close-circle-outline" class="closebtn" (click)=closeModal()></ion-icon>\n      </ion-list-header>\n      <ion-list>\n        <ion-list-header><h1 class="requesttitle" item-left>I need help in: </h1></ion-list-header>\n        <ion-item *ngFor="let category of categories">\n          <ion-label>{{ category }}</ion-label>\n          <ion-checkbox [(ngModel)]="categoriesSelected[category]"></ion-checkbox>\n        </ion-item>\n      </ion-list>\n      <ion-list radio-group [(ngModel)]="time">\n        <ion-list-header><h1 class="requesttitle" item-left> Duration: </h1></ion-list-header>\n        <ion-item *ngFor="let time of times">\n          <ion-label>{{ time }}</ion-label>\n          <ion-radio [value]="time">\n          </ion-radio>\n        </ion-item>\n      </ion-list>\n      <button (click)="request()"round ion-button class="requestbtn bluebutton">\n        Request Meeting\n      </button>\n    </div>\n  </ion-content>\n'/*ion-inline-end:"/home/cody/Desktop/bigbluetutor-client/ionic-BigBlueTutor/src/pages/request/request.html"*/,
    }),
    __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["i" /* NavController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["m" /* ViewController */], __WEBPACK_IMPORTED_MODULE_2__shared_ds_service__["a" /* DsService */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["j" /* NavParams */]])
], RequestPopover);

//# sourceMappingURL=request.js.map

/***/ }),

/***/ 213:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return Category; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(7);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__profilepage_profilepage__ = __webpack_require__(62);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__userpage_userpage__ = __webpack_require__(113);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__shared_ds_service__ = __webpack_require__(13);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};






var Category = (function () {
    function Category(navCtrl, navParams, platform, events, ds) {
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.platform = platform;
        this.events = events;
        this.ds = ds;
        this.category = navParams.get('category');
        var type = "category";
        if (Object.keys(this.ds.dataRecord.get('categories')).indexOf(this.category) != -1) {
            type = "subject";
        }
        ds.dsInstance.rpc.make(type + '/tutor', { subject: this.category }, function (error, data) {
            if (error)
                throw error;
            this.tutors = data.data;
        }.bind(this));
        ds.dsInstance.event.subscribe(type + '/tutor/' + this.category, function (data) {
            this.tutors = data.data;
        }.bind(this));
    }
    Category.prototype.userSelected = function (tutor) {
        console.log(tutor);
        if (tutor === this.ds.profileRecord.get('username')) {
            this.navCtrl.setRoot(__WEBPACK_IMPORTED_MODULE_2__profilepage_profilepage__["a" /* ProfilePage */]);
        }
        else {
            this.navCtrl.push(__WEBPACK_IMPORTED_MODULE_3__userpage_userpage__["a" /* UserPage */], { user: tutor });
        }
    };
    return Category;
}());
Category = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["n" /* Component */])({
        selector: 'page-category',template:/*ion-inline-start:"/home/cody/Desktop/bigbluetutor-client/ionic-BigBlueTutor/src/pages/category/category.html"*/'<ion-header>\n  <ion-navbar>\n    <button ion-button menuToggle>\n      <ion-icon name="menu"></ion-icon>\n    </button>\n    <ion-title>\n      {{ category }}\n    </ion-title>\n  </ion-navbar>\n</ion-header>\n\n<ion-content>\n  <ion-list class="tutorresults">\n    <h1 class="resulttext categorytutors"> TUTORS</h1>\n    <div  *ngFor="let tutor of tutors" class="profileitem" (click)="userSelected(tutor)">\n      <div class="profilecard">\n        <img src="./assets/icon/default-profile.png" class="home_profilepic"/>\n        <h1 class="card_name">{{ tutor.username }}</h1>\n          <div class="cardline"></div>\n        <p class="card_info">{{ tutor.position }}</p>\n      </div>\n    </div>\n  </ion-list>\n</ion-content>\n'/*ion-inline-end:"/home/cody/Desktop/bigbluetutor-client/ionic-BigBlueTutor/src/pages/category/category.html"*/
    }),
    __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["i" /* NavController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["j" /* NavParams */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["k" /* Platform */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["b" /* Events */], __WEBPACK_IMPORTED_MODULE_4__shared_ds_service__["a" /* DsService */]])
], Category);

//# sourceMappingURL=category.js.map

/***/ }),

/***/ 215:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return CreateUsernamePage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(7);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__shared_ds_service__ = __webpack_require__(13);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__onboarding_roleChoice_roleChoice__ = __webpack_require__(115);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__home_home__ = __webpack_require__(45);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__login_login__ = __webpack_require__(114);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};







var CreateUsernamePage = (function () {
    function CreateUsernamePage(navCtrl, navParams, platform, events, ds) {
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.platform = platform;
        this.events = events;
        this.ds = ds;
        this.idToken = navParams.get("idToken");
        this.username = "";
    }
    CreateUsernamePage.prototype.createUsername = function () {
        var _this = this;
        this.ds.login({ idToken: this.idToken, username: this.username }, function (success, data) {
            if (!success && data && data.googleError) {
                //Verifying the idToken failed, so go back to the home page
                _this.goToLogin();
            }
            else if (data && data.error && !data.username) {
                //Creating the user failed with an error messase, so display the message
                var errorText = document.getElementById("error");
                errorText.innerHTML = data.error;
                errorText.style.visibility = "visible";
            }
            else if (data && !data.error && data.username) {
                //Creating the user succeeded
                _this.ds.dsInstance.record.has("profile/" + data.username, function (error, hasRecord) {
                    if (error) {
                        console.log(error);
                        return;
                    }
                    if (hasRecord) {
                        _this.ds.getRecord("profile/" + data.username).whenReady(function (profileRecord) {
                            _this.ds.profileRecord = profileRecord;
                            _this.ds.getRecord("data").whenReady(function (dataRecord) {
                                _this.ds.dataRecord = dataRecord;
                                // if(profileRecord.get("onboardingComplete"))
                                _this.goToOnboarding();
                                // else
                                // this.goToOnboarding();
                            });
                        });
                    }
                });
            } //In all other cases, do nothing
        });
    };
    CreateUsernamePage.prototype.goToOnboarding = function () {
        this.navCtrl.setRoot(__WEBPACK_IMPORTED_MODULE_3__onboarding_roleChoice_roleChoice__["a" /* RoleChoice */]);
    };
    CreateUsernamePage.prototype.goToHome = function () {
        this.navCtrl.setRoot(__WEBPACK_IMPORTED_MODULE_4__home_home__["a" /* HomePage */]);
    };
    CreateUsernamePage.prototype.goToLogin = function () {
        this.navCtrl.setRoot(__WEBPACK_IMPORTED_MODULE_5__login_login__["a" /* LoginPage */]);
    };
    CreateUsernamePage.prototype.hideError = function () {
        var errorText = document.getElementById("error");
        errorText.style.visibility = "hidden";
    };
    return CreateUsernamePage;
}());
CreateUsernamePage = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["n" /* Component */])({
        selector: 'page-createusername',template:/*ion-inline-start:"/home/cody/Desktop/bigbluetutor-client/ionic-BigBlueTutor/src/pages/createusername/createusername.html"*/'<ion-content>\n  <ion-input placeholder="Enter your username here" [(ngModel)]="username" (input)="hideError()"></ion-input>\n  <button ion-button (tap)="createUsername()">Set Username</button>\n  <p id="error" style="color:red;visibility:hidden"></p>\n</ion-content>\n'/*ion-inline-end:"/home/cody/Desktop/bigbluetutor-client/ionic-BigBlueTutor/src/pages/createusername/createusername.html"*/
    }),
    __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["i" /* NavController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["j" /* NavParams */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["k" /* Platform */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["b" /* Events */], __WEBPACK_IMPORTED_MODULE_2__shared_ds_service__["a" /* DsService */]])
], CreateUsernamePage);

//# sourceMappingURL=createusername.js.map

/***/ }),

/***/ 216:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return TutorRegister; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(7);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__shared_ds_service__ = __webpack_require__(13);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__onboarding_onboarding__ = __webpack_require__(116);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};




var TutorRegister = (function () {
    function TutorRegister(navCtrl, navParams, ds) {
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.ds = ds;
        this.categoriesData = ds.dataRecord.get('categories');
        this.categories = Object.keys(this.categoriesData);
        this.categoriesSelected = {};
        this.openCategory = "";
    }
    TutorRegister.prototype.isOpen = function (category) {
        if (this.openCategory === category) {
            return true;
        }
        return false;
    };
    TutorRegister.prototype.toggleCategories = function (category) {
        if (category === this.openCategory) {
            this.openCategory = "";
        }
        else {
            this.openCategory = category;
        }
    };
    TutorRegister.prototype.tutor = function () {
        var selected = [];
        for (var category in this.categoriesSelected) {
            if (this.categoriesSelected[category]) {
                selected.push(category);
            }
        }
        this.ds.dsInstance.rpc.make('registerTutor', { username: this.ds.profileRecord.get("username"), categories: selected }, function () { });
        this.navCtrl.setRoot(__WEBPACK_IMPORTED_MODULE_3__onboarding_onboarding__["a" /* OnboardingPage */]);
    };
    return TutorRegister;
}());
TutorRegister = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["n" /* Component */])({
        selector: 'page-tutorRegister',template:/*ion-inline-start:"/home/cody/Desktop/bigbluetutor-client/ionic-BigBlueTutor/src/pages/onboarding/tutorRegister/tutorRegister.html"*/'<ion-header>\n  <ion-navbar class="onboardingnav">\n    <button ion-button menuToggle>\n      <ion-icon name="menu"></ion-icon>\n    </button>\n    <ion-title class="center headertitle">\n      WHAT COURSES DO YOU TUTOR?\n    </ion-title>\n  </ion-navbar>\n</ion-header>\n\n<ion-content padding>\n  <ion-slides>\n    <ion-slide>\n      <div class="space"></div>\n      <div class="allcategories">\n      <ion-list>\n        <div *ngFor="let category of categories">\n\n          <div class="categorycontainer">\n\n            <ion-item class="categoryitem"\n              (click)="toggleCategories(category)">\n              {{ category }}\n              <ion-icon ios="ios-add" class="moreoptions" md="md-add"></ion-icon>\n            </ion-item>\n\n            <div *ngIf="isOpen(category)">\n              <ion-item class="subcategoryitem"\n                *ngFor="let subcategory of categoriesData[category]">\n                <ion-label>\n                  {{ subcategory }}\n                </ion-label>\n                <ion-checkbox [(ngModel)]="categoriesSelected[subcategory]">\n                </ion-checkbox>\n              </ion-item>\n            </div>\n\n          </div>\n\n        </div>\n      </ion-list>\n    </div>\n  </ion-slide>\n  <ion-slide>\n    <div class="OBcontainer">\n      <h2 class="OBTitle">What grade level would you like to tutor?</h2>\n      <div class="gradeLevel">\n        <div class="gradecol">\n          <button class="gradebutton">\n            <img class="gradeimg" src="./assets/OBimgs/K-8.png"/>\n            <p class="gradetext">K-8</p>\n          </button>\n          <button class="gradebutton">\n            <img class="gradeimg" src="./assets/OBimgs/Highschool.png"/>\n            <p class="gradetext">Highschool</p>\n          </button>\n          <button class="gradebutton">\n            <img class="gradeimg" src="./assets/OBimgs/Uni.png"/>\n            <p class="gradetext">University</p>\n          </button>\n        </div>\n      </div>\n      <button ion-button round class="center"\n        (click)="tutor()">\n        REGISTER\n      </button>\n    </div>\n  </ion-slide>\n</ion-slides>\n</ion-content>\n'/*ion-inline-end:"/home/cody/Desktop/bigbluetutor-client/ionic-BigBlueTutor/src/pages/onboarding/tutorRegister/tutorRegister.html"*/,
    }),
    __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["i" /* NavController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["j" /* NavParams */], __WEBPACK_IMPORTED_MODULE_2__shared_ds_service__["a" /* DsService */]])
], TutorRegister);

//# sourceMappingURL=tutorRegister.js.map

/***/ }),

/***/ 217:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_platform_browser_dynamic__ = __webpack_require__(218);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__app_module__ = __webpack_require__(236);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__shared_ds_service__ = __webpack_require__(13);



Object(__WEBPACK_IMPORTED_MODULE_0__angular_platform_browser_dynamic__["a" /* platformBrowserDynamic */])().bootstrapModule(__WEBPACK_IMPORTED_MODULE_1__app_module__["a" /* AppModule */], [__WEBPACK_IMPORTED_MODULE_2__shared_ds_service__["a" /* DsService */]]);
//# sourceMappingURL=main.js.map

/***/ }),

/***/ 236:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return AppModule; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_platform_browser__ = __webpack_require__(32);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_ionic_angular__ = __webpack_require__(7);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__ionic_native_splash_screen__ = __webpack_require__(205);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__ionic_native_status_bar__ = __webpack_require__(207);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__shared_ds_service__ = __webpack_require__(13);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__shared_recordlisten_service__ = __webpack_require__(59);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__ionic_native_in_app_browser__ = __webpack_require__(210);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__pages_request_request__ = __webpack_require__(211);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9__ionic_native_google_plus__ = __webpack_require__(212);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_10__app_component__ = __webpack_require__(308);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_11__pages_home_home__ = __webpack_require__(45);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_12__pages_inbox_inbox__ = __webpack_require__(60);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_13__pages_message_message__ = __webpack_require__(61);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_14__pages_profilepage_profilepage__ = __webpack_require__(62);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_15__pages_login_login__ = __webpack_require__(114);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_16__pages_userpage_userpage__ = __webpack_require__(113);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_17__pages_onboarding_roleChoice_roleChoice__ = __webpack_require__(115);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_18__pages_onboarding_tutorRegister_tutorRegister__ = __webpack_require__(216);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_19__pages_category_category__ = __webpack_require__(213);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_20__pages_createusername_createusername__ = __webpack_require__(215);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_21__pages_preOnboarding_preOnboarding__ = __webpack_require__(309);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_22__pages_onboarding_onboarding_onboarding__ = __webpack_require__(116);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};























var AppModule = (function () {
    function AppModule() {
    }
    return AppModule;
}());
AppModule = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_1__angular_core__["L" /* NgModule */])({
        declarations: [
            __WEBPACK_IMPORTED_MODULE_10__app_component__["a" /* MyApp */],
            __WEBPACK_IMPORTED_MODULE_11__pages_home_home__["a" /* HomePage */],
            __WEBPACK_IMPORTED_MODULE_12__pages_inbox_inbox__["a" /* Inbox */],
            __WEBPACK_IMPORTED_MODULE_17__pages_onboarding_roleChoice_roleChoice__["a" /* RoleChoice */],
            __WEBPACK_IMPORTED_MODULE_22__pages_onboarding_onboarding_onboarding__["a" /* OnboardingPage */],
            __WEBPACK_IMPORTED_MODULE_13__pages_message_message__["a" /* Message */],
            __WEBPACK_IMPORTED_MODULE_14__pages_profilepage_profilepage__["a" /* ProfilePage */],
            __WEBPACK_IMPORTED_MODULE_15__pages_login_login__["a" /* LoginPage */],
            __WEBPACK_IMPORTED_MODULE_16__pages_userpage_userpage__["a" /* UserPage */],
            __WEBPACK_IMPORTED_MODULE_18__pages_onboarding_tutorRegister_tutorRegister__["a" /* TutorRegister */],
            __WEBPACK_IMPORTED_MODULE_19__pages_category_category__["a" /* Category */],
            __WEBPACK_IMPORTED_MODULE_8__pages_request_request__["a" /* RequestPopover */],
            __WEBPACK_IMPORTED_MODULE_20__pages_createusername_createusername__["a" /* CreateUsernamePage */],
            __WEBPACK_IMPORTED_MODULE_21__pages_preOnboarding_preOnboarding__["a" /* PreOnboarding */],
            __WEBPACK_IMPORTED_MODULE_22__pages_onboarding_onboarding_onboarding__["a" /* OnboardingPage */]
        ],
        imports: [
            __WEBPACK_IMPORTED_MODULE_0__angular_platform_browser__["a" /* BrowserModule */],
            __WEBPACK_IMPORTED_MODULE_2_ionic_angular__["e" /* IonicModule */].forRoot(__WEBPACK_IMPORTED_MODULE_10__app_component__["a" /* MyApp */])
        ],
        bootstrap: [__WEBPACK_IMPORTED_MODULE_2_ionic_angular__["c" /* IonicApp */]],
        entryComponents: [
            __WEBPACK_IMPORTED_MODULE_10__app_component__["a" /* MyApp */],
            __WEBPACK_IMPORTED_MODULE_11__pages_home_home__["a" /* HomePage */],
            __WEBPACK_IMPORTED_MODULE_12__pages_inbox_inbox__["a" /* Inbox */],
            __WEBPACK_IMPORTED_MODULE_17__pages_onboarding_roleChoice_roleChoice__["a" /* RoleChoice */],
            __WEBPACK_IMPORTED_MODULE_22__pages_onboarding_onboarding_onboarding__["a" /* OnboardingPage */],
            __WEBPACK_IMPORTED_MODULE_13__pages_message_message__["a" /* Message */],
            __WEBPACK_IMPORTED_MODULE_14__pages_profilepage_profilepage__["a" /* ProfilePage */],
            __WEBPACK_IMPORTED_MODULE_15__pages_login_login__["a" /* LoginPage */],
            __WEBPACK_IMPORTED_MODULE_16__pages_userpage_userpage__["a" /* UserPage */],
            __WEBPACK_IMPORTED_MODULE_18__pages_onboarding_tutorRegister_tutorRegister__["a" /* TutorRegister */],
            __WEBPACK_IMPORTED_MODULE_19__pages_category_category__["a" /* Category */],
            __WEBPACK_IMPORTED_MODULE_8__pages_request_request__["a" /* RequestPopover */],
            __WEBPACK_IMPORTED_MODULE_20__pages_createusername_createusername__["a" /* CreateUsernamePage */],
            __WEBPACK_IMPORTED_MODULE_21__pages_preOnboarding_preOnboarding__["a" /* PreOnboarding */],
            __WEBPACK_IMPORTED_MODULE_22__pages_onboarding_onboarding_onboarding__["a" /* OnboardingPage */]
        ],
        providers: [
            __WEBPACK_IMPORTED_MODULE_4__ionic_native_status_bar__["a" /* StatusBar */],
            __WEBPACK_IMPORTED_MODULE_3__ionic_native_splash_screen__["a" /* SplashScreen */],
            __WEBPACK_IMPORTED_MODULE_5__shared_ds_service__["a" /* DsService */],
            __WEBPACK_IMPORTED_MODULE_6__shared_recordlisten_service__["a" /* RecordListenService */],
            __WEBPACK_IMPORTED_MODULE_7__ionic_native_in_app_browser__["a" /* InAppBrowser */],
            { provide: __WEBPACK_IMPORTED_MODULE_1__angular_core__["v" /* ErrorHandler */], useClass: __WEBPACK_IMPORTED_MODULE_2_ionic_angular__["d" /* IonicErrorHandler */] },
            __WEBPACK_IMPORTED_MODULE_9__ionic_native_google_plus__["a" /* GooglePlus */]
        ]
    })
], AppModule);

//# sourceMappingURL=app.module.js.map

/***/ }),

/***/ 287:
/***/ (function(module, exports) {

/* (ignored) */

/***/ }),

/***/ 308:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return MyApp; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(7);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__ionic_native_status_bar__ = __webpack_require__(207);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__ionic_native_splash_screen__ = __webpack_require__(205);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__pages_home_home__ = __webpack_require__(45);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__pages_inbox_inbox__ = __webpack_require__(60);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__pages_profilepage_profilepage__ = __webpack_require__(62);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__pages_login_login__ = __webpack_require__(114);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};








var MyApp = (function () {
    function MyApp(platform, statusBar, splashScreen, menu) {
        this.menu = menu;
        this.rootPage = __WEBPACK_IMPORTED_MODULE_7__pages_login_login__["a" /* LoginPage */];
        this.pages = [
            { title: "Home", component: __WEBPACK_IMPORTED_MODULE_4__pages_home_home__["a" /* HomePage */] },
            { title: "Profile", component: __WEBPACK_IMPORTED_MODULE_6__pages_profilepage_profilepage__["a" /* ProfilePage */] },
            { title: "Inbox", component: __WEBPACK_IMPORTED_MODULE_5__pages_inbox_inbox__["a" /* Inbox */] }
        ];
        platform.ready().then(function () {
            // Okay, so the platform is ready and our plugins are available.
            // Here you can do any higher level native things you might need.
            statusBar.styleDefault();
            splashScreen.hide();
        });
    }
    MyApp.prototype.openPage = function (page) {
        this.menu.close();
        this.nav.setRoot(page.component);
    };
    return MyApp;
}());
__decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["_13" /* ViewChild */])(__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["h" /* Nav */]),
    __metadata("design:type", __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["h" /* Nav */])
], MyApp.prototype, "nav", void 0);
MyApp = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["n" /* Component */])({template:/*ion-inline-start:"/home/cody/Desktop/bigbluetutor-client/ionic-BigBlueTutor/src/app/app.html"*/'<ion-nav [root]="rootPage" #content></ion-nav>\n\n<ion-menu [content]="content">\n  <ion-content class="menu">\n    <h1>{{username}}</h1>\n    <button ion-item *ngFor="let page of pages" (click)="openPage(page)">{{page.title}}</button>\n  </ion-content>\n</ion-menu>\n'/*ion-inline-end:"/home/cody/Desktop/bigbluetutor-client/ionic-BigBlueTutor/src/app/app.html"*/
    }),
    __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["k" /* Platform */], __WEBPACK_IMPORTED_MODULE_2__ionic_native_status_bar__["a" /* StatusBar */], __WEBPACK_IMPORTED_MODULE_3__ionic_native_splash_screen__["a" /* SplashScreen */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["f" /* MenuController */]])
], MyApp);

//# sourceMappingURL=app.component.js.map

/***/ }),

/***/ 309:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return PreOnboarding; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(7);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__shared_ds_service__ = __webpack_require__(13);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};



var PreOnboarding = (function () {
    function PreOnboarding(navCtrl, navParams, ds) {
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.ds = ds;
    }
    return PreOnboarding;
}());
PreOnboarding = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["n" /* Component */])({
        selector: 'page-preOnboarding',template:/*ion-inline-start:"/home/cody/Desktop/bigbluetutor-client/ionic-BigBlueTutor/src/pages/preOnboarding/preOnboarding.html"*/'<ion-content padding class="onboarding">\n  <ion-slides pager>\n    <ion-slide>\n      <ion-img class="onboardingimg" src="./assets/OBimgs/OB1.png"></ion-img>\n      <h1 class="onboardingtitle">TUTORING ANYWHERE ANYTIME</h1>\n      <p class="onboardingtext">\nLorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque in lobortis sapien, vel semper risus.</p>\n    </ion-slide>\n\n    <ion-slide>\n      <ion-img class="onboardingimg" src="./assets/OBimgs/OB2.png"></ion-img>\n      <h1 class="onboardingtitle">QUICKLY CONNECT</h1>\n      <p class="onboardingtext">\nLorem ipsum dolor sit amet, consectetur adipiscing elit.</p>\n    </ion-slide>\n\n    <ion-slide>\n      <ion-img class="onboardingimg" src="./assets/OBimgs/OB3.png"></ion-img>\n      <h1 class="onboardingtitle">DOWNLOAD BIGBLUEBUTTON</h1>\n      <p class="onboardingtext">\nLorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque in lobortis sapien, vel semper risus.</p>\n    </ion-slide>\n  </ion-slides>\n\n</ion-content>\n\n<div class="btndiv" ng-controller="slideCtrl">\n  <button [navPush]="TutorRegister" ion-button round class="nextbtn">NEXT</button>\n</div>\n'/*ion-inline-end:"/home/cody/Desktop/bigbluetutor-client/ionic-BigBlueTutor/src/pages/preOnboarding/preOnboarding.html"*/,
    }),
    __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["i" /* NavController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["j" /* NavParams */], __WEBPACK_IMPORTED_MODULE_2__shared_ds_service__["a" /* DsService */]])
], PreOnboarding);

/*.controller('slideCtrl', ['$scope', '$ionicSlideBoxDelegate', function($scope, $ionicSlideBoxDelegate) {

    $scope.slideNext = function() {

        $ionicSlideBoxDelegate.next();
    }
});*/
//# sourceMappingURL=preOnboarding.js.map

/***/ }),

/***/ 45:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return HomePage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(7);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__profilepage_profilepage__ = __webpack_require__(62);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__userpage_userpage__ = __webpack_require__(113);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__category_category__ = __webpack_require__(213);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__shared_ds_service__ = __webpack_require__(13);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__shared_recordlisten_service__ = __webpack_require__(59);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7_jquery__ = __webpack_require__(214);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7_jquery___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_7_jquery__);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};








var HomePage = (function () {
    function HomePage(navCtrl, events, ds, rls) {
        this.navCtrl = navCtrl;
        this.events = events;
        this.ds = ds;
        this.rls = rls;
        this.imageLocations = {
            "Math": "./assets/icon/math.png",
            "Language": "./assets/icon/language.png",
            "Social Sciences": "./assets/icon/social.png",
            "Science": "./assets/icon/science.png",
            "Arts": "./assets/icon/art.png",
            "Business": "./assets/icon/business.png"
        };
        var categoryData = ds.dataRecord.get('categories');
        this.categories = [];
        //this.tutorsData = {};
        //this.tutors = {};
        for (var category in categoryData) {
            this.categories.push({ category: category, img: this.imageLocations[category] });
            //ds.dsInstance.rpc.make('search/tutor', {subject:category}, function(error, data) {
            //  if (error) throw error
            //  this.tutorsData[data.subject] = data.data;
            //  this.tutors[data.subject] = data.data;
            //}.bind(this));
            //ds.dsInstance.event.subscribe('tutor/'+category, function(data) {
            //  this.tutorsData[data.subject] = data.data;
            //  this.tutors[data.subject] = data.data;
            //}.bind(this));
        }
        ds.dsInstance.rpc.make("getMessages", { username: ds.profileRecord.get("username"), googleID: ds.profileRecord.get("googleID") }, function (error, result) { if (error)
            console.log(error); });
    }
    HomePage.prototype.onInput = function (event) {
        if (this.search == "") {
            this.searchCategories = [];
            this.searchTutors = [];
        }
        else {
            this.ds.dsInstance.rpc.make('search', { param: this.search }, function (error, data) {
                this.searchTutors = data.data;
            }.bind(this));
            var categoryData = this.ds.dataRecord.get('categories');
            this.searchCategories = [];
            for (var category in categoryData) {
                this.searchCategories.push(category);
            }
            for (var category in categoryData) {
                var subCategories = categoryData[category];
                for (var i = 0; i < subCategories.length; i++) {
                    this.searchCategories.push(subCategories[i]);
                }
            }
            this.searchCategories = this.searchCategories.filter(function (text) {
                return text.includes(this.search);
            }.bind(this));
            this.searchCategories = this.searchCategories.sort(function (a, b) {
                if (a.firstname < b.firstname)
                    return -1;
                if (a.firstname > b.firstname)
                    return 1;
                return 0;
            });
        }
        __WEBPACK_IMPORTED_MODULE_7_jquery__('.searchresults').css({ 'display': 'block' });
    };
    HomePage.prototype.categorySelected = function (category) {
        this.navCtrl.setRoot(__WEBPACK_IMPORTED_MODULE_4__category_category__["a" /* Category */], { category: category });
    };
    HomePage.prototype.userSelected = function (tutor) {
        if (tutor.username === this.ds.profileRecord.get('username')) {
            this.navCtrl.setRoot(__WEBPACK_IMPORTED_MODULE_2__profilepage_profilepage__["a" /* ProfilePage */]);
        }
        else {
            this.navCtrl.push(__WEBPACK_IMPORTED_MODULE_3__userpage_userpage__["a" /* UserPage */], { user: tutor });
        }
    };
    HomePage.prototype.searchbar = function () {
        __WEBPACK_IMPORTED_MODULE_7_jquery__('.home-bkg').animate({ 'height': '20vh', 'opacity': '0.5' }, 300);
        __WEBPACK_IMPORTED_MODULE_7_jquery__('#backgroundcontent, .categorycontainer').animate({ 'opacity': '0' }, 200)
            .queue(function (next) {
            __WEBPACK_IMPORTED_MODULE_7_jquery__('#backgroundcontent, .categorycontainer').css({ 'display': 'none' });
            next();
        });
        __WEBPACK_IMPORTED_MODULE_7_jquery__('.menubtn').hide();
        __WEBPACK_IMPORTED_MODULE_7_jquery__('.search').animate({ 'top': '7vh' }, 300)
            .queue(function (next) {
            __WEBPACK_IMPORTED_MODULE_7_jquery__('.searchcancel').animate({ 'opacity': '1' });
            __WEBPACK_IMPORTED_MODULE_7_jquery__('.searchcancel').css('display', 'block');
            next();
        });
    };
    HomePage.prototype.cancelsearch = function (ev) {
        var HTMLElement = document.getElementsByClassName("searchbar");
        console.log(HTMLElement);
        //ev.HTMLElement.value = '';
        __WEBPACK_IMPORTED_MODULE_7_jquery__('.menubtn').show();
        __WEBPACK_IMPORTED_MODULE_7_jquery__('.searchresults').css('display', 'none');
        __WEBPACK_IMPORTED_MODULE_7_jquery__('.home-bkg').animate({ 'height': '63vh', 'opacity': '1' }, 300);
        __WEBPACK_IMPORTED_MODULE_7_jquery__('#backgroundcontent').css({ 'display': 'block' });
        __WEBPACK_IMPORTED_MODULE_7_jquery__('.categorycontainer').css({ 'display': 'flex' });
        __WEBPACK_IMPORTED_MODULE_7_jquery__('#backgroundcontent, .categorycontainer').animate({ 'opacity': '1' }, 400);
        __WEBPACK_IMPORTED_MODULE_7_jquery__('.searchcancel').animate({ 'opacity': '0' }, 300);
        __WEBPACK_IMPORTED_MODULE_7_jquery__('.search').animate({ 'top': '37vh' }, 300)
            .queue(function (next) {
            __WEBPACK_IMPORTED_MODULE_7_jquery__('.searchcancel').css('display', 'none');
            next();
        });
    };
    return HomePage;
}());
HomePage = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["n" /* Component */])({
        selector: 'page-home',template:/*ion-inline-start:"/home/cody/Desktop/bigbluetutor-client/ionic-BigBlueTutor/src/pages/home/home.html"*/'<ion-header>\n  <!--ion-navbar>\n    <button ion-button menuToggle>\n      <ion-icon name="menu"></ion-icon>\n    </button>\n    <ion-title>\n      BigBlueTutor\n    </ion-title>\n  </ion-navbar>\n\n  <div class="space"></div-->\n</ion-header>\n<ion-content>\n  <button class="menubtn" menuToggle>\n    <ion-icon class="menuicon" name="menu"></ion-icon>\n  </button>\n  <div class="home-bkg">\n    <div id="backgroundcontent">\n      <img class="circles" src="./assets/icon/circles.png"/>\n      <div class="logo">\n        <ion-img class="logoimg" src="./assets/icon/logo.png"></ion-img>\n      </div>\n    </div>\n    <div class="search">\n      <p class="searchcancel" (click)="cancelsearch($event);">Cancel</p>\n      <ion-searchbar [showCancelButton]="false" class="searchbar" (click)="searchbar();" [(ngModel)]="search" (ionInput)="onInput($event)"></ion-searchbar>\n    </div>\n  </div>\n  <div class="categorycontainer">\n    <div class="maincategories">\n      <div class="categorycard" *ngFor="let category of categories" (click)="categorySelected(category.category)">\n        <div class="categoryimgcontainer"><img class="categoryimg" src="{{category.img}}"/></div>\n        <p class="categoryname">{{category.category}}</p>\n      </div>\n    </div>\n  </div>\n\n  <div class="searchresults">\n    <ion-list class="tutorresults">\n      <h1 class="resulttext">CATEGORIES</h1>\n      <div *ngFor="let searchCategory of searchCategories" (click)="categorySelected(searchCategory)">\n        <div>\n          <h1 class="categoryresults">{{searchCategory}}</h1>\n        </div>\n      </div>\n    </ion-list>\n    <ion-list class="tutorresults">\n        <h1 class="resulttext">TUTORS</h1>\n        <div *ngFor="let searchTutor of searchTutors" class="profileitem" (click)="userSelected(searchTutor)">\n          <div class="profilecard">\n            <img src="./assets/icon/default-profile.png" class="home_profilepic"/>\n            <h1 class="card_name">{{ searchTutor.username }}</h1>\n            <div class="cardline"></div>\n            <p class="card_info">{{ searchTutor.position }}\n            {{ searchTutor.catagories }}</p>\n          </div>\n        </div>\n    </ion-list>\n  </div>\n\n</ion-content>\n'/*ion-inline-end:"/home/cody/Desktop/bigbluetutor-client/ionic-BigBlueTutor/src/pages/home/home.html"*/
    }),
    __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["i" /* NavController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["b" /* Events */], __WEBPACK_IMPORTED_MODULE_5__shared_ds_service__["a" /* DsService */], __WEBPACK_IMPORTED_MODULE_6__shared_recordlisten_service__["a" /* RecordListenService */]])
], HomePage);

//# sourceMappingURL=home.js.map

/***/ }),

/***/ 59:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return RecordListenService; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(7);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__ds_service__ = __webpack_require__(13);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};



var RecordListenService = (function () {
    function RecordListenService(events, ds) {
        this.events = events;
        this.ds = ds;
        this.ds.profileRecord.subscribe('messages', function () {
            events.publish('user:message');
        });
        this.ds.profileRecord.subscribe('meeting', function () {
            events.publish('user:meeting');
        });
        this.ds.dataRecord.subscribe('tutors', function () {
            events.publish('data:tutor');
        });
    }
    return RecordListenService;
}());
RecordListenService = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["B" /* Injectable */])(),
    __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["b" /* Events */], __WEBPACK_IMPORTED_MODULE_2__ds_service__["a" /* DsService */]])
], RecordListenService);

//# sourceMappingURL=recordlisten.service.js.map

/***/ }),

/***/ 60:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return Inbox; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(7);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__shared_ds_service__ = __webpack_require__(13);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__message_message__ = __webpack_require__(61);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__shared_recordlisten_service__ = __webpack_require__(59);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};





var Inbox = (function () {
    function Inbox(navCtrl, ds, events, rls) {
        var _this = this;
        this.navCtrl = navCtrl;
        this.ds = ds;
        this.events = events;
        this.rls = rls;
        console.log(Object.keys(this.ds.profileRecord.get("messages")));
        this.messages = Object.keys(this.ds.profileRecord.get("messages"));
        events.subscribe('user:message', function () {
            _this.messages = Object.keys(_this.ds.profileRecord.get('messages'));
        });
    }
    Inbox.prototype.viewMessage = function (message) {
        this.navCtrl.push(__WEBPACK_IMPORTED_MODULE_3__message_message__["a" /* Message */], { username: message });
    };
    return Inbox;
}());
Inbox = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["n" /* Component */])({
        selector: 'page-inbox',template:/*ion-inline-start:"/home/cody/Desktop/bigbluetutor-client/ionic-BigBlueTutor/src/pages/inbox/inbox.html"*/'<ion-header>\n  <ion-navbar>\n    <button ion-button menuToggle>\n      <ion-icon name=\'menu\'></ion-icon>\n    </button>\n    <ion-title>\n      Inbox\n    </ion-title>\n  </ion-navbar>\n</ion-header>\n\n<ion-content>\n  <ion-list>\n    <div *ngFor="let msg of messages" class="inbox_msg" (click)="viewMessage(msg)">\n      <img src="./assets/icon/default-profile.png" class="inbox_profilepic"/>\n      <button class="inbox_name" ion-item>{{msg}}</button>\n    </div>\n  </ion-list>\n</ion-content>\n'/*ion-inline-end:"/home/cody/Desktop/bigbluetutor-client/ionic-BigBlueTutor/src/pages/inbox/inbox.html"*/
    }),
    __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["i" /* NavController */], __WEBPACK_IMPORTED_MODULE_2__shared_ds_service__["a" /* DsService */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["b" /* Events */], __WEBPACK_IMPORTED_MODULE_4__shared_recordlisten_service__["a" /* RecordListenService */]])
], Inbox);

//# sourceMappingURL=inbox.js.map

/***/ }),

/***/ 61:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return Message; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(7);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__shared_ds_service__ = __webpack_require__(13);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__shared_recordlisten_service__ = __webpack_require__(59);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__ionic_native_in_app_browser__ = __webpack_require__(210);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};





var Message = (function () {
    function Message(navCtrl, navParams, platform, events, ds, rls, iab) {
        var _this = this;
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.platform = platform;
        this.events = events;
        this.ds = ds;
        this.rls = rls;
        this.iab = iab;
        this.username = navParams.get('username');
        if (this.ds.profileRecord.get('messages')[this.username]) {
            this.messages = this.ds.profileRecord.get('messages')[this.username];
        }
        else {
            var tempMessages = this.ds.profileRecord.get('messages');
            tempMessages[this.username] = [];
            this.ds.profileRecord.set('messages', tempMessages);
            this.messages = this.ds.profileRecord.get('messages')[this.username];
        }
        events.subscribe('user:message', function () {
            _this.messages = _this.ds.profileRecord.get('messages')[_this.username];
        });
        events.subscribe('user:meeting', function () {
            console.log(_this.messages);
            var url = _this.ds.profileRecord.get('meeting');
            if (url !== "") {
                if (_this.platform.is('ios')) {
                    window.open('bigbluebutton://' + url + "&endUrl=1&", '_system');
                }
                else if (_this.platform.is('android')) {
                    var room = iab.create(url, '_system');
                }
                else {
                    window.open(url, '_blank');
                }
            }
        });
    }
    Message.prototype.ionViewDidEnter = function () {
        this.content.scrollToBottom(0);
    };
    Message.prototype.sendMessage = function () {
        console.log(this.input);
        if (this.input != "") {
            this.ds.dsInstance.rpc.make('sendMessage', { client: this.ds.profileRecord.get('username'), contact: this.username, message: this.input }, function (error, result) { });
            var tempMessages = this.ds.profileRecord.get('messages');
            console.log(tempMessages);
            tempMessages[this.username].push({ user: this.ds.profileRecord.get('username'), message: this.input });
            this.ds.profileRecord.set('messages', tempMessages);
            this.messages = this.ds.profileRecord.get('messages')[this.username];
            this.input = "";
        }
        this.textInput.setFocus();
        //this.content.scrollToBottom(100);
    };
    Message.prototype.requestMeeting = function () {
        this.ds.dsInstance.rpc.make('requestMeeting', { client: this.ds.profileRecord.get('username'), contact: this.username }, function () { });
    };
    Message.prototype.declineMeeting = function () {
        this.ds.dsInstance.rpc.make('declineMeeting', { client: this.ds.profileRecord.get('username'), contact: this.username }, function () { });
    };
    return Message;
}());
__decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["_13" /* ViewChild */])('content'),
    __metadata("design:type", __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["a" /* Content */])
], Message.prototype, "content", void 0);
__decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["_13" /* ViewChild */])('textInput'),
    __metadata("design:type", Object)
], Message.prototype, "textInput", void 0);
Message = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["n" /* Component */])({
        selector: 'page-message',template:/*ion-inline-start:"/home/cody/Desktop/bigbluetutor-client/ionic-BigBlueTutor/src/pages/message/message.html"*/'<ion-header>\n  <ion-navbar class="messageheader">\n    <ion-title>\n      <div id="header">\n        <button ion-button menuToggle>\n          <ion-icon name=\'menu\'></ion-icon>\n        </button>\n        <strong class="username">{{username}}</strong>\n        <button id="requestButton" (click)="requestMeeting()" class="bluebutton" ion-button item-right>Request<br/> Meeting</button>\n      </div>\n    </ion-title>\n  </ion-navbar>\n</ion-header>\n\n<ion-content #content>\n  <div class="sentmsgfield">\n    <div *ngFor="let msg of messages" [ngSwitch]="msg.special">\n      <div class="sessionreq" *ngSwitchCase="\'IncomingRequest\'" >\n        <div class="msg_bbbsession_title bluebutton"><h1 class="reqtext">SESSION REQUEST</h1></div>\n        <div class="msg_bbbsession_body">\n          <div class="msg_bbbsession_buttons">\n            <button ion-button round class="bluebutton" (click)="requestMeeting()">JOIN</button>\n            <button ion-button round class="whitebutton" (click)="declineMeeting()">DECLINE</button>\n          </div>\n        </div>\n      </div>\n      <div class="sessionreq" *ngSwitchCase="\'OutgoingRequest\'" >\n        <div class="msg_bbbsession_title bluebutton"><h1 class="reqtext"> MEETING REQUEST</h1></div>\n        <div class="msg_bbbsession_body">\n            <p class="sessionmsg">Waiting for {{username}}...</p>\n        </div>\n      </div>\n      <div class="sessionreq" *ngSwitchCase="\'ActiveSession\'" >\n        <div class="msg_bbbsession_title bluebutton"><h1 class="reqtext">ACTIVE SESSION</h1></div>\n        <div class="msg_bbbsession_body">\n            <p class="sessionmsg">Tutoring Session currently in progress</p>\n        </div>\n      </div>\n      <div class="sessionreq" *ngSwitchCase="\'DeclinedRequest\'" >\n        <div class="msg_bbbsession_title bluebutton"><h1 class="reqtext">SESSION DECLINED</h1></div>\n        <div class="msg_bbbsession_body">\n            <p class="sessionmsg">{{msg.user}} has declined.</p>\n        </div>\n      </div>\n        <div class="message" *ngSwitchDefault ion-item>\n\n          <div class="" [ngSwitch]="msg.user">\n\n            <div *ngSwitchDefault class="mymessages">\n              <div class="textusername myusername">\n                <b>{{msg.user}}</b>\n              </div>\n              <div class="textmessagebox mytextmsgbox">\n                <p class="textmessage mytextmsg">{{msg.message}}</p>\n              </div>\n            </div>\n\n            <div *ngSwitchCase="this.username">\n              <div class="textusername otherusername" >\n                <b>{{msg.user}}</b>\n              </div>\n              <div class="textmessagebox othertextmsgbox">\n                <p class="textmessage othertextmsg">{{msg.message}}</p>\n              </div>\n            </div>\n\n          </div>\n\n        </div>\n      </div>\n  </div>\n  <div class=messagefield>\n    <ion-input #textInput [(ngModel)]="input" placeholder="Type a message..." class="inputmessage"></ion-input>\n    <button (click)="sendMessage()" class="msgsend bluebutton" ion-button round>Send</button>\n  </div>\n</ion-content>\n'/*ion-inline-end:"/home/cody/Desktop/bigbluetutor-client/ionic-BigBlueTutor/src/pages/message/message.html"*/
    }),
    __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["i" /* NavController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["j" /* NavParams */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["k" /* Platform */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["b" /* Events */], __WEBPACK_IMPORTED_MODULE_2__shared_ds_service__["a" /* DsService */], __WEBPACK_IMPORTED_MODULE_3__shared_recordlisten_service__["a" /* RecordListenService */], __WEBPACK_IMPORTED_MODULE_4__ionic_native_in_app_browser__["a" /* InAppBrowser */]])
], Message);

//# sourceMappingURL=message.js.map

/***/ }),

/***/ 62:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ProfilePage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(7);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__shared_ds_service__ = __webpack_require__(13);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};



var ProfilePage = (function () {
    function ProfilePage(navCtrl, ds) {
        this.navCtrl = navCtrl;
        this.ds = ds;
        this.username = this.ds.profileRecord.get("username");
        this.user = this.ds.getRecord("user/" + this.username);
    }
    return ProfilePage;
}());
ProfilePage = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["n" /* Component */])({
        selector: 'page-profile',template:/*ion-inline-start:"/home/cody/Desktop/bigbluetutor-client/ionic-BigBlueTutor/src/pages/profilepage/profilepage.html"*/'<ion-header>\n  <ion-navbar>\n    <button ion-button menuToggle>\n      <ion-icon name=\'menu\'></ion-icon>\n    </button>\n    <ion-title>\n      Profile\n    </ion-title>\n  </ion-navbar>\n</ion-header>\n\n<ion-content padding>\n  <div id="profileInfo">\n    <img width="150px" height="150px" src="images/icon.png"/>\n    <div id="name">{{username}}</div>\n    Online\n  </div>\n</ion-content>\n'/*ion-inline-end:"/home/cody/Desktop/bigbluetutor-client/ionic-BigBlueTutor/src/pages/profilepage/profilepage.html"*/,
    }),
    __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["i" /* NavController */], __WEBPACK_IMPORTED_MODULE_2__shared_ds_service__["a" /* DsService */]])
], ProfilePage);

//# sourceMappingURL=profilepage.js.map

/***/ })

},[217]);
//# sourceMappingURL=main.js.map