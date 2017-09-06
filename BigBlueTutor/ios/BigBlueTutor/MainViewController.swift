//
//  MainViewController.swift
//  BigBlueTutor
//
//  Created by First User on 2017-08-14.
//  Copyright © 2017 Blindside Networks. All rights reserved.
//

import UIKit
import Starscream
import SwiftyJSON

class MainViewController: UISplitViewController {
    
    static let client = DeepstreamClient("tutor-back.blindside-dev.com:6020")
    
    static let instance = MainViewController()
    
    var auth:Authentication!
    //var socket:WebSocket?
    
    //profile data
    var record:Record!
    
    let friendListViewController = FriendListViewController()
    let homeViewController = HomeViewController()
    let browseViewController = BrowseViewController()
    var bigBlueButtonViewController = BigBlueButtonViewController()
    
    override func loadView() {
        viewControllers = [friendListViewController, homeViewController]
        super.loadView()
    }
    
    override func viewDidLoad() {
        super.viewDidLoad()
        // Do any additional setup after loading the view.
    }

    override func didReceiveMemoryWarning() {
        super.didReceiveMemoryWarning()
        // Dispose of any resources that can be recreated.
    }
    
    func startup() {
        create()
        guard let client = MainViewController.client else { return }
        record = client.record.getRecord("profile/\(auth.username)")
        record.subscribe("activeMeeting", recordPathChangedCallback: self)
        //subscribe()
    }
    
    func create() {
        guard let client = MainViewController.client else { return }
        if client.record.has("profile/\(auth.username)").getResult() {
            /*
           guard let record = client.record.getRecord("profile/\(auth.username)") else { return }
            guard let friendData = record.get("contacts").getAsJsonArray().array as? [String],
                let pendingFriendData = record.get("pendingContacts").getAsJsonArray().array as? [String] else { return }
            friendListViewController.contacts = friendData
            friendListViewController.pendingContacts = pendingFriendData
            friendListViewController.table.reloadData()
*/
        }else {
            guard let record = client.record.getRecord("profile/\(auth.username)") else { return }
            record.set([
                "username":auth.username,
                "contacts": [],
                "pendingContacts": [],
                "pendingMeetings": [],
                "requestMeetings": []
            ].jsonElement)
        }
    }
    
    func update() {
        guard let client = MainViewController.client else { return }
        guard let record = client.record.getRecord("profile/\(auth.username)") else { return }
        //Friends
        guard let friendData = record.get("contacts").getAsJsonArray().array as? [String],
            let pendingFriendData = record.get("pendingContacts").getAsJsonArray().array as? [String] else { return }
        DispatchQueue.main.async {
            self.friendListViewController.contacts = friendData
            self.friendListViewController.pendingContacts = pendingFriendData
            self.friendListViewController.table.reloadData()
        }
        
        //Meeting Requests
        guard let meetingData = record.get("pendingMeetings").getAsJsonArray().array as? [String] else { return }
        
        DispatchQueue.main.async {
            self.homeViewController.model = meetingData
            self.homeViewController.table.reloadData()
        }
    }
    
    func subscribe() {
        if let client = MainViewController.client {
            client.event.subscribe("profile/\(auth.username)", eventListener: self)
            client.event.subscribe("profile/\(auth.username)/update", eventListener: self)
            client.record.getRecord("profile/\(auth.username)").subscribe("activeMeeting", recordPathChangedCallback: self)
        }
    }
    
}

extension MainViewController: RecordPathChangedCallback {
    func onRecordPathChanged(_ recordName: String!, path: String!, data: JsonElement!) {
        if (path == "activeMeeting") {
            print(data.getAsString())
            if let url = URL(string: data.getAsString()) {
                DispatchQueue.main.async {
                    self.bigBlueButtonViewController.roomUrl = url
//                    viewController.showDetailViewController(self.bigBlueButtonViewController, sender: self)
                    self.present(self.bigBlueButtonViewController, animated: true, completion: nil)
                }
            }
        }
    }
}

