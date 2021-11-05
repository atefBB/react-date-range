// @ts-expect-error ts-migrate(7016) FIXME: Could not find a declaration file for module 'reac... Remove this comment to see the full error message
import React from 'react';
import { subDays, addDays, isSameDay } from 'date-fns';
// @ts-expect-error ts-migrate(6142) FIXME: Module '../DateRange' was resolved to '/mnt/e/proj... Remove this comment to see the full error message
import DateRange from '../DateRange';
// @ts-expect-error ts-migrate(7016) FIXME: Could not find a declaration file for module 'reac... Remove this comment to see the full error message
import renderer from 'react-test-renderer';

let testRenderer: any = null;
let instance: any = null;
const endDate = new Date();
const startDate = subDays(endDate, 7);

const commonProps = {
  ranges: [{ startDate, endDate, key: 'selection' }],
  onChange: () => {},
  moveRangeOnFirstSelection: false,
};

const compareRanges = (newRange: any, assertionRange: any) => {
  ['startDate', 'endDate'].forEach(key => {
    if (!newRange[key] || !assertionRange[key]) {
      // @ts-expect-error ts-migrate(2304) FIXME: Cannot find name 'expect'.
      return expect(newRange[key]).toEqual(assertionRange[key]);
    }
    // @ts-expect-error ts-migrate(2304) FIXME: Cannot find name 'expect'.
    return expect(isSameDay(newRange[key], assertionRange[key])).toEqual(true);
  });
};

// @ts-expect-error ts-migrate(2304) FIXME: Cannot find name 'beforeEach'.
beforeEach(() => {
  // @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
  testRenderer = renderer.create(<DateRange {...commonProps} />);
  instance = testRenderer.getInstance();
});

// @ts-expect-error ts-migrate(2582) FIXME: Cannot find name 'describe'. Do you need to instal... Remove this comment to see the full error message
describe('DateRange', () => {
  // @ts-expect-error ts-migrate(2582) FIXME: Cannot find name 'test'. Do you need to install ty... Remove this comment to see the full error message
  test('Should resolve', () => {
    // @ts-expect-error ts-migrate(2304) FIXME: Cannot find name 'expect'.
    expect(DateRange).toEqual(expect.anything());
  });

  // @ts-expect-error ts-migrate(2582) FIXME: Cannot find name 'test'. Do you need to install ty... Remove this comment to see the full error message
  test('calculate new selection by resetting end date', () => {
    const methodResult = instance.calcNewSelection(subDays(endDate, 10), true);
    compareRanges(methodResult.range, {
      startDate: subDays(endDate, 10),
      endDate: subDays(endDate, 10),
    });
  });

  // @ts-expect-error ts-migrate(2582) FIXME: Cannot find name 'test'. Do you need to install ty... Remove this comment to see the full error message
  test('calculate new selection by resetting end date if start date is not before', () => {
    const methodResult = instance.calcNewSelection(addDays(endDate, 2), true);
    compareRanges(methodResult.range, {
      startDate: addDays(endDate, 2),
      endDate: addDays(endDate, 2),
    });
  });

  // @ts-expect-error ts-migrate(2582) FIXME: Cannot find name 'test'. Do you need to install ty... Remove this comment to see the full error message
  test('calculate new selection based on moveRangeOnFirstSelection prop', () => {
    // @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
    testRenderer.update(<DateRange {...commonProps} moveRangeOnFirstSelection />);
    const methodResult = instance.calcNewSelection(subDays(endDate, 10), true);
    compareRanges(methodResult.range, {
      startDate: subDays(endDate, 10),
      endDate: subDays(endDate, 3),
    });
  });

  // @ts-expect-error ts-migrate(2582) FIXME: Cannot find name 'test'. Do you need to install ty... Remove this comment to see the full error message
  test('calculate new selection by retaining end date, based on retainEndDateOnFirstSelection prop', () => {
    // @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
    testRenderer.update(<DateRange {...commonProps} retainEndDateOnFirstSelection />);
    const methodResult = instance.calcNewSelection(subDays(endDate, 10), true);
    compareRanges(methodResult.range, {
      startDate: subDays(endDate, 10),
      endDate,
    });
  });

  // @ts-expect-error ts-migrate(2582) FIXME: Cannot find name 'test'. Do you need to install ty... Remove this comment to see the full error message
  test('calculate new selection by retaining the unset end date, based on retainEndDateOnFirstSelection prop', () => {
    testRenderer.update(
      // @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
      <DateRange
        {...commonProps}
        ranges={[{ ...commonProps.ranges[0], endDate: null }]}
        retainEndDateOnFirstSelection
      />
    );
    const methodResult = instance.calcNewSelection(subDays(endDate, 10), true);
    compareRanges(methodResult.range, {
      startDate: subDays(endDate, 10),
      endDate: null,
    });
  });
});
