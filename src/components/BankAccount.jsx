import { useContext } from "react"
import { GlobalContext } from "../context/GlobalState"

const BankAccount = ({ loggedId }) => {
  const { accounts } = useContext(GlobalContext)

  return (
    <div className="card-account">
      <h1 className='account-amount' value={accounts[loggedId].accAmount} >
          PHP {((accounts[loggedId].accAmount).toFixed(2)).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
      </h1>
      <h4 className='account-number' value={accounts[loggedId].accNumber}>
          {accounts[loggedId].accNumber}
      </h4>
      <div className='logo'>BISA</div>
    </div>
  )
}

export default BankAccount