import TaoWallet = require('tao-wallet')
import { environment } from '../environments/environment';
import { Addresses, Currencies } from './types';

const { lnmSecret, network } = environment

const initializeTao = () => {
  const tao = new TaoWallet({ lnmSecret, network })

  const login = () => tao.login();
  
  // Create an invoice to deposit funds (amount in sats).
  const depositInvoice = (input: { type: Addresses; amountSats: number }): Promise<string> => tao.fetchDepositAddress(input)
  // Create an on-chain address to deposit funds.
  const depositAddress = (input: { type: Addresses }): Promise<string> => tao.fetchDepositAddress(input)
  
  const getBalance = (): Promise<{
    balanceBtc: number;
    balanceUsd: number;
    btcEquivalent: string;
    usdEquivalent: string;
  }> => tao.fetchBalances()
  
  const swap = (input: {
    from: Currencies,
    to: Currencies,
    amountUsd: number,
  }): Promise<any> => tao.swap(input)
  
  const send = (input: {
    type: Addresses,
    address: string,
    amountSats?: number,
  }): Promise<any> => tao.send(input)
  
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
