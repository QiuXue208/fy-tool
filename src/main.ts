import * as https from "https";
import * as querystring from "querystring";
import * as md5 from "md5";
import { appid, appsecret } from "./private";

export const translate = (word) => {
  const q = word;
  const salt = Math.random();
  const sign = md5(appid + word + salt + appsecret);

  const query = querystring.stringify({
    q,
    from: "en",
    to: "zh",
    salt,
    appid,
    sign,
  });

  const options = {
    hostname: "api.fanyi.baidu.com",
    port: 443,
    path: `/api/trans/vip/translate?${query}`,
    method: "GET",
  };

  const req = https.request(options, (res) => {
    res.on("data", (d) => {
      process.stdout.write(d);
    });
  });

  req.on("error", (e) => {
    console.error(e);
  });
  req.end();
};
