import './App.css';
import { useState } from 'react'
import SignInForm from './components/SignInForm.jsx'
import SignUpForm from './components/SignUpForm.jsx'
import AdminPage from './components/AdminPage.jsx'
import BankAccount from './components/BankAccount.jsx'
import MainButtons from './components/MainButtons.jsx'
import AccountName from './components/AccountName.jsx'
import Transactions from './components/Transactions.jsx'
import TransactionForm from './components/TransactionForm.jsx'
import ConfirmTransaction from './components/ConfirmTransaction.jsx'

import { GlobalProvider } from './context/GlobalState'

function App() {
  const [isLogged, setIsLogged] = useState(false)
  const [isAdmin, setIsAdmin] = useState(false)
  const [signUp, setSignUp] = useState(false)
  const [showTransactionForm, setShowTransactionForm] = useState(false)
  const [showConfirmPrompt, setShowConfirmPrompt] = useState(false)
  const [showTransactions, setShowTransactions] = useState(false)
  const [loggedId, setLoggedId] = useState(null)
  const [transferToAccountId, setTransferToAccountId] = useState(null)
  const [transferTo, setTransferTo] = useState(null)
  
  return (
    <GlobalProvider className="App">
      <header className="App-header">
        <p>banking app</p>
      </header>
      {!isLogged ? 
        <section className="sign-form-container">
          {!signUp ? 
            <SignInForm 
              onSignIn={() => setIsLogged(true)} 
              signUpForm={() => setSignUp(true)}
              setIsAdmin={() => setIsAdmin(true)}
              getLoggedId={(index) => setLoggedId(index)} /> 
            : <SignUpForm backToSignIn={() => setSignUp(false)} />}
        </section> 
      : 
        isAdmin ? 
        <AdminPage /> 
      : <div className='main-container'>
          <section className='account-name'>
            <AccountName loggedId={loggedId} />
          </section>
          <section className='account-container'>
            <BankAccount loggedId={loggedId} />
            <MainButtons 
              onShow={() => setShowTransactionForm(true)}
              toggleShowTransactions={() => setShowTransactions(!showTransactions)} />
          </section>
          <section className='transactions-container'>
            {showTransactionForm && 
            <TransactionForm 
              onTransact={() => setShowConfirmPrompt(true)}
              onDone={() => setShowTransactionForm(false)}
              getTransferToAccountId={(index) => setTransferToAccountId(index)}
              getTransferTo={(accNumber) => setTransferTo(accNumber)}
              loggedId={loggedId}
              />}
            {showConfirmPrompt && 
            <ConfirmTransaction 
            onDone={() => setShowTransactionForm(false)}
            onTransact={() => setShowConfirmPrompt(false)}
            loggedId={loggedId}
            transferId={transferToAccountId} />
            }
          </section>
          <section className='expenses-container'>
            {showTransactions && <Transactions loggedId={loggedId}/>}
          </section>
        </div>}
    </GlobalProvider>
  );
}

export default App;
