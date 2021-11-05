// @ts-expect-error ts-migrate(6142) FIXME: Module '../Calendar' was resolved to '/mnt/e/proje... Remove this comment to see the full error message
import Calendar from '../Calendar';

// @ts-expect-error ts-migrate(2582) FIXME: Cannot find name 'describe'. Do you need to instal... Remove this comment to see the full error message
describe('Calendar', () => {
  // @ts-expect-error ts-migrate(2582) FIXME: Cannot find name 'test'. Do you need to install ty... Remove this comment to see the full error message
  test('Should resolve', () => {
    // @ts-expect-error ts-migrate(2304) FIXME: Cannot find name 'expect'.
    expect(Calendar).toEqual(expect.anything());
  });
});
