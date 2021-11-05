// @ts-expect-error ts-migrate(7016) FIXME: Could not find a declaration file for module 'reac... Remove this comment to see the full error message
import React, { PureComponent } from 'react';
// @ts-expect-error ts-migrate(7016) FIXME: Could not find a declaration file for module 'prop... Remove this comment to see the full error message
import PropTypes from 'prop-types';
// @ts-expect-error ts-migrate(6142) FIXME: Module '../DayCell' was resolved to '/mnt/e/projec... Remove this comment to see the full error message
import { rangeShape } from '../DayCell';
// @ts-expect-error ts-migrate(6142) FIXME: Module '../Month' was resolved to '/mnt/e/projects... Remove this comment to see the full error message
import Month from '../Month';
// @ts-expect-error ts-migrate(6142) FIXME: Module '../DateInput' was resolved to '/mnt/e/proj... Remove this comment to see the full error message
import DateInput from '../DateInput';
import { calcFocusDate, generateStyles, getMonthDisplayRange } from '../../utils';
import classnames from 'classnames';
// @ts-expect-error ts-migrate(7016) FIXME: Could not find a declaration file for module 'reac... Remove this comment to see the full error message
import ReactList from 'react-list';
// @ts-expect-error ts-migrate(7016) FIXME: Could not find a declaration file for module 'shal... Remove this comment to see the full error message
import { shallowEqualObjects } from 'shallow-equal';
import {
  addMonths,
  subMonths,
  format,
  eachDayOfInterval,
  startOfWeek,
  endOfWeek,
  isSameDay,
  addYears,
  setYear,
  setMonth,
  differenceInCalendarMonths,
  startOfMonth,
  endOfMonth,
  addDays,
  isSameMonth,
  differenceInDays,
  min,
  max,
} from 'date-fns';
import defaultLocale from 'date-fns/locale/en-US';
import coreStyles from '../../styles';
import { ariaLabelsShape } from '../../accessibility';

class Calendar extends PureComponent {
  constructor(props: any, context: any) {
    super(props, context);
    // @ts-expect-error ts-migrate(2339) FIXME: Property 'dateOptions' does not exist on type 'Cal... Remove this comment to see the full error message
    this.dateOptions = { locale: props.locale };
    // @ts-expect-error ts-migrate(2339) FIXME: Property 'dateOptions' does not exist on type 'Cal... Remove this comment to see the full error message
    if (props.weekStartsOn !== undefined) this.dateOptions.weekStartsOn = props.weekStartsOn;
    // @ts-expect-error ts-migrate(2339) FIXME: Property 'styles' does not exist on type 'Calendar... Remove this comment to see the full error message
    this.styles = generateStyles([coreStyles, props.classNames]);
    // @ts-expect-error ts-migrate(2339) FIXME: Property 'listSizeCache' does not exist on type 'C... Remove this comment to see the full error message
    this.listSizeCache = {};
    // @ts-expect-error ts-migrate(2339) FIXME: Property 'isFirstRender' does not exist on type 'C... Remove this comment to see the full error message
    this.isFirstRender = true;
    // @ts-expect-error ts-migrate(2339) FIXME: Property 'state' does not exist on type 'Calendar'... Remove this comment to see the full error message
    this.state = {
      monthNames: this.getMonthNames(),
      focusedDate: calcFocusDate(null, props),
      drag: {
        status: false,
        range: { startDate: null, endDate: null },
        disablePreview: false,
      },
      scrollArea: this.calcScrollArea(props),
    };
  }
  getMonthNames() {
    // @ts-expect-error ts-migrate(2569) FIXME: Type 'IterableIterator<number>' is not an array ty... Remove this comment to see the full error message
    return [...Array(12).keys()].map(i => this.props.locale.localize.month(i));
  }

