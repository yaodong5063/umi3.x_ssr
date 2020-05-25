import axios from 'axios';
import { message } from 'antd';
import { history } from 'umi';
import { httpHost } from './setting.js';
import { rmStorage, getStorage } from './utils.js';

const codeMessage = {
  200: '服务器成功返回请求的数据。',
  201: '新建或修改数据成功。',
  202: '一个请求已经进入后台排队（异步任务）。',
  204: '删除数据成功。',
  400: '发出的请求有错误，服务器没有进行新建或修改数据的操作。',
  401: '用户没有权限（令牌、用户名、密码错误）。',
  403: '用户得到授权，但是访问是被禁止的。',
  404: '发出的请求针对的是不存在的记录，服务器没有进行操作。',
  406: '请求的格式不可得。',
  410: '请求的资源被永久删除，且不会再得到的。',
  422: '当创建一个对象时，发生一个验证错误。',
  500: '服务器发生错误，请检查服务器。',
  502: '网关错误。',
  503: '服务不可用，服务器暂时过载或维护。',
  504: '网关超时。',
};

//拦截器
axios.interceptors.response.use(
  function(response) {
    return response;
  },
  function(error) {
    if (401 === error.response.status) {
      history.push('/login');
    } else {
      return Promise.reject(error);
    }
  },
);

/**
 * Requests a URL, returning a promise.
 *
 * @param  {string} url       The URL we want to request
 * @param  {object} [option] The options we want to pass to "fetch"
 * @return {object}           An object containing either "data" or "err"
 */
export default function request(url, options) {
  const defaultVal = options.defaultVal || [];
  const tokenInfo = getStorage('tokenInfo') || {};
  const defaultHeaders = tokenInfo.accessToken
    ? {
        Authorization: 'Bearer ' + (tokenInfo.accessToken || ''),
      }
    : {};

  let headers = {};
  let submitOpts = {};

  let allUrl = (url.includes('http') ? '' : httpHost) + url; // 判断是否带有全链接
  if (
    options.method === 'post' ||
    options.method === 'put' ||
    options.method === 'delete'
  ) {
    if (!(options.params instanceof FormData)) {
      if (options.postType === 'values') {
        //values 提交
        headers = {
          'Content-Type': 'application/x-www-form-urlencoded',
          ...defaultHeaders,
        };
        submitOpts.data = stringify(options.data);
      } else {
        //body 方式提交 默认值
        headers = {
          Accept: 'application/json',
          'Content-Type': 'application/json',
          ...defaultHeaders,
        };
        submitOpts.data = JSON.stringify(options.data);
      }
    } else {
      // FormData提交 如 上传文件
      headers = {
        Accept: 'application/json',
        ...defaultHeaders,
      };
      submitOpts.data = options.data;
    }
  } else {
    //get
    headers = {
      Accept: 'application/json',
      ...defaultHeaders,
    };
    submitOpts.params = options.data;
  }

  return axios
    .request({
      url: allUrl,
      method: options.method,
      headers,
      responseType: options.update && 'blob',
      ...submitOpts,
    })
    .then(response => {
      //过滤错误信息
      const data = response?.data || {};
      if (options.uiniqueRes) {
        return data;
      } else if (
        data.state == 401 ||
        data.code == 401 ||
        data.code == 1001109
      ) {
        rmStorage('tokenInfo');
        message.error(data.message || codeMessage[response.status]);
        history.push('/login');
      } else if (!data || !(data.state === 0 || data.code === 0)) {
        message.error(data.message || codeMessage[response.status]);
        return { state: 1, code: 1, data: data };
      } else if (data.state === 1 || data.code === 1) {
        message.error(data.message || codeMessage[response.status]);
        return { state: 1, code: 1, data: data };
      }
      return data;
    })
    .catch(e => {
      return {
        state: 1,
        code: 1,
        data: defaultVal,
        message: codeMessage[e.status],
      };
    });
}
