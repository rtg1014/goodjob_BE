const { dateFormatter } = require('./util');
module.exports = {
  processing: (arr) => {
    let data = {};
    let x;
    for (x of arr) {
      let key;
      let temp = {};
      if (x.schedule.postingId === null) {
        temp = {
          scheduleId: x.scheduleId,
          color: x.color,
          memo: x.memo,
          sticker: x.sticker,
          coverImage: x.coverImage,
          title: x.schedule.title,
          place: x.schedule.place,
          date: dateFormatter(x.schedule.date),
          companyName: x.schedule.companyName,
          type: 'manual',
        };
        key = temp['date'].replaceAll('-', '').substr(2, 6);
      } else {
        temp = {
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
          type: 'auto',
        };
        key = temp['date'].replaceAll('-', '').substr(2, 6);
      }
      if (!data.hasOwnProperty(key)) {
        data[key] = [temp];
      } else {
        data[key] = data[key].concat(temp);
      }
    }
    return data;
  },
};
