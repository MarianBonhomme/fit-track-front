import React, { useEffect, useState } from 'react'
import SigninForm from '../components/auth/SigninForm';
import SignupForm from '../components/auth/SignupForm';

export default function AuthPage() {
  const [isSignin, setIsSignin] = useState(true);

  return (
    <div className='flex flex-col items-center'>
      {isSignin ? (
        <>
          <SigninForm />
          <div onClick={() => setIsSignin(false)}>
            Pas encore de compte ?
            <span className='text-blue cursor-pointer'> Créer un compte</span>
          </div>
        </>
      ) : (
        <>
          <SignupForm />
          <div onClick={() => setIsSignin(true)}>
            Vous avez déjà un compte ?
            <span className='text-blue cursor-pointer'> Se connecter</span>
          </div>
        </>
      )}
    </div>
  )
}