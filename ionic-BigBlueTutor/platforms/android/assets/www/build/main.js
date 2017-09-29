webpackJsonp([0],{

/***/ 111:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return UserPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(9);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__shared_ds_service__ = __webpack_require__(14);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__inbox_inbox__ = __webpack_require__(112);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__message_message__ = __webpack_require__(113);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__request_request__ = __webpack_require__(208);
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
        var contactModal = this.modalCtrl.create(__WEBPACK_IMPORTED_MODULE_5__request_request__["a" /* RequestPopover */], { user: this.user, username: this.user.username });
        contactModal.present({
            ev: myEvent
        });
    };
    return UserPage;
}());
UserPage = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["n" /* Component */])({
        selector: 'page-user',template:/*ion-inline-start:"/home/robin/ionic-BigBlueTutor/bigbluetutor-client/ionic-BigBlueTutor/src/pages/userpage/userpage.html"*/'<ion-header>\n  <ion-navbar>\n    <button ion-button menuToggle>\n      <ion-icon name=\'menu\'></ion-icon>\n    </button>\n    <ion-title>\n      {{username}}\n    </ion-title>\n  </ion-navbar>\n</ion-header>\n\n<ion-content padding>\n  <div id="userInfo">\n    <div id="imageContainer">\n      <img class="profilepic" src="images/icon.png"/>\n          <button (click)="star()" class="icononlybtn favouritebtn"><ion-icon name="star" class="favourite"></ion-icon></button>\n    </div>\n    <div id="name" class="profilename">{{username}}</div>\n    <button (click)="request($event)" class="bluebutton" ion-button round>Request Session</button>\n    <button (click)="message()" ion-button round class="bluebutton"><img class="buttonicon" src="./assets/icon/messageicon.png"/></button>\n  </div>\n  <ion-list>\n    <ion-item *ngFor="let category of categories">\n      {{ category }}\n    </ion-item>\n  </ion-list>\n</ion-content>\n'/*ion-inline-end:"/home/robin/ionic-BigBlueTutor/bigbluetutor-client/ionic-BigBlueTutor/src/pages/userpage/userpage.html"*/,
    }),
    __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["f" /* ModalController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["h" /* NavController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["i" /* NavParams */], __WEBPACK_IMPORTED_MODULE_2__shared_ds_service__["a" /* DsService */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["k" /* PopoverController */]])
], UserPage);

//# sourceMappingURL=userpage.js.map

/***/ }),

/***/ 112:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return Inbox; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(9);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__shared_ds_service__ = __webpack_require__(14);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__message_message__ = __webpack_require__(113);
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
        selector: 'page-inbox',template:/*ion-inline-start:"/home/robin/ionic-BigBlueTutor/bigbluetutor-client/ionic-BigBlueTutor/src/pages/inbox/inbox.html"*/'<ion-header>\n  <ion-navbar>\n    <button ion-button menuToggle>\n      <ion-icon name=\'menu\'></ion-icon>\n    </button>\n    <ion-title>\n      Inbox\n    </ion-title>\n  </ion-navbar>\n</ion-header>\n\n<ion-content>\n  <ion-list>\n    <div *ngFor="let msg of messages" class="inbox_msg">\n      <img src="./assets/icon/default-profile.png" class="inbox_profilepic"/>\n      <button class="inbox_name" ion-item (click)="viewMessage(msg)">{{msg}}</button>\n    </div>\n  </ion-list>\n</ion-content>\n'/*ion-inline-end:"/home/robin/ionic-BigBlueTutor/bigbluetutor-client/ionic-BigBlueTutor/src/pages/inbox/inbox.html"*/
    }),
    __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["h" /* NavController */], __WEBPACK_IMPORTED_MODULE_2__shared_ds_service__["a" /* DsService */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["a" /* Events */], __WEBPACK_IMPORTED_MODULE_4__shared_recordlisten_service__["a" /* RecordListenService */]])
], Inbox);

//# sourceMappingURL=inbox.js.map

/***/ }),

