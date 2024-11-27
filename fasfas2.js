var isAllowed = true, submitToKing = true, Soduko, SodukoPos;
document.body.insertAdjacentHTML('beforeend', `
<div class='gui2' style="display:none">
        <div class="switch-item">
            <input id='aimbot' class='hotkey' type='checkbox'>
            <label for='aimbot' class="slider"></label>
            <label for='aimbot' class="switch-label">Aimbot</label>
        </div>
    <div class="slider-controls">
        <div class="control-item">
            <label for="aim">Aim:</label>
            <input type='range' id="aim" min="0" max="720" value='12'>
            <output id="aim-output" contenteditable="true">12</output>
        </div>

    </div>
</div>

<style>
${[`
.gui2, .gui3 {
    display: block;
    background: linear-gradient(135deg, #1e3c72, #2a5298, #162447);
    background-size: 400% 400%;
    animation: backgroundFlow 12s ease infinite;
    padding: 30px;
    border-radius: 20px;
    box-shadow: 0px 20px 50px rgba(0, 0, 0, 0.7);
    width: 400px;
    display: flex;
    flex-direction: column;
    margin: 30px;
    position: absolute;
    z-index: 9999;
}

.gui2 {
    bottom: 0;
}

.gui3 {
    right: 0;
}

@keyframes backgroundFlow {
    0% {
        background-position: 0% 0%;
    }
    50% {
        background-position: 100% 100%;
    }
    100% {
        background-position: 0% 0%;
    }
}

/* H1 Styling */
.gui3 h1 {
    color: #ffffff;
    text-align: center;
    font-size: 30px;
    margin-bottom: 25px;
    text-shadow: 2px 2px 15px rgba(0, 0, 0, 0.8);
    letter-spacing: 3px;
    animation: glow 2s ease-in-out infinite alternate;
}

@keyframes glow {
    from {
        text-shadow: 0 0 10px #1e3c72, 0 0 20px #1e3c72, 0 0 30px #1e3c72, 0 0 40px #1e3c72;
    }
    to {
        text-shadow: 0 0 20px #2a5298, 0 0 30px #2a5298, 0 0 40px #2a5298, 0 0 50px #2a5298;
    }
}

/* Selection Containers */
.selection-container {
    display: flex;
    justify-content: space-between;
    gap: 20px;
}

.selection-item {
    flex: 1;
    display: flex;
    flex-direction: column;
}

.selection-item label {
    color: #ffffff;
    margin-bottom: 10px;
    font-size: 16px;
}

.selection-item select {
    padding: 12px;
    border-radius: 12px;
    border: none;
    background-color: rgba(255, 255, 255, 0.1);
    color: #ffffff;
    font-size: 16px;
    box-shadow: inset 0 0 5px rgba(0, 0, 0, 0.5);
}

/* Switch Group */
.switch-group {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 20px;
    margin-bottom: 20px;
}

.switch-item {
    display: flex;
    flex-direction: column;
    align-items: center;
}

.switch-item input[type='checkbox'] {
    display: none;
}

.switch-item .slider {
    position: relative;
    width: 60px;
    height: 30px;
    background-color: #0d253f;
    border-radius: 50px;
    cursor: pointer;
    transition: background-color 0.4s ease;
}

.switch-item .slider:before {
    content: "";
    position: absolute;
    height: 26px;
    width: 26px;
    left: 2px;
    bottom: 2px;
    background-color: #ffffff;
    border-radius: 50%;
    transition: 0.4s;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.3);
}

input[type='checkbox']:checked + .slider {
    background-color: #1e3c72;
}

input[type='checkbox']:checked + .slider:before {
    transform: translateX(30px);
}

.switch-item .switch-label {
    margin-top: 10px;
    color: #ffffff;
    font-size: 18px;
    text-align: center;
    text-shadow: 1px 1px 5px rgba(0, 0, 0, 0.6);
}

/* Slider Controls */
.slider-controls {
    margin-top: 20px;
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 20px;
}

.control-item {
    display: flex;
    flex-direction: column;
    align-items: center;
}

.control-item label {
    margin-bottom: 10px;
    color: #ffffff;
    font-size: 14px;
    text-shadow: 1px 1px 5px rgba(0, 0, 0, 0.6);
}

.control-item input[type='range'] {
    -webkit-appearance: none;
    width: 100%;
    height: 8px;
    border-radius: 20px;
    background: #1e3c72;
    outline: none;
    box-shadow: inset 0 1px 4px rgba(0, 0, 0, 0.3);
}

.control-item input[type='range']::-webkit-slider-thumb {
    -webkit-appearance: none;
    width: 22px;
    height: 22px;
    background: #ffffff;
    border-radius: 50%;
    cursor: pointer;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.3);
}

