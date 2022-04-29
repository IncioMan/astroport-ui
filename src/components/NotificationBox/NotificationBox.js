import {React, useEffect, useState } from 'react';
import { TailSpin } from  'react-loader-spinner'
import { TxAPI } from '@terra-money/terra.js';
import { useLCDClient, useWallet } from '@terra-money/wallet-provider';
import './NotificationBox.css'
import tokens from '../../data/tokens.js'

export default function NotificationBox(props) {
    const {txHash, onClose} = props
    const [txVerifed, setTxVerifed] = useState(false)
    const [content, setContent] = useState('')
    const lcd = useLCDClient();

    const {network} = useWallet();
    const [tokensInfo, setTokensInfo] = useState(tokens[network.name])

    useEffect(()=>{
        setTokensInfo(tokens[network.name])
    },[network])


    const fetchTxInfo = () =>{
        lcd.tx.txInfo(txHash).then((res)=>{
                setTxVerifed(true)
                const assetRequested = tokensInfo[res.logs[0].events[3].attributes.find(element => element.key==='ask_asset').value].symbol
                const assetGiven =  tokensInfo[res.logs[0].events[3].attributes.find(element => element.key==='offer_asset').value].symbol
                const amountGiven = res.logs[0].events[3].attributes.find(element => element.key==='offer_amount').value/1000000
                const amountReturned = Math.round(res.logs[0].events[3].attributes.find(element => element.key==='return_amount').value/1000000*100)/100
                setContent("You swapped "+amountGiven+" "+assetGiven+
                            " for "+amountReturned+" "+assetRequested)
            }).catch(function (error) {
                console.log("retrying", error)
                new Promise(r => setTimeout(fetchTxInfo, 3000))
            })}

    useEffect(()=>{
        setTxVerifed(false)
        fetchTxInfo()
    },[txHash])

    return (
        <>
        {(!txVerifed)&&
            (<div className='msg-box loading-box loading' >
                <a target="_blank" href={'https://terrasco.pe/'+network.name+'/tx/'+txHash}>
                    <div className='type-msg loading'>
                    Validating tx:
                    </div>
                </a>
                <div className='msg-content'>
                    <TailSpin className="loading-tx" height="20" width="20" color='#ffffff'ariaLabel='loading'/>
                </div>
                <button className='close-notification-button loading loading-box' onClick={()=>onClose(txHash)}>&#10005;</button>
            </div>)
        }
        {
        (txVerifed) &&
            (<div className='msg-box success-box success'>
                <a target="_blank" href={'https://terrasco.pe/'+network.name+'/tx/'+txHash}>
                    <div className='type-msg success'>
                    Success:
                    </div>
                </a>
                <div className='msg-content'>
                 {content}
                </div>
                <button className='close-notification-button success success-box' onClick={()=>onClose(txHash)}>&#10005;</button>
            </div>)
        }
        {
            (txVerifed)&&(txHash==2)&&
            (<div className='msg-box error-box error'  onClick={()=>onClose(txHash)}>
                <div className='type-msg'>
                Warning:
                </div>
                <div className='msg-content'>
                Provided spread amount exceeds allowed limit
                </div>
                <button className='close-notification-button error-box' onClick={()=>onClose(txHash)}>&#10005;</button>
            </div>)
        }
        </>
    )
}