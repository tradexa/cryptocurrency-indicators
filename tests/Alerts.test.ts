import { Alerts } from '../src/index'

describe('Alerts', () => {
  let smaCross: Alerts.Cross
  let emaCross: Alerts.Cross
  beforeAll(() => {
    smaCross = new Alerts.SMACross(50, 200, 'binance', 'BTC/USDT', '15m')
    emaCross = new Alerts.EMACross(50, 200, 'binance', 'BTC/USDT', '15m')
  })

  it('SMA', async () => {
    const goldenCross = await smaCross.goldenCross()
    console.log(`Golden Cross: ${goldenCross}`)

    const deathCross = await smaCross.deathCross()
    console.log(`Death Cross: ${deathCross}`)
  })

  it('EMA', async () => {
    const goldenCross = await emaCross.goldenCross()
    console.log(`Golden Cross: ${goldenCross}`)

    const deathCross = await emaCross.deathCross()
    console.log(`Death Cross: ${deathCross}`)
  })
})
