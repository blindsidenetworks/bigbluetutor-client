//
//  HomeViewController.swift
//  BigBlueTutor
//
//  Created by First User on 2017-08-16.
//  Copyright © 2017 Blindside Networks. All rights reserved.
//

import UIKit
import SwiftyJSON

class HomeViewController: UIViewController {

    let table = UITableView()
    
    let btnBrowse = UIButton(type: .system)
    
    var model = [String]()
    
    override func loadView() {
        super.loadView()
        view.backgroundColor = UIColor.white
        btnBrowse.backgroundColor = .red
        btnBrowse.setTitle("Browse", for: .normal)
        btnBrowse.addTarget(self, action: #selector(browseClicked), for: .touchUpInside)
        view.addSubview(table)
        view.addSubview(btnBrowse)
        
        table.translatesAutoresizingMaskIntoConstraints = false
        btnBrowse.translatesAutoresizingMaskIntoConstraints = false
    }
    
    override func viewDidLoad() {
        super.viewDidLoad()
        
        table.dataSource = self
        table.delegate = self
        
        NSLayoutConstraint.activate([
            btnBrowse.topAnchor.constraint(equalTo: view.layoutMarginsGuide.topAnchor, constant: 16),
            btnBrowse.heightAnchor.constraint(equalTo: view.layoutMarginsGuide.heightAnchor, multiplier: 0.1),
            btnBrowse.rightAnchor.constraint(equalTo: view.layoutMarginsGuide.rightAnchor, constant: 16),
            btnBrowse.widthAnchor.constraint(equalTo: view.layoutMarginsGuide.widthAnchor, multiplier: 0.2),
            table.heightAnchor.constraint(equalTo: view.layoutMarginsGuide.heightAnchor, multiplier: 0.75),
            table.leftAnchor.constraint(equalTo: view.layoutMarginsGuide.leftAnchor),
            table.rightAnchor.constraint(equalTo: view.layoutMarginsGuide.rightAnchor),
            table.bottomAnchor.constraint(equalTo: view.layoutMarginsGuide.bottomAnchor)
        ])
    }
    
    override func viewDidAppear(_ animated: Bool) {
        super.viewDidAppear(animated)
        MainViewController.instance.record.subscribe("pendingMeetings", recordPathChangedCallback: self, triggerNow: true)
    }
    
    override func viewDidDisappear(_ animated: Bool) {
        super.viewDidDisappear(animated)
        MainViewController.instance.record.unsubscribe("pendingMeetings", recordPathChangedCallback: self)
    }

    func browseClicked(sender: UIButton) {
        //uncomment this
        /*
        DispatchQueue.main.async{
            let viewController = MainViewController.instance
            viewController.showDetailViewController(viewController.browseViewController, sender: viewController)
        }
        */
        //remove this
        DispatchQueue.main.async {
            MainViewController.instance.showDetailViewController(ChatViewController(), sender: self)
        }
    }
    
    override func didReceiveMemoryWarning() {
        super.didReceiveMemoryWarning()
        // Dispose of any resources that can be recreated.
    }

}

extension HomeViewController: RecordPathChangedCallback {
    func onRecordPathChanged(_ recordName: String!, path: String!, data: JsonElement!) {
        guard let record = MainViewController.instance.record else { return }
        guard let pendingMeetings = record.get("pendingMeetings").getAsJsonArray().array as? [String] else { return }
        model = pendingMeetings
        DispatchQueue.main.async {
            self.table.reloadData()
        }
    }
}

extension HomeViewController: UITableViewDelegate {
    func tableView(_ tableView: UITableView, didSelectRowAt indexPath: IndexPath) {
        guard let client = MainViewController.client else { return }
        let contact = model[indexPath.row]
        DispatchQueue.global(qos: .background).async {
            client.rpc.make("requestMeeting", data: ["contact":contact, "client":MainViewController.instance.auth.username].jsonElement)
        }
    }
}

extension HomeViewController: UITableViewDataSource {
    func tableView(_ tableView: UITableView, numberOfRowsInSection section: Int) -> Int {
        return model.count
    }
    func tableView(_ tableView: UITableView, cellForRowAt indexPath: IndexPath) -> UITableViewCell {
        let cell = UITableViewCell(style: .subtitle, reuseIdentifier: "cell")
        cell.textLabel!.text = model[indexPath.row]
        cell.detailTextLabel!.text = "Would like to join a meeting with you"
        return cell
    }
}
