//
//  DynamicVideoView.swift
//  BigBlueButton
//
//  Created by First User on 2017-07-19.
//  Copyright © 2017 BigBlueButton. All rights reserved.
//

import Foundation
import UIKit
import WebRTC

//Plain Vanilla RTCEAGLVideoView that can be moved and resized
class DynamicVideoView: RTCEAGLVideoView, Dynamic {
    var initialBounds = CGRect()
    var initialFrame: CGRect?
}
