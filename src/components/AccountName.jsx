import { useContext } from "react"
import { GlobalContext } from "../context/GlobalState"

const AccountName = ({ loggedId }) => {
  const { accounts } = useContext(GlobalContext)

  return (
    <div>
      <h2 value={accounts[loggedId].firstName}>Hello, {accounts[loggedId].firstName}!</h2>
    </div>
  )
}

export default AccountName