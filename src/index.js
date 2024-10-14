import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
// import { msalConfig } from './Features/SSOFeatures/MicrosoftAzureSSO/authConfig'
// import { GoogleOAuthProvider } from '@react-oauth/google';
// import { AzureAD } from 'react-aad-msal';
// import { PublicClientApplication, EventType } from '@azure/msal-browser';
// import { ProSidebarProvider } from 'react-pro-sidebar';
import { BrowserRouter } from 'react-router-dom';
import { I18nextProvider } from 'react-i18next';
import i18n from './i18n';
// import Cookies from 'js-cookie';
// import UserInfo from '@models/UserInfo';
// eslint-disable-next-line import/no-cycle
// import { cookiedomain } from '@utils/constants';
// import getRoleUrl from '@utils/RoleBasedURL';
// import ls from 'local-storage';
// import UserInfo from './models/UserInfo';


// const msalInstance = new PublicClientApplication(msalConfig);

// // Default to using the first account if no account is active on page load
// if (!msalInstance.getActiveAccount() && msalInstance.getAllAccounts().length > 0) {
//     // Account selection logic is app dependent. Adjust as needed for different use cases.
//     msalInstance.setActiveAccount(msalInstance.getActiveAccount()[0]);
// }

// Listen for sign-in event and set active account
// msalInstance.addEventCallback((event) => {
//     if (event.eventType === EventType.LOGIN_SUCCESS && event.payload.account) {
//         const account = event.payload.account;
//         msalInstance.setActiveAccount(account);
//     }
// });

// window.addEventListener('error', function (event) {
//     if (event.message.includes('ResizeObserver loop completed with undelivered notifications')) {
//         event.preventDefault();
//     }
// });

// const root = ReactDOM.createRoot(document.getElementById('root'));
// root.render(
//     <GoogleOAuthProvider clientId="1096249476767-6aq8j72hth183jchc5d16uqq7u1s3881.apps.googleusercontent.com">
//         {/* <React.StrictMode> */}
//         <ProSidebarProvider>
//             <App instance={msalInstance} />
//         </ProSidebarProvider>
//         {/* </React.StrictMode> */}
//     </GoogleOAuthProvider>,
// );

// function parseJwt(token) {
//     console.log('token', token);
//     const base64Url = token.split('.')[1];
//     const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
//     const jsonPayload = decodeURIComponent(atob(base64).split('').map((c) => `%${(`00${c.charCodeAt(0).toString(16)}`).slice(-2)}`).join(''));
//     console.log('Payload', jsonPayload);
//     return JSON.parse(jsonPayload);
// }

// function updateC1() {
//     const expmin = new Date(new Date().getTime() + 20 * 60 * 1000);
//     const val1 = Cookies.get('_c1', { domain: cookiedomain });
//     if (val1 !== undefined && val1 !== null) {
//         // console.log('updateC1  val1', val1);
//         Cookies.remove('_c1', { domain: cookiedomain });
//         Cookies.set('_c1', val1, { path: '/', expires: expmin, domain: cookiedomain });
//         // const p = parseJwt(val1);
//         // console.log('update - C1 Payload', p);
//     }
// }

// function updateUserInfo(c1 = null) {
//     let val1 = c1;
//     console.log(cookiedomain);
//     const ck = Cookies.get('_c1', { domain: cookiedomain });

//     if (ck != null) {
//         val1 = ck;
//         console.log('Thru cookie');
//     } else if (c1 !== undefined && c1 !== null) {
//         const cookie = parseJwt(c1);
//         const now = new Date();
//         const cookieObj = {
//             data: (c1),
//             expiry: now.getTime() + cookie.max_age,
//         };
//         ls.set('_c1', cookieObj);
//         console.log('Thru Params - post login');
//     }
//     if (val1 === undefined || val1 === null) {
//         const cookieObj = ls.get('_c1');
//         if (cookieObj !== undefined && cookieObj !== null) {
//             const cookie = parseJwt(cookieObj.data);
//             const now = new Date();

//             if (Math.floor(now.getTime() / 1000) <= cookieObj.expiry) {
//                 val1 = cookieObj.data;

//                 cookieObj.expiry = Math.floor(now.getTime() / 1000) + cookie.max_age;
//                 ls.set('_c1', cookieObj);
//             } else {
//                 ls.remove('_c1');
//                 window.localStorage.setItem('isEventClosed', '');
//             }
//         }
//         console.log('Thru Local Store');
//     }

//     if (val1 !== undefined && val1 !== null && val1) {
//         const data = parseJwt(val1);
//         UserInfo.setUserDetail(data);
//         console.log('data\n\n');
//         console.log(data);
//     } else {
//         console.log('updateUserInfo - Cookie / LS / Params not found');
//     }
// }

// function clearCookies() {
//     ls.clear();
//     let ck = Cookies.get('_c1', { domain: cookiedomain });
//     console.log('before logout ck', ck, cookiedomain);
//     Cookies.remove('_c1', { domain: cookiedomain });
//     ck = Cookies.get('_c1', { domain: cookiedomain });
//     console.log('after logout ck', ck, cookiedomain);
//     ls.remove('_c1');
//     document.cookie = '_c1=; Path=/; Expires=Thu, 01 Jan 1970 00:00:01 GMT;';
//     document.location.href = '/login';
//     window.localStorage.setItem('isEventClosed', '');
//     window.localStorage.setItem('authAmphiSessionId', undefined);
// }
// function updateCookieBasedOnRole(role_name, segment_type_id, org_unit_id) {
//     GlobalService.generalSelect(
//             const { estatus, emessage, data } = respdata;
//             if (estatus && emessage) {
//                 ls.set('segmentType', data.segment_type);
//                 ls.set('assessmentHomeActiveTabIndex', 0);
//                 document.location.href = getRoleUrl(role_name);
//             }
//         {
//             role_name,
//             user_id: UserInfo.getUserid(),
//             segment_type_id,
//             org_unit_id,
//             is_admin: ls.get('isAdmin'),
//         }, 'POST',
//     );
// }
// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
const root = ReactDOM.createRoot(document.getElementById('root'));
reportWebVitals();
root.render(
    <I18nextProvider i18n={i18n}>
        <BrowserRouter>
            <App />
        </BrowserRouter>
    </I18nextProvider>,
    document.getElementById('root'),
);
// export {
//     parseJwt, updateC1, updateUserInfo,
//     clearCookies,
// };
