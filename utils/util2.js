const { dateFormatter } = require('./util');
module.exports = {
  manualData: (arr) => {
    let manual = [];
    for (x of arr) {
      let temp = {
        scheduleId: x.scheduleId,
        color: x.color,
        memo: x.memo,
        sticker: x.sticker,
        coverImage: x.coverImage,
        title: x.schedule.title,
        place: x.schedule.place,
        date: dateFormatter(x.schedule.date),
        companyName: x.schedule.companyName,
      };
      manual.push(temp);
    }
    return manual;
  },

  autoData: (arr) => {
    let auto = [];
    for (x of arr) {
      let temp = {
        scheduleId: x.scheduleId,
        color: x.color,
        memo: x.memo,
        sticker: x.sticker,
        coverImage: x.coverImage,
        title: x.schedule.title,
        place: x.schedule.place,
        date: dateFormatter(x.schedule.date),
        companyName: x.schedule.companyName,
        postingId: x.schedule.postingId,
      };
      auto.push(temp);
    }
    return auto;
  },
};
