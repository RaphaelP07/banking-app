import { useState, useContext } from 'react'
import { Link, useNavigate } from 'react-router-dom'

import { GlobalContext } from '../context/GlobalState'

const SignInForm = ({ getLoggedId, signUpForm, setIsAdmin }) => {
  const { accounts } = useContext(GlobalContext)
  let navigate = useNavigate()

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

    getLoggedId(checkEmails[0].id-1)

    if (checkEmails[0].isAdmin === false) {
      navigate('/banking-app/dashboard')
    } else {
      setIsAdmin()
      navigate('/banking-app/admin-page')
    }

    setLoggedEmail('')
    setLoggedPassword('')
  }

  const checkEmails = accounts.filter(account => {
    return account.email === loggedEmail
  })
  
  return (
    <div className="sign">
      <section className="sign-form-container"> 
        <h1 className='form-header-text'>Sign In</h1>
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
            <Link to="/banking-app/sign-up">
              <button className="sign-up form-button" onClick={() => signUpForm()}>SIGN UP</button>
            </Link>
          </div>
        </form>
      </section>
    </div>
    
  )
}

export default SignInForm