import { useEffect } from 'react';
import { CheckCircle } from 'lucide-react';

interface NotificationProps {
  message: string;
  onClose: () => void;
  duration?: number;
}

export function Notification({ message, onClose, duration = 1000 }: NotificationProps) {
  useEffect(() => {
    const timer = setTimeout(() => {
      onClose();
    }, duration);

    return () => clearTimeout(timer);
  }, [duration, onClose]);

  return (
    <div className="fixed bottom-4 right-4 bg-green-500 text-white px-6 py-3 rounded-lg shadow-lg flex items-center gap-2 z-50 animate-fade-in">
      <CheckCircle className="w-5 h-5" />
      <span>{message}</span>
    </div>
  );
}
