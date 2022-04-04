import './App.css';
import {DropdownExampleSelection} from './Dropdown';

const assetsOption = [
  {
    key: 'LUNA',
    label: 'LUNA',
    value: 'LUNA',
    image: { src: 'https://assets.terra.money/icon/60/Luna.png' ,
            width:'30px'}
  },
  {
    key: 'APOLLO',
    label: 'APOLLO',
    value: 'APOLLO',
    image: { src: 'https://d14knz87alb4l4.cloudfront.net/icons/APOLLO.png' ,
            width:'30px'}
  }
]

function App() {
  return (
    <div className='App'>
      <div className='App-header'>
        <div className='asset-selection-container'>
            <input  tabindex="1" placeholder="Swap Pair" type="text" />
            <div className='swap-container'>
                <div className='asset-outer'>
                <p>UST</p>
                <div className='asset-container'>
                <input  tabindex="2" className='amount-input' placeholder="0" type="text" />            
                <img className='asset-logo' src="https://assets.terra.money/icon/60/UST.png" width="30" alt="Italian Trulli"></img>
                </div>
            </div>
            <div className='arrow-container'>
                <div>&rarr;</div>
            </div>
            <div className='asset-outer'>
                <p>LUNA</p>
                <div className='asset-container'>
                <div className='amount-calculated'>1.20</div>
                <img className='asset-logo' src="https://assets.terra.money/icon/60/Luna.png" width="30" alt="Italian Trulli"></img>
                </div>
            </div>
            </div>
            <button tabindex="3" className='swap-button' type="button">SWAP</button>
        </div>
        <div class="vl"></div>
        <div className='suggestions-container'>
          <div className='suggestion-category'>
            <p className='suggestion-category-name'>MOST POPULAR</p>
            <div tabindex="0" className='suggest-container'>
                <p className='suggest-asset'>APOLLO</p>
                <img className='suggest-logo' src="https://d14knz87alb4l4.cloudfront.net/icons/APOLLO.png" width="30" alt="Italian Trulli"></img>
                <div className='suggest-arrow'>&rarr;</div>
                <p className='suggest-asset'>UST</p>
                <img className='suggest-logo' src="https://assets.terra.money/icon/60/UST.png" width="30" alt="Italian Trulli"></img>
              </div>
              <div tabindex="0" className='suggest-container'>
                <p className='suggest-asset'>APOLLO</p>
                <img className='suggest-logo' src="https://d14knz87alb4l4.cloudfront.net/icons/APOLLO.png" width="30" alt="Italian Trulli"></img>
                <div className='suggest-arrow'>&rarr;</div>
                <p className='suggest-asset'>UST</p>
                <img className='suggest-logo' src="https://assets.terra.money/icon/60/UST.png" width="30" alt="Italian Trulli"></img>
              </div>
              <div tabindex="0"  className='suggest-container'>
                <p className='suggest-asset'>APOLLO</p>
                <img className='suggest-logo' src="https://d14knz87alb4l4.cloudfront.net/icons/APOLLO.png" width="30" alt="Italian Trulli"></img>
                <div className='suggest-arrow'>&rarr;</div>
                <p className='suggest-asset'>LUNA</p>
                <img className='suggest-logo' src="https://assets.terra.money/icon/60/Luna.png" width="30" alt="Italian Trulli"></img>
            </div>
          </div>
          <div class="vl"></div>
          <div className='suggestion-category'>
            <p className='suggestion-category-name'>RECENT</p>
            <div className='suggestion'>
                <div  tabindex="0" className='suggest-container'>
                    <p className='suggest-asset'>LUNA</p>
                    <img className='suggest-logo' src="https://assets.terra.money/icon/60/Luna.png" width="30" alt="Italian Trulli"></img>
                    <div className='suggest-arrow'>&rarr;</div>
                    <p className='suggest-asset'>UST</p>
                    <img className='suggest-logo' src="https://assets.terra.money/icon/60/UST.png" width="30" alt="Italian Trulli"></img>
                </div>
                <div  tabindex="0" className='suggest-container'>
                    <p className='suggest-asset'>APOLLO</p>
                    <img className='suggest-logo' src="https://d14knz87alb4l4.cloudfront.net/icons/APOLLO.png" width="30" alt="Italian Trulli"></img>
                    <div className='suggest-arrow'>&rarr;</div>
                    <p className='suggest-asset'>UST</p>
                    <img className='suggest-logo' src="https://assets.terra.money/icon/60/UST.png" width="30" alt="Italian Trulli"></img>
                </div>
                <div tabindex="0"  className='suggest-container'>
                    <p className='suggest-asset'>APOLLO</p>
                    <img className='suggest-logo' src="https://d14knz87alb4l4.cloudfront.net/icons/APOLLO.png" width="30" alt="Italian Trulli"></img>
                    <div className='suggest-arrow'>&rarr;</div>
                    <p className='suggest-asset'>UST</p>
                    <img className='suggest-logo' src="https://assets.terra.money/icon/60/UST.png" width="30" alt="Italian Trulli"></img>
                </div>
            </div>
          </div>
          <div className='suggestion-category'>
            <p className='suggestion-category-name'>SUGGESTED</p>
            <div className='suggestion'>
                <div  tabindex="0"  className='suggest-container'>
                    <p className='suggest-asset'>APOLLO</p>
                    <img className='suggest-logo' src="https://d14knz87alb4l4.cloudfront.net/icons/APOLLO.png" width="30" alt="Italian Trulli"></img>
                    <div className='suggest-arrow'>&rarr;</div>
                    <p className='suggest-asset'>UST</p>
                    <img className='suggest-logo' src="https://assets.terra.money/icon/60/UST.png" width="30" alt="Italian Trulli"></img>
                </div>
                <div  tabindex="0" className='suggest-container'>
                    <p className='suggest-asset'>APOLLO</p>
                    <img className='suggest-logo' src="https://d14knz87alb4l4.cloudfront.net/icons/APOLLO.png" width="30" alt="Italian Trulli"></img>
                    <div className='suggest-arrow'>&rarr;</div>
                    <p className='suggest-asset'>LUNA</p>
                    <img className='suggest-logo' src="https://assets.terra.money/icon/60/Luna.png" width="30" alt="Italian Trulli"></img>
                </div>
                <div  tabindex="0" className='suggest-container'>
                    <p className='suggest-asset'>LUNA</p>
                    <img className='suggest-logo' src="https://assets.terra.money/icon/60/Luna.png" width="30" alt="Italian Trulli"></img>
                    <div className='suggest-arrow'>&rarr;</div>
                    <p className='suggest-asset'>UST</p>
                    <img className='suggest-logo' src="https://assets.terra.money/icon/60/UST.png" width="30" alt="Italian Trulli"></img>
                </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