  calcScrollArea(props: any) {
    const { direction, months, scroll } = props;
    if (!scroll.enabled) return { enabled: false };

    const longMonthHeight = scroll.longMonthHeight || scroll.monthHeight;
    if (direction === 'vertical') {
      return {
        enabled: true,
        monthHeight: scroll.monthHeight || 220,
        longMonthHeight: longMonthHeight || 260,
        calendarWidth: 'auto',
        calendarHeight: (scroll.calendarHeight || longMonthHeight || 240) * months,
      };
    }
    return {
      enabled: true,
      monthWidth: scroll.monthWidth || 332,
      calendarWidth: (scroll.calendarWidth || scroll.monthWidth || 332) * months,
      monthHeight: longMonthHeight || 300,
      calendarHeight: longMonthHeight || 300,
    };
  }
  // @ts-expect-error ts-migrate(2339) FIXME: Property 'props' does not exist on type 'Calendar'... Remove this comment to see the full error message
  focusToDate = (date: any, props = this.props, preventUnnecessary = true) => {
    if (!props.scroll.enabled) {
      if (preventUnnecessary && props.preventSnapRefocus) {
        // @ts-expect-error ts-migrate(2339) FIXME: Property 'state' does not exist on type 'Calendar'... Remove this comment to see the full error message
        const focusedDateDiff = differenceInCalendarMonths(date, this.state.focusedDate);
        const isAllowedForward = props.calendarFocus === 'forwards' && focusedDateDiff >= 0;
        const isAllowedBackward = props.calendarFocus === 'backwards' && focusedDateDiff <= 0;
        if ((isAllowedForward || isAllowedBackward) && Math.abs(focusedDateDiff) < props.months) {
          return;
        }
      }
      // @ts-expect-error ts-migrate(2339) FIXME: Property 'setState' does not exist on type 'Calend... Remove this comment to see the full error message
      this.setState({ focusedDate: date });
      return;
    }
    // @ts-expect-error ts-migrate(2554) FIXME: Expected 2 arguments, but got 3.
    const targetMonthIndex = differenceInCalendarMonths(date, props.minDate, this.dateOptions);
    // @ts-expect-error ts-migrate(2339) FIXME: Property 'list' does not exist on type 'Calendar'.
    const visibleMonths = this.list.getVisibleRange();
    if (preventUnnecessary && visibleMonths.includes(targetMonthIndex)) return;
    // @ts-expect-error ts-migrate(2339) FIXME: Property 'isFirstRender' does not exist on type 'C... Remove this comment to see the full error message
    this.isFirstRender = true;
    // @ts-expect-error ts-migrate(2339) FIXME: Property 'list' does not exist on type 'Calendar'.
    this.list.scrollTo(targetMonthIndex);
    // @ts-expect-error ts-migrate(2339) FIXME: Property 'setState' does not exist on type 'Calend... Remove this comment to see the full error message
    this.setState({ focusedDate: date });
  };
  // @ts-expect-error ts-migrate(2339) FIXME: Property 'props' does not exist on type 'Calendar'... Remove this comment to see the full error message
  updateShownDate = (props = this.props) => {
    const newProps = props.scroll.enabled
      ? {
          ...props,
          // @ts-expect-error ts-migrate(2339) FIXME: Property 'list' does not exist on type 'Calendar'.
          months: this.list.getVisibleRange().length,
        }
      : props;
    // @ts-expect-error ts-migrate(2339) FIXME: Property 'state' does not exist on type 'Calendar'... Remove this comment to see the full error message
    const newFocus = calcFocusDate(this.state.focusedDate, newProps);
    this.focusToDate(newFocus, newProps);
  };
  updatePreview = (val: any) => {
    if (!val) {
      // @ts-expect-error ts-migrate(2339) FIXME: Property 'setState' does not exist on type 'Calend... Remove this comment to see the full error message
      this.setState({ preview: null });
      return;
    }
    const preview = {
      startDate: val,
      endDate: val,
      // @ts-expect-error ts-migrate(2339) FIXME: Property 'props' does not exist on type 'Calendar'... Remove this comment to see the full error message
      color: this.props.color,
    };
    // @ts-expect-error ts-migrate(2339) FIXME: Property 'setState' does not exist on type 'Calend... Remove this comment to see the full error message
    this.setState({ preview });
  };
  componentDidMount() {
    // @ts-expect-error ts-migrate(2339) FIXME: Property 'props' does not exist on type 'Calendar'... Remove this comment to see the full error message
    if (this.props.scroll.enabled) {
      // prevent react-list's initial render focus problem
      // @ts-expect-error ts-migrate(2339) FIXME: Property 'state' does not exist on type 'Calendar'... Remove this comment to see the full error message
      setTimeout(() => this.focusToDate(this.state.focusedDate));
    }
  }

  componentDidUpdate(prevProps: any) {
    const propMapper = {
      dateRange: 'ranges',
      date: 'date',
    };
    // @ts-expect-error ts-migrate(7053) FIXME: Element implicitly has an 'any' type because expre... Remove this comment to see the full error message
    const targetProp = propMapper[this.props.displayMode];
    // @ts-expect-error ts-migrate(2339) FIXME: Property 'props' does not exist on type 'Calendar'... Remove this comment to see the full error message
    if (this.props[targetProp] !== prevProps[targetProp]) {
      // @ts-expect-error ts-migrate(2339) FIXME: Property 'props' does not exist on type 'Calendar'... Remove this comment to see the full error message
      this.updateShownDate(this.props);
    }

    if (
      // @ts-expect-error ts-migrate(2339) FIXME: Property 'props' does not exist on type 'Calendar'... Remove this comment to see the full error message
      prevProps.locale !== this.props.locale ||
      // @ts-expect-error ts-migrate(2339) FIXME: Property 'props' does not exist on type 'Calendar'... Remove this comment to see the full error message
      prevProps.weekStartsOn !== this.props.weekStartsOn
    ) {
      // @ts-expect-error ts-migrate(2339) FIXME: Property 'dateOptions' does not exist on type 'Cal... Remove this comment to see the full error message
      this.dateOptions = { locale: this.props.locale };
      // @ts-expect-error ts-migrate(2339) FIXME: Property 'props' does not exist on type 'Calendar'... Remove this comment to see the full error message
      if (this.props.weekStartsOn !== undefined)
        // @ts-expect-error ts-migrate(2339) FIXME: Property 'dateOptions' does not exist on type 'Cal... Remove this comment to see the full error message
        this.dateOptions.weekStartsOn = this.props.weekStartsOn;
      // @ts-expect-error ts-migrate(2339) FIXME: Property 'setState' does not exist on type 'Calend... Remove this comment to see the full error message
      this.setState({
        monthNames: this.getMonthNames(),
      });
    }

    // @ts-expect-error ts-migrate(2339) FIXME: Property 'props' does not exist on type 'Calendar'... Remove this comment to see the full error message
    if (!shallowEqualObjects(prevProps.scroll, this.props.scroll)) {
      // @ts-expect-error ts-migrate(2339) FIXME: Property 'setState' does not exist on type 'Calend... Remove this comment to see the full error message
      this.setState({ scrollArea: this.calcScrollArea(this.props) });
    }
  }

