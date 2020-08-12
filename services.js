import { env } from "../../../core/enviornment/enviornment";
import axios from "axios";
const baseUrlClient =
  env.installSync.baseUrl() + "installsync/users?userRole=CLIENT";
const baseUrlPROVIDER =
  env.installSync.baseUrl() + "installsync/users?userRole=PROVIDER";
const baseUrlINSTALLER =
  env.installSync.baseUrl() + "installsync/users?userRole=INSTALLER";
const assetTypeURL = env.installSync.baseUrl() + "installsync/assets";
const insutryBaseUrl = env.installSync.baseUrl() + "installsync/industry";
const deviceTypeBaseUrl = env.installSync.baseUrl() + "installsync/devicetype";

const deleteDeviceURL = env.installSync.baseUrl() + "installsync/devicetype";
var USER_TOKEN = ""; //localStorage.usertoken;
//console.log("token",USER_TOKEN)
var AuthStr = ""; //"Bearer " + USER_TOKEN; //.concat(token);
class JobServices {
  /* Fetch ASSET Data */

  async fetchAssetData() {
    USER_TOKEN = localStorage.usertoken;
    //AuthStr = "Bearer " + USER_TOKEN;
    try {
      const res = await fetch(assetTypeURL, {
        method: "GET",
        headers: {
          Accept: "application/json",
          "Content-type": "application/json",
          Authorization: "Bearer " + USER_TOKEN,
        },
      });
      const data = await res.json();
      return data;
    } catch (error) {
      console.log("Error: Network Problem");
    }
  }

  /* Fetch CLIENT Data */

  async fetchClientData() {
    USER_TOKEN = localStorage.usertoken;
    //AuthStr = "Bearer " + USER_TOKEN;
    try {
      const res = await fetch(baseUrlClient, {
        method: "GET",
        headers: {
          Accept: "application/json",
          "Content-type": "application/json",
          Authorization: "Bearer " + USER_TOKEN,
        },
      });
      const data = await res.json();
      return data;
    } catch (error) {
      console.log("Error: Network Problem");
    }
  }

  /* Fetch INDUSTRY Data */

  async fetchIndustryData() {
    USER_TOKEN = localStorage.usertoken;
    try {
      const res = await fetch(insutryBaseUrl, {
        method: "GET",
        headers: {
          Accept: "application/json",
          "Content-type": "application/json",
          //Authorization: "Bearer " + USER_TOKEN,
        },
      });
      const data = await res.json();
      return data;
    } catch (error) {
      console.log("Error: Network Problem");
    }
  }

  /* To fetch PROVIDER data */
  async fetchProviderData() {
    USER_TOKEN = localStorage.usertoken;
    try {
      const res = await fetch(baseUrlPROVIDER, {
        method: "GET",
        headers: {
          Accept: "application/json",
          "Content-type": "application/json",
          Authorization: "Bearer " + USER_TOKEN,
        },
      });
      const data = await res.json();
      return data;
    } catch (error) {
      console.log("Error: Network Problem");
    }
  }
  /* To fetch PROVIDER data for Dropdown */
  async fetchProviderDataDropdown() {
    USER_TOKEN = localStorage.usertoken;
    try {
      const res = await fetch(baseUrlPROVIDER, {
        method: "GET",
        headers: {
          Accept: "application/json",
          "Content-type": "application/json",
          Authorization: "Bearer " + USER_TOKEN,
        },
      });
      const data = await res.json();
      return data;
    } catch (error) {
      console.log("Error: Network Problem");
    }
  }
  /* To fetch INSTALLER data */
  async fetchInstallerData(userId) {
    USER_TOKEN = localStorage.usertoken;
    const parameter = "&userId="+userId;
    try {
      const res = await fetch(baseUrlINSTALLER+parameter, {
        method: "GET",
        headers: {
          Accept: "application/json",
          "Content-type": "application/json",
          Authorization: "Bearer " + USER_TOKEN,
        },
      });
      const data = await res.json();
      return data;
    } catch (error) {
      console.log("Error: Network Problem");
    }
  }
  /* To fetch DEVICE Type data */
  async fetchDeviceTypeData() {
    USER_TOKEN = localStorage.usertoken;
    try {
      const res = await fetch(deviceTypeBaseUrl, {
        method: "GET",
        headers: {
          Accept: "application/json",
          "Content-type": "application/json",
          Authorization: "Bearer " + USER_TOKEN,
        },
      });
      const data = await res.json();
      return data;
    } catch (error) {
      console.log("Error: Network Problem");
    }
  }

  /* Fetch Installer  Data By Id*/

  fetchInstallerDataByID = (id) => {
    USER_TOKEN = localStorage.usertoken;
    AuthStr = "Bearer " + USER_TOKEN;
    const parameter = "&userId=" + id;
    return axios
      .get(baseUrlINSTALLER + parameter, {
        headers: { Authorization: AuthStr },
      })
      .then((response) => {
        const res = {
          status: 200,
          data: response.data,
        };
        return res;
      })
      .catch((error) => {
        const err = {
          status: 400,
          data: error,
        };
        return err;
      });
  };
   /* To fetch DEVICE Type data with parameter*/
   async fetchDeviceTypeDataWithParameter(assetType) {
    USER_TOKEN = localStorage.usertoken;
    const para = "?assetType=" + assetType;
    try {
      const res = await fetch(deviceTypeBaseUrl + para, {
        method: "GET",
        headers: {
          Accept: "application/json",
          "Content-type": "application/json",
          Authorization: "Bearer " + USER_TOKEN,
        },
      });
      const data = await res.json();
      return data;
    } catch (error) {
      console.log("Error: Network Problem");
    }
  }
/*Delete Device */
deleteDevice = (typeId) => {
  USER_TOKEN = localStorage.usertoken;
  AuthStr = "Bearer " + USER_TOKEN;
  const para = "?typeId=" + typeId;
  return axios
    .delete(deleteDeviceURL + para, {
      headers: { Authorization: AuthStr },
    })
    .then((response) => {
      const res = {
        status: 200,
        data: response.data,
      };
      return res;
    })
    .catch((error) => {
      const err = {
        status: 400,
        data: error,
      };
      return err;
    });
};
/* Fetch Installer  Data By Id*/

fetchInstallerDataByID = (id) => {
  USER_TOKEN = localStorage.usertoken;
  AuthStr = "Bearer " + USER_TOKEN;
  const parameter = "&userId=" + id;
  return axios
    .get(baseUrlINSTALLER + parameter, {
      headers: { Authorization: AuthStr },
    })
    .then((response) => {
      const res = {
        status: 200,
        data: response.data,
      };
      return res;
    })
    .catch((error) => {
      const err = {
        status: 400,
        data: error,
      };
      return err;
    });
};
}

export const jobServices = new JobServices();
