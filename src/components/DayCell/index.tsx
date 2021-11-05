/* eslint-disable no-fallthrough */
// @ts-expect-error ts-migrate(7016) FIXME: Could not find a declaration file for module 'reac... Remove this comment to see the full error message
import React, { Component } from 'react';
// @ts-expect-error ts-migrate(7016) FIXME: Could not find a declaration file for module 'prop... Remove this comment to see the full error message
import PropTypes from 'prop-types';
import classnames from 'classnames';
import { startOfDay, format, isSameDay, isAfter, isBefore, endOfDay } from 'date-fns';

class DayCell extends Component {
  constructor(props: any, context: any) {
    super(props, context);

    // @ts-expect-error ts-migrate(2339) FIXME: Property 'state' does not exist on type 'DayCell'.
    this.state = {
      hover: false,
      active: false,
    };
  }

  handleKeyEvent = (event: any) => {
    // @ts-expect-error ts-migrate(2339) FIXME: Property 'props' does not exist on type 'DayCell'.
    const { day, onMouseDown, onMouseUp } = this.props;
    if ([13 /* space */, 32 /* enter */].includes(event.keyCode)) {
      if (event.type === 'keydown') onMouseDown(day);
      else onMouseUp(day);
    }
  };
  handleMouseEvent = (event: any) => {
    // @ts-expect-error ts-migrate(2339) FIXME: Property 'props' does not exist on type 'DayCell'.
    const { day, disabled, onPreviewChange, onMouseEnter, onMouseDown, onMouseUp } = this.props;
    const stateChanges = {};
    if (disabled) {
      onPreviewChange();
      return;
    }

    switch (event.type) {
      case 'mouseenter':
        onMouseEnter(day);
        onPreviewChange(day);
        // @ts-expect-error ts-migrate(2339) FIXME: Property 'hover' does not exist on type '{}'.
        stateChanges.hover = true;
        break;
      case 'blur':
      case 'mouseleave':
        // @ts-expect-error ts-migrate(2339) FIXME: Property 'hover' does not exist on type '{}'.
        stateChanges.hover = false;
        break;
      case 'mousedown':
        // @ts-expect-error ts-migrate(2339) FIXME: Property 'active' does not exist on type '{}'.
        stateChanges.active = true;
        onMouseDown(day);
        break;
      case 'mouseup':
        event.stopPropagation();
        // @ts-expect-error ts-migrate(2339) FIXME: Property 'active' does not exist on type '{}'.
        stateChanges.active = false;
        onMouseUp(day);
        break;
      case 'focus':
        onPreviewChange(day);
        break;
    }
    if (Object.keys(stateChanges).length) {
      // @ts-expect-error ts-migrate(2339) FIXME: Property 'setState' does not exist on type 'DayCel... Remove this comment to see the full error message
      this.setState(stateChanges);
    }
  };
  getClassNames = () => {
    const {
      isPassive,
      isToday,
      isWeekend,
      isStartOfWeek,
      isEndOfWeek,
      isStartOfMonth,
      isEndOfMonth,
      disabled,
      styles,
      // @ts-expect-error ts-migrate(2339) FIXME: Property 'props' does not exist on type 'DayCell'.
    } = this.props;

    return classnames(styles.day, {
      [styles.dayPassive]: isPassive,
      [styles.dayDisabled]: disabled,
      [styles.dayToday]: isToday,
      [styles.dayWeekend]: isWeekend,
      [styles.dayStartOfWeek]: isStartOfWeek,
      [styles.dayEndOfWeek]: isEndOfWeek,
      [styles.dayStartOfMonth]: isStartOfMonth,
      [styles.dayEndOfMonth]: isEndOfMonth,
      // @ts-expect-error ts-migrate(2339) FIXME: Property 'state' does not exist on type 'DayCell'.
      [styles.dayHovered]: this.state.hover,
      // @ts-expect-error ts-migrate(2339) FIXME: Property 'state' does not exist on type 'DayCell'.
      [styles.dayActive]: this.state.active,
    });
  };
  renderPreviewPlaceholder = () => {
    // @ts-expect-error ts-migrate(2339) FIXME: Property 'props' does not exist on type 'DayCell'.
    const { preview, day, styles } = this.props;
    if (!preview) return null;
    const startDate = preview.startDate ? endOfDay(preview.startDate) : null;
    const endDate = preview.endDate ? startOfDay(preview.endDate) : null;
    const isInRange =
      (!startDate || isAfter(day, startDate)) && (!endDate || isBefore(day, endDate));
    // @ts-expect-error ts-migrate(2345) FIXME: Argument of type 'Date | null' is not assignable t... Remove this comment to see the full error message
    const isStartEdge = !isInRange && isSameDay(day, startDate);
    // @ts-expect-error ts-migrate(2345) FIXME: Argument of type 'Date | null' is not assignable t... Remove this comment to see the full error message
    const isEndEdge = !isInRange && isSameDay(day, endDate);
    return (
      // @ts-expect-error ts-migrate(7026) FIXME: JSX element implicitly has type 'any' because no i... Remove this comment to see the full error message
      <span
        className={classnames({
          [styles.dayStartPreview]: isStartEdge,
          [styles.dayInPreview]: isInRange,
          [styles.dayEndPreview]: isEndEdge,
        })}
        style={{ color: preview.color }}
      />
    );
  };
  renderSelectionPlaceholders = () => {
    // @ts-expect-error ts-migrate(2339) FIXME: Property 'props' does not exist on type 'DayCell'.
    const { styles, ranges, day } = this.props;
    // @ts-expect-error ts-migrate(2339) FIXME: Property 'props' does not exist on type 'DayCell'.
    if (this.props.displayMode === 'date') {
      // @ts-expect-error ts-migrate(2339) FIXME: Property 'props' does not exist on type 'DayCell'.
      let isSelected = isSameDay(this.props.day, this.props.date);
      return isSelected ? (
        // @ts-expect-error ts-migrate(7026) FIXME: JSX element implicitly has type 'any' because no i... Remove this comment to see the full error message
        <span className={styles.selected} style={{ color: this.props.color }} />
      ) : null;
    }

    const inRanges = ranges.reduce((result: any, range: any) => {
      let startDate = range.startDate;
      let endDate = range.endDate;
      if (startDate && endDate && isBefore(endDate, startDate)) {
        [startDate, endDate] = [endDate, startDate];
      }
      startDate = startDate ? endOfDay(startDate) : null;
      endDate = endDate ? startOfDay(endDate) : null;
      const isInRange =
        (!startDate || isAfter(day, startDate)) && (!endDate || isBefore(day, endDate));
      const isStartEdge = !isInRange && isSameDay(day, startDate);
      const isEndEdge = !isInRange && isSameDay(day, endDate);
      if (isInRange || isStartEdge || isEndEdge) {
        return [
          ...result,
          {
            isStartEdge,
            isEndEdge: isEndEdge,
            isInRange,
            ...range,
          },
        ];
      }
      return result;
    }, []);

    return inRanges.map((range: any, i: any) => (
      // @ts-expect-error ts-migrate(7026) FIXME: JSX element implicitly has type 'any' because no i... Remove this comment to see the full error message
      <span
        key={i}
        className={classnames({
          [styles.startEdge]: range.isStartEdge,
          [styles.endEdge]: range.isEndEdge,
          [styles.inRange]: range.isInRange,
        })}
        // @ts-expect-error ts-migrate(2339) FIXME: Property 'props' does not exist on type 'DayCell'.
        style={{ color: range.color || this.props.color }}
      />
    ));
  };

