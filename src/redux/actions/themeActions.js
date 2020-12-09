import * as types from "../constants";

import { toggleTheme } from "../../services/themeService";

export function enableModernTheme() {
  return enableTheme("modern");
}

export function enableClassicTheme() {
  return enableTheme("modern");
}

export function enableDarkTheme() {
  return enableTheme("modern");
}

export function enableLightTheme() {
  return enableTheme("modern");
}

function enableTheme(name) {
  toggleTheme(name);

  return {
    type: types.THEME_TOGGLE,
    payload: name
  };
}
