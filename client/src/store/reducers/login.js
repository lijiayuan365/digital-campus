import {handleActions} from 'redux-actions'
import {UPDATE} from '../types/login'

const defaultState = {
	code: '000',
	effectiveTime: '0000',
	isLogin: false
};

export default handleActions({
	[UPDATE](state, action) {
		state.code = action.payload.code || state.code;
		state.effectiveTime = action.payload.effectiveTime || state.effectiveTime;
		state.isLogin = action.payload.isLogin || state.isLogin;
		return {...state};
	}
}, defaultState)
