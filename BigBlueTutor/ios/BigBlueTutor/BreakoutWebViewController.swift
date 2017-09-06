//
//  BreakoutWebViewController.swift
//  BigBlueButton
//
//  Created by First User on 2017-06-08.
//  Copyright © 2017 BigBlueButton. All rights reserved.
//

//obsolete until breakout rooms work again in 2.0

import UIKit
import WebKit
import Starscream
import WebRTC
import AVKit

class BreakoutWebViewController: UIViewController {
    
    static var item = 0
    var breakoutUrl:String?
    
    //Webview and configuration
    var webView = WKWebView()
    let userContentController = WKUserContentController()
    let webConfiguration = WKWebViewConfiguration()
    
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
    var isListenOnly:Bool = false
    //RTC
    let configuration = RTCConfiguration()
    var peerConnection:RTCPeerConnection?
    var factory = RTCPeerConnectionFactory()
    var localSessionDescription = ""
    var totalIceCandidates = 0;
    var state = ""
    
    var defaultOfferConstraints: RTCMediaConstraints {
        let mandatoryConstraints = [
            "OfferToReceiveAudio": "true",
            "OfferToReceiveVideo": "false"
        ]
        return RTCMediaConstraints(mandatoryConstraints:mandatoryConstraints, optionalConstraints:nil)
    }
    var audioConstraints:RTCMediaConstraints?
    var audioTrack: RTCAudioTrack?
    var audioSender: RTCRtpSender?
    
    override func loadView() {
        webConfiguration.userContentController = userContentController;
        webConfiguration.allowsAirPlayForMediaPlayback = true
        webConfiguration.allowsInlineMediaPlayback = true
        webConfiguration.allowsPictureInPictureMediaPlayback = true
        
        self.webView = WKWebView(frame: .zero, configuration: webConfiguration)
        webView.uiDelegate = self
        webView.navigationDelegate = self
        
        //Set the user agent, so the HTML code can detect if it's running from this application or from a regular browser
        webView.customUserAgent = "BigBlueButton"
        webView.scrollView.bounces = false
        webView.scrollView.bouncesZoom = false
        
        view = webView
        
        //Register the messageHandler (the name is exposed to javascript under the navigator.webkit.messageHandlers.<<NAME>>)
        userContentController.add(self, name: "bbb")
        
    }
    
    override func viewDidAppear(_ animated: Bool) {
        super.viewDidAppear(animated)
    }
    
    override func viewDidLoad() {
        super.viewDidLoad()
    }
    
    
    //run api calls
    func checkApi(link:BBBConnection) {
        
    }
    
    //loads the webpage, put validation step here
    func loadUrl(link:BBBConnection) {
        let request = URLRequest(url: link.url)
        webView.load(request as URLRequest)
        MainViewController.audioMeter.setMicrophone()
        //hangup when you go to a new url to make sure you turned off audio from the last one
        hangup()
    }
    
    override func didReceiveMemoryWarning() {
        super.didReceiveMemoryWarning()
    }
    //MARK: URL handling and packaging as BBBConnection
    func parseUrl(url: String) -> BBBConnection? {
        var fixedUrl:String
        if url.contains("https//") {
            fixedUrl = "https://\(url.components(separatedBy: "https//")[1])"
        }else if (!url.contains("https://")) {
            return nil
        }else {
            fixedUrl = url
        }
        let slashArray = fixedUrl.components(separatedBy: "/")
        //arbitrary amount = 6 since https://example.com/auth1/auth2/auth3 has 5 slashes so at least 6 components
        if (slashArray.count < 6 || URL(string: fixedUrl) == nil) {
            return nil
        }
        return BBBConnection(name: "", url: URL(string: fixedUrl)!)
    }
    //MARK: JSON Conversion functions
    
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
            print("\(dateFormatter.string(from: date)) \(text)")
        }
    }
    
    
}


//MARK: Navigation
extension BreakoutWebViewController: WKNavigationDelegate {
    func webView(_ webView: WKWebView, didFail navigation: WKNavigation!, withError error: Error) {
        log(text: "Fail: \(error)")
    }
    
    func webView(_ webView: WKWebView, didCommit navigation: WKNavigation!) {
        log(text: "didCommit")
    }
    
    func webView(_ webView: WKWebView, didFailProvisionalNavigation navigation: WKNavigation!, withError error: Error) {
        log(text: "didFailProvisionalNavigation")
    }
    
    func webViewDidClose(_ webView: WKWebView) {
        log(text: "webView")
    }
    
    func webViewWebContentProcessDidTerminate(_ webView: WKWebView) {
        log(text: "webViewWebContentProcessDidTerminate")
    }
    
    func webView(_ webView: WKWebView, didFinish navigation: WKNavigation!) {
        log(text: "didFinish")
        
    }
    
    func webView(_ webView: WKWebView, didStartProvisionalNavigation navigation: WKNavigation!) {
        log(text: "didStartProvisionalNavigation")
    }
    
    func webView(_ webView: WKWebView, shouldPreviewElement elementInfo: WKPreviewElementInfo) -> Bool {
        return true
    }
    
