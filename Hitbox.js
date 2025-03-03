var Tanki = {
    get allTanks() {
        if (!Utils.cameraComponent) return;
        var t = Object.values(Object.values(searchInObject(Object.values(searchInObject(Object.values(searchInObject(Object.values(searchInObject(Utils.cameraComponent, '==15'))[0], '==65'))[0], '==21'))[0], '==18'))[0])[0];
        for (let i=0;i<t.length;i++) {
            t[i].espInfo = Object.values(searchInObject(Object.values(Object.values(searchInObject(Object.values(searchInObject(t[i], '==15'))[0], '==18'))[0])[0], '==2'))[0]
        };
        return t;
    },
    get tankPhysicsComponent() {
        return Utils.tankPhysicsComponent;
    },
    get tankPosition() {
        return getPositionOfTank(getTanks('self')[0]);
    },
    get interpolatedTankPosition() {
        return getIntPosOfTank(config.utils.tank);
    },
    get tankPositionVelocity() {
        return getInfoOfTank(getTanks('self')[0])[0];
    },
    get tankQuaternions() {
        return getInfoOfTank(getTanks('self')[0])[1];
    },
    get shells() {
        return Object.entries(Object.values(searchInObject(Utils.gunParamsCalculator, '==19'))[0]).filter(t => typeof t[1] == 'object')[0][1];
    },
    get tankOrientationVelocity() {
        return getInfoOfTank(getTanks('self')[0])[2];
    },
    get camera() {
        return Utils.followCamera;
    },
    get cameraDirectionName() {
        return Object.entries(Utils.followCamera).filter(t => typeof t[1] == 'number')[0][0];
    },
    get cameraElavationName() {
        return Object.entries(Utils.followCamera).filter(t => typeof t[1] == 'number')[2][0];
    },
    get cameraDirection() {
        return Utils.followCamera[Tanki.cameraDirectionName];
    },
    get cameraElavation() {
        return Utils.followCamera[Tanki.cameraElavationName];
    },
    get cameraPosition() {
        return Object.values(searchInObject(Object.values(searchInObject(Utils.followCamera, '==1'))[3], '==41'))[0];
    },
    get flags() {
        return Utils.flags;
    },
    get teamFlagPosition() {
        return Object.values(searchInObject(Object.values(searchInObject(Utils.flags[0], '==3'))[0], '==41'))[0];
    },
    get enemyFlagPosition() {
        return Object.values(searchInObject(Object.values(searchInObject(Utils.flags[1], '==3'))[0], '==41'))[0];
    },
    set cameraDirection(t) {
        return Utils.followCamera[Tanki.cameraDirectionName] = t;
    },
    set cameraElavation(t) {
        return Utils.followCamera[Tanki.cameraElavationName] = t;
    },
    get turretDirectionName() {
        return Object.entries(Utils.turret, '==0').filter(t => typeof t[1] == 'number')[0][0];
    },
    get turretDirection() {
        return Utils.turret[Tanki.turretDirectionName];
    },
    set turretDirection(t) {
        return Utils.turret[Tanki.turretDirectionName] = t;
    },
    getTurretDirectionOfTank: function (t) {
        return Object.values(Object.values(searchInObject(Object.values(searchInObject(Object.entries(Object.values(Object.values(searchInObject(Object.values(searchInObject(t.espInfo, '==15'))[0], '==18'))[0])[0]).filter(t => t[1]?.m12z_1)[0][1], '==14'))[0], '==19'))[1])[1][0][Tanki.turretDirectionName];
    },
    setTurretDirectionOfTank: function (t, p) {
        return Object.values(Object.values(searchInObject(Object.values(searchInObject(Object.entries(Object.values(Object.values(searchInObject(Object.values(searchInObject(t.espInfo, '==15'))[0], '==18'))[0])[0]).filter(t => t[1]?.m12z_1)[0][1], '==14'))[0], '==19'))[1])[1][0][Tanki.turretDirectionName] = p;
    }
};
function getTanks(t) {
    if (t == 'others') {
        return Object.values(Tanki.allTanks).filter(p => {
            var first1 = Object.values(searchInObject(Object.values(p).filter(t => t?.__proto__), '=== 15'))[0];
            var second1 = searchInObject(Object.values(first1).filter(t => t?.__proto__), '=== 18');
            var third1 = searchInObject(Object.values(Object.values(second1)[0])[0], '==8');
            return typeof Object.values(searchInObject(Object.values(third1)[2], '==0'))[2] == 'number';
        });
    } else if (t == 'self') {
        return Object.values(Tanki.allTanks).filter(p => {
            var first1 = Object.values(searchInObject(Object.values(p).filter(t => t?.__proto__), '=== 15'))[0];
            var second1 = searchInObject(Object.values(first1).filter(t => t?.__proto__), '=== 18');
            var third1 = searchInObject(Object.values(Object.values(second1)[0])[0], '==8');
            return typeof Object.values(searchInObject(Object.values(third1)[2], '==0'))[2] == 'boolean';
        });
    } else if (t.includes('player')) {
        return Object.values(Tanki.allTanks).filter(p => {
            var first1 = Object.values(searchInObject(Object.values(p).filter(t => t?.__proto__), '=== 15'))[0];
            var second1 = searchInObject(Object.values(first1).filter(t => t?.__proto__), '=== 18');
            var third1 = searchInObject(Object.values(Object.values(second1)[0])[0], '==8');
            return Object.values(searchInObject(Object.values(third1)[2], '==0'))[1]?.toString()?.includes(t.replace('player', ''));
        });
    } else if (t.includes('enemies')) {
        return Object.values(Tanki.allTanks).filter(p => {
            var first1 = Object.values(searchInObject(Object.values(p).filter(t => t?.__proto__), '=== 15'))[0];
            var second1 = searchInObject(Object.values(first1).filter(t => t?.__proto__), '=== 18');
            var third1 = searchInObject(Object.values(Object.values(second1)[0])[0], '==8');
            var fourth1;
            try {
                fourth1 = Object.values(Object.values(searchInObject(Object.values(third1)?.[2], '==1'))?.[2])?.[0] == 'ENEMY';
            } catch (e){};
            if (fourth1) return fourth1;
        });
    } else if (t.includes('allies')) {
        return Object.values(Tanki.allTanks).filter(p => {
            var first1 = Object.values(searchInObject(Object.values(p).filter(t => t?.__proto__), '=== 15'))[0];
            var second1 = searchInObject(Object.values(first1).filter(t => t?.__proto__), '=== 18');
            var third1 = searchInObject(Object.values(Object.values(second1)[0])[0], '==8');
            var fourth1;
            try {
                fourth1 = Object.values(Object.values(searchInObject(Object.values(third1)?.[2], '==1'))?.[2])?.[0] == 'ALLY';
            } catch (e){};
            if (fourth1) return fourth1;
        });
    } else {
        return;
    };
};
function searchInObject(objectToSearch, comparisonString) {
    try {
        objectToSearch = Object.values(objectToSearch).filter(t => t?.__proto__);
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
    } catch (e){}
};
var config = {
    hacks: {
        hitbox: {
            enabled: false,
            amount: 2
        },
        ignoreTanks: {
            enabled: false
        }
    },
    utils: {
        tank: null
    }
};
var animationFrameId;
function animationFrameFunc() {
    animationFrameId = requestAnimationFrame(animationFrameFunc);
    if (config.hacks.hitbox.enabled) {
        enemies.forEach(e => {
            var body = Object.values(searchInObject(Object.values(searchInObject(Object.values(searchInObject(e, '==14'))[0], '==3'))[0], '==43'))[0];
            if (body.scaled) return;
            for (const k in body) {
                if (typeof body[k] == 'number') {
                    body[k] *= config.hacks.hitbox.amount;
                };
            };
            body.scaled = true;
        });
    };
    if (config.hacks.ignoreTanks.enabled) {
        var body = Object.values(searchInObject(Object.values(searchInObject(Object.values(searchInObject(myTank, '==14'))[0], '==3'))[0], '==43'))[0];
        if (!body) return;
        if (body.scaled) return;
        for (const k in body) {
            if (typeof body[k] == 'number') {
                body[k] = 0;
            };
        };
        body.scaled = true;
    };
};
animationFrameFunc();
var intervalLoop = setInterval(() => {
    config.utils.tank = getTanks('self')[0];
}, 2000);