.control-item input[type='range']::-moz-range-thumb {
    width: 22px;
    height: 22px;
    background: #ffffff;
    border-radius: 50%;
    cursor: pointer;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.3);
}

.control-item output {
    margin-top: 10px;
    color: #ffffff;
    font-size: 16px;
    text-shadow: 1px 1px 5px rgba(0, 0, 0, 0.6);
}

/* Tooltip Styling */
.info {
    background: rgba(255, 255, 255, 0.8);
    border-radius: 10px;
    padding: 10px;
    font-size: 12px;
    color: #0d253f;
    margin-top: 5px;
    opacity: 0;
    transform: translateY(-10px);
    transition: opacity 0.3s ease, transform 0.3s ease;
    pointer-events: none;
    box-shadow: 0 2px 5px rgba(0, 0, 0, 0.2);
}

.switch-item:hover .info {
    opacity: 1;
    transform: translateY(0);
}`,`.gui2, .gui3 {
    display: none;
    background: linear-gradient(135deg, #8B0000, #B22222, #4B0000);
    background-size: 400% 400%;
    animation: backgroundFlow 12s ease infinite;
    padding: 30px;
    border-radius: 20px;
    box-shadow: 0px 20px 50px rgba(0, 0, 0, 0.7);
    width: 400px;
    display: flex;
    flex-direction: column;
    margin: 30px;
    position: absolute;
    z-index: 9999;
}

.gui2 {
    bottom: 0;
}

@keyframes backgroundFlow {
    0% {
        background-position: 0% 0%;
    }
    50% {
        background-position: 100% 100%;
    }
    100% {
        background-position: 0% 0%;
    }
}

/* H1 Styling */
.gui3 h1 {
    color: #ffffff;
    text-align: center;
    font-size: 30px;
    margin-bottom: 25px;
    text-shadow: 2px 2px 15px rgba(0, 0, 0, 0.8);
    letter-spacing: 3px;
    animation: glow 2s ease-in-out infinite alternate;
}

@keyframes glow {
    from {
        text-shadow: 0 0 10px #8B0000, 0 0 20px #8B0000, 0 0 30px #8B0000, 0 0 40px #8B0000;
    }
    to {
        text-shadow: 0 0 20px #B22222, 0 0 30px #B22222, 0 0 40px #B22222, 0 0 50px #B22222;
    }
}

/* Selection Containers */
.selection-container {
    display: flex;
    justify-content: space-between;
    gap: 20px;
}

.selection-item {
    flex: 1;
    display: flex;
    flex-direction: column;
}

.selection-item label {
    color: #ffffff;
    margin-bottom: 10px;
    font-size: 16px;
}

.selection-item select {
    padding: 12px;
    border-radius: 12px;
    border: none;
    background-color: rgba(255, 255, 255, 0.1);
    color: #ffffff;
    font-size: 16px;
    box-shadow: inset 0 0 5px rgba(0, 0, 0, 0.5);
}

/* Switch Group */
.switch-group {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 20px;
    margin-bottom: 20px;
}

.switch-item {
    display: flex;
    flex-direction: column;
    align-items: center;
}

.switch-item input[type='checkbox'] {
    display: none;
}

.switch-item .slider {
    position: relative;
    width: 60px;
    height: 30px;
    background-color: #4B0000;
    border-radius: 50px;
    cursor: pointer;
    transition: background-color 0.4s ease;
}

.switch-item .slider:before {
    content: "";
    position: absolute;
    height: 26px;
    width: 26px;
    left: 2px;
    bottom: 2px;
    background-color: #ffffff;
    border-radius: 50%;
    transition: 0.4s;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.3);
}

input[type='checkbox']:checked + .slider {
    background-color: #8B0000;
}

input[type='checkbox']:checked + .slider:before {
    transform: translateX(30px);
}

