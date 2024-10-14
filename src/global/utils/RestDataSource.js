import Axios from 'axios';
// import ls from 'local-storage';
import { restbaseurl } from './constants';
import { updateUserInfo, clearCookies, parseJwt } from './index';
import { Token } from '@mui/icons-material';

class RestDataSource {
  static async SendRequest(method, url, callback, data = {}, urlType = 'api') {
    try { 
      const token="eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJzYWJhcmlAdGVrc2libGVncm91cC5jb20iLCJ1c2VyUm9sZSI6InN1cGVyX2FkbWluIiwiZXhwIjoxNzI5NzU0NTk0LCJ1c2VySWQiOiI2NzA5MWM4OWFmMDczMzViM2NlNmE3ZGIifQ.uzUCNjzxdLpSTYk0hUDUWlir4Y1ON4f9FhD3yry3_1yYsTkLYTX11uRDeBkZvfkbz63-JlNJGAhan_VUeijokA"

      const headers = {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`
      };
      // Axios.defaults.headers.post['Access-Control-Allow-Origin'] = '*';
      const request = await Axios.request({
        url,
        method,
        baseURL: restbaseurl,
        data,
        headers,
        withCredentials: true,
      });

      console.log(request, 'respdata')

      const resp = request.data;
      // console.log(parseJwt(request.data), resp.status, "responseData")
      if (request.status === 200) {
        console.log(resp, 'resp');
        const {
          estatus, data: responseData, valid, emessage
        } = resp;

        if (estatus && emessage) {
          console.log("stage1");
          if (String(url).search('/login_user') !== -1 || String(url).search('secure/pluginSSOLogin') !== -1 || String(url).search('a/n') !== -1) {
            // const { data: { valid, isBlocked } } = respdata;
            // if (valid === true && isBlocked === false) {
            console.log("stage2");
            if (valid === true) {
              console.log("stage3");
              updateUserInfo(responseData);
              localStorage.setItem('_c1', responseData);
            } else {
              console.log('Invalid Credentials');
            }
          } else {
            console.log("false1");
            const cookieObj = localStorage.getItem('_c1');
            if (cookieObj !== undefined && cookieObj !== null) {
              const now = new Date();
              console.log("false2");
              if (Math.floor(now.getTime() / 1000) <= cookieObj.expiry) {
                const cookie = parseJwt(cookieObj.data);
                cookieObj.expiry = Math.floor(now.getTime() / 1000) + cookie.max_age;
                localStorage.setItem('_c1', cookieObj);
              } else {
                localStorage.removeItem('_c1');
                window.localStorage.setItem('isEventClosed', '');
              }
            }
          }
        } else {
          console.log('Regular flow');
        }

        // if (!estatus === true) {
        //   console.log(estatus, 'estatus');
        //   if (String(url).search('/login') !== -1 || String(url).search('secure/pluginSSOLogin') !== -1 || String(url).search('a/n') !== -1) {
        //     // const { data: { valid, isBlocked } } = respdata;
        //     // if (valid === true && isBlocked === false) {
        //     console.log(valid, 'valid');
        //     if (valid) {
        //       updateUserInfo(responseData);
        //       localStorage.setItem('_c1', responseData);
        //     } else {
        //       console.log('Invalid Credentials');
        //     }
        //   } else {
        //     const cookieObj = localStorage.getItem('responseData');
        //     if (cookieObj !== undefined && cookieObj !== null) {
        //       const now = new Date();

        //       if (Math.floor(now.getTime() / 1000) <= cookieObj.expiry) {
        //         const cookie = parseJwt(cookieObj.data);
        //         cookieObj.expiry = Math.floor(now.getTime() / 1000) + cookie.max_age;
        //         localStorage.setItem('responseData', cookieObj);
        //       } else {
        //         localStorage.removeItem('responseData');
        //         window.localStorage.setItem('isEventClosed', '');
        //       }
        //     }
        //   }
        // }
        // else {
        //   console.log('Regular flow');
        // }
      }
      callback(resp);
    } catch (err) {
      console.log(err, 'err');
      // if (err && err.statusCode === 401 && err.message === 'Invalid token') {
      //   clearCookies();
      //   document.location.href = '/login';
      // } else if (err && err.statusCode === 401) {
      //   document.location.href = '/unauthorized';
      // } else if (err && err.statusCode === 500) {
      //   document.location.href = '/500';
      // }
    }
  }

  static async GetData(callback, url, data = {}, method = 'GET', urlType = 'api') {
    RestDataSource.SendRequest(method, url, callback, data, urlType);
  }

  static async Save(callback, url, data) {
    RestDataSource.SendRequest('post', url, callback, data);
  }

  static async Update(callback, url, data) {
    RestDataSource.SendRequest('put', `${url}/${data.id}`, callback, data);
  }

  static async Delete(callback, url, data) {
    RestDataSource.SendRequest('delete', `${url}/${data.id}`, callback, data);
  }

  static async Put(callback, url, data) {
    RestDataSource.SendRequest('put', url, callback, data);
  }

  static async crossDomainRequest(callback, method, url, data = {}, additionalReqParams = {}) {
    try {
      const req = Axios.request({
        method,
        url,
        data,
        ...additionalReqParams,
      });
      const resp = (await req);
      callback(resp.data);
    } catch (err) {
      console.log(err, 'err');
      if (err.response && err.response.status === 401) {
        document.location.href = '/unauthorized';
      } else if (err.response && err.response.status === 500) {
        // const isThirdEyeUrl = url.includes('proctoring/attemptGenuine')
        //  || url.includes('proctoring/saveAttemptScreen');
        // console.log(isThirdEyeUrl, 'thirdEyeUrl');
        // if (isThirdEyeUrl) {
        // console.log(err);
        // } else {
        //   document.location.href = '/500';
        // }
      }
    }
  }
}

export default RestDataSource;
