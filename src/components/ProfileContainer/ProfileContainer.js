import React from 'react';
import './ProfileContainer.css'
import BalanceList from '../BalanceList/BalanceList'
import WalletInfo from '../WalletInfo/WalletInfo'

export default function ProfileContainer(props) {
    return (
        <div className='profile-container'>
            <WalletInfo/>
            <BalanceList 
                title={'WALLET BALANCE'} 
                tokens={props.tokens}
            />
        </div>
    )
}