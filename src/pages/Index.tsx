
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { 
  Smartphone, 
  Map, 
  Recycle, 
  Laptop, 
  Tv,
  Cpu,
  PlusCircle,
  CheckCircle
} from 'lucide-react';
import { Button } from "@/components/ui/button";
import { motion } from 'framer-motion';
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardHeader, 
  CardTitle 
} from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { 
  LineChart, 
  Line, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  Legend, 
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell
} from 'recharts';
import DashboardNotification from '@/components/DashboardNotification';

// Tipo para dispositivo eletrônico
interface ElectronicDevice {
  id: string;
  name: string;
  type: string;
  status: 'registered' | 'collected';
  registeredAt: string;
  collectedAt?: string;
}

const Index = () => {
  // Estado para os dispositivos
  const [devices, setDevices] = useState<ElectronicDevice[]>(() => {
    const savedDevices = localStorage.getItem('electronicDevices');
    return savedDevices ? JSON.parse(savedDevices) : [];
  });
  
  // Estado para as métricas
  const [metrics, setMetrics] = useState({
    registered: 0,
    collected: 0,
    deviceTypes: {} as Record<string, number>
  });
  
  // Estado para as notificações
  const [notifications, setNotifications] = useState<Array<{
    id: string;
    message: string;
    timestamp: string;
    type: 'register' | 'collect' | 'info';
  }>>([]);
  
  // Estado para os dados do gráfico mensal
  const [monthlyData, setMonthlyData] = useState<Array<{
    month: string;
    registered: number;
    collected: number;
  }>>([]);

  // Formulário para cadastro rápido
  const form = useForm({
    defaultValues: {
      deviceName: "",
      deviceType: "smartphone"
    }
  });

  // Efeito para inicializar os dados
  useEffect(() => {
    // Calcular métricas com base nos dispositivos
    const registered = devices.length;
    const collected = devices.filter(d => d.status === 'collected').length;
    
    // Calcular tipos de dispositivos
    const deviceTypes = devices.reduce((acc, device) => {
      acc[device.type] = (acc[device.type] || 0) + 1;
      return acc;
    }, {} as Record<string, number>);
    
    setMetrics({
      registered,
      collected,
      deviceTypes
    });
    
    // Gerar dados mensais para o gráfico
    generateMonthlyData();
    
    // Salvar dispositivos no localStorage
    localStorage.setItem('electronicDevices', JSON.stringify(devices));
  }, [devices]);
  
  // Função para gerar dados mensais para o gráfico
  const generateMonthlyData = () => {
    const months = ['Jan', 'Fev', 'Mar', 'Abr', 'Mai', 'Jun', 'Jul', 'Ago', 'Set', 'Out', 'Nov', 'Dez'];
    const currentMonth = new Date().getMonth();
    
    const data = months.map((month, index) => {
      // Filtra dispositivos registrados neste mês
      const monthRegistered = devices.filter(d => {
        const date = new Date(d.registeredAt);
        return date.getMonth() === index;
      }).length;
      
      // Filtra dispositivos coletados neste mês
      const monthCollected = devices.filter(d => {
        if (!d.collectedAt) return false;
        const date = new Date(d.collectedAt);
        return date.getMonth() === index;
      }).length;
      
      return {
        month,
        registered: monthRegistered,
        collected: monthCollected
      };
    });
    
    setMonthlyData(data);
  };
  
  // Função para adicionar um novo dispositivo
  const registerDevice = (data: { deviceName: string; deviceType: string }) => {
    const newDevice: ElectronicDevice = {
      id: Date.now().toString(),
      name: data.deviceName,
      type: data.deviceType,
      status: 'registered',
      registeredAt: new Date().toISOString()
    };
    
    setDevices(prev => [...prev, newDevice]);
    
    // Adicionar notificação
    const newNotification = {
      id: Date.now().toString(),
      message: `Novo dispositivo registrado: ${data.deviceName}`,
      timestamp: new Date().toISOString(),
      type: 'register' as const
    };
    
    setNotifications(prev => [newNotification, ...prev].slice(0, 10));
    
    toast.success(`Dispositivo ${data.deviceName} cadastrado com sucesso!`);
    form.reset();
  };
  
  // Função para coletar um dispositivo (simulação)
  const collectDevice = (id: string) => {
    setDevices(prev => prev.map(device => {
      if (device.id === id) {
        const updated = {
          ...device,
          status: 'collected' as const,
          collectedAt: new Date().toISOString()
        };
        
        // Adicionar notificação
        const newNotification = {
          id: Date.now().toString(),
          message: `Dispositivo coletado: ${device.name}`,
          timestamp: new Date().toISOString(),
          type: 'collect' as const
        };
        
        setNotifications(prev => [newNotification, ...prev].slice(0, 10));
        
        toast.success(`Dispositivo ${device.name} coletado com sucesso!`);
        return updated;
      }
      return device;
    }));
  };
  
  // Dados para o gráfico de pizza
  const pieData = Object.entries(metrics.deviceTypes).map(([type, count]) => ({
    name: type,
    value: count
  }));
  
  // Cores para o gráfico de pizza
  const COLORS = ['#34D399', '#60A5FA', '#A78BFA', '#F87171', '#FBBF24'];
  
  // Função para obter ícone baseado no tipo
  const getDeviceIcon = (type: string) => {
    switch(type) {
      case 'smartphone':
        return <Smartphone className="h-5 w-5" />;
      case 'tv':
        return <Tv className="h-5 w-5" />;
      case 'laptop':
        return <Laptop className="h-5 w-5" />;
      default:
        return <Cpu className="h-5 w-5" />;
    }
  };

  // Simulação de registro e coleta automáticos
  useEffect(() => {
    // Adicionar um dispositivo automaticamente a cada 30 segundos
    const registerInterval = setInterval(() => {
      const deviceTypes = ['smartphone', 'tv', 'laptop', 'tablet', 'impressora'];
      const randomType = deviceTypes[Math.floor(Math.random() * deviceTypes.length)];
      const randomName = `${randomType.charAt(0).toUpperCase() + randomType.slice(1)} #${Math.floor(Math.random() * 1000)}`;
      
      const newDevice: ElectronicDevice = {
        id: Date.now().toString(),
        name: randomName,
        type: randomType,
        status: 'registered',
        registeredAt: new Date().toISOString()
      };
      
      setDevices(prev => [...prev, newDevice]);
      
      // Adicionar notificação
      const newNotification = {
        id: Date.now().toString(),
        message: `Novo dispositivo registrado: ${randomName}`,
        timestamp: new Date().toISOString(),
        type: 'register' as const
      };
      
      setNotifications(prev => [newNotification, ...prev].slice(0, 10));
    }, 30000);
    
    // Coletar um dispositivo aleatório a cada 45 segundos
    const collectInterval = setInterval(() => {
      const registeredDevices = devices.filter(d => d.status === 'registered');
      if (registeredDevices.length > 0) {
        const randomIndex = Math.floor(Math.random() * registeredDevices.length);
        collectDevice(registeredDevices[randomIndex].id);
      }
    }, 45000);
    
    return () => {
      clearInterval(registerInterval);
      clearInterval(collectInterval);
    };
  }, [devices]);

  return (
    <div className="min-h-screen flex flex-col">
      <div className="flex-1 flex flex-col">
        {/* Hero Section */}
        <section className="relative py-16 md:py-24 hero-pattern">
          <div className="container mx-auto px-4 max-w-7xl">
            <div className="flex flex-col md:flex-row items-center md:space-x-12">
              <div className="md:w-1/2 mb-12 md:mb-0">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5 }}
                >
                  <div className="inline-block px-3 py-1 mb-6 bg-eco-blue/30 text-eco-dark rounded-full text-sm font-medium">
                    Descarte Sustentável
                  </div>
                  <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 tracking-tight text-eco-dark">
                    Descarte Seus Eletrônicos de Forma Sustentável
                  </h1>
                  <p className="text-lg md:text-xl text-muted-foreground mb-8 max-w-2xl">
                    Evite impactos ambientais! Cadastre seus dispositivos eletrônicos e encontre o ponto de coleta mais próximo.
                  </p>
                  <div className="flex flex-col sm:flex-row gap-4">
                    <Button asChild size="lg" className="bg-eco-green hover:bg-eco-green/90 text-white shadow-lg transition-all duration-300 hover:shadow-xl hover:translate-y-[-2px]">
                      <Link to="/register">
                        <PlusCircle className="mr-2 h-5 w-5" />
                        Cadastrar Dispositivo
                      </Link>
                    </Button>
                    <Button asChild variant="outline" size="lg" className="border-eco-green text-eco-dark hover:bg-eco-green/10 shadow-sm transition-all duration-300 hover:shadow-md">
                      <Link to="/map">
                        <Map className="mr-2 h-5 w-5" />
                        Ver Pontos de Coleta
                      </Link>
                    </Button>
                  </div>
                </motion.div>
              </div>
              <div className="md:w-1/2 flex justify-center">
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ 
                    duration: 0.5,
                    delay: 0.2,
                  }}
                  className="relative w-full max-w-md"
                >
                  <div className="absolute inset-0 bg-gradient-to-br from-eco-green/20 to-eco-blue/20 rounded-[40px] blur-3xl transform -rotate-6"></div>
                  <div className="relative bg-white/60 backdrop-blur-sm border border-white/40 rounded-[30px] p-8 shadow-glass">
                    <div className="flex items-center justify-center mb-8">
                      <div className="w-24 h-24 rounded-full bg-eco-green/10 flex items-center justify-center animate-float">
                        <Recycle className="h-12 w-12 text-eco-green" />
                      </div>
                    </div>
                    <div className="space-y-6">
                      <div className="glass-card p-4 flex items-center space-x-4">
                        <div className="w-10 h-10 rounded-full bg-eco-green/20 flex items-center justify-center">
                          <span className="text-eco-green font-semibold">1</span>
                        </div>
                        <p className="text-sm">Cadastre seu dispositivo</p>
                      </div>
                      <div className="glass-card p-4 flex items-center space-x-4">
                        <div className="w-10 h-10 rounded-full bg-eco-green/20 flex items-center justify-center">
                          <span className="text-eco-green font-semibold">2</span>
                        </div>
                        <p className="text-sm">Encontre um ponto de coleta</p>
                      </div>
                      <div className="glass-card p-4 flex items-center space-x-4">
                        <div className="w-10 h-10 rounded-full bg-eco-green/20 flex items-center justify-center">
                          <span className="text-eco-green font-semibold">3</span>
                        </div>
                        <p className="text-sm">Contribua com o meio ambiente</p>
                      </div>
                    </div>
                  </div>
                </motion.div>
              </div>
            </div>
          </div>
        </section>

        {/* Dashboard Section */}
        <section className="py-16 bg-eco-light">
          <div className="container mx-auto px-4 max-w-7xl">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">Dashboard Interativo de Reciclagem</h2>
              <p className="text-muted-foreground max-w-3xl mx-auto">
                Acompanhe em tempo real o status dos dispositivos eletrônicos registrados e coletados em nossa plataforma.
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-10">
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                viewport={{ once: true }}
              >
                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-lg font-medium">Dispositivos Registrados</CardTitle>
                    <CardDescription>Total de eletrônicos cadastrados</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="flex items-center">
                      <PlusCircle className="h-8 w-8 text-eco-green mr-4" />
                      <div>
                        <div className="text-3xl font-bold">{metrics.registered}</div>
                        <div className="text-xs text-muted-foreground">
                          Atualizando em tempo real
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
              
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.1 }}
                viewport={{ once: true }}
              >
                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-lg font-medium">Dispositivos Coletados</CardTitle>
                    <CardDescription>Total de eletrônicos reciclados</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="flex items-center">
                      <CheckCircle className="h-8 w-8 text-eco-green mr-4" />
                      <div>
                        <div className="text-3xl font-bold">{metrics.collected}</div>
                        <div className="text-xs text-muted-foreground">
                          Atualizando em tempo real
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
              
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                viewport={{ once: true }}
              >
                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-lg font-medium">Cadastro Rápido</CardTitle>
                    <CardDescription>Adicione um dispositivo sem conta</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <Form {...form}>
                      <form onSubmit={form.handleSubmit(registerDevice)} className="space-y-3">
                        <FormField
                          control={form.control}
                          name="deviceName"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Nome do Dispositivo</FormLabel>
                              <FormControl>
                                <Input placeholder="Ex: iPhone 11" {...field} required />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        <FormField
                          control={form.control}
                          name="deviceType"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Tipo</FormLabel>
                              <FormControl>
                                <select 
                                  className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                                  {...field}
                                >
                                  <option value="smartphone">Smartphone</option>
                                  <option value="laptop">Laptop/Notebook</option>
                                  <option value="tablet">Tablet</option>
                                  <option value="tv">TV</option>
                                  <option value="impressora">Impressora</option>
                                  <option value="outro">Outro</option>
                                </select>
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        <Button 
                          type="submit" 
                          className="w-full bg-eco-green hover:bg-eco-green/90"
                        >
                          Cadastrar
                        </Button>
                      </form>
                    </Form>
                  </CardContent>
                </Card>
              </motion.div>
            </div>
            
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                viewport={{ once: true }}
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
                        <LineChart
                          data={monthlyData}
                          margin={{ top: 20, right: 30, left: 0, bottom: 5 }}
                        >
                          <CartesianGrid strokeDasharray="3 3" vertical={false} />
                          <XAxis dataKey="month" />
                          <YAxis />
                          <Tooltip />
                          <Legend />
                          <Line 
                            type="monotone" 
                            dataKey="registered" 
                            name="Registrados" 
                            stroke="#34D399" 
                            activeDot={{ r: 8 }} 
                            strokeWidth={2}
                          />
                          <Line 
                            type="monotone" 
                            dataKey="collected" 
                            name="Coletados" 
                            stroke="#60A5FA" 
                            strokeWidth={2}
                          />
                        </LineChart>
                      </ResponsiveContainer>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
              
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.1 }}
                viewport={{ once: true }}
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
                            data={pieData.length ? pieData : [{ name: 'Sem dados', value: 1 }]}
                            cx="50%"
                            cy="50%"
                            labelLine={false}
                            outerRadius={80}
                            fill="#8884d8"
                            dataKey="value"
                            label={({ name, percent }) => 
                              `${name} ${(percent * 100).toFixed(0)}%`
                            }
                          >
                            {pieData.map((entry, index) => (
                              <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                            ))}
                          </Pie>
                          <Tooltip />
                        </PieChart>
                      </ResponsiveContainer>
                    </div>
                    
                    <div className="mt-4 space-y-2">
                      <h4 className="text-sm font-medium">Atividade Recente</h4>
                      <div className="space-y-2 max-h-[200px] overflow-y-auto">
                        {notifications.slice(0, 5).map((notification) => (
                          <DashboardNotification
                            key={notification.id}
                            message={notification.message}
                            timestamp={notification.timestamp}
                            type={notification.type}
                          />
                        ))}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Benefits Section */}
        <section className="py-16 bg-white">
          <div className="container mx-auto px-4 max-w-7xl">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">Por que reciclar dispositivos eletrônicos?</h2>
              <p className="text-muted-foreground max-w-3xl mx-auto">
                O descarte correto de dispositivos eletrônicos é crucial para preservação do meio ambiente e da saúde pública.
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                viewport={{ once: true }}
                className="glass-card p-6"
              >
                <div className="w-12 h-12 rounded-full bg-eco-blue/30 flex items-center justify-center mb-4">
                  <span className="text-eco-dark text-xl font-semibold">♻️</span>
                </div>
                <h3 className="text-xl font-semibold mb-3">Redução de lixo eletrônico</h3>
                <p className="text-muted-foreground">
                  Evite que materiais tóxicos contaminem o solo e a água com o descarte adequado.
                </p>
              </motion.div>
              
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.1 }}
                viewport={{ once: true }}
                className="glass-card p-6"
              >
                <div className="w-12 h-12 rounded-full bg-eco-blue/30 flex items-center justify-center mb-4">
                  <span className="text-eco-dark text-xl font-semibold">🔄</span>
                </div>
                <h3 className="text-xl font-semibold mb-3">Reaproveitamento de materiais</h3>
                <p className="text-muted-foreground">
                  Componentes como ouro, prata e cobre podem ser recuperados e reutilizados.
                </p>
              </motion.div>
              
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                viewport={{ once: true }}
                className="glass-card p-6"
              >
                <div className="w-12 h-12 rounded-full bg-eco-blue/30 flex items-center justify-center mb-4">
                  <span className="text-eco-dark text-xl font-semibold">🌱</span>
                </div>
                <h3 className="text-xl font-semibold mb-3">Preservação ambiental</h3>
                <p className="text-muted-foreground">
                  Contribua para a redução da extração de recursos naturais e emissão de gases poluentes.
                </p>
              </motion.div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default Index;
