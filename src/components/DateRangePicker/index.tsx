// @ts-expect-error ts-migrate(7016) FIXME: Could not find a declaration file for module 'reac... Remove this comment to see the full error message
import React, { Component } from 'react';
// @ts-expect-error ts-migrate(7016) FIXME: Could not find a declaration file for module 'prop... Remove this comment to see the full error message
import PropTypes from 'prop-types';
// @ts-expect-error ts-migrate(6142) FIXME: Module '../DateRange' was resolved to '/mnt/e/proj... Remove this comment to see the full error message
import DateRange from '../DateRange';
// @ts-expect-error ts-migrate(6142) FIXME: Module '../DefinedRange' was resolved to '/mnt/e/p... Remove this comment to see the full error message
import DefinedRange from '../DefinedRange';
import { findNextRangeIndex, generateStyles } from '../../utils';
import classnames from 'classnames';
import coreStyles from '../../styles';

class DateRangePicker extends Component {
  constructor(props: any) {
    super(props);
    // @ts-expect-error ts-migrate(2339) FIXME: Property 'state' does not exist on type 'DateRange... Remove this comment to see the full error message
    this.state = {
      focusedRange: [findNextRangeIndex(props.ranges), 0],
    };
    // @ts-expect-error ts-migrate(2339) FIXME: Property 'styles' does not exist on type 'DateRang... Remove this comment to see the full error message
    this.styles = generateStyles([coreStyles, props.classNames]);
  }
  render() {
    // @ts-expect-error ts-migrate(2339) FIXME: Property 'state' does not exist on type 'DateRange... Remove this comment to see the full error message
    const { focusedRange } = this.state;
    return (
      // @ts-expect-error ts-migrate(7026) FIXME: JSX element implicitly has type 'any' because no i... Remove this comment to see the full error message
      <div className={classnames(this.styles.dateRangePickerWrapper, this.props.className)}>
        // @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is
        provided... Remove this comment to see the full error message
        <DefinedRange
          focusedRange={focusedRange}
          onPreviewChange={(value: any) =>
            // @ts-expect-error ts-migrate(2339) FIXME: Property 'dateRange' does not exist on type 'DateR... Remove this comment to see the full error message
            this.dateRange.updatePreview(
              // @ts-expect-error ts-migrate(2339) FIXME: Property 'dateRange' does not exist on type 'DateR... Remove this comment to see the full error message
              value ? this.dateRange.calcNewSelection(value, typeof value === 'string') : null
            )
          }
          // @ts-expect-error ts-migrate(2339) FIXME: Property 'props' does not exist on type 'DateRange... Remove this comment to see the full error message
          {...this.props}
          // @ts-expect-error ts-migrate(2339) FIXME: Property 'props' does not exist on type 'DateRange... Remove this comment to see the full error message
          range={this.props.ranges[focusedRange[0]]}
          className={undefined}
        />
        // @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is
        provided... Remove this comment to see the full error message
        <DateRange
          // @ts-expect-error ts-migrate(2339) FIXME: Property 'setState' does not exist on type 'DateRa... Remove this comment to see the full error message
          onRangeFocusChange={(focusedRange: any) => this.setState({ focusedRange })}
          focusedRange={focusedRange}
          // @ts-expect-error ts-migrate(2339) FIXME: Property 'props' does not exist on type 'DateRange... Remove this comment to see the full error message
          {...this.props}
          // @ts-expect-error ts-migrate(2339) FIXME: Property 'dateRange' does not exist on type 'DateR... Remove this comment to see the full error message
          ref={(t: any) => (this.dateRange = t)}
          className={undefined}
        />
        // @ts-expect-error ts-migrate(7026) FIXME: JSX element implicitly has type 'any' because no
        i... Remove this comment to see the full error message
      </div>
    );
  }
}

// @ts-expect-error ts-migrate(2339) FIXME: Property 'defaultProps' does not exist on type 'ty... Remove this comment to see the full error message
DateRangePicker.defaultProps = {};

// @ts-expect-error ts-migrate(2339) FIXME: Property 'propTypes' does not exist on type 'typeo... Remove this comment to see the full error message
DateRangePicker.propTypes = {
  ...DateRange.propTypes,
  ...DefinedRange.propTypes,
  className: PropTypes.string,
};

export default DateRangePicker;
