
import { useRoutes } from 'react-router-dom'
import './App.css'
import Web from './Web'
import indexRoute from './routes'

function App() {
  const element = useRoutes(indexRoute)
  return (
    <div>
      {element}
    </div>
  )
}

export default App
