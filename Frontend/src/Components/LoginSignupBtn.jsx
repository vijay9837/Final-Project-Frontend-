import React from 'react'

const LoginSignupBtn = ({type,name,css}) => {
  return (
    <button className={` outline-0 ${css} `} type={type}>{name}</button>
  )
}

export default LoginSignupBtn