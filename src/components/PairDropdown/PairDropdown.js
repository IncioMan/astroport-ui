import React, { Component } from 'react';
import PairDropdownItem from '../PairDropdownItem/PairDropdownItem'
import './PairDropdown.css'
export default class PairDropdown extends Component {
    constructor(props) {
        super(props)
        this.state = {
          isListOpen: false
        }
    }

    processInput = (text) => {
        this.setState(prevState => ({
          isListOpen: text.length>0
       }))
    }
    
    render() {
        const { isListOpen } = this.state;
        const suggestedSwaps= [
            [{
                asset: 'wAVAX',
                image: 'https://app.astroport.fi/tokens/avax.png' 
            },{
                asset: 'LUNA',
                image: 'https://assets.terra.money/icon/60/Luna.png' 
            }],
            [{
                asset: 'LUNA',
                image: 'https://assets.terra.money/icon/60/Luna.png' 
            },{
                asset: 'wAVAX',
                image: 'https://app.astroport.fi/tokens/avax.png' 
            }],
            [{
                asset: 'UST',
                image: 'https://assets.terra.money/icon/60/UST.png' 
            },{
                asset: 'MINE',
                image: 'https://assets.pylon.rocks/logo/MINE.png'  
            }],
            [{
                asset: 'ANC',
                image: 'https://whitelist.anchorprotocol.com/logo/ANC.png'  
            },{
                asset: 'UST',
                image: 'https://assets.terra.money/icon/60/UST.png' 
            }],
            [{
                asset: 'APOLLO',
                image: 'https://d14knz87alb4l4.cloudfront.net/icons/APOLLO.png' 
            },{
                asset: 'LUNA',
                image: 'https://assets.terra.money/icon/60/Luna.png' 
            }],
            [{
                asset: 'LUNA',
                image: 'https://assets.terra.money/icon/60/Luna.png'  
            },{
                asset: 'bLUNA',
                image: 'https://whitelist.anchorprotocol.com/logo/bLUNA.png' 
            }],
        ]
      
        return (
          <div className="dd-wrapper">
            <input  tabindex="1" placeholder="Swap Pair" type="text" onChange={(e)=>this.processInput(e.target.value)} autoFocus/>
            {isListOpen && (
              <div className='dropdown-list-container' role="list">
                {isListOpen && suggestedSwaps.map((pair) => (
                <div className="dd-list-item">
                    <PairDropdownItem 
                            asset1={pair[0].asset}
                            logo1={pair[0].image}
                            asset2={pair[1].asset}
                            logo2={pair[1].image}
                    ></PairDropdownItem>
                </div>
                ))}
              </div>
            )}
          </div>
        )
      }
}