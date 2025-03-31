
import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  Legend
} from 'recharts';
import { 
  Smartphone, 
  Tv, 
  Laptop, 
  Cpu, 
  Calendar, 
  MapPin, 
  AlertCircle,
  Check,
  Clock
} from 'lucide-react';
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardHeader, 
  CardTitle 
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import DashboardNotification from '@/components/DashboardNotification';

// Dados simulados para a dashboard
const dummyData = {
  recentDevices: [
    { id: 1, type: 'smartphone', name: 'iPhone 11', status: 'registered', timestamp: '2023-11-05T10:30:00', location: 'São Paulo' },
    { id: 2, type: 'tv', name: 'Samsung Smart TV', status: 'collected', timestamp: '2023-11-04T15:45:00', location: 'Rio de Janeiro' },
    { id: 3, type: 'computer', name: 'Dell Laptop', status: 'registered', timestamp: '2023-11-04T09:15:00', location: 'Belo Horizonte' },
    { id: 4, type: 'other', name: 'Impressora HP', status: 'collected', timestamp: '2023-11-03T14:20:00', location: 'Curitiba' },
    { id: 5, type: 'smartphone', name: 'Samsung Galaxy S21', status: 'registered', timestamp: '2023-11-03T11:10:00', location: 'Brasília' },
  ],
  typeStats: [
    { name: 'Smartphones', value: 35 },
    { name: 'Televisores', value: 20 },
    { name: 'Computadores', value: 25 },
    { name: 'Outros', value: 20 },
  ],
  statusStats: [
    { name: 'Registrados', value: 65 },
    { name: 'Coletados', value: 35 },
  ],
  monthlyStats: [
    { name: 'Jan', registrados: 10, coletados: 8 },
    { name: 'Fev', registrados: 15, coletados: 12 },
    { name: 'Mar', registrados: 12, coletados: 10 },
    { name: 'Abr', registrados: 8, coletados: 6 },
    { name: 'Mai', registrados: 20, coletados: 15 },
    { name: 'Jun', registrados: 25, coletados: 20 },
    { name: 'Jul', registrados: 18, coletados: 14 },
    { name: 'Ago', registrados: 22, coletados: 18 },
    { name: 'Set', registrados: 30, coletados: 22 },
    { name: 'Out', registrados: 28, coletados: 18 },
    { name: 'Nov', registrados: 15, coletados: 10 },
    { name: 'Dez', registrados: 12, coletados: 8 },
  ],
  totalStats: {
    registered: 125,
    collected: 80,
    collectionPoints: 45,
  }
};

// Cores para os gráficos
const COLORS = ['#34D399', '#60A5FA', '#A78BFA', '#F87171'];
const STATUS_COLORS = ['#34D399', '#60A5FA'];

