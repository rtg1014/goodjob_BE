const { dateFormatter } = require('./util');
module.exports = {

  processing: (arr) => {
    let data = {};
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
          place: x.schedule.place,
          date: dateFormatter(x.schedule.date),
          companyName: x.schedule.companyName,
          type:'manual'
        };
        console.log(333333333333333,temp.date)
        key = temp['date'].replaceAll('-', '').substr(2,6);
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
          type:'auto'
        };
        console.log(4444444444444444,temp.date)
        key = temp['date'].replaceAll('-', '').substr(2,6);
      }
      if(!data.hasOwnProperty(key)){
        data[key]=[temp]
      } else{
        data[key]=data[key].concat(temp)
      }
      console.log(22222222222,temp)
    }
    return data;
  },
};
