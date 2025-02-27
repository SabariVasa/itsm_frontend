import RestDataSource from "../global/utils/RestDataSource";

class GlobalService {
  static generalSelect = (
    callback,
    url = "",
    values = {},
    method = "GET",
    urlType = "api"
  ) => {
    RestDataSource.GetData(
      (respdata) => {
        callback(respdata);
      },
      url,
      values,
      method,
      urlType
    );
  };

  static generalUpdate = (callback, url = "", values = {}) => {
    RestDataSource.Update(
      (respdata) => {
        callback(respdata);
      },
      url,
      values
    );
  };

  static generalSave = (callback, url = "", values = {}) => {
    RestDataSource.Save(
      (respdata) => {
        callback(respdata);
      },
      url,
      values
    );
  };

  static generalDelete = (callback, url = "", values = {}) => {
    RestDataSource.Delete(
      (respdata) => {
        callback(respdata);
      },
      url,
      values
    );
  };
}

export default GlobalService;
