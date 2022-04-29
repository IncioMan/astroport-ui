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
                errorMessage={n.errorMessage}
                onClose={(txHash)=>{
                    console.log(0/0)
                    const ns = notifications.filter((n)=>{
                        console.log(n.txHash, txHash, n.txHash!==txHash)
                        return n.txHash!==txHash
                    })
                    console.log(ns)
                    setNotifications(ns)
                }}
                />
            ))
        }
        </div>
    )
}