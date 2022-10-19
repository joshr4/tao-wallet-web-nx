import TaoWallet = require('tao-wallet')
import { environment } from '../environments/environment';
import { Addresses, Currencies } from './types';

const { lnmSecret, network } = environment

const initializeTao = () => {
  const tao = new TaoWallet({ lnmSecret, network })

  const login = () => tao.login();
  
  // Create an invoice to deposit funds (amount in sats).
  const depositInvoice = async (): Promise<string> => {
    try {
      const depositInvoice: string = await tao.fetchDepositAddress({ type: 'bolt11', amountSats: 1000000 })
      console.log({depositInvoice});
  
      return depositInvoice;
    } catch (e) {
      console.log('error: ', e)
    }
  }
  
  // Create an on-chain address to deposit funds.
  const depositAddress = async (): Promise<string> => {
    try {
      const depositAddress: string = await tao.fetchDepositAddress({ type: 'on-chain' })
      console.log({depositAddress});
  
      return depositAddress;
    } catch (e) {
      console.log('error: ', e)
    }
  }
  
  const getBalance = async () => {
    try {
      const balances = await tao.fetchBalances()
      console.log({ balances });
  
      return balances;
    } catch (e) {
      console.log('error: ', e)
    }
  }
  
  const swap: (input: {
    from: Currencies,
    to: Currencies,
    amountUsd: number,
  }) => Promise<any> = async ({
    from,
    to,
    amountUsd,
  }) => {
    try {
      const swap = await tao.swap({ from, to, amountUsd })
      console.log({ swap })
    
      return swap;
    } catch (e) {
      console.log('error: ', e)
    }
  }
  
  const send: (input: {
    type: Addresses,
    address: string,
    amountSats?: number,
  }) => Promise<any> = async ({
    type,
    address,
    amountSats,
  }) => {
    try {
      const swap = await tao.send({ type, address, amountSats })
      console.log({ swap })
  
      return swap;
    } catch (e) {
      console.log('error: ', e)
    }
  }
  
  return {
    login,
    depositInvoice,
    depositAddress,
    getBalance,
    swap,
    send,
  }
}

export default initializeTao;
