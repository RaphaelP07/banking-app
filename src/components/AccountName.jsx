import { useContext } from "react"
import { GlobalContext } from "../context/GlobalState"
import { useNavigate } from 'react-router-dom'


const AccountName = ({ loggedId }) => {
  const { accounts } = useContext(GlobalContext)
  let navigate = useNavigate()

  return (
    <div className="account-name-container">
      <h2 value={accounts[loggedId].firstName}>Hello, {accounts[loggedId].firstName}!</h2>
      <button className="form-button logout-button" onClick={() => navigate('/banking-app')}>LOG OUT</button>
    </div>
  )
}

export default AccountName