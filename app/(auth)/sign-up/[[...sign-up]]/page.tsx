import { SignUp } from '@clerk/nextjs'
import React from 'react'

const SignUpPage = () => {
  return (
    <SignUp forceRedirectUrl={"/"}/>
    )
}

export default SignUpPage