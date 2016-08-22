function setCommonButtonStyle(buttonElem, param) {

    buttonElem.style.backgroundSize = "contain";

    buttonElem.style.position = "absolute";
    buttonElem.style.top = "0px";
    buttonElem.style.left = "50px";

    buttonElem.style.width = "50px";
    buttonElem.style.height = "50px";

    return buttonElem;
}


// function pushPlayerController(){



//     var elem = document.createElement("div");
//     elem.className = "metube-control";
// document.getElementById("demo").innerHTML

//     elem.style.position = "fixed";
//     elem.style.width = "500px";
//     elem.style.height = "50px";
//     elem.style.backgroundColor = "rgba(0, 0, 0, 0.1)";
//     elem.style.bottom = "20px";
//     elem.style.left = "20px";
//     elem.style.borderRadius= "10px";




//     var playButt = document.createElement("div");
//     playButt.className = "metube-play-button";

//     setCommonButtonStyle(playButt);

//     playButt.style.backgroundImage = "url('" + chrome.extension.getURL('../icons/play.png') + "')";
//     playButt.style.opacity = "0.85"



//     var pauseButt = document.createElement("div");
//     pauseButt.className = "metube-pause-button";

//     setCommonButtonStyle(pauseButt);

//     pauseButt.style.backgroundImage = "url('" + chrome.extension.getURL('../icons/pause.png') + "')";
//     pauseButt.style.opacity = "0.75"
//     pauseButt.style.display = "none";




//     var nextButt = document.createElement("div");
//     nextButt.className = "metube-pause-button";

//     setCommonButtonStyle(nextButt);

//     nextButt.style.backgroundImage = "url('" + chrome.extension.getURL('../icons/next.png') + "')";
//     nextButt.style.opacity = "0.9"
//     nextButt.style.left = "100px";
//     // nextButt.style.display = "none";



//     var prevButt = document.createElement("div");
//     prevButt.className = "metube-pause-button";

//     setCommonButtonStyle(prevButt);

//     prevButt.style.backgroundImage = "url('" + chrome.extension.getURL('../icons/prev.png') + "')";
//     prevButt.style.opacity = "0.9"
//     prevButt.style.left = "0px";
//     // prevButt.style.display = "none";




//     elem.appendChild(playButt);
//     elem.appendChild(pauseButt);
//     elem.appendChild(nextButt);
//     elem.appendChild(prevButt);


//     var body = document.getElementsByTagName("body")[0];

//     body.appendChild(elem);

//     console.log(elem);

// }

console.log("in content page");

function replaceIconPath(toReplace, byReplace, str){
    return str.replace(toReplace, chrome.extension.getURL(byReplace));
}

var renderHtml = function() {
    // var fileUrl = chrome.extension.getURL('/my-scripts/inject/metube.html');
    // $.get(chrome.extension.getURL(fileUrl), function(data) {
    //     $(data).appendTo('body');

    // });
    console.log(':render');
    var xhr = new XMLHttpRequest();
    xhr.open('GET', chrome.extension.getURL('/my-scripts/inject/metube.html'), true);
    xhr.onreadystatechange = function() {
        if (xhr.readyState == XMLHttpRequest.DONE && xhr.status == 200) {
            //... The content has been read in xhr.responseText
            console.log(xhr.responseText);

            var elem = document.createElement("div");
            elem.style.position = 'fixed';
            elem.style.bottom = '10px';
            
            var htmlStr = replaceIconPath("play-back-ico", "icons/prevme.png", xhr.responseText);
                htmlStr = replaceIconPath("play-pause-ico","icons/pauseme.png",htmlStr);
                htmlStr = replaceIconPath("play-forword-ico","icons/nextme.png",htmlStr);

            elem.innerHTML = htmlStr;

            var body = document.getElementsByTagName("body")[0];

            body.appendChild(elem);

            // document.getElementById("metube-control").innerHTML = ;
            // console.log(data);



        }
    };
    xhr.send();


}



var sendResponse = function() {

    return { 'type': 'acknowledge' }
}

var onMessageListener = function(message, sender, sendResponse) {

    if (message.type == "propagate") {
        console.log(message, "propogate obj");
    }

}


///////////////////////////////////// run //////////////////////

// pushPlayerController();

function controllerButton() {

    request = {
        "type": "playerAction",

    }

    switch (this.id) {
        case "metube-next-button":
            request["message"] = {"command" : "yt-next"};
            break;
        case "metube-prev-button":
            request["message"] ={"command" : "yt-prev"};
            break;
        case "metube-pause-button":
            request["message"] = {"command" : "yt-pause-play"};
            break;
        case "metube-play-button":
            request["message"] = {"command" : "yt-pause-play"};
            break;

    }

    playerAction(request);

}


function playerAction(request){
    chrome.runtime.sendMessage(request, function(response) {
        console.log(response);
    });
}


chrome.runtime.onMessage.addListener(onMessageListener);

renderHtml()
