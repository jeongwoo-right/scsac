import './ChatButton.css';

function ChatButton({ onClick }: { onClick: () => void }) {
  return (
    <button className="chat-button" onClick={onClick}>
      💬
    </button>
  );
}

export default ChatButton;
