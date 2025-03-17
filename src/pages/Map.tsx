
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Search, Filter, MapPin, Clock, Phone, ExternalLink } from 'lucide-react';
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

// Sample collection point data
const COLLECTION_POINTS = [
  {
    id: 1,
    name: "EcoCycle Centro",
    type: "recycling",
    address: "Av. Paulista, 1000, São Paulo - SP",
    hours: "Seg-Sex: 9h às 18h, Sáb: 9h às 13h",
    phone: "(11) 3456-7890",
    distance: "1.2 km"
  },
  {
    id: 2,
    name: "Operadora Vivo",
    type: "carrier",
    address: "Rua Augusta, 2500, São Paulo - SP",
    hours: "Seg-Sáb: 10h às 22h, Dom: 12h às 20h",
    phone: "(11) 2345-6789",
    distance: "2.5 km"
  },
  {
    id: 3,
    name: "ONG Recicla Mais",
    type: "ngo",
    address: "Rua Oscar Freire, 500, São Paulo - SP",
    hours: "Seg-Sex: 8h às 17h",
    phone: "(11) 4567-8901",
    distance: "3.8 km"
  },
  {
    id: 4,
    name: "Operadora Claro",
    type: "carrier",
    address: "Av. Brigadeiro Faria Lima, 3000, São Paulo - SP",
    hours: "Seg-Sáb: 9h às 21h",
    phone: "(11) 5678-9012",
    distance: "4.1 km"
  },
  {
    id: 5,
    name: "EcoTech Reciclagem",
    type: "recycling",
    address: "Av. Rebouças, 1200, São Paulo - SP",
    hours: "Seg-Sex: 8h às 18h, Sáb: 9h às 14h",
    phone: "(11) 6789-0123",
    distance: "5.3 km"
  }
];

const getTypeLabel = (type: string) => {
  switch (type) {
    case 'recycling':
      return 'Posto de Reciclagem';
    case 'carrier':
      return 'Loja de Operadora';
    case 'ngo':
      return 'ONG';
    default:
      return type;
  }
};

const getTypeColor = (type: string) => {
  switch (type) {
    case 'recycling':
      return 'bg-green-100 text-green-800 border-green-200';
    case 'carrier':
      return 'bg-blue-100 text-blue-800 border-blue-200';
    case 'ngo':
      return 'bg-amber-100 text-amber-800 border-amber-200';
    default:
      return 'bg-gray-100 text-gray-800 border-gray-200';
  }
};

