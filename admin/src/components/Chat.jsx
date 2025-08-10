import React, { useState, useEffect, useRef } from 'react';

const Chat = () => {
  const [messages, setMessages] = useState([
    {
      id: 1,
      sender: 'customer',
      name: 'John Doe',
      message: 'Hi, I have a question about my order #12345',
      timestamp: '10:30 AM',
      status: 'unread'
    },
    {
      id: 2,
      sender: 'admin',
      name: 'Admin',
      message: 'Hello John! I can help you with your order. What would you like to know?',
      timestamp: '10:32 AM',
      status: 'read'
    },
    {
      id: 3,
      sender: 'customer',
      name: 'John Doe',
      message: 'When will it be delivered?',
      timestamp: '10:33 AM',
      status: 'unread'
    }
  ]);

  const [newMessage, setNewMessage] = useState('');
  const [selectedChat, setSelectedChat] = useState(1);
  const [customers] = useState([
    { id: 1, name: 'John Doe', status: 'online', lastMessage: 'When will it be delivered?', unread: 1 },
    { id: 2, name: 'Sarah Wilson', status: 'offline', lastMessage: 'Thank you for your help!', unread: 0 },
    { id: 3, name: 'Mike Johnson', status: 'online', lastMessage: 'Is this product in stock?', unread: 2 },
    { id: 4, name: 'Emily Brown', status: 'away', lastMessage: 'Can I change my shipping address?', unread: 0 }
  ]);

  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSendMessage = () => {
    if (newMessage.trim()) {
      const message = {
        id: messages.length + 1,
        sender: 'admin',
        name: 'Admin',
        message: newMessage,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        status: 'read'
      };
      setMessages([...messages, message]);
      setNewMessage('');
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleSendMessage();
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'online': return 'bg-green-500';
      case 'offline': return 'bg-gray-500';
      case 'away': return 'bg-yellow-500';
      default: return 'bg-gray-500';
    }
  };

  return (
    <div className="bg-gradient-to-br from-gray-800 to-gray-900 rounded-xl border border-gray-700 p-6">
      <h3 className="text-xl font-bold mb-6 text-white">Customer Support Chat</h3>
      
      <div className="flex h-96">
        {/* Customer List */}
        <div className="w-1/3 border-r border-gray-700 pr-4">
          <div className="space-y-3">
            {customers.map((customer) => (
              <div
                key={customer.id}
                onClick={() => setSelectedChat(customer.id)}
                className={`p-3 rounded-lg cursor-pointer transition-colors duration-200 ${
                  selectedChat === customer.id ? 'bg-blue-600' : 'bg-gray-700 hover:bg-gray-600'
                }`}
              >
                <div className="flex items-center space-x-3">
                  <div className="relative">
                    <div className="w-10 h-10 bg-blue-500 rounded-full flex items-center justify-center">
                      <span className="text-white font-bold text-sm">
                        {customer.name.split(' ').map(n => n[0]).join('')}
                      </span>
                    </div>
                    <div className={`absolute -bottom-1 -right-1 w-3 h-3 rounded-full border-2 border-gray-800 ${getStatusColor(customer.status)}`}></div>
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className={`font-medium text-sm ${selectedChat === customer.id ? 'text-white' : 'text-gray-300'}`}>
                      {customer.name}
                    </p>
                    <p className={`text-xs truncate ${selectedChat === customer.id ? 'text-blue-200' : 'text-gray-400'}`}>
                      {customer.lastMessage}
                    </p>
                  </div>
                  {customer.unread > 0 && (
                    <div className="bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                      {customer.unread}
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Chat Area */}
        <div className="flex-1 flex flex-col pl-4">
          {/* Chat Header */}
          <div className="border-b border-gray-700 pb-3 mb-4">
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center">
                <span className="text-white font-bold text-xs">
                  {customers.find(c => c.id === selectedChat)?.name.split(' ').map(n => n[0]).join('')}
                </span>
              </div>
              <div>
                <p className="text-white font-medium">
                  {customers.find(c => c.id === selectedChat)?.name}
                </p>
                <p className="text-gray-400 text-sm">
                  {customers.find(c => c.id === selectedChat)?.status}
                </p>
              </div>
            </div>
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto space-y-4 mb-4">
            {messages.map((message) => (
              <div
                key={message.id}
                className={`flex ${message.sender === 'admin' ? 'justify-end' : 'justify-start'}`}
              >
                <div className={`max-w-xs lg:max-w-md px-4 py-2 rounded-lg ${
                  message.sender === 'admin'
                    ? 'bg-blue-600 text-white'
                    : 'bg-gray-700 text-gray-300'
                }`}>
                  <p className="text-sm">{message.message}</p>
                  <p className="text-xs mt-1 opacity-70">{message.timestamp}</p>
                </div>
              </div>
            ))}
            <div ref={messagesEndRef} />
          </div>

          {/* Message Input */}
          <div className="flex space-x-2">
            <input
              type="text"
              value={newMessage}
              onChange={(e) => setNewMessage(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder="Type your message..."
              className="flex-1 bg-gray-700 border border-gray-600 rounded-lg px-4 py-2 text-white placeholder-gray-400 focus:outline-none focus:border-blue-500"
            />
            <button
              onClick={handleSendMessage}
              className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg transition-colors duration-200"
            >
              Send
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Chat;
