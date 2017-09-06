//
//  AudioMeter.swift
//  BigBlueButton
//
//  Created by First User on 2017-06-29.
//  Copyright © 2017 BigBlueButton. All rights reserved.
//

import Foundation
import UIKit
import WebKit
import AVKit
import AVFoundation

class AudioMeter {
    
    //Microphone metering'
    
    let session = AVAudioSession.sharedInstance()
    var audioRecorder:AVAudioRecorder?
    
    let defaultSettings = [
        AVFormatIDKey: 1768775988,
        AVLinearPCMBitDepthKey: 16,
        AVLinearPCMIsBigEndianKey:0,
        AVLinearPCMIsFloatKey: 0,
        AVNumberOfChannelsKey: 2,
        AVSampleRateKey: 44100
    ]
    
    init() {
    }
    
    func setMicrophone() {
        AVAudioSession.sharedInstance().requestRecordPermission({_ in})
        do {
            try session.setCategory(AVAudioSessionCategoryPlayAndRecord)
            try session.setActive(true)
        }catch {
            print("could not make session active")
        }
        
        do {
            audioRecorder = try AVAudioRecorder(url: URL(fileURLWithPath: NSTemporaryDirectory()).appendingPathComponent("mfile.xxx") , format: AVAudioFormat(settings: defaultSettings))
        }catch {
            print("err")
        }
    }
    
    func microphoneLevelStart(webView: WKWebView) {
        if let audioRecorder = audioRecorder {
            audioRecorder.prepareToRecord()
            audioRecorder.isMeteringEnabled = true
            audioRecorder.record()
            Timer.scheduledTimer(withTimeInterval: 0.05, repeats: true, block: {timer in
                if let audioRecorder = self.audioRecorder {
                    if(!audioRecorder.isRecording) {
                        timer.invalidate()
                    }else{
                        audioRecorder.updateMeters()
                        webView.evaluateJavaScript("var event = new CustomEvent(\"audioInputChange\",{detail: {message: \(self.formatLevel(level: Double(audioRecorder.averagePower(forChannel: 0)))),},bubbles: true,cancelable: true}); window.dispatchEvent(event);", completionHandler: nil)
                    }
                }
            })
        }
    }
    
    func microphoneLevelStop() {
        if let audioRecorder = audioRecorder {
            audioRecorder.stop()
        }
    }
    
    func formatLevel(level:Double) -> Double {
        if level < -55 {
            return 0.0
        }
        return ((level + 55.0)/55.0)*0.3
    }
    
}
