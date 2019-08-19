export const TOGGLE_MENU = 'TOGGLE_MENU';
export const CLOSE_MENU = 'CLOSE_MENU';
export const TOGGLE_PROMPT_MODAL = 'TOGGLE_PROMPT_MODAL';
export const TOGGLE_DEPOSIT_SIDEPANE = 'TOGGLE_DEPOSIT_SIDEPANE';

export const toggleMenu = () => {
  return {
    type: 'TOGGLE_MENU',
  }
}
export const closeMenu = () => {
  return {
    type: 'CLOSE_MENU',
  }
}

export const togglePromptModal = () => {
  return {
    type: 'TOGGLE_PROMPT_MODAL',
  }
}