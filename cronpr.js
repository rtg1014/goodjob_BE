const { dateFormatter } = require("./utils/util")

let now = new Date()
let afterformat = dateFormatter(now)

console.log('크론탭 실행 성공~!')
console.log('나우~~~~~~~~~~~~~~', now)
console.log('포맷후~~~~~~~~~~~', afterformat)