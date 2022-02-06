// Refs : https://gist.github.com/misostack/2d4f0d816de3327f25c35d5090aaecf2
const moment = require("moment-timezone");
export const DateTimeHelpers = {
  nowUTC: () => {
    return moment().utc().format("YYYY-MM-DD HH:mm:ss.SSSZ");
  },
};

export const StringHelpers = {
  replaceVietNameseTones: (str: string) => {
    let newStr = str;
    const characterSet = {
      a: "á|à|ả|ã|ạ|ă|ắ|ặ|ằ|ẳ|ẵ|â|ấ|ầ|ẩ|ẫ|ậ",
      d: "đ",
      e: "é|è|ẻ|ẽ|ẹ|ê|ế|ề|ể|ễ|ệ",
      i: "í|ì|ỉ|ĩ|ị",
      o: "ó|ò|ỏ|õ|ọ|ô|ố|ồ|ổ|ỗ|ộ|ơ|ớ|ờ|ở|ỡ|ợ",
      u: "ú|ù|ủ|ũ|ụ|ư|ứ|ừ|ử|ữ|ự",
      y: "ý|ỳ|ỷ|ỹ|ỵ",
      A: "Á|À|Ả|Ã|Ạ|Ă|Ắ|Ặ|Ằ|Ẳ|Ẵ|Â|Ấ|Ầ|Ẩ|Ẫ|Ậ",
      D: "Ð",
      E: "É|È|Ẻ|Ẽ|Ẹ|Ê|Ế|Ề|Ể|Ễ|Ệ",
      I: "Í|Ì|Ỉ|Ĩ|Ị",
      O: "Ó|Ò|Ỏ|Õ|Ọ|Ô|Ố|Ồ|Ổ|Ỗ|Ộ|Ơ|Ớ|Ờ|Ở|Ỡ|Ợ",
      U: "Ú|Ù|Ủ|Ũ|Ụ|Ư|Ứ|Ừ|Ử|Ữ|Ự",
      Y: "Ý|Ỳ|Ỷ|Ỹ|Ỵ",
    };
    for (const char in characterSet) {
      const expression = `\(${characterSet[char]}\)`;
      newStr = newStr.replace(new RegExp(expression, "gi"), char);
    }
    // replace space with "-"

    newStr = newStr.trim().replace(/(\s+)/gim, ".");
    return newStr.toLowerCase();
  },
};
