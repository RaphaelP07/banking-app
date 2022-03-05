import React, { createContext, useReducer, useEffect } from 'react'
import AppReducer from './AppReducer'

// Initial state
const initLocalStorage = () => {
  const initAccounts = [{"accNumber":null,"accAmount":null,"isAdmin":true,"email":"admin@admin.com","firstName":"John","id":1,"lastName":"Smith","password":"1234","transactions":null},{"accNumber":"222502-104008-088","accAmount":15000,"isAdmin":false,"email":"raphaelpadua@gmail.com","firstName":"Raphael","id":2,"lastName":"Padua","password":"1234","transactions":[{"amount":3000,"notes":"grocery allowance","receipt":false,"transactionType":"DEPOSIT","transferTo":null,"timeDate":"12:48:29 on 03/02/22"},{"amount":2000,"notes":"payment","receipt":false,"transactionType":"RECEIVE","transferTo":"222502-114025-181","timeDate":"11:54:12 on 03/03/22"},{"amount":400,"notes":"needed cash","receipt":false,"transactionType":"WITHDRAW","transferTo":null,"timeDate":"21:31:56 on 03/03/22"},{"amount":900,"notes":"needed cash","receipt":false,"transactionType":"WITHDRAW","transferTo":null,"timeDate":"03:10:22 on 03/04/22"}]},{"accAmount":27700,"accNumber":"222502-114025-181","isAdmin":false,"email":"maea@gmail.com","firstName":"Mae","id":3,"lastName":"Defensor","password":"1234","transactions":[{"amount":1000,"notes":"payment received","receipt":false,"transactionType":"DEPOSIT","transferTo":null,"timeDate":"19:48:42 on 02/28/22"},{"amount":1200,"notes":"pocket money","receipt":false,"transactionType":"WITHDRAW","transferTo":null,"timeDate":"13:12:13 on 03/01/22"},{"amount":2000,"notes":"payment","receipt":false,"transactionType":"TRANSFER","transferTo":"222502-104008-088","timeDate":"11:54:12 on 03/03/22"},{"amount":900,"notes":"needed cash","receipt":false,"transactionType":"WITHDRAW","transferTo":null,"timeDate":"03:10:22 on 03/04/22"}]},{"accNumber":"220203-141312-088","accAmount":5200,"isAdmin":false,"email":"paul@gmail.com","firstName":"Paul","id":4,"lastName":"Mendiola","password":"1234","transactions":[{"amount":500,"notes":"transfer payment","receipt":false,"transactionType":"TRANSFER","transferTo":"220203-141312-088","timeDate":"06:48:29 on 03/01/22"},{"amount":900,"notes":"needed cash","receipt":false,"transactionType":"WITHDRAW","transferTo":null,"timeDate":"12:48:29 on 03/02/22"},{"amount":1200,"notes":"needed cash","receipt":false,"transactionType":"WITHDRAW","transferTo":null,"timeDate":"23:11:58 on 03/03/22"},{"amount":5000,"notes":"deposit sweldo","receipt":false,"transactionType":"WITHDRAW","transferTo":null,"timeDate":"13:52:53 on 03/04/22"}]},{"accNumber":"220403-225621-088","accAmount":3000,"isAdmin":false,"email":"philip@gmail.com","firstName":"Philip","id":5,"lastName":"Nadal","password":"1234","transactions":[]}]
  localStorage.setItem('bankaccounts', JSON.stringify(initAccounts))
  console.log('initiated')
  return initAccounts
}

const initialState = {
  accounts: JSON.parse(localStorage.getItem('bankaccounts')) === null ? initLocalStorage() : JSON.parse(localStorage.getItem('bankaccounts')),
  transaction: {
    amount: 0,
    timeDate: '',
    notes: '',
    receipt: false,
    transactionType: '',
    transferTo: null
  }
}

// Create context
export const GlobalContext = createContext(initialState)

// Provider component
export const GlobalProvider = ({ children }) => {
  const [state, dispatch] = useReducer(AppReducer, initialState)

  useEffect (() => {
    localStorage.setItem("bankaccounts", JSON.stringify(initialState.accounts))
  })

  //Actions
  function addAccount(account) {
    dispatch({
      type: 'ADD_ACCOUNT',
      payload: account
    })
  }

  function deleteAccount(id) {
    dispatch({
      type: 'DELETE_ACCOUNT',
      payload: id
    })
  }

  function setTransaction(transaction) {
    dispatch({
      type: 'SET_TRANSACTION',
      payload: transaction
    })
  }

  return (
    <GlobalContext.Provider 
    value={{
        accounts: state.accounts,
        transaction: state.transaction,
        addAccount,
        deleteAccount,
        setTransaction
      }}>
      {children}
    </GlobalContext.Provider>
  )
}
