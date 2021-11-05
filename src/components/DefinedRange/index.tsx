// @ts-expect-error ts-migrate(7016) FIXME: Could not find a declaration file for module 'reac... Remove this comment to see the full error message
import React, { Component } from 'react';
// @ts-expect-error ts-migrate(7016) FIXME: Could not find a declaration file for module 'prop... Remove this comment to see the full error message
import PropTypes from 'prop-types';
import styles from '../../styles';
import { defaultInputRanges, defaultStaticRanges } from '../../defaultRanges';
// @ts-expect-error ts-migrate(6142) FIXME: Module '../DayCell' was resolved to '/mnt/e/projec... Remove this comment to see the full error message
import { rangeShape } from '../DayCell';
// @ts-expect-error ts-migrate(6142) FIXME: Module '../InputRangeField' was resolved to '/mnt/... Remove this comment to see the full error message
import InputRangeField from '../InputRangeField';
import cx from 'classnames';

class DefinedRange extends Component {
  constructor(props: any) {
    super(props);
    // @ts-expect-error ts-migrate(2339) FIXME: Property 'state' does not exist on type 'DefinedRa... Remove this comment to see the full error message
    this.state = {
      rangeOffset: 0,
      focusedInput: -1,
    };
  }

  handleRangeChange = (range: any) => {
    // @ts-expect-error ts-migrate(2339) FIXME: Property 'props' does not exist on type 'DefinedRa... Remove this comment to see the full error message
    const { onChange, ranges, focusedRange } = this.props;
    let selectedRange = ranges[focusedRange[0]];
    selectedRange = {
      ...selectedRange,
      ...{ label: range.label },
    };

    if (!onChange || !selectedRange) return;
    onChange({
      [selectedRange.key || `range${focusedRange[0] + 1}`]: { ...selectedRange, ...range },
    });
  };

  getRangeOptionValue(option: any) {
    // @ts-expect-error ts-migrate(2339) FIXME: Property 'props' does not exist on type 'DefinedRa... Remove this comment to see the full error message
    const { ranges = [], focusedRange = [] } = this.props;

    if (typeof option.getCurrentValue !== 'function') {
      return '';
    }

    const selectedRange = ranges[focusedRange[0]] || {};
    return option.getCurrentValue(selectedRange) || '';
  }

  getSelectedRange(ranges: any, staticRange: any) {
    const focusedRangeIndex = ranges.findIndex((range: any) => {
      if (!range.startDate || !range.endDate || range.disabled) return false;
      return staticRange.isSelected(range);
    });
    const selectedRange = ranges[focusedRangeIndex];
    return { selectedRange, focusedRangeIndex };
  }

