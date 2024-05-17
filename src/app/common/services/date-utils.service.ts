import { Injectable } from '@angular/core';
import dayjs from 'dayjs';
import timezone from 'dayjs/plugin/timezone';
import utc from 'dayjs/plugin/utc';

@Injectable()
export class DateUtilsService {
  constructor() {
    dayjs.extend(utc);
    dayjs.extend(timezone);
    dayjs.tz.setDefault('Europe/Madrid');
  }

  daysJsUtc(date?: Date | dayjs.Dayjs | string | null) {
    return dayjs.utc(date);
  }

  daysJsUtcLocal(date?: Date | dayjs.Dayjs | string | null) {
    return dayjs(date).utc(true).local();
  }

  dateWithTimezoneOffset(value: string | number | Date) {
    let date = new Date(value);
    date.setTime(date.getTime() + date.getTimezoneOffset() * 60 * 1000);
    return date;
  }

  toFullDateFormat(date?: Date | dayjs.Dayjs | string | null) {
    return this.daysJsUtc(date).format('DD/MM/YYYY');
  }

  toHHmmFormat(date?: Date | dayjs.Dayjs | string | null) {
    return this.daysJsUtc(date).format('HH:mm');
  }

  dayjsSetDate(date: Date, dateNum: number) {
    const dateDayjs = dayjs(date);
    const dateHours = dateDayjs.get('h');
    const dateMinutes = dateDayjs.get('m');
    return dateDayjs
      .set('h', dateHours)
      .set('m', dateMinutes)
      .set('s', 0)
      .set('date', dateNum)
      .toDate();
  }
}
