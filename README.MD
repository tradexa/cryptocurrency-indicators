# Cryptocurrency Trading Indicators
Provide trading technical indicator values based on market data of almost crypto currency exchanges


## Installation

`$ npm install cryptocurrency-trading-indicators`
## Available Indicators
Boilinger Bands, EMA, MACD, RSI, SMA, WMA

## Supported exchanges
  - https://github.com/ccxt/ccxt#certified-cryptocurrency-exchanges
  - https://github.com/ccxt/ccxt#supported-cryptocurrency-exchange-markets

## Supported interval
  - 1m : 1 minute
  - 5m: 5 minutes
  - 15m: 15 minutes
  - 30m: 30 minutes
  - 45m: 45 minutes
  - 1h : 1 hour
  - 2h : 2 hours
  - 4h : 4 hours
  - 1d : 1 day
  - 1w : 1 week
  - 1M : 1 month

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

### EMA (Exponential Moving Average)
  - Parameters:
    - period: integer
    - ohlcvType: OHLCV_TYPE
```javascript
  const emaData = await indicators.EMA(8, OHLCV_TYPE.O)
  console.log(emaData)
```

### SMA (Simple Moving Average)
  - Parameters:
    - period: integer
    - ohlcvType: OHLCV_TYPE
```javascript
  const smaData = await indicators.SMA(8, OHLCV_TYPE.O)
  console.log(smaData)
```

### RSI
  - Parameters:
    - period: integer
    - ohlcvType: OHLCV_TYPE
```javascript
  const rsiData = await indicators.RSI(14, OHLCV_TYPE.O)
  console.log(rsiData)
```