import { OHLCV_TYPE } from '../Enums'
import Indicators from '../Indicators'
import Utils from '../Utils'

export abstract class Cross {
  protected fastPeriod: number
  protected slowPeriod: number
  protected exchangeId: string
  protected symbol: string
  protected interval: string
  protected isFuture: boolean

  protected indicators: Indicators

  constructor (fastPeriod: number, slowPeriod: number, exchangeId: string, symbol: string, interval: string, isFuture = false) {
    this.fastPeriod = fastPeriod
    this.slowPeriod = slowPeriod
    this.exchangeId = exchangeId
    this.symbol = symbol
    this.interval = interval
    this.isFuture = isFuture
    this.indicators = new Indicators(exchangeId, symbol, interval, isFuture)
  }

  public abstract goldenCross (): Promise<boolean>
  public abstract deathCross (): Promise<boolean>
}

export class SMACross extends Cross {
  constructor (fastPeriod: number, slowPeriod: number, exchangeId: string, symbol: string, interval: string, isFuture = false) {
    super(fastPeriod, slowPeriod, exchangeId, symbol, interval, isFuture)
  }

  public async goldenCross () {
    const fastValues = await this.indicators.SMA(this.fastPeriod, OHLCV_TYPE.C)
    const slowValues = await this.indicators.SMA(this.slowPeriod, OHLCV_TYPE.C)
    return Utils.crossOver(fastValues, slowValues)
  }

  public async deathCross () {
    const fastValues = await this.indicators.SMA(this.fastPeriod, OHLCV_TYPE.C)
    const slowValues = await this.indicators.SMA(this.slowPeriod, OHLCV_TYPE.C)
    return Utils.crossUnder(fastValues, slowValues)
  }
}

export class EMACross extends Cross {
  constructor (fastPeriod: number, slowPeriod: number, exchangeId: string, symbol: string, interval: string, isFuture = false) {
    super(fastPeriod, slowPeriod, exchangeId, symbol, interval, isFuture)
  }

  public async goldenCross () {
    const fastValues = await this.indicators.EMA(this.fastPeriod, OHLCV_TYPE.C)
    const slowValues = await this.indicators.EMA(this.slowPeriod, OHLCV_TYPE.C)
    return Utils.crossOver(fastValues, slowValues)
  }

  public async deathCross () {
    const fastValues = await this.indicators.EMA(this.fastPeriod, OHLCV_TYPE.C)
    const slowValues = await this.indicators.EMA(this.slowPeriod, OHLCV_TYPE.C)
    return Utils.crossUnder(fastValues, slowValues)
  }
}
