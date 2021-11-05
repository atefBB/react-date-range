// @ts-expect-error ts-migrate(7016) FIXME: Could not find a declaration file for module 'reac... Remove this comment to see the full error message
import React from 'react';
// @ts-expect-error ts-migrate(7016) FIXME: Could not find a declaration file for module 'prop... Remove this comment to see the full error message
import PropTypes from 'prop-types';
// @ts-expect-error ts-migrate(2307) FIXME: Cannot find module 'rsg-components/Styled' or its ... Remove this comment to see the full error message
import Styled from 'rsg-components/Styled';
// @ts-expect-error ts-migrate(2307) FIXME: Cannot find module './logo.svg' or its correspondi... Remove this comment to see the full error message
import logo from './logo.svg';

const styles = ({ fontFamily, color }: any) => ({
  logo: {
    display: 'flex',
    alignItems: 'center',
    margin: 0,
    fontFamily: fontFamily.base,
    fontSize: 18,
    fontWeight: 'normal',
    color: color.baseBackground,
  },
  image: {
    width: '2.5em',
    marginLeft: '-0.5em',
  },
});

export function LogoRenderer({ classes, children }: any) {
  return (
    // @ts-expect-error ts-migrate(7026) FIXME: JSX element implicitly has type 'any' because no i... Remove this comment to see the full error message
    <h1 className={classes.logo}>
      // @ts-expect-error ts-migrate(7026) FIXME: JSX element implicitly has type 'any' because no
      i... Remove this comment to see the full error message
      <img className={classes.image} src={logo} />
      {children}
      // @ts-expect-error ts-migrate(7026) FIXME: JSX element implicitly has type 'any' because no
      i... Remove this comment to see the full error message
    </h1>
  );
}

LogoRenderer.propTypes = {
  classes: PropTypes.object.isRequired,
  children: PropTypes.node,
};

export default Styled(styles)(LogoRenderer);
