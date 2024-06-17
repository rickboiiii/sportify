"use client"
import { useState, useEffect, useRef } from 'react';
import Search from "@/components/SearchBar/SearchBarComponent";
import { SearchBarResult2} from "@/components/SearchBar/SearchBarStyled";
import Image from 'next/image';
import chatIcon from '../../../../files/images/chatIcon.png';
import './chat.css';
import axios from "axios";

const Chat = () => {
    const [message, setMessage] = useState('');
    const [messages, setMessages] = useState([]);
    const [idKorisnika, setIdKorisnika] = useState(null);
    const [username, setUsername] = useState('');
    const [selectedUser, setSelectedUser] = useState(null);
    const [chats, setChats] = useState([]);
    const [chatUsers, setChatUsers] = useState([]); 
    const [token, setToken] = useState(null);
    const stock_pic = '/blank_profile_picture.png';
    useEffect(() => {
        const storedToken = localStorage.getItem('token');
        if (storedToken) {
            const parsedToken = JSON.parse(storedToken);
            setToken(parsedToken.access_token);
            fetchIdKorisnika(parsedToken.access_token);
        }
    }, [username]);
    
    useEffect(() => {
        if (chats.length > 0) {
            fetchUsers();
        }
    }, [chats]);
    useEffect(() => {
        if (selectedUser) {
            fetchMessages(idKorisnika, selectedUser.korisnici.id_korisnika);
        }
    }, [selectedUser]);

    useEffect(() => {
        scrollToBottom();
    }, [messages]);

    let fetchUsername = async (id) => {
        try {
            const res = await axios(`http://localhost:8000/get-username/${id}`);
            setUsername(res.data);
        } catch (e) {
            console.error(e)
        }
    }

    let fetchMessages = async (id_user1, id_user2) => {
        try {
            const response = await fetch(`http://localhost:8000/messages?id_user1=${id_user1}&id_user2=${id_user2}`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`
                }
            });
            
            if (response.ok) {
                const data = await response.json();
                setMessages(data); 
            } else {
                console.error('Failed to fetch messages:', response.statusText);
            }
        } catch (error) {
            console.error('Error fetching messages:', error);
        }
    };
    
    const fetchIdKorisnika = async (token) => {
        try {
            const response = await fetch(`http://localhost:8000/get_id/${token}`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`
                }
            });
            if (response.ok) {
                const data = await response.json();
                setIdKorisnika(data);
                fetchUsername(data);
                const fetchedChats = await fetchChats(data); 
                setChats(fetchedChats); 
            } else {
                console.error('Failed to fetch id_korisnika:', response.statusText);
            }
        } catch (error) {
            console.error('Error fetching id_korisnika:', error);
        }
    };
    
    const fetchUsers = async () => {
        try {
            const response = await fetch('http://localhost:8000/users', {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`
                }
            });
            if (response.ok) {
                const data = await response.json();
                const allUsers = data;
                const chatUserIds = chats
                .filter(chat => chat.id_user1 === idKorisnika || chat.id_user2 === idKorisnika)
                .map(chat => chat.id_user1 === idKorisnika ? chat.id_user2 : chat.id_user1);
    
                const chatUsers = allUsers.filter(user => chatUserIds.includes(user.korisnici.id_korisnika));
                setChatUsers(chatUsers); 
            } else {
                console.error('Failed to fetch users:', response.statusText);
            }
        } catch (error) {
            console.error('Error fetching users:', error);
        }
    };

    const fetchChats = async (userId) => {
        try {
            const response = await fetch(`http://localhost:8000/chats/${userId}`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`
                }
            });
            if (response.ok) {
                const data = await response.json();
                return data;
            } else {
                console.error('Failed to fetch chats:', response.statusText);
                return [];
            }
        } catch (error) {
            console.error('Error fetching chats:', error);
            return [];
        }
    };

    const startChat = (user) => {
        setSelectedUser(user);
    };

    const ws = useRef(null);

    useEffect(() => {
        if (!idKorisnika) return;

        ws.current = new WebSocket(`ws://localhost:8000/ws`);

        ws.current.onopen = () => console.log('WebSocket Connected');
        ws.current.onclose = () => console.log('WebSocket Disconnected');
        ws.current.onerror = (error) => console.error('WebSocket Error:', error);

        ws.current.onmessage = (event) => {
            const data = JSON.parse(event.data);
            setMessages((prev) => [...prev, data]);
            scrollToBottom();
        };

        return () => {
            ws.current.close();
        };
    }, [idKorisnika]);

    const sendMessage = async (toUserId) => {
        if (message.trim() && ws.current && ws.current.readyState === WebSocket.OPEN && selectedUser) {
            const messagePayload = {
                from: idKorisnika, 
                to: toUserId,
                message
            };
            ws.current.send(JSON.stringify(messagePayload));
            setMessage('');
            fetchMessages(idKorisnika, selectedUser.korisnici.id_korisnika);
        }
    };

    const scrollToBottom = () => {
        const chatContainer = document.querySelector('.chat');
        if (chatContainer) {
            chatContainer.scrollTop = chatContainer.scrollHeight;
        }
    };
    
    const handleProfileClick = (profile) => {
        console.log('Starting chat with:', profile);
        setSelectedUser(profile);
     
    };
    const handleSendMessage = (event) => {
        if (event.key === 'Enter') {
            sendMessage(selectedUser.korisnici.id_korisnika);
        }
    };

    return (
<div className="container">
       <div className='sidebar'>
           <div style={{display: "flex"}}>
               <a href={"/feed/" + username} style={{alignSelf: "center", margin: "0 1rem", padding: "0.5rem", border: "1px solid rgba(192, 192, 192, 0.5)", borderRadius: "0.5rem"}}><i className="fas fa-chevron-left"></i></a>
               <Search onProfileClick={handleProfileClick} />
           </div>
            <hr className="separator" />
            <div className="user-list">
                <ul>
                    {chatUsers.map((user) => (
                            <SearchBarResult2 key={user.korisnici.id_korisnika} onClick={() => startChat(user)}>
                                <img src={stock_pic} alt="User profile thumbnail picture" />
                                <h3>
                                {user.ime_vlasnika ? (
                                    `${user.ime_vlasnika}${user.srednje_ime ? ` (${user.srednje_ime}) ` : ' '}${user.prezime_vlasnika}`
                                ) : (
                                    `${user.ime_igraca}${user.srednje_ime ? ` (${user.srednje_ime}) ` : ' '}${user.prezime_igraca}`
                                )}
                                <br></br>
                                    <small>{user.korisnici.korisnicko_ime}</small>
                                </h3>

                                    <i className="fas fa-chevron-right"></i>
        
                            </SearchBarResult2>
                    ))}
                </ul>
            </div>
        </div> 
        <div className="chat-container">
            {selectedUser ? (
                <>
                    <SearchBarResult2 key={selectedUser.korisnici.id_korisnika} className="selected-user">
                    <div className="user-profile">
                        <img src={stock_pic} alt="User profile thumbnail picture" />
                        <h3 style={{ marginLeft: "0.5em" }}>
                        {selectedUser.ime_vlasnika ? (
                            `${selectedUser.ime_vlasnika}${selectedUser.srednje_ime ? ` (${selectedUser.srednje_ime}) ` : ' '}${selectedUser.prezime_vlasnika}`
                        ) : (
                            `${selectedUser.ime_igraca}${selectedUser.srednje_ime ? ` (${selectedUser.srednje_ime}) ` : ' '}${selectedUser.prezime_igraca}`
                        )}
                        <br />
                        <small>{selectedUser.korisnici.korisnicko_ime}</small>
                        </h3>
                    </div>
                    </SearchBarResult2>

                    <div className="chat">
                        {messages.map((msg, index) => (
                        <div key={index} className={`message ${msg.from_user_id === idKorisnika ? 'my-message' : 'other-message'}`}>
                        <div className="message-content">
                            <span>{msg.message}</span>
                            <br/>
                            <small className="timestamp">{new Date(msg.timestamp).toLocaleString()}</small>
                        </div>
                        </div>
                        ))}
                    </div>
                    <div className="input-chat-container">
                        <input
                            className="input-chat"
                            type="text"
                            placeholder="Type a message..."
                            onChange={(e) => setMessage(e.target.value)}
                            value={message}
                            onKeyDownCapture={handleSendMessage}
                        />
                        <button className="submit-chat" onClick={() => sendMessage(selectedUser.korisnici.id_korisnika)}>
                            Send
                        </button>
                    </div>
                </>
            ) : (
                <div className="get-social">
                    <Image src={chatIcon} alt="Chat icon" className='chat-ikona' width={160} />
                    <h2 className='text'>Get Social</h2>
              </div>
            )}
        </div>

</div>

    );
};

export default Chat;
