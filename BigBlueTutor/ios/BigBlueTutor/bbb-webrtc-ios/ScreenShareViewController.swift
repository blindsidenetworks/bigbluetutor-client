//
//  ScreenShareViewController.swift
//  BigBlueButton
//
//  Created by First User on 2017-07-10.
//  Copyright © 2017 BigBlueButton. All rights reserved.
//

//Moved to a view as WebRTCVideoView

/*
import UIKit
import WebRTC
import Starscream

class ScreenShareViewController: UIViewController {

    let videoView = RTCEAGLVideoView()
    
    
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
    
    override func loadView() {
        view = videoView
    }
    
    override func viewDidLoad() {
        super.viewDidLoad()
        
        let panGesture = UIPanGestureRecognizer(target: self, action: #selector(self.returnToMainView(_:)))
        panGesture.minimumNumberOfTouches = 3
        panGesture.delegate = self
        view.addGestureRecognizer(panGesture)
        // Do any additional setup after loading the view.
    }

    override func didReceiveMemoryWarning() {
        super.didReceiveMemoryWarning()
        // Dispose of any resources that can be recreated.
    }
    
    func call () {
        if let mainViewController = MainViewController.mainViewController {
            fsLogin = mainViewController.fsLogin
            fsPassword = mainViewController.fsPassword
            fsVoiceBridgeNumber = "\(mainViewController.fsVoiceBridgeNumber)-screen"
            sessId = mainViewController.sessId
            callerIdName = mainViewController.callerIdName
            callerIdNumber = mainViewController.callerIdNumber
            fsWebSocketUrl = mainViewController.fsWebSocketUrl
        }
        
        self.socket = WebSocket(url: URL(string: fsWebSocketUrl)!)
        self.socket!.delegate = self
        self.socket!.connect()
        verto = Verto(socket: socket!)
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

extension ScreenShareViewController : WebSocketDelegate {
    // Websocket Delegate Methods.
    
    func websocketDidConnect(socket: WebSocket) {
        sendVertoLogin()
    }
    
    func websocketDidDisconnect(socket: WebSocket, error: NSError?) {
    }
    
    func websocketDidReceiveMessage(socket: WebSocket, text: String) {
        let messageIn = parseJSON(string: text) as! [String: Any]
        
        if let id = (messageIn["id"] as? Int) {
            if (id  == LOGIN_MESSAGE_ID) {
                if let result = messageIn["result"] {
                    let result = result as! [String: Any]
                    
                    if let message = result ["message"] {
                        let message = message as! String
                        
                        if(message == "logged in") {
                            sessId = result["sessid"] as! String
                            doRtcOffer()
                        }
                    }
                }
            }
            
            if let method = messageIn["method"] {
                let method = method as! String
                if(method == "verto.answer") {
                    if let verto = verto {
                        verto.answer(id: id)
                    }
                    if let params = messageIn["params"] {
                        let params = params as! [String: Any]
                        if let sdp = params["sdp"] {
                            let sdp = sdp as! String
                            log(text: "We got remote SDP: " + sdp)
                            let sdpObj = RTCSessionDescription(type: RTCSdpType.answer, sdp: sdp)
                            peerConnection?.setRemoteDescription(sdpObj, completionHandler: { ( e:Error?) in
                                self.log(text: "we set the remote sdp")
                            })
                        }
                    }
                }
            }
        }
    }
    
    func sendVertoAnswerResult (id: Int) {
        let outMessage = [
            "jsonrpc":"2.0",
            "id": id,
            "result":  [
                "method": "verto.answer"
            ]
            ] as [String : Any]
        
        self.socket!.write(string: jsonify(data: outMessage))
    }
    
    func sendVertoLogin () {
        let outMessage = [
            "jsonrpc":"2.0",
            "method":"login",
            "params":  [
                "login": fsLogin,
                "passwd": fsPassword,
                "loginParams": [],
                "userVariables": [],
                "sessid": ""
            ],
            "id": LOGIN_MESSAGE_ID
            ] as [String : Any]
        
        self.socket!.write(string: jsonify(data: outMessage))
    }
    
    func sendVertoInvite (sdp: String) {
        let outMessage = [
            "jsonrpc":"2.0",
            "method":"verto.invite",
            "params":  [
                "sdp": sdp,
                "dialogParams": [
                    "screenShare":false,
                    "useCamera":"default",
                    "useMic":false,
                    "useSpeak":false,
                    "useStereo":false,
                    "useVideo":true,
                    "tag":"webcam",
                    "login": fsLogin,
                    "videoParams": [
                        "minFrameRate":5
                    ],
                    "destination_number":fsVoiceBridgeNumber,
                    "caller_id_name":callerIdName,
                    "caller_id_number":callerIdNumber,
                    "dedEnc":false,
                    "mirrorInput":false,
                    "callID": "\(sessId)screenshare",
                    "remote_caller_id_name":"Outbound Call",
                    "remote_caller_id_number":fsVoiceBridgeNumber
                ],
                "sessid": sessId
            ],
            "id": LOGIN_MESSAGE_ID
            ] as [String : Any]
        
        self.socket!.write(string: jsonify(data: outMessage))
    }
    
    func sendVertoBye () {
        let outMessage = [
            "jsonrpc":"2.0",
            "method":"verto.bye",
            "params":  [
                "dialogParams":[
                    "destination_number":fsVoiceBridgeNumber,
                    "caller_id_name":callerIdName,
                    "caller_id_number":callerIdNumber,
                    "callID":sessId
                ],
                "sessid": sessId
            ],
            "id":BYE_MESSAGE_ID
            ] as [String : Any]
        if let socket = socket {
            socket.write(string: jsonify(data: outMessage))
        }
    }
    
    func websocketDidReceiveData(socket: WebSocket, data: Data) {
        log(text: "Websocket received data")
    }
}


extension ScreenShareViewController : RTCPeerConnectionDelegate {
    func doRtcOffer () {
        totalIceCandidates = 0
        let connectionConstraintsDict = ["DtlsSrtpKeyAgreement": "true"]
        let connectionConstraints = RTCMediaConstraints(mandatoryConstraints: nil, optionalConstraints: connectionConstraintsDict);
        
        configuration.iceServers = [RTCIceServer(urlStrings: ["stun:stun.l.google.com:19302", "stun:stun1.l.google.com:19302", "stun:stun2.l.google.com:19302", "stun:stun3.l.google.com:19302", "stun:stun4.l.google.com:19302" ])]
        configuration.bundlePolicy = .balanced
        configuration.rtcpMuxPolicy = .negotiate
        configuration.iceTransportPolicy = .all
        
        //Force usage of TURN
        //configuration.iceTransportPolicy = .relay;
        
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
                self.videoTrack!.add(self.videoView)
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
        
        //When it's changed to 2, we can proceed with the connection
        if(newState.rawValue == 2) {
            state = "READY"
            
            self.peerConnection?.offer(for: self.defaultOfferConstraints, completionHandler: { ( sdp : RTCSessionDescription?, error: Error?) in
                if let sdp = sdp {
                    self.localSessionDescription = sdp.sdp
                    self.peerConnection?.setLocalDescription(sdp, completionHandler: { (error: Error?) in
                        self.log(text: "New Local descriptor set")
                    })
                    self.sendVertoInvite(sdp: sdp.sdp)
                }
            })
            
        }
    }
    
    /** New ice candidate has been found. */
    internal func peerConnection(_ peerConnection: RTCPeerConnection, didGenerate candidate: RTCIceCandidate) {
        totalIceCandidates += 1;
        log(text: "New ice candidate found.")
        
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

extension ScreenShareViewController: UIGestureRecognizerDelegate {
    func returnToMainView(_ sender: UIPanGestureRecognizer) {
        dismiss(animated: false, completion: nil)
    }
}
*/
