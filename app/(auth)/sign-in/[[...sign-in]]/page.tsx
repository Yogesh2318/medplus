import { SignIn } from '@clerk/nextjs'
import React from 'react'

const SignInPage = () => {
  return (
    <SignIn forceRedirectUrl={"/"}/>
    )
}

export default SignInPage