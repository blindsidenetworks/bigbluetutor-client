//
//  WebRTCVideoView.swift
//  BigBlueButton
//
//  Created by First User on 2017-07-19.
//  Copyright © 2017 BigBlueButton. All rights reserved.
//

import Foundation
import WebRTC
import Starscream

class WebRTCVideoView: RTCEAGLVideoView, Dynamic {
    var initialBounds = CGRect()
    var initialFrame: CGRect?
    
    var verto:Verto?
    //Websocket
    var socket:WebSocket?
    let LOGIN_MESSAGE_ID = 1
    let BYE_MESSAGE_ID = 5
    
    //Parameters
    var fsLogin:String = ""
    var fsPassword:String = ""
    var fsVoiceBridgeNumber:String = ""
    var sessId:String = ""
    var callerIdName:String = ""
    var callerIdNumber:String = ""
    var fsWebSocketUrl:String = ""
    
    //RTC
    let configuration = RTCConfiguration()
    var peerConnection:RTCPeerConnection?
    var factory = RTCPeerConnectionFactory()
    var localSessionDescription = ""
    var totalIceCandidates = 0;
    var state = ""
    
    //Video
    var videoTrack: RTCVideoTrack?
    
    var defaultOfferConstraints: RTCMediaConstraints {
        let mandatoryConstraints = [
            "OfferToReceiveAudio": "false",
            "OfferToReceiveVideo": "true"
        ]
        return RTCMediaConstraints(mandatoryConstraints:mandatoryConstraints, optionalConstraints:nil)
    }
    
    func call () {
        if let bigBlueButtonViewController = BigBlueButtonViewController.bigBlueButtonViewController {
            fsLogin = bigBlueButtonViewController.fsLogin
            fsPassword = bigBlueButtonViewController.fsPassword
            fsVoiceBridgeNumber = "\(bigBlueButtonViewController.fsVoiceBridgeNumber)-screen"
            sessId = bigBlueButtonViewController.sessId
            callerIdName = bigBlueButtonViewController.callerIdName
            callerIdNumber = bigBlueButtonViewController.callerIdNumber
            fsWebSocketUrl = bigBlueButtonViewController.fsWebSocketUrl
        }
        
        self.socket = WebSocket(url: URL(string: fsWebSocketUrl)!)
        self.socket!.delegate = self
        self.socket!.connect()
    }
    
    func parseJSON(string:String) -> Any {
        do {
            return try JSONSerialization.jsonObject(with: string.data(using: String.Encoding.utf8)!, options: [])
        }catch {
            log(text: "parse fail")
        }
        return ""
    }
    
    func jsonify(data:Any) -> String {
        do {
            var jsonData:Data
            try jsonData = JSONSerialization.data(withJSONObject: data, options: [])
            return String(data: jsonData, encoding: String.Encoding.utf8) ?? ""
        }catch {
            log(text: "jsonify fail")
        }
        return ""
    }
    
    func log(text:String) {
        DispatchQueue.main.async {
            let date = Date()
            let dateFormatter = DateFormatter()
            dateFormatter.timeStyle = .medium
            print("SCREENSHARE:\(dateFormatter.string(from: date)) \(text)")
        }
    }
}

extension WebRTCVideoView : WebSocketDelegate {
    // Websocket Delegate Methods.
    
    func websocketDidConnect(socket: WebSocket) {
        verto = Verto(socket: self.socket!)
        verto!.delegate = self
        if let verto = verto {
            verto.login(login: fsLogin, password: fsPassword, sessId: "")
        }
    }
    
    func websocketDidDisconnect(socket: WebSocket, error: NSError?) {
    }
    
    func websocketDidReceiveMessage(socket: WebSocket, text: String) {
        if let verto = verto {
            verto.parseMessage(text: text)
        }
    }
    
    
    func websocketDidReceiveData(socket: WebSocket, data: Data) {
        log(text: "Websocket received data")
    }
}

extension WebRTCVideoView: VertoDelegate {
    func loggedIn() {
        doRtcOffer()
    }
    func remoteSdp(sdp:RTCSessionDescription) {
        peerConnection?.setRemoteDescription(sdp, completionHandler: {_ in})
    }
}