const Map = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [filter, setFilter] = useState('all');
  const [selectedPoint, setSelectedPoint] = useState<typeof COLLECTION_POINTS[0] | null>(null);
  
  const filteredPoints = COLLECTION_POINTS.filter(point => {
    const matchesFilter = filter === 'all' || point.type === filter;
    const matchesSearch = point.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          point.address.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesFilter && matchesSearch;
  });

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
            Localização
          </div>
          <h1 className="text-3xl md:text-4xl font-bold mb-4">Encontre um Ponto de Coleta</h1>
          <p className="text-muted-foreground max-w-2xl">
            Veja os locais mais próximos para descartar seu celular corretamente. Utilize os filtros para refinar sua busca.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-1 order-2 lg:order-1">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.4, delay: 0.1 }}
              className="glass-card p-6 sticky top-24"
            >
              <div className="space-y-6">
                <div className="space-y-2">
                  <div className="flex items-center">
                    <Search className="w-5 h-5 text-muted-foreground mr-2" />
                    <span className="font-medium">Buscar</span>
                  </div>
                  <Input
                    type="text"
                    placeholder="Nome ou endereço"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="bg-white/50"
                  />
                </div>

                <div className="space-y-2">
                  <div className="flex items-center">
                    <Filter className="w-5 h-5 text-muted-foreground mr-2" />
                    <span className="font-medium">Filtrar por tipo</span>
                  </div>
                  <Select value={filter} onValueChange={setFilter}>
                    <SelectTrigger className="bg-white/50">
                      <SelectValue placeholder="Todos os tipos" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">Todos os tipos</SelectItem>
                      <SelectItem value="recycling">Posto de Reciclagem</SelectItem>
                      <SelectItem value="carrier">Loja de Operadora</SelectItem>
                      <SelectItem value="ngo">ONG</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="border-t border-border pt-4">
                  <p className="text-sm text-muted-foreground mb-4">
                    {filteredPoints.length} {filteredPoints.length === 1 ? 'ponto encontrado' : 'pontos encontrados'}
                  </p>
                  
                  <div className="space-y-4 max-h-[400px] overflow-y-auto pr-2">
                    {filteredPoints.map((point) => (
                      <div 
                        key={point.id}
                        className={`p-4 rounded-lg border transition-all duration-200 cursor-pointer hover:shadow-md ${
                          selectedPoint?.id === point.id
                            ? 'border-primary bg-primary/5'
                            : 'border-border bg-white/50 hover:border-border/80'
                        }`}
                        onClick={() => setSelectedPoint(point)}
                      >
                        <div className="flex justify-between items-start mb-2">
                          <h3 className="font-medium">{point.name}</h3>
                          <Badge className={`text-xs ${getTypeColor(point.type)}`}>
                            {getTypeLabel(point.type)}
                          </Badge>
                        </div>
                        <p className="text-sm text-muted-foreground mb-2">{point.address}</p>
                        <div className="flex items-center text-xs text-muted-foreground">
                          <MapPin className="h-3 w-3 mr-1" />
                          <span>{point.distance}</span>
                        </div>
                      </div>
                    ))}
                    
                    {filteredPoints.length === 0 && (
                      <div className="text-center py-8">
                        <p className="text-muted-foreground">Nenhum ponto de coleta encontrado</p>
                        <p className="text-sm mt-2">Tente ajustar seus filtros</p>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
          
          <div className="lg:col-span-2 order-1 lg:order-2">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4 }}
              className="relative aspect-[4/3] md:aspect-[16/9] bg-eco-light rounded-2xl overflow-hidden border border-border shadow-sm"
            >
              <div className="absolute inset-0 bg-eco-green/5 hero-pattern"></div>
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="text-center p-8">
                  <p className="text-muted-foreground mb-4">Mapa interativo será exibido aqui</p>
                  <p className="text-xs text-muted-foreground mb-6">
                    Clique em um ponto de coleta na lista para visualizar detalhes
                  </p>
                  {selectedPoint && (
                    <div className="glass-card p-6 max-w-lg mx-auto text-left animate-fade-in">
                      <div className="mb-4">
                        <Badge className={`mb-2 ${getTypeColor(selectedPoint.type)}`}>
                          {getTypeLabel(selectedPoint.type)}
                        </Badge>
                        <h3 className="text-2xl font-semibold">{selectedPoint.name}</h3>
                      </div>
                      
                      <div className="space-y-3 mb-6">
                        <div className="flex items-start">
                          <MapPin className="w-5 h-5 text-eco-green mr-3 mt-0.5 flex-shrink-0" />
                          <div>
                            <p className="font-medium">Endereço</p>
                            <p className="text-sm text-muted-foreground">{selectedPoint.address}</p>
                          </div>
                        </div>
                        
                        <div className="flex items-start">
                          <Clock className="w-5 h-5 text-eco-green mr-3 mt-0.5 flex-shrink-0" />
                          <div>
                            <p className="font-medium">Horário de Funcionamento</p>
                            <p className="text-sm text-muted-foreground">{selectedPoint.hours}</p>
                          </div>
                        </div>
                        
                        <div className="flex items-start">
                          <Phone className="w-5 h-5 text-eco-green mr-3 mt-0.5 flex-shrink-0" />
                          <div>
                            <p className="font-medium">Telefone</p>
                            <p className="text-sm text-muted-foreground">{selectedPoint.phone}</p>
                          </div>
                        </div>
                      </div>
                      
                      <Button className="w-full bg-eco-green hover:bg-eco-green/90 text-white">
                        <ExternalLink className="w-4 h-4 mr-2" />
                        Obter Direções
                      </Button>
                    </div>
                  )}
                </div>
              </div>
            </motion.div>
            
            {!selectedPoint && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: 0.2 }}
                className="mt-8 glass-card p-6"
              >
                <h3 className="text-xl font-semibold mb-4">Como Funciona</h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div className="flex flex-col items-center text-center">
                    <div className="w-12 h-12 rounded-full bg-eco-green/10 flex items-center justify-center mb-3">
                      <Search className="h-6 w-6 text-eco-green" />
                    </div>
                    <h4 className="font-medium mb-2">Procure</h4>
                    <p className="text-sm text-muted-foreground">
                      Pesquise pontos de coleta próximos à sua localização
                    </p>
                  </div>
                  
                  <div className="flex flex-col items-center text-center">
                    <div className="w-12 h-12 rounded-full bg-eco-green/10 flex items-center justify-center mb-3">
                      <MapPin className="h-6 w-6 text-eco-green" />
                    </div>
                    <h4 className="font-medium mb-2">Localize</h4>
                    <p className="text-sm text-muted-foreground">
                      Veja detalhes e obtenha direções para o ponto escolhido
                    </p>
                  </div>
                  
                  <div className="flex flex-col items-center text-center">
                    <div className="w-12 h-12 rounded-full bg-eco-green/10 flex items-center justify-center mb-3">
                      <Phone className="h-6 w-6 text-eco-green" />
                    </div>
                    <h4 className="font-medium mb-2">Entregue</h4>
                    <p className="text-sm text-muted-foreground">
                      Leve seu dispositivo para descarte responsável
                    </p>
                  </div>
                </div>
              </motion.div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Map;