extension MainViewController: EventListener {
    func onEvent(_ eventName: String!, args: Any!) {
        print("EVENT!")
        print(eventName)
        guard let client = MainViewController.client else { return }
        switch eventName {
            case "profile/\(auth.username)":
                break
            case "profile/\(auth.username)/update":
                print("UPDATING")
                //update()
                break
            case "profile/\(auth.username)/add":
                print("REQUEST!")
                guard let record = client.record.getRecord("profile/\(auth.username)/requests") else { return }
                if let arr = record.get().getAsJsonArray().array as? [String:Any] {
                    print("success")
                }else {
                    print("fail")
                }
                /*
                if let contactName = args["name"] as? String {
                    let friendRequestAlert = UIAlertController(title: "Friend Request", message: "\(contactName) sent you a friend request", preferredStyle: .alert)
                    friendRequestAlert.addAction(UIAlertAction(title: "Ignore", style: .cancel, handler: nil))
                    friendRequestAlert.addAction(UIAlertAction(title: "Accept", style: .default, handler: { _ in
                        guard let record = client.record.getRecord("profile/\(contactName)/requests") else {return}
                        record.set(self.auth.username, value: "")
                        if (!self.friendListViewController.contacts.contains(contactName)) {
                            self.friendListViewController.contacts.append(contactName)
                        }
                        if (self.friendListViewController.pendingContacts.index(of: contactName) != -1) {
                            self.friendListViewController.pendingContacts.remove(at: self.friendListViewController.pendingContacts.index(of: contactName)!)
                        }
                        self.friendListViewController.table.reloadData()
                    }))
                    present(friendRequestAlert, animated: true, completion: nil)
                }*/
                break
            default:
                break
        }
    }
}



/*extension MainViewController: WebSocketDelegate {
    func websocketDidConnect(socket: WebSocket) {
        print("connected")
        if let auth = auth {
            let json = JSON([
                "username":auth.username,
                "password":auth.password
                ])
            socket.write(string: json.rawString()!)
        }
        DispatchQueue.main.async {
            Timer(timeInterval: 0.5, repeats: false, block: {_ in 
                socket.write(string: JSON(["method": "get
 "]).rawString()!)
            }).fire()
        }
    }
    
    func websocketDidReceiveData(socket: WebSocket, data: Data) {
        print("data")
    }
    
    func websocketDidDisconnect(socket: WebSocket, error: NSError?) {
        print("disconnected")
    }
    
    func websocketDidReceiveMessage(socket: WebSocket, text: String) {
        if let data = text.data(using: .utf8) {
            let json = JSON(data: data)
            if let method = json["method"].string {
                switch method {
                case "friendRequest":
                    if let friendUsername = json["username"].string {
                        
                        socket.write(string: JSON(["method": "getFriends"]).rawString()!)
                        
                        friendListViewController.model.append(Friend(username: friendUsername, online: false, isFriend: false))
                        let friendRequestAlert = UIAlertController(title: "Friend Request", message: "\(friendUsername) sent you a friend request", preferredStyle: .alert)
                        friendRequestAlert.addAction(UIAlertAction(title: "Ignore", style: .cancel, handler: nil))
                        friendRequestAlert.addAction(UIAlertAction(title: "Accept", style: .default, handler: { (action) in
                            if let socket = MainViewController.instance.socket {
                                let acceptMessage = [
                                    "method": "addFriend",
                                    "friendUsername": friendUsername
                                ]
                                let jsonMessage = JSON(acceptMessage)
                                socket.write(string: jsonMessage.rawString()!)
                            }
                        }))
                        present(friendRequestAlert, animated: true, completion: nil)
                    }
                    break
                case "friends":
                    print("friends update")
                    guard let friends = json["friends"].array, let friendRequests = json["friendRequests"].array else { return }
                    friendListViewController.model = [Friend]()
                    for friend in friends {
                        friendListViewController.model.append(Friend(username: friend.stringValue, online: true, isFriend: true))
                    }
                    for friend in friendRequests {
                        friendListViewController.model.append(Friend(username: friend.stringValue, online: false, isFriend: false))
                    }
                    print(friendListViewController.model.count)
                    friendListViewController.table.reloadData()
                    break
                case "meetingRequest":
                    print("meetingRequest")
                    homeViewController.model.append(json["username"].stringValue)
                    homeViewController.table.reloadData()
                    break
                case "meeting":
                    print("meeting")
                    print(json["url"].stringValue)
                    homeViewController.model = [String]()
                    if let url = URL(string: json["url"].stringValue) {
                        bigBlueButtonViewController.roomUrl = url
//                        showDetailViewController(bigBlueButtonViewController, sender: self)
                        present(bigBlueButtonViewController, animated: true, completion: nil)
                    }
                    break
                default:
                    break
                }
            }
        }
        
    }
}*/