/***/ 113:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return Message; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(9);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__shared_ds_service__ = __webpack_require__(14);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__shared_recordlisten_service__ = __webpack_require__(59);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__ionic_native_in_app_browser__ = __webpack_require__(207);
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
    Message.prototype.sendMessage = function () {
        console.log(this.input);
        this.ds.dsInstance.rpc.make('sendMessage', { client: this.ds.profileRecord.get('username'), contact: this.username, message: this.input }, function (error, result) { });
        var tempMessages = this.ds.profileRecord.get('messages');
        console.log(tempMessages);
        tempMessages[this.username].push({ user: this.ds.profileRecord.get('username'), message: this.input });
        this.ds.profileRecord.set('messages', tempMessages);
        this.messages = this.ds.profileRecord.get('messages')[this.username];
        this.input = "";
    };
    Message.prototype.requestMeeting = function () {
        this.ds.dsInstance.rpc.make('requestMeeting', { client: this.ds.profileRecord.get('username'), contact: this.username }, function () { });
    };
    Message.prototype.declineMeeting = function () {
        this.ds.dsInstance.rpc.make('declineMeeting', { client: this.ds.profileRecord.get('username'), contact: this.username }, function () { });
    };
    return Message;
}());
Message = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["n" /* Component */])({
        selector: 'page-message',template:/*ion-inline-start:"/home/robin/ionic-BigBlueTutor/bigbluetutor-client/ionic-BigBlueTutor/src/pages/message/message.html"*/'<ion-header>\n  <ion-navbar class="messageheader">\n    <ion-title>\n      <div id="header">\n        <button ion-button menuToggle>\n          <ion-icon name=\'menu\'></ion-icon>\n        </button>\n        <strong class="username">{{username}}</strong>\n        <button id="requestButton" (click)="requestMeeting()" class="bluebutton" ion-button item-right>Request<br/> Meeting</button>\n      </div>\n    </ion-title>\n  </ion-navbar>\n</ion-header>\n\n<ion-content>\n  <ion-list class="sentmsgfield">\n    <div *ngFor="let msg of messages" [ngSwitch]="msg.special">\n      <div class="sessionreq" *ngSwitchCase="\'IncomingRequest\'" >\n        <button ion-button class="msg_bbbsession_title bluebutton">SESSION REQUEST</button>\n        <div class="msg_bbbsession_body">\n          <div class="msg_bbbsession_buttons">\n            <button ion-button round class="bluebutton" (click)="requestMeeting()">JOIN</button>\n            <button ion-button round class="whitebutton" (click)="declineMeeting()">DECLINE</button>\n          </div>\n        </div>\n      </div>\n      <div class="sessionreq" *ngSwitchCase="\'OutgoingRequest\'" >\n        <button ion-button class="msg_bbbsession_title bluebutton">Meeting Request</button>\n        <div class="msg_bbbsession_body">\n            <p class="sessionmsg">Waiting for {{username}}...</p>\n        </div>\n      </div>\n      <div class="sessionreq" *ngSwitchCase="\'ActiveSession\'" >\n        <button ion-button class="msg_bbbsession_title bluebutton">Active Session</button>\n        <div class="msg_bbbsession_body">\n            <p class="sessionmsg">Tutoring Session currently in progress</p>\n        </div>\n      </div>\n      <div class="sessionreq" *ngSwitchCase="\'DeclinedRequest\'" >\n        <button ion-button class="msg_bbbsession_title bluebutton">Declined</button>\n        <div class="msg_bbbsession_body">\n            <p class="sessionmsg">{{msg.user}} has declined.</p>\n        </div>\n      </div>\n        <button class="message" *ngSwitchDefault ion-item><b>{{msg.user}}</b>&emsp;&emsp;{{msg.message}}</button>\n    </div>\n  </ion-list>\n  <div class=messagefield>\n    <ion-input [(ngModel)]="input" placeholder="Type a message..." class="inputmessage"></ion-input>\n    <button (click)="sendMessage()" class="msgsend bluebutton" ion-button round>Send</button>\n  </div>\n</ion-content>\n'/*ion-inline-end:"/home/robin/ionic-BigBlueTutor/bigbluetutor-client/ionic-BigBlueTutor/src/pages/message/message.html"*/
    }),
    __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["h" /* NavController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["i" /* NavParams */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["j" /* Platform */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["a" /* Events */], __WEBPACK_IMPORTED_MODULE_2__shared_ds_service__["a" /* DsService */], __WEBPACK_IMPORTED_MODULE_3__shared_recordlisten_service__["a" /* RecordListenService */], __WEBPACK_IMPORTED_MODULE_4__ionic_native_in_app_browser__["a" /* InAppBrowser */]])
], Message);

//# sourceMappingURL=message.js.map

/***/ }),

/***/ 121:
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
webpackEmptyAsyncContext.id = 121;

/***/ }),

/***/ 14:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return DsService; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_deepstream_io_client_js__ = __webpack_require__(282);
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
        this.ds = this.dsInstance = __WEBPACK_IMPORTED_MODULE_1_deepstream_io_client_js__('tutor-back.blindside-dev.com:6020')
            .on('error', function (error) { return console.log(error); });
        this.ds.login(credentials, loginHandler);
        this.auth = credentials;
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

