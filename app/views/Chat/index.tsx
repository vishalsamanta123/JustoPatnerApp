import React from 'react'
import ChatView from './components/ChatView'

const ChatViewScreen = ({ navigation }: any) => {
    const handleDrawerPress = () => {
        navigation.toggleDrawer();
    };
    return (
        <>
            <ChatView
                handleDrawerPress={handleDrawerPress}
            />
        </>
    )
}

export default ChatViewScreen