import Papa from 'papaparse'

export const useGetData = () => {

    const parseData = (csv: string) => {
        // csv to array
        const { data } = Papa.parse(csv, { header: true })        
        
        // separate headers from data
        // const headers = data[0]        
        // data.shift()
        console.log(data)
        return { data }
    }
    
    return { parseData }
}

