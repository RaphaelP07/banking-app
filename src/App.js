import './App.css';
import { useState } from 'react'
import SignInForm from './components/SignInForm.js'
import SignUpForm from './components/SignUpForm.js'
import BankAccount from './components/BankAccount.js'
import MainButtons from './components/MainButtons.js'
import AccountName from './components/AccountName.js'
import TransactionForm from './components/TransactionForm.js'
import _ from 'lodash'

function App() {
  const [accounts, setAccounts] = useState([
    {
      accNumber: "222502-104008-088",
      accAmount: 100,
      email: "raphaelpadua@gmail.com",
      firstName: "Raphael",
      id: 1,
      lastName: "Padua",
      password: "0707",
      transactions: []
    },
    {
      accAmount: 700,
      accNumber: "222502-114025-181",
      email: "cmsd@gmail.com",
      firstName: "Christine Mae",
      id: 2,
      lastName: "Defensor",
      password: "0707",
      transactions: []
    }
  ])

  const [isLogged, setIsLogged] = useState(false)
  const [signUp, setSignUp] = useState(false)
  const [showTransactionForm, setShowTransactionForm] = useState(false)
  const [transactionType, setTransactionType] = useState('')
  const [showExpenses, setShowExpenses] = useState(false)
  const [loggedId, setLoggedId] = useState(null)
  const [transferTo, setTransferTo] = useState(null)
  const [transferToAccountId, setTransferToAccountId] = useState(null)

  // Sign up new account
  const signUpAccount = (account) => {
    setAccounts([...accounts, account])
  }

  // New transaction
  const newTransaction = (transaction) => {
    let newAmount
    let transferAmount

    if (transaction.transactionType === 'WITHDRAW') {
      newAmount = accounts[loggedId].accAmount - JSON.parse(transaction.amount)
    }

    if (transaction.transactionType === 'TRANSFER') {
      newAmount = accounts[loggedId].accAmount - JSON.parse(transaction.amount)
      transferAmount = JSON.parse(transaction.amount)
    }

    if (transaction.transactionType === 'DEPOSIT') {
      newAmount = accounts[loggedId].accAmount + JSON.parse(transaction.amount)
    } 

    let tempState = [...accounts]
    let tempElement = {...tempState[loggedId]}
    let transferTempElement = {...tempState[transferToAccountId]}
    let receiveTransaction = {}
    tempElement.accAmount = newAmount
    tempElement.transactions.push(transaction)
    transferTempElement.accAmount = transferTempElement.accAmount + JSON.parse(transaction.amount)
    receiveTransaction.amount = transaction.amount
    receiveTransaction.notes = transaction.notes
    receiveTransaction.receipt = true
    receiveTransaction.transactionType = 'RECEIVE'
    receiveTransaction.transferTo = transaction.transferTo
    transferTempElement.transactions.push(receiveTransaction)
    tempState[transferToAccountId] = transferTempElement
    tempState[loggedId] = tempElement
    setAccounts(tempState)

  }

  return (
    <div className="App">
      <header className="App-header">
        <p>
          banking app
        </p>
      </header>
      {
        !isLogged ? 
          <section className="sign-form-container">
            {
            !signUp ? 
              <SignInForm 
                onSignIn={() => setIsLogged(true)}
                signUpForm={() => setSignUp(true)}
                checkAccounts={accounts}
                getLoggedId={(index) => setLoggedId(index)} /> 
              : 
              <SignUpForm 
                onSignUp={signUpAccount}
                backToSignIn={() => setSignUp(false)}
                checkAccounts={accounts} />
            }
          </section>
        :
        <div className='main-container'>
          <section className='account-name'>
            <AccountName
              name={`${accounts[loggedId].firstName} ${accounts[loggedId].lastName}`} />
          </section>
          <section className='account-container'>
            <BankAccount 
              amount={accounts[loggedId].accAmount}
              number={accounts[loggedId].accNumber} />
            <MainButtons 
              onShow={() => setShowTransactionForm(true)}
              showTransaction={showTransactionForm}
              setTransactionTitle={transactionType => setTransactionType(transactionType)}
              toggleShowExpenses={() => setShowExpenses(!showExpenses)} />
          </section>
          <section className='transactions-container'>
            {showTransactionForm && 
            <TransactionForm 
              transactionType={transactionType} 
              onDone={() => setShowTransactionForm(false)}
              onTransact={newTransaction}
              checkAccounts={accounts}
              getTransferToAccountId={(index) => setTransferToAccountId(index)}
              getTransferTo={(accNumber) => setTransferTo(accNumber)}
              />}
          </section>
          <section className='expenses-container'>
            <div></div>
          </section>
          <button onClick={() => console.log(accounts)}>console log</button>
        </div>
      }
    </div>
  );
}

export default App;
