import {createLCDClient,
    CreateTxFailed,
    SignResult,
    Timeout,
    TxFailed,
    TxUnspecifiedError,
    UserDenied} from '@terra-money/wallet-provider';
import { MsgExecuteContract } from '@terra-money/terra.js';
import pools from '../../data/astroport.dex.js'

export default class SwapExecutor{
    constructor(network, connectedWallet){
        this.network = network
        this.connectedWallet = connectedWallet
    }

    executeSwap = (swapValue, swapRates, setNotifications, notifications) => {
        console.log(swapRates)
        const pool = pools[this.network.name]?.[swapValue.pool]
        if(!pool){
        return
        }
        let execute = null;
        let msg_value = '{"swap":{"max_spread":"0.005","belief_price":"'+swapRates.from.toString()+'"}}'
        msg_value = btoa(msg_value)
        if(!['uusd','uluna'].includes(swapValue.assetFrom.asset)){
        execute = new MsgExecuteContract(
            this.connectedWallet.terraAddress, // sender
            swapValue.assetFrom.asset, // contract account address
            {
            "send": {
                "msg": msg_value,
                "amount": (swapValue.assetFrom.amount*1000000).toString(),
                "contract": swapValue.pool
            }
            }, { })
        }
        else{
        let coins = {}
        coins[swapValue.assetFrom.asset] = swapValue.assetFrom.amount*1000000
        execute = new MsgExecuteContract(
            this.connectedWallet.terraAddress, // sender
            swapValue.pool, // contract account address
            {
                "swap": {
                "to": this.connectedWallet.terraAddress,
                "max_spread": "0",
                "offer_asset": {
                    "info": {
                    "native_token": {
                        "denom": swapValue.assetFrom.asset
                    }
                    },
                    "amount": (swapValue.assetFrom.amount*1000000).toString()
                },
                "belief_price": swapRates.from.toString()
                }
            }, // handle msg
            coins // coins
        )
        }
        
        
        this.connectedWallet.sign({
            msgs: [execute]
        }).then((nextSignResult) => {
            // broadcast
            const tx = nextSignResult.result;
            const lcd = createLCDClient({ network: this.connectedWallet.network });
            return lcd.tx.broadcastSync(tx);
        })
        .then((nextTxResult) => {
            setNotifications([{txHash:nextTxResult.txhash}, ...notifications])
        })
        .catch((error) => {
            if (error instanceof UserDenied) {
            console.error('User Denied');
            } else if (error instanceof CreateTxFailed) {
            console.error('Create Tx Failed: ' + error.message);
            //setErrorMessage(error.message)
            setNotifications([{errorMessage:error.message}, ...notifications,])
            } else if (error instanceof TxFailed) {
            console.error('Tx Failed: ' + error.message);
            setNotifications([{errorMessage:error.message}, ...notifications])
            //setErrorMessage(error.message)
            } else if (error instanceof Timeout) {
            console.error('Timeout');
            } else if (error instanceof TxUnspecifiedError) {
            console.error('Unspecified Error: ' + error.message);
            setErrorMessage(error.message)
            } else {
            console.error(
                'Unknown Error: ' +
                (error instanceof Error ? error.message : String(error)),
            );
            }
        });
    }
}