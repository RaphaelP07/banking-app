import React, { useContext, useEffect } from 'react'
import { GlobalContext } from '../context/GlobalState'

const AdminDeletePrompt = ({ onDone, userId }) => {
  const { accounts, deleteAccount } = useContext(GlobalContext)

  const confirmDelete = () => {
    deleteAccount(accounts[userId].id)
    onDone()
  }

  return (
    <div className="confirm-transaction-container">
      <div className="confirm-transaction-prompt">
        <header className='margin-bottom'>
          <h3>Confirm deletion:</h3>
        </header>
          <div className='margin-left'>
            <div className="form-label">
              User:
            </div>
            <h2 className="item margin-left margin-bottom">
              {accounts[userId].firstName} {accounts[userId].lastName}
            </h2>
          </div>
          <div className='margin-left'>
            <div className="form-label">
              Account Number:
            </div>
            <h2 className="item margin-left margin-bottom">
              {accounts[userId].accNumber}
            </h2>
          </div>
          <div className="confirm-buttons-container">
            <button 
            className='form-button'
            onClick={confirmDelete}>
              DELETE
            </button>
            <button 
            className='form-button'
            onClick={onDone}>
              CANCEL
            </button>
          </div>
      </div>
    </div>
  )
}

export default AdminDeletePrompt