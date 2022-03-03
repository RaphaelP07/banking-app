import React, { useContext } from 'react'
import { GlobalContext } from '../context/GlobalState'

const ConfirmTransaction = ({ onTransact, onDone, loggedId, transferId }) => {
  const { accounts, transaction } = useContext(GlobalContext)

  const confirmButton = () => {
    if (transaction.transactionType === 'WITHDRAW') {
      accounts[loggedId].accAmount=accounts[loggedId].accAmount-transaction.amount
    }
    
    if (transaction.transactionType === 'DEPOSIT') {
      accounts[loggedId].accAmount=accounts[loggedId].accAmount+transaction.amount
    }

    
    if (transaction.transactionType === 'TRANSFER') {
      accounts[loggedId].accAmount=accounts[loggedId].accAmount-transaction.amount
      accounts[transferId].accAmount=accounts[transferId].accAmount+transaction.amount
      receiveTransaction()
    }
    
    accounts[loggedId].transactions.push(transaction)

    onDone()
    onTransact()
  }

  const receiveTransaction = () => {
    const receiveTransaction = {
      amount: transaction.amount,
      timeDate: transaction.date,
      notes: transaction.notes,
      receipt: transaction.receipt,
      transactionType: 'RECEIVE',
      transferFrom: accounts[loggedId].accNumber
    }
    accounts[transferId].transactions.push(receiveTransaction)
  }

  return (
    <div className="confirm-transaction-container">
      <div className="confirm-transaction-prompt">
        <header className='margin-bottom'>
          <h3>Confirm Transaction:</h3>
        </header>
          <div className='margin-left'>
            <div className="form-label">
              Transaction:
            </div>
            <h2 className="item margin-left margin-bottom">
              {transaction.transactionType}
            </h2>
          </div>
          <div className='margin-left'>
            <div className="form-label">
              Amount:
            </div>
            <h2 className="item margin-left margin-bottom">
            {((transaction.amount).toFixed(2)).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
            </h2>
          </div>
          {transaction.transferTo !== null && 
          <div className='margin-left'>
            <div className="form-label">
              Transfer to:
            </div>
            <h2 className="item margin-left margin-bottom">
              {transaction.transferTo}
            </h2>
          </div>}
          {transaction.notes !== '' && <div className='margin-left'>
            <div className="form-label">
              Notes:
            </div>
            <div className="item margin-left margin-bottom">
              {transaction.notes}
            </div>
          </div>}
          <div className="confirm-buttons-container">
            <button 
            className='form-button'
            onClick={confirmButton}>
              CONFIRM
            </button>
            <button 
            className='form-button'
            onClick={onTransact}>
              CANCEL
            </button>
          </div>
      </div>
    </div>
  )
}

export default ConfirmTransaction