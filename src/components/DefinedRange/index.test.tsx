// @ts-expect-error ts-migrate(7016) FIXME: Could not find a declaration file for module 'reac... Remove this comment to see the full error message
import React from 'react';
// @ts-expect-error ts-migrate(7016) FIXME: Could not find a declaration file for module 'enzy... Remove this comment to see the full error message
import { mount, shallow } from 'enzyme';

// @ts-expect-error ts-migrate(6142) FIXME: Module '../DefinedRange' was resolved to '/mnt/e/p... Remove this comment to see the full error message
import DefinedRange from '../DefinedRange';
import { isSameDay } from 'date-fns';

// @ts-expect-error ts-migrate(2582) FIXME: Cannot find name 'describe'. Do you need to instal... Remove this comment to see the full error message
describe('DefinedRange tests', () => {
  // @ts-expect-error ts-migrate(2582) FIXME: Cannot find name 'test'. Do you need to install ty... Remove this comment to see the full error message
  test('Should call "renderStaticRangeLabel" callback correct amount of times according to the "hasCustomRendering" option', () => {
    // @ts-expect-error ts-migrate(2304) FIXME: Cannot find name 'jest'.
    const renderStaticRangeLabel = jest.fn();

    mount(
      // @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
      <DefinedRange
        staticRanges={[
          {
            label: 'Dynamic Label',
            range: {},
            isSelected(range: any) {
              // @ts-expect-error ts-migrate(2349) FIXME: This expression is not callable.
              const definedRange = this.range();
              return (
                isSameDay(range.startDate, definedRange.startDate) &&
                isSameDay(range.endDate, definedRange.endDate)
              );
            },
            hasCustomRendering: true,
          },
          {
            label: 'Static Label',
            range: {},
            isSelected(range: any) {
              // @ts-expect-error ts-migrate(2349) FIXME: This expression is not callable.
              const definedRange = this.range();
              return (
                isSameDay(range.startDate, definedRange.startDate) &&
                isSameDay(range.endDate, definedRange.endDate)
              );
            },
          },
          {
            label: 'Hede',
            range: {},
            isSelected(range: any) {
              // @ts-expect-error ts-migrate(2349) FIXME: This expression is not callable.
              const definedRange = this.range();
              return (
                isSameDay(range.startDate, definedRange.startDate) &&
                isSameDay(range.endDate, definedRange.endDate)
              );
            },
            hasCustomRendering: true,
          },
        ]}
        renderStaticRangeLabel={renderStaticRangeLabel}
      />
    );

    // @ts-expect-error ts-migrate(2304) FIXME: Cannot find name 'expect'.
    expect(renderStaticRangeLabel).toHaveBeenCalledTimes(2);
  });

  // @ts-expect-error ts-migrate(2582) FIXME: Cannot find name 'test'. Do you need to install ty... Remove this comment to see the full error message
  test('Should render dynamic static label contents correctly', () => {
    const renderItalicLabelContent = () => (
      // @ts-expect-error ts-migrate(7026) FIXME: JSX element implicitly has type 'any' because no i... Remove this comment to see the full error message
      <i className={'italic-label-content'}>{'Italic Content'}</i>
    );
    // @ts-expect-error ts-migrate(7026) FIXME: JSX element implicitly has type 'any' because no i... Remove this comment to see the full error message
    const renderBoldLabelContent = () => <b className={'bold-label-content'}>{'Bold Content'}</b>;
    // @ts-expect-error ts-migrate(7026) FIXME: JSX element implicitly has type 'any' because no i... Remove this comment to see the full error message
    const renderSomethingElse = () => <img className={'random-image'} />;

    const renderStaticRangeLabel = function(staticRange: any) {
      let result;

      if (staticRange.id === 'italic') {
        result = renderItalicLabelContent();
      } else if (staticRange.id === 'bold') {
        result = renderBoldLabelContent();
      } else {
        result = renderSomethingElse();
      }

      return result;
    };

    const wrapper = shallow(
      // @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
      <DefinedRange
        staticRanges={[
          {
            id: 'italic',
            range: {},
            isSelected(range: any) {
              // @ts-expect-error ts-migrate(2349) FIXME: This expression is not callable.
              const definedRange = this.range();
              return (
                isSameDay(range.startDate, definedRange.startDate) &&
                isSameDay(range.endDate, definedRange.endDate)
              );
            },
            hasCustomRendering: true,
          },
          {
            label: 'Static Label',
            range: {},
            isSelected(range: any) {
              // @ts-expect-error ts-migrate(2349) FIXME: This expression is not callable.
              const definedRange = this.range();
              return (
                isSameDay(range.startDate, definedRange.startDate) &&
                isSameDay(range.endDate, definedRange.endDate)
              );
            },
          },
          {
            id: 'whatever',
            range: {},
            isSelected(range: any) {
              // @ts-expect-error ts-migrate(2349) FIXME: This expression is not callable.
              const definedRange = this.range();
              return (
                isSameDay(range.startDate, definedRange.startDate) &&
                isSameDay(range.endDate, definedRange.endDate)
              );
            },
            hasCustomRendering: true,
          },
          {
            id: 'bold',
            range: {},
            isSelected(range: any) {
              // @ts-expect-error ts-migrate(2349) FIXME: This expression is not callable.
              const definedRange = this.range();
              return (
                isSameDay(range.startDate, definedRange.startDate) &&
                isSameDay(range.endDate, definedRange.endDate)
              );
            },
            hasCustomRendering: true,
          },
        ]}
        renderStaticRangeLabel={renderStaticRangeLabel}
      />
    );

    // @ts-expect-error ts-migrate(2304) FIXME: Cannot find name 'expect'.
    expect(wrapper).toMatchSnapshot();
  });
});
