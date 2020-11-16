/**
 * IOS 集成 https://github.com/marcuswestin/WebViewJavascriptBridge
 * Android 集成 https://github.com/lzyzsd/JsBridge
 * @param {*} callback
 */
function setupWebViewJavascriptBridge(callback) {
  if (window.WebViewJavascriptBridge) {
    return callback(WebViewJavascriptBridge);
  } else {
    // 兼容 android
    document.addEventListener(
      "WebViewJavascriptBridgeReady",
      function () {
        callback(WebViewJavascriptBridge);
      },
      false
    );
  }
  if (window.WVJBCallbacks) {
    return window.WVJBCallbacks.push(callback);
  }
  window.WVJBCallbacks = [callback];

  var WVJBIframe = document.createElement("iframe");
  WVJBIframe.style.display = "none";
  WVJBIframe.src = "https://__bridge_loaded__";
  document.documentElement.appendChild(WVJBIframe);
  setTimeout(function () {
    document.documentElement.removeChild(WVJBIframe);
  }, 0);
}

/**
 * type: call - 调用客户端方法、register - 注册方法让客户端调用
 * methodName 方法名
 * parameters 参数
 * responseCallback 回调函数
 *
 * //注册方法供客户端调用
 * BridgeClient("register", "NativeTest", {}, function(data) {});
 * //调用客户端方法
 * BridgeClient("call", "JSTest", { token: 333 }, function(data) {});
 */
const BridgeClient = function (type, methodName, parameters, responseCallback) {
  if (type == "call") {
    setupWebViewJavascriptBridge(function (iOSBridge) {
      iOSBridge.callHandler(methodName, JSON.stringify(parameters), function (
        json
      ) {
        responseCallback(json);
      });
    });
  } else {
    setupWebViewJavascriptBridge(function (bridge) {
      bridge.init && bridge.init(); // 兼容android
      bridge.registerHandler(methodName, function (data, responseCallback) {
        responseCallback(data);
      });
    });
  }
};

function GetRandom(start, end) {
  return start + Math.ceil(Math.random() * (end - start))
}

export {
  BridgeClient,
  GetRandom,
};
