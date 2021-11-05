import classnames from 'classnames';
import {
  startOfMonth,
  endOfMonth,
  startOfWeek,
  endOfWeek,
  differenceInCalendarDays,
  differenceInCalendarMonths,
  addDays,
} from 'date-fns';

export function calcFocusDate(currentFocusedDate: any, props: any) {
  const { shownDate, date, months, ranges, focusedRange, displayMode } = props;
  // find primary date according the props
  let targetInterval;
  if (displayMode === 'dateRange') {
    const range = ranges[focusedRange[0]] || {};
    targetInterval = {
      start: range.startDate,
      end: range.endDate,
    };
  } else {
    targetInterval = {
      start: date,
      end: date,
    };
  }
  targetInterval.start = startOfMonth(targetInterval.start || new Date());
  targetInterval.end = endOfMonth(targetInterval.end || targetInterval.start);
  const targetDate = targetInterval.start || targetInterval.end || shownDate || new Date();

  // initial focus
  if (!currentFocusedDate) return shownDate || targetDate;

  // // just return targetDate for native scrolled calendars
  // if (props.scroll.enabled) return targetDate;
  if (differenceInCalendarMonths(targetInterval.start, targetInterval.end) > months) {
    // don't change focused if new selection in view area
    return currentFocusedDate;
  }
  return targetDate;
}

export function findNextRangeIndex(ranges: any, currentRangeIndex = -1) {
  const nextIndex = ranges.findIndex(
    (range: any, i: any) => i > currentRangeIndex && range.autoFocus !== false && !range.disabled
  );
  if (nextIndex !== -1) return nextIndex;
  return ranges.findIndex((range: any) => range.autoFocus !== false && !range.disabled);
}

export function getMonthDisplayRange(date: any, dateOptions: any, fixedHeight: any) {
  // @ts-expect-error ts-migrate(2554) FIXME: Expected 1 arguments, but got 2.
  const startDateOfMonth = startOfMonth(date, dateOptions);
  // @ts-expect-error ts-migrate(2554) FIXME: Expected 1 arguments, but got 2.
  const endDateOfMonth = endOfMonth(date, dateOptions);
  const startDateOfCalendar = startOfWeek(startDateOfMonth, dateOptions);
  let endDateOfCalendar = endOfWeek(endDateOfMonth, dateOptions);
  if (fixedHeight && differenceInCalendarDays(endDateOfCalendar, startDateOfCalendar) <= 34) {
    endDateOfCalendar = addDays(endDateOfCalendar, 7);
  }
  return {
    start: startDateOfCalendar,
    end: endDateOfCalendar,
    startDateOfMonth,
    endDateOfMonth,
  };
}

export function generateStyles(sources: any) {
  if (!sources.length) return {};
  const generatedStyles = sources
    .filter((source: any) => Boolean(source))
    .reduce((styles: any, styleSource: any) => {
      Object.keys(styleSource).forEach(key => {
        styles[key] = classnames(styles[key], styleSource[key]);
      });
      return styles;
    }, {});
  return generatedStyles;
}