    func webView(_ webView: WKWebView, commitPreviewingViewController previewingViewController: UIViewController) {
        log(text: "commitPreviewingViewController")
        
    }
    
    func webView(_ webView: WKWebView, didReceiveServerRedirectForProvisionalNavigation navigation: WKNavigation!) {
        log(text: "didReceiveServerRedirectForProvisionalNavigation")
        
    }
    
    func webView(_ webView: WKWebView, runJavaScriptAlertPanelWithMessage message: String, initiatedByFrame frame: WKFrameInfo, completionHandler: @escaping () -> Void) {
        log(text: "runJavaScriptAlertPanelWithMessage")
        
    }
    
    func webView(_ webView: WKWebView, runJavaScriptConfirmPanelWithMessage message: String, initiatedByFrame frame: WKFrameInfo, completionHandler: @escaping (Bool) -> Void) {
        log(text: "runJavaScriptConfirmPanelWithMessage")
        
    }
    
    func webView(_ webView: WKWebView, runJavaScriptTextInputPanelWithPrompt prompt: String, defaultText: String?, initiatedByFrame frame: WKFrameInfo, completionHandler: @escaping (String?) -> Void) {
        log(text: "runJavaScriptTextInputPanelWithPrompt")
        
    }
}

//MARK: message handler

extension BreakoutWebViewController: WKScriptMessageHandler {
    //Handle messages sent from Javascript to SWIFT code
    func userContentController(_ userContentController: WKUserContentController, didReceive message: WKScriptMessage) {
        
        let messageBody = message.body as! String
        
        //Parse the message to a object
        let messageObject = parseJSON(string: (messageBody) ) as! [String: Any]
        let method = messageObject["method"] as! String
        
        switch(method) {
        case "call":
            self.fsVoiceBridgeNumber = messageObject["fsVoiceBridgeNumber"] as! String
            self.fsLogin = messageObject["fsLogin"] as! String
            self.fsPassword = messageObject["fsPassword"] as! String
            self.sessId = messageObject["sessId"] as! String
            self.callerIdName = messageObject["callerIdName"] as! String
            self.callerIdNumber = messageObject["callerIdNumber"] as! String
            self.fsWebSocketUrl = messageObject["fsWebSocketUrl"] as! String
            self.isListenOnly = messageObject["isListenOnly"] as! Bool
            
            call()
            break
        case "hangup":
            self.hangup()
            break
        case "requestMicrophoneLevelStart":
            MainViewController.audioMeter.microphoneLevelStart(webView: self.webView)
            break
        case "requestMicrophoneLevelStop":
            MainViewController.audioMeter.microphoneLevelStop()
            break
            
        case "goToRoom":
            let transition = CATransition()
            transition.duration = 0.5
            transition.type = kCATransitionPush
            self.dismiss(animated: false, completion: nil)
            if let url = messageObject["url"] as? String {
                transition.subtype = kCATransitionFromRight
                self.dismiss(animated: false, completion: nil)
                if let meetingid = messageObject["meetingid"] as? String {
                    if let meeting = MainViewController.rooms[meetingid] {
                        self.present(meeting, animated: false)
                    }else {
                        MainViewController.rooms[meetingid] = BreakoutWebViewController()
                        (MainViewController.rooms[meetingid] as! BreakoutWebViewController).loadUrl(link: BBBConnection(name:"", url:URL(string: url)!))
                        self.present(MainViewController.rooms[meetingid]!, animated: false)
                    }
                    (MainViewController.rooms[meetingid] as! BreakoutWebViewController).requestBreakoutRooms()
                }
            }else {
                transition.subtype = kCATransitionFromLeft
                MainViewController.mainViewController!.requestBreakoutRooms()
            }
            view.window!.layer.add(transition, forKey: kCATransition)
            break
        case "leaveRoom":
            let transition = CATransition()
            transition.duration = 0.5
            transition.type = kCATransitionPush
            transition.subtype = kCATransitionFromLeft
            view.window!.layer.add(transition, forKey: kCATransition)
            self.dismiss(animated: false, completion: nil)
            if let meetingid = messageObject["meetingId"] as? String {
                MainViewController.rooms.removeValue(forKey: meetingid)
            }
//            for meetingId in MainViewController.rooms.keys {
//                if (self == MainViewController.rooms[meetingId]) {
//                    MainViewController.rooms.removeValue(forKey: meetingId)
//                    break
//                }
//            }
            self.webView.configuration.userContentController.removeScriptMessageHandler(forName: "bbb")
            MainViewController.mainViewController!.requestBreakoutRooms()
            break
        case "updateBreakoutRooms":
            if let idArray = messageObject["id"] as? [String] {
                var newRoom = [String:UIViewController]()
                for id in idArray {
                    if(MainViewController.rooms[id] != nil) {
                        newRoom[id] = MainViewController.rooms.removeValue(forKey: id)
                    }
                }
                for viewController in MainViewController.rooms.values {
                    (viewController as! BreakoutWebViewController).webView.configuration.userContentController.removeScriptMessageHandler(forName: "bbb")
                }
                MainViewController.rooms = newRoom
            }
            break
        default:
            log(text: "Received unhandled message from the javascript code: " + String(describing: message.body))
            break
            
        }
    }
}

