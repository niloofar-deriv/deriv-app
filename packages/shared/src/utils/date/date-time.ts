import moment from 'moment';
import 'moment/min/locales';

type TExtendedMoment = typeof moment & {
    createFromInputFallback: (config: { _d: Date }) => void;
};

// Disables moment's fallback to native Date object
// moment will return `Invalid Date` if date cannot be parsed
(moment as TExtendedMoment).createFromInputFallback = function (config) {
    config._d = new Date(NaN); // eslint-disable-line no-underscore-dangle
};

// Localize moment instance with specific object
export const initMoment = (lang: string) => moment.locale(lang);

/**
 * Convert epoch to moment object
 * @param  {Number} epoch
 * @return {moment} the moment object of provided epoch
 */
export const epochToMoment = (epoch: number) => moment.unix(epoch).utc();

/**
 * Convert date string or epoch to moment object
 * @param  {Number} value   the date in epoch format
 * @param  {String} value   the date in string format
 * @return {moment} the moment object of 'now' or the provided date epoch or string
 */
export const toMoment = (value?: moment.MomentInput): moment.Moment => {
    if (!value) return moment().utc(); // returns 'now' moment object
    if (value instanceof moment && (value as moment.Moment).isValid() && (value as moment.Moment).isUTC())
        return value as moment.Moment; // returns if already a moment object
    if (typeof value === 'number') return epochToMoment(value); // returns epochToMoment() if not a date

    if (/invalid/i.test(moment(value).toString())) {
        const today_moment = moment();
        return value > today_moment.utc().daysInMonth()
            ? moment.utc(today_moment.add(value as string | number, 'd'), 'DD MMM YYYY')
            : moment.utc(value, 'DD MMM YYYY'); // returns target date
    }
    return moment.utc(value);
};

export const toLocalFormat = (time: moment.MomentInput) => moment.utc(time).local().format('YYYY-MM-DD HH:mm:ss Z');
/**
 * Set specified time on moment object
 * @param  {moment} moment_obj  the moment to set the time on
 * @param  {String} time        24 hours format, may or may not include seconds
 * @return {moment} a new moment object of result
 */
export const setTime = (moment_obj: moment.Moment, time: string) => {
    const [hour, minute, second] = time ? time.split(':') : [0, 0, 0];
    moment_obj
        .hour(+hour)
        .minute(+minute || 0)
        .second(+second || 0);
    return moment_obj;
};

/**
 * return the unix value of provided epoch and time
 * @param  {Number} epoch  the date to update with provided time
 * @param  {String} time   the time to set on the date
 * @return {Number} unix value of the result
 */
export const convertToUnix = (epoch: number | string, time: string) => setTime(toMoment(epoch), time).unix();

export const toGMTFormat = (time?: moment.MomentInput) =>
    moment(time || undefined)
        .utc()
        .format('YYYY-MM-DD HH:mm:ss [GMT]');

export const formatDate = (date?: moment.MomentInput, date_format = 'YYYY-MM-DD') => toMoment(date).format(date_format);

export const formatTime = (epoch: number | string, time_format = 'HH:mm:ss [GMT]') =>
    toMoment(epoch).format(time_format);

/**
 * return the number of days from today to date specified
 * @param  {String} date   the date to calculate number of days from today
 * @return {Number} an integer of the number of days
 */
export const daysFromTodayTo = (date?: string | moment.Moment) => {
    const diff = toMoment(date).startOf('day').diff(toMoment().startOf('day'), 'days');
    return !date || diff < 0 ? '' : diff;
};

/**
 * return the number of days since the date specified
 * @param  {String} date   the date to calculate number of days since
 * @return {Number} an integer of the number of days
 */
export const daysSince = (date: string) => {
    const diff = toMoment().startOf('day').diff(toMoment(date).startOf('day'), 'days');
    return !date ? '' : diff;
};

/**
 * return the number of months between two specified dates
 */
export const diffInMonths = (now: moment.MomentInput, then: moment.Moment) => then.diff(now, 'month');
/**
 * return moment duration between two dates
 * @param  {Number} epoch start time
 * @param  {Number} epoch end time
 * @return {moment.duration} moment duration between start time and end time
 */
export const getDiffDuration = (start_time: number, end_time: number) =>
    moment.duration(moment.unix(end_time).diff(moment.unix(start_time)));

/** returns the DD MM YYYY format */
export const getDateFromNow = (
    days: string | number,
    unit?: moment.unitOfTime.DurationConstructor,
    format?: string
) => {
    const date = moment(new Date());
    return date.add(days, unit).format(format);
};

/**
 * return formatted duration `2 days 01:23:59`
 * @param  {moment.duration} moment duration object
 * @return {String} formatted display string
 */
export const formatDuration = (duration: moment.Duration, format?: string) => {
    const d = Math.floor(duration.asDays()); // duration.days() does not include months/years
    const h = duration.hours();
    const m = duration.minutes();
    const s = duration.seconds();
    const formatted_str = moment(0)
        .hour(h)
        .minute(m)
        .seconds(s)
        .format(format || 'HH:mm:ss');

    return {
        days: d,
        timestamp: formatted_str,
    };
};

