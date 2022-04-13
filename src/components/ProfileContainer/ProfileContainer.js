import React from 'react';
import './ProfileContainer.css'
import BalanceList from '../BalanceList/BalanceList'

export default function ProfileContainer(props) {
    return (
        <div className='profile-container'>
        {
            <BalanceList 
                title={'WALLET BALANCE'} 
                tokens={props.tokens}
            />
            
        }
        </div>
    )
}