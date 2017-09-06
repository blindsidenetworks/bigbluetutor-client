//
//  LoginViewController.swift
//  BigBlueTutor
//
//  Created by First User on 2017-08-14.
//  Copyright © 2017 Blindside Networks. All rights reserved.
//

import UIKit
import React

struct Authentication {
    var username: String
    var password: String
}

@objc(LoginViewController)
class LoginViewController: UIViewController {
    
    var loginView:RCTRootView?
    
    override func loadView() {
        loginView = RCTRootView(bundleURL: URL(string: "http://10.130.218.165:8081/index.ios.bundle?platform=ios"), moduleName: "Login", initialProperties: nil, launchOptions: nil)
        view = loginView!
    }
    
    override func viewDidLoad() {
        super.viewDidLoad()

        // Do any additional setup after loading the view.
    }

    @objc func login(_ username: NSString, password:NSString) {
        DispatchQueue.main.async {
            if let client = MainViewController.client {
                if let loginResult = client.login(["username":username, "password": password].jsonElement) {
                    if(loginResult.loggedIn()) {
                        MainViewController.instance.auth = Authentication(username: username as String, password: password as String)
                        self.login()
                    }
                }
            }else {
                print("hi")
            }
            //self.login()
        }
    }
    
    func login() {
        if let window = UIApplication.shared.delegate!.window as? UIWindow{
            window.rootViewController = MainViewController.instance
            window.makeKeyAndVisible()
            MainViewController.instance.startup()
        }
    }
    
    override func didReceiveMemoryWarning() {
        super.didReceiveMemoryWarning()
        // Dispose of any resources that can be recreated.
    }
}
