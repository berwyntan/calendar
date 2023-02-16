import Papa from 'papaparse'
import './App.css'
import Layout from './pages/Layout'
import useCalendarStore from './store/useCalendarStore'
import colab from './data/colab'
import xcolab from './data/xcolab'
import { useGetData } from './hooks/useGetData'

function App() {
  const month = useCalendarStore((state) => state.month)
  
  // const j = Papa.parse(colab)
  // console.log(j)
  const { parseData } = useGetData()
  const colabConfirm = parseData(colab)
  console.log(colabConfirm)

  let renderInfo = []
  for (const booking of colabConfirm.data) {
    // @ts-ignore
    const checkMonth = booking[2].split('-')[1]
    const m = 11
    // @ts-ignore
    const checkYear = booking[2].split('-')[0]
    const y = 2022
    if (checkMonth === m.toString() && checkYear === y.toString()) {
      renderInfo.push(booking)
    }
  }
  // console.log(renderInfo)
  

  return (
    <div className="App">
      <Layout />
    </div>
  )
}

export default App
