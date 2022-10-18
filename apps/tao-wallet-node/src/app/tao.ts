import TaoWallet = require('tao-wallet')
import { environment } from '../environments/environment';

const { lnmSecret, network } = environment

async function go() {
    try {
        const tao = new TaoWallet({ lnmSecret, network })

        // Login.
        await tao.login()

        // Create an invoice to deposit funds (amount in sats).
        const depositInvoice = await tao.fetchDepositAddress({ type: 'bolt11', amountSats: 1000000 })
        console.log(depositInvoice)

        // Create an on-chain address to deposit funds.
        const depositAddress = await tao.fetchDepositAddress({ type: 'on-chain' })
        console.log(depositAddress)

        // Get balances.
        const balances = await tao.fetchBalances()
        console.log(balances)

        // Swap btc for $2 of usd.
        await tao.swap({ from: 'btc', to: 'usd', amountUsd: 2 })

        // Swap $1 of usd for btc.
        await tao.swap({ from: 'usd', to: 'btc', amountUsd: 1 })

        // Send funds from your tao wallet to a lightning invoice.
        const invoice = 'lnbc1....'
        await tao.send({ type: 'bolt11', address: invoice })

        // Send 100,000 sats from your tao wallet to an on-chain address.
        const onchainAddress = 'bc1...'
        await tao.send({ type: 'on-chain', address: onchainAddress, amountSats: 100000 })
    } catch (e) {
        // .login() response: 403, data: { code: 'Your country is not allowed to use LN Markets' }
        console.log(e)
    }
}

go()
