import { useEffect, useState } from 'react';
import './ChatBot.css';
import axios from 'axios';
import api from '../api/axios';

interface Message {
  role: 'user' | 'assistant';
  content: string;
}

function ChatBot({ onClose }: { onClose: () => void }) {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const welcomeMessage: Message = {
      role: 'assistant',
      content: 'AI에게 무엇이든 물어보세요 😊 (게시판 정보 기반으로 잘못된 정보일 수 있습니다.)',
    };
    setMessages([welcomeMessage]);
  }, []);

  const handleSend = async () => {
    if (!input.trim() || loading) return;

    const newUserMessage: Message = { role: 'user', content: input };
    setMessages((prev) => [...prev, newUserMessage]);
    setInput('');
    setLoading(true);

    try {
      const res = await api.post('/ai', {
        question: input,
      });

      console.log(res.data)
      const replyText = extractReplyText(res.data);
      const replyMessage: Message = {
        role: 'assistant',
        content: replyText,
      };

      setMessages((prev) => [...prev, replyMessage]);
    } catch (error) {
      console.error('AI 응답 실패', error);
      setMessages((prev) => [
        ...prev,
        {
          role: 'assistant',
          content: '죄송해요, 현재 응답할 수 없어요 😢',
        },
      ]);
    } finally {
      setLoading(false);
    }
  };

  const extractReplyText = (responseJson: any): string => {
    try {
      const obj = typeof responseJson === 'string' ? JSON.parse(responseJson) : responseJson;
      return obj.choices?.[0]?.message?.content?.trim() || '응답을 이해하지 못했어요.';
    } catch {
      return '응답을 파싱할 수 없어요.';
    }
  };

  return (
    <div className="chatbot-container">
      <div className="chatbot-header">
        <span>AI Search</span>
        <button onClick={onClose}>✖</button>
      </div>

      <div className="chatbot-body">
        {messages.map((msg, idx) => (
          <div key={idx} className={`chat-message ${msg.role}`}>
            {msg.content}
          </div>
        ))}
        {loading && (
          <div className="chat-message assistant">답변을 작성 중입니다...</div>
        )}
      </div>

      <div className="chatbot-input-area">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === 'Enter') handleSend();
          }}
          placeholder="메시지를 입력하세요..."
          disabled={loading}
        />
        <button onClick={handleSend} disabled={loading}>
          전송
        </button>
      </div>
    </div>
  );
}

export default ChatBot;
