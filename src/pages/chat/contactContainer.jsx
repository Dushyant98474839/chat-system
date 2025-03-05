import { Input } from "antd";

const ContactContainer = ({ onSelectChat }) => {
  return (
    <div className="w-1/4 bg-gray-800 text-white p-4">
      <h2 className="text-lg font-bold mb-4">Contacts</h2>

      

      <button
        className="w-full p-2 bg-gray-700 hover:bg-gray-600 rounded"
        onClick={() => onSelectChat()}
      >
        Open Chat
      </button>
    </div>
  );
};

export default ContactContainer;