/***/ 162:
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
webpackEmptyAsyncContext.id = 162;

/***/ }),

/***/ 208:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return RequestPopover; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(9);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__shared_ds_service__ = __webpack_require__(14);
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
    function RequestPopover(viewCtrl, ds, navParams) {
        this.viewCtrl = viewCtrl;
        this.ds = ds;
        this.navParams = navParams;
        this.categoriesSelected = {};
        this.user = navParams.data.user;
        this.username = navParams.data.username;
        this.categories = navParams.data.user.categories;
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
        }
    };
    RequestPopover.prototype.closeModal = function () {
        this.viewCtrl.dismiss();
    };
    return RequestPopover;
}());
RequestPopover = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["n" /* Component */])({
        selector: 'page-request',template:/*ion-inline-start:"/home/robin/ionic-BigBlueTutor/bigbluetutor-client/ionic-BigBlueTutor/src/pages/request/request.html"*/'<ion-header>\n</ion-header>\n\n\n  <ion-content>\n    <div class="requestmodal">\n      <ion-list-header class="requestheader">\n        <p class="headertext">Request Session with:</p>\n        <h1 class="requesttitle"> {{username}} </h1>\n        <ion-icon name="ios-close-circle-outline" class="closebtn" (click)=closeModal()></ion-icon>\n      </ion-list-header>\n      <ion-list>\n        <ion-list-header><h1 class="requesttitle" item-left>I need help in: </h1></ion-list-header>\n        <ion-item *ngFor="let category of categories">\n          <ion-label>{{ category }}</ion-label>\n          <ion-checkbox [(ngModel)]="categoriesSelected[category]"></ion-checkbox>\n        </ion-item>\n      </ion-list>\n      <ion-list radio-group [(ngModel)]="time">\n        <ion-list-header><h1 class="requesttitle" item-left> Duration: </h1></ion-list-header>\n        <ion-item *ngFor="let time of times">\n          <ion-label>{{ time }}</ion-label>\n          <ion-radio [value]="time">\n          </ion-radio>\n        </ion-item>\n      </ion-list>\n      <button (click)="request()"round ion-button class="requestbtn bluebutton">\n        Request Meeting\n      </button>\n    </div>\n  </ion-content>\n'/*ion-inline-end:"/home/robin/ionic-BigBlueTutor/bigbluetutor-client/ionic-BigBlueTutor/src/pages/request/request.html"*/,
    }),
    __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["l" /* ViewController */], __WEBPACK_IMPORTED_MODULE_2__shared_ds_service__["a" /* DsService */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["i" /* NavParams */]])
], RequestPopover);

//# sourceMappingURL=request.js.map

/***/ }),

/***/ 209:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return Category; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(9);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__profilepage_profilepage__ = __webpack_require__(57);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__userpage_userpage__ = __webpack_require__(111);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__shared_ds_service__ = __webpack_require__(14);
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
        var tutors = ds.dataRecord.get('tutors');
        this.tutors = [];
        for (var i in tutors) {
            if (tutors[i].categories.indexOf(this.category) != -1) {
                this.tutors.push(tutors[i]);
            }
        }
    }
    Category.prototype.userSelected = function (tutor) {
        console.log(tutor);
        if (tutor === this.ds.profileRecord.get('username')) {
            this.navCtrl.push(__WEBPACK_IMPORTED_MODULE_2__profilepage_profilepage__["a" /* ProfilePage */]);
        }
        else {
            this.navCtrl.setRoot(__WEBPACK_IMPORTED_MODULE_3__userpage_userpage__["a" /* UserPage */], { user: tutor });
        }
    };
    return Category;
}());
Category = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["n" /* Component */])({
        selector: 'page-category',template:/*ion-inline-start:"/home/robin/ionic-BigBlueTutor/bigbluetutor-client/ionic-BigBlueTutor/src/pages/category/category.html"*/'<ion-header>\n  <ion-navbar>\n    <button ion-button menuToggle>\n      <ion-icon name="menu"></ion-icon>\n    </button>\n    <ion-title>\n      {{ category }}\n    </ion-title>\n  </ion-navbar>\n</ion-header>\n\n<ion-content padding>\n  <ion-list>\n    <ion-list-header>\n      Tutors\n    </ion-list-header>\n    <button ion-item *ngFor="let tutor of tutors" (click)="userSelected(tutor)">\n      {{ tutor.username }}\n      {{ tutor.position }}\n    </button>\n  </ion-list>\n</ion-content>\n'/*ion-inline-end:"/home/robin/ionic-BigBlueTutor/bigbluetutor-client/ionic-BigBlueTutor/src/pages/category/category.html"*/
    }),
    __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["h" /* NavController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["i" /* NavParams */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["j" /* Platform */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["a" /* Events */], __WEBPACK_IMPORTED_MODULE_4__shared_ds_service__["a" /* DsService */]])
], Category);

