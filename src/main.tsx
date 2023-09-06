import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'

import { createBrowserRouter, RouterProvider } from "react-router-dom"
import ProgressStepper from './components/ProgressStepper.tsx'
import data from "./assets/data.json"
import BinaryQuestion from './components/BinaryQuestion.tsx'
import { SnackbarProvider } from 'notistack'

const router = createBrowserRouter([
  {
    path: "/",
    element: <ProgressStepper
      steps={data.map((datum, index) => {
        return <BinaryQuestion key={`question-${index}`} displayHelp={false} setDisplayHelp={() => {}} data={datum} canMove={false} setCanMove={() => { }} />
      })} />
  }
])

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <SnackbarProvider 
      anchorOrigin={{
        vertical: "top",
        horizontal: "center"
      }}
    >
      <RouterProvider router={router} />
    </SnackbarProvider>
  </React.StrictMode>,
)
