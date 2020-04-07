import * as https from "https";
import * as querystring from "querystring";
const md5 = require("md5");
import { appid, appsecret } from "./private";
import { errorMap } from "./constant";

export const translate = (word: string) => {
  const reg = /^[a-zA-Z]\w$/;

  const from = reg.test(word[0]) ? "en" : "zh";
  const to = reg.test(word[0]) ? "zh" : "en";
  const q = word;
  const salt = Math.random();
  const sign = md5(appid + word + salt + appsecret);

  const query = querystring.stringify({
    q,
    from,
    to,
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

  const request = https.request(options, (response) => {
    type BaiduResult = {
      // error_code可能为字符串类型或者没有
      error_code?: string;
      error_msg?: string;
      from: string;
      to: string;
      trans_result: {
        src: string;
        dst: string;
      }[];
    };
    let chunks: Buffer[] = [];
    response
      .on("data", (chunk: Buffer) => {
        chunks.push(chunk);
      })
      .on("end", () => {
        const str = Buffer.concat(chunks).toString();
        const object: BaiduResult = JSON.parse(str);
        if (object.error_code) {
          console.error(errorMap[object.error_code] || object.error_msg);
          process.exit(1);
        } else {
          object.trans_result.map((item) => {
            console.log(`- ${item.dst}`);
            process.exit(0);
          });
        }
      });
  });

  request.on("error", (e) => {
    console.error(e);
  });
  request.end();
};
