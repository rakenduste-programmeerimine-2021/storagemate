export const STORAGE_ADD = "STORAGE_ADD"
export const STORAGE_REMOVE = "STORAGE_REMOVE"
export const USER_LOGIN = "USER_LOGIN"
export const USER_LOGOUT = "USER_LOGOUT"
export const STORAGES_UPDATE = "STORAGES_UPDATE"

export const addStorage = post => ({
  type: STORAGE_ADD,
  payload: post
})

export const removeStorage = id => ({
  type: STORAGE_REMOVE,
  payload: id
})

export const updateStorages = array => ({
  type: STORAGES_UPDATE,
  payload: array
})

export const loginUser = data => ({
  type: USER_LOGIN,
  payload: data
})

export const logoutUser = () => ({
  type: USER_LOGOUT
})