extension WebRTCVideoView : RTCPeerConnectionDelegate {
    func doRtcOffer () {
        totalIceCandidates = 0
        let connectionConstraintsDict = ["DtlsSrtpKeyAgreement": "true"]
        let connectionConstraints = RTCMediaConstraints(mandatoryConstraints: nil, optionalConstraints: connectionConstraintsDict);
        
        configuration.iceServers = [RTCIceServer(urlStrings: ["stun:stun.l.google.com:19302", "stun:stun1.l.google.com:19302", "stun:stun2.l.google.com:19302", "stun:stun3.l.google.com:19302", "stun:stun4.l.google.com:19302" ])]
        configuration.bundlePolicy = .balanced
        configuration.rtcpMuxPolicy = .negotiate
        configuration.iceTransportPolicy = .all
        
        self.peerConnection = factory.peerConnection(with: configuration, constraints: connectionConstraints, delegate: self)
        
        peerConnection?.offer(for: self.defaultOfferConstraints, completionHandler: { ( sdp : RTCSessionDescription?, error: Error?) in
            if let sdp = sdp {
                self.localSessionDescription = sdp.sdp
                self.peerConnection?.setLocalDescription(sdp, completionHandler: { (error: Error?) in
                    self.log(text: "Local descriptor set")
                })
            }
        })
    }
    
    
    /** Called when the SignalingState changed. */
    internal func peerConnection(_ peerConnection: RTCPeerConnection, didChange stateChanged: RTCSignalingState) {
        log(text: "1");
    }
    
    /** Called when media is received on a new stream from remote peer. */
    internal func peerConnection(_ peerConnection: RTCPeerConnection, didAdd stream: RTCMediaStream) {
        log(text: "2");
        DispatchQueue.main.async {
            print(stream.videoTracks)
            if (!stream.videoTracks.isEmpty) {
                print(stream.videoTracks[0])
                self.videoTrack = stream.videoTracks[0]
                self.videoTrack!.add(self)
            }
        }
    }
    
    /** Called when a remote peer closes a stream. */
    internal func peerConnection(_ peerConnection: RTCPeerConnection, didRemove stream: RTCMediaStream) {
        log(text: "3");
    }
    
    /** Called when negotiation is needed, for example ICE has restarted. */
    internal func peerConnectionShouldNegotiate(_ peerConnection: RTCPeerConnection) {
        log(text: "4");
    }
    
    /** Called any time the IceConnectionState changes. */
    internal func peerConnection(_ peerConnection: RTCPeerConnection, didChange newState: RTCIceConnectionState) {
        log(text: "5");
    }
    
    /** Called any time the IceGatheringState changes. */
    internal func peerConnection(_ peerConnection: RTCPeerConnection, didChange newState: RTCIceGatheringState) {
        log(text: "IceGatheringState changed to \(newState.rawValue)")
    }
    
    /** New ice candidate has been found. */
    internal func peerConnection(_ peerConnection: RTCPeerConnection, didGenerate candidate: RTCIceCandidate) {
        totalIceCandidates += 1
        DispatchQueue.main.async{
            let previousIceCandidates = self.totalIceCandidates
            Timer.scheduledTimer(withTimeInterval: 0.1, repeats: false){_ in
                if (previousIceCandidates == self.totalIceCandidates) {
                    self.peerConnection?.offer(for: self.defaultOfferConstraints, completionHandler: { ( sdp : RTCSessionDescription?, error: Error?) in
                        if let sdp = sdp {
                            self.localSessionDescription = sdp.sdp
                            self.peerConnection?.setLocalDescription(sdp, completionHandler: { (error: Error?) in
                                self.log(text: "New Local descriptor set")
                            })
                            if let verto = self.verto {
                                verto.inviteVideo(sdp: sdp.sdp, login: self.fsLogin, voiceBridgeNumber: self.fsVoiceBridgeNumber, callerIdName: self.callerIdName, callerIdNumber: self.callerIdNumber, sessId: self.sessId)
                            }
                        }
                    })
                }
            }
        }
        
    }
    
    /** Called when a group of local Ice candidates have been removed. */
    internal func peerConnection(_ peerConnection: RTCPeerConnection, didRemove candidates: [RTCIceCandidate]) {
        log(text: "8");
    }
    
    /** New data channel has been opened. */
    internal func peerConnection(_ peerConnection: RTCPeerConnection, didOpen dataChannel: RTCDataChannel) {
        log(text: "9");
    }
}
