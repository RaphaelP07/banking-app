import { useState } from 'react'

const TransactionForm = ({ checkAccounts, getTransferToAccountId, getTransferTo, transactionType, onTransact, onDone, updateAmount }) => {
  // const [transactionInfo, setTransactionInfo] = useState([])

  const [amount, setAmount] = useState(0)
  const [notes, setNotes] = useState('')
  const [receipt, setReceipt] = useState(false)
  const [transferTo, setTransferTo] = useState(null)
  const [receiveTransaction, setReceiveTransaction] = useState(null)

  const transact = (e) => {
    e.preventDefault()

    if (amount === 0) {
      alert('Please add an amount')
      return
    }

    if (checkAccNumbers.length === 0 != transferTo === null) {
      alert('Invalid account number')
      return
    }

    if (transactionType === 'TRANSFER') {
      getTransferToAccountId(checkAccNumbers[0].id-1)
      getTransferTo(transferTo)
    }
    

    onTransact({ transactionType, amount, notes, receipt, transferTo })

    setAmount('')
    setNotes('')
    setReceipt(false)
    setTransferTo(null)

    onDone()
  }

  const checkAccNumbers = checkAccounts.filter(account => {
    return account.accNumber === transferTo
  })

  return (
    <div>
      <form className='form-container' onSubmit={transact}> 
        <h2 className='transaction-label'>
          {transactionType}
        </h2>
        <div className='input-container'>
          <label className='form-label'>Amount</label>
          <input
            type='number'
            className='amount-input one-line'
            step={100}
            min={0}
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
          />
        </div>
        {transactionType === 'TRANSFER' ? <div className='input-container'>
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
            // onClick={onDone} 
            // onMouseUp={() => updateAmount(amount)} 
          />
          <button 
            className="cancel-button form-button" 
            onClick={onDone}>CANCEL
          </button>
        </div>
      </form>
    </div>
  )
}

export default TransactionForm