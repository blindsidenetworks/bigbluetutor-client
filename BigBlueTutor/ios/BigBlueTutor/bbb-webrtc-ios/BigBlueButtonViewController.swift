//
//  BigBlueButtonViewController
//  bbb-webrtc-ios
//
//  Created by First User on 2017-05-15.
//  Copyright © 2017 BigBlueButton. All rights reserved.
//

import UIKit
import WebKit
import Starscream
import WebRTC
import AVKit

struct BBBConnection: Hashable {
    var name:String
    var url:URL
    
    var hashValue: Int {
        return url.hashValue
    }
    
    static func == (bbb1: BBBConnection, bbb2: BBBConnection) -> Bool {
        return bbb1.url == bbb2.url
    }
}

class BigBlueButtonViewController: UIViewController {
    

    //PURELY FOR HACK
    var roomUrl = URL(string: "https://rn.blindside-dev.com/demo/demoIOS.jsp")!
    var times = 0
    
    static var rooms = [String:UIViewController]()
    
    static var item = 0

    var breakoutUrl:String?
    
    //Webview and configuration
    var webView = WKWebView()
    let userContentController = WKUserContentController()
    let webConfiguration = WKWebViewConfiguration()
    
    static let audioMeter = AudioMeter()
    
    let videoView = DynamicVideoView()
    
