import { TOGGLE_SETTINGS, TOGGLE_LOADER, TOGGLE_SIDE_MENU } from '../types';

const toggleSettings = (showSettings) => (dispatch) =>
  dispatch({
    type: TOGGLE_SETTINGS,
    payload: showSettings,
  });

const toggleLoader = (showLoader) => (dispatch) =>
  dispatch({
    type: TOGGLE_LOADER,
    payload: showLoader,
  });

const toggleSideMenu = (showSideMenu) => (dispatch) =>
  dispatch({
    type: TOGGLE_SIDE_MENU,
    payload: showSideMenu,
  });

export { toggleSettings, toggleLoader, toggleSideMenu };
