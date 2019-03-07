//
//  SafePromise.swift
//  RNDsbluetooth
//
//  Created by Jaysonj on 2019/2/17.
//  Copyright © 2019 Facebook. All rights reserved.
//

import Foundation

public typealias Resolve = (Any?) -> ()
public typealias Reject = (String?, String?, NSError?) -> ()

class SafePromise {
    let resolveFunc: Resolve
    let rejectFunc: Reject
    var finished = false
    
    init(resolve: @escaping Resolve, reject: @escaping Reject) {
        self.resolveFunc = resolve
        self.rejectFunc = reject
    }
    
    func resolve(_ value: Any? = nil) {
        if (!finished) {
            self.resolveFunc(value)
            finished = true
        }
    }
    
    func reject(code: String? = nil, message: String? = nil, error: NSError? = nil) {
        if (!finished) {
            rejectFunc(code, message, error)
            finished = true
        }
    }
}
