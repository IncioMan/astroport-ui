import React from 'react';
import './NotificationsContainer.css'
import NotificationBox from '../NotificationBox/NotificationBox'

export default function NotificationsContainer(props) {
    const{notifications, setNotifications} = props
    return (
        <div className='notifications-container'>
        {
            notifications.map((n) => (
                <NotificationBox 
                txHash={n.txHash}
                onClose={(txHash)=>{
                    console.log(txHash)
                    setNotifications(notifications.filter(n=>n.txHash!==txHash))
                }}
                />
            ))
        }
        </div>
    )
}