# Cryptocurrency Trading Indicators
Provide trading technical indicator values based on market data of almost crypto currency exchanges


## Install

Comming soon

## Sample Code
### Create indicators
  - Constructor:
    - exchange
    - symbol
    - interval
    - isFuture : true if future exchange (default is false, means that spot exchange)
```javascript
  import { Indicators } from 'cryptocurrency-trading-indicators'
  const indicators = new Indicators("binance", "BTC/USDT", "15m", true)
```

### EMA

 ### EMA (Exponential Moving Average)
   - Parameters:
      - period: integer
      - ohlcvType: OHLCV_TYPE
  ```javascript
    let emaData = await indicators.EMA(8, OHLCV_TYPE.O)
    console.log(emaData[emaData.length - 1])
  ```