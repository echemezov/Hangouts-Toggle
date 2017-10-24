var microphoneSelector;
var webcamSelector;
var stateSelector;

// These are old I think and doesn't apply to anything anymore
microphoneSelector = '.gbbhzb';
webcamSelector = '.YczAdf';
webcamStateClass = 'U8OAre';

if (document.location.href.indexOf("://meet.google.com/") > -1) {
    microphoneSelector ='.M3NQIf .cwIDqe';
    webcamSelector = '.RTgYBc .cwIDqe'
} else if (document.location.href.indexOf("://hangouts.google.com/hangouts") > -1) {
    microphoneSelector = '.IQ';
    webcamSelector = '.OQ';
    webcamStateClass = 'a-b-B';
} else if (document.location.href.indexOf("://hangouts.google.com/call") > -1) {
    microphoneSelector = '.xdiH8e';
    webcamSelector = '.WGQfVc';
    webcamStateClass = 'U8OAre';
}

chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
    if (request == 'toggle') {
        if (updateButton(microphoneSelector) && // Microphone
            updateButton(webcamSelector)); {// Webcam
            notifyUser("Mic & Cam toggled!");
        }
        
        return true;
    } else if (request == 'toggleMicrophone') {
        if(updateButton(microphoneSelector)){ // Microphone
            notifyUser("Mic toggled!");
        }
    } else if (request == 'toggleWebcam') {
        if(updateButton(webcamSelector)){ // Webcam
            notifyUser("Cam toggled!");
        } 
    }
    
    return false;
});

function updateButton(selector, state) {
    var button = document.querySelector(selector);
    if (!button) {
        console.warn('Mute/unmute Button is not found (used selector: ' + selector + ')');
        return false;
    }
    
    simulateClick(button);
    return true;
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

function notifyUser(message) {
    console.log('notifyUser', message);

    // Let's check if the browser supports notifications
    if (!("Notification" in window)) return;
  
    // Let's check whether notification permissions have already been granted
    if (Notification.permission === "granted") {
      // If it's okay let's create a notification
      var notification = new Notification(message);
    }
  
    // Otherwise, we need to ask the user for permission
    else if (Notification.permission !== "denied") {
      Notification.requestPermission(function (permission) {
        // If the user accepts, let's create a notification
        if (permission === "granted") {
          var notification = new Notification(message);
        }
      });
    }
  
    // At last, if the user has denied notifications, and you 
    // want to be respectful there is no need to bother them any more.
  }