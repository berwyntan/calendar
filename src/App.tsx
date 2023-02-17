import Papa from 'papaparse'
import './App.css'
import Layout from './pages/Layout'
import useCalendarStore from './store/useCalendarStore'
import colab from './data/colab'
import xcolab from './data/xcolab'
import { useGetData } from './hooks/useGetData'

function App() {
  
  
  // const j = Papa.parse(colab)
  // console.log(j)
  // const { parseData } = useGetData()
  // const { data: colabConfirm } = parseData(colab)
  // console.log(colabConfirm)

  // let renderInfo = []
  // // @ts-ignore
  // for (const booking of colabConfirm) {
  //   // @ts-ignore
  //   const checkMonth = booking?.date.split('-')[1]
  //   const m = 12 // to get store state
  //   // @ts-ignore
  //   const checkYear = booking?.date.split('-')[0]
  //   const y = 2022 // to get store state
  //   if (checkMonth === m.toString() && checkYear === y.toString()) {
  //     renderInfo.push(booking)
  //   }
  // }
  // console.log(renderInfo)
  

  return (
    <div className="App">
      <Layout />
    </div>
  )
}

export default App
