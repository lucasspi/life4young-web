import cookie from '../helpers/cookie'

export default {
  setCurrentLocale (state, locale) {
    state.locale = locale
  },

  setAllLocalesAvailable (state, locales) {
    state.locales = locales
  },

  setMenuOpen(state, isMenuOpen) {
    state.show_menu = false;
    state.hide_menu = false;
    if (isMenuOpen === false || isMenuOpen === true) {
      let keyOption = isMenuOpen ? 'show_menu' : 'hide_menu';
      state[keyOption] = true;
    }
  },

  setMenuVisible(state, isVisibleMenu) {
    state.is_menu_visible = isVisibleMenu
  },

  setMobileMenuVisible(state, isVisibleMenu) {
    state.is_mobile_menu_visible = isVisibleMenu
  },

  resetMenuState(state) {
    state.show_menu = false;
    state.hide_menu = false;
  },

  setIsTourOpen(state, isTourOpen) {
    state.is_tour_open = isTourOpen;
  },

  setIsLeadModalOpen(state, {isLeadModalOpen, isMobile}) {
    if (isMobile) {
      state.is_lead_modal_open = isLeadModalOpen;
      return;
    }
    if (isLeadModalOpen && state.lead_modal_last_open < (new Date()).getTime() - (state.lead_modal_pause_time)) {
      console.log('lead is alright');
      state.is_lead_modal_open = isLeadModalOpen;
      state.lead_modal_last_open = (new Date()).getTime();
      cookie.set(cookie.LEAD_COOKIE(), state.lead_modal_last_open, 7);
    } else if (!isLeadModalOpen && state.lead_modal_last_open >= (new Date()).getTime() - (state.lead_modal_pause_time)) {
      state.is_lead_modal_open = isLeadModalOpen;
    }
    console.log('is_lead_modal_open: ', state.is_lead_modal_open)
  },

  setIsLeadCookie(state, isLeadCookie) {
    state.is_lead_cookie = isLeadCookie;
    state.lead_modal_last_open = parseInt(isLeadCookie, 10);
  },

  setUsersCount(state, usersCount) {
    state.users_count = usersCount;
  },

  setPlatform(state, platform) {
    state.platform = platform;
  },

  setAvailableAuthIntegrations(state, availableAuthIntegrations) {
    state.available_auth_integrations = availableAuthIntegrations;
  },

  setLoadingAvailableAuthIntegrations(state, loadingAvailableAuthIntegrations) {
    state.loading_available_auth_integrations = loadingAvailableAuthIntegrations;
  }

}