  changeShownDate = (value: any, mode = 'set') => {
    // @ts-expect-error ts-migrate(2339) FIXME: Property 'state' does not exist on type 'Calendar'... Remove this comment to see the full error message
    const { focusedDate } = this.state;
    // @ts-expect-error ts-migrate(2339) FIXME: Property 'props' does not exist on type 'Calendar'... Remove this comment to see the full error message
    const { onShownDateChange, minDate, maxDate } = this.props;
    const modeMapper = {
      monthOffset: () => addMonths(focusedDate, value),
      setMonth: () => setMonth(focusedDate, value),
      setYear: () => setYear(focusedDate, value),
      set: () => value,
    };

    // @ts-expect-error ts-migrate(7053) FIXME: Element implicitly has an 'any' type because expre... Remove this comment to see the full error message
    const newDate = min([max([modeMapper[mode](), minDate]), maxDate]);
    // @ts-expect-error ts-migrate(2339) FIXME: Property 'props' does not exist on type 'Calendar'... Remove this comment to see the full error message
    this.focusToDate(newDate, this.props, false);
    onShownDateChange && onShownDateChange(newDate);
  };
  handleRangeFocusChange = (rangesIndex: any, rangeItemIndex: any) => {
    // @ts-expect-error ts-migrate(2339) FIXME: Property 'props' does not exist on type 'Calendar'... Remove this comment to see the full error message
    this.props.onRangeFocusChange && this.props.onRangeFocusChange([rangesIndex, rangeItemIndex]);
  };
  handleScroll = () => {
    // @ts-expect-error ts-migrate(2339) FIXME: Property 'props' does not exist on type 'Calendar'... Remove this comment to see the full error message
    const { onShownDateChange, minDate } = this.props;
    // @ts-expect-error ts-migrate(2339) FIXME: Property 'state' does not exist on type 'Calendar'... Remove this comment to see the full error message
    const { focusedDate } = this.state;
    // @ts-expect-error ts-migrate(2339) FIXME: Property 'isFirstRender' does not exist on type 'C... Remove this comment to see the full error message
    const { isFirstRender } = this;

    // @ts-expect-error ts-migrate(2339) FIXME: Property 'list' does not exist on type 'Calendar'.
    const visibleMonths = this.list.getVisibleRange();
    // prevent scroll jump with wrong visible value
    if (visibleMonths[0] === undefined) return;
    const visibleMonth = addMonths(minDate, visibleMonths[0] || 0);
    const isFocusedToDifferent = !isSameMonth(visibleMonth, focusedDate);
    if (isFocusedToDifferent && !isFirstRender) {
      // @ts-expect-error ts-migrate(2339) FIXME: Property 'setState' does not exist on type 'Calend... Remove this comment to see the full error message
      this.setState({ focusedDate: visibleMonth });
      onShownDateChange && onShownDateChange(visibleMonth);
    }
    // @ts-expect-error ts-migrate(2339) FIXME: Property 'isFirstRender' does not exist on type 'C... Remove this comment to see the full error message
    this.isFirstRender = false;
  };
  renderMonthAndYear = (focusedDate: any, changeShownDate: any, props: any) => {
    const { showMonthArrow, minDate, maxDate, showMonthAndYearPickers, ariaLabels } = props;
    // @ts-expect-error ts-migrate(2339) FIXME: Property 'defaultProps' does not exist on type 'ty... Remove this comment to see the full error message
    const upperYearLimit = (maxDate || Calendar.defaultProps.maxDate).getFullYear();
    // @ts-expect-error ts-migrate(2339) FIXME: Property 'defaultProps' does not exist on type 'ty... Remove this comment to see the full error message
    const lowerYearLimit = (minDate || Calendar.defaultProps.minDate).getFullYear();
    // @ts-expect-error ts-migrate(2339) FIXME: Property 'styles' does not exist on type 'Calendar... Remove this comment to see the full error message
    const styles = this.styles;
    return (
      // @ts-expect-error ts-migrate(7026) FIXME: JSX element implicitly has type 'any' because no i... Remove this comment to see the full error message
      <div onMouseUp={(e: any) => e.stopPropagation()} className={styles.monthAndYearWrapper}>
        {showMonthArrow ? (
          // @ts-expect-error ts-migrate(7026) FIXME: JSX element implicitly has type 'any' because no i... Remove this comment to see the full error message
          <button
            type="button"
            className={classnames(styles.nextPrevButton, styles.prevButton)}
            onClick={() => changeShownDate(-1, 'monthOffset')}
            aria-label={ariaLabels.prevButton}>
            // @ts-expect-error ts-migrate(7026) FIXME: JSX element implicitly has type 'any'
            because no i... Remove this comment to see the full error message
            <i />
            // @ts-expect-error ts-migrate(7026) FIXME: JSX element implicitly has type 'any'
            because no i... Remove this comment to see the full error message
          </button>
        ) : null}
        {showMonthAndYearPickers ? (
          // @ts-expect-error ts-migrate(7026) FIXME: JSX element implicitly has type 'any' because no i... Remove this comment to see the full error message
          <span className={styles.monthAndYearPickers}>
            // @ts-expect-error ts-migrate(7026) FIXME: JSX element implicitly has type 'any'
            because no i... Remove this comment to see the full error message
            <span className={styles.monthPicker}>
              // @ts-expect-error ts-migrate(7026) FIXME: JSX element implicitly has type 'any'
              because no i... Remove this comment to see the full error message
              <select
                value={focusedDate.getMonth()}
                onChange={(e: any) => changeShownDate(e.target.value, 'setMonth')}
                aria-label={ariaLabels.monthPicker}>
                // @ts-expect-error ts-migrate(2339) FIXME: Property 'state' does not exist on type
                'Calendar'... Remove this comment to see the full error message
                {this.state.monthNames.map((monthName: any, i: any) => (
                  // @ts-expect-error ts-migrate(7026) FIXME: JSX element implicitly has type 'any' because no i... Remove this comment to see the full error message
                  <option key={i} value={i}>
                    {monthName}
                    // @ts-expect-error ts-migrate(7026) FIXME: JSX element implicitly has type
                    'any' because no i... Remove this comment to see the full error message
                  </option>
                ))}
                // @ts-expect-error ts-migrate(7026) FIXME: JSX element implicitly has type 'any'
                because no i... Remove this comment to see the full error message
              </select>
              // @ts-expect-error ts-migrate(7026) FIXME: JSX element implicitly has type 'any'
              because no i... Remove this comment to see the full error message
            </span>
            // @ts-expect-error ts-migrate(7026) FIXME: JSX element implicitly has type 'any'
            because no i... Remove this comment to see the full error message
            <span className={styles.monthAndYearDivider} />
            // @ts-expect-error ts-migrate(7026) FIXME: JSX element implicitly has type 'any'
            because no i... Remove this comment to see the full error message
            <span className={styles.yearPicker}>
              // @ts-expect-error ts-migrate(7026) FIXME: JSX element implicitly has type 'any'
              because no i... Remove this comment to see the full error message
              <select
                value={focusedDate.getFullYear()}
                onChange={(e: any) => changeShownDate(e.target.value, 'setYear')}
                aria-label={ariaLabels.yearPicker}>
                {new Array(upperYearLimit - lowerYearLimit + 1)
                  .fill(upperYearLimit)
                  .map((val, i) => {
                    const year = val - i;
                    return (
                      // @ts-expect-error ts-migrate(7026) FIXME: JSX element implicitly has type 'any' because no i... Remove this comment to see the full error message
                      <option key={year} value={year}>
                        {year}
                        // @ts-expect-error ts-migrate(7026) FIXME: JSX element implicitly has type
                        'any' because no i... Remove this comment to see the full error message
                      </option>
                    );
                  })}
                // @ts-expect-error ts-migrate(7026) FIXME: JSX element implicitly has type 'any'
                because no i... Remove this comment to see the full error message
              </select>
              // @ts-expect-error ts-migrate(7026) FIXME: JSX element implicitly has type 'any'
              because no i... Remove this comment to see the full error message
            </span>
            // @ts-expect-error ts-migrate(7026) FIXME: JSX element implicitly has type 'any'
            because no i... Remove this comment to see the full error message
          </span>
        ) : (
          // @ts-expect-error ts-migrate(7026) FIXME: JSX element implicitly has type 'any' because no i... Remove this comment to see the full error message
          <span className={styles.monthAndYearPickers}>
            // @ts-expect-error ts-migrate(2339) FIXME: Property 'state' does not exist on type
            'Calendar'... Remove this comment to see the full error message
            {this.state.monthNames[focusedDate.getMonth()]} {focusedDate.getFullYear()}
            // @ts-expect-error ts-migrate(7026) FIXME: JSX element implicitly has type 'any'
            because no i... Remove this comment to see the full error message
          </span>
        )}
        {showMonthArrow ? (
          // @ts-expect-error ts-migrate(7026) FIXME: JSX element implicitly has type 'any' because no i... Remove this comment to see the full error message
          <button
            type="button"
            className={classnames(styles.nextPrevButton, styles.nextButton)}
            onClick={() => changeShownDate(+1, 'monthOffset')}
            aria-label={ariaLabels.nextButton}>
            // @ts-expect-error ts-migrate(7026) FIXME: JSX element implicitly has type 'any'
            because no i... Remove this comment to see the full error message
            <i />
            // @ts-expect-error ts-migrate(7026) FIXME: JSX element implicitly has type 'any'
            because no i... Remove this comment to see the full error message
          </button>
        ) : null}
        // @ts-expect-error ts-migrate(7026) FIXME: JSX element implicitly has type 'any' because no
        i... Remove this comment to see the full error message
      </div>
    );
  };
  renderWeekdays() {
    const now = new Date();
    return (
      // @ts-expect-error ts-migrate(7026) FIXME: JSX element implicitly has type 'any' because no i... Remove this comment to see the full error message
      <div className={this.styles.weekDays}>
        {eachDayOfInterval({
          // @ts-expect-error ts-migrate(2339) FIXME: Property 'dateOptions' does not exist on type 'Cal... Remove this comment to see the full error message
          start: startOfWeek(now, this.dateOptions),
          // @ts-expect-error ts-migrate(2339) FIXME: Property 'dateOptions' does not exist on type 'Cal... Remove this comment to see the full error message
          end: endOfWeek(now, this.dateOptions),
        }).map((day, i) => (
          // @ts-expect-error ts-migrate(7026) FIXME: JSX element implicitly has type 'any' because no i... Remove this comment to see the full error message
          <span className={this.styles.weekDay} key={i}>
            // @ts-expect-error ts-migrate(2339) FIXME: Property 'props' does not exist on type
            'Calendar'... Remove this comment to see the full error message
            {format(day, this.props.weekdayDisplayFormat, this.dateOptions)}
            // @ts-expect-error ts-migrate(7026) FIXME: JSX element implicitly has type 'any'
            because no i... Remove this comment to see the full error message
          </span>
        ))}
        // @ts-expect-error ts-migrate(7026) FIXME: JSX element implicitly has type 'any' because no
        i... Remove this comment to see the full error message
      </div>
    );
  }
  renderDateDisplay = () => {
    const {
      focusedRange,
      color,
      ranges,
      rangeColors,
      dateDisplayFormat,
      editableDateInputs,
      startDatePlaceholder,
      endDatePlaceholder,
      ariaLabels,
      // @ts-expect-error ts-migrate(2339) FIXME: Property 'props' does not exist on type 'Calendar'... Remove this comment to see the full error message
    } = this.props;

    const defaultColor = rangeColors[focusedRange[0]] || color;
    // @ts-expect-error ts-migrate(2339) FIXME: Property 'styles' does not exist on type 'Calendar... Remove this comment to see the full error message
    const styles = this.styles;

    return (
      // @ts-expect-error ts-migrate(7026) FIXME: JSX element implicitly has type 'any' because no i... Remove this comment to see the full error message
      <div className={styles.dateDisplayWrapper}>
        {ranges.map((range: any, i: any) => {
          if (range.showDateDisplay === false || (range.disabled && !range.showDateDisplay))
            return null;
          return (
            // @ts-expect-error ts-migrate(7026) FIXME: JSX element implicitly has type 'any' because no i... Remove this comment to see the full error message
            <div
              className={styles.dateDisplay}
              key={i}
              style={{ color: range.color || defaultColor }}>
              // @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is
              provided... Remove this comment to see the full error message
              <DateInput
                className={classnames(styles.dateDisplayItem, {
                  [styles.dateDisplayItemActive]: focusedRange[0] === i && focusedRange[1] === 0,
                })}
                readOnly={!editableDateInputs}
                disabled={range.disabled}
                value={range.startDate}
                placeholder={startDatePlaceholder}
                // @ts-expect-error ts-migrate(2339) FIXME: Property 'dateOptions' does not exist on type 'Cal... Remove this comment to see the full error message
                dateOptions={this.dateOptions}
                dateDisplayFormat={dateDisplayFormat}
                ariaLabel={
                  ariaLabels.dateInput &&
                  ariaLabels.dateInput[range.key] &&
                  ariaLabels.dateInput[range.key].startDate
                }
                onChange={this.onDragSelectionEnd}
                onFocus={() => this.handleRangeFocusChange(i, 0)}
              />
              // @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is
              provided... Remove this comment to see the full error message
              <DateInput
                className={classnames(styles.dateDisplayItem, {
                  [styles.dateDisplayItemActive]: focusedRange[0] === i && focusedRange[1] === 1,
                })}
                readOnly={!editableDateInputs}
                disabled={range.disabled}
                value={range.endDate}
                placeholder={endDatePlaceholder}
                // @ts-expect-error ts-migrate(2339) FIXME: Property 'dateOptions' does not exist on type 'Cal... Remove this comment to see the full error message
                dateOptions={this.dateOptions}
                dateDisplayFormat={dateDisplayFormat}
                ariaLabel={
                  ariaLabels.dateInput &&
                  ariaLabels.dateInput[range.key] &&
                  ariaLabels.dateInput[range.key].endDate
                }
                onChange={this.onDragSelectionEnd}
                onFocus={() => this.handleRangeFocusChange(i, 1)}
              />
              // @ts-expect-error ts-migrate(7026) FIXME: JSX element implicitly has type 'any'
              because no i... Remove this comment to see the full error message
            </div>
          );
        })}
        // @ts-expect-error ts-migrate(7026) FIXME: JSX element implicitly has type 'any' because no
        i... Remove this comment to see the full error message
      </div>
    );
  };
  onDragSelectionStart = (date: any) => {
    // @ts-expect-error ts-migrate(2339) FIXME: Property 'props' does not exist on type 'Calendar'... Remove this comment to see the full error message
    const { onChange, dragSelectionEnabled } = this.props;

    if (dragSelectionEnabled) {
      // @ts-expect-error ts-migrate(2339) FIXME: Property 'setState' does not exist on type 'Calend... Remove this comment to see the full error message
      this.setState({
        drag: {
          status: true,
          range: { startDate: date, endDate: date },
          disablePreview: true,
        },
      });
    } else {
      onChange && onChange(date);
    }
  };

