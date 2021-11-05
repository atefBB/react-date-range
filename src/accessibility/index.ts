// @ts-expect-error ts-migrate(7016) FIXME: Could not find a declaration file for module 'prop... Remove this comment to see the full error message
import PropTypes from 'prop-types';

export const ariaLabelsShape = PropTypes.shape({
  dateInput: PropTypes.objectOf(
    PropTypes.shape({ startDate: PropTypes.string, endDate: PropTypes.string })
  ),
  monthPicker: PropTypes.string,
  yearPicker: PropTypes.string,
  prevButton: PropTypes.string,
  nextButton: PropTypes.string,
});
