function sendCommandToTab(command) {
    var urls = [
        'https://plus.google.com/hangouts/*',
        'https://talkgadget.google.com/hangouts/*',
        'https://meet.google.com/*',
        'https://hangouts.google.com/*'
    ];


    chrome.tabs.query({ url: urls }, function(tabs) {
        for (var i = 0; i < tabs.length; i++) {
            var tab = tabs[i];

            chrome.tabs.sendMessage(tab.id, command);
        }
    });

}

chrome.commands.onCommand.addListener(sendCommandToTab);

chrome.browserAction.onClicked.addListener(function() {
    sendCommandToTab('toggle');
});
