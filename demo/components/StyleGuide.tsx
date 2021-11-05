// @ts-expect-error ts-migrate(7016) FIXME: Could not find a declaration file for module 'reac... Remove this comment to see the full error message
import React from 'react';
// @ts-expect-error ts-migrate(7016) FIXME: Could not find a declaration file for module 'prop... Remove this comment to see the full error message
import PropTypes from 'prop-types';
// @ts-expect-error ts-migrate(2307) FIXME: Cannot find module 'rsg-components/Logo' or its co... Remove this comment to see the full error message
import Logo from 'rsg-components/Logo';
// @ts-expect-error ts-migrate(2307) FIXME: Cannot find module 'rsg-components/Markdown' or it... Remove this comment to see the full error message
import Markdown from 'rsg-components/Markdown';
// @ts-expect-error ts-migrate(2307) FIXME: Cannot find module 'rsg-components/Styled' or its ... Remove this comment to see the full error message
import Styled from 'rsg-components/Styled';

const xsmall = '@media (max-width: 600px)';

const styles = ({ font, base, light, link, baseBackground, mq }: any) => ({
  root: {
    color: base,
    backgroundColor: baseBackground,
  },
  header: {
    color: '#fff',
    backgroundColor: link,
  },
  bar: {
    display: 'flex',
    alignItems: 'center',
    [xsmall]: {
      flexDirection: 'column',
      alignItems: 'center',
    },
  },
  nav: {
    marginLeft: 'auto',
    marginRight: '-0.5em',
    [xsmall]: {
      margin: [[10, 0, 0]],
    },
  },
  headerLink: {
    '&, &:link, &:visited': {
      marginLeft: '0.5em',
      marginRight: '0.5em',
      fontFamily: font,
      color: '#efefef',
    },
    '&:hover, &:active': {
      color: '#fff',
      cursor: 'pointer',
    },
  },
  content: {
    maxWidth: 1000,
    padding: [[15, 30]],
    margin: [[0, 'auto']],
    [mq.small]: {
      padding: 15,
    },
    display: 'block',
  },
  components: {
    overflow: 'auto', // To prevent the pane from growing out of the screen
  },
  footer: {
    display: 'block',
    color: light,
    fontFamily: font,
    fontSize: 12,
  },
});

export function StyleGuideRenderer({ classes, title, homepageUrl, children }: any) {
  return (
    // @ts-expect-error ts-migrate(7026) FIXME: JSX element implicitly has type 'any' because no i... Remove this comment to see the full error message
    <div className={classes.root}>
      // @ts-expect-error ts-migrate(7026) FIXME: JSX element implicitly has type 'any' because no
      i... Remove this comment to see the full error message
      <header className={classes.header}>
        // @ts-expect-error ts-migrate(7026) FIXME: JSX element implicitly has type 'any' because no
        i... Remove this comment to see the full error message
        <div className={classes.content}>
          // @ts-expect-error ts-migrate(7026) FIXME: JSX element implicitly has type 'any' because
          no i... Remove this comment to see the full error message
          <div className={classes.bar}>
            // @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is
            provided... Remove this comment to see the full error message
            <Logo>
              // @ts-expect-error ts-migrate(7026) FIXME: JSX element implicitly has type 'any'
              because no i... Remove this comment to see the full error message
              <a className={classes.headerLink} href="#">
                {title}
                // @ts-expect-error ts-migrate(7026) FIXME: JSX element implicitly has type 'any'
                because no i... Remove this comment to see the full error message
              </a>
            </Logo>
            // @ts-expect-error ts-migrate(7026) FIXME: JSX element implicitly has type 'any'
            because no i... Remove this comment to see the full error message
            <nav className={classes.nav}>
              // @ts-expect-error ts-migrate(7026) FIXME: JSX element implicitly has type 'any'
              because no i... Remove this comment to see the full error message
              <a
                className={classes.headerLink}
                href="https://github.com/hypeserver/react-date-range">
                GitHub // @ts-expect-error ts-migrate(7026) FIXME: JSX element implicitly has type
                'any' because no i... Remove this comment to see the full error message
              </a>
              // @ts-expect-error ts-migrate(7026) FIXME: JSX element implicitly has type 'any'
              because no i... Remove this comment to see the full error message
            </nav>
            // @ts-expect-error ts-migrate(7026) FIXME: JSX element implicitly has type 'any'
            because no i... Remove this comment to see the full error message
          </div>
          // @ts-expect-error ts-migrate(7026) FIXME: JSX element implicitly has type 'any' because
          no i... Remove this comment to see the full error message
        </div>
        // @ts-expect-error ts-migrate(7026) FIXME: JSX element implicitly has type 'any' because no
        i... Remove this comment to see the full error message
      </header>
      // @ts-expect-error ts-migrate(7026) FIXME: JSX element implicitly has type 'any' because no
      i... Remove this comment to see the full error message
      <main className={classes.content}>
        {children}
        // @ts-expect-error ts-migrate(7026) FIXME: JSX element implicitly has type 'any' because no
        i... Remove this comment to see the full error message
        <footer className={classes.footer}>
          // @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is
          provided... Remove this comment to see the full error message
          <Markdown text={`Created with [React Styleguidist](${homepageUrl}) ❤️`} />
          // @ts-expect-error ts-migrate(7026) FIXME: JSX element implicitly has type 'any' because
          no i... Remove this comment to see the full error message
        </footer>
        // @ts-expect-error ts-migrate(7026) FIXME: JSX element implicitly has type 'any' because no
        i... Remove this comment to see the full error message
      </main>
      // @ts-expect-error ts-migrate(7026) FIXME: JSX element implicitly has type 'any' because no
      i... Remove this comment to see the full error message
    </div>
  );
}

StyleGuideRenderer.propTypes = {
  classes: PropTypes.object.isRequired,
  title: PropTypes.string.isRequired,
  homepageUrl: PropTypes.string.isRequired,
  children: PropTypes.node.isRequired,
};

export default Styled(styles)(StyleGuideRenderer);
