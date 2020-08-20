
import Axios from 'axios'
import { Toast } from 'vant';


Axios.defaults.baseURL = process.env.VUE_APP_API;

Axios.interceptors.request.use(function (config) {
  config.headers.Authorization = localStorage.getItem('TOKEN') || "";
  config.headers.trackChannel = "H5";

  return config;
}, function (error) {
  Toast("网络不稳定，请稍后再试")
  return Promise.reject(JSON.stringify({ error }));
});

Axios.interceptors.response.use(
  res => {

    if (!res.data.code) {
      return res;
    }

    const code = res.data.code;
    const message = res.data.subMessage;

    if (code == 200) {
      return res; // return res.data;
    } else if (code == 513 || code == 516) {
      Toast(res.data.subMessage);
    } else if (code == 401) {
      Toast("请重新登录~");
    } else {
      if (code !== "-1") {
        Toast("网络不稳定，请稍后再试～");
      }
    }
    return Promise.reject(JSON.stringify({ code, message }));
  }, function (error) {
    Toast("网络不稳定 ，请稍后再试～");
    return Promise.reject(JSON.stringify({ error }));
  }
);

const $get = (url, params) => {
  return Axios({
    method: "GET",
    url: url,
    params: params
  });
}

const $post = (url, params) => {
  return Axios({
    method: "POST",
    url: url,
    data: params
  });
}
export default {
  $get,
  $post,
}