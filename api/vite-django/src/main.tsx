
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import { BrowserRouter } from "react-router";
import {Provider} from "react-redux"
import {store} from "../src/store/index.ts"

// document.documentElement.classList.add("dark");

// Автоматично додає/прибирає клас .dark залежно від системної теми
// const applyTheme = () => {
//     const isDark = window.matchMedia('(prefers-color-scheme: dark)').matches
//     document.documentElement.classList.toggle('dark', isDark)
// }
//
// applyTheme()
//
// // Слухає зміни теми в реальному часі
// window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', applyTheme)


createRoot(document.getElementById('root')!).render(
  <Provider store={store}>
    <BrowserRouter>
      <App />
    </BrowserRouter>,
  </Provider>
)