//# sourceMappingURL=category.js.map

/***/ }),

/***/ 210:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return LoginPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(9);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__home_home__ = __webpack_require__(45);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__onboarding_roleChoice_roleChoice__ = __webpack_require__(211);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__shared_ds_service__ = __webpack_require__(14);
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
    function LoginPage(navCtrl, menuCtrl, ds) {
        this.navCtrl = navCtrl;
        this.menuCtrl = menuCtrl;
        this.ds = ds;
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
    LoginPage.prototype.goToOnboarding = function () {
        this.navCtrl.setRoot(__WEBPACK_IMPORTED_MODULE_3__onboarding_roleChoice_roleChoice__["a" /* OnboardingPage */]);
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
        selector: 'page-login',template:/*ion-inline-start:"/home/robin/ionic-BigBlueTutor/bigbluetutor-client/ionic-BigBlueTutor/src/pages/login/login.html"*/'<ion-content view-title="Login" name="login-view">\n  <ion-content padding>\n    <div class="list list-inset">\n      <ion-list>\n      <ion-item class="item item-input">\n        <ion-input type="text" placeholder="Username" [(ngModel)]="username"></ion-input>\n      </ion-item>\n      <ion-item class="item item-input">\n        <ion-input type="password" placeholder="Password" [(ngModel)]="password"></ion-input>\n      </ion-item>\n      </ion-list>\n    </div>\n    <button ion-button round class="button button-block bluebutton loginbtn" (tap)="login()" (click)="login()">LOGIN</button>\n  </ion-content>\n</ion-content>\n'/*ion-inline-end:"/home/robin/ionic-BigBlueTutor/bigbluetutor-client/ionic-BigBlueTutor/src/pages/login/login.html"*/
    }),
    __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["h" /* NavController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["e" /* MenuController */], __WEBPACK_IMPORTED_MODULE_4__shared_ds_service__["a" /* DsService */]])
], LoginPage);

//# sourceMappingURL=login.js.map

/***/ }),

/***/ 211:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return OnboardingPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(9);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__home_home__ = __webpack_require__(45);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__tutorRegister_tutorRegister__ = __webpack_require__(212);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__shared_ds_service__ = __webpack_require__(14);
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
    OnboardingPage.prototype.student = function () {
        this.navCtrl.setRoot(__WEBPACK_IMPORTED_MODULE_2__home_home__["a" /* HomePage */]);
    };
    OnboardingPage.prototype.tutor = function () {
        this.navCtrl.push(__WEBPACK_IMPORTED_MODULE_3__tutorRegister_tutorRegister__["a" /* TutorRegister */]);
    };
    OnboardingPage.prototype.ionViewWillEnter = function () {
        this.menuCtrl.swipeEnable(false);
    };
    //Enable swipe again
    OnboardingPage.prototype.ionViewDidLeave = function () {
        this.menuCtrl.swipeEnable(true);
    };
    return OnboardingPage;
}());
OnboardingPage = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["n" /* Component */])({
        selector: 'page-onboarding',template:/*ion-inline-start:"/home/robin/ionic-BigBlueTutor/bigbluetutor-client/ionic-BigBlueTutor/src/pages/onboarding/roleChoice/roleChoice.html"*/'<ion-content padding>\n  <h1 class="iAm">I AM A</h1>\n\n  <div class="selection">\n    <div class="vertical_side" id="left">\n      <ion-img class="img" id="studentimg" src="./assets/OBimgs/student.png"></ion-img>\n      <button (click)="student()" ion-button round class="whitebtn nextbtn">STUDENT</button>\n    </div>\n    <div class="vertical_side" id="right">\n      <ion-img class="img" id="tutorimg" src="./assets/OBimgs/tutor.png"></ion-img>\n      <button (click)="tutor()" ion-button round class="whitebtn nextbtn">TUTOR</button>\n    </div>\n  </div>\n\n  <!--button ion-button class="choicenext fulldiv"> NEXT </button-->\n</ion-content>\n'/*ion-inline-end:"/home/robin/ionic-BigBlueTutor/bigbluetutor-client/ionic-BigBlueTutor/src/pages/onboarding/roleChoice/roleChoice.html"*/,
    }),
    __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["h" /* NavController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["i" /* NavParams */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["e" /* MenuController */], __WEBPACK_IMPORTED_MODULE_4__shared_ds_service__["a" /* DsService */]])
], OnboardingPage);

