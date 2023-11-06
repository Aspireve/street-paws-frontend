import React from 'react'
import { useAuth } from '../../contexts/AuthContext'
import SentMessage from './sentMessage'
import RecvMessage from './recievedMessage'

export default function Main(props) {
const {currentUser} = useAuth()
  return (
    <>
    {props.uid === currentUser.uid ? <SentMessage msg={props.message} /> : <RecvMessage msg={props.message} display={props.display}/>}
    </>
  )
}
