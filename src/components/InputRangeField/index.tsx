// @ts-expect-error ts-migrate(7016) FIXME: Could not find a declaration file for module 'reac... Remove this comment to see the full error message
import React, { Component } from 'react';
// @ts-expect-error ts-migrate(7016) FIXME: Could not find a declaration file for module 'prop... Remove this comment to see the full error message
import PropTypes from 'prop-types';

const MIN = 0;
const MAX = 99999;

class InputRangeField extends Component {
  constructor(props: any, context: any) {
    super(props, context);
  }

  shouldComponentUpdate(nextProps: any) {
    // @ts-expect-error ts-migrate(2339) FIXME: Property 'props' does not exist on type 'InputRang... Remove this comment to see the full error message
    const { value, label, placeholder } = this.props;

    return (
      value !== nextProps.value ||
      label !== nextProps.label ||
      placeholder !== nextProps.placeholder
    );
  }

  onChange = (e: any) => {
    // @ts-expect-error ts-migrate(2339) FIXME: Property 'props' does not exist on type 'InputRang... Remove this comment to see the full error message
    const { onChange } = this.props;

    let value = parseInt(e.target.value, 10);
    value = isNaN(value) ? 0 : Math.max(Math.min(MAX, value), MIN);

    onChange(value);
  };

  render() {
    // @ts-expect-error ts-migrate(2339) FIXME: Property 'props' does not exist on type 'InputRang... Remove this comment to see the full error message
    const { label, placeholder, value, styles, onBlur, onFocus } = this.props;

    return (
      // @ts-expect-error ts-migrate(7026) FIXME: JSX element implicitly has type 'any' because no i... Remove this comment to see the full error message
      <div className={styles.inputRange}>
        // @ts-expect-error ts-migrate(7026) FIXME: JSX element implicitly has type 'any' because no
        i... Remove this comment to see the full error message
        <input
          className={styles.inputRangeInput}
          placeholder={placeholder}
          value={value}
          min={MIN}
          max={MAX}
          onChange={this.onChange}
          onFocus={onFocus}
          onBlur={onBlur}
        />
        // @ts-expect-error ts-migrate(7026) FIXME: JSX element implicitly has type 'any' because no
        i... Remove this comment to see the full error message
        <span className={styles.inputRangeLabel}>{label}</span>
        // @ts-expect-error ts-migrate(7026) FIXME: JSX element implicitly has type 'any' because no
        i... Remove this comment to see the full error message
      </div>
    );
  }
}

// @ts-expect-error ts-migrate(2339) FIXME: Property 'propTypes' does not exist on type 'typeo... Remove this comment to see the full error message
InputRangeField.propTypes = {
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  label: PropTypes.oneOfType([PropTypes.element, PropTypes.node]).isRequired,
  placeholder: PropTypes.string,
  styles: PropTypes.shape({
    inputRange: PropTypes.string,
    inputRangeInput: PropTypes.string,
    inputRangeLabel: PropTypes.string,
  }).isRequired,
  onBlur: PropTypes.func.isRequired,
  onFocus: PropTypes.func.isRequired,
  onChange: PropTypes.func.isRequired,
};

// @ts-expect-error ts-migrate(2339) FIXME: Property 'defaultProps' does not exist on type 'ty... Remove this comment to see the full error message
InputRangeField.defaultProps = {
  value: '',
  placeholder: '-',
};

export default InputRangeField;
