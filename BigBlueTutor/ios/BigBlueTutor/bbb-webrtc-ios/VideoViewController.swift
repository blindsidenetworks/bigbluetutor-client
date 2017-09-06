//
//  VideoViewController.swift
//  BigBlueButton
//
//  Created by First User on 2017-07-06.
//  Copyright © 2017 BigBlueButton. All rights reserved.
//

// Functionality replaced by ScreenShareViewController
/*
import UIKit
import WebRTC

class VideoViewController: UIViewController {
    
    let videoView = RTCEAGLVideoView()

    override func loadView() {
        view = videoView
    }
    
    override func viewDidLoad() {
        super.viewDidLoad()
        
        let panGesture = UIPanGestureRecognizer(target: self, action: #selector(self.returnToMainView(_:)))
        panGesture.minimumNumberOfTouches = 3
        panGesture.delegate = self
        view.addGestureRecognizer(panGesture)
    }

    override func didReceiveMemoryWarning() {
        super.didReceiveMemoryWarning()
        // Dispose of any resources that can be recreated.
    }

}

extension VideoViewController: UIGestureRecognizerDelegate {
    func returnToMainView(_ sender: UIPanGestureRecognizer) {
        dismiss(animated: false, completion: nil)
    }
}
*/
