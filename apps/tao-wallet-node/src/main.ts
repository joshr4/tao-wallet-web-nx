import express = require('express')
import { environment } from './environments/environment'
import initializeTao from './app/tao-wallet-adapter';

const port = environment.port || 3000;

const { 
  login,
  depositInvoice,
  depositAddress,
  getBalance,
  swap,
  send,
} = initializeTao()
const app = express()

app.get('/login', async (req, res) => {
  const loginRes = await login()
  
  res.status(201)
  return res.json({ ...loginRes });
});

app.get('/depositInvoice', async (req, res) => {
  const invoice = await depositInvoice()
  
  res.status(201)
  return res.json({ invoice });
});

app.get('/depositAddress', async (req, res) => {
  const address = await depositAddress()
  
  res.status(201)
  return res.json({ address });
});

app.get('/getBalance', async (req, res) => {
  const getBalanceRes = await getBalance()
  
  res.status(201)
  return res.json({ ...getBalanceRes });
});

app.get('/swap', async (req, res) => {
  const swapRes = await swap({ from: 'usd', to: 'btc', amountUsd: 1 })

  res.status(201)
  return res.json({ ...swapRes });
});

// TODO - fix error
// error:  RestError [LNMarketsRestError]: invoice should match pattern "^[a-zA-Z0-9]+$"
app.get('/send', async (req, res) => {
  const invoice = 'lnbc1....';
  const sendRes = await send({ type: 'bolt11', address: invoice });

  res.status(201)
  return res.json({ ...sendRes });
});

app.listen(port, () => {
  console.log(`Tao node server listening on port ${port}`)
})