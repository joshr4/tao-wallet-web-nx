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

app.get('/login', async (req, res) => login()
  .then(login => {
    res.status(200);
    return res.json({ ...login, isLoggedIn: true });
  })
  .catch(e => {
    console.log('tao-wallet error: ', e)
    res.status(500);
    return res.json({ error: e.message });
  })
);

app.get('/depositInvoice', async (req, res) => depositInvoice({ type: 'bolt11', amountSats: 1000000 })
  .then(invoice => {
    res.status(200);
    return res.json({ invoice });
  })
  .catch(e => {
    console.log('tao-wallet error: ', e)
    res.status(500);
    return res.send//.json({ error: e.message });
  })
);

app.get('/depositAddress', async (req, res) => depositAddress({ type: 'on-chain' })
  .then(address => {
    res.status(200);
    return res.json({ address });
  })
  .catch(e => {
    console.log('tao-wallet error: ', e)
    res.status(500);
    return res.json({ error: e.message });
  })
);

app.get('/getBalance', async (req, res) => getBalance()
  .then(balance => {
    res.status(200);
    return res.json(balance);
  })
  .catch(e => {
    console.log('tao-wallet error: ', e)
    res.status(500);
    return res.json({ error: e.message });
  })
);

app.get('/swap', async (req, res) => swap({ from: 'usd', to: 'btc', amountUsd: 1 })
  .then(swap => {
    res.status(200);
    return res.json(swap);
  })
  .catch(e => {
    console.log('tao-wallet error: ', e)
    res.status(500);
    return res.json({ error: e.message });
  })
);

// TODO - fix error
// error:  RestError [LNMarketsRestError]: invoice should match pattern "^[a-zA-Z0-9]+$"
const invoice = 'lnbc1....';
app.get('/send', async (req, res) => send({ type: 'bolt11', address: invoice })
  .then(send => {
    res.status(200);
    return res.json(send);
  })
  .catch(e => {
    console.log('tao-wallet error: ', e)
    res.status(500);
    return res.json({ error: e.message });
  })
);

app.listen(port, () => {
  console.log(`Tao node server listening on port ${port}`)
})