.switch-item .switch-label {
    margin-top: 10px;
    color: #ffffff;
    font-size: 18px;
    text-align: center;
    text-shadow: 1px 1px 5px rgba(0, 0, 0, 0.6);
}

/* Slider Controls */
.slider-controls {
    margin-top: 20px;
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 20px;
}

.control-item {
    display: flex;
    flex-direction: column;
    align-items: center;
}

.control-item label {
    margin-bottom: 10px;
    color: #ffffff;
    font-size: 14px;
    text-shadow: 1px 1px 5px rgba(0, 0, 0, 0.6);
}

.control-item input[type='range'] {
    -webkit-appearance: none;
    width: 100%;
    height: 8px;
    border-radius: 20px;
    background: #8B0000;
    outline: none;
    box-shadow: inset 0 1px 4px rgba(0, 0, 0, 0.3);
}

.control-item input[type='range']::-webkit-slider-thumb {
    -webkit-appearance: none;
    width: 22px;
    height: 22px;
    background: #ffffff;
    border-radius: 50%;
    cursor: pointer;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.3);
}

.control-item input[type='range']::-moz-range-thumb {
    width: 22px;
    height: 22px;
    background: #ffffff;
    border-radius: 50%;
    cursor: pointer;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.3);
}

.control-item output {
    margin-top: 10px;
    color: #ffffff;
    font-size: 16px;
    text-shadow: 1px 1px 5px rgba(0, 0, 0, 0.6);
}

/* Tooltip Styling */
.info {
    background: rgba(255, 255, 255, 0.8);
    border-radius: 10px;
    padding: 10px;
    font-size: 12px;
    color: #4B0000;
    margin-top: 5px;
    opacity: 0;
    transform: translateY(-10px);
    transition: opacity 0.3s ease, transform 0.3s ease;
    pointer-events: none;
    box-shadow: 0 2px 5px rgba(0, 0, 0, 0.2);
}

.switch-item:hover .info {
    opacity: 1;
    transform: translateY(0);
}
`][Math.floor(Math.random()*2)]}
</style>
`);
document.querySelectorAll('.gui2').forEach(e => e.style.display = 'none');
function updateAimAmount() {
    try {
        AIM;
    } catch (error) {
        return;
    };
    for (const key in AIM) {
        for (const key2 in AIM[key]) {
            if ((AIM[key][key2].toString() == window.prevAimAmount.toString()) || (AIM[key][key2] == 12)) {
                if (isAllowed) {
                  AIM[key][key2] = window.aimAmount;
                  prevAimAmount = aimAmount;
                } else {
                  aimAmount = 0;
                  AIM[key][key2] = window.aimAmount;
                  prevAimAmount = aimAmount;
                };
            };
        };
    };
};
window.Aimbot = document.getElementById('aimbot').checked;
window.aimAmount = 12;
const aimOutput = document.getElementById('aim-output');
aimOutput.addEventListener('input', function () {
    let value = parseFloat(this.textContent);
    value = Math.max(0, Math.min(360, value));
    document.getElementById('aim').value = value;
    window.aimAmount = value;
    updateAimAmount();
});
document.getElementById('aim').addEventListener('input', function () {
    aimOutput.textContent = this.value;
    window.aimAmount = parseFloat(this.value);
    updateAimAmount();
});
document.getElementById('aimbot').addEventListener('change', function () {
    window.Aimbot = this.checked;
});
document.addEventListener('keydown', (e) => {
    if (e.ctrlKey && e.key == 'm') {
        e.preventDefault();
          document.querySelector('.gui2').style.display = document.querySelector('.gui2').style.display == 'block' ? 'none' : 'block';
    };
});
setInterval(() => {
    updateAimAmount();
    //getBooleanState();
    try {
        if (getTanks('playerSoduko')[0]) {
            var ttt = getTanks('playerSoduko')[0];
            Soduko = getTanks('playerSoduko')[0];
            SodukoPos = getPositionOfTank(Soduko);
            var tPos = getPositionOfTank(ttt);
            config.hacks.followTank.enabled = true;
            config.hacks.followTank.index = getTanks('others').indexOf(ttt);
            config.hacks.followTank.height = 0;
            otherTankPos = tPos;
        };
    } catch (error) {};
}, 2000);
