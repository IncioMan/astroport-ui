import React from 'react';
import './NotificationBox.css'

export default function NotificationBox(props) {
    const {txHash, onClose} = props
    return (
        <>
        {
        (txHash==1) &&
            (<div className='msg-box success-box' >
                <div className='type-msg'>
                Success:
                </div>
                <div className='msg-content'>
                You swapped 0.5 ASTRO for 30 UST
                </div>
                <button className='close-notification-button success-box' onClick={()=>onClose(txHash)}>&#10005;</button>
            </div>)
        }
        {
            txHash==2&&
            (<div className='msg-box error-box'  onClick={()=>onClose(txHash)}>
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