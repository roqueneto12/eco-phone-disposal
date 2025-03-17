
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Bell, Trash2, Star, Calendar, Info, Check, AlarmClock } from 'lucide-react';
import { Switch } from "@/components/ui/switch";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

// Sample notification data
const INITIAL_NOTIFICATIONS = [
  {
    id: 1,
    title: 'Lembrete de Descarte',
    description: 'Seu iPhone 11 está há 30 dias aguardando descarte!',
    date: '2023-10-15T10:30:00',
    type: 'reminder',
    read: false,
    starred: false
  },
  {
    id: 2,
    title: 'Novo Ponto de Coleta',
    description: 'Um novo ponto de coleta foi adicionado próximo à sua localização.',
    date: '2023-10-10T09:15:00',
    type: 'location',
    read: true,
    starred: true
  },
  {
    id: 3,
    title: 'Promoção Especial',
    description: 'Ganhe descontos especiais ao descartar mais de um dispositivo!',
    date: '2023-10-05T14:45:00',
    type: 'promo',
    read: true,
    starred: false
  },
  {
    id: 4,
    title: 'Dica Sustentável',
    description: 'Sabia que você pode prolongar a vida útil da bateria do seu celular?',
    date: '2023-10-01T11:20:00',
    type: 'tip',
    read: false,
    starred: false
  },
  {
    id: 5,
    title: 'Relatório de Impacto',
    description: 'Seu descarte anterior economizou 30kg de CO2! Veja o relatório completo.',
    date: '2023-09-25T16:10:00',
    type: 'impact',
    read: true,
    starred: false
  }
];

const formatDate = (dateString: string) => {
  const date = new Date(dateString);
  return new Intl.DateTimeFormat('pt-BR', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  }).format(date);
};

const getTypeIcon = (type: string) => {
  switch (type) {
    case 'reminder':
      return <AlarmClock className="h-5 w-5" />;
    case 'location':
      return <Bell className="h-5 w-5" />;
    case 'promo':
      return <Calendar className="h-5 w-5" />;
    case 'tip':
      return <Info className="h-5 w-5" />;
    case 'impact':
      return <Check className="h-5 w-5" />;
    default:
      return <Bell className="h-5 w-5" />;
  }
};

const getTypeColor = (type: string) => {
  switch (type) {
    case 'reminder':
      return 'bg-amber-100 text-amber-800 border-amber-200';
    case 'location':
      return 'bg-green-100 text-green-800 border-green-200';
    case 'promo':
      return 'bg-blue-100 text-blue-800 border-blue-200';
    case 'tip':
      return 'bg-purple-100 text-purple-800 border-purple-200';
    case 'impact':
      return 'bg-teal-100 text-teal-800 border-teal-200';
    default:
      return 'bg-gray-100 text-gray-800 border-gray-200';
  }
};

const getTypeLabel = (type: string) => {
  switch (type) {
    case 'reminder':
      return 'Lembrete';
    case 'location':
      return 'Localização';
    case 'promo':
      return 'Promoção';
    case 'tip':
      return 'Dica';
    case 'impact':
      return 'Impacto';
    default:
      return type;
  }
};

type Notification = typeof INITIAL_NOTIFICATIONS[0];

