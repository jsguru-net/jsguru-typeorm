// Refs : https://gist.github.com/misostack/2d4f0d816de3327f25c35d5090aaecf2
const moment = require("moment-timezone");
export const DateTimeHelpers = {
  nowUTC: () => {
    return moment().utc().format("YYYY-MM-DD HH:mm:ss.SSSZ");
  },
};
