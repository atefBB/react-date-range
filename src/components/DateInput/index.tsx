// @ts-expect-error ts-migrate(7016) FIXME: Could not find a declaration file for module 'reac... Remove this comment to see the full error message
import React, { PureComponent } from 'react';
// @ts-expect-error ts-migrate(7016) FIXME: Could not find a declaration file for module 'prop... Remove this comment to see the full error message
import PropTypes from 'prop-types';
import classnames from 'classnames';
import { format, parse, isValid, isEqual } from 'date-fns';

class DateInput extends PureComponent {
  constructor(props: any, context: any) {
    super(props, context);

    // @ts-expect-error ts-migrate(2339) FIXME: Property 'state' does not exist on type 'DateInput... Remove this comment to see the full error message
    this.state = {
      invalid: false,
      changed: false,
      value: this.formatDate(props),
    };
  }

  componentDidUpdate(prevProps: any) {
    const { value } = prevProps;

    // @ts-expect-error ts-migrate(2339) FIXME: Property 'props' does not exist on type 'DateInput... Remove this comment to see the full error message
    if (!isEqual(value, this.props.value)) {
      // @ts-expect-error ts-migrate(2339) FIXME: Property 'setState' does not exist on type 'DateIn... Remove this comment to see the full error message
      this.setState({ value: this.formatDate(this.props) });
    }
  }

  formatDate({ value, dateDisplayFormat, dateOptions }: any) {
    if (value && isValid(value)) {
      return format(value, dateDisplayFormat, dateOptions);
    }
    return '';
  }

  update(value: any) {
    // @ts-expect-error ts-migrate(2339) FIXME: Property 'state' does not exist on type 'DateInput... Remove this comment to see the full error message
    const { invalid, changed } = this.state;

    if (invalid || !changed || !value) {
      return;
    }

    // @ts-expect-error ts-migrate(2339) FIXME: Property 'props' does not exist on type 'DateInput... Remove this comment to see the full error message
    const { onChange, dateDisplayFormat, dateOptions } = this.props;
    const parsed = parse(value, dateDisplayFormat, new Date(), dateOptions);

    if (isValid(parsed)) {
      // @ts-expect-error ts-migrate(2339) FIXME: Property 'setState' does not exist on type 'DateIn... Remove this comment to see the full error message
      this.setState({ changed: false }, () => onChange(parsed));
    } else {
      // @ts-expect-error ts-migrate(2339) FIXME: Property 'setState' does not exist on type 'DateIn... Remove this comment to see the full error message
      this.setState({ invalid: true });
    }
  }

  onKeyDown = (e: any) => {
    // @ts-expect-error ts-migrate(2339) FIXME: Property 'state' does not exist on type 'DateInput... Remove this comment to see the full error message
    const { value } = this.state;

    if (e.key === 'Enter') {
      this.update(value);
    }
  };

  onChange = (e: any) => {
    // @ts-expect-error ts-migrate(2339) FIXME: Property 'setState' does not exist on type 'DateIn... Remove this comment to see the full error message
    this.setState({ value: e.target.value, changed: true, invalid: false });
  };

  onBlur = () => {
    // @ts-expect-error ts-migrate(2339) FIXME: Property 'state' does not exist on type 'DateInput... Remove this comment to see the full error message
    const { value } = this.state;
    this.update(value);
  };

  render() {
    // @ts-expect-error ts-migrate(2339) FIXME: Property 'props' does not exist on type 'DateInput... Remove this comment to see the full error message
    const { className, readOnly, placeholder, ariaLabel, disabled, onFocus } = this.props;
    // @ts-expect-error ts-migrate(2339) FIXME: Property 'state' does not exist on type 'DateInput... Remove this comment to see the full error message
    const { value, invalid } = this.state;

    return (
      // @ts-expect-error ts-migrate(7026) FIXME: JSX element implicitly has type 'any' because no i... Remove this comment to see the full error message
      <span className={classnames('rdrDateInput', className)}>
        // @ts-expect-error ts-migrate(7026) FIXME: JSX element implicitly has type 'any' because no
        i... Remove this comment to see the full error message
        <input
          readOnly={readOnly}
          disabled={disabled}
          value={value}
          placeholder={placeholder}
          aria-label={ariaLabel}
          onKeyDown={this.onKeyDown}
          onChange={this.onChange}
          onBlur={this.onBlur}
          onFocus={onFocus}
        />
        // @ts-expect-error ts-migrate(7026) FIXME: JSX element implicitly has type 'any' because no
        i... Remove this comment to see the full error message
        {invalid && <span className="rdrWarning">&#9888;</span>}
        // @ts-expect-error ts-migrate(7026) FIXME: JSX element implicitly has type 'any' because no
        i... Remove this comment to see the full error message
      </span>
    );
  }
}

// @ts-expect-error ts-migrate(2339) FIXME: Property 'propTypes' does not exist on type 'typeo... Remove this comment to see the full error message
DateInput.propTypes = {
  value: PropTypes.object,
  placeholder: PropTypes.string,
  disabled: PropTypes.bool,
  readOnly: PropTypes.bool,
  dateOptions: PropTypes.object,
  dateDisplayFormat: PropTypes.string,
  ariaLabel: PropTypes.string,
  className: PropTypes.string,
  onFocus: PropTypes.func.isRequired,
  onChange: PropTypes.func.isRequired,
};

// @ts-expect-error ts-migrate(2339) FIXME: Property 'defaultProps' does not exist on type 'ty... Remove this comment to see the full error message
DateInput.defaultProps = {
  readOnly: true,
  disabled: false,
  dateDisplayFormat: 'MMM D, YYYY',
};

export default DateInput;