//# sourceMappingURL=roleChoice.js.map

/***/ }),

/***/ 212:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return TutorRegister; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(9);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__home_home__ = __webpack_require__(45);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__shared_ds_service__ = __webpack_require__(14);
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
        this.ds.dsInstance.rpc.make('registerTutor', { auth: this.ds.auth, categories: selected }, function () { });
        this.navCtrl.setRoot(__WEBPACK_IMPORTED_MODULE_2__home_home__["a" /* HomePage */]);
    };
    return TutorRegister;
}());
TutorRegister = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["n" /* Component */])({
        selector: 'page-tutorRegister',template:/*ion-inline-start:"/home/robin/ionic-BigBlueTutor/bigbluetutor-client/ionic-BigBlueTutor/src/pages/tutorRegister/tutorRegister.html"*/'<ion-header>\n  <ion-navbar class="onboardingnav">\n    <button ion-button menuToggle>\n      <ion-icon name="menu"></ion-icon>\n    </button>\n    <ion-title class="center headertitle">\n      WHAT COURSES DO YOU TUTOR?\n    </ion-title>\n  </ion-navbar>\n</ion-header>\n\n<ion-content padding>\n  <div class="space"></div>\n  <div class="allcategories">\n  <ion-list>\n    <div *ngFor="let category of categories">\n\n      <div class="categorycontainer">\n\n        <ion-item class="categoryitem"\n          (click)="toggleCategories(category)">\n          {{ category }}\n          <ion-icon ios="ios-add" class="moreoptions" md="md-add"></ion-icon>\n        </ion-item>\n\n        <div *ngIf="isOpen(category)">\n          <ion-item class="subcategoryitem"\n            *ngFor="let subcategory of categoriesData[category]">\n            <ion-label>\n              {{ subcategory }}\n            </ion-label>\n            <ion-checkbox [(ngModel)]="categoriesSelected[subcategory]">\n            </ion-checkbox>\n          </ion-item>\n        </div>\n\n      </div>\n\n    </div>\n  </ion-list>\n  <button ion-button round class="center"\n    (click)="tutor()">\n    REGISTER\n  </button>\n\n</div>\n</ion-content>\n'/*ion-inline-end:"/home/robin/ionic-BigBlueTutor/bigbluetutor-client/ionic-BigBlueTutor/src/pages/tutorRegister/tutorRegister.html"*/,
    }),
    __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["h" /* NavController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["i" /* NavParams */], __WEBPACK_IMPORTED_MODULE_3__shared_ds_service__["a" /* DsService */]])
], TutorRegister);

//# sourceMappingURL=tutorRegister.js.map

/***/ }),

/***/ 213:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_platform_browser_dynamic__ = __webpack_require__(214);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__app_module__ = __webpack_require__(232);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__shared_ds_service__ = __webpack_require__(14);



Object(__WEBPACK_IMPORTED_MODULE_0__angular_platform_browser_dynamic__["a" /* platformBrowserDynamic */])().bootstrapModule(__WEBPACK_IMPORTED_MODULE_1__app_module__["a" /* AppModule */], [__WEBPACK_IMPORTED_MODULE_2__shared_ds_service__["a" /* DsService */]]);
//# sourceMappingURL=main.js.map

/***/ }),

