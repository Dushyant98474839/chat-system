import { useState } from "react";
import ChatContainer from "./chatContainer";
import ContactContainer from "./contactContainer";
import EmptyChatContainer from "./emptychatContainer";
import { Input } from "antd";

function App() {
  const [selectedChat, setSelectedChat] = useState(null);

  return (
    <div className="flex h-screen">
      {/* Sidebar for Contacts */}
      <div className="w-1/4 bg-gray-800 text-white p-4">
        <h2 className="text-lg font-bold mb-4">Contacts</h2>
        {/* Ant Design Input for Search */}
        <Input placeholder="Search Contact" className="mb-4" />
        <br />
        <button 
          className="w-full p-2 bg-gray-700 hover:bg-gray-600 rounded"
          onClick={() => setSelectedChat("chat")}
        >
          Open Chat
        </button>
      </div>

      {/* Main Chat Area */}
      <div className="w-3/4 bg-gray-100 flex items-center justify-center">
        {selectedChat === "chat" ? <ChatContainer /> : <EmptyChatContainer />}
      </div>
    </div>
  );
}

export default App;
