import React from 'react'

import profile from '../../img/defaultProfile.png'
// import timeago from 'timeago.js'

import './Message.css'
// const timeAgo = timeago()
const Message = ({ message, own }) => {
  return (
        <div className={own ? 'message own' : 'message'}>
            <div className="messageTop">
                <img className='messageImg' src={profile} alt="" />
                <p className='messageText'>{message.text}</p>

            </div>
            <div className="messageBottom">{message.createdAt}</div>
        </div >
  )
}

export default Message
