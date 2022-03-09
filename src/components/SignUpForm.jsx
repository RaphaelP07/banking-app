import { useState, useContext } from 'react'
import { Link, useNavigate } from 'react-router-dom'

import { GlobalContext } from '../context/GlobalState'

const SignUpForm = ({ backToSignIn }) => {
  const { accounts, addAccount } = useContext(GlobalContext)
  let navigate = useNavigate()

  const [firstName, setFirstName] = useState('')
  const [lastName, setLastName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [accAmount, setAccAmount] = useState('')
  const [accNumber, setAccNumber] = useState('')
  const [id, setId] = useState(accounts.length+1)
  const [transactions, setTransactions] = useState([])
  const [isAdmin, setIsAdmin] = useState(false)

  let currentAccounts = (accounts)
  
  const signUp = (e) => {
    e.preventDefault()
    generateAccNumber()

    if (firstName === ('')) {
      alert('Please add your name')
      return
    }

    if (confirmPassword !== password) {
      alert('password confirmation incorrect')
      return
    }

    if (accAmount < 1000) {
      alert('minimum initial deposit is PHP1,000')
      return
    }

    if (accAmount > 100000) {
      alert('maximum initial deposit is PHP100,000')
      return
    }

    const newAccount = {
      accAmount: +accAmount,
      accNumber: accNumber,
      isAdmin: isAdmin,
      email: email,
      firstName: firstName,
      id: id,
      lastName: lastName,
      password: password,
      transactions: transactions,
    }

    addAccount(newAccount)
    currentAccounts.push(newAccount)
    localStorage.setItem("bankaccounts", JSON.stringify(currentAccounts))


    navigate('/banking-app')


    setFirstName('')
    setLastName('')
    setEmail('')
    setPassword('')
    setConfirmPassword('')
    setAccNumber('')
  }
  
  const generateAccNumber = () => {
    let d
    d = new Date()
    const year = d.getFullYear()-2000
    const date = d.getDate() > 9 ? d.getDate() : '0'.concat(d.getDate())
    const month = d.getMonth()+1 > 9 ? d.getMonth() : '0'.concat(d.getMonth()+1)
    const hours = d.getHours() > 9 ? d.getHours() : '0'.concat(d.getHours())
    const minutes = d.getMinutes() > 9 ? d.getMinutes() : '0'.concat(d.getMinutes())
    const seconds = d.getSeconds() > 9 ? d.getSeconds() : '0'.concat(d.getSeconds())
    const random = Math.floor(Math.random()*999)
    const last =
    random < 10 ? 
    '00'.concat(random) : 
    random < 100 ?
    '0'.concat(random) :
    random
    setAccNumber(`${year}${date}${month}-${hours}${minutes}${seconds}-${last}`)
  }
  
  return (
    <div className="sign">
      <section className="sign-up-form-container"> 
        <form className="sign-in-form" onSubmit={signUp}>
          <h1 className='form-header-text'>Sign Up</h1>
          <div className='input-container'>
            <label className='form-label'>First name</label>
            <input
              type='text'
              className='first-name-input one-line'
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
            />
          </div>
          <div className='input-container'>
            <label className='form-label'>Last name</label>
            <input
              type='text'
              className='last-name-input one-line'
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
            />
          </div>
          <div className='input-container'>
            <label className='form-label'>Email</label>
            <input
              type='email'
              className='username-input one-line'
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className='input-container'>
            <label className='form-label'>Password</label>
            <input
              type='password'
              className='password-input one-line'
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <div className='input-container'>
            <label className='form-label'>Confirm Password</label>
            <input
              type='password'
              className='confirm-password-input one-line'
              onChange={(e) => setConfirmPassword(e.target.value)}
            />
          </div>
          <div className="input-container">
            <label className='form-label'>Initial Deposit</label>
            <input
              type='number'
              className='confirm-password-input one-line'
              step={.01}
              value={accAmount}
              onChange={(e) => setAccAmount(e.target.value)}
            />
          </div>
          <div className="form-buttons-container"> 
            <input 
              type='submit' 
              value='SIGN UP' 
              className='sign-in-button form-button' 
              onClick={generateAccNumber}
            />
            <Link to="/banking-app">
              <button 
                className="cancel-sign-up form-button" 
                onClick={backToSignIn}>
                  CANCEL
              </button>
            </Link>
          </div>
        </form>
      </section>
    </div>
  )
}

export default SignUpForm