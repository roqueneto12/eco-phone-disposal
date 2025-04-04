
import React from 'react';
import { motion } from 'framer-motion';
import { CalendarClock } from 'lucide-react';

const DashboardNotification = ({ 
  message, 
  timestamp, 
  type = 'info' 
}) => {
  // Formatação da data
  const formatTime = (timestamp) => {
    const date = new Date(timestamp);
    return new Intl.DateTimeFormat('pt-BR', {
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit'
    }).format(date);
  };

  // Define cores com base no tipo de notificação
  const getBgColor = () => {
    switch(type) {
      case 'register':
        return 'border-eco-green/30 bg-eco-green/10';
      case 'collect':
        return 'border-eco-blue/30 bg-eco-blue/10';
      default:
        return 'border-border bg-card/50';
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      className={`p-3 rounded-lg border ${getBgColor()}`}
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
