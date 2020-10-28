import { TOGGLE_SETTINGS, TOGGLE_LOADER, TOGGLE_SIDE_MENU } from '../types';

const INITIAL_STATE = {
  settings: {
    open: false,
  },
  showLoader: true,
  showSideMenu: true,
};

export default (state = INITIAL_STATE, { type, payload }) => {
  switch (type) {
    case TOGGLE_SETTINGS:
      return {
        ...state,
        settings: {
          ...state.settings,
          open: payload,
        },
      };
    case TOGGLE_LOADER:
      return {
        ...state,
        showLoader: payload,
      };
    case TOGGLE_SIDE_MENU:
      return {
        ...state,
        showSideMenu: payload,
      };
    default:
      return state;
  }
};
