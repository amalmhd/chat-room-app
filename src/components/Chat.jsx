import { useEffect, useState } from "react";
import { addDoc, collection, onSnapshot, orderBy, query, serverTimestamp, where } from 'firebase/firestore';
import { auth, db } from "../firebase-config";
import '../styles/chat.css';

export const Chat = (props) => {

    const { room } = props;
    const [newMessage, setNewMessage] = useState('');
    const messagesRef = collection(db, 'messages');
    const [messages, setMessages] = useState([]);

    useEffect(() => {
        const queryMessage = query(messagesRef, where('room', '==', room), orderBy('createdAt'));
        const unsuscribe = onSnapshot(queryMessage, (snapshot) => {
            let messages = [];
            snapshot.forEach((doc) => {
                messages.push({ ...doc.data(), id: doc.id });
            });
            setMessages(messages);
        });
        return () => unsuscribe() //cleaning up useEffect
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (newMessage === '') return;

        await addDoc(messagesRef, {
            text: newMessage,
            createdAt: serverTimestamp(),
            user: auth.currentUser.displayName,
            room, //since both variable has same name
        });

        setNewMessage('');
    }

    return (
        <div className="chat-app">

            <div className="header">
                <h1>Welcome to {room.toUpperCase()}</h1>
            </div>

            <div className="messages">
                {messages.map((message) => 
                //adding key is standard in react
                <div className="message" key={message.id}> 
                    <span className="user">{message.user}: </span>
                    {message.text}
                </div>
                )}
            </div>
            <form onSubmit={handleSubmit} className="new-message-form">
                <input type="text"
                    className="new-message-input"
                    placeholder="Type your message here..."
                    onChange={(e) => setNewMessage(e.target.value)} value={newMessage} />

                <button type="submit" className="send-button">Send</button>
            </form>
        </div>
    )
}