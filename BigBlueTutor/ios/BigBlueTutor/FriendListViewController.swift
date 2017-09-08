//
//  FriendListViewController.swift
//  BigBlueTutor
//
//  Created by First User on 2017-08-16.
//  Copyright © 2017 Blindside Networks. All rights reserved.
//

import UIKit
import SwiftyJSON

class FriendListViewController: UIViewController {

    var table = UITableView()
    var text = UITextField()
    var add = UIButton()
    
    var contacts = [String]()
    var pendingContacts = [String]()
    
    override func loadView() {
        super.loadView()
        table.delegate = self
        table.dataSource = self
        table.backgroundColor = .white
        
        text.placeholder = "friend's name"
        text.backgroundColor = .white
        
        add.titleLabel!.text = "+"
        add.addTarget(self, action:#selector(addFriend), for: .touchUpInside)
        add.backgroundColor = .white
        
        table.translatesAutoresizingMaskIntoConstraints = false
        text.translatesAutoresizingMaskIntoConstraints = false
        add.translatesAutoresizingMaskIntoConstraints = false
        
        view.addSubview(table)
        view.addSubview(text)
        view.addSubview(add)
    }
    
    override func viewDidLoad() {
        super.viewDidLoad()
        
        NSLayoutConstraint.activate([
            text.topAnchor.constraint(equalTo: view.layoutMarginsGuide.topAnchor, constant: 16),
            text.leftAnchor.constraint(equalTo: view.layoutMarginsGuide.leftAnchor),
            text.widthAnchor.constraint(equalTo: view.layoutMarginsGuide.widthAnchor, multiplier: 0.75),
            text.heightAnchor.constraint(equalTo: view.layoutMarginsGuide.heightAnchor, multiplier: 0.05),
            add.topAnchor.constraint(equalTo: view.layoutMarginsGuide.topAnchor, constant: 16),
            add.leftAnchor.constraint(equalTo: text.rightAnchor, constant: 16),
            add.rightAnchor.constraint(equalTo: view.layoutMarginsGuide.rightAnchor),
            add.heightAnchor.constraint(equalTo: view.layoutMarginsGuide.heightAnchor, multiplier: 0.05),
            table.topAnchor.constraint(equalTo: text.bottomAnchor, constant: 32),
            table.leftAnchor.constraint(equalTo: view.layoutMarginsGuide.leftAnchor),
            table.rightAnchor.constraint(equalTo: view.layoutMarginsGuide.rightAnchor),
            table.bottomAnchor.constraint(equalTo: view.layoutMarginsGuide.bottomAnchor)
            ])
    }
    
    override func viewDidAppear(_ animated: Bool) {
        super.viewDidAppear(animated)
        guard let record = MainViewController.instance.record else { return }
        record.subscribe("pendingContacts", recordPathChangedCallback: self)
        record.subscribe("contacts", recordPathChangedCallback: self, triggerNow: true)
    }

    override func viewDidDisappear(_ animated: Bool) {
        super.viewDidDisappear(animated)
        guard let record = MainViewController.instance.record else { return }
        record.unsubscribe("pendingContacts", recordPathChangedCallback: self)
        record.unsubscribe("contacts", recordPathChangedCallback: self)
    }
    
    func addFriend(sender: UIButton) {
        print(text.text ?? "nil")
        guard let client = MainViewController.client, let text = text.text else { return }
        DispatchQueue.global(qos: .background).async {
            client.rpc.make("addContact", data: ["contact":text,"client":MainViewController.instance.auth.username].jsonElement)
        }
    }
    
    override func didReceiveMemoryWarning() {
        super.didReceiveMemoryWarning()
        // Dispose of any resources that can be recreated.
    }
}

extension FriendListViewController: RecordPathChangedCallback {
    func onRecordPathChanged(_ recordName: String!, path: String!, data: JsonElement!) {
        print("got it")
        guard let record = MainViewController.instance.record else { return }
        if path == "contacts" {
            guard let newContacts = record.get("contacts").getAsJsonArray().array as? [String] else { return }
            print(newContacts)
            contacts = newContacts
        }else if (path == "pendingContacts") {
            guard let newPendingContacts = record.get("pendingContacts").getAsJsonArray().array as? [String] else { return }
            pendingContacts = newPendingContacts
        }
        DispatchQueue.main.async {
            self.table.reloadData()
        }
    }
}

extension FriendListViewController: UITableViewDataSource {
    func tableView(_ tableView: UITableView, numberOfRowsInSection section: Int) -> Int {
        return contacts.count + pendingContacts.count
    }
    
    func tableView(_ tableView: UITableView, cellForRowAt indexPath: IndexPath) -> UITableViewCell {
        var contact = ""
        var isContact = false
        if indexPath.row > contacts.count - 1 {
            contact = pendingContacts[indexPath.row - contacts.count]
        }else {
           contact = contacts[indexPath.row]   
            isContact = true
        }
        let cell = UITableViewCell(style: .subtitle, reuseIdentifier: "cell")
        cell.textLabel!.text = contact
        if (isContact) {
            cell.detailTextLabel!.text = "Friend, "
        }else {
            cell.textLabel!.textColor = .gray
            cell.detailTextLabel!.textColor = .gray
            cell.detailTextLabel!.text = "friend request, Offline"
        }
        return cell
    }
}

extension FriendListViewController: UITableViewDelegate {
    func tableView(_ tableView: UITableView, didSelectRowAt indexPath: IndexPath) {
        guard let client = MainViewController.client else { return }
        var contact = ""
        if indexPath.row > self.contacts.count - 1 {
            contact = self.pendingContacts[indexPath.row - self.contacts.count]
            DispatchQueue.global(qos: .background).async {
                client.rpc.make("addContact", data: ["contact":contact, "client":MainViewController.instance.auth.username].jsonElement)
            }
        }else {
            contact = self.contacts[indexPath.row]
            DispatchQueue.global(qos: .background).async {
                client.rpc.make("requestMeeting", data: ["contact":contact, "client":MainViewController.instance.auth.username].jsonElement)
            }
            /*
            DispatchQueue.main.async {
                MainViewController.instance.showDetailViewController(ChatViewController(), sender: self)
            }*/
        }
    }
}
