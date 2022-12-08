import dayjs from "dayjs";
import customParseFormat from "dayjs/plugin/customParseFormat";
import utc from "dayjs/plugin/utc";
import weekday from "dayjs/plugin/weekday";
import isBetween from "dayjs/plugin/isBetween";

// import "dayjs/locale/zh-cn";
import "dayjs/locale/en";
import "dayjs/locale/ko";

dayjs.extend(customParseFormat);
dayjs.extend(utc);
dayjs.extend(weekday);
dayjs.extend(isBetween);
dayjs.locale("en");

const DATETIME_FORMAT = "YYYY-MM-DD HH:mm:ss";
const DATE_FORMAT = "YYYY-MM-DD";
const TIME_FORMAT = "HH:mm:ss";

export const FORMAT = {
  datetime: DATETIME_FORMAT,
  date: DATE_FORMAT,
  time: TIME_FORMAT,
};

// d: Date, date_string, date_object
export const getDatetime = (d, format = DATETIME_FORMAT) =>
  !d ? undefined : dayjs(d).format(format);

export const getDate = (d, format = DATE_FORMAT) =>
  !d ? undefined : dayjs(d).format(format);

export const getCurrentDatetime = () => dayjs().format(DATETIME_FORMAT);

export const getCurrentTime = () => dayjs().format(TIME_FORMAT);

export const datetimeDiff = (d1, d2) =>
  !d1 || !d2 ? undefined : dayjs(dayjs(d1)).diff(dayjs(d2));

// 以今天為原點，推算前幾天(-) or 未來幾天(+) 日期
export const getTodayDate = (diff = 0) =>
  dayjs().add(diff, "day").format(DATE_FORMAT);

// 以今天為原點，推算前幾天(-) or 未來幾天(+) 日期時間
export const getTodayTime = (diff = 0) =>
  dayjs()
    .add(diff, "day")
    .set("hour", 0)
    .set("minute", 0)
    .set("second", 0)
    .format(DATETIME_FORMAT);

// 以今日為原點，計算當日最後一秒時刻。將隔日原點時間 -1s 即可
export const getTodayLastSecond = (diff = 0) =>
  dayjs(getTodayTime(diff + 1))
    .subtract(1, "s")
    .format(DATETIME_FORMAT);

export const getUtcTimestamp = (d = 0) => dayjs(d).utc().valueOf();

export const getUtcTime = (d = 0, format = TIME_FORMAT) =>
  dayjs(d).utc().format(format);

export const getCountdownTime = (timestamp, format = TIME_FORMAT) => {
  const diff = getUtcTimestamp(timestamp);

  // 該做法是用於與 server 時區校正，目前暫時用不到
  // const diff = getUtcTimestamp(timestamp) - getUtcTimestamp();

  const hours = Math.floor(diff / 3600000);

  const utcTime = getUtcTime(diff, format);

  return hours >= 24 ? utcTime.replace(/^.{2}/g, hours) : utcTime;
};

// 取得當月1號日期
export const getFirstDateOfMonth = (offetInMonth = 0) => {
  const firstDayOfTheMonth = dayjs()
    .startOf("month")
    .add(offetInMonth, "month")
    .format(DATE_FORMAT);
  return firstDayOfTheMonth;
};

// 取得上月月底日期
export const getLastDateInLastMonth = (diff = 1) => {
  const lastDayOfLastMonth = dayjs()
    .startOf("month")
    .subtract(diff, "day")
    .format(DATE_FORMAT);
  return lastDayOfLastMonth;
};

// 取得上月往前推26天日期
export const lastMonthStartDate = () => getLastDateInLastMonth(27);

// 取得三個月前日期(90天前)
export const getThreeMonthsAgoDate = () =>
  dayjs().subtract(90, "day").format(DATE_FORMAT);

// 差幾天
export const datetimeDiffDay = (d1, d2) =>
  !d1 || !d2 ? undefined : dayjs(dayjs(d1), "day").diff(dayjs(d2), `day`);

export const startOfWeek = (d1) => dayjs(d1).weekday(0).format(DATE_FORMAT);
export const endOfWeek = (d1) => dayjs(d1).weekday(6).format(DATE_FORMAT);

export const isSameDay = (d1, d2) => dayjs(d1).isSame(d2);

export const isWithinInterval = (d, args1, interval) =>
  dayjs(d).isBetween(
    args1?.start ?? null,
    args1?.end ?? null,
    null,
    interval ?? "[]"
  );

export const getStartDateTime = (date) => {
  return dayjs(getDate(date)).format(DATETIME_FORMAT);
};

export const getEndDateTime = (date) => {
  return dayjs(getDate(date))
    .add(1, "day")
    .subtract(1, "second")
    .format(DATETIME_FORMAT);
};

export default dayjs;

export const getMonthList = () => dayjs().localeData().monthsShort();
