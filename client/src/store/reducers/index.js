import { combineReducers } from 'redux'
import login from './login'
import user from './user'
import appConfig from './app-config'

export default combineReducers({
  appConfig,
  login,
	user,
})