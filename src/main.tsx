import React from 'react'
import ReactDOM from 'react-dom/client'
import { ChakraProvider, extendTheme } from '@chakra-ui/react'
import App from './App.tsx'

const override = extendTheme({
  fonts: {
    body: "Inter Tight, sans-serif",
    heading: "Inter Tight, sans-serif",
    poppins: "Poppins",
  },

  styles: {
    global:
     {
      body: {
        color: "#221E41"
      }
     }
  }
});

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <ChakraProvider theme={override}>
      <App />
    </ChakraProvider>
  </React.StrictMode>,
)