    var webRTCVideoView = WebRTCVideoView()
    
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
            "OfferToReceiveVideo": "true"
        ]
        return RTCMediaConstraints(mandatoryConstraints:mandatoryConstraints, optionalConstraints:nil)
    }
    var audioConstraints:RTCMediaConstraints?
    var audioTrack: RTCAudioTrack?
    var audioSender: RTCRtpSender?
    var videoTrack: RTCVideoTrack?
    var localVideoTrack: RTCVideoTrack?
    var videoSender: RTCRtpSender?
    static var bigBlueButtonViewController:BigBlueButtonViewController?
    
    
    
    override func loadView() {
        //super.loadView()
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
        //webView.bounds = UIScreen.main.bounds
        webView.bounds = CGRect(x: CGFloat(0), y: CGFloat(0), width: UIScreen.main.bounds.width, height: UIScreen.main.bounds.height)
        
        view = webView
        //view.addSubview(webView)
        webRTCVideoView.bounds = CGRect(x: UIScreen.main.bounds.midX
            , y: UIScreen.main.bounds.maxY, width: UIScreen.main.bounds.width.divided(by: CGFloat(3)), height: UIScreen.main.bounds.height.divided(by: CGFloat(3)))
        webRTCVideoView.translatesAutoresizingMaskIntoConstraints = false
        
        view.addSubview(webRTCVideoView)
        
        //Webcam video view
        
        videoView.bounds = CGRect(x: UIScreen.main.bounds.midX
            , y: UIScreen.main.bounds.maxY, width: UIScreen.main.bounds.width.divided(by: CGFloat(3)), height: UIScreen.main.bounds.height.divided(by: CGFloat(3)))
        videoView.translatesAutoresizingMaskIntoConstraints = false
        view.addSubview(videoView)
        
        userContentController.add(self, name: "bbb")
    }
    
    override func viewDidAppear(_ animated: Bool) {
        super.viewDidAppear(animated)
    }
    
    override func viewDidLoad() {
        super.viewDidLoad()
        
        NSLayoutConstraint.activate([
            //can get comment this to disable webcams
            videoView.bottomAnchor.constraint(equalTo: view.layoutMarginsGuide.bottomAnchor, constant: view.bounds.height*(-0.05)),
            videoView.rightAnchor.constraint(equalTo: view.layoutMarginsGuide.rightAnchor),
            videoView.heightAnchor.constraint(equalTo: view.layoutMarginsGuide.heightAnchor, multiplier: 0.3),
            videoView.widthAnchor.constraint(equalTo: view.layoutMarginsGuide.widthAnchor, multiplier: 0.3),

            //keep this
            webRTCVideoView.bottomAnchor.constraint(equalTo: view.layoutMarginsGuide.bottomAnchor, constant: view.bounds.height*(-0.05)),
            webRTCVideoView.rightAnchor.constraint(equalTo: view.layoutMarginsGuide.rightAnchor),
            webRTCVideoView.heightAnchor.constraint(equalTo: view.layoutMarginsGuide.heightAnchor, multiplier: 0.3),
            webRTCVideoView.widthAnchor.constraint(equalTo: view.layoutMarginsGuide.widthAnchor, multiplier: 0.3)
            ])
        
        registerGestures(view: videoView)
        registerGestures(view: webRTCVideoView)
        
        //create controller and BigBlueButtonViewController Singleton pattern
        BigBlueButtonViewController.bigBlueButtonViewController = self
        
        loadUrl(link: BBBConnection(name:"demo", url: roomUrl))
        //loadUrl(link: BBBConnection(name:"demo", url: URL(string: "https://rn.blindside-dev.com/demo/demoIOS.jsp")!))
        //loadUrl(link: BBBConnection(name:"demo", url: URL(string: "https://ios-webrtc.blindside-dev.com/demo/demoIOS.jsp")!))
        
    }
    
    func registerGestures(view: UIView) {
        if view as? Dynamic != nil {
            view.isUserInteractionEnabled = true
            let pinchGesture = UIPinchGestureRecognizer(target: self, action: #selector(pinch(_:)))
            pinchGesture.delegate = self
            view.addGestureRecognizer(pinchGesture)
            let panGesture = UIPanGestureRecognizer(target: self, action: #selector(drag(_:)))
            panGesture.delegate = self
            view.addGestureRecognizer(panGesture)
            let longPressGesture = UILongPressGestureRecognizer(target: self, action: #selector(longPress(_:)))
            view.addGestureRecognizer(longPressGesture)
            let doubleTap = UITapGestureRecognizer(target: self, action: #selector(doubleTap(_:)))
            doubleTap.numberOfTapsRequired = 2
            view.addGestureRecognizer(doubleTap)
        }
    }
    
    //run api calls
    func checkApi(link:BBBConnection) {
        var arr = link.url.absoluteString.components(separatedBy: "/")
        arr.removeLast(4)
        if let url = URL(string: "\(arr.joined(separator: "/"))/check") {
            let task = URLSession.shared.dataTask(with: url) {(data, response, error) in
                guard let data = data else {
                    self.loadUrl(link: BBBConnection(name:"",url:URL(string: "https://rn.blindside-dev.com/demo/demoHTML5.jsp")!))
                    return
                }
                if (String(data: data, encoding: .utf8) == "{\"html5clientStatus\":\"running\"}") {
                    self.loadUrl(link: link)
                }else {
                    self.loadUrl(link: BBBConnection(name:"",url:URL(string: "https://rn.blindside-dev.com/demo/demoHTML5.jsp")!))
                }
            }
            task.resume()
        }else {
            self.loadUrl(link: BBBConnection(name:"",url:URL(string: "https://rn.blindside-dev.com/demo/demoHTML5.jsp")!))
        }
    }

    //loads the webpage, put validation step here
    func loadUrl(link:BBBConnection) {
        let request = URLRequest(url: link.url)
        webView.load(request as URLRequest)
        BigBlueButtonViewController.audioMeter.setMicrophone()
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
        if (slashArray.count < 4 || URL(string: fixedUrl) == nil) {
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
    
    override func viewWillTransition(to size: CGSize, with coordinator: UIViewControllerTransitionCoordinator) {
        super.viewWillTransition(to: size, with: coordinator)
        //screenshareFrame = nil
    }
    
}


//MARK: Navigation
extension BigBlueButtonViewController: WKNavigationDelegate {
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
        times += 1
        if (times == 2) {
//            MainViewController.instance.showDetailViewController(MainViewController.instance.homeViewController, sender: self)
            MainViewController.instance.homeViewController.model = [String]()
            MainViewController.instance.homeViewController.table.reloadData()
            MainViewController.instance.bigBlueButtonViewController = BigBlueButtonViewController()
            times = 0
          dismiss(animated: true, completion: nil)
        }
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

extension BigBlueButtonViewController: WKScriptMessageHandler {
    //Handle messages sent from Javascript to SWIFT code
    func userContentController(_ userContentController: WKUserContentController, didReceive message: WKScriptMessage) {
        
        let messageBody = message.body as! String
        
        //Parse the message to a object
        let messageObject = parseJSON(string: (messageBody) ) as! [String: Any]
        let method = messageObject["method"] as! String
        
        switch(method) {
        case "call_params":
            self.fsVoiceBridgeNumber = messageObject["fsVoiceBridgeNumber"] as! String
            self.fsLogin = messageObject["fsLogin"] as! String
            self.fsPassword = messageObject["fsPassword"] as! String
            self.sessId = messageObject["sessId"] as! String
            self.callerIdName = messageObject["callerIdName"] as! String
            self.callerIdNumber = messageObject["callerIdNumber"] as! String
            self.fsWebSocketUrl = messageObject["fsWebSocketUrl"] as! String
            webRTCVideoView.call()
            break
        case "call":
            self.isListenOnly = messageObject["isListenOnly"] as! Bool
            call()
            break
        case "hangup":
            self.hangup()
            break
        case "requestMicrophoneLevelStart":
            BigBlueButtonViewController.audioMeter.microphoneLevelStart(webView: self.webView)
            break
        case "requestMicrophoneLevelStop":
            BigBlueButtonViewController.audioMeter.microphoneLevelStop()
            break
        case "linkBreakoutRoom":
            if let url = messageObject["url"] as? String {
                breakoutUrl = url
            }
            break
        case "goToRoom":
            let transition = CATransition()
            transition.duration = 0.5
            transition.type = kCATransitionPush
            transition.subtype = kCATransitionFromRight
            view.window!.layer.add(transition, forKey: kCATransition)
            if let url = messageObject["url"] as? String {
                if let meetingid = messageObject["meetingId"] as? String {
                    if let meeting = BigBlueButtonViewController.rooms[meetingid] {
                        self.present(meeting, animated: false)
                    }else {
                        BigBlueButtonViewController.rooms[meetingid] = BreakoutWebViewController()
                        self.present(BigBlueButtonViewController.rooms[meetingid]!, animated: false)
                        (BigBlueButtonViewController.rooms[meetingid] as! BreakoutWebViewController).loadUrl(link: BBBConnection(name:"", url:URL(string: url)!))
                    }
                    (BigBlueButtonViewController.rooms[meetingid] as! BreakoutWebViewController).requestBreakoutRooms()
                }
            }
            break
            
        case "leaveRoom":
            //do nothing. Meant for breakout rooms only
            break
        case "updateBreakoutRooms":
            if let idArray = messageObject["ids"] as? [String] {
                var newRoom = [String:UIViewController]()
                for id in idArray {
                    if(BigBlueButtonViewController.rooms[id] != nil) {
                        newRoom[id] = BigBlueButtonViewController.rooms.removeValue(forKey: id)
                    }
                }
                for viewController in BigBlueButtonViewController.rooms.values {
                    (viewController as! BreakoutWebViewController).webView.configuration.userContentController.removeScriptMessageHandler(forName: "bbb")
                }
                BigBlueButtonViewController.rooms = newRoom
            }
            break
        case "goToVideo":
            if (view.subviews.contains(webRTCVideoView)){
                webRTCVideoView.removeFromSuperview()
            }else {
                view.addSubview(webRTCVideoView)
                NSLayoutConstraint.activate([
                    webRTCVideoView.bottomAnchor.constraint(equalTo: view.layoutMarginsGuide.bottomAnchor, constant: view.bounds.height*(-0.05)),
                    webRTCVideoView.rightAnchor.constraint(equalTo: view.layoutMarginsGuide.rightAnchor),
                    webRTCVideoView.heightAnchor.constraint(equalTo: view.layoutMarginsGuide.heightAnchor, multiplier: 0.3),
                    webRTCVideoView.widthAnchor.constraint(equalTo: view.layoutMarginsGuide.widthAnchor, multiplier: 0.3)
                    ])
            }
            break
        default:
            log(text: "Received unhandled message from the javascript code: " + String(describing: message.body))
            break
        }
    }
}

extension BigBlueButtonViewController: WKUIDelegate {
    
}


//MARK: Call handling and Microphone levels
extension BigBlueButtonViewController {
    
    func hangup() {
        if let verto = verto {
            verto.bye(voiceBridgeNumber: fsVoiceBridgeNumber, callerIdName: callerIdName, callerIdNumber: callerIdNumber, sessId: sessId)
        }
        verto = nil
        if let socket = socket {
            socket.disconnect()
        }
        if let peerConnection = peerConnection {
            peerConnection.close()
        }
    }
    
    func call () {
        if let verto = verto {
            verto.bye(voiceBridgeNumber: fsVoiceBridgeNumber, callerIdName: callerIdName, callerIdNumber: callerIdNumber, sessId: sessId)
        }
        verto = nil
        if let socket = socket {
            socket.disconnect()
        }
        self.socket = WebSocket(url: URL(string: fsWebSocketUrl)!)
        log(text: fsWebSocketUrl)
        self.socket!.delegate = self
        self.socket!.connect()
        
        log(text: "Calling \(fsVoiceBridgeNumber)")
    }
    
    
    func requestBreakoutRooms() {
        self.webView.evaluateJavaScript("var event = new CustomEvent(\"requestBreakoutRooms\"); window.dispatchEvent(event);", completionHandler: nil)
    }
}

extension BigBlueButtonViewController : WebSocketDelegate {
    // Websocket Delegate Methods.
    
    func websocketDidConnect(socket: WebSocket) {
        log(text: "Websocket is connected")
        verto = Verto(socket: self.socket!)
        verto!.delegate = self
        if let verto = verto {
            verto.login(login: fsLogin, password: fsPassword, sessId: sessId)
        }
    }
    
    func websocketDidDisconnect(socket: WebSocket, error: NSError?) {
        if let e = error {
            log(text: "Websocket is disconnected: \(e.localizedDescription)")
        } else {
            log(text: "Websocket disconnected")
        }
        verto = nil
    }
    
    func websocketDidReceiveMessage(socket: WebSocket, text: String) {
        log(text: "Websocket received message: \(text)")
        if let verto = verto {
            verto.parseMessage(text: text)
        }
    }
    func websocketDidReceiveData(socket: WebSocket, data: Data) {
        log(text: "Websocket received data")
    }
}

extension BigBlueButtonViewController: VertoDelegate {
    func loggedIn() {
        doRtcOffer()
    }
    func remoteSdp(sdp:RTCSessionDescription) {
        peerConnection?.setRemoteDescription(sdp, completionHandler: {_ in})
    }
}

extension BigBlueButtonViewController : RTCPeerConnectionDelegate {
    func doRtcOffer () {
        totalIceCandidates = 0
        let connectionConstraintsDict = ["DtlsSrtpKeyAgreement": "true"]
        let connectionConstraints = RTCMediaConstraints(mandatoryConstraints: nil, optionalConstraints: connectionConstraintsDict);
        
        configuration.iceServers = [RTCIceServer(urlStrings: ["stun:stun.l.google.com:19302", "stun:stun1.l.google.com:19302", "stun:stun2.l.google.com:19302", "stun:stun3.l.google.com:19302", "stun:stun4.l.google.com:19302" ])]
        configuration.bundlePolicy = .balanced
        configuration.rtcpMuxPolicy = .negotiate
        configuration.iceTransportPolicy = .all
        
        self.peerConnection = factory.peerConnection(with: configuration, constraints: connectionConstraints, delegate: self)
        
        
        audioConstraints = RTCMediaConstraints(mandatoryConstraints: nil, optionalConstraints:nil)
        
        //MARK: Audio
        if (!isListenOnly) {
            self.audioTrack = factory.audioTrack(withTrackId: "ARDAMSa0")
            
            self.audioSender = peerConnection?.sender(withKind: kRTCMediaStreamTrackKindAudio, streamId: "ARDAMS")
            audioSender?.track = self.audioTrack
        }
        
        //MARK: Video
        //self.localVideoTrack = self.factory.videoTrack(with: self.factory.avFoundationVideoSource(with: self.audioConstraints), trackId: "ARDAMSv0")
        //self.videoSender = self.peerConnection?.sender(withKind: kRTCMediaStreamTrackKindVideo, streamId: "ARDAMS")
        //self.videoSender!.track = self.localVideoTrack
        
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
    }
    
    /** Called when media is received on a new stream from remote peer. */
    internal func peerConnection(_ peerConnection: RTCPeerConnection, didAdd stream: RTCMediaStream) {
        DispatchQueue.main.async {
            if (!stream.videoTracks.isEmpty) {
                self.videoTrack = stream.videoTracks[0]
                self.videoTrack!.add(self.videoView)
            }
        }
    }
    
    /** Called when a remote peer closes a stream. */
    internal func peerConnection(_ peerConnection: RTCPeerConnection, didRemove stream: RTCMediaStream) {
    }
    
    /** Called when negotiation is needed, for example ICE has restarted. */
    internal func peerConnectionShouldNegotiate(_ peerConnection: RTCPeerConnection) {
    }
    
    /** Called any time the IceConnectionState changes. */
    internal func peerConnection(_ peerConnection: RTCPeerConnection, didChange newState: RTCIceConnectionState) {
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
                                verto.invite(sdp: sdp.sdp, useMic: !self.isListenOnly, login: self.fsLogin, voiceBridgeNumber: self.fsVoiceBridgeNumber, callerIdName: self.callerIdName, callerIdNumber: self.callerIdNumber, sessId: self.sessId)
                            }
                        }
                    })
                }
            }
        }
    }
    
    /** Called when a group of local Ice candidates have been removed. */
    internal func peerConnection(_ peerConnection: RTCPeerConnection, didRemove candidates: [RTCIceCandidate]) {
    }
    
    /** New data channel has been opened. */
    internal func peerConnection(_ peerConnection: RTCPeerConnection, didOpen dataChannel: RTCDataChannel) {
    }
}