/***/ 232:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return AppModule; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_platform_browser__ = __webpack_require__(32);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_ionic_angular__ = __webpack_require__(9);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__ionic_native_splash_screen__ = __webpack_require__(202);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__ionic_native_status_bar__ = __webpack_require__(204);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__app_component__ = __webpack_require__(281);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__pages_home_home__ = __webpack_require__(45);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__pages_inbox_inbox__ = __webpack_require__(112);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__pages_message_message__ = __webpack_require__(113);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9__pages_profilepage_profilepage__ = __webpack_require__(57);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_10__pages_login_login__ = __webpack_require__(210);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_11__pages_userpage_userpage__ = __webpack_require__(111);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_12__pages_onboarding_roleChoice_roleChoice__ = __webpack_require__(211);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_13__pages_tutorRegister_tutorRegister__ = __webpack_require__(212);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_14__pages_category_category__ = __webpack_require__(209);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_15__pages_preOnboarding_preOnboarding__ = __webpack_require__(305);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_16__shared_ds_service__ = __webpack_require__(14);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_17__shared_recordlisten_service__ = __webpack_require__(59);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_18__ionic_native_in_app_browser__ = __webpack_require__(207);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_19__pages_request_request__ = __webpack_require__(208);
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
            __WEBPACK_IMPORTED_MODULE_5__app_component__["a" /* MyApp */],
            __WEBPACK_IMPORTED_MODULE_6__pages_home_home__["a" /* HomePage */],
            __WEBPACK_IMPORTED_MODULE_7__pages_inbox_inbox__["a" /* Inbox */],
            __WEBPACK_IMPORTED_MODULE_8__pages_message_message__["a" /* Message */],
            __WEBPACK_IMPORTED_MODULE_9__pages_profilepage_profilepage__["a" /* ProfilePage */],
            __WEBPACK_IMPORTED_MODULE_10__pages_login_login__["a" /* LoginPage */],
            __WEBPACK_IMPORTED_MODULE_11__pages_userpage_userpage__["a" /* UserPage */],
            __WEBPACK_IMPORTED_MODULE_12__pages_onboarding_roleChoice_roleChoice__["a" /* OnboardingPage */],
            __WEBPACK_IMPORTED_MODULE_13__pages_tutorRegister_tutorRegister__["a" /* TutorRegister */],
            __WEBPACK_IMPORTED_MODULE_14__pages_category_category__["a" /* Category */],
            __WEBPACK_IMPORTED_MODULE_19__pages_request_request__["a" /* RequestPopover */],
            __WEBPACK_IMPORTED_MODULE_15__pages_preOnboarding_preOnboarding__["a" /* PreOnboarding */]
        ],
        imports: [
            __WEBPACK_IMPORTED_MODULE_0__angular_platform_browser__["a" /* BrowserModule */],
            __WEBPACK_IMPORTED_MODULE_2_ionic_angular__["d" /* IonicModule */].forRoot(__WEBPACK_IMPORTED_MODULE_5__app_component__["a" /* MyApp */])
        ],
        bootstrap: [__WEBPACK_IMPORTED_MODULE_2_ionic_angular__["b" /* IonicApp */]],
        entryComponents: [
            __WEBPACK_IMPORTED_MODULE_5__app_component__["a" /* MyApp */],
            __WEBPACK_IMPORTED_MODULE_6__pages_home_home__["a" /* HomePage */],
            __WEBPACK_IMPORTED_MODULE_7__pages_inbox_inbox__["a" /* Inbox */],
            __WEBPACK_IMPORTED_MODULE_12__pages_onboarding_roleChoice_roleChoice__["a" /* OnboardingPage */],
            __WEBPACK_IMPORTED_MODULE_8__pages_message_message__["a" /* Message */],
            __WEBPACK_IMPORTED_MODULE_9__pages_profilepage_profilepage__["a" /* ProfilePage */],
            __WEBPACK_IMPORTED_MODULE_10__pages_login_login__["a" /* LoginPage */],
            __WEBPACK_IMPORTED_MODULE_11__pages_userpage_userpage__["a" /* UserPage */],
            __WEBPACK_IMPORTED_MODULE_13__pages_tutorRegister_tutorRegister__["a" /* TutorRegister */],
            __WEBPACK_IMPORTED_MODULE_14__pages_category_category__["a" /* Category */],
            __WEBPACK_IMPORTED_MODULE_19__pages_request_request__["a" /* RequestPopover */]
        ],
        providers: [
            __WEBPACK_IMPORTED_MODULE_4__ionic_native_status_bar__["a" /* StatusBar */],
            __WEBPACK_IMPORTED_MODULE_3__ionic_native_splash_screen__["a" /* SplashScreen */],
            __WEBPACK_IMPORTED_MODULE_16__shared_ds_service__["a" /* DsService */],
            __WEBPACK_IMPORTED_MODULE_17__shared_recordlisten_service__["a" /* RecordListenService */],
            __WEBPACK_IMPORTED_MODULE_18__ionic_native_in_app_browser__["a" /* InAppBrowser */],
            { provide: __WEBPACK_IMPORTED_MODULE_1__angular_core__["v" /* ErrorHandler */], useClass: __WEBPACK_IMPORTED_MODULE_2_ionic_angular__["c" /* IonicErrorHandler */] }
        ]
    })
], AppModule);

//# sourceMappingURL=app.module.js.map

/***/ }),

