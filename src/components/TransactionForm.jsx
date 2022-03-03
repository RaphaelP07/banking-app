import { useState, useContext } from 'react'
import { GlobalContext } from "../context/GlobalState"

const TransactionForm = ({ getTransferToAccountId, getTransferTo, loggedId, onTransact, onDone }) => {
  const { accounts, transaction, setTransaction } = useContext(GlobalContext)
  const [amount, setAmount] = useState('')
  const [timeDate, setTimeDate] = useState('')
  const [notes, setNotes] = useState('')
  const [receipt, setReceipt] = useState(false)
  const [transactionType, setTransactionType] = useState(transaction.transactionType)
  const [transferTo, setTransferTo] = useState(null)

  const transact = (e) => {
    e.preventDefault()

    if (amount === 0) {
      alert('Please add an amount')
      return
    }
    
    if (checkAccNumbers.length === 0 != transaction.transferTo === null) {
      alert('Invalid account number')
      return
    }
    
    if (transactionType === 'WITHDRAW') {
      if (amount>accounts[loggedId].accAmount) {
        alert('You have insufficient funds for withdrawal')
        return
      }
    }
    
    if (transactionType === 'TRANSFER') {
      if (amount>accounts[loggedId].accAmount) {
        alert('You have insufficient funds for transfer')
        return
      }
      getTransferToAccountId(checkAccNumbers[0].id-1)
      getTransferTo(transferTo)
    }
    
    if (amount > 25000) {
      alert('The maximum transaction amount is PHP25,000')
      return
    }

    // transactionDate()

    const newTransaction = {
      amount: +amount,
      timeDate: timeDate,
      notes: notes,
      receipt: receipt,
      transactionType: transactionType,
      transferTo: transferTo
    }
    
    setTransaction(newTransaction)
    
    onTransact()
  }
  
  const cancelTransaction = () => {
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

    onDone()
  }

  let d = new Date ()
  const year = d.getFullYear()-2000
  const date = d.getDate() > 9 ? d.getDate() : '0'.concat(d.getDate())
  const month = d.getMonth()+1 > 9 ? d.getMonth() : '0'.concat(d.getMonth()+1)
  const hours = d.getHours() > 9 ? d.getHours() : '0'.concat(d.getHours())
  const minutes = d.getMinutes() > 9 ? d.getMinutes() : '0'.concat(d.getMinutes())
  const seconds = d.getSeconds() > 9 ? d.getSeconds() : '0'.concat(d.getSeconds())

  setTimeout(() => {setTimeDate(`${hours}:${minutes}:${seconds} on ${month}/${date}/${year}`)}, 1000)

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
            onClick={cancelTransaction}>CANCEL
          </button>
        </div>
      </form>
    </div>
  )
}

export default TransactionForm