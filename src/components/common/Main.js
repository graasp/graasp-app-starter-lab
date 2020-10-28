import React, { Component } from 'react';
import clsx from 'clsx';
import PropTypes from 'prop-types';
import { withTranslation } from 'react-i18next';
import { connect } from 'react-redux';
import MenuIcon from '@material-ui/icons/Menu';
import { withStyles } from '@material-ui/core/styles';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import { CssBaseline, Fab } from '@material-ui/core';
import { toggleSideMenu } from '../../actions';
import Header from './Header';
import SideMenu from './SideMenu';
import { DRAWER_WIDTH } from '../../config/constants';

const styles = (theme) => ({
  root: {
    display: 'flex',
    height: '100%',
  },
  fullScreen: {
    width: '100%',
    height: '100%',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  content: {
    flexGrow: 1,
    transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
  },
  contentShift: {
    transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
    marginRight: DRAWER_WIDTH,
  },
  drawerHeader: {
    display: 'flex',
    alignItems: 'center',
    padding: theme.spacing(0, 1),
    ...theme.mixins.toolbar,
    justifyContent: 'flex-end',
  },
  fab: {
    left: theme.spacing(2),
    top: theme.spacing(2),
    position: 'absolute',
    zIndex: 999999,
  },
});

class Main extends Component {
  static propTypes = {
    classes: PropTypes.shape({
      content: PropTypes.string.isRequired,
      contentShift: PropTypes.string.isRequired,
      fab: PropTypes.string.isRequired,
      root: PropTypes.string.isRequired,
      drawerHeader: PropTypes.string.isRequired,
    }).isRequired,
    showSideMenu: PropTypes.bool.isRequired,
    headerVisible: PropTypes.bool,
    dispatchToggleSideMenu: PropTypes.func.isRequired,
    children: PropTypes.oneOfType([
      PropTypes.arrayOf(PropTypes.node),
      PropTypes.node,
    ]).isRequired,
    t: PropTypes.func.isRequired,
  };

  static defaultProps = {
    headerVisible: true,
  };

  handleToggleSideMenu = (open) => () => {
    const { dispatchToggleSideMenu } = this.props;
    dispatchToggleSideMenu(open);
  };

  render() {
    const { classes, showSideMenu, headerVisible, children, t } = this.props;
    return (
      <div className={classes.root}>
        <CssBaseline />
        {headerVisible ? (
          <Header />
        ) : (
          <Fab
            color="primary"
            aria-label={t('Open Drawer')}
            onClick={this.handleToggleSideMenu(!showSideMenu)}
            className={classes.fab}
          >
            {showSideMenu ? <MenuIcon /> : <ChevronRightIcon />}
          </Fab>
        )}
        <SideMenu />

        <main
          className={clsx(classes.content, {
            [classes.contentShift]: showSideMenu,
          })}
        >
          {headerVisible && <div className={classes.drawerHeader} />}
          {children}
        </main>
      </div>
    );
  }
}

const mapStateToProps = ({ layout, appInstance }) => ({
  headerVisible: appInstance.content.settings.headerVisible,
  showSideMenu: layout.showSideMenu,
  themeColor: layout.themeColor,
});

const mapDispatchToProps = {
  dispatchToggleSideMenu: toggleSideMenu,
};

const ConnectedComponent = connect(mapStateToProps, mapDispatchToProps)(Main);

const StyledComponent = withStyles(styles, { withTheme: true })(
  ConnectedComponent,
);
const TranslatedComponent = withTranslation()(StyledComponent);

export default withTranslation()(TranslatedComponent);