var isFlutterInAppWebViewReady = false;

window.addEventListener("flutterInAppWebViewPlatformReady", function (event) {
    isFlutterInAppWebViewReady = true;
});

setTimeout(() => {
    console.log('isFlutterInAppWebViewReady : ' + isFlutterInAppWebViewReady);
}, 1000);

class MyRecevedCommands {
    static echo = 'echo';
    static setCurrentPosition = 'setCurrentPosition';
    static setMarker = 'setCarMarker';
}

class MySendCommands {
        static echo = 'echo';
        static openCarInfo = 'openCarInfo';
}

var port;

function AppLitener(event) {
        console.log("--------------");
        console.log(event);
        console.log("--------------");
        if (event.data == 'capturePort') {
            if (event.ports[0] != null) {
                port = event.ports[0];

                if (port == null) {
                    alert('message channel port is null');
                } else{
                    port.onmessage = receiveMessageFromApp;
                }5
            }
        }
    }

function receiveMessageFromApp(event) {
    console.log('received from app : ' + event.data);

    const receivedData = JSON.parse(event.data);
    const command = receivedData.command;
    const argument = receivedData.argument;

    if (command == MyRecevedCommands.echo) {
        console.log('echo : ' + argument);
    } else if (command == MyRecevedCommands.setCurrentPosition) {
        movePosition(argument.latitude, argument.longitude);
    } else if (command == MyRecevedCommands.setCarMarker) {
        setCarMarker(argument.latitude, argument.longitude);
    }
}

function sendMessageToApp(command, argument) {
    console.log('send to app : ' + command + ', ' + argument);
    
    if (command === MySendCommands.echo) {
        argument = `[${new Date().toISOString()}] ` + argument
    }

    if (window.port == null) {
        alert('Port is not ready yet');
        return;
    } else {
        window.port.postMessage(JSON.stringify({    
            command: command,
            argument: argument
        }));
    }
}

window.addEventListener('message', AppLitener, false);
