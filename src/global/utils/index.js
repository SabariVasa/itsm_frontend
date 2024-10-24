/* eslint-disable react/jsx-props-no-spreading */
import Cookies from 'js-cookie';
import UserInfo from '../../models/UserInfo';
import GlobalService from '../../services/GlobalService';
import { resturls } from './apiurls';
import { cookiedomain, restbaseurl } from './constants';
// import { Route, Navigate } from 'react-router-dom';
import React from 'react';
import { Redirect, Route } from 'react-router-dom/cjs/react-router-dom.min';

function parseJwt(token) {
  console.log('token', token);
  const base64Url = token.split('.')[1];
  const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
  const jsonPayload = decodeURIComponent(atob(base64).split('').map((c) => `%${(`00${c.charCodeAt(0).toString(16)}`).slice(-2)}`).join(''));
  console.log('Payload', jsonPayload);
  return JSON.parse(jsonPayload);
}
console.log(restbaseurl, 'restbaseurl');
function updateC1() {
  const expmin = new Date(new Date().getTime() + 20 * 60 * 1000);
  const val1 = Cookies.get('_c1', { domain: cookiedomain });
  if (val1 !== undefined && val1 !== null) {
    // console.log('updateC1  val1', val1);
    Cookies.remove('_c1', { domain: cookiedomain });
    Cookies.set('_c1', val1, { path: '/', expires: expmin, domain: cookiedomain });
    // const p = parseJwt(val1);
    // console.log('update - C1 Payload', p);
  }
}

function updateUserInfo(c1 = null) {
  let val1 = c1;
  console.log(cookiedomain);
  const ck = Cookies.get('_c1', { domain: cookiedomain });

  if (ck != null) {
    val1 = ck;
    console.log('Thru cookie');
  } else if (c1 !== undefined && c1 !== null) {
    const cookie = parseJwt(c1);
    const now = new Date();
    const cookieObj = {
      data: (c1),
      expiry: now.getTime() + cookie.max_age,
    };
    localStorage.setItem('_c1', cookieObj);
    console.log('Thru Params - post login');
  }
  if (val1 === undefined || val1 === null) {
    const cookieObj = localStorage.getItem('_c1');
    if (cookieObj !== undefined && cookieObj !== null) {
      const cookie = parseJwt(cookieObj.data);
      const now = new Date();

      if (Math.floor(now.getTime() / 1000) <= cookieObj.expiry) {
        val1 = cookieObj.data;
        cookieObj.expiry = Math.floor(now.getTime() / 1000) + cookie.max_age;
        localStorage.setItem('_c1', cookieObj);
      } else {
        localStorage.removeItem('_c1');
        window.localStorage.setItem('isEventClosed', '');
      }
    }
    console.log('Thru Local Store');
  }

  if (val1 !== undefined && val1 !== null && val1) {
    const data = parseJwt(val1);
    console.log(data, 'parseValue');
    UserInfo.setUserDetail(data);
    localStorage.setItem('userName', data.sub);
    localStorage.setItem('role', data.userRole);
    localStorage.setItem('userId', data.userId);
    console.log('data\n\n');
    console.log(data, 'data\n\n');
  } else {
    console.log('updateUserInfo - Cookie / localStorage / Params not found');
  }
}

function clearCookies() {
  let ck = Cookies.get('_c1', { domain: cookiedomain });
  console.log('before logout ck', ck, cookiedomain);
  Cookies.remove('_c1', { domain: cookiedomain });
  ck = Cookies.get('_c1', { domain: cookiedomain });
  console.log('after logout ck', ck, cookiedomain);
  localStorage.removeItem('_c1');
  document.cookie = '_c1=; Path=/; Expires=Thu, 01 Jan 1970 00:00:01 GMT;';
  document.location.href = '/login';
  window.localStorage.setItem('isEventClosed', '');
  window.localStorage.setItem('authAmphiSessionId', undefined);
}

function processLogout(redirectToLogin = true) {
  console.log('Logout process');
  const obj = {};
  GlobalService.generalSelect(
    (respdata) => {
      const { estatus, emessage, data } = respdata;
      console.log(estatus, emessage, data);
      if (estatus && emessage) {
        if (data.status === 'logged out') {
          let ck = Cookies.get('_c1', { domain: cookiedomain });
          console.log('before logout ck', ck, cookiedomain);
          Cookies.remove('_c1', { domain: cookiedomain });
          localStorage.removeItem('schoolId');
          localStorage.removeItem('schoolName');
          ck = Cookies.get('_c1', { domain: cookiedomain });
          console.log('after logout ck', ck, cookiedomain);
          localStorage.removeItem('_c1');
          localStorage.removeItem('institutionId');
          localStorage.removeItem('domain');
          localStorage.removeItem('activePrgmScreen');
          localStorage.removeItem('roleDetailsMap');
          localStorage.removeItem('defaultRedirection');
          document.cookie = '_c1=; Path=/; Expires=Thu, 01 Jan 1970 00:00:01 GMT;';
          if (redirectToLogin) {
            document.location.href = '/login';
          }
          UserInfo.clear();
          window.localStorage.setItem('isEventClosed', '');
          if (window.ReactNativeWebView) {
            window.ReactNativeWebView.postMessage('loggedOut');
            window.ReactNativeWebView.postMessage('loggedOut');
          }
        }
      }
    }, resturls.logout, obj, 'POST',
  );
}

function PrivateRoute({ component: Component, cprops, ...rest }) {
  // console.log('Private Route UserInfo', UserInfo.printInfo());
  // console.log('Private Route', UserInfo.isAuth());
  // const valid = (UserInfo.isAuth() !== undefined
  //   && UserInfo.isAuth() !== null
  //   && UserInfo.isAuth() === true);
  // console.log('Private Route valid', valid);
  const role = UserInfo.getRole();
  let valid;
  console.log(role, 'roleee');
  if (role === 'superadmin') {
    valid = true;
  } else if (role === 'enduser') {
    valid = true;
  } else if (role === 'admin') {
    valid = true;
  } else {
    valid = false;
  }

  return (
    <Route
      {...rest}
      render={(props) => ((valid === true)
        ? <Component {...cprops} {...props} />
        : (
          <Redirect
            to={{
              pathname: '/login',
              state: { from: props.location },
            }}
          />
        ))}
    />
  );
}

function updateFavIcon() {
  const favicon = document.getElementById('favicon');
  const bodyTagEle = document.getElementsByTagName('body')[0];
  GlobalService.generalSelect(
    (respdata) => {
      const {
        estatus,
        emessage,
        data: {
          faviconLink, titleContent, roleDetailsMap, defaultRedirection,
          domainTheme, isTrank,
        },
      } = respdata;
      favicon.href = `${favicon.href}/favicon.png`;
      document.title = 'E-Box App | We Revolutionize Technology and Engineering Learning';
      if (estatus === true && emessage === 'success') {
        if (faviconLink !== '') {
          favicon.href = faviconLink;
          document.title = titleContent;
        }
        localStorage.set('roleDetailsMap', roleDetailsMap);
        localStorage.set('defaultRedirection', defaultRedirection);
        localStorage.set('isTrank', isTrank);
        if (domainTheme !== null && domainTheme !== undefined && domainTheme.length > 0) {
          bodyTagEle.classList.add(domainTheme);
        }
      }
    }, resturls.obtainFavIconAndTitle,
  );
}

export {
  parseJwt, updateC1, updateUserInfo, PrivateRoute, processLogout, clearCookies, updateFavIcon,
};
