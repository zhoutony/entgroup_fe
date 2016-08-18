/**
 * jGestures: a jQuery plugin for gesture events
 * Copyright 2010-2011 Neue Digitale / Razorfish GmbH
 * Copyright 2011-2012, Razorfish GmbH
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at http://www.apache.org/licenses/LICENSE-2.0
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * @copyright Razorfish GmbH
 * @author martin.krause@razorfish.de
 * @version 0.90-shake
 * @requires jQuery JavaScript Library v1.4.2 - http://jquery.com/- Copyright 2010, John Resig- Dual licensed under the MIT or GPL Version 2 licenses. http://jquery.org/license
 */
(function(c) {
    c.jGestures = {};
    c.jGestures.defaults = {};
    c.jGestures.defaults.thresholdShake = {
        requiredShakes: 10,
        freezeShakes: 100,
        frontback: {
            sensitivity: 10
        },
        leftright: {
            sensitivity: 10
        },
        updown: {
            sensitivity: 10
        }
    };
    c.jGestures.defaults.thresholdPinchopen = 0.05;
    c.jGestures.defaults.thresholdPinchmove = 0.05;
    c.jGestures.defaults.thresholdPinch = 0.05;
    c.jGestures.defaults.thresholdPinchclose = 0.05;
    c.jGestures.defaults.thresholdRotatecw = 5;
    c.jGestures.defaults.thresholdRotateccw = 5;
    c.jGestures.defaults.thresholdMove = 20;
    c.jGestures.defaults.thresholdSwipe = 100;
    c.jGestures.data = {};
    c.jGestures.data.capableDevicesInUserAgentString = ["iPad", "iPhone", "iPod", "Mobile Safari"];
    c.jGestures.data.hasGestures = (function() {
        var k;
        for (k = 0; k < c.jGestures.data.capableDevicesInUserAgentString.length; k++) {
            if (navigator.userAgent.indexOf(c.jGestures.data.capableDevicesInUserAgentString[k]) !== -1) {
                return true
            }
        }
        return false
    })();
    c.hasGestures = c.jGestures.data.hasGestures;
    c.jGestures.events = {
        touchstart: "jGestures.touchstart",
        touchendStart: "jGestures.touchend;start",
        touchendProcessed: "jGestures.touchend;processed",
        gesturestart: "jGestures.gesturestart",
        gestureendStart: "jGestures.gestureend;start",
        gestureendProcessed: "jGestures.gestureend;processed"
    };
    jQuery.each({
        orientationchange_orientationchange01: "orientationchange",
        gestureend_pinchopen01: "pinchopen",
        gestureend_pinchclose01: "pinchclose",
        gestureend_rotatecw01: "rotatecw",
        gestureend_rotateccw01: "rotateccw",
        gesturechange_pinch01: "pinch",
        gesturechange_rotate01: "rotate",
        touchstart_swipe13: "swipemove",
        touchstart_swipe01: "swipeone",
        touchstart_swipe02: "swipetwo",
        touchstart_swipe03: "swipethree",
        touchstart_swipe04: "swipefour",
        touchstart_swipe05: "swipeup",
        touchstart_swipe06: "swiperightup",
        touchstart_swipe07: "swiperight",
        touchstart_swipe08: "swiperightdown",
        touchstart_swipe09: "swipedown",
        touchstart_swipe10: "swipeleftdown",
        touchstart_swipe11: "swipeleft",
        touchstart_swipe12: "swipeleftup",
        touchstart_tap01: "tapone",
        touchstart_tap02: "taptwo",
        touchstart_tap03: "tapthree",
        touchstart_tap04: "tapfour",
        devicemotion_shake01: "shake",
        devicemotion_shake02: "shakefrontback",
        devicemotion_shake03: "shakeleftright",
        devicemotion_shake04: "shakeupdown"
    },
    function(l, k) {
        jQuery.event.special[k] = {
            setup: function() {
                var r = l.split("_");
                var o = r[0];
                var m = r[1].slice(0, r[1].length - 2);
                var p = jQuery(this);
                var q;
                var n;
                if (!p.data("ojQueryGestures") || !p.data("ojQueryGestures")[o]) {
                    q = p.data("ojQueryGestures") || {};
                    n = {};
                    n[o] = true;
                    c.extend(true, q, n);
                    p.data("ojQueryGestures", q);
                    if (c.hasGestures) {
                        switch (m) {
                        case "orientationchange":
                            p.get(0).addEventListener("orientationchange", a, false);
                            break;
                        case "shake":
                        case "shakefrontback":
                        case "shakeleftright":
                        case "shakeupdown":
                        case "tilt":
                            p.get(0).addEventListener("devicemotion", b, false);
                            break;
                        case "tap":
                        case "swipe":
                        case "swipeup":
                        case "swiperightup":
                        case "swiperight":
                        case "swiperightdown":
                        case "swipedown":
                        case "swipeleftdown":
                        case "swipeleft":
                            p.get(0).addEventListener("touchstart", h, false);
                            break;
                        case "pinchopen":
                        case "pinchclose":
                        case "rotatecw":
                        case "rotateccw":
                            p.get(0).addEventListener("gesturestart", e, false);
                            p.get(0).addEventListener("gestureend", i, false);
                            break;
                        case "pinch":
                        case "rotate":
                            p.get(0).addEventListener("gesturestart", e, false);
                            p.get(0).addEventListener("gesturechange", f, false);
                            break
                        }
                    } else {
                        switch (m) {
                        case "tap":
                        case "swipe":
                            p.bind("mousedown", h);
                            break;
                        case "orientationchange":
                        case "pinchopen":
                        case "pinchclose":
                        case "rotatecw":
                        case "rotateccw":
                        case "pinch":
                        case "rotate":
                        case "shake":
                        case "tilt":
                            break
                        }
                    }
                }
                return false
            },
            add: function(n) {
                var m = jQuery(this);
                var o = m.data("ojQueryGestures");
                o[n.type] = {
                    originalType: n.type
                };
                return false
            },
            remove: function(n) {
                var m = jQuery(this);
                var o = m.data("ojQueryGestures");
                o[n.type] = false;
                m.data("ojQueryGestures", o);
                return false
            },
            teardown: function() {
                var r = l.split("_");
                var o = r[0];
                var m = r[1].slice(0, r[1].length - 2);
                var p = jQuery(this);
                var q;
                var n;
                if (!p.data("ojQueryGestures") || !p.data("ojQueryGestures")[o]) {
                    q = p.data("ojQueryGestures") || {};
                    n = {};
                    n[o] = false;
                    c.extend(true, q, n);
                    p.data("ojQueryGestures", q);
                    if (c.hasGestures) {
                        switch (m) {
                        case "orientationchange":
                            p.get(0).removeEventListener("orientationchange", a, false);
                            break;
                        case "shake":
                        case "shakefrontback":
                        case "shakeleftright":
                        case "shakeupdown":
                        case "tilt":
                            p.get(0).removeEventListener("devicemotion", b, false);
                            break;
                        case "tap":
                        case "swipe":
                        case "swipeup":
                        case "swiperightup":
                        case "swiperight":
                        case "swiperightdown":
                        case "swipedown":
                        case "swipeleftdown":
                        case "swipeleft":
                        case "swipeleftup":
                            p.get(0).removeEventListener("touchstart", h, false);
                            p.get(0).removeEventListener("touchmove", g, false);
                            p.get(0).removeEventListener("touchend", j, false);
                            break;
                        case "pinchopen":
                        case "pinchclose":
                        case "rotatecw":
                        case "rotateccw":
                            p.get(0).removeEventListener("gesturestart", e, false);
                            p.get(0).removeEventListener("gestureend", i, false);
                            break;
                        case "pinch":
                        case "rotate":
                            p.get(0).removeEventListener("gesturestart", e, false);
                            p.get(0).removeEventListener("gesturechange", f, false);
                            break
                        }
                    } else {
                        switch (m) {
                        case "tap":
                        case "swipe":
                            p.unbind("mousedown", h);
                            p.unbind("mousemove", g);
                            p.unbind("mouseup", j);
                            break;
                        case "orientationchange":
                        case "pinchopen":
                        case "pinchclose":
                        case "rotatecw":
                        case "rotateccw":
                        case "pinch":
                        case "rotate":
                        case "shake":
                        case "tilt":
                            break
                        }
                    }
                }
                return false
            }
        }
    });
    function d(k) {
        k.startMove = (k.startMove) ? k.startMove: {
            startX: null,
            startY: null,
            timestamp: null
        };
        var l = new Date().getTime();
        var m;
        var n;
        if (k.touches) {
            n = [{
                lastX: k.deltaX,
                lastY: k.deltaY,
                moved: null,
                startX: k.screenX - k.startMove.screenX,
                startY: k.screenY - k.startMove.screenY
            }];
            m = {
                vector: k.vector || null,
                orientation: window.orientation || null,
                lastX: ((n[0].lastX > 0) ? +1 : ((n[0].lastX < 0) ? -1 : 0)),
                lastY: ((n[0].lastY > 0) ? +1 : ((n[0].lastY < 0) ? -1 : 0)),
                startX: ((n[0].startX > 0) ? +1 : ((n[0].startX < 0) ? -1 : 0)),
                startY: ((n[0].startY > 0) ? +1 : ((n[0].startY < 0) ? -1 : 0))
            };
            n[0].moved = Math.sqrt(Math.pow(Math.abs(n[0].startX), 2) + Math.pow(Math.abs(n[0].startY), 2))
        }
        return {
            type: k.type || null,
            originalEvent: k.event || null,
            delta: n || null,
            direction: m || {
                orientation: window.orientation || null,
                vector: k.vector || null
            },
            duration: (k.duration) ? k.duration: (k.startMove.timestamp) ? l - k.timestamp: null,
            rotation: k.rotation || null,
            scale: k.scale || null,
            description: k.description || [k.type, ":", k.touches, ":", ((n[0].lastX != 0) ? ((n[0].lastX > 0) ? "right": "left") : "steady"), ":", ((n[0].lastY != 0) ? ((n[0].lastY > 0) ? "down": "up") : "steady")].join("")
        }
    }
    function a(l) {
        var k = ["landscape:clockwise:", "portrait:default:", "landscape:counterclockwise:", "portrait:upsidedown:"];
        c(window).triggerHandler("orientationchange", {
            direction: {
                orientation: window.orientation
            },
            description: ["orientationchange:", k[((window.orientation / 90) + 1)], window.orientation].join("")
        })
    }
    function b(r) {
        var k;
        var t = jQuery(window);
        var o = t.data("ojQueryGestures");
        var m = c.jGestures.defaults.thresholdShake;
        var n = o.oDeviceMotionLastDevicePosition || {
            accelerationIncludingGravity: {
                x: 0,
                y: 0,
                z: 0
            },
            shake: {
                eventCount: 0,
                intervalsPassed: 0,
                intervalsFreeze: 0
            },
            shakeleftright: {
                eventCount: 0,
                intervalsPassed: 0,
                intervalsFreeze: 0
            },
            shakefrontback: {
                eventCount: 0,
                intervalsPassed: 0,
                intervalsFreeze: 0
            },
            shakeupdown: {
                eventCount: 0,
                intervalsPassed: 0,
                intervalsFreeze: 0
            }
        };
        var q = {
            accelerationIncludingGravity: {
                x: r.accelerationIncludingGravity.x,
                y: r.accelerationIncludingGravity.y,
                z: r.accelerationIncludingGravity.z
            },
            shake: {
                eventCount: n.shake.eventCount,
                intervalsPassed: n.shake.intervalsPassed,
                intervalsFreeze: n.shake.intervalsFreeze
            },
            shakeleftright: {
                eventCount: n.shakeleftright.eventCount,
                intervalsPassed: n.shakeleftright.intervalsPassed,
                intervalsFreeze: n.shakeleftright.intervalsFreeze
            },
            shakefrontback: {
                eventCount: n.shakefrontback.eventCount,
                intervalsPassed: n.shakefrontback.intervalsPassed,
                intervalsFreeze: n.shakefrontback.intervalsFreeze
            },
            shakeupdown: {
                eventCount: n.shakeupdown.eventCount,
                intervalsPassed: n.shakeupdown.intervalsPassed,
                intervalsFreeze: n.shakeupdown.intervalsFreeze
            }
        };
        var p;
        var s;
        var l;
        for (k in o) {
            switch (k) {
            case "shake":
            case "shakeleftright":
            case "shakefrontback":
            case "shakeupdown":
                p = [];
                s = [];
                p.push(k);
                if (++q[k].intervalsFreeze > m.freezeShakes && q[k].intervalsFreeze < (2 * m.freezeShakes)) {
                    break
                }
                q[k].intervalsFreeze = 0;
                q[k].intervalsPassed++;
                if ((k === "shake" || k === "shakeleftright") && (q.accelerationIncludingGravity.x > m.leftright.sensitivity || q.accelerationIncludingGravity.x < ( - 1 * m.leftright.sensitivity))) {
                    p.push("leftright");
                    p.push("x-axis")
                }
                if ((k === "shake" || k === "shakefrontback") && (q.accelerationIncludingGravity.y > m.frontback.sensitivity || q.accelerationIncludingGravity.y < ( - 1 * m.frontback.sensitivity))) {
                    p.push("frontback");
                    p.push("y-axis")
                }
                if ((k === "shake" || k === "shakeupdown") && (q.accelerationIncludingGravity.z + 9.81 > m.updown.sensitivity || q.accelerationIncludingGravity.z + 9.81 < ( - 1 * m.updown.sensitivity))) {
                    p.push("updown");
                    p.push("z-axis")
                }
                if (p.length > 1) {
                    if (++q[k].eventCount == m.requiredShakes && (q[k].intervalsPassed) < m.freezeShakes) {
                        t.triggerHandler(k, d({
                            type: k,
                            description: p.join(":"),
                            event: r,
                            duration: q[k].intervalsPassed * 5
                        }));
                        q[k].eventCount = 0;
                        q[k].intervalsPassed = 0;
                        q[k].intervalsFreeze = m.freezeShakes + 1
                    } else {
                        if (q[k].eventCount == m.requiredShakes && (q[k].intervalsPassed) > m.freezeShakes) {
                            q[k].eventCount = 0;
                            q[k].intervalsPassed = 0
                        }
                    }
                }
                break
            }
            l = {};
            l.oDeviceMotionLastDevicePosition = q;
            t.data("ojQueryGestures", c.extend(true, o, l))
        }
    }
    function h(l) {
        var k = jQuery(l.currentTarget);
        k.triggerHandler(c.jGestures.events.touchstart, l);
        if (c.hasGestures) {
            l.currentTarget.addEventListener("touchmove", g, false);
            l.currentTarget.addEventListener("touchend", j, false)
        } else {
            k.bind("mousemove", g);
            k.bind("mouseup", j)
        }
        var n = k.data("ojQueryGestures");
        var m = (l.touches) ? l.touches[0] : l;
        var o = {};
        o.oLastSwipemove = {
            screenX: m.screenX,
            screenY: m.screenY,
            timestamp: new Date().getTime()
        };
        o.oStartTouch = {
            screenX: m.screenX,
            screenY: m.screenY,
            timestamp: new Date().getTime()
        };
        k.data("ojQueryGestures", c.extend(true, n, o))
    }
    function g(t) {
        var v = jQuery(t.currentTarget);
        var s = v.data("ojQueryGestures");
        var q = !!t.touches;
        var l = (q) ? t.changedTouches[0].screenX: t.screenX;
        var k = (q) ? t.changedTouches[0].screenY: t.screenY;
        var r = s.oLastSwipemove;
        var o = l - r.screenX;
        var n = k - r.screenY;
        var u;
        if ( !! s.oLastSwipemove) {
            u = d({
                type: "swipemove",
                touches: (q) ? t.touches.length: "1",
                screenY: k,
                screenX: l,
                deltaY: n,
                deltaX: o,
                startMove: r,
                event: t,
                timestamp: r.timestamp
            });
            v.triggerHandler(u.type, u)
        }
        var m = {};
        var p = (t.touches) ? t.touches[0] : t;
        m.oLastSwipemove = {
            screenX: p.screenX,
            screenY: p.screenY,
            timestamp: new Date().getTime()
        };
        v.data("ojQueryGestures", c.extend(true, s, m))
    }
    function j(r) {
        var v = jQuery(r.currentTarget);
        var x = !!r.changedTouches;
        var u = (x) ? r.changedTouches.length: "1";
        var p = (x) ? r.changedTouches[0].screenX: r.screenX;
        var o = (x) ? r.changedTouches[0].screenY: r.screenY;
        v.triggerHandler(c.jGestures.events.touchendStart, r);
        if (c.hasGestures) {
            r.currentTarget.removeEventListener("touchmove", g, false);
            r.currentTarget.removeEventListener("touchend", j, false)
        } else {
            v.unbind("mousemove", g);
            v.unbind("mouseup", j)
        }
        var m = v.data("ojQueryGestures");
        var y = (Math.abs(m.oStartTouch.screenX - p) > c.jGestures.defaults.thresholdMove || Math.abs(m.oStartTouch.screenY - o) > c.jGestures.defaults.thresholdMove) ? true: false;
        var B = (Math.abs(m.oStartTouch.screenX - p) > c.jGestures.defaults.thresholdSwipe || Math.abs(m.oStartTouch.screenY - o) > c.jGestures.defaults.thresholdSwipe) ? true: false;
        var A;
        var t;
        var n;
        var l;
        var k;
        var q;
        var w = ["zero", "one", "two", "three", "four"];
        var s;
        for (A in m) {
            t = m.oStartTouch;
            n = {};
            p = (x) ? r.changedTouches[0].screenX: r.screenX;
            o = (x) ? r.changedTouches[0].screenY: r.screenY;
            l = p - t.screenX;
            k = o - t.screenY;
            q = d({
                type: "swipe",
                touches: u,
                screenY: o,
                screenX: p,
                deltaY: k,
                deltaX: l,
                startMove: t,
                event: r,
                timestamp: t.timestamp
            });
            s = false;
            switch (A) {
            case "swipeone":
                if (x === false && u == 1 && y === false) {
                    break
                }
                if (x === false || (u == 1 && y === true && B === true)) {
                    s = true;
                    q.type = ["swipe", w[u]].join("");
                    v.triggerHandler(q.type, q)
                }
                break;
            case "swipetwo":
                if ((x && u == 2 && y === true && B === true)) {
                    s = true;
                    q.type = ["swipe", w[u]].join("");
                    v.triggerHandler(q.type, q)
                }
                break;
            case "swipethree":
                if ((x && u == 3 && y === true && B === true)) {
                    s = true;
                    q.type = ["swipe", w[u]].join("");
                    v.triggerHandler(q.type, q)
                }
                break;
            case "swipefour":
                if ((x && u == 4 && y === true && B === true)) {
                    s = true;
                    q.type = ["swipe", w[u]].join("");
                    v.triggerHandler(q.type, q)
                }
                break;
            case "swipeup":
            case "swiperightup":
            case "swiperight":
            case "swiperightdown":
            case "swipedown":
            case "swipeleftdown":
            case "swipeleft":
            case "swipeleftup":
                if (x && y === true && B === true) {
                    s = true;
                    q.type = ["swipe", ((q.delta[0].lastX != 0) ? ((q.delta[0].lastX > 0) ? "right": "left") : ""), ((q.delta[0].lastY != 0) ? ((q.delta[0].lastY > 0) ? "down": "up") : "")].join("");
                    v.triggerHandler(q.type, q)
                }
                break;
            case "tapone":
            case "taptwo":
            case "tapthree":
            case "tapfour":
                if ((y !== true && s !== true) && (w[u] == A.slice(3))) {
                    q.description = ["tap", w[u]].join("");
                    q.type = ["tap", w[u]].join("");
                    v.triggerHandler(q.type, q)
                }
                break
            }
            var z = {};
            v.data("ojQueryGestures", c.extend(true, m, z));
            v.data("ojQueryGestures", c.extend(true, m, z))
        }
        v.triggerHandler(c.jGestures.events.touchendProcessed, r)
    }
    function e(l) {
        var k = jQuery(l.currentTarget);
        k.triggerHandler(c.jGestures.events.gesturestart, l);
        var m = k.data("ojQueryGestures");
        var n = {};
        n.oStartTouch = {
            timestamp: new Date().getTime()
        };
        k.data("ojQueryGestures", c.extend(true, m, n))
    }
    function f(l) {
        var k = jQuery(l.currentTarget);
        var p, m, r, o;
        var q = k.data("ojQueryGestures");
        var n;
        for (n in q) {
            switch (n) {
            case "pinch":
                p = l.scale;
                if (((p < 1) && (p % 1) < (1 - c.jGestures.defaults.thresholdPinchclose)) || ((p > 1) && (p % 1) > (c.jGestures.defaults.thresholdPinchopen))) {
                    m = (p < 1) ? -1 : +1;
                    o = d({
                        type: "pinch",
                        scale: p,
                        touches: null,
                        startMove: q.oStartTouch,
                        event: l,
                        timestamp: q.oStartTouch.timestamp,
                        vector: m,
                        description: ["pinch:", m, ":", ((p < 1) ? "close": "open")].join("")
                    });
                    k.triggerHandler(o.type, o)
                }
                break;
            case "rotate":
                p = l.rotation;
                if (((p < 1) && ( - 1 * (p) > c.jGestures.defaults.thresholdRotateccw)) || ((p > 1) && (p > c.jGestures.defaults.thresholdRotatecw))) {
                    m = (p < 1) ? -1 : +1;
                    o = d({
                        type: "rotate",
                        rotation: p,
                        touches: null,
                        startMove: q.oStartTouch,
                        event: l,
                        timestamp: q.oStartTouch.timestamp,
                        vector: m,
                        description: ["rotate:", m, ":", ((p < 1) ? "counterclockwise": "clockwise")].join("")
                    });
                    k.triggerHandler(o.type, o)
                }
                break
            }
        }
    }
    function i(l) {
        var k = jQuery(l.currentTarget);
        k.triggerHandler(c.jGestures.events.gestureendStart, l);
        var n;
        var o = k.data("ojQueryGestures");
        var m;
        for (m in o) {
            switch (m) {
            case "pinchclose":
                n = l.scale;
                if ((n < 1) && (n % 1) < (1 - c.jGestures.defaults.thresholdPinchclose)) {
                    k.triggerHandler("pinchclose", d({
                        type: "pinchclose",
                        scale: n,
                        vector: -1,
                        touches: null,
                        startMove: o.oStartTouch,
                        event: l,
                        timestamp: o.oStartTouch.timestamp,
                        description: "pinch:-1:close"
                    }))
                }
                break;
            case "pinchopen":
                n = l.scale;
                if ((n > 1) && (n % 1) > (c.jGestures.defaults.thresholdPinchopen)) {
                    k.triggerHandler("pinchopen", d({
                        type: "pinchopen",
                        scale: n,
                        vector: +1,
                        touches: null,
                        startMove: o.oStartTouch,
                        event: l,
                        timestamp: o.oStartTouch.timestamp,
                        description: "pinch:+1:open"
                    }))
                }
                break;
            case "rotatecw":
                n = l.rotation;
                if ((n > 1) && (n > c.jGestures.defaults.thresholdRotatecw)) {
                    k.triggerHandler("rotatecw", d({
                        type: "rotatecw",
                        rotation: n,
                        vector: +1,
                        touches: null,
                        startMove: o.oStartTouch,
                        event: l,
                        timestamp: o.oStartTouch.timestamp,
                        description: "rotate:+1:clockwise"
                    }))
                }
                break;
            case "rotateccw":
                n = l.rotation;
                if ((n < 1) && ( - 1 * (n) > c.jGestures.defaults.thresholdRotateccw)) {
                    k.triggerHandler("rotateccw", d({
                        type: "rotateccw",
                        rotation: n,
                        vector: -1,
                        touches: null,
                        startMove: o.oStartTouch,
                        event: l,
                        timestamp: o.oStartTouch.timestamp,
                        description: "rotate:-1:counterclockwise"
                    }))
                }
                break
            }
        }
        k.triggerHandler(c.jGestures.events.gestureendProcessed, l)
    }
})(jQuery);