  onDragSelectionEnd = (date: any) => {
    // @ts-expect-error ts-migrate(2339) FIXME: Property 'props' does not exist on type 'Calendar'... Remove this comment to see the full error message
    const { updateRange, displayMode, onChange, dragSelectionEnabled } = this.props;

    if (!dragSelectionEnabled) return;

    // @ts-expect-error ts-migrate(2339) FIXME: Property 'state' does not exist on type 'Calendar'... Remove this comment to see the full error message
    if (displayMode === 'date' || !this.state.drag.status) {
      onChange && onChange(date);
      return;
    }
    const newRange = {
      // @ts-expect-error ts-migrate(2339) FIXME: Property 'state' does not exist on type 'Calendar'... Remove this comment to see the full error message
      startDate: this.state.drag.range.startDate,
      endDate: date,
    };
    if (displayMode !== 'dateRange' || isSameDay(newRange.startDate, date)) {
      // @ts-expect-error ts-migrate(2339) FIXME: Property 'setState' does not exist on type 'Calend... Remove this comment to see the full error message
      this.setState({ drag: { status: false, range: {} } }, () => onChange && onChange(date));
    } else {
      // @ts-expect-error ts-migrate(2339) FIXME: Property 'setState' does not exist on type 'Calend... Remove this comment to see the full error message
      this.setState({ drag: { status: false, range: {} } }, () => {
        updateRange && updateRange(newRange);
      });
    }
  };
  onDragSelectionMove = (date: any) => {
    // @ts-expect-error ts-migrate(2339) FIXME: Property 'state' does not exist on type 'Calendar'... Remove this comment to see the full error message
    const { drag } = this.state;
    // @ts-expect-error ts-migrate(2339) FIXME: Property 'props' does not exist on type 'Calendar'... Remove this comment to see the full error message
    if (!drag.status || !this.props.dragSelectionEnabled) return;
    // @ts-expect-error ts-migrate(2339) FIXME: Property 'setState' does not exist on type 'Calend... Remove this comment to see the full error message
    this.setState({
      drag: {
        status: drag.status,
        range: { startDate: drag.range.startDate, endDate: date },
        disablePreview: true,
      },
    });
  };

