import { GoPaperclip } from "react-icons/go";

const ChatContainer = () => {
  const handleSend = () => {
    console.log("Message Sent");
  }
  return (
    <div className="w-full h-full flex flex-col">
      <div className="bg-blue-500 text-white p-4 font-bold">Chat Window</div>
      <div className="flex-1 p-4 overflow-y-auto">
        {/* Messages will go here */}
      </div>
      <div className="p-4 bg-white border-t flex">
        <div className="relative flex items-center border rounded px-2 w-full">
          {/* Paperclip Icon */}
          <GoPaperclip className="text-gray-500 text-xl cursor-pointer" />

          {/* Input Field */}
          <input
            type="text"
            className="flex-1 p-2 outline-none border-none"
            placeholder="Type a message..."
          />
        </div>
        <button
          className="ml-2 p-2 bg-blue-500 text-white rounded transition transform active:scale-95 hover:bg-blue-600"
          onClick={handleSend}
        >
          Send
        </button>

      </div>
    </div>
  );
};

export default ChatContainer;