/***/ 281:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return MyApp; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(9);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__ionic_native_status_bar__ = __webpack_require__(204);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__ionic_native_splash_screen__ = __webpack_require__(202);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__pages_home_home__ = __webpack_require__(45);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__pages_inbox_inbox__ = __webpack_require__(112);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__pages_profilepage_profilepage__ = __webpack_require__(57);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__pages_login_login__ = __webpack_require__(210);
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
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["_13" /* ViewChild */])(__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["g" /* Nav */]),
    __metadata("design:type", __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["g" /* Nav */])
], MyApp.prototype, "nav", void 0);
MyApp = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["n" /* Component */])({template:/*ion-inline-start:"/home/robin/ionic-BigBlueTutor/bigbluetutor-client/ionic-BigBlueTutor/src/app/app.html"*/'<ion-nav [root]="rootPage" #content></ion-nav>\n\n<ion-menu [content]="content">\n  <ion-content class="menu">\n    <h1>{{username}}</h1>\n    <button ion-item *ngFor="let page of pages" (click)="openPage(page)">{{page.title}}</button>\n  </ion-content>\n</ion-menu>\n'/*ion-inline-end:"/home/robin/ionic-BigBlueTutor/bigbluetutor-client/ionic-BigBlueTutor/src/app/app.html"*/
    }),
    __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["j" /* Platform */], __WEBPACK_IMPORTED_MODULE_2__ionic_native_status_bar__["a" /* StatusBar */], __WEBPACK_IMPORTED_MODULE_3__ionic_native_splash_screen__["a" /* SplashScreen */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["e" /* MenuController */]])
], MyApp);

//# sourceMappingURL=app.component.js.map

/***/ }),

/***/ 284:
/***/ (function(module, exports) {

/* (ignored) */

/***/ }),

/***/ 305:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return PreOnboarding; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(9);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__shared_ds_service__ = __webpack_require__(14);
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
        selector: 'page-preOnboarding',template:/*ion-inline-start:"/home/robin/ionic-BigBlueTutor/bigbluetutor-client/ionic-BigBlueTutor/src/pages/preOnboarding/preOnboarding.html"*/'<ion-content padding class="onboarding">\n  <ion-slides pager>\n    <ion-slide>\n      <ion-img class="onboardingimg" src="./assets/OBimgs/OB1.png"></ion-img>\n      <h1 class="onboardingtitle">TUTORING ANYWHERE ANYTIME</h1>\n      <p class="onboardingtext">\nLorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque in lobortis sapien, vel semper risus.</p>\n    </ion-slide>\n\n    <ion-slide>\n      <ion-img class="onboardingimg" src="./assets/OBimgs/OB2.png"></ion-img>\n      <h1 class="onboardingtitle">QUICKLY CONNECT</h1>\n      <p class="onboardingtext">\nLorem ipsum dolor sit amet, consectetur adipiscing elit.</p>\n    </ion-slide>\n\n    <ion-slide>\n      <ion-img class="onboardingimg" src="./assets/OBimgs/OB3.png"></ion-img>\n      <h1 class="onboardingtitle">DOWNLOAD BIGBLUEBUTTON</h1>\n      <p class="onboardingtext">\nLorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque in lobortis sapien, vel semper risus.</p>\n    </ion-slide>\n  </ion-slides>\n\n</ion-content>\n\n<div class="btndiv" ng-controller="slideCtrl">\n  <button [navPush]="TutorRegister" ion-button round class="nextbtn">NEXT</button>\n</div>\n'/*ion-inline-end:"/home/robin/ionic-BigBlueTutor/bigbluetutor-client/ionic-BigBlueTutor/src/pages/preOnboarding/preOnboarding.html"*/,
    }),
    __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["h" /* NavController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["i" /* NavParams */], __WEBPACK_IMPORTED_MODULE_2__shared_ds_service__["a" /* DsService */]])
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
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(9);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__profilepage_profilepage__ = __webpack_require__(57);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__userpage_userpage__ = __webpack_require__(111);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__category_category__ = __webpack_require__(209);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__shared_ds_service__ = __webpack_require__(14);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__shared_recordlisten_service__ = __webpack_require__(59);
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
        var categoryData = ds.dataRecord.get('categories');
        this.categories = [];
        this.tutorsData = {};
        this.tutors = {};
        for (var category in categoryData) {
            this.categories.push(category);
            ds.dsInstance.rpc.make('search/tutor', { subject: category }, function (error, data) {
                this.tutorsData[data.subject] = data.data;
                this.tutors[data.subject] = data.data;
            }.bind(this));
            ds.dsInstance.event.subscribe('tutor/' + category, function (data) {
                this.tutorsData[data.subject] = data.data;
                this.tutors[data.subject] = data.data;
            }.bind(this));
        }
    }
    HomePage.prototype.onInput = function (event) {
        var categoryData = this.ds.dataRecord.get('categories');
        this.categories = [];
        for (var category in categoryData) {
            var subCategories = categoryData[category];
            for (var i = 0; i < subCategories.length; i++) {
                this.categories.push(subCategories[i]);
            }
        }
        this.categories = this.categories.filter(function (text) {
            return text.includes(this.search);
        }.bind(this));
        //    this.tutors = tutorsData.filter(function(text) {
        //      return text.includes(this.search);
        //    }.bind(this));
    };
    HomePage.prototype.categorySelected = function (category) {
        this.navCtrl.setRoot(__WEBPACK_IMPORTED_MODULE_4__category_category__["a" /* Category */], { category: category });
    };
    HomePage.prototype.userSelected = function (tutor) {
        if (tutor === this.ds.profileRecord.get('username')) {
            this.navCtrl.push(__WEBPACK_IMPORTED_MODULE_2__profilepage_profilepage__["a" /* ProfilePage */]);
        }
        else {
            this.navCtrl.setRoot(__WEBPACK_IMPORTED_MODULE_3__userpage_userpage__["a" /* UserPage */], { user: tutor });
        }
    };
    return HomePage;
}());
HomePage = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["n" /* Component */])({
        selector: 'page-home',template:/*ion-inline-start:"/home/robin/ionic-BigBlueTutor/bigbluetutor-client/ionic-BigBlueTutor/src/pages/home/home.html"*/'<ion-header>\n  <ion-navbar>\n    <button ion-button menuToggle>\n      <ion-icon name="menu"></ion-icon>\n    </button>\n    <ion-title>\n      BigBlueTutor\n    </ion-title>\n  </ion-navbar>\n  <ion-searchbar class="searchbar" [(ngModel)]="search" (ionInput)="onInput($event)">\n  </ion-searchbar>\n  <div class="space"></div>\n</ion-header>\n\n<ion-content padding class="categorycontainer">\n  <ion-list>\n    <div *ngFor="let category of categories" class="tutorchoices">\n      <h1 id="tutors-heading2" class="categoryheading">{{ category }}</h1>\n      <ion-list class="nomargin">\n        <div *ngFor="let tutor of tutors[category]" class="profileitem" (click)="userSelected(tutor)">\n          <div class="profilecard">\n            <img src="./assets/icon/default-profile.png" class="home_profilepic"/>\n            <h1 class="card_name">{{ tutor.username }}</h1>\n            <p class="card_info">{{ tutor.position }}\n            {{ tutor.catagories }}</p>\n          </div>\n        </div>\n      </ion-list>\n    </div>\n  </ion-list>\n</ion-content>\n'/*ion-inline-end:"/home/robin/ionic-BigBlueTutor/bigbluetutor-client/ionic-BigBlueTutor/src/pages/home/home.html"*/
    }),
    __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["h" /* NavController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["a" /* Events */], __WEBPACK_IMPORTED_MODULE_5__shared_ds_service__["a" /* DsService */], __WEBPACK_IMPORTED_MODULE_6__shared_recordlisten_service__["a" /* RecordListenService */]])
], HomePage);

