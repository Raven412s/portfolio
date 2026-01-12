import React from 'react'

const AdminOnlyLayout = ({children}:{children: React.ReactNode}) => {
  return (
    <div>{children}</div>
  )
}

export default AdminOnlyLayout