  estimateMonthSize = (index: any, cache: any) => {
    // @ts-expect-error ts-migrate(2339) FIXME: Property 'props' does not exist on type 'Calendar'... Remove this comment to see the full error message
    const { direction, minDate } = this.props;
    // @ts-expect-error ts-migrate(2339) FIXME: Property 'state' does not exist on type 'Calendar'... Remove this comment to see the full error message
    const { scrollArea } = this.state;
    if (cache) {
      // @ts-expect-error ts-migrate(2339) FIXME: Property 'listSizeCache' does not exist on type 'C... Remove this comment to see the full error message
      this.listSizeCache = cache;
      if (cache[index]) return cache[index];
    }
    if (direction === 'horizontal') return scrollArea.monthWidth;
    const monthStep = addMonths(minDate, index);
    // @ts-expect-error ts-migrate(2554) FIXME: Expected 3 arguments, but got 2.
    const { start, end } = getMonthDisplayRange(monthStep, this.dateOptions);
    // @ts-expect-error ts-migrate(2554) FIXME: Expected 2 arguments, but got 3.
    const isLongMonth = differenceInDays(end, start, this.dateOptions) + 1 > 7 * 5;
    return isLongMonth ? scrollArea.longMonthHeight : scrollArea.monthHeight;
  };
  render() {
    const {
      showDateDisplay,
      onPreviewChange,
      scroll,
      direction,
      disabledDates,
      disabledDay,
      maxDate,
      minDate,
      rangeColors,
      color,
      navigatorRenderer,
      className,
      preview,
      // @ts-expect-error ts-migrate(2339) FIXME: Property 'props' does not exist on type 'Calendar'... Remove this comment to see the full error message
    } = this.props;
    // @ts-expect-error ts-migrate(2339) FIXME: Property 'state' does not exist on type 'Calendar'... Remove this comment to see the full error message
    const { scrollArea, focusedDate } = this.state;
    const isVertical = direction === 'vertical';
    const monthAndYearRenderer = navigatorRenderer || this.renderMonthAndYear;

    // @ts-expect-error ts-migrate(2339) FIXME: Property 'props' does not exist on type 'Calendar'... Remove this comment to see the full error message
    const ranges = this.props.ranges.map((range, i) => ({
      ...range,
      color: range.color || rangeColors[i] || color,
    }));
    return (
      // @ts-expect-error ts-migrate(7026) FIXME: JSX element implicitly has type 'any' because no i... Remove this comment to see the full error message
      <div
        // @ts-expect-error ts-migrate(2339) FIXME: Property 'styles' does not exist on type 'Calendar... Remove this comment to see the full error message
        className={classnames(this.styles.calendarWrapper, className)}
        // @ts-expect-error ts-migrate(2339) FIXME: Property 'setState' does not exist on type 'Calend... Remove this comment to see the full error message
        onMouseUp={() => this.setState({ drag: { status: false, range: {} } })}
        onMouseLeave={() => {
          // @ts-expect-error ts-migrate(2339) FIXME: Property 'setState' does not exist on type 'Calend... Remove this comment to see the full error message
          this.setState({ drag: { status: false, range: {} } });
        }}>
        {showDateDisplay && this.renderDateDisplay()}
        // @ts-expect-error ts-migrate(2339) FIXME: Property 'props' does not exist on type
        'Calendar'... Remove this comment to see the full error message
        {monthAndYearRenderer(focusedDate, this.changeShownDate, this.props)}
        {scroll.enabled ? (
          // @ts-expect-error ts-migrate(7026) FIXME: JSX element implicitly has type 'any' because no i... Remove this comment to see the full error message
          <div>
            // @ts-expect-error ts-migrate(2554) FIXME: Expected 0 arguments, but got 1.
            {isVertical && this.renderWeekdays(this.dateOptions)}
            // @ts-expect-error ts-migrate(7026) FIXME: JSX element implicitly has type 'any'
            because no i... Remove this comment to see the full error message
            <div
              className={classnames(
                // @ts-expect-error ts-migrate(2339) FIXME: Property 'styles' does not exist on type 'Calendar... Remove this comment to see the full error message
                this.styles.infiniteMonths,
                // @ts-expect-error ts-migrate(2339) FIXME: Property 'styles' does not exist on type 'Calendar... Remove this comment to see the full error message
                isVertical ? this.styles.monthsVertical : this.styles.monthsHorizontal
              )}
              onMouseLeave={() => onPreviewChange && onPreviewChange()}
              style={{
                width: scrollArea.calendarWidth + 11,
                height: scrollArea.calendarHeight + 11,
              }}
              onScroll={this.handleScroll}>
              // @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is
              provided... Remove this comment to see the full error message
              <ReactList
                length={differenceInCalendarMonths(
                  endOfMonth(maxDate),
                  addDays(startOfMonth(minDate), -1),
                  // @ts-expect-error ts-migrate(2554) FIXME: Expected 2 arguments, but got 3.
                  this.dateOptions
                )}
                treshold={500}
                type="variable"
                // @ts-expect-error ts-migrate(2339) FIXME: Property 'list' does not exist on type 'Calendar'.
                ref={(target: any) => (this.list = target)}
                itemSizeEstimator={this.estimateMonthSize}
                axis={isVertical ? 'y' : 'x'}
                itemRenderer={(index: any, key: any) => {
                  const monthStep = addMonths(minDate, index);
                  return (
                    // @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
                    <Month
                      // @ts-expect-error ts-migrate(2339) FIXME: Property 'props' does not exist on type 'Calendar'... Remove this comment to see the full error message
                      {...this.props}
                      onPreviewChange={onPreviewChange || this.updatePreview}
                      // @ts-expect-error ts-migrate(2339) FIXME: Property 'state' does not exist on type 'Calendar'... Remove this comment to see the full error message
                      preview={preview || this.state.preview}
                      ranges={ranges}
                      key={key}
                      // @ts-expect-error ts-migrate(2339) FIXME: Property 'state' does not exist on type 'Calendar'... Remove this comment to see the full error message
                      drag={this.state.drag}
                      // @ts-expect-error ts-migrate(2339) FIXME: Property 'dateOptions' does not exist on type 'Cal... Remove this comment to see the full error message
                      dateOptions={this.dateOptions}
                      disabledDates={disabledDates}
                      disabledDay={disabledDay}
                      month={monthStep}
                      onDragSelectionStart={this.onDragSelectionStart}
                      onDragSelectionEnd={this.onDragSelectionEnd}
                      onDragSelectionMove={this.onDragSelectionMove}
                      onMouseLeave={() => onPreviewChange && onPreviewChange()}
                      // @ts-expect-error ts-migrate(2339) FIXME: Property 'styles' does not exist on type 'Calendar... Remove this comment to see the full error message
                      styles={this.styles}
                      style={
                        isVertical
                          ? // @ts-expect-error ts-migrate(2554) FIXME: Expected 2 arguments, but got 1.
                            { height: this.estimateMonthSize(index) }
                          : // @ts-expect-error ts-migrate(2554) FIXME: Expected 2 arguments, but got 1.
                            { height: scrollArea.monthHeight, width: this.estimateMonthSize(index) }
                      }
                      showMonthName
                      showWeekDays={!isVertical}
                    />
                  );
                }}
              />
              // @ts-expect-error ts-migrate(7026) FIXME: JSX element implicitly has type 'any'
              because no i... Remove this comment to see the full error message
            </div>
            // @ts-expect-error ts-migrate(7026) FIXME: JSX element implicitly has type 'any'
            because no i... Remove this comment to see the full error message
          </div>
        ) : (
          // @ts-expect-error ts-migrate(7026) FIXME: JSX element implicitly has type 'any' because no i... Remove this comment to see the full error message
          <div
            className={classnames(
              // @ts-expect-error ts-migrate(2339) FIXME: Property 'styles' does not exist on type 'Calendar... Remove this comment to see the full error message
              this.styles.months,
              // @ts-expect-error ts-migrate(2339) FIXME: Property 'styles' does not exist on type 'Calendar... Remove this comment to see the full error message
              isVertical ? this.styles.monthsVertical : this.styles.monthsHorizontal
            )}>
            // @ts-expect-error ts-migrate(2339) FIXME: Property 'props' does not exist on type
            'Calendar'... Remove this comment to see the full error message
            {new Array(this.props.months).fill(null).map((_, i) => {
              // @ts-expect-error ts-migrate(2339) FIXME: Property 'state' does not exist on type 'Calendar'... Remove this comment to see the full error message
              let monthStep = addMonths(this.state.focusedDate, i);
              // @ts-expect-error ts-migrate(2339) FIXME: Property 'props' does not exist on type 'Calendar'... Remove this comment to see the full error message
              if (this.props.calendarFocus === 'backwards') {
                // @ts-expect-error ts-migrate(2339) FIXME: Property 'state' does not exist on type 'Calendar'... Remove this comment to see the full error message
                monthStep = subMonths(this.state.focusedDate, this.props.months - 1 - i);
              }
              return (
                // @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
                <Month
                  // @ts-expect-error ts-migrate(2339) FIXME: Property 'props' does not exist on type 'Calendar'... Remove this comment to see the full error message
                  {...this.props}
                  onPreviewChange={onPreviewChange || this.updatePreview}
                  // @ts-expect-error ts-migrate(2339) FIXME: Property 'state' does not exist on type 'Calendar'... Remove this comment to see the full error message
                  preview={preview || this.state.preview}
                  ranges={ranges}
                  key={i}
                  // @ts-expect-error ts-migrate(2339) FIXME: Property 'state' does not exist on type 'Calendar'... Remove this comment to see the full error message
                  drag={this.state.drag}
                  // @ts-expect-error ts-migrate(2339) FIXME: Property 'dateOptions' does not exist on type 'Cal... Remove this comment to see the full error message
                  dateOptions={this.dateOptions}
                  disabledDates={disabledDates}
                  disabledDay={disabledDay}
                  month={monthStep}
                  onDragSelectionStart={this.onDragSelectionStart}
                  onDragSelectionEnd={this.onDragSelectionEnd}
                  onDragSelectionMove={this.onDragSelectionMove}
                  onMouseLeave={() => onPreviewChange && onPreviewChange()}
                  // @ts-expect-error ts-migrate(2339) FIXME: Property 'styles' does not exist on type 'Calendar... Remove this comment to see the full error message
                  styles={this.styles}
                  showWeekDays={!isVertical || i === 0}
                  showMonthName={!isVertical || i > 0}
                />
              );
            })}
            // @ts-expect-error ts-migrate(7026) FIXME: JSX element implicitly has type 'any'
            because no i... Remove this comment to see the full error message
          </div>
        )}
        // @ts-expect-error ts-migrate(7026) FIXME: JSX element implicitly has type 'any' because no
        i... Remove this comment to see the full error message
      </div>
    );
  }
}

