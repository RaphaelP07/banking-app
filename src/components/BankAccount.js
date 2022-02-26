const BankAccount = ({ amount, number }) => {
  return (
    <div className="card-account">
      <h1 className='account-amount' value={amount} >
          PHP {amount}
      </h1>
      <h4 className='account-number' value={number}>
          {number}
      </h4>
      <div className='logo'>BISA</div>
    </div>
  )
}

export default BankAccount