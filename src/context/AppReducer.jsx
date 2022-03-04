export default (state, action) =>{
  switch(action.type) {
    case 'ADD_ACCOUNT':
      return {
        ...state,
        accounts: [...state.accounts, action.payload]
      }
    case 'DELETE_ACCOUNT':
      return {
        ...state,
        accounts: state.accounts.filter(
          account => account.id !== action.payload
        )
      }
    case 'SET_TRANSACTION':
      return {
        ...state,
        transaction: action.payload
      }
    default:
      return state
  }
}