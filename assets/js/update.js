var microphoneSelector;
var webcamSelector;
var stateSelector;

microphoneSelector = '.gbbhzb';
webcamSelector = '.YczAdf';
webcamStateClass = 'U8OAre';

if (document.location.href.indexOf("://meet.google.com/") > -1) {
    microphoneSelector ='.cwIDqe';
} else if (document.location.href.indexOf("://hangouts.google.com/") > -1) {
    microphoneSelector = '.IQ';
    webcamSelector = '.QQ';
    webcamStateClass = 'a-b-B';    
}

chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
    if (request == 'toggle') {
        updateButton(microphoneSelector); // Microphone
        updateButton(webcamSelector); // Webcam

        return true;
    } else if (request == 'toggleMicrophone') {
        updateButton(microphoneSelector); // Microphone
    } else if (request == 'toggleWebcam') {
        updateButton(webcamSelector); // Webcam
    }

    return false;
});

function updateButton(selector, state) {
    var button = document.querySelector(selector);
    if (!button) {
        console.warn('Mute/unmute Button is not found (used selector: ' + selector + ')');
    }
    simulateClick(button);
}

function simulateClick (element) {
    var initEvent = function (elt, str) {
        var clickEvent = document.createEvent('MouseEvents');
        clickEvent.initEvent(str, true, true);
        elt.dispatchEvent(clickEvent)
    };
    initEvent(element, 'mousedown');
    initEvent(element, 'click');
    initEvent(element, 'mouseup');
}
