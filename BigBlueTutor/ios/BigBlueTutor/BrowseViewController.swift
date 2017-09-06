//
//  BrowseViewController.swift
//  BigBlueTutor
//
//  Created by First User on 2017-08-30.
//  Copyright © 2017 Blindside Networks. All rights reserved.
//

import UIKit

class BrowseViewController: UIViewController {

    let table = UITableView()
    var model = [String]()
    let btnBack = UIButton()
    let btnTutor = UIButton()
    
    var tutorsRecord:Record!
    
    override func loadView() {
        super.loadView()
        view.backgroundColor = UIColor.white
        btnBack.backgroundColor = .red
        btnBack.setTitle("Home", for: .normal)
        btnBack.addTarget(self, action: #selector(back), for: .touchUpInside)
        btnTutor.backgroundColor = .blue
        btnTutor.setTitle("Tutor This", for: .normal)
        btnTutor.addTarget(self, action: #selector(tutor), for: .touchUpInside)
        view.addSubview(table)
        view.addSubview(btnBack)
        
        table.translatesAutoresizingMaskIntoConstraints = false
        btnBack.translatesAutoresizingMaskIntoConstraints = false
    }
    
    override func viewDidAppear(_ animated: Bool) {
        super.viewDidAppear(animated)
        guard let client = MainViewController.client else { return }
        tutorsRecord = client.record.getRecord("tutor")
        if let record = tutorsRecord {
            if let arr = record.get("tutors").getAsJsonArray().array as? [String] {
                if !(arr.contains(MainViewController.instance.auth.username) || view.subviews.contains(btnTutor)) {
                    view.addSubview(btnTutor)
                    btnTutor.translatesAutoresizingMaskIntoConstraints = false
                    NSLayoutConstraint.activate([
                        btnTutor.topAnchor.constraint(equalTo: view.layoutMarginsGuide.topAnchor, constant: 16),
                        btnTutor.leftAnchor.constraint(equalTo: btnBack.rightAnchor, constant: 32),
                        btnTutor.heightAnchor.constraint(equalTo: btnBack.heightAnchor),
                        btnTutor.widthAnchor.constraint(equalTo: btnBack.widthAnchor)
                        ])
                }
            }
            record.subscribe(self, triggerNow: true)
        }
    }
    
    override func viewDidLoad() {
        super.viewDidLoad()
        table.delegate = self
        table.dataSource = self
        
        NSLayoutConstraint.activate([
            btnBack.topAnchor.constraint(equalTo: view.layoutMarginsGuide.topAnchor, constant: 16),
            btnBack.heightAnchor.constraint(equalTo: view.layoutMarginsGuide.heightAnchor, multiplier: 0.1),
            btnBack.leftAnchor.constraint(equalTo: view.layoutMarginsGuide.leftAnchor, constant: 24),
            btnBack.widthAnchor.constraint(equalTo: view.layoutMarginsGuide.widthAnchor, multiplier: 0.2),
            table.heightAnchor.constraint(equalTo: view.layoutMarginsGuide.heightAnchor, multiplier: 0.85),
            table.leftAnchor.constraint(equalTo: view.layoutMarginsGuide.leftAnchor),
            table.rightAnchor.constraint(equalTo: view.layoutMarginsGuide.rightAnchor),
            table.bottomAnchor.constraint(equalTo: view.layoutMarginsGuide.bottomAnchor)
            ])
        // Do any additional setup after loading the view.
    }
    
    //stop subscribing
    override func viewDidDisappear(_ animated: Bool) {
        super.viewDidDisappear(animated)
        
    }

    override func didReceiveMemoryWarning() {
        super.didReceiveMemoryWarning()
        // Dispose of any resources that can be recreated.
    }
    
    func tutor(sender: UIButton) {
        guard let client = MainViewController.client, let auth = MainViewController.instance.auth else { return }
        DispatchQueue.global(qos: .background).async {
            client.rpc.make("tutor", data: ["username":auth.username,"password":auth.password].jsonElement)
        }
        DispatchQueue.main.async {
            sender.removeFromSuperview()
        }
    }
    
    func back(sender: UIButton) {
        DispatchQueue.main.async{
            let viewController = MainViewController.instance
            viewController.showDetailViewController(viewController.homeViewController, sender: viewController)
        }
    }

}

extension BrowseViewController: RecordChangedCallback {
    func onRecordChanged(_ recordName: String!, data: JsonElement!) {
        guard let tutors = tutorsRecord.get("tutors").getAsJsonArray().array as? [String] else { return }
        model = tutors
        DispatchQueue.main.async {
            self.table.reloadData()
        }
    }
}

extension BrowseViewController: UITableViewDataSource {
    func tableView(_ tableView: UITableView, numberOfRowsInSection section: Int) -> Int {
        return model.count
    }
    
    func tableView(_ tableView: UITableView, cellForRowAt indexPath: IndexPath) -> UITableViewCell {
        let cell = UITableViewCell(style: .subtitle, reuseIdentifier: "cell")
        cell.textLabel?.text = model[indexPath.row]
        return cell
    }
}

extension BrowseViewController: UITableViewDelegate {
    func tableView(_ tableView: UITableView, didSelectRowAt indexPath: IndexPath) {
        guard let client = MainViewController.client else { return }
        let tutor = model[indexPath.row]
        DispatchQueue.global(qos: .background).async {
            client.rpc.make("requestMeeting", data: ["contact":tutor, "client":MainViewController.instance.auth.username].jsonElement)
        }
    }
}
