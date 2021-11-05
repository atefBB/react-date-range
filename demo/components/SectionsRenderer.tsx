// @ts-expect-error ts-migrate(7016) FIXME: Could not find a declaration file for module 'reac... Remove this comment to see the full error message
import React from 'react';
// @ts-expect-error ts-migrate(7016) FIXME: Could not find a declaration file for module 'prop... Remove this comment to see the full error message
import PropTypes from 'prop-types';
// @ts-expect-error ts-migrate(2307) FIXME: Cannot find module 'rsg-components/Styled' or its ... Remove this comment to see the full error message
import Styled from 'rsg-components/Styled';
// @ts-expect-error ts-migrate(2307) FIXME: Cannot find module 'rsg-components/Heading' or its... Remove this comment to see the full error message
import Heading from 'rsg-components/Heading';
// Import default implementation from react-styleguidist using the full path
// @ts-expect-error ts-migrate(7016) FIXME: Could not find a declaration file for module 'reac... Remove this comment to see the full error message
import DefaultSectionsRenderer from 'react-styleguidist/lib/client/rsg-components/Sections/SectionsRenderer';

const styles = ({ fontFamily, space }: any) => ({
  headingSpacer: {
    marginBottom: space[2],
  },
  descriptionText: {
    marginTop: space[0],
    fontFamily: fontFamily.base,
  },
});

export function SectionsRenderer({ classes, children }: any) {
  return (
    // @ts-expect-error ts-migrate(7026) FIXME: JSX element implicitly has type 'any' because no i... Remove this comment to see the full error message
    <div>
      // @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is
      provided... Remove this comment to see the full error message
      <DefaultSectionsRenderer>{children}</DefaultSectionsRenderer>
      // @ts-expect-error ts-migrate(7026) FIXME: JSX element implicitly has type 'any' because no
      i... Remove this comment to see the full error message
    </div>
  );
}

SectionsRenderer.propTypes = {
  classes: PropTypes.object.isRequired,
  children: PropTypes.node,
};

export default Styled(styles)(SectionsRenderer);
