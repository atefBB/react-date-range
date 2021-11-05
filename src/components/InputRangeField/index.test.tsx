// @ts-expect-error ts-migrate(7016) FIXME: Could not find a declaration file for module 'reac... Remove this comment to see the full error message
import React from 'react';
// @ts-expect-error ts-migrate(7016) FIXME: Could not find a declaration file for module 'enzy... Remove this comment to see the full error message
import { mount } from 'enzyme';

// @ts-expect-error ts-migrate(6142) FIXME: Module '../InputRangeField' was resolved to '/mnt/... Remove this comment to see the full error message
import InputRangeField from '../InputRangeField';

const styles = {
  inputRange: 'range',
  inputRangeInput: 'input',
  inputRangeLabel: 'label',
};
const toChangeEvent = (value: any) => ({
  target: { value },
});

// @ts-expect-error ts-migrate(2582) FIXME: Cannot find name 'describe'. Do you need to instal... Remove this comment to see the full error message
describe('InputRangeField tests', () => {
  // @ts-expect-error ts-migrate(2582) FIXME: Cannot find name 'test'. Do you need to install ty... Remove this comment to see the full error message
  test('Should parse input value to number', () => {
    // @ts-expect-error ts-migrate(2304) FIXME: Cannot find name 'jest'.
    const onChange = jest.fn();
    const wrapper = mount(
      // @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
      <InputRangeField
        label="Input label"
        styles={styles}
        onChange={onChange}
        // @ts-expect-error ts-migrate(2304) FIXME: Cannot find name 'jest'.
        onFocus={jest.fn()}
        // @ts-expect-error ts-migrate(2304) FIXME: Cannot find name 'jest'.
        onBlur={jest.fn()}
      />
    );

    wrapper.find('input').simulate('change', toChangeEvent('3'));
    // @ts-expect-error ts-migrate(2304) FIXME: Cannot find name 'expect'.
    expect(onChange).lastCalledWith(3);
    wrapper.find('input').simulate('change', toChangeEvent(12));
    // @ts-expect-error ts-migrate(2304) FIXME: Cannot find name 'expect'.
    expect(onChange).lastCalledWith(12);
    wrapper.find('input').simulate('change', toChangeEvent(''));
    // @ts-expect-error ts-migrate(2304) FIXME: Cannot find name 'expect'.
    expect(onChange).lastCalledWith(0);
    wrapper.find('input').simulate('change', toChangeEvent('invalid number'));
    // @ts-expect-error ts-migrate(2304) FIXME: Cannot find name 'expect'.
    expect(onChange).lastCalledWith(0);
    wrapper.find('input').simulate('change', toChangeEvent(-12));
    // @ts-expect-error ts-migrate(2304) FIXME: Cannot find name 'expect'.
    expect(onChange).lastCalledWith(0);
    wrapper.find('input').simulate('change', toChangeEvent(99999999));
    // @ts-expect-error ts-migrate(2304) FIXME: Cannot find name 'expect'.
    expect(onChange).lastCalledWith(99999);

    // @ts-expect-error ts-migrate(2304) FIXME: Cannot find name 'expect'.
    expect(onChange).toHaveBeenCalledTimes(6);
    // @ts-expect-error ts-migrate(2304) FIXME: Cannot find name 'expect'.
    expect(wrapper).toMatchSnapshot();
  });

  // @ts-expect-error ts-migrate(2582) FIXME: Cannot find name 'test'. Do you need to install ty... Remove this comment to see the full error message
  test('Should rerender when props change', () => {
    const wrapper = mount(
      // @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
      <InputRangeField
        value={12}
        placeholder="Placeholder"
        label="Input label"
        styles={styles}
        // @ts-expect-error ts-migrate(2304) FIXME: Cannot find name 'jest'.
        onChange={jest.fn()}
        // @ts-expect-error ts-migrate(2304) FIXME: Cannot find name 'jest'.
        onFocus={jest.fn()}
        // @ts-expect-error ts-migrate(2304) FIXME: Cannot find name 'jest'.
        onBlur={jest.fn()}
      />
    );

    // @ts-expect-error ts-migrate(2304) FIXME: Cannot find name 'expect'.
    expect(wrapper.find(`.${styles.inputRangeInput}`).prop('value')).toEqual(12);
    // @ts-expect-error ts-migrate(2304) FIXME: Cannot find name 'expect'.
    expect(wrapper.find(`.${styles.inputRangeInput}`).prop('placeholder')).toEqual('Placeholder');
    // @ts-expect-error ts-migrate(2304) FIXME: Cannot find name 'expect'.
    expect(wrapper.find(`.${styles.inputRangeLabel}`).text()).toEqual('Input label');

    wrapper.setProps({ value: '32' });
    // @ts-expect-error ts-migrate(2304) FIXME: Cannot find name 'expect'.
    expect(wrapper.find(`.${styles.inputRangeInput}`).prop('value')).toEqual('32');
    // @ts-expect-error ts-migrate(2304) FIXME: Cannot find name 'expect'.
    expect(wrapper.find(`.${styles.inputRangeInput}`).prop('placeholder')).toEqual('Placeholder');
    // @ts-expect-error ts-migrate(2304) FIXME: Cannot find name 'expect'.
    expect(wrapper.find(`.${styles.inputRangeLabel}`).text()).toEqual('Input label');

    wrapper.setProps({ placeholder: '-' });
    // @ts-expect-error ts-migrate(2304) FIXME: Cannot find name 'expect'.
    expect(wrapper.find(`.${styles.inputRangeInput}`).prop('value')).toEqual('32');
    // @ts-expect-error ts-migrate(2304) FIXME: Cannot find name 'expect'.
    expect(wrapper.find(`.${styles.inputRangeInput}`).prop('placeholder')).toEqual('-');
    // @ts-expect-error ts-migrate(2304) FIXME: Cannot find name 'expect'.
    expect(wrapper.find(`.${styles.inputRangeLabel}`).text()).toEqual('Input label');

    wrapper.setProps({ label: 'Label' });
    // @ts-expect-error ts-migrate(2304) FIXME: Cannot find name 'expect'.
    expect(wrapper.find(`.${styles.inputRangeInput}`).prop('value')).toEqual('32');
    // @ts-expect-error ts-migrate(2304) FIXME: Cannot find name 'expect'.
    expect(wrapper.find(`.${styles.inputRangeInput}`).prop('placeholder')).toEqual('-');
    // @ts-expect-error ts-migrate(2304) FIXME: Cannot find name 'expect'.
    expect(wrapper.find(`.${styles.inputRangeLabel}`).text()).toEqual('Label');
  });

  // @ts-expect-error ts-migrate(2582) FIXME: Cannot find name 'test'. Do you need to install ty... Remove this comment to see the full error message
  test('Should render the label as a Component', () => {
    // @ts-expect-error ts-migrate(7026) FIXME: JSX element implicitly has type 'any' because no i... Remove this comment to see the full error message
    const Label = () => <span className="input-range-field-label">Input label</span>;
    const wrapper = mount(
      // @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
      <InputRangeField
        value={12}
        placeholder="Placeholder"
        // @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
        label={<Label />}
        styles={styles}
        // @ts-expect-error ts-migrate(2304) FIXME: Cannot find name 'jest'.
        onChange={jest.fn()}
        // @ts-expect-error ts-migrate(2304) FIXME: Cannot find name 'jest'.
        onFocus={jest.fn()}
        // @ts-expect-error ts-migrate(2304) FIXME: Cannot find name 'jest'.
        onBlur={jest.fn()}
      />
    );

    // @ts-expect-error ts-migrate(2304) FIXME: Cannot find name 'expect'.
    expect(wrapper.find(`.${styles.inputRangeInput}`).prop('value')).toEqual(12);
    // @ts-expect-error ts-migrate(2304) FIXME: Cannot find name 'expect'.
    expect(wrapper.find(`.${styles.inputRangeInput}`).prop('placeholder')).toEqual('Placeholder');
    // @ts-expect-error ts-migrate(2304) FIXME: Cannot find name 'expect'.
    expect(wrapper.find(`.${styles.inputRangeLabel}`).text()).toEqual('Input label');
    // @ts-expect-error ts-migrate(2304) FIXME: Cannot find name 'expect'.
    expect(wrapper.find(`.${styles.inputRangeLabel}`).text()).toEqual('Input label');
    // @ts-expect-error ts-migrate(2304) FIXME: Cannot find name 'expect'.
    expect(wrapper.find(`.input-range-field-label`).text()).toEqual('Input label');

    wrapper.setProps({ value: '32' });
    // @ts-expect-error ts-migrate(2304) FIXME: Cannot find name 'expect'.
    expect(wrapper.find(`.${styles.inputRangeInput}`).prop('value')).toEqual('32');
    // @ts-expect-error ts-migrate(2304) FIXME: Cannot find name 'expect'.
    expect(wrapper.find(`.${styles.inputRangeInput}`).prop('placeholder')).toEqual('Placeholder');
    // @ts-expect-error ts-migrate(2304) FIXME: Cannot find name 'expect'.
    expect(wrapper.find(`.${styles.inputRangeLabel}`).text()).toEqual('Input label');

    wrapper.setProps({ placeholder: '-' });
    // @ts-expect-error ts-migrate(2304) FIXME: Cannot find name 'expect'.
    expect(wrapper.find(`.${styles.inputRangeInput}`).prop('value')).toEqual('32');
    // @ts-expect-error ts-migrate(2304) FIXME: Cannot find name 'expect'.
    expect(wrapper.find(`.${styles.inputRangeInput}`).prop('placeholder')).toEqual('-');
    // @ts-expect-error ts-migrate(2304) FIXME: Cannot find name 'expect'.
    expect(wrapper.find(`.${styles.inputRangeLabel}`).text()).toEqual('Input label');

    wrapper.setProps({ label: 'Label' });
    // @ts-expect-error ts-migrate(2304) FIXME: Cannot find name 'expect'.
    expect(wrapper.find(`.${styles.inputRangeInput}`).prop('value')).toEqual('32');
    // @ts-expect-error ts-migrate(2304) FIXME: Cannot find name 'expect'.
    expect(wrapper.find(`.${styles.inputRangeInput}`).prop('placeholder')).toEqual('-');
    // @ts-expect-error ts-migrate(2304) FIXME: Cannot find name 'expect'.
    expect(wrapper.find(`.${styles.inputRangeLabel}`).text()).toEqual('Label');
  });
});
