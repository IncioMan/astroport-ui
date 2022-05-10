import pools from '../../data/astroport.dex.js'
export default class SimulationExecutor{
    constructor(lcd){
        this.lcd = lcd
    }

    static swapRatesReducer(state, value) {
        if(!value){
            return state
        }
        var newValue = {
            from: value.from ? value.from : state.from,
            to: value.to ? value.to : state.to
        }
        return newValue
    }

    simulateBasePrice(swapValue, network, setBasePrice){
        const pool = pools[network.name]?.[swapValue.pool]
        const assetTo = pool.assets[1]
        let query = ''
        if(['uluna','uusd'].includes(assetTo)){
            query = {
                "simulation": {
                    "offer_asset":{
                        "info":{
                            "native_token":{
                                "denom":assetTo}
                        },"amount":"1000000"},
                "max_spread":"0.005","belief_price":"90"
                }
            }
        }
        else{
            query = {
                "simulation":{
                    "offer_asset":{
                        "amount":"1000000",
                        "info":{
                            "token":{
                                "contract_addr": assetTo
                            }
                        }
                    }
                }
            }
        }
        this.lcd.wasm.contractQuery(swapValue.pool,query)
            .then((res)=>{
                setBasePrice(res.return_amount/1000000)
            }).catch(function (error) {
                console.log(error);
            })
    }

    simulate(swapValue, setSwapRates){
    const pool = swapValue.pool
    const assetFrom = swapValue.assetFrom.asset
    const assetTo= swapValue.assetTo.asset
    let query = ''
    if(['uluna','uusd'].includes(assetFrom)){
        query = {
            "simulation": {
                "offer_asset":{
                    "info":{
                        "native_token":{
                            "denom":assetFrom}
                    },"amount":"1000000"},
            "max_spread":"0.005","belief_price":"90"
            }
        }
    }
    else{
        query = {
            "simulation":{
                "offer_asset":{
                    "amount":"1000000",
                    "info":{
                        "token":{
                            "contract_addr": assetFrom
                        }
                    }
                }
            }
        }
    }
    this.lcd.wasm.contractQuery(pool,
        query)
        .then((res)=>{
            setSwapRates({from:res.return_amount/1000000})
        }).catch(function (error) {
            console.log(error);
        })
    if(['uluna','uusd'].includes(assetTo)){
        query = {
            "simulation": {
                "offer_asset":{
                    "info":{
                        "native_token":{
                            "denom":assetTo}
                    },"amount":"1000000"},
            "max_spread":"0.005","belief_price":"90"
            }
        }
    }
    else{
        query = {
            "simulation":{
                "offer_asset":{
                    "amount":"1000000",
                    "info":{
                        "token":{
                            "contract_addr": assetTo
                        }
                    }
                }
            }
        }
    }
    this.lcd.wasm.contractQuery(pool,
        query)
        .then((res)=>{
            setSwapRates({to:res.return_amount/1000000})
        }).catch(function (error) {
            console.log(error);
        })

    }
}