import React, { useContext, useState, useEffect } from 'react'
import { GlobalContext } from '../context/GlobalState'

const ConfirmTransaction = ({ onTransact, onDone, loggedId, transferId }) => {
  const { accounts, transaction } = useContext(GlobalContext)
  const [timeDate, setTimeDate] = useState('')


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

    transaction.timeDate = timeDate
    
    accounts[loggedId].transactions.push(transaction)

    onDone()
    onTransact()
  }

  let d = new Date ()
  const year = d.getFullYear()-2000
  const date = d.getDate() > 9 ? d.getDate() : '0'.concat(d.getDate())
  const month = d.getMonth()+1 > 9 ? d.getMonth() : '0'.concat(d.getMonth()+1)
  const hours = d.getHours() > 9 ? d.getHours() : '0'.concat(d.getHours())
  const minutes = d.getMinutes() > 9 ? d.getMinutes() : '0'.concat(d.getMinutes())
  const seconds = d.getSeconds() > 9 ? d.getSeconds() : '0'.concat(d.getSeconds())

  useEffect(() => {
    setTimeDate(`${hours}:${minutes}:${seconds} on ${month}/${date}/${year}`)
  }, []) 

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