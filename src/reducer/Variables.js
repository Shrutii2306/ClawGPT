import { CHANGEVARIABLE } from '../actions/type';

//store all redux variables here
const INITIAL_STATE = {

  firstName:'',
  lastName : '',
  session_id: '',
  email: '',
  error: false,
  uid: '',
  phone_no: '',
  jwtToken : '',
  GPTHistory_ID : [],
  active_chatID : 'newSession',
  active_chatHistory :[],
  sessionLoader:false
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