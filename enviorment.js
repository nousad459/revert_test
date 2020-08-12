export const environment = {
  installSync: {
    baseUrl: function () {
      const host = window.location.host;
      //console.log("Host Url", host);
      switch (host) {
        case "admin.installsync.com":
          return "https://api.installsync.com/develop/";
        case "adminstaging.installsync.com":
          return "https://api.installsync.com/develop/";
        case "installsync.chetu.com":
          return /*"http://api.installsync.com/test/";*/"http://172.16.9.61:8080/";
        case "localhost:3000":
        default:
          return /*"http://api.installsync.com/test/";/*/"http://172.16.9.61:8080/";
      }
    },
    //baseUrl: "http://172.16.9.61:8080/",
    captchaSiteKey: "6Lcd__8UAAAAAISSgq9jFyY51fmIIlnkWX-9zkYa", //for local
    //captchaSiteKey: "6Ldu66IZAAAAAMdqZadchvEMGwYOdAkv56cYfedL" // for staging
  },
};
let env = environment;
export { env };
