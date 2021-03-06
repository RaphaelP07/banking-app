import { useState, useContext } from 'react'
import { GlobalContext } from "../context/GlobalState"

const AdminTransactionForm = ({ cancelTransaction, confirm, getTransferId, userId }) => {
  const { accounts, transaction, setTransaction } = useContext(GlobalContext)
  const [amount, setAmount] = useState('')
  const [timeDate, setTimeDate] = useState('')
  const [notes, setNotes] = useState('')
  const [receipt, setReceipt] = useState(false)
  const [transactionType, setTransactionType] = useState(transaction.transactionType)
  const [transferTo, setTransferTo] = useState(null)

  const transact = (e) => {
    e.preventDefault()

    if (amount === 0 || amount === '') {
      alert('Please add an amount')
      return
    }
    
    if (transactionType === 'WITHDRAW') {
      if (amount > accounts[userId].accAmount) {
        alert('User has insufficient funds for withdrawal')
        return
      }
    }
    
    if (transactionType === 'TRANSFER') {
      if (amount > accounts[userId].accAmount) {
        alert('User has insufficient funds for transfer')
        return
      }
      if (checkAccNumbers.length === 0) {
        alert('Invalid account number')
        return
      }
      if (transferTo === null) {
        alert('Please enter an account number.')
        return
      }
      if (userId === checkAccNumbers[0].id-1) {
        alert('User is not allowed to transfer to his/her own account.')
        return
      }
      getTransferId(checkAccNumbers[0].id-1)
    }

    const newTransaction = {
      amount: +amount,
      notes: notes,
      receipt: receipt,
      transactionType: transactionType,
      transferTo: transferTo
    }

    
    setTransaction(newTransaction)
    
    confirm()
  }
  
  const resetTransaction = () => {
    setTransaction({
        amount: 0,
        timeDate: '',
        notes: '',
        receipt: false,
        transactionType: '',
        transferTo: null
      })

    setAmount(0)
    setNotes('')
    setReceipt(false)
    setTransactionType('')
    setTransferTo(null)

    cancelTransaction()
  }

  const checkAccNumbers = accounts.filter(account => {
    return account.accNumber === transferTo
  })

  return (
    <div className='form-container'>
      <form className='transaction-form' onSubmit={transact}> 
        <h2 className='transaction-label'>
          {transaction.transactionType} 
        </h2>
        <div className='input-container'>
          <label className='form-label'>Amount</label>
          PHP<input
            type='number'
            className='amount-input one-line margin-left'
            min={100}
            value={amount}
            step={.01}
            onChange={(e) => setAmount(e.target.value)}
          />
        </div>
        {transaction.transactionType === 'TRANSFER' ? <div className='input-container'>
          <label className='form-label'>Transfer to</label>
          <input
            type='text'
            className='transfer-input one-line'
            placeholder='XXXXXX-XXXXXX-XXX'
            value={transferTo === null ? '' : transferTo}
            onChange={(e) => setTransferTo(e.target.value)}
          />
        </div> : ''}
        <div className='input-container'>
          <label className='form-label'>Notes</label>
          <textarea
            className='notes-input'
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
          />
        </div>
        <div className='form-control form-control-check checkbox-container'>
          <label className='checkbox-label'>Email Receipt</label>
          <input
            type='checkbox'
            className='receipt-checkbox'
            checked={receipt}
            value={receipt}
            onChange={(e) => setReceipt(e.currentTarget.checked)}
          />
        </div>
        
        <div className="form-buttons-containers">
          <input 
            type='submit' 
            value='SUBMIT' 
            className='submit-button form-button' 
          />
          <button 
            className="cancel-button form-button" 
            onClick={resetTransaction}>CANCEL
          </button>
        </div>
      </form>
    </div>
  )
}

export default AdminTransactionForm