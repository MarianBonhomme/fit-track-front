import React, { useState } from 'react'
import { useUser } from '../../utils/UserContext';

export default function SignupForm() {
  const {handleSignup} = useUser();
  const [pseudo, setPseudo] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');

  const submit = () => {
    if (checkPassword) {
      const user = {
        pseudo: pseudo,
        password: password,
      }
      handleSignup(user)
    } else {
      setError('Password non identiques')
    }
    
  }

  const checkPassword = () => {
    return password === confirmPassword
  }

  return (
    <div className='p-20 flex flex-col gap-5'>
      <input type="text" placeholder="Pseudo" value={pseudo} onChange={(e) => setPseudo(e.target.value)} />
      <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} />
      <input type="password" placeholder="Confirm" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} />
      <button onClick={submit} className='mx-auto px-5 py-2 bg-blue text-white rounded-3xl'>Signup</button>
      <div>{error}</div>
    </div>
  )
}