const Notifications = () => {
  const [notifications, setNotifications] = useState(INITIAL_NOTIFICATIONS);
  const [notificationsEnabled, setNotificationsEnabled] = useState(true);
  const [filter, setFilter] = useState('all');
  const [selectedNotification, setSelectedNotification] = useState<Notification | null>(null);
  
  const handleMarkAsRead = (id: number) => {
    setNotifications(notifications.map(notification => 
      notification.id === id ? { ...notification, read: true } : notification
    ));
  };
  
  const handleToggleStar = (id: number) => {
    setNotifications(notifications.map(notification => 
      notification.id === id ? { ...notification, starred: !notification.starred } : notification
    ));
  };
  
  const handleDeleteNotification = (id: number) => {
    setNotifications(notifications.filter(notification => notification.id !== id));
    if (selectedNotification?.id === id) {
      setSelectedNotification(null);
    }
  };
  
  const handleClearAll = () => {
    setNotifications([]);
    setSelectedNotification(null);
  };
  
  const filteredNotifications = notifications.filter(notification => {
    if (filter === 'all') return true;
    if (filter === 'unread') return !notification.read;
    if (filter === 'starred') return notification.starred;
    return notification.type === filter;
  });
  
  const unreadCount = notifications.filter(notification => !notification.read).length;

  return (
    <div className="min-h-screen flex flex-col pt-16 md:pt-24 pb-24">
      <div className="flex-1 container max-w-7xl mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
          className="mb-8"
        >
          <div className="inline-block px-3 py-1 mb-4 bg-eco-blue/30 text-eco-dark rounded-full text-sm font-medium">
            Alertas
          </div>
          <div className="flex flex-wrap justify-between items-center gap-4">
            <h1 className="text-3xl md:text-4xl font-bold">Lembretes de Descarte</h1>
            <div className="flex items-center space-x-3">
              <span className="text-sm text-muted-foreground">Notificações</span>
              <Switch
                checked={notificationsEnabled}
                onCheckedChange={setNotificationsEnabled}
              />
            </div>
          </div>
          <p className="text-muted-foreground max-w-2xl mt-4">
            Receba notificações sobre seus dispositivos cadastrados, novos pontos de coleta e dicas de sustentabilidade.
          </p>
        </motion.div>

        {notificationsEnabled ? (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-1">
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.4, delay: 0.1 }}
                className="glass-card p-6 sticky top-24"
              >
                <div className="flex justify-between items-center mb-6">
                  <h2 className="text-xl font-semibold flex items-center">
                    <Bell className="mr-2 h-5 w-5 text-eco-green" />
                    Notificações
                    {unreadCount > 0 && (
                      <span className="ml-2 bg-eco-green text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                        {unreadCount}
                      </span>
                    )}
                  </h2>
                  {notifications.length > 0 && (
                    <Button 
                      variant="outline" 
                      size="sm" 
                      onClick={handleClearAll}
                      className="text-xs h-8"
                    >
                      Limpar Todas
                    </Button>
                  )}
                </div>
                
                <div className="flex flex-wrap gap-2 mb-4">
                  <Button 
                    variant={filter === 'all' ? "default" : "outline"} 
                    size="sm" 
                    onClick={() => setFilter('all')}
                    className={filter === 'all' ? "bg-eco-green hover:bg-eco-green/90" : ""}
                  >
                    Todas
                  </Button>
                  <Button 
                    variant={filter === 'unread' ? "default" : "outline"} 
                    size="sm" 
                    onClick={() => setFilter('unread')}
                    className={filter === 'unread' ? "bg-eco-green hover:bg-eco-green/90" : ""}
                  >
                    Não lidas
                  </Button>
                  <Button 
                    variant={filter === 'starred' ? "default" : "outline"} 
                    size="sm" 
                    onClick={() => setFilter('starred')}
                    className={filter === 'starred' ? "bg-eco-green hover:bg-eco-green/90" : ""}
                  >
                    Favoritas
                  </Button>
                </div>
                
                <div className="space-y-3 max-h-[450px] overflow-y-auto pr-1">
                  {filteredNotifications.length > 0 ? (
                    filteredNotifications.map((notification) => (
                      <div 
                        key={notification.id}
                        className={cn(
                          "p-4 rounded-lg border transition-all duration-200 cursor-pointer hover:shadow-sm",
                          notification.read ? "bg-white/50" : "bg-eco-green/5 border-eco-green/20",
                          selectedNotification?.id === notification.id && "border-primary bg-primary/5"
                        )}
                        onClick={() => {
                          setSelectedNotification(notification);
                          if (!notification.read) {
                            handleMarkAsRead(notification.id);
                          }
                        }}
                      >
                        <div className="flex justify-between items-start mb-2">
                          <div className="flex items-start space-x-3">
                            <div className={cn(
                              "w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0",
                              notification.read ? "bg-muted" : "bg-eco-green/20"
                            )}>
                              {getTypeIcon(notification.type)}
                            </div>
                            <div>
                              <h3 className={cn(
                                "font-medium line-clamp-1",
                                !notification.read && "font-semibold"
                              )}>
                                {notification.title}
                              </h3>
                              <p className="text-xs text-muted-foreground mt-1">
                                {formatDate(notification.date)}
                              </p>
                            </div>
                          </div>
                          <button 
                            onClick={(e) => {
                              e.stopPropagation();
                              handleToggleStar(notification.id);
                            }}
                            className="text-muted-foreground hover:text-amber-400 transition-colors"
                          >
                            <Star className={cn(
                              "h-4 w-4",
                              notification.starred && "fill-amber-400 text-amber-400"
                            )} />
                          </button>
                        </div>
                        <p className="text-sm text-muted-foreground line-clamp-2 ml-11">
                          {notification.description}
                        </p>
                      </div>
                    ))
                  ) : (
                    <div className="text-center py-8">
                      <Bell className="h-8 w-8 text-muted-foreground mx-auto mb-3" />
                      <p className="text-muted-foreground">Nenhuma notificação {filter !== 'all' && 'com este filtro'}</p>
                      {filter !== 'all' && (
                        <Button 
                          variant="link" 
                          onClick={() => setFilter('all')}
                          className="mt-1 h-auto p-0 text-eco-green"
                        >
                          Ver todas as notificações
                        </Button>
                      )}
                    </div>
                  )}
                </div>
              </motion.div>
            </div>
            
            <div className="lg:col-span-2">
              {selectedNotification ? (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4 }}
                  className="glass-card p-6 md:p-8"
                >
                  <div className="flex justify-between items-start mb-6">
                    <div className="flex items-center">
                      <div className={`w-10 h-10 rounded-full flex items-center justify-center mr-4 ${
                        getTypeColor(selectedNotification.type).replace('border-', 'bg-').split(' ')[0]
                      }`}>
                        {getTypeIcon(selectedNotification.type)}
                      </div>
                      <div>
                        <Badge className={`mb-2 ${getTypeColor(selectedNotification.type)}`}>
                          {getTypeLabel(selectedNotification.type)}
                        </Badge>
                        <h2 className="text-2xl font-semibold">{selectedNotification.title}</h2>
                        <p className="text-sm text-muted-foreground mt-1">
                          {formatDate(selectedNotification.date)}
                        </p>
                      </div>
                    </div>
                    <div className="flex space-x-2">
                      <button
                        onClick={() => handleToggleStar(selectedNotification.id)}
                        className="p-2 rounded-full hover:bg-muted/50 transition-colors"
                      >
                        <Star className={cn(
                          "h-5 w-5",
                          selectedNotification.starred 
                            ? "fill-amber-400 text-amber-400" 
                            : "text-muted-foreground"
                        )} />
                      </button>
                      <button
                        onClick={() => handleDeleteNotification(selectedNotification.id)}
                        className="p-2 rounded-full hover:bg-muted/50 transition-colors text-muted-foreground hover:text-destructive"
                      >
                        <Trash2 className="h-5 w-5" />
                      </button>
                    </div>
                  </div>
                  
                  <div className="prose max-w-none">
                    <p className="text-foreground text-lg">
                      {selectedNotification.description}
                    </p>
                    
                    {/* Sample content for different notification types */}
                    {selectedNotification.type === 'reminder' && (
                      <div className="mt-6 p-6 bg-amber-50 rounded-lg border border-amber-100">
                        <h3 className="text-amber-800 font-medium mb-2">Lembrete de Descarte</h3>
                        <p className="text-amber-700">
                          Seu dispositivo iPhone 11 está há 30 dias aguardando descarte. Agora é um bom momento para visitar um dos nossos pontos de coleta.
                        </p>
                        <Button className="mt-4 bg-amber-600 hover:bg-amber-700 text-white">
                          Ver Pontos de Coleta
                        </Button>
                      </div>
                    )}
                    
                    {selectedNotification.type === 'location' && (
                      <div className="mt-6">
                        <h3 className="font-medium mb-3">Detalhes do Novo Ponto de Coleta</h3>
                        <div className="bg-white/80 p-4 rounded-lg border border-border mb-4">
                          <h4 className="font-medium">EcoTech Reciclagem</h4>
                          <p className="text-sm mt-1">Av. Rebouças, 1200, São Paulo - SP</p>
                          <p className="text-sm text-muted-foreground mt-1">Seg-Sex: 8h às 18h, Sáb: 9h às 14h</p>
                          <p className="text-sm text-muted-foreground mt-1">(11) 6789-0123</p>
                        </div>
                        <Button className="bg-eco-green hover:bg-eco-green/90 text-white">
                          Ver no Mapa
                        </Button>
                      </div>
                    )}
                    
                    {selectedNotification.type === 'promo' && (
                      <div className="mt-6">
                        <h3 className="font-medium mb-3">Detalhes da Promoção</h3>
                        <p>
                          Ao descartar mais de um dispositivo eletrônico, você pode ganhar:
                        </p>
                        <ul className="mt-3 space-y-2">
                          <li className="flex items-center">
                            <Check className="h-4 w-4 text-eco-green mr-2" />
                            <span>Certificado de descarte sustentável</span>
                          </li>
                          <li className="flex items-center">
                            <Check className="h-4 w-4 text-eco-green mr-2" />
                            <span>Descontos em produtos parceiros</span>
                          </li>
                          <li className="flex items-center">
                            <Check className="h-4 w-4 text-eco-green mr-2" />
                            <span>Participação em sorteio de produtos ecológicos</span>
                          </li>
                        </ul>
                        <p className="text-sm text-muted-foreground mt-4">
                          Promoção válida até 31/12/2023.
                        </p>
                      </div>
                    )}
                  </div>
                </motion.div>
              ) : (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4 }}
                  className="glass-card p-6 md:p-8 flex flex-col items-center justify-center min-h-[300px] text-center"
                >
                  <Bell className="h-12 w-12 text-muted-foreground mb-4" />
                  <h2 className="text-xl font-semibold mb-2">Central de Notificações</h2>
                  <p className="text-muted-foreground max-w-md">
                    Selecione uma notificação à esquerda para ver seus detalhes, ou aguarde novas notificações sobre seus dispositivos e pontos de coleta.
                  </p>
                  
                  {filteredNotifications.length === 0 && notifications.length > 0 && filter !== 'all' && (
                    <Button 
                      variant="link" 
                      onClick={() => setFilter('all')}
                      className="mt-4 text-eco-green"
                    >
                      Ver todas as notificações
                    </Button>
                  )}
                  
                  {notifications.length === 0 && (
                    <div className="mt-6 p-4 bg-eco-green/5 rounded-lg border border-eco-green/20 max-w-md">
                      <p className="text-sm">
                        Você receberá notificações sobre novos pontos de coleta, lembretes de descarte e dicas sustentáveis.
                      </p>
                    </div>
                  )}
                </motion.div>
              )}
              
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: 0.2 }}
                className="mt-8 glass-card p-6"
              >
                <h3 className="text-xl font-semibold mb-4">Preferências de Notificação</h3>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="font-medium">Lembretes de Descarte</h4>
                      <p className="text-sm text-muted-foreground">Receba lembretes sobre celulares cadastrados</p>
                    </div>
                    <Switch defaultChecked />
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="font-medium">Novos Pontos de Coleta</h4>
                      <p className="text-sm text-muted-foreground">Seja notificado sobre novos pontos próximos</p>
                    </div>
                    <Switch defaultChecked />
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="font-medium">Dicas Sustentáveis</h4>
                      <p className="text-sm text-muted-foreground">Receba informações sobre sustentabilidade</p>
                    </div>
                    <Switch defaultChecked />
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="font-medium">Promoções e Campanhas</h4>
                      <p className="text-sm text-muted-foreground">Fique informado sobre campanhas especiais</p>
                    </div>
                    <Switch defaultChecked />
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        ) : (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            className="glass-card p-8 md:p-12 flex flex-col items-center text-center max-w-2xl mx-auto"
          >
            <div className="w-20 h-20 rounded-full bg-muted flex items-center justify-center mb-6">
              <Bell className="h-10 w-10 text-muted-foreground" />
            </div>
            <h2 className="text-2xl font-semibold mb-3">Notificações Desativadas</h2>
            <p className="text-muted-foreground mb-6">
              Você desativou as notificações. Ative-as novamente para receber lembretes sobre seus dispositivos e informações sobre pontos de coleta.
            </p>
            <Button 
              onClick={() => setNotificationsEnabled(true)}
              className="bg-eco-green hover:bg-eco-green/90 text-white"
            >
              Ativar Notificações
            </Button>
            <p className="text-xs text-muted-foreground mt-6 max-w-md">
              As notificações são importantes para garantir que você não se esqueça de descartar seus dispositivos corretamente, contribuindo para um mundo mais sustentável.
            </p>
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default Notifications;
