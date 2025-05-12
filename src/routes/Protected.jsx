import React from 'react'
import { useSelector } from 'react-redux'
import { Navigate } from 'react-router-dom'

const Protected = ({children}) => {
    const { isAuthenticated } = useSelector((state) => state.auth)

    return  isAuthenticated ? children : <Navigate to="/admin/login" replace />
}

export default Protected

