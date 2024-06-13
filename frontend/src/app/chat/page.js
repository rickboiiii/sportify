"use client"
import { useState, useEffect, useRef } from 'react';
import Search from "@/components/SearchBar/SearchBarComponent";
import { SearchBarResult2} from "@/components/SearchBar/SearchBarStyled";
import './chat.css';

const Chat = () => {
    const [message, setMessage] = useState('');
    const [messages, setMessages] = useState([]);
    const [idKorisnika, setIdKorisnika] = useState(null); // State to store the id_igraca
    const [selectedUser, setSelectedUser] = useState(null);
    const [chats, setChats] = useState([]);
    const [chatUsers, setChatUsers] = useState([]); // State to store users with whom the chat exists
    const [token, setToken] = useState(null);
    const stock_pic = '/blank_profile_picture.png';
    useEffect(() => {
        const storedToken = localStorage.getItem('token');
        if (storedToken) {
            const parsedToken = JSON.parse(storedToken);
            setToken(parsedToken.access_token);
            fetchIdKorisnika(parsedToken.access_token);
        }
    }, []);
    
    useEffect(() => {
        if (chats.length > 0) {
            fetchUsers();
        }
    }, [chats]);
    useEffect(() => {
        if (selectedUser) {
            fetchMessages(idKorisnika, selectedUser.korisnici.id_korisnika);///////////////////////////////
        }
    }, [selectedUser]);

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
                console.log('Messages:', data);
                setMessages(data); // Set the messages state with fetched messages
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
                setIdKorisnika(data); // Set the id_igraca state
                const fetchedChats = await fetchChats(data); // Fetch chats after getting id_igraca
                setChats(fetchedChats); // Set the chats state
            } else {
                console.error('Failed to fetch id_korisnika:', response.statusText);
            }
        } catch (error) {
            console.error('Error fetching id_korisnika:', error);
        }
    };
    
    const fetchUsers = async () => {
        try {
            // Make a request to fetch users from the server
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
                console.log('All users:', allUsers);
                console.log('Fetched chats:', chats);
    
                // Filter users to include only those who have an existing chat with the current user
                const chatUserIds = chats.map(chat => chat.id_user1 === idKorisnika ? chat.id_user2 : chat.id_user1);
                console.log('Chat user IDs:', chatUserIds);
    
                const chatUsers = allUsers.filter(user => chatUserIds.includes(user.id_igraca));
                console.log('Filtered chat users:', chatUsers);
    
                setChatUsers(chatUsers); // Set the filtered users
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
                console.log('Chats:', data);
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
        console.log(user);
        console.log(user.korisnici.id_korisnika);
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
                from: idKorisnika, // Use id_igraca instead of token
                to: toUserId,
                message
            };
            ws.current.send(JSON.stringify(messagePayload));
            setMessage('');
        }
    };

    const scrollToBottom = () => {
        const chatContainer = document.querySelector('.chat');
        if (chatContainer) {
            chatContainer.scrollTop = chatContainer.scrollHeight;
        }
    };
    const handleProfileClick = (profile) => {
        // Implement the logic to start a chat with the selected profile
        console.log('Starting chat with:', profile);
        // Example: set the selected user state to the clicked profile
        setSelectedUser(profile);
     
    };

    return (
<div className="container">
       <div className='sidebar'> 
            <Search onProfileClick={handleProfileClick} />
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
                    <h3> {selectedUser.korisnicko_ime}</h3>
                    <div className="chat">
                        {messages.map((msg, index) => (
                            <div key={index} className={`message ${msg.from_user_id === idKorisnika ? 'my-message' : 'other-message'}`}>
                                <p style={{ color: msg.from === idKorisnika ? 'blue' : 'green' }}>{msg.message}</p>
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
                        />
                        <button className="submit-chat" onClick={() => sendMessage(selectedUser.id_igraca)}>
                            Send
                        </button>
                    </div>
                </>
            ) : (
                <p>Please select a user to start chatting</p>
            )}
        </div>

</div>

    );
};

export default Chat;
