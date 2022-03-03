export default (state, action) =>{
  switch(action.type) {
    // case 'DELETE_TRANSACTION':
    //   return {
    //     ...state,
    //     transactions: state.transactions
    //     .filter(transaction => transaction.id !== action.payload)
    //   }
    case 'ADD_ACCOUNT':
      return {
        ...state,
        accounts: [...state.accounts, action.payload]
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