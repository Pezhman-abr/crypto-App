import React, { useEffect, useState } from 'react'
import { getCoinList } from '../../services/cryptoApi'
import TableCoin from "../modules/TableCoin"
import Pagination from '../modules/Pagination'
import Search from '../modules/Search'
import Chart from '../modules/Chart'

function HomePage() {
    const [coins, setCoins] = useState([])
    const [page, setPage] = useState(1)
    const [currency, setCurrency] = useState("usd")
    const [chart, setChart] = useState(null)

    const [isLoading, setIsLoading] = useState(true)
    useEffect(() => {
      setIsLoading(true)
        const getData = async () => {
          try {
            const res = await fetch(getCoinList(page , currency))
          const json = await res.json()
          setCoins(json)
          setIsLoading(false)
          } catch (error) {
            console.log("can not fetch data in API");
            
          }
        }
        getData()
    },[page,currency])
    
  return (
    <>
    <Search currency={currency} setCurrency={setCurrency} ></Search>
    <div>
      <TableCoin currency={currency} coins={coins} isLoading={isLoading} setChart={setChart} />
    </div>
    <Pagination page={page} setPage={setPage} />
    {!!chart && <Chart chart={chart} setChart={setChart} />}
    </>
  )
}

export default HomePage