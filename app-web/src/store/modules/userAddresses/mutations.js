
export default {
  setAddresses(state, addresses) {
    state.addresses = addresses;
  },
  setLoadingAddresses(state, loadingAddresses) {
    state.loading_addresses = loadingAddresses;
  },
  setZipcodeInfo(state, zipcodeInfo) {
    state.zipcode_info = zipcodeInfo;
  },
  setLoadingZipcodeInfo(state, loadingZipcodeInfo) {
    state.loading_zipcode_info = loadingZipcodeInfo;
  }
}
