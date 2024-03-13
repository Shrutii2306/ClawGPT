import { CHANGEVARIABLE } from '../actions/type';

//store all redux variables here
const INITIAL_STATE = {
  activity: false,
  firstName:'',
  lastName : '',
  authenticated: false,
  session_id: '',
  email: '',
  error: false,
  uid: '',
  phone_no: '',
  role: '',
  jwtToken : '',
  address : '',
  GPTHistory_ID : [],
  active_chatID : 0
};
const a = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case CHANGEVARIABLE:
      return { ...state, [action.payload.key]: action.payload.value };
    default:
      return state;
  }
};
export { a as default };