const Dashboard = () => {
  const [notifications, setNotifications] = useState<Array<{id: number, message: string, timestamp: string}>>([]);
  const [stats, setStats] = useState(dummyData);

  // Simulação de notificações em tempo real
  useEffect(() => {
    // Notificação inicial
    setNotifications([
      { id: 1, message: 'Novo dispositivo registrado: iPhone 11', timestamp: new Date().toISOString() }
    ]);

    // Timer para adicionar novas notificações a cada 15 segundos
    const timer = setInterval(() => {
      const randomDevice = ['Smartphone', 'TV', 'Notebook', 'Tablet', 'Impressora'][Math.floor(Math.random() * 5)];
      const isRegistered = Math.random() > 0.5;
      const newNotification = {
        id: Date.now(),
        message: isRegistered 
          ? `Novo dispositivo registrado: ${randomDevice}` 
          : `Dispositivo coletado: ${randomDevice}`,
        timestamp: new Date().toISOString()
      };

      setNotifications(prev => [newNotification, ...prev].slice(0, 10));

      // Atualiza estatísticas
      if (isRegistered) {
        setStats(prev => ({
          ...prev,
          totalStats: {
            ...prev.totalStats,
            registered: prev.totalStats.registered + 1
          }
        }));
      } else {
        setStats(prev => ({
          ...prev,
          totalStats: {
            ...prev.totalStats,
            collected: prev.totalStats.collected + 1
          }
        }));
      }
    }, 15000);

    return () => clearInterval(timer);
  }, []);

  // Função para retornar o ícone com base no tipo de dispositivo
  const getDeviceIcon = (type: string) => {
    switch (type) {
      case 'smartphone':
        return <Smartphone className="h-5 w-5 text-eco-green" />;
      case 'tv':
        return <Tv className="h-5 w-5 text-eco-green" />;
      case 'computer':
        return <Laptop className="h-5 w-5 text-eco-green" />;
      default:
        return <Cpu className="h-5 w-5 text-eco-green" />;
    }
  };

  // Função para formatar a data para exibição
  const formatDate = (timestamp: string) => {
    const date = new Date(timestamp);
    return new Intl.DateTimeFormat('pt-BR', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    }).format(date);
  };

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
            Dashboard
          </div>
          <h1 className="text-3xl md:text-4xl font-bold mb-4">Dashboard de Monitoramento</h1>
          <p className="text-muted-foreground max-w-2xl">
            Acompanhe em tempo real os dispositivos eletrônicos registrados e coletados em nossa plataforma.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.1 }}
          >
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-lg font-medium">Total de Dispositivos</CardTitle>
                <CardDescription>Dispositivos registrados na plataforma</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex items-center">
                  <AlertCircle className="h-8 w-8 text-eco-green mr-4" />
                  <div>
                    <div className="text-3xl font-bold">{stats.totalStats.registered}</div>
                    <div className="text-xs text-muted-foreground">
                      +{Math.floor(Math.random() * 5) + 1} nas últimas 24h
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.2 }}
          >
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-lg font-medium">Dispositivos Coletados</CardTitle>
                <CardDescription>Dispositivos encaminhados para reciclagem</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex items-center">
                  <Check className="h-8 w-8 text-eco-green mr-4" />
                  <div>
                    <div className="text-3xl font-bold">{stats.totalStats.collected}</div>
                    <div className="text-xs text-muted-foreground">
                      +{Math.floor(Math.random() * 3) + 1} nas últimas 24h
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.3 }}
          >
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-lg font-medium">Pontos de Coleta</CardTitle>
                <CardDescription>Locais disponíveis para descarte</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex items-center">
                  <MapPin className="h-8 w-8 text-eco-green mr-4" />
                  <div>
                    <div className="text-3xl font-bold">{stats.totalStats.collectionPoints}</div>
                    <div className="text-xs text-muted-foreground">
                      Em todo o Brasil
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.1 }}
            className="lg:col-span-2"
          >
            <Card className="h-full">
              <CardHeader>
                <CardTitle>Estatísticas Mensais</CardTitle>
                <CardDescription>Dispositivos registrados vs. coletados por mês</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-80">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart
                      data={stats.monthlyStats}
                      margin={{ top: 20, right: 30, left: 0, bottom: 5 }}
                    >
                      <CartesianGrid strokeDasharray="3 3" vertical={false} />
                      <XAxis dataKey="name" />
                      <YAxis />
                      <Tooltip />
                      <Legend />
                      <Bar dataKey="registrados" name="Registrados" fill="#34D399" radius={[4, 4, 0, 0]} />
                      <Bar dataKey="coletados" name="Coletados" fill="#60A5FA" radius={[4, 4, 0, 0]} />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.2 }}
          >
            <Card className="h-full">
              <CardHeader>
                <CardTitle>Tipo de Dispositivos</CardTitle>
                <CardDescription>Distribuição por categoria</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-64">
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie
                        data={stats.typeStats}
                        cx="50%"
                        cy="50%"
                        labelLine={false}
                        outerRadius={80}
                        fill="#8884d8"
                        dataKey="value"
                        label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                      >
                        {stats.typeStats.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                        ))}
                      </Pie>
                      <Tooltip />
                    </PieChart>
                  </ResponsiveContainer>
                </div>

                <div className="flex flex-wrap gap-2 mt-4 justify-center">
                  {stats.typeStats.map((entry, index) => (
                    <div key={index} className="flex items-center space-x-1">
                      <div 
                        className="w-3 h-3 rounded-full" 
                        style={{ backgroundColor: COLORS[index % COLORS.length] }}
                      ></div>
                      <span className="text-xs">{entry.name}</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.1 }}
            className="lg:col-span-2"
          >
            <Card className="h-full">
              <CardHeader>
                <div className="flex justify-between items-center">
                  <CardTitle>Últimos Dispositivos</CardTitle>
                  <Tabs defaultValue="all">
                    <TabsList className="grid grid-cols-3 h-8 w-[270px]">
                      <TabsTrigger value="all" className="text-xs">Todos</TabsTrigger>
                      <TabsTrigger value="registered" className="text-xs">Registrados</TabsTrigger>
                      <TabsTrigger value="collected" className="text-xs">Coletados</TabsTrigger>
                    </TabsList>
                  </Tabs>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {stats.recentDevices.map((device) => (
                    <div key={device.id} className="flex items-start space-x-4 p-3 rounded-lg hover:bg-muted/50 transition-colors">
                      <div className="w-10 h-10 rounded-full bg-eco-green/10 flex items-center justify-center">
                        {getDeviceIcon(device.type)}
                      </div>
                      <div className="flex-1">
                        <div className="flex justify-between items-start">
                          <div>
                            <h3 className="font-medium">{device.name}</h3>
                            <p className="text-xs text-muted-foreground flex items-center mt-1">
                              <MapPin className="mr-1 h-3 w-3" />
                              {device.location}
                            </p>
                          </div>
                          <Badge variant={device.status === 'registered' ? 'default' : 'secondary'}>
                            {device.status === 'registered' ? 'Registrado' : 'Coletado'}
                          </Badge>
                        </div>
                        <div className="flex items-center mt-2 text-xs text-muted-foreground">
                          <Calendar className="mr-1 h-3 w-3" />
                          {formatDate(device.timestamp)}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.2 }}
          >
            <Card className="h-full">
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Clock className="h-5 w-5 mr-2" />
                  Atividade em Tempo Real
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4 max-h-[500px] overflow-auto">
                  {notifications.map((notification) => (
                    <DashboardNotification 
                      key={notification.id}
                      message={notification.message}
                      timestamp={notification.timestamp}
                    />
                  ))}
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
