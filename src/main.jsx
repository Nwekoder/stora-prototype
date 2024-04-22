/* eslint-disable react-refresh/only-export-components */
import React, { Suspense, lazy } from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import { RouterProvider, createBrowserRouter } from 'react-router-dom'

import LoginPage from './pages/LoginPage'
const DashboardPage = lazy(async () => import('@/pages/DashboardPage'))
const InventoryPage = lazy(async () => import('@/pages/InventoryPage'))
const TransactionPage = lazy(async () => import('@/pages/TransactionPage'))
const AddTransactionPage = lazy(async () => import('@/pages/AddTransactionPage'))
const SettingsPage = lazy(async () => import('@/pages/SettingsPage'))

import AppLayout from '@/components/AppLayout'
import Loading from '@/components/Loading'

const router = createBrowserRouter([
  {
    path: '/',
    element: <LoginPage />
  },
  {
    path: '/app',
    element: <AppLayout />,
    children: [
      {
        path: '/app/dashboard',
        element: <Suspense fallback={<Loading />}><DashboardPage /></Suspense>
      },
      {
        path: '/app/inventory',
        element: <Suspense fallback={<Loading />}><InventoryPage /></Suspense>
      },
      {
        path: '/app/transaction',
        element: <Suspense fallback={<Loading />}><TransactionPage /></Suspense>
      },
      {
        path: '/app/transaction/add',
        element: <Suspense fallback={<Loading />}><AddTransactionPage /></Suspense>
      },
      {
        path: '/app/settings',
        element: <Suspense fallback={<Loading />}><SettingsPage /></Suspense>
      },
    ]
  }
])

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
)
