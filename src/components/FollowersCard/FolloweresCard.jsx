import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import axios from 'axios'

import profile from '../../img/defaultProfile.png'

import './FollowersCard.css'

const FolloweresCard = () => {
  const { user } = useSelector((state) => state.user)

  const [users, setUsers] = useState([])

  useEffect(() => {
    async function getUsers () {
      const res = await axios.get('https://we-share.club/get-users', { withCredentials: true })
      const userList = res.data.users
      setUsers(userList.filter((val) => val._id !== user.Id))
    }
    getUsers()
  }, [])

  const handleFollow = (userId) => {
    axios.post('https://we-share.club/follow-users', { userId }, { withCredentials: true })
  }

  const handleUnFollow = (userId) => {
    axios.post('https://we-share.club/unfollow-users', { userId }, { withCredentials: true })
  }

  return (
    <div className='FollowersCard'>
      <h3>People you may know </h3>
      {users.map((following, id) => {
        return (
          <div className="follower" key={id}>
            <div>
              <img src={following.profilePicture ? following.profilePicture : profile} alt="" className='follwerImg' />
              <div className="name">
                <span>{following.name}</span>
                <span>{'_' + following.name + '_'}</span>
              </div>
            </div>

            {user.following[0]
              ? user.following.map((val, id) => {
                if (val === following._id) {
                  return <button className='button fc-button' onClick={() => { handleUnFollow(following._id) }} key={id}>
                    unfollow
                  </button>
                } else {
                  return <button className='button fc-button' onClick={() => {
                    handleFollow(following._id)
                  }} key={id}>
                    follow
                  </button>
                }
              })

              : <button className='button fc-button' onClick={() => {
                handleFollow(following._id)
              }} key={id}>follow</button>
            }

          </div>
        )
      })}
    </div>
  )
}

export default FolloweresCard