extension BreakoutWebViewController: WKUIDelegate {
    
}


//MARK: Call handling and Microphone levels
extension BreakoutWebViewController {
    
    func hangup() {
        sendVertoBye()
        if let socket = socket {
            socket.disconnect()
        }
        if let peerConnection = peerConnection {
            peerConnection.close()
        }
    }
    
    func call () {
        if let socket = socket {
            socket.disconnect()
        }
        
        self.socket = WebSocket(url: URL(string: fsWebSocketUrl)!)
        self.socket!.delegate = self
        self.socket!.connect()
        
        log(text: "Calling \(fsVoiceBridgeNumber)")
    }
    
    func requestBreakoutRooms() {
        self.webView.evaluateJavaScript("var event = new CustomEvent(\"requestBreakoutRooms\"); window.dispatchEvent(event);", completionHandler: nil)
    }
    
}

extension BreakoutWebViewController : WebSocketDelegate {
    // Websocket Delegate Methods.
    
    func websocketDidConnect(socket: WebSocket) {
        log(text: "Websocket is connected")
        
        sendVertoLogin()
    }
    
    func websocketDidDisconnect(socket: WebSocket, error: NSError?) {
        if let e = error {
            log(text: "Websocket is disconnected: \(e.localizedDescription)")
        } else {
            log(text: "Websocket disconnected")
        }
    }
    
    func websocketDidReceiveMessage(socket: WebSocket, text: String) {
        log(text: "Websocket received message: \(text)")
        let messageIn = parseJSON(string: text) as! [String: Any]
        
        if let id = (messageIn["id"] as? Int) {
            if (id  == LOGIN_MESSAGE_ID) {
                if let result = messageIn["result"] {
                    let result = result as! [String: Any]
                    
                    if let message = result ["message"] {
                        let message = message as! String
                        
                        if(message == "logged in") {
                            doRtcOffer()
                        }
                    }
                }
            }
            
            if let method = messageIn["method"] {
                let method = method as! String
                if(method == "verto.answer") {
                    log(text: "We got answer!! ID = \(id)")
                    sendVertoAnswerResult(id: id)
                    
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
                "sessid": sessId
            ],
            "id": LOGIN_MESSAGE_ID
            ] as [String : Any]
        
        self.socket!.write(string: jsonify(data: outMessage))
    }
    
    func sendVertoInvite (sdp: String) {
        log(text: "Sending invite!!")
        var useMic:Bool
        if(isListenOnly) {
            useMic = false
        }else {
            useMic = true
        }
        
        let outMessage = [
            "jsonrpc":"2.0",
            "method":"verto.invite",
            "params":  [
                "sdp": sdp,
                "dialogParams": [
                    "useVideo":true,
                    "screenShare":false,
                    "useCamera":"default",
                    "useMic":useMic,
                    "useSpeak":"default",
                    "tag":"deskshareVideo",
                    "login": fsLogin,
                    "videoParams": [
                        "minFrameRate":5
                    ],
                    "destination_number":fsVoiceBridgeNumber,
                    "caller_id_name":callerIdName,
                    "caller_id_number":callerIdNumber,
                    "dedEnc":false,
                    "mirrorInput":false,
                    "callID": sessId,
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


extension BreakoutWebViewController : RTCPeerConnectionDelegate {
    func doRtcOffer () {
        totalIceCandidates = 0
        let connectionConstraintsDict = ["DtlsSrtpKeyAgreement": "true"]
        let connectionConstraints = RTCMediaConstraints(mandatoryConstraints: nil, optionalConstraints: connectionConstraintsDict);
        
        configuration.iceServers = [RTCIceServer(urlStrings: ["stun:stun.l.google.com:19302", "stun:stun1.l.google.com:19302", "stun:stun2.l.google.com:19302", "stun:stun3.l.google.com:19302", "stun:stun4.l.google.com:19302" ])]
        configuration.bundlePolicy = .maxBundle
        configuration.rtcpMuxPolicy = .require
        configuration.iceTransportPolicy = .all
        
        //Force usage of TURN
        //configuration.iceTransportPolicy = .relay;
        
        self.peerConnection = factory.peerConnection(with: configuration, constraints: connectionConstraints, delegate: self)
        
        
        audioConstraints = RTCMediaConstraints(mandatoryConstraints: nil, optionalConstraints:nil)
        
        if (!isListenOnly) {
            self.audioTrack = factory.audioTrack(withTrackId: "ARDAMSa0")
            
            self.audioSender = peerConnection?.sender(withKind: kRTCMediaStreamTrackKindAudio, streamId: "ARDAMS")
            audioSender?.track = self.audioTrack
        }
        
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
                    //print("Hi, i am the new completionHandler, my SDP is: -------\n" + sdp.sdp+"\n-------\n")
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
