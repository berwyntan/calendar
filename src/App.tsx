import Papa from 'papaparse'
import './App.css'
import Layout from './pages/Layout'
import useCalendarStore from './store/useCalendarStore'
import colab from './data/colab'

function App() {
  const month = useCalendarStore((state) => state.month)
  
  const j = Papa.parse(colab)
  console.log(j)

  return (
    <div className="App">
      <Layout />
    </div>
  )
}

export default App
