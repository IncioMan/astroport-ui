import React, { Component } from 'react';
import PairDropdownItem from '../PairDropdownItem/PairDropdownItem'
import './PairDropdown.css'
export default class PairDropdown extends Component {
    constructor(props) {
        super(props)
        this.state = {
          isListOpen: true,
          headerTitle: this.props.title
        }
    }

    toggleList = () => {
        this.setState(prevState => ({
          isListOpen: !prevState.isListOpen
       }))
    }
    
    render() {
        const { isListOpen, headerTitle } = this.state;
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
]
      
        return (
          <div className="dd-wrapper">
            <input  tabindex="1" placeholder="Swap Pair" type="text" autoFocus/>
            {isListOpen && (
              <div className='dropdown-list-container' role="list">
                {suggestedSwaps.map((pair) => (
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