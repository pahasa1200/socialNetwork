import React, {useEffect, useRef, useState} from 'react'


const ChatPage: React.FC = () => {

    return (
        <>
            <Chat/>
        </>
    )
}

type ChatMessageType = {
    photo: string
    userId: number
    userName: string
    message: string
}

const Chat: React.FC = () => {
    const [wsChanel, setWsChanel] = useState<WebSocket | null>(null)

    useEffect( () => {
        let ws: WebSocket;
        const closeHandler = () => {
            console.log('ClOSE WS')
            setTimeout(createChanel, 3000)
        }

        function createChanel() {
            ws?.removeEventListener('close', closeHandler)
            ws?.close()
            ws = new WebSocket('wss://social-network.samuraijs.com/handlers/ChatHandler.ashx')
            ws.addEventListener("close", closeHandler)
            setWsChanel(ws)
        }

        createChanel()

        return () => {
            ws.removeEventListener("close", closeHandler)
            ws.close()
        }
    }, [])

    return (
        <>
            <Messages ws={wsChanel}/>
            <AddMessageForm ws={wsChanel}/>
        </>
    )
}
const Messages: React.FC<{ws: WebSocket | null}> = ({ws}) => {
    const [messages, setMessages] = useState<ChatMessageType[]>([])
    const messagesAnchorRef = useRef<HTMLDivElement>(null);
    const [isAutoScroll, setIsAutoScroll] = useState(true)

    const scrollHandler = (e: React.UIEvent<HTMLDivElement, UIEvent>) => {
        const element = e.currentTarget;
        if (Math.abs( (element.scrollHeight - element.scrollTop) - element.clientHeight ) < 300)
        {
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

    useEffect(() => {
        let messageHandler = (e: MessageEvent) => {
            let newMessage = JSON.parse(e.data)
            setMessages((prevState) => [...messages, ...newMessage])
        }
        ws?.addEventListener('message', messageHandler)

        return () => {
            ws?.removeEventListener('message', messageHandler)
        }
    }, [ws])


    return (
        <div style={{height: '400px', overflowY: 'auto'}} onScroll={scrollHandler}>
            {messages.map((m, index) => <Message key={index} message={m}/>)}
            <div ref={messagesAnchorRef}></div>
        </div>
    )
}

const Message: React.FC<{ message: ChatMessageType }> = ({message}) => {
    return (
        <>
            <img src={message.photo}/> <b>{message.userName}</b>
            <br/>
            {message.message}
            <hr/>
        </>
    )
}

const AddMessageForm: React.FC<{ws: WebSocket | null}> = ({ws}) => {
    const [readyStatus, setReadyStatus] = useState<'pending' | 'ready'>('pending')
    const [message, setMessage] = useState('')

    useEffect( () => {
        let openHandler = () => {
            setReadyStatus('ready')
        }
        ws?.addEventListener('open', openHandler)

        return () => {
            ws?.removeEventListener('open', openHandler)
        }
    }, [ws])

    const sendMessage = () => {
        if (!message) {
            return
        }
        ws?.send(message)
        setMessage('')
    }

    return (
        <>
            <div>
                <textarea onChange={(e) => setMessage(e.currentTarget.value)} value={message}/>
            </div>
            <div>
                <button disabled={ws === null || readyStatus !== 'ready'} onClick={sendMessage}>Send</button>
            </div>
        </>
    )
}

export default ChatPage