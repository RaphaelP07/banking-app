import { useState } from 'react'

const SignUpForm = ({ checkAccounts, backToSignIn, onSignUp }) => {
  const [firstName, setFirstName] = useState('')
  const [lastName, setLastName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [accAmount, setAccAmount] = useState(0.00)
  const [accNumber, setAccNumber] = useState('')
  const [id, setId] = useState(checkAccounts.length+1)
  const [transactions, setTransactions] = useState([])

  const signUp = (e) => {
    e.preventDefault()

    if (firstName === ('')) {
      alert('Please add your name')
      return
    }

    onSignUp({ firstName, lastName, email, password, accAmount, accNumber, id, transactions })

    setFirstName('')
    setLastName('')
    setEmail('')
    setPassword('')
    setAccNumber('')

    backToSignIn()
  }

  const generateAccNumber = () => {
    let d
    d = new Date()
    const year = d.getFullYear()-2000
    const date = d.getDate()
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
    <div>
      <form className="sign-in-form" onSubmit={signUp}>
        <div className='input-container'>
          <label className='form-label'>First name</label>
          <input
            type='text'
            className='first-name-input one-line'
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
            required
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
            required
          />
        </div>
        <div className='input-container'>
          <label className='form-label'>Password</label>
          <input
            type='password'
            className='password-input one-line'
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <div className='input-container'>
          <label className='form-label'>Confirm Password</label>
          <input
            type='password'
            className='confirm-password-input one-line'
            required
          />
        </div>
        <div className="form-buttons-container">
          <input 
            type='submit' 
            value='SIGN UP' 
            className='sign-in-button form-button' 
            onClick={generateAccNumber} 
          />
          <button 
            className="cancel-sign-up form-button" 
            onClick={backToSignIn}>
              CANCEL
          </button>
        </div>
      </form>
    </div>
  )
}

export default SignUpForm