
import React from 'react';
import { motion } from 'framer-motion';
import { CalendarClock } from 'lucide-react';

interface DashboardNotificationProps {
  message: string;
  timestamp: string;
}

const DashboardNotification = ({ message, timestamp }: DashboardNotificationProps) => {
  // Formatação da data
  const formatTime = (timestamp: string) => {
    const date = new Date(timestamp);
    return new Intl.DateTimeFormat('pt-BR', {
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit'
    }).format(date);
  };

  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      className="p-3 rounded-lg border border-border bg-card/50"
    >
      <p className="text-sm">{message}</p>
      <div className="flex items-center mt-2 text-xs text-muted-foreground">
        <CalendarClock className="mr-1 h-3 w-3" />
        {formatTime(timestamp)}
      </div>
    </motion.div>
  );
};

export default DashboardNotification;