extension BigBlueButtonViewController: UIGestureRecognizerDelegate {
    
    func gestureRecognizer(_ gestureRecognizer: UIGestureRecognizer, shouldRecognizeSimultaneouslyWith otherGestureRecognizer: UIGestureRecognizer) -> Bool {
        return true
    }
    
    func resizeScreenShare(scale: CGFloat, curView: UIView) {
        let sizeTransform = CGAffineTransform(scaleX: scale, y: scale)
        let newBounds = (curView as! Dynamic).initialBounds.applying(sizeTransform)
        if (newBounds.height >= 100) && (newBounds.width >= 100) && (newBounds.height <= view.bounds.height) && (newBounds.width <= view.bounds.width){
            if checkBounds(curView: curView, translation: nil) {
                curView.bounds = newBounds
            }
        }
    }
    
    func checkBounds(curView:UIView,translation:CGPoint?) -> Bool {
        var minX = curView.center.x - curView.bounds.width/2
        var maxX = curView.center.x + curView.bounds.width/2
        var minY = curView.center.y - curView.bounds.height/2
        var maxY = curView.center.y + curView.bounds.height/2
        if let translation = translation {
            minX += translation.x
            maxX += translation.x
            minY += translation.y
            maxY += translation.y
        }
        if (maxX <= view.bounds.maxX) && (maxY <= view.bounds.maxY) && (minX >= view.bounds.minX) && (minY >= view.bounds.minY) {
            return true
        }
        return false
    }
    