//# sourceMappingURL=home.js.map

/***/ }),

/***/ 57:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ProfilePage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(9);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__shared_ds_service__ = __webpack_require__(14);
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
        selector: 'page-profile',template:/*ion-inline-start:"/home/robin/ionic-BigBlueTutor/bigbluetutor-client/ionic-BigBlueTutor/src/pages/profilepage/profilepage.html"*/'<ion-header>\n  <ion-navbar>\n    <button ion-button menuToggle>\n      <ion-icon name=\'menu\'></ion-icon>\n    </button>\n    <ion-title>\n      Profile\n    </ion-title>\n  </ion-navbar>\n</ion-header>\n\n<ion-content padding>\n  <div id="profileInfo">\n    <img width="150px" height="150px" src="images/icon.png"/>\n    <div id="name">{{username}}</div>\n    Online\n  </div>\n</ion-content>\n'/*ion-inline-end:"/home/robin/ionic-BigBlueTutor/bigbluetutor-client/ionic-BigBlueTutor/src/pages/profilepage/profilepage.html"*/,
    }),
    __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["h" /* NavController */], __WEBPACK_IMPORTED_MODULE_2__shared_ds_service__["a" /* DsService */]])
], ProfilePage);

//# sourceMappingURL=profilepage.js.map

/***/ }),

/***/ 59:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return RecordListenService; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(9);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__ds_service__ = __webpack_require__(14);
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
    __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["a" /* Events */], __WEBPACK_IMPORTED_MODULE_2__ds_service__["a" /* DsService */]])
], RecordListenService);

//# sourceMappingURL=recordlisten.service.js.map

/***/ })

},[213]);
//# sourceMappingURL=main.js.map