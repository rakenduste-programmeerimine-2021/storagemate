import { STORAGE_ADD, STORAGE_REMOVE, STORAGES_UPDATE, USER_LOGIN, USER_LOGOUT } from "./actions";

const storageReducer = (state, action) => {
  switch(action.type){
    case STORAGE_ADD:
      return {
        ...state,
        data: state.data.concat(action.payload)
      };
    case STORAGE_REMOVE:
      
      return {
        ...state,
        data: state.data.filter(post => post.id !== action.payload)
      }

    case STORAGES_UPDATE: 
        return {
          ...state,
          data: action.payload
        }
    default:
      return state
  }
}

const authReducer = (state, action) => {
  switch(action.type){
    case USER_LOGIN:
      console.log(action.payload.token);
      return {
        ...state,
        
        token: action.payload.token,
        //user: action.payload.user
        user: {
          id: action.payload.id,
          email: action.payload.email,
          firstName: action.payload.firstName,
          lastName: action.payload.lastName
        }  
      }
      
    case USER_LOGOUT:
      return {
        ...state,
        token: null,
        user: null
      }
    default:
      return state
  }
}

export { storageReducer, authReducer }