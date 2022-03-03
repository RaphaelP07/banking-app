import { useState, useContext } from "react"
import { GlobalContext } from "../context/GlobalState"

const MainButtons = ({ onShow, toggleShowTransactions }) => {
  const { setTransaction } = useContext(GlobalContext)
  const [transactionType, setTransactionType] = useState('')

  const selectTransaction = () => {
    onShow()

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
  
  return (
    <div className="main-buttons">
      <button 
        className="main-button withdraw-button" 
        onClick={selectTransaction}
        onMouseUp={() => setTransactionType('WITHDRAW')}>
        <h3>WITHDRAW</h3>
      </button>
      <button 
        className="main-button deposit-button" 
        onClick={onShow}
        onMouseDown={() => setTransactionType('DEPOSIT')}
        onMouseUp={() => selectTransaction()}>
        <h3>DEPOSIT</h3>
      </button>
      <button 
        className="main-button transfer-button" 
        onClick={onShow}
        onMouseDown={() => setTransactionType('TRANSFER')}
        onMouseUp={() => selectTransaction()}>
        <h3>TRANSFER</h3>
      </button>
      <button 
        className="main-button expenses-button" 
        onClick={() => toggleShowTransactions()}>
        <h3>TRANSACTIONS</h3>
      </button>
    </div>
  )
}

export default MainButtons