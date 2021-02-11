
type NewMessagesSubscriberType = (messages: ChatMessageAPIType[]) => void
type StatusChangedSubscriberType = (status: StatusType) => void

let subscribers = {
    'messages-received': [] as NewMessagesSubscriberType[],
    'status-changed': [] as StatusChangedSubscriberType[]
}

let ws: WebSocket | null = null;

type EventsNamesTypes = 'messages-received' | 'status-changed'

export type StatusType = 'pending' | 'ready' | 'error';

const closeHandler = () => {
    console.log('ClOSE WS')
    setTimeout(createChanel, 3000)
}

const messageHandler = (e: MessageEvent) => {
    const newMessages = JSON.parse(e.data)
    subscribers['messages-received'].forEach(s => s(newMessages))
}

const cleanUp = () => {
    ws?.removeEventListener("close", closeHandler)
    ws?.removeEventListener("message", messageHandler)
}

const notifySubscriberAboutStatus = (status: StatusType) => {
    subscribers['status-changed'].forEach(s => s(status))
}

const openHandler = () => {
    notifySubscriberAboutStatus('ready')
}

const errorHandler = () => {
    notifySubscriberAboutStatus('error')
}

function createChanel() {
    cleanUp()
    ws?.close()
    ws = new WebSocket('wss://social-network.samuraijs.com/handlers/ChatHandler.ashx')
    notifySubscriberAboutStatus('pending')
    ws.addEventListener("close", closeHandler)
    ws.addEventListener("message", messageHandler)
    ws.addEventListener("open", openHandler)
    ws.addEventListener("error", errorHandler)
}

export const chatAPI = {
    start(){
        createChanel()
    },
    stop(){
        subscribers['messages-received'] = []
        subscribers['status-changed'] = []
        ws?.close()
        ws?.removeEventListener("close", closeHandler)
        ws?.removeEventListener("message", messageHandler)
    },
    subscribe (eventName: EventsNamesTypes, callback: NewMessagesSubscriberType | StatusChangedSubscriberType){
        // @ts-ignore
        subscribers[eventName].push(callback)
        return () => {
            // @ts-ignore
            subscribers[eventName] = subscribers[eventName].filter(s => s !== callback)
        }
    },
    unsubscribe (eventName: EventsNamesTypes, callback: NewMessagesSubscriberType | StatusChangedSubscriberType) {
        // @ts-ignore
        subscribers[eventName] = subscribers[eventName].filter(s => s !== callback)
    },
    sendMessage(message: string){
        ws?.send(message)
    }

    }


export type ChatMessageAPIType = {
    photo: string
    userId: number
    userName: string
    message: string
}