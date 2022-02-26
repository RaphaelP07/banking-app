import { useState } from 'react'

const SignInForm = ({ checkAccounts, getLoggedId, onSignIn, signUpForm }) => {
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
      alert('username does not exist')
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

  const checkEmails = checkAccounts.filter(account => {
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
            // value={email}
            onChange={(e) => setLoggedEmail(e.target.value)}
          />
        </div>
        <div className='input-container'>
          <label className='form-label'>Password</label>
          <input
            type='password'
            className='password-input one-line'
            // value={accNumber}
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