// @ts-expect-error ts-migrate(2339) FIXME: Property 'defaultProps' does not exist on type 'ty... Remove this comment to see the full error message
Calendar.defaultProps = {
  showMonthArrow: true,
  showMonthAndYearPickers: true,
  disabledDates: [],
  disabledDay: () => {},
  classNames: {},
  locale: defaultLocale,
  ranges: [],
  focusedRange: [0, 0],
  dateDisplayFormat: 'MMM d, yyyy',
  monthDisplayFormat: 'MMM yyyy',
  weekdayDisplayFormat: 'E',
  dayDisplayFormat: 'd',
  showDateDisplay: true,
  showPreview: true,
  displayMode: 'date',
  months: 1,
  color: '#3d91ff',
  scroll: {
    enabled: false,
  },
  direction: 'vertical',
  maxDate: addYears(new Date(), 20),
  minDate: addYears(new Date(), -100),
  rangeColors: ['#3d91ff', '#3ecf8e', '#fed14c'],
  startDatePlaceholder: 'Early',
  endDatePlaceholder: 'Continuous',
  editableDateInputs: false,
  dragSelectionEnabled: true,
  fixedHeight: false,
  calendarFocus: 'forwards',
  preventSnapRefocus: false,
  ariaLabels: {},
};

// @ts-expect-error ts-migrate(2339) FIXME: Property 'propTypes' does not exist on type 'typeo... Remove this comment to see the full error message
Calendar.propTypes = {
  showMonthArrow: PropTypes.bool,
  showMonthAndYearPickers: PropTypes.bool,
  disabledDates: PropTypes.array,
  disabledDay: PropTypes.func,
  minDate: PropTypes.object,
  maxDate: PropTypes.object,
  date: PropTypes.object,
  onChange: PropTypes.func,
  onPreviewChange: PropTypes.func,
  onRangeFocusChange: PropTypes.func,
  classNames: PropTypes.object,
  locale: PropTypes.object,
  shownDate: PropTypes.object,
  onShownDateChange: PropTypes.func,
  ranges: PropTypes.arrayOf(rangeShape),
  preview: PropTypes.shape({
    startDate: PropTypes.object,
    endDate: PropTypes.object,
    color: PropTypes.string,
  }),
  dateDisplayFormat: PropTypes.string,
  monthDisplayFormat: PropTypes.string,
  weekdayDisplayFormat: PropTypes.string,
  weekStartsOn: PropTypes.number,
  dayDisplayFormat: PropTypes.string,
  focusedRange: PropTypes.arrayOf(PropTypes.number),
  initialFocusedRange: PropTypes.arrayOf(PropTypes.number),
  months: PropTypes.number,
  className: PropTypes.string,
  showDateDisplay: PropTypes.bool,
  showPreview: PropTypes.bool,
  displayMode: PropTypes.oneOf(['dateRange', 'date']),
  color: PropTypes.string,
  updateRange: PropTypes.func,
  scroll: PropTypes.shape({
    enabled: PropTypes.bool,
    monthHeight: PropTypes.number,
    longMonthHeight: PropTypes.number,
    monthWidth: PropTypes.number,
    calendarWidth: PropTypes.number,
    calendarHeight: PropTypes.number,
  }),
  direction: PropTypes.oneOf(['vertical', 'horizontal']),
  startDatePlaceholder: PropTypes.string,
  endDatePlaceholder: PropTypes.string,
  navigatorRenderer: PropTypes.func,
  rangeColors: PropTypes.arrayOf(PropTypes.string),
  editableDateInputs: PropTypes.bool,
  dragSelectionEnabled: PropTypes.bool,
  fixedHeight: PropTypes.bool,
  calendarFocus: PropTypes.string,
  preventSnapRefocus: PropTypes.bool,
  ariaLabels: ariaLabelsShape,
};

export default Calendar;
