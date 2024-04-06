import React, { useState } from 'react'
import { useUser } from '../../utils/UserContext';
import { useNavigate } from 'react-router-dom';

export default function SigninForm() {
  const navigate = useNavigate()
  const {handleSignin} = useUser();
  const [pseudo, setPseudo] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const submit = () => {
    const user = {
      pseudo: pseudo,
      password: password,
    }
    try {
      handleSignin(user)
      navigate("/nutrition")
    } catch (error) {
      setError('Invalid pseudo or password')
    }
  }

  return (
    <div className='p-20 flex flex-col gap-5'>
      <input type="text" placeholder="Pseudo" value={pseudo} onChange={(e) => setPseudo(e.target.value)} />
      <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} />
      <button onClick={submit} className='mx-auto px-5 py-2 bg-blue text-white rounded-3xl'>Signin</button>
      <div>{error}</div>
    </div>
  )
}