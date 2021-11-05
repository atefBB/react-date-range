// @ts-expect-error ts-migrate(7016) FIXME: Could not find a declaration file for module 'reac... Remove this comment to see the full error message
import React, { Component } from 'react';
// @ts-expect-error ts-migrate(7016) FIXME: Could not find a declaration file for module 'prop... Remove this comment to see the full error message
import PropTypes from 'prop-types';
// @ts-expect-error ts-migrate(6142) FIXME: Module '../Calendar' was resolved to '/mnt/e/proje... Remove this comment to see the full error message
import Calendar from '../Calendar';
// @ts-expect-error ts-migrate(6142) FIXME: Module '../DayCell' was resolved to '/mnt/e/projec... Remove this comment to see the full error message
import { rangeShape } from '../DayCell';
import { findNextRangeIndex, generateStyles } from '../../utils';
import { isBefore, differenceInCalendarDays, addDays, min, isWithinInterval, max } from 'date-fns';
import classnames from 'classnames';
import coreStyles from '../../styles';

class DateRange extends Component {
  constructor(props: any, context: any) {
    super(props, context);
    // @ts-expect-error ts-migrate(2339) FIXME: Property 'state' does not exist on type 'DateRange... Remove this comment to see the full error message
    this.state = {
      focusedRange: props.initialFocusedRange || [findNextRangeIndex(props.ranges), 0],
      preview: null,
    };
    // @ts-expect-error ts-migrate(2339) FIXME: Property 'styles' does not exist on type 'DateRang... Remove this comment to see the full error message
    this.styles = generateStyles([coreStyles, props.classNames]);
  }
  calcNewSelection = (value: any, isSingleValue = true) => {
    // @ts-expect-error ts-migrate(2339) FIXME: Property 'props' does not exist on type 'DateRange... Remove this comment to see the full error message
    const focusedRange = this.props.focusedRange || this.state.focusedRange;
    const {
      ranges,
      onChange,
      maxDate,
      moveRangeOnFirstSelection,
      retainEndDateOnFirstSelection,
      disabledDates,
      // @ts-expect-error ts-migrate(2339) FIXME: Property 'props' does not exist on type 'DateRange... Remove this comment to see the full error message
    } = this.props;
    const focusedRangeIndex = focusedRange[0];
    const selectedRange = ranges[focusedRangeIndex];
    if (!selectedRange || !onChange) return {};
    let { startDate, endDate } = selectedRange;
    const now = new Date();
    let nextFocusRange;
    if (!isSingleValue) {
      startDate = value.startDate;
      endDate = value.endDate;
    } else if (focusedRange[1] === 0) {
      // startDate selection
      const dayOffset = differenceInCalendarDays(endDate || now, startDate);
      const calculateEndDate = () => {
        if (moveRangeOnFirstSelection) {
          return addDays(value, dayOffset);
        }
        if (retainEndDateOnFirstSelection) {
          if (!endDate || isBefore(value, endDate)) {
            return endDate;
          }
          return value;
        }
        return value || now;
      };
      startDate = value;
      endDate = calculateEndDate();
      if (maxDate) endDate = min([endDate, maxDate]);
      nextFocusRange = [focusedRange[0], 1];
    } else {
      endDate = value;
    }

    // reverse dates if startDate before endDate
    let isStartDateSelected = focusedRange[1] === 0;
    if (isBefore(endDate, startDate)) {
      isStartDateSelected = !isStartDateSelected;
      [startDate, endDate] = [endDate, startDate];
    }

    const inValidDatesWithinRange = disabledDates.filter((disabledDate: any) =>
      isWithinInterval(disabledDate, {
        start: startDate,
        end: endDate,
      })
    );

    if (inValidDatesWithinRange.length > 0) {
      if (isStartDateSelected) {
        startDate = addDays(max(inValidDatesWithinRange), 1);
      } else {
        endDate = addDays(min(inValidDatesWithinRange), -1);
      }
    }

    if (!nextFocusRange) {
      // @ts-expect-error ts-migrate(2339) FIXME: Property 'props' does not exist on type 'DateRange... Remove this comment to see the full error message
      const nextFocusRangeIndex = findNextRangeIndex(this.props.ranges, focusedRange[0]);
      nextFocusRange = [nextFocusRangeIndex, 0];
    }
    return {
      wasValid: !(inValidDatesWithinRange.length > 0),
      range: { startDate, endDate },
      nextFocusRange: nextFocusRange,
    };
  };
  setSelection = (value: any, isSingleValue: any) => {
    // @ts-expect-error ts-migrate(2339) FIXME: Property 'props' does not exist on type 'DateRange... Remove this comment to see the full error message
    const { onChange, ranges, onRangeFocusChange } = this.props;
    // @ts-expect-error ts-migrate(2339) FIXME: Property 'props' does not exist on type 'DateRange... Remove this comment to see the full error message
    const focusedRange = this.props.focusedRange || this.state.focusedRange;
    const focusedRangeIndex = focusedRange[0];
    const selectedRange = ranges[focusedRangeIndex];
    if (!selectedRange) return;
    const newSelection = this.calcNewSelection(value, isSingleValue);
    onChange({
      [selectedRange.key || `range${focusedRangeIndex + 1}`]: {
        ...selectedRange,
        ...newSelection.range,
      },
    });
    // @ts-expect-error ts-migrate(2339) FIXME: Property 'setState' does not exist on type 'DateRa... Remove this comment to see the full error message
    this.setState({
      focusedRange: newSelection.nextFocusRange,
      preview: null,
    });
    onRangeFocusChange && onRangeFocusChange(newSelection.nextFocusRange);
  };
  handleRangeFocusChange = (focusedRange: any) => {
    // @ts-expect-error ts-migrate(2339) FIXME: Property 'setState' does not exist on type 'DateRa... Remove this comment to see the full error message
    this.setState({ focusedRange });
    // @ts-expect-error ts-migrate(2339) FIXME: Property 'props' does not exist on type 'DateRange... Remove this comment to see the full error message
    this.props.onRangeFocusChange && this.props.onRangeFocusChange(focusedRange);
  };
  updatePreview = (val: any) => {
    if (!val) {
      // @ts-expect-error ts-migrate(2339) FIXME: Property 'setState' does not exist on type 'DateRa... Remove this comment to see the full error message
      this.setState({ preview: null });
      return;
    }
    // @ts-expect-error ts-migrate(2339) FIXME: Property 'props' does not exist on type 'DateRange... Remove this comment to see the full error message
    const { rangeColors, ranges } = this.props;
    // @ts-expect-error ts-migrate(2339) FIXME: Property 'props' does not exist on type 'DateRange... Remove this comment to see the full error message
    const focusedRange = this.props.focusedRange || this.state.focusedRange;
    // @ts-expect-error ts-migrate(7022) FIXME: 'color' implicitly has type 'any' because it does ... Remove this comment to see the full error message
    const color = ranges[focusedRange[0]]?.color || rangeColors[focusedRange[0]] || color;
    // @ts-expect-error ts-migrate(2339) FIXME: Property 'setState' does not exist on type 'DateRa... Remove this comment to see the full error message
    this.setState({ preview: { ...val.range, color } });
  };
  render() {
    return (
      // @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
      <Calendar
        // @ts-expect-error ts-migrate(2339) FIXME: Property 'state' does not exist on type 'DateRange... Remove this comment to see the full error message
        focusedRange={this.state.focusedRange}
        onRangeFocusChange={this.handleRangeFocusChange}
        // @ts-expect-error ts-migrate(2339) FIXME: Property 'state' does not exist on type 'DateRange... Remove this comment to see the full error message
        preview={this.state.preview}
        onPreviewChange={(value: any) => {
          this.updatePreview(value ? this.calcNewSelection(value) : null);
        }}
        // @ts-expect-error ts-migrate(2339) FIXME: Property 'props' does not exist on type 'DateRange... Remove this comment to see the full error message
        {...this.props}
        displayMode="dateRange"
        // @ts-expect-error ts-migrate(2339) FIXME: Property 'styles' does not exist on type 'DateRang... Remove this comment to see the full error message
        className={classnames(this.styles.dateRangeWrapper, this.props.className)}
        onChange={this.setSelection}
        updateRange={(val: any) => this.setSelection(val, false)}
        ref={(target: any) => {
          // @ts-expect-error ts-migrate(2339) FIXME: Property 'calendar' does not exist on type 'DateRa... Remove this comment to see the full error message
          this.calendar = target;
        }}
      />
    );
  }
}

// @ts-expect-error ts-migrate(2339) FIXME: Property 'defaultProps' does not exist on type 'ty... Remove this comment to see the full error message
DateRange.defaultProps = {
  classNames: {},
  ranges: [],
  moveRangeOnFirstSelection: false,
  retainEndDateOnFirstSelection: false,
  rangeColors: ['#3d91ff', '#3ecf8e', '#fed14c'],
  disabledDates: [],
};

// @ts-expect-error ts-migrate(2339) FIXME: Property 'propTypes' does not exist on type 'typeo... Remove this comment to see the full error message
DateRange.propTypes = {
  ...Calendar.propTypes,
  onChange: PropTypes.func,
  onRangeFocusChange: PropTypes.func,
  className: PropTypes.string,
  ranges: PropTypes.arrayOf(rangeShape),
  moveRangeOnFirstSelection: PropTypes.bool,
  retainEndDateOnFirstSelection: PropTypes.bool,
};

export default DateRange;
