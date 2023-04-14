//
//
//    YTNP2txt by Daniel M. (c)2022
//
//      https://github.com/T1G3R-DEV/YT2txt
//
//  
//




console.log('hi');

var time_current_old="";

var isON = false;
var infoRefreshInterval = 5000;
var targetIP= "http://localhost"
var targetPort= 8099;


chrome.storage.sync.get({
    ONOFF: true,
    refreshInterval: 5000,
    targetIP: "http://localhost",
    targetPort: 8099
}, function(items) {
    infoRefreshInterval = items.refreshInterval;
    isON = items.ONOFF;
    targetIP= items.targetIP;
    targetPort= items.targetPort;
});


var intervalId = window.setInterval(function()
{
    var video_title = document.querySelector('#container h1 yt-formatted-string');
    var video_creator = document.querySelector('#channel-name yt-formatted-string');
    var time_current = document.querySelector("#movie_player > div.ytp-chrome-bottom > div.ytp-chrome-controls > div.ytp-left-controls > div.ytp-time-display.notranslate > span:nth-child(2) > span.ytp-time-current")
    var time_duration = document.querySelector("#movie_player > div.ytp-chrome-bottom > div.ytp-chrome-controls > div.ytp-left-controls > div.ytp-time-display.notranslate > span:nth-child(2) > span.ytp-time-duration")
    if(isON)
    {
        if (time_current!=null)
        {
            if(time_current.textContent != time_current_old)
            {
                time_current_old = time_current.textContent;
                var xmlHttp = new XMLHttpRequest();
                xmlHttp.onreadystatechange = function() { }
                xmlHttp.open("GET",targetIP + ":" + targetPort + "/?video_title=" + video_title.textContent + "&video_creator=" + video_creator.textContent + "&time_current=" + time_current.textContent + "&time_duration=" + time_duration.textContent, true); // true for asynchronous 
                xmlHttp.send(null); 
            }
        }

    }  else clearInterval(intervalId);
}, infoRefreshInterval);






