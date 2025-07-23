import { DNA } from 'react-loader-spinner'

import chrtUp from "../../assets/chart-up.svg"
import chrtDown from "../../assets/chart-down.svg"

import styles from "./TableCoin.module.css"
import { marketChart } from '../../services/cryptoApi'

function TableCoin({currency, coins , isLoading, setChart}) {
  

  return (
    <div className={styles.container}>
      {isLoading ? <DNA width="200" height="200" /> : 
      <table className={styles.table}>
        <thead>
          <tr>
            <th>Coin</th>
            <th>Name</th>
            <th>Price</th>
            <th>24h</th>
            <th>Total Volume</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {coins.map((coin) => (
            <TableRow currency={currency} coin={coin} key={coin.id} setChart={setChart} />
          ))}
        </tbody>
      </table>
      }
    </div>
  )
}

export default TableCoin

const TableRow = ({setChart, currency, coin: {id ,image, name, symbol, current_price, total_volume, price_change_percentage_24h : price_change}}) => {

  const currencySymbols = {
      usd: "$",
      eur: "€",
      jpy: "¥"
  }
  const showCoinData = async () =>{
    try {
      const res = await fetch(marketChart(id))
      const json = await res.json()
      setChart(json)
    } catch (error) {
      setChart(null)
    }

    
    
  }
  
  return(
    <tr>
            <td>
              <div className={styles.symbol} onClick={showCoinData}>
                <img src={image} alt={name} />
                <span>{symbol.toUpperCase()}</span>
              </div>
            </td>
            <td>{name}</td>
            <td>{currencySymbols[currency]} {current_price.toLocaleString()}</td>
            <td className={price_change > 0 ? styles.green : styles.red}>{price_change.toFixed(2)} %</td>
            <td>{currencySymbols[currency]} {total_volume.toLocaleString()}</td>
            <td>{price_change < 0 ? <img src={chrtDown}/> : <img src={chrtUp}/> }</td>
            </tr>
  )
}