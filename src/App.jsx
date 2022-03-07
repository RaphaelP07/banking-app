import './App.css';
import { useState } from 'react'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
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
  const [showTransactionForm, setShowTransactionForm] = useState(false)
  const [showConfirmPrompt, setShowConfirmPrompt] = useState(false)
  const [showTransactions, setShowTransactions] = useState(false)
  const [loggedId, setLoggedId] = useState(null)
  const [transferToAccountId, setTransferToAccountId] = useState(null)
  const [transferTo, setTransferTo] = useState(null)
  
  return (
    <Router>
      <GlobalProvider className="App">
        <header className="App-header">
          <p>banking app</p>
        </header>
        <Routes>
          <Route
            path= '/banking-app'
            element={<SignInForm onSignIn={() => setIsLogged(true)} setIsAdmin={() => setIsAdmin(true)} getLoggedId={(index) => setLoggedId(index)} /> }
          />
          <Route
            path= 'banking-app/sign-up'
            element={<SignUpForm />}
            />
            <Route
              path= 'banking-app/admin-page'
              element={<AdminPage isAdmin={isAdmin} /> }
            />
          <Route
            path= 'banking-app/dashboard'
            element={
            <div className='main-container'>
                <AccountName loggedId={loggedId} />
              <section className='account-container'>
                <BankAccount loggedId={loggedId} />
                <MainButtons onShow={() => setShowTransactionForm(true)} toggleShowTransactions={() => setShowTransactions(!showTransactions)} />
              </section>
              <section className='transactions-container'>
                {showTransactionForm && <TransactionForm onTransact={() => setShowConfirmPrompt(true)} onDone={() => setShowTransactionForm(false)} getTransferToAccountId={(index) => setTransferToAccountId(index)} getTransferTo={(accNumber) => setTransferTo(accNumber)} loggedId={loggedId} />}
                {showConfirmPrompt && <ConfirmTransaction onDone={() => setShowTransactionForm(false)} onTransact={() => setShowConfirmPrompt(false)} loggedId={loggedId} transferId={transferToAccountId} />}
              </section>
              <section className='expenses-container'>
                {showTransactions && <Transactions loggedId={loggedId}/>}
              </section>
            </div>}
          />
        </Routes>
      </GlobalProvider>
    </Router>  
  );
}

export default App;