  render() {
    const {
      headerContent,
      footerContent,
      onPreviewChange,
      inputRanges,
      staticRanges,
      ranges,
      renderStaticRangeLabel,
      rangeColors,
      className,
      // @ts-expect-error ts-migrate(2339) FIXME: Property 'props' does not exist on type 'DefinedRa... Remove this comment to see the full error message
    } = this.props;

    return (
      // @ts-expect-error ts-migrate(7026) FIXME: JSX element implicitly has type 'any' because no i... Remove this comment to see the full error message
      <div className={cx(styles.definedRangesWrapper, className)}>
        {headerContent}
        // @ts-expect-error ts-migrate(7026) FIXME: JSX element implicitly has type 'any' because no
        i... Remove this comment to see the full error message
        <div className={styles.staticRanges}>
          {staticRanges.map((staticRange: any, i: any) => {
            const { selectedRange, focusedRangeIndex } = this.getSelectedRange(ranges, staticRange);
            let labelContent;

            if (staticRange.hasCustomRendering) {
              labelContent = renderStaticRangeLabel(staticRange);
            } else {
              labelContent = staticRange.label;
            }

            return (
              // @ts-expect-error ts-migrate(7026) FIXME: JSX element implicitly has type 'any' because no i... Remove this comment to see the full error message
              <button
                type="button"
                className={cx(styles.staticRange, {
                  [styles.staticRangeSelected]: Boolean(selectedRange),
                })}
                style={{
                  color: selectedRange
                    ? selectedRange.color || rangeColors[focusedRangeIndex]
                    : null,
                }}
                key={i}
                onClick={() => {
                  let rangeWithLabel = {
                    // @ts-expect-error ts-migrate(2339) FIXME: Property 'props' does not exist on type 'DefinedRa... Remove this comment to see the full error message
                    ...staticRange.range(this.props),
                    ...{ label: staticRange.label },
                  };
                  this.handleRangeChange(rangeWithLabel);
                }}
                // @ts-expect-error ts-migrate(2339) FIXME: Property 'props' does not exist on type 'DefinedRa... Remove this comment to see the full error message
                onFocus={() => onPreviewChange && onPreviewChange(staticRange.range(this.props))}
                onMouseOver={() =>
                  // @ts-expect-error ts-migrate(2339) FIXME: Property 'props' does not exist on type 'DefinedRa... Remove this comment to see the full error message
                  onPreviewChange && onPreviewChange(staticRange.range(this.props))
                }
                onMouseLeave={() => {
                  onPreviewChange && onPreviewChange();
                }}>
                // @ts-expect-error ts-migrate(7026) FIXME: JSX element implicitly has type 'any'
                because no i... Remove this comment to see the full error message
                <span tabIndex={-1} className={styles.staticRangeLabel}>
                  {labelContent}
                  // @ts-expect-error ts-migrate(7026) FIXME: JSX element implicitly has type 'any'
                  because no i... Remove this comment to see the full error message
                </span>
                // @ts-expect-error ts-migrate(7026) FIXME: JSX element implicitly has type 'any'
                because no i... Remove this comment to see the full error message
              </button>
            );
          })}
          // @ts-expect-error ts-migrate(7026) FIXME: JSX element implicitly has type 'any' because
          no i... Remove this comment to see the full error message
        </div>
        // @ts-expect-error ts-migrate(7026) FIXME: JSX element implicitly has type 'any' because no
        i... Remove this comment to see the full error message
        <div className={styles.inputRanges}>
          {inputRanges.map((rangeOption: any, i: any) => (
            // @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
            <InputRangeField
              key={i}
              styles={styles}
              label={rangeOption.label}
              // @ts-expect-error ts-migrate(2339) FIXME: Property 'setState' does not exist on type 'Define... Remove this comment to see the full error message
              onFocus={() => this.setState({ focusedInput: i, rangeOffset: 0 })}
              // @ts-expect-error ts-migrate(2339) FIXME: Property 'setState' does not exist on type 'Define... Remove this comment to see the full error message
              onBlur={() => this.setState({ rangeOffset: 0 })}
              onChange={(value: any) =>
                // @ts-expect-error ts-migrate(2339) FIXME: Property 'props' does not exist on type 'DefinedRa... Remove this comment to see the full error message
                this.handleRangeChange(rangeOption.range(value, this.props))
              }
              value={this.getRangeOptionValue(rangeOption)}
            />
          ))}
          // @ts-expect-error ts-migrate(7026) FIXME: JSX element implicitly has type 'any' because
          no i... Remove this comment to see the full error message
        </div>
        {footerContent}
        // @ts-expect-error ts-migrate(7026) FIXME: JSX element implicitly has type 'any' because no
        i... Remove this comment to see the full error message
      </div>
    );
  }
}

// @ts-expect-error ts-migrate(2339) FIXME: Property 'propTypes' does not exist on type 'typeo... Remove this comment to see the full error message
DefinedRange.propTypes = {
  inputRanges: PropTypes.array,
  staticRanges: PropTypes.array,
  ranges: PropTypes.arrayOf(rangeShape),
  focusedRange: PropTypes.arrayOf(PropTypes.number),
  onPreviewChange: PropTypes.func,
  onChange: PropTypes.func,
  footerContent: PropTypes.any,
  headerContent: PropTypes.any,
  rangeColors: PropTypes.arrayOf(PropTypes.string),
  className: PropTypes.string,
  renderStaticRangeLabel: PropTypes.func,
};

// @ts-expect-error ts-migrate(2339) FIXME: Property 'defaultProps' does not exist on type 'ty... Remove this comment to see the full error message
DefinedRange.defaultProps = {
  inputRanges: defaultInputRanges,
  staticRanges: defaultStaticRanges,
  ranges: [],
  rangeColors: ['#3d91ff', '#3ecf8e', '#fed14c'],
  focusedRange: [0, 0],
};

export default DefinedRange;