/**
 * return true if the time_str is in "HH:MM" format, else return false
 * @param {String} time_str time
 */
export const isTimeValid = (time_str: string) =>
    /^([0-9]|[0-1][0-9]|2[0-3]):([0-9]|[0-5][0-9])(:([0-9]|[0-5][0-9]))?$/.test(time_str);

/**
 * return true if the time_str's hour is between 0 and 23, else return false
 * @param {String} time_str time
 */
export const isHourValid = (time_str: string) =>
    isTimeValid(time_str) && /^([01][0-9]|2[0-3])$/.test(time_str.split(':')[0]);

/**
 * return true if the time_str's minute is between 0 and 59, else return false
 * @param {String} time_str time
 */
export const isMinuteValid = (time_str: string) => isTimeValid(time_str) && /^[0-5][0-9]$/.test(time_str.split(':')[1]);

/**
 * return true if the date is typeof string and a valid moment date, else return false
 * @param {String|moment} date date
 */
export const isDateValid = (date: moment.MomentInput) => moment(date, 'DD MMM YYYY').isValid();

/**
 * add the specified number of days to the given date
 * @param {String} date        date
 * @param {Number} num_of_days number of days to add
 */
export const addDays = (date: string | moment.Moment, num_of_days: number) =>
    toMoment(date).clone().add(num_of_days, 'day');

/**
 * add the specified number of weeks to the given date
 * @param {String} date        date
 * @param {Number} num_of_weeks number of days to add
 */
export const addWeeks = (date: string, num_of_weeks: number) => toMoment(date).clone().add(num_of_weeks, 'week');

/**
 * add the specified number of months to the given date
 * @param {String} date        date
 * @param {Number} num_of_months number of months to add
 */
export const addMonths = (date: string, num_of_months: number) => toMoment(date).clone().add(num_of_months, 'month');

/**
 * add the specified number of years to the given date
 * @param {String} date        date
 * @param {Number} num_of_years number of years to add
 */
export const addYears = (date: string, num_of_years: number) => toMoment(date).clone().add(num_of_years, 'year');

/**
 * subtract the specified number of days from the given date
 * @param {String} date        date
 * @param {Number} num_of_days number of days to subtract
 */
export const subDays = (date: string, num_of_days: number) => toMoment(date).clone().subtract(num_of_days, 'day');

/**
 * subtract the specified number of months from the given date
 * @param {String} date        date
 * @param {Number} num_of_months number of months to subtract
 */
export const subMonths = (date: string, num_of_months: number) =>
    toMoment(date).clone().subtract(num_of_months, 'month');

/**
 * subtract the specified number of years from the given date
 * @param {String} date        date
 * @param {Number} num_of_years number of years to subtract
 */
export const subYears = (date: string, num_of_years: number) => toMoment(date).clone().subtract(num_of_years, 'year');

/**
 * returns the minimum moment between the two passing parameters
 * @param {moment|string|epoch} first datetime parameter
 * @param {moment|string|epoch} second datetime parameter
 */
export const minDate = (date_1: moment.MomentInput, date_2: moment.MomentInput) =>
    moment.min(toMoment(date_1), toMoment(date_2));

/**
 * returns a new date
 * @param {moment|string|epoch} date date
 */
export const getStartOfMonth = (date: moment.MomentInput) =>
    toMoment(date).clone().startOf('month').format('YYYY-MM-DD');

/**
 * returns miliseconds into UTC formatted string
 * @param {Number} miliseconds miliseconds
 * @param {String} str_format formatting using moment e.g - YYYY-MM-DD HH:mm
 */
export const formatMilliseconds = (miliseconds: moment.MomentInput, str_format: string, is_local_time = false) => {
    if (is_local_time) {
        return moment(miliseconds).format(str_format);
    }
    return moment.utc(miliseconds).format(str_format);
};

/**
 * returns a new date string
 * @param {moment|string|epoch} date parameter
 * @param {String} from_date_format initial date format
 * @param {String} to_date_format to date format
 */
export const convertDateFormat = (date: moment.MomentInput, from_date_format: string, to_date_format: string) =>
    moment(date, from_date_format).format(to_date_format);

/**
 *  Convert 24 hours format time to 12 hours formatted time.
 * @param  {String} time 24 hours format, may or may not include seconds
 * @return {String} equivalent 12-hour time
 */
export const convertTimeFormat = (time: string) => {
    const time_moment_obj = moment(time, 'HH:mm');
    const time_hour = time_moment_obj.format('HH');
    const time_min = time_moment_obj.format('mm');
    const formatted_time = `${Number(time_hour) % 12 || 12}:${time_min}`;
    const time_suffix = `${Number(time_hour) >= 12 ? 'pm' : 'am'}`;
    return `${formatted_time} ${time_suffix}`;
};
