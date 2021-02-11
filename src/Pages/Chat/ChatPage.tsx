import React, {useEffect, useRef, useState} from 'react'
import {useDispatch, useSelector} from "react-redux";
import {sendMessage, startMessageListening, stopMessageListening} from "../../Redux/chat-reducer";
import {AppStateType} from "../../Redux/redux-store";
import {ChatMessageAPIType} from "../../API/chat-api";


const ChatPage: React.FC = () => {
    return (
        <>
            <Chat/>
        </>
    )
}

const Chat: React.FC = () => {
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(startMessageListening())
        return () => {
            dispatch(stopMessageListening())
        }
    }, [])

    return (
        <>
            {/* eslint-disable-next-line no-restricted-globals */}
            {status === 'error' && <div>Some error occurred. Please refresh the page</div>}
            <Messages/>
            <AddMessageForm/>
        </>
    )
}
const Messages: React.FC<{}> = ({}) => {
    const messages = useSelector((state: AppStateType) => state.chat.messages)
    const messagesAnchorRef = useRef<HTMLDivElement>(null);
    const [isAutoScroll, setIsAutoScroll] = useState(true)

    const scrollHandler = (e: React.UIEvent<HTMLDivElement, UIEvent>) => {
        const element = e.currentTarget;
        if (Math.abs((element.scrollHeight - element.scrollTop) - element.clientHeight) < 300) {
            !isAutoScroll && setIsAutoScroll(true)
        } else {
            isAutoScroll && setIsAutoScroll(false)
        }
    }

    useEffect(() => {
        if (isAutoScroll) {
            messagesAnchorRef.current?.scrollIntoView({behavior: 'smooth'})
        }
    }, [messages])

    return <div style={{height: '400px', overflowY: 'auto'}} onScroll={scrollHandler}>
        {messages.map((m, index) => <Message key={m.id} message={m}/>)}
        <div ref={messagesAnchorRef}></div>
    </div>
}

const Message: React.FC<{ message: ChatMessageAPIType }> = React.memo(({message}) => {
    return (
        <>
            <img src={message.photo}/> <b>{message.userName}</b>
            <br/>
            {message.message}
            <hr/>
        </>
    )
})

const AddMessageForm: React.FC<{}> = ({}) => {
    const [message, setMessage] = useState('')
    const dispatch = useDispatch()

    const status = useSelector((state: AppStateType) => state.chat.status)

    const sendMessageHandler = () => {
        if (!message) {
            return
        }
        dispatch(sendMessage(message))
        setMessage('')
    }

    return (
        <>
            <div>
                <textarea onChange={(e) => setMessage(e.currentTarget.value)} value={message}/>
            </div>
            <div>
                <button disabled={status !== 'ready'} onClick={sendMessageHandler}>Send</button>
            </div>
        </>
    )
}

export default ChatPage