  render() {
    // @ts-expect-error ts-migrate(2339) FIXME: Property 'props' does not exist on type 'DayCell'.
    const { dayContentRenderer } = this.props;
    return (
      // @ts-expect-error ts-migrate(7026) FIXME: JSX element implicitly has type 'any' because no i... Remove this comment to see the full error message
      <button
        type="button"
        onMouseEnter={this.handleMouseEvent}
        onMouseLeave={this.handleMouseEvent}
        onFocus={this.handleMouseEvent}
        onMouseDown={this.handleMouseEvent}
        onMouseUp={this.handleMouseEvent}
        onBlur={this.handleMouseEvent}
        onPauseCapture={this.handleMouseEvent}
        onKeyDown={this.handleKeyEvent}
        onKeyUp={this.handleKeyEvent}
        // @ts-expect-error ts-migrate(2554) FIXME: Expected 0 arguments, but got 1.
        className={this.getClassNames(this.props.styles)}
        // @ts-expect-error ts-migrate(2339) FIXME: Property 'props' does not exist on type 'DayCell'.
        {...(this.props.disabled || this.props.isPassive ? { tabIndex: -1 } : {})}
        // @ts-expect-error ts-migrate(2339) FIXME: Property 'props' does not exist on type 'DayCell'.
        style={{ color: this.props.color }}>
        {this.renderSelectionPlaceholders()}
        {this.renderPreviewPlaceholder()}
        // @ts-expect-error ts-migrate(7026) FIXME: JSX element implicitly has type 'any' because no
        i... Remove this comment to see the full error message
        <span className={this.props.styles.dayNumber}>
          // @ts-expect-error ts-migrate(2339) FIXME: Property 'props' does not exist on type
          'DayCell'.
          {dayContentRenderer?.(this.props.day) || (
            // @ts-expect-error ts-migrate(7026) FIXME: JSX element implicitly has type 'any' because no i... Remove this comment to see the full error message
            <span>{format(this.props.day, this.props.dayDisplayFormat)}</span>
          )}
          // @ts-expect-error ts-migrate(7026) FIXME: JSX element implicitly has type 'any' because
          no i... Remove this comment to see the full error message
        </span>
        // @ts-expect-error ts-migrate(7026) FIXME: JSX element implicitly has type 'any' because no
        i... Remove this comment to see the full error message
      </button>
    );
  }
}

