
import React, { useContext, useEffect, useState } from 'react';
import { TailSpin } from  'react-loader-spinner'
import './WalletInfo.css'
import { useWallet, WalletStatus } from '@terra-money/wallet-provider';
const axios = require('axios').default;


export default function WalletInfo(props) {
    const [loaded, setLoaded] = useState(false);
    const {
        status,
        network,
        wallets,
        availableConnectTypes,
        availableInstallTypes,
        availableConnections,
        supportFeatures,
        connect,
        install,
        disconnect,
      } = useWallet();

    return (
            <div className='wallet-info-container'>
                <div className='wallet-info-item-container'>
                <>
                    <div className='wallet-info-value'>
                    {
                        status!==WalletStatus.WALLET_CONNECTED?'Connect Wallet':wallets[0].terraAddress.substring(0,5)+'...'+wallets[0].terraAddress.substring(wallets[0].terraAddress.length-7,wallets[0].terraAddress.length)
                    }
                    </div>
                    {
                        (status===WalletStatus.WALLET_CONNECTED)&&
                        <div className='disconnect-button' onClick={() => disconnect()}>&#10005;</div>
                    }
                    {
                        (status!==WalletStatus.WALLET_CONNECTED)&&
                        <div className='connect-button' onClick={() => connect('EXTENSION')}>&#10148;</div>
                    }
                </>
                </div>
            </div>
    )
}