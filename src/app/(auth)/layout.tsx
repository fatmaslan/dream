import React from 'react'



interface AuthLayoutProps {
    children: React.ReactNode;
  }

const Authlayout = ({ children }: AuthLayoutProps) => {
  return (

    <div className='flex flex-col items-center justify-center h-screen bg-gradient-to-b from-pink-100 to-pink-100'>
     {children}
    </div>

  )
}

export default Authlayout