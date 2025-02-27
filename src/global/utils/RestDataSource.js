import Axios from "axios";
import { restbaseurl } from "./constants";

class RestDataSource {
  static async SendRequest(method, url, callback, data = {}, urlType = "api") {
    try {
      const request = await Axios.request({
        url,
        method,
        baseURL: restbaseurl,
        data,
        withCredentials: true,
      });

      const resp = request.data;
      callback(resp);
    } catch (err) {
      console.log(err, "err");
    }
  }

  static async GetData(
    callback,
    url,
    data = {},
    method = "GET",
    urlType = "api"
  ) {
    RestDataSource.SendRequest(method, url, callback, data, urlType);
  }

  static async Save(callback, url, data) {
    RestDataSource.SendRequest("post", url, callback, data);
  }

  static async Update(callback, url, data) {
    RestDataSource.SendRequest("put", `${url}/${data.id}`, callback, data);
  }

  static async Delete(callback, url, data) {
    RestDataSource.SendRequest("delete", `${url}/${data.id}`, callback, data);
  }

  static async Put(callback, url, data) {
    RestDataSource.SendRequest("put", url, callback, data);
  }
}

export default RestDataSource;
