/* eslint-disable no-fallthrough */
// @ts-expect-error ts-migrate(7016) FIXME: Could not find a declaration file for module 'reac... Remove this comment to see the full error message
import React, { PureComponent } from 'react';
// @ts-expect-error ts-migrate(7016) FIXME: Could not find a declaration file for module 'prop... Remove this comment to see the full error message
import PropTypes from 'prop-types';
// @ts-expect-error ts-migrate(6142) FIXME: Module '../DayCell' was resolved to '/mnt/e/projec... Remove this comment to see the full error message
import DayCell, { rangeShape } from '../DayCell';
import {
  format,
  startOfDay,
  endOfDay,
  startOfWeek,
  endOfWeek,
  isBefore,
  isSameDay,
  isAfter,
  isWeekend,
  isWithinInterval,
  eachDayOfInterval,
} from 'date-fns';
import { getMonthDisplayRange } from '../../utils';

function renderWeekdays(styles: any, dateOptions: any, weekdayDisplayFormat: any) {
  const now = new Date();
  return (
    // @ts-expect-error ts-migrate(7026) FIXME: JSX element implicitly has type 'any' because no i... Remove this comment to see the full error message
    <div className={styles.weekDays}>
      {eachDayOfInterval({
        start: startOfWeek(now, dateOptions),
        end: endOfWeek(now, dateOptions),
      }).map((day, i) => (
        // @ts-expect-error ts-migrate(7026) FIXME: JSX element implicitly has type 'any' because no i... Remove this comment to see the full error message
        <span className={styles.weekDay} key={i}>
          {format(day, weekdayDisplayFormat, dateOptions)}
          // @ts-expect-error ts-migrate(7026) FIXME: JSX element implicitly has type 'any' because
          no i... Remove this comment to see the full error message
        </span>
      ))}
      // @ts-expect-error ts-migrate(7026) FIXME: JSX element implicitly has type 'any' because no
      i... Remove this comment to see the full error message
    </div>
  );
}

class Month extends PureComponent {
  props: any;
  render() {
    const now = new Date();
    const { displayMode, focusedRange, drag, styles, disabledDates, disabledDay } = this.props;
    const minDate = this.props.minDate && startOfDay(this.props.minDate);
    const maxDate = this.props.maxDate && endOfDay(this.props.maxDate);
    const monthDisplay = getMonthDisplayRange(
      this.props.month,
      this.props.dateOptions,
      this.props.fixedHeight
    );
    let ranges = this.props.ranges;
    if (displayMode === 'dateRange' && drag.status) {
      let { startDate, endDate } = drag.range;
      ranges = ranges.map((range: any, i: any) => {
        if (i !== focusedRange[0]) return range;
        return {
          ...range,
          startDate,
          endDate,
        };
      });
    }
    const showPreview = this.props.showPreview && !drag.disablePreview;
    return (
      // @ts-expect-error ts-migrate(7026) FIXME: JSX element implicitly has type 'any' because no i... Remove this comment to see the full error message
      <div className={styles.month} style={this.props.style}>
        {this.props.showMonthName ? (
          // @ts-expect-error ts-migrate(7026) FIXME: JSX element implicitly has type 'any' because no i... Remove this comment to see the full error message
          <div className={styles.monthName}>
            {format(this.props.month, this.props.monthDisplayFormat, this.props.dateOptions)}
            // @ts-expect-error ts-migrate(7026) FIXME: JSX element implicitly has type 'any'
            because no i... Remove this comment to see the full error message
          </div>
        ) : null}
        {this.props.showWeekDays &&
          renderWeekdays(styles, this.props.dateOptions, this.props.weekdayDisplayFormat)}
        // @ts-expect-error ts-migrate(7026) FIXME: JSX element implicitly has type 'any' because no
        i... Remove this comment to see the full error message
        <div className={styles.days} onMouseLeave={this.props.onMouseLeave}>
          {eachDayOfInterval({ start: monthDisplay.start, end: monthDisplay.end }).map(
            (day, index) => {
              const isStartOfMonth = isSameDay(day, monthDisplay.startDateOfMonth);
              const isEndOfMonth = isSameDay(day, monthDisplay.endDateOfMonth);
              const isOutsideMinMax =
                (minDate && isBefore(day, minDate)) || (maxDate && isAfter(day, maxDate));
              const isDisabledSpecifically = disabledDates.some((disabledDate: any) =>
                isSameDay(disabledDate, day)
              );
              const isDisabledDay = disabledDay(day);
              return (
                // @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
                <DayCell
                  {...this.props}
                  ranges={ranges}
                  day={day}
                  preview={showPreview ? this.props.preview : null}
                  // @ts-expect-error ts-migrate(2554) FIXME: Expected 1 arguments, but got 2.
                  isWeekend={isWeekend(day, this.props.dateOptions)}
                  isToday={isSameDay(day, now)}
                  isStartOfWeek={isSameDay(day, startOfWeek(day, this.props.dateOptions))}
                  isEndOfWeek={isSameDay(day, endOfWeek(day, this.props.dateOptions))}
                  isStartOfMonth={isStartOfMonth}
                  isEndOfMonth={isEndOfMonth}
                  key={index}
                  disabled={isOutsideMinMax || isDisabledSpecifically || isDisabledDay}
                  isPassive={
                    !isWithinInterval(day, {
                      start: monthDisplay.startDateOfMonth,
                      end: monthDisplay.endDateOfMonth,
                    })
                  }
                  styles={styles}
                  onMouseDown={this.props.onDragSelectionStart}
                  onMouseUp={this.props.onDragSelectionEnd}
                  onMouseEnter={this.props.onDragSelectionMove}
                  dragRange={drag.range}
                  drag={drag.status}
                />
              );
            }
          )}
          // @ts-expect-error ts-migrate(7026) FIXME: JSX element implicitly has type 'any' because
          no i... Remove this comment to see the full error message
        </div>
        // @ts-expect-error ts-migrate(7026) FIXME: JSX element implicitly has type 'any' because no
        i... Remove this comment to see the full error message
      </div>
    );
  }
}

// @ts-expect-error ts-migrate(2339) FIXME: Property 'defaultProps' does not exist on type 'ty... Remove this comment to see the full error message
Month.defaultProps = {};

// @ts-expect-error ts-migrate(2339) FIXME: Property 'propTypes' does not exist on type 'typeo... Remove this comment to see the full error message
Month.propTypes = {
  style: PropTypes.object,
  styles: PropTypes.object,
  month: PropTypes.object,
  drag: PropTypes.object,
  dateOptions: PropTypes.object,
  disabledDates: PropTypes.array,
  disabledDay: PropTypes.func,
  preview: PropTypes.shape({
    startDate: PropTypes.object,
    endDate: PropTypes.object,
  }),
  showPreview: PropTypes.bool,
  displayMode: PropTypes.oneOf(['dateRange', 'date']),
  minDate: PropTypes.object,
  maxDate: PropTypes.object,
  ranges: PropTypes.arrayOf(rangeShape),
  focusedRange: PropTypes.arrayOf(PropTypes.number),
  onDragSelectionStart: PropTypes.func,
  onDragSelectionEnd: PropTypes.func,
  onDragSelectionMove: PropTypes.func,
  onMouseLeave: PropTypes.func,
  monthDisplayFormat: PropTypes.string,
  weekdayDisplayFormat: PropTypes.string,
  dayDisplayFormat: PropTypes.string,
  showWeekDays: PropTypes.bool,
  showMonthName: PropTypes.bool,
  fixedHeight: PropTypes.bool,
};

export default Month;
