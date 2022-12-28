import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import SpinnerIcon from '@rsuite/icons/legacy/Spinner'
import axios from 'axios'

import Post from '../Post/Post'

import './Posts.css'

const Posts = ({ location }) => {
  const { user } = useSelector((state) => state.user)
  const userId = user.Id

  const [post, setPost] = useState(null)
  const [profilePost, setProfilePost] = useState(null)
  let forPostDlt = post

  useEffect(() => {
    const getPost = async () => {
      const posts = await axios.post('https://we-share.club/get-post', { userId })
      setPost(posts.data.post)
      const proflepost = await axios.post('https://we-share.club/get-profilePost', { userId })
      setProfilePost(proflepost.data.mypost, 'hi mchii')
    }
    getPost()
  }, [userId])

  const handleDelete = async (postId) => {
    forPostDlt = post.filter((v) => v._id !== postId)
    setPost(forPostDlt)
    setProfilePost(forPostDlt)
    await axios.post('https://we-share.club/delete-post', { postId })
  }

  if (!post) { <SpinnerIcon pulse style={{ fontSize: '2em' }} /> }

  return (
    <div className='Posts'>

      {location === 'profilepage'
        ? profilePost?.map((post, id) => {
          return <Post key={id} data={post} id={id} location='profilepage' handleDelete={handleDelete} />
        })
        : post?.map((post, id) => {
          return <Post key={id} data={post} id={id} />
        })
      }
    </div>
  )
}

export default Posts
