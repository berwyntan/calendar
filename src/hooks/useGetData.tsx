import Papa from 'papaparse'
import colab from '../data/colab'
import itcd from '../data/itcd'
import xcolab from '../data/xcolab'
import xitcd from '../data/xitcd'
import { bookingsType } from '../constants/types'

interface dataType {
    data: bookingsType[]
} 

export const useGetData = () => {

    const parseConfirmedData = () => {
        // csv to array
        const { data: c0 } = Papa.parse(colab, { header: true }) as dataType      
        
        const { data: i0 } = Papa.parse(itcd, { header: true }) as dataType      
                
        const data: bookingsType[] = [...c0, ...i0]
        
        return { data }
    }
    const parseCancelledData = () => {
        // csv to array
        const { data: c1 } = Papa.parse(xcolab, { header: true })        
               
        const { data: i1 } = Papa.parse(xitcd, { header: true })   

        const data = [...c1, ...i1]
        
        return { data }
    }
    
    return { parseConfirmedData, parseCancelledData }
}

