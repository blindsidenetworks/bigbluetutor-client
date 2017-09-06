//
//  VertoMessages.swift
//  BigBlueButton
//
//  Created by First User on 2017-07-21.
//  Copyright © 2017 BigBlueButton. All rights reserved.
//

import Foundation
import WebRTC
import Starscream

protocol VertoDelegate {
    func loggedIn()
    func remoteSdp(sdp:RTCSessionDescription)
}

class Verto {
    let NORMAL_ID = 1
    let BYE_ID = 5
    var socket:WebSocket
    var delegate:VertoDelegate?
    
    init(socket:WebSocket) {
        self.socket = socket
    }
    
    func login(login: String, password: String, sessId: String) {
        let outMessage = [
            "jsonrpc":"2.0",
            "method":"login",
            "params":  [
                "login": login,
                "passwd": password,
                "loginParams": [],
                "userVariables": [],
                "sessid": sessId
            ],
            "id": NORMAL_ID
            ] as [String : Any]
        socket.write(string: jsonify(data: outMessage))
    }
    
    func inviteVideo(sdp: String, login: String, voiceBridgeNumber: String, callerIdName: String, callerIdNumber: String, sessId: String) {
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
                    "login": login,
                    "videoParams": [
                        "minFrameRate":5
                    ],
                    "destination_number":voiceBridgeNumber,
                    "caller_id_name":callerIdName,
                    "caller_id_number":callerIdNumber,
                    "dedEnc":false,
                    "mirrorInput":false,
                    "callID": "\(sessId)screenshare",
                    "remote_caller_id_name":"Outbound Call",
                    "remote_caller_id_number":voiceBridgeNumber
                ],
                "sessid": sessId
            ],
            "id": NORMAL_ID
            ] as [String : Any]
        
        socket.write(string: jsonify(data: outMessage))
    }

    func inviteAudio(sdp: String, useMic: Bool, login: String, voiceBridgeNumber: String, callerIdName: String, callerIdNumber: String, sessId: String) {
        let outMessage = [
            "jsonrpc":"2.0",
            "method":"verto.invite",
            "params":  [
                "sdp": sdp,
                "dialogParams": [
                    "screenShare":false,
                    "useCamera":"default",
                    "useMic":useMic,
                    "useSpeak":"default",
                    "useStero":true,
                    "useVideo":true,
                    "tag":"webcam",
                    "login": login,
                    "videoParams": [
                        "minFrameRate":5
                    ],
                    "destination_number":voiceBridgeNumber,
                    "caller_id_name":callerIdName,
                    "caller_id_number":callerIdNumber,
                    "dedEnc":false,
                    "mirrorInput":false,
                    "callID": sessId,
                    "remote_caller_id_name":"Outbound Call",
                    "remote_caller_id_number":voiceBridgeNumber
                ],
                "sessid": sessId
            ],
            "id": NORMAL_ID
            ] as [String : Any]
        
        socket.write(string: jsonify(data: outMessage))
    }
    
    func invite(sdp: String, useMic: Bool, login: String, voiceBridgeNumber: String, callerIdName: String, callerIdNumber: String, sessId: String) {
        let outMessage = [
            "jsonrpc":"2.0",
            "method":"verto.invite",
            "params":  [
                "sdp": sdp,
                "dialogParams": [
                    "screenShare":false,
                    "useCamera":"default",
                    "useMic":useMic,
                    "useSpeak":"default",
                    "useStereo":true,
                    "useVideo":true,
                    "tag":"webcam",
                    "login": login,
                    "videoParams": [
                        "minFrameRate":5
                    ],
                    "destination_number":voiceBridgeNumber,
                    "caller_id_name":callerIdName,
                    "caller_id_number":callerIdNumber,
                    "dedEnc":false,
                    "mirrorInput":false,
                    "callID": sessId,
                    "remote_caller_id_name":"Outbound Call",
                    "remote_caller_id_number":voiceBridgeNumber
                ],
                "sessid": sessId
            ],
            "id": NORMAL_ID
            ] as [String : Any]
        
        socket.write(string: jsonify(data: outMessage))
    }
    
    func bye(voiceBridgeNumber: String, callerIdName: String, callerIdNumber: String, sessId: String) {
        let outMessage = [
            "jsonrpc":"2.0",
            "method":"verto.bye",
            "params":  [
                "dialogParams":[
                    "destination_number":voiceBridgeNumber,
                    "caller_id_name":callerIdName,
                    "caller_id_number":callerIdNumber,
                    "callID":sessId
                ],
                "sessid": sessId
            ],
            "id":BYE_ID
            ] as [String : Any]
        socket.write(string: jsonify(data: outMessage))
    }
    
    func answer(id: Int) {
        let outMessage = [
            "jsonrpc":"2.0",
            "id": id,
            "result":  [
                "method": "verto.answer"
            ]
        ] as [String : Any]
        socket.write(string: jsonify(data: outMessage))
    }
    
    func parseMessage(text:String) {
        
        if let delegate = delegate {
            if let message = parseJSON(string: text) as? [String: Any] {
                if let id = (message["id"] as? Int) {
                    if (id  == NORMAL_ID) {
                        if let result = message["result"] as? [String: Any] {
                            if let message = result ["message"] as? String {
                                if(message == "logged in") {
                                    delegate.loggedIn()
                                }
                            }
                        }
                    }
                    if let method = message["method"] as? String {
                        if(method == "verto.answer") {
                            answer(id: id)
                            if let params = message["params"] as? [String: Any] {
                                if let sdp = params["sdp"] as? String {
                                    delegate.remoteSdp(sdp: RTCSessionDescription(type: .answer, sdp: sdp))
                                }
                            }
                        }
                    }
                }
            }
        }
    }
    
    func parseJSON(string:String) -> Any {
        do {
            return try JSONSerialization.jsonObject(with: string.data(using: String.Encoding.utf8)!, options: [])
        }catch {
            return ""
        }
    }
    
    func jsonify(data:Any) -> String {
        do {
            var jsonData:Data
            try jsonData = JSONSerialization.data(withJSONObject: data, options: [])
            return String(data: jsonData, encoding: String.Encoding.utf8) ?? ""
        }catch {
            return ""
        }
    }
}
