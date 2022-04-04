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
        <div className='swap-container'>
            <div className='asset-outer'>
              <p>APOLLO</p>
              <div className='asset-container'>
              1000
              <img className='asset-logo' src="https://d14knz87alb4l4.cloudfront.net/icons/APOLLO.png" width="30" alt="Italian Trulli"></img>
            </div>
          </div>
          <div className='arrow-container'>
            <div>&rarr;</div>
          </div>
          <div className='asset-outer'>
            <p>UST</p>
            <div className='asset-container'>
              10
              <img className='asset-logo' src="https://assets.terra.money/icon/60/UST.png" width="30" alt="Italian Trulli"></img>
            </div>
          </div>
        </div>
        <div className='suggestions-container'>
          <div className='suggestion-category'>
            <p>MOST POPULAR</p>
            <div className='asset-container'>
                <p>APOLLO</p>
                <img className='asset-logo' src="https://d14knz87alb4l4.cloudfront.net/icons/APOLLO.png" width="30" alt="Italian Trulli"></img>
                <div>&rarr;</div>
                <p>UST</p>
                <img className='asset-logo' src="https://assets.terra.money/icon/60/UST.png" width="30" alt="Italian Trulli"></img>
              </div>
              <div className='asset-container'>
                <p>APOLLO</p>
                <img className='asset-logo' src="https://d14knz87alb4l4.cloudfront.net/icons/APOLLO.png" width="30" alt="Italian Trulli"></img>
                <div>&rarr;</div>
                <p>UST</p>
                <img className='asset-logo' src="https://assets.terra.money/icon/60/UST.png" width="30" alt="Italian Trulli"></img>
              </div>
              <div className='asset-container'>
                <p>APOLLO</p>
                <img className='asset-logo' src="https://d14knz87alb4l4.cloudfront.net/icons/APOLLO.png" width="30" alt="Italian Trulli"></img>
                <div>&rarr;</div>
                <p>UST</p>
                <img className='asset-logo' src="https://assets.terra.money/icon/60/UST.png" width="30" alt="Italian Trulli"></img>
              </div>
          </div>

          <div className='suggestion-category'>
            <p>RECENT</p>
            <div className='suggestion'>
              <div className='asset-container'>
                <p>APOLLO</p>
                <img className='asset-logo' src="https://d14knz87alb4l4.cloudfront.net/icons/APOLLO.png" width="30" alt="Italian Trulli"></img>
                <div>&rarr;</div>
                <p>UST</p>
                <img className='asset-logo' src="https://assets.terra.money/icon/60/UST.png" width="30" alt="Italian Trulli"></img>
              </div>
              <div className='asset-container'>
                <p>APOLLO</p>
                <img className='asset-logo' src="https://d14knz87alb4l4.cloudfront.net/icons/APOLLO.png" width="30" alt="Italian Trulli"></img>
                <div>&rarr;</div>
                <p>UST</p>
                <img className='asset-logo' src="https://assets.terra.money/icon/60/UST.png" width="30" alt="Italian Trulli"></img>
              </div>
              <div className='asset-container'>
                <p>APOLLO</p>
                <img className='asset-logo' src="https://d14knz87alb4l4.cloudfront.net/icons/APOLLO.png" width="30" alt="Italian Trulli"></img>
                <div>&rarr;</div>
                <p>UST</p>
                <img className='asset-logo' src="https://assets.terra.money/icon/60/UST.png" width="30" alt="Italian Trulli"></img>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
