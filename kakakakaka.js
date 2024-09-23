var interval;
function getRandomNumberBetween(min, max) {
    return Math.random() * (max - min) + min;
};
function press(t, n) {
    autoPress(pressAuto, 0, new KeyboardEvent('keydown', {code: t}), n);
    autoPress(pressAuto, 0, new KeyboardEvent('keydown', {code: t}), n);
};
function getPositionOfTank(t) {
    return Object.values(Object.values(searchInObject(t, '=== 2'))[0])[3]
};
function getInfoOfTank(t) {
    return Object.values(Object.values(searchInObject(t, '=== 2'))[0])
};
function isChatOpen() {
    return document.querySelectorAll('input[type="text"]').length > 0;
};
function searchInObject(objectToSearch, comparisonString) {
    if (typeof objectToSearch !== 'object' || objectToSearch === null) {
        throw new TypeError('First argument must be a non-null object');
    };
    let comparisonFunction;
    try {
        comparisonFunction = new Function('value', `return Object.values(value?.__proto__)?.length ${comparisonString};`);
    } catch (e) {
        throw new Error('Invalid comparison string');
    };
    return Object.fromEntries(
        Object.entries(objectToSearch).filter(([key, value]) => 
                                              comparisonFunction(value)
                                             )
    );
};
var first, second, third, fourth;
function onJoinGame() {
    first = searchInObject(Object.values(TEST[TEST.length - 1]).filter(t => t?.__proto__), '=== 15');
    second = searchInObject(Object.values(Object.values(first)[0]).filter(t => t?.__proto__), '> 18');
    third = searchInObject(Object.values(Object.values(second)[0]).filter(t => t?.__proto__), '=== 21');
    fourth = Object.values(searchInObject(Object.values(third[3]).filter(t => t?.__proto__), '=== 18'))[0];
    myTankPos = getPositionOfTank(getTanks('self')[0]);
    myTankInfo = getInfoOfTank(getTanks('self')[0]);
    otherTanks = getTanks('others');
};
var myTankPos, myTankInfo, otherTanks, otherTankPos, isGameActive = false;
function getTanks(t) {
    if (t == 'others') {
        return Object.values(fourth)[0].filter(p => {
            var first1 = Object.values(searchInObject(Object.values(p).filter(t => t?.__proto__), '=== 15'))[0];
            var second1 = searchInObject(Object.values(first1).filter(t => t?.__proto__), '=== 18');
            return Object.values(Object.values(second1)[0])[0].some(p => p.v12k_1)
        });
    } else if (t == 'self') {
        return Object.values(fourth)[0].filter(p => {
            var first1 = Object.values(searchInObject(Object.values(p).filter(t => t?.__proto__), '=== 15'))[0];
            var second1 = searchInObject(Object.values(first1).filter(t => t?.__proto__), '=== 18');
            return !Object.values(Object.values(second1)[0])[0].some(p => p.v12k_1)
        });
    } else if (t.includes('player')) {
        return Object.values(fourth)[0].filter(p => {
            var first1 = Object.values(searchInObject(Object.values(p).filter(t => t?.__proto__), '=== 15'))[0];
            var second1 = searchInObject(Object.values(first1).filter(t => t?.__proto__), '=== 18');
            return Object.values(Object.values(second1)[0])[0].some(p => p?.v12k_1?.includes(t.replace('player', '')))
        });
    } else {
        return;
    };
};
var eventListeners = [
    {
        elm: document,
        type: 'keydown',
        func: (e) => {
            if (!config.keysPressed.includes(e.key)) {
                config.keysPressed.push(e.key);
            };
            if ((config.keysPressed.includes('End') || config.keysPressed.includes(']')) && config.keysPressed.includes('2')) {
                e.preventDefault();
                if (config.hacks.antiAim.enabled && !config.hacks.antiAim.top) {
                    config.hacks.antiAim.top = true;
                    return;
                };
                config.hacks.antiAim.enabled = !config.hacks.antiAim.enabled;
                config.hacks.antiAim.top = false;
            };
        }
    },
    {
        elm: document,
        type: 'keyup',
        func: (e) => {
            if (config.keysPressed.includes(e.key)) {
                config.keysPressed = config.keysPressed.filter(t => t !== e.key);
            };
        }
    }
];
function addEventListeners() {
    eventListeners.forEach(e => {
        e.elm.addEventListener(e.type, e.func);
    });
    try {
        aa();
    } catch (error) {
        console.log(error);
        rr = false;
        cancelAnimationFrame(ff);
    };
};
function removeEventListeners() {
    eventListeners.forEach(e => {
        e.elm.removeEventListener(e.type, e.func);
        console.log(`removed ${e.type} to ${e.elm}`);
        rr = false;
        cancelAnimationFrame(ff);
    });
    clearInterval(interval);
};
var config = {
    tank: {
        position: {
            x: null,
            y: null,
            z: null
        }
    },
    hacks: {
        antiAim: {
            enabled: false,
            top: false
        }
    },
    keysPressed: []
};
var ff, rr = true;
function aa() {
    if (rr) {
        ff = requestAnimationFrame(aa);
        if (document.querySelectorAll('canvas').length > 1) {
            var t = document.querySelectorAll('canvas')[1];
            if (isGameActive && (t.classList.length > 1)) {
                isGameActive = false;
                resetSpec();
                window.TEST = [];
                window.shells = [];
            };
            if (!isGameActive && !(t.classList.length > 1)) {
                isGameActive = true;
                updateSpec();
                function onJoinGame2() {
                    try {
                        onJoinGame();
                    } catch (error) {
                        console.log(error);
                        setTimeout(() => {
                            onJoinGame2();
                        }, 1000);
                    };
                };
                onJoinGame2();
            };
        };
        if (config.hacks.antiAim.enabled) {
            for (let i=0;i<2;i++) {
                var i2 = 0;
                for (const k in t = myTankInfo[i]) {
                    if ((i2 < 4) && typeof t[k] == 'number') {
                        t[k] = 0;
                        i2++
                    };
                };
            };
            myTankPos.d18_1 = getRandomNumberBetween(Object.values(mapBounds)[0], Object.values(mapBounds)[3]);
            myTankPos.e18_1 = getRandomNumberBetween(Object.values(mapBounds)[1], Object.values(mapBounds)[4]);
            myTankPos.f18_1 = config.hacks.antiAim.top ? Object.values(mapBounds)[5] : Object.values(mapBounds)[2];
        };
    };
};
addEventListeners();