// @ts-expect-error ts-migrate(2339) FIXME: Property 'defaultProps' does not exist on type 'ty... Remove this comment to see the full error message
DayCell.defaultProps = {};

export const rangeShape = PropTypes.shape({
  startDate: PropTypes.object,
  endDate: PropTypes.object,
  color: PropTypes.string,
  key: PropTypes.string,
  autoFocus: PropTypes.bool,
  disabled: PropTypes.bool,
  showDateDisplay: PropTypes.bool,
});

// @ts-expect-error ts-migrate(2339) FIXME: Property 'propTypes' does not exist on type 'typeo... Remove this comment to see the full error message
DayCell.propTypes = {
  day: PropTypes.object.isRequired,
  dayDisplayFormat: PropTypes.string,
  date: PropTypes.object,
  ranges: PropTypes.arrayOf(rangeShape),
  preview: PropTypes.shape({
    startDate: PropTypes.object,
    endDate: PropTypes.object,
    color: PropTypes.string,
  }),
  onPreviewChange: PropTypes.func,
  previewColor: PropTypes.string,
  disabled: PropTypes.bool,
  isPassive: PropTypes.bool,
  isToday: PropTypes.bool,
  isWeekend: PropTypes.bool,
  isStartOfWeek: PropTypes.bool,
  isEndOfWeek: PropTypes.bool,
  isStartOfMonth: PropTypes.bool,
  isEndOfMonth: PropTypes.bool,
  color: PropTypes.string,
  displayMode: PropTypes.oneOf(['dateRange', 'date']),
  styles: PropTypes.object,
  onMouseDown: PropTypes.func,
  onMouseUp: PropTypes.func,
  onMouseEnter: PropTypes.func,
  dayContentRenderer: PropTypes.func,
};

export default DayCell;
