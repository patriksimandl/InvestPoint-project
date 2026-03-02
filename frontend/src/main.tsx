import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router'
import './index.css'
import App from './App.tsx'
import { QueryClient , QueryClientProvider} from '@tanstack/react-query'
import { handleRateLimitError } from './shared/rateLimitHandler'


const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      onError: (error: any) => {
        handleRateLimitError(error);
      },
    },
    mutations: {
      onError: (error: any) => {
        handleRateLimitError(error);
      },
    },
  },
});



createRoot(document.getElementById('root')!).render(
  <QueryClientProvider client={queryClient} >
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </QueryClientProvider>
)
