import { createContext, useReducer } from "react";
import { storageReducer, authReducer, reservationReducer } from "./reducer";
import combineReducers from "react-combine-reducers"

const initialStorages = {
  data: []
}

const initialAuth = {
  token: null,
  user: null
}

const initialReservations = {
  data:[]
}

const [combinedReducer, initialState] = combineReducers({
  storages: [storageReducer, initialStorages],
  auth: [authReducer, initialAuth],
  reservations: [reservationReducer, initialReservations]

})

export const Context = createContext(initialState)

function Store({ children }){
  const [state, dispatch] = useReducer(combinedReducer, initialState)

  return (
    <Context.Provider value={[ state, dispatch ]}>
      { children }
    </Context.Provider>
  )
}

export default Store