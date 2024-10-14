import RestDataSource from '../global/utils/RestDataSource';
import { resturls } from '../global/utils/apiurls';

class GlobalService {
  static generalSelect = (callback, url = '', values = {}, method = 'GET', urlType = 'api') => {
    console.log(values, 'loginvalues');
    RestDataSource.GetData((respdata) => {
      callback(respdata);
    }, url, values, method, urlType);
  };

  static generalUpdate = (callback, url = '', values = {}) => {
    RestDataSource.Update((respdata) => {
      callback(respdata);
    }, url, values);
  };

  static generalSave = (callback, url = '', values = {}) => {
    RestDataSource.Save((respdata) => {
      callback(respdata);
    }, url, values);
  };

  static generalDelete = (callback, url = '', values = {}) => {
    RestDataSource.Delete((respdata) => {
      callback(respdata);
    }, url, values);
  }

  static crossDomainRequest = (callback, url, values = {}, method = 'GET', additionalReqParams = {}) => {
    RestDataSource.crossDomainRequest((respdata) => callback(respdata),
      method, url, values, additionalReqParams);
  }

  updateCertificate = (values, callback) => {
    const formData = new FormData();
    const {
      id, proficiency, issuedOrganization, certificate, skillName,
    } = values;
    formData.append('skillName', skillName);
    formData.append('id', id);
    formData.append('proficiency', proficiency);
    formData.append('issuedOrganization', issuedOrganization);
    formData.append('certificate', certificate || '');
    RestDataSource.Put(
      (respdata) => callback(respdata), resturls.updateCertificate, formData,
    );
  }
}
export default GlobalService;
