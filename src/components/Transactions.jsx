import React, { useContext } from 'react'
import { GlobalContext } from '../context/GlobalState'

const Transactions = ({ loggedId }) => {
  const { accounts } = useContext(GlobalContext)

  return (
    <div>
      <table>
        <thead>
          <tr className='top-row'>
            <th>TRANSACTION</th>
            <th>AMOUNT</th>
            <th>NOTES</th>
            <th>TIME & DATE</th>
          </tr>
        </thead>
        <tbody>
          {accounts[loggedId].transactions.map(transaction => 
          <tr key={accounts[loggedId].transactions.indexOf(transaction)} >
            <th>{transaction.transactionType}</th>
            <th>{((transaction.amount).toFixed(2)).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}</th>
            <th>{transaction.notes}</th>
            <th>{transaction.timeDate}</th>
          </tr>)}

        </tbody>
      </table>
    </div>
  )
}

export default Transactions