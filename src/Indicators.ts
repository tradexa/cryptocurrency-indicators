import * as CCXT from 'ccxt'
import * as indicators from 'technicalindicators'
import { MACDInput } from 'technicalindicators/declarations/moving_averages/MACD'
import { MAInput } from 'technicalindicators/declarations/moving_averages/SMA'
import { BollingerBandsInput } from 'technicalindicators/declarations/volatility/BollingerBands'
import { OHLCV_TYPE } from './Enums'

class Indicators {
  protected exchangeId: string;
  protected symbol: string;
  protected exchange: CCXT.Exchange;
  protected interval: string;
  protected isFuture: boolean;

  constructor (
    exchangeId: string,
    symbol: string,
    interval: string,
    isFuture = false
  ) {
    this.exchangeId = exchangeId
    this.symbol = symbol
    this.interval = interval
    this.isFuture = isFuture
    this._getExchange()
  }

  protected _getExchange () {
    if (!CCXT.exchanges.includes(this.exchangeId)) {
      throw new Error('Exchange is not supported')
    }

    try {
      const ExchangeClass = CCXT[this.exchangeId] as typeof CCXT.Exchange

      let exchange: CCXT.Exchange
      if (this.isFuture) {
        exchange = new ExchangeClass({
          options: {
            defaultMarket: 'future'
          }
        })
      } else {
        exchange = new ExchangeClass({})
      }
      this.exchange = exchange
    } catch (err) {
      throw new Error('Ticker is not supported')
    }
  }

  protected async _fetchOHLCV () {
    return await this.exchange.fetchOHLCV(this.symbol, this.interval)
  }

  protected async _fetchOHLCVValues (ohlcvType: OHLCV_TYPE) {
    const ohlcv = await this._fetchOHLCV()
    const values = ohlcv.map((value) => value[ohlcvType])
    return values
  }

  public async BoilingerBands (
    period: number,
    stdDev: number,
    ohlcvType: OHLCV_TYPE
  ) {
    const values = await this._fetchOHLCVValues(ohlcvType)
    const input: BollingerBandsInput = {
      period,
      stdDev,
      values
    }
    return await indicators.BollingerBands.calculate(input)
  }

  public async EMA (period: number, ohlcvType: OHLCV_TYPE) {
    const values = await this._fetchOHLCVValues(ohlcvType)
    const input: MAInput = {
      values,
      period
    }
    return await indicators.EMA.calculate(input)
  }

  public async MACD (
    fastPeriod: number,
    slowPeriod: number,
    signalPeriod: number,
    ohlcvType: OHLCV_TYPE
  ) {
    const values = await this._fetchOHLCVValues(ohlcvType)
    const input: MACDInput = {
      values,
      fastPeriod,
      slowPeriod,
      signalPeriod,
      SimpleMAOscillator: false,
      SimpleMASignal: false
    }
    return await indicators.MACD.calculate(input)
  }

  public async RSI (period: number, ohlcvType: OHLCV_TYPE) {
    const values = await this._fetchOHLCVValues(ohlcvType)
    const input: MAInput = {
      values,
      period
    }
    return await indicators.RSI.calculate(input)
  }

  public async SMA (period: number, ohlcvType: OHLCV_TYPE) {
    const values = await this._fetchOHLCVValues(ohlcvType)
    const input: MAInput = {
      values,
      period
    }
    return await indicators.SMA.calculate(input)
  }

  public async WMA (period: number, ohlcvType: OHLCV_TYPE) {
    const values = await this._fetchOHLCVValues(ohlcvType)
    const smaInput: MAInput = {
      values,
      period
    }
    return await indicators.WMA.calculate(smaInput)
  }
}

export default Indicators