    //MARK: Separated movement by horizontal and vertical to allow smooter movement
    func xTranslation (curView: UIView, translation: CGFloat) -> CGFloat {
        var minX = curView.center.x - curView.bounds.width/2
        var maxX = curView.center.x + curView.bounds.width/2
        minX += translation
        maxX += translation
        if (minX <= view.bounds.minX) {
            return view.bounds.minX + curView.bounds.width/2
        }else if(maxX >= view.bounds.maxX) {
            return view.bounds.maxX - curView.bounds.width/2
        }else {
            return curView.center.x + translation
        }
    }
    
    func yTranslation (curView: UIView, translation: CGFloat) -> CGFloat {
        var minY = curView.center.y - curView.bounds.height/2
        var maxY = curView.center.y + curView.bounds.height/2
        minY += translation
        maxY += translation
        if (minY <= view.bounds.minY) {
            return view.bounds.minY + curView.bounds.height/2
        }else if(maxY >= view.bounds.maxY) {
            return view.bounds.maxY - curView.bounds.height/2
        }else {
            return curView.center.y + translation
        }
    }
    
    func pinch(_ sender: UIPinchGestureRecognizer) {
        if let curView = sender.view {
            if var initial = sender.view as? Dynamic {
                if initial.initialFrame == nil {
                    switch sender.state {
                    case .began:
                        initial.initialBounds = curView.bounds
                        resizeScreenShare(scale: sender.scale, curView: curView)
                        break
                    case .changed:
                        resizeScreenShare(scale: sender.scale, curView: curView)
                        break
                    default:
                        break
                    }
                }
            }
        }
    }
    
    func drag(_ sender: UIPanGestureRecognizer) {
        if let curView = sender.view {
            let translation = sender.translation(in: self.view)
            let newX = xTranslation(curView: curView, translation: translation.x)
            let newY = yTranslation(curView: curView, translation: translation.y)
            curView.center = CGPoint(x: newX, y: newY)
            sender.setTranslation(CGPoint.zero, in: self.view)
        }
    }
    func doubleTap (_ sender: UITapGestureRecognizer) {
        if let curView = sender.view {
            if var initial = sender.view as? Dynamic {
                if let frame = initial.initialFrame {
                    curView.frame = frame
                    initial.initialFrame = nil
                }else {
                    initial.initialFrame = curView.frame
                    curView.frame = view.frame
                }
            }
        }
    }
    
    func longPress(_ sender: UILongPressGestureRecognizer) {
        if let curView = sender.view{
            if var initial = sender.view as? Dynamic {
                if (sender.state == .began) {
                    if let frame = initial.initialFrame {
                        curView.frame = frame
                        initial.initialFrame = nil
                    }else {
                        initial.initialFrame = curView.frame
                        curView.frame = self.view.frame
                    }
                }
            }
        }
    }
}
