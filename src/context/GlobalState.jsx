import React, { createContext, useReducer, useState } from 'react'
import AppReducer from './AppReducer'

// Initial state
const initialState = {
  accounts: [
    {
      accNumber: "222502-104008-088",
      accAmount: 100,
      admin: false,
      email: "raphaelpadua@gmail.com",
      firstName: "Raphael",
      id: 1,
      lastName: "Padua",
      password: "0707",
      transactions: []
    },
    {
      accAmount: 700,
      accNumber: "222502-114025-181",
      admin: false,
      email: "cmsd@gmail.com",
      firstName: "Christine Mae",
      id: 2,
      lastName: "Defensor",
      password: "0707",
      transactions: []
    }
  ],
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

  //Actions
  function addAccount(account) {
    dispatch({
      type: 'ADD_ACCOUNT',
      payload: account
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
        setTransaction,
      }}>
      {children}
    </GlobalContext.Provider>
  )
}
