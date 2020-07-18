import { TOGGLE_LEFT_MENU } from "../constants/action-types";

export function toggleLeftMenu(payload = null) {
  return {type: TOGGLE_LEFT_MENU, payload}
}
