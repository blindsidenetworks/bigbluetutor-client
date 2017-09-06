//
//  Dynamic.swift
//  BigBlueButton
//
//  Created by First User on 2017-07-19.
//  Copyright © 2017 BigBlueButton. All rights reserved.
//

import Foundation
import UIKit

protocol Dynamic {
    var initialBounds:CGRect {get set}
    var initialFrame:CGRect? {get set}
}
