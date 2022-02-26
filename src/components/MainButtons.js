const MainButtons = ({ onShow, setTransactionTitle, toggleShowExpenses }) => {
  return (
    <div className="main-buttons">
      <button 
        className="main-button withdraw-button" 
        onClick={onShow}
        onMouseUp={() => setTransactionTitle('WITHDRAW')}>
        <h3>WITHDRAW</h3>
      </button>
      <button 
        className="main-button deposit-button" 
        onClick={onShow}
        onMouseUp={() => setTransactionTitle('DEPOSIT')}>
        <h3>DEPOSIT</h3>
      </button>
      <button 
        className="main-button transfer-button" 
        onClick={onShow}
        onMouseUp={() => setTransactionTitle('TRANSFER')}>
        <h3>TRANSFER</h3>
      </button>
      <button 
        className="main-button expenses-button" 
        onClick={() => toggleShowExpenses()}>
        <h3>EXPENSES</h3>
      </button>
    </div>
  )
}

export default MainButtons