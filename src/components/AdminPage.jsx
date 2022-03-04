import React, { useContext, useState, useEffect } from 'react'
import { GlobalContext } from '../context/GlobalState'
import AdminTransactionForm from './AdminTransactionForm'
import AdminConfirmTransaction from './AdminConfirmTransaction'
import AdminDeletePrompt from './AdminDeletePrompt'
import AdminCreatePrompt from './AdminCreatePrompt'

const AdminPage = () => {
  const { accounts, deleteAccount, setTransaction } = useContext(GlobalContext)
  const [showTransactionForm, setShowTransactionForm] = useState(false)
  const [showTransactions, setShowTransactions] = useState(false)
  const [confirmTransaction, setConfirmTransaction] = useState(false)
  const [transactionType, setTransactionType] = useState('')
  const [userId, setUserId] = useState(null)
  const [transferId, setTransferId] = useState(null)
  const [deleteAccountPrompt, setDeleteAccountPrompt] = useState(false)
  const [createAccountPrompt, setCreateAccountPrompt] = useState(false)

  const selectTransaction = (index) => {
    setShowTransactionForm(true)
    setUserId(index)

    const newTransaction = {
      amount: 0,
      timeDate: '',
      notes: '',
      receipt: false,
      transactionType: transactionType,
      transferTo: null
    }
    
    setTransaction(newTransaction)
  }

  const showDeletePrompt = (index) => {
    setDeleteAccountPrompt(true)
    setUserId(index)
  }

  useEffect (() => {
    accounts.forEach(account => {
      account.id=accounts.indexOf(account) + 1
    })
  }, [accounts])

  const users = accounts.filter(account => {
    return account.isAdmin === false
  })

  return (
    <div className="main-container">
      <table>
        <thead>
          <tr className='top-row'>
            <th>LAST NAME</th>
            <th>FIRST NAME</th>
            <th>ACCOUNT NUMBER</th>
            <th>BALANCE</th>
            <th>ACTIONS</th>
          </tr>
        </thead>
        <tbody>
        {users.map(account => 
          <tr key={accounts.indexOf(account)} >
            <th>{account.lastName}</th>
            <th>{account.firstName}</th>
            <th>{account.accNumber}</th>
            <th>{((account.accAmount).toFixed(2)).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}</th>
            <th>
              <button className='admin-button' onClick={() => selectTransaction(accounts.indexOf(account))} onMouseUp={() => setTransactionType('WITHDRAW')}>WITHDRAW</button>
              <button className='admin-button' onClick={() => selectTransaction(accounts.indexOf(account))} onMouseUp={() => setTransactionType('DEPOSIT')}>DEPOSIT</button>
              <button className='admin-button' onClick={() => selectTransaction(accounts.indexOf(account))} onMouseUp={() => setTransactionType('TRANSFER')}>TRANSFER</button>
              <button className='admin-button' onClick={() => showDeletePrompt(accounts.indexOf(account))}>DELETE</button>
            </th>
          </tr>
          )}
        </tbody>
      </table>
      <button className='main-button' onClick={() => setCreateAccountPrompt(true)}>CREATE ACCOUNT</button>
      {showTransactionForm && <AdminTransactionForm userId={userId} getTransferId={(index) => setTransferId(index)} cancelTransaction={() => setShowTransactionForm(false)} confirm={() => setConfirmTransaction(true)}/>}
      {confirmTransaction && <AdminConfirmTransaction userId={userId} transferId={transferId} confirmed={() => setConfirmTransaction(false)} onDone={() => setShowTransactionForm(false)} cancelConfirm={() => setConfirmTransaction(false)} />}
      {deleteAccountPrompt && <AdminDeletePrompt userId={userId} onDone={() => setDeleteAccountPrompt(false)} />}
      {createAccountPrompt && <AdminCreatePrompt onDone={() => setCreateAccountPrompt(false)} />}
    </div>
  )
}

export default AdminPage