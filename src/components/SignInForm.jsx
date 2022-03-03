import { useState, useContext } from 'react'

import { GlobalContext } from '../context/GlobalState'

const SignInForm = ({ getLoggedId, onSignIn, signUpForm }) => {
  const { accounts } = useContext(GlobalContext)

  const [loggedEmail, setLoggedEmail] = useState('')
  const [loggedPassword, setLoggedPassword] = useState('')

  const signIn = (e) => {
    e.preventDefault()

    if (loggedEmail === ('')) {
      alert('Please enter your email')
      return
    }

    if (loggedPassword === ('')) {
      alert('Please enter your password')
      return
    }

    if (checkEmails.length === 0) {
      alert('email does not exist')
      return
    }

    if (checkEmails[0].password !== loggedPassword) {
      alert('password is incorrect')
      return
    }

    onSignIn()
    getLoggedId(checkEmails[0].id-1)

    setLoggedEmail('')
    setLoggedPassword('')
  }

  const checkEmails = accounts.filter(account => {
    return account.email === loggedEmail
  })
  
  return (
    <div>
      <form className="sign-in-form" onSubmit={signIn}>
        <div className='input-container'>
          <label className='form-label'>Email</label>
          <input
            type='email'
            className='username-input one-line'
            onChange={(e) => setLoggedEmail(e.target.value)}
          />
        </div>
        <div className='input-container'>
          <label className='form-label'>Password</label>
          <input
            type='password'
            className='password-input one-line'
            onChange={(e) => setLoggedPassword(e.target.value)}
          />
        </div>
        <div className="form-buttons-container">
          <input type='submit' value='SIGN IN' className='sign-in-button form-button' />
          <button className="sign-up form-button" onClick={signUpForm}>SIGN UP</button>
        </div>
      </form>
    </div>
  )
}

export default SignInForm