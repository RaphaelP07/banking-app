import React, { createContext, useReducer } from 'react'
import AppReducer from './AppReducer'

// Initial state
const initialState = {
  accounts: [
    {
      accNumber: null,
      accAmount: null,
      isAdmin: true,
      email: "admin@admin.com",
      firstName: "John",
      id: 1,
      lastName: "Smith",
      password: "1234",
      transactions: null
    },
    {
      accNumber: "222502-104008-088",
      accAmount: 15000,
      isAdmin: false,
      email: "raphaelpadua@gmail.com",
      firstName: "Raphael",
      id: 2,
      lastName: "Padua",
      password: "0707",
      transactions: []
    },
    {
      accAmount: 27700,
      accNumber: "222502-114025-181",
      isAdmin: false,
      email: "cmsd@gmail.com",
      firstName: "Christine",
      id: 3,
      lastName: "Defensor",
      password: "0707",
      transactions: []
    },
    {
      accNumber: "220203-141312-088",
      accAmount: 5200,
      isAdmin: false,
      email: "paul@gmail.com",
      firstName: "Paul",
      id: 4,
      lastName: "Mendiola",
      password: "1234",
      transactions: []
    },
    {
      accNumber: "220403-225621-088",
      accAmount: 3000,
      isAdmin: false,
      email: "philip@gmail.com",
      firstName: "Philip",
      id: 5,
      lastName: "Nadal",
      password: "1234",
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
