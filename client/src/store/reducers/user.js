import { handleActions } from 'redux-actions'
import { UPDATEID, LOGIN, UPADTEADDRESSBOOK } from '../types/user'

const defaultState = {
  openid: '',
  isLogin: false,
  addressBook: {},
};

export default handleActions({
  [UPDATEID](state, action) {
    state.openid = action.payload;
    return { ...state }
  },
  [LOGIN](state, action) {
    state.isLogin = true;
    return { ...state }
  },
  [UPADTEADDRESSBOOK](state, action) {
    state.addressBook = action.payload;
    return { ...state };
  },
}, defaultState)