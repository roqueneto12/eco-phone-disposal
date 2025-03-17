
import React from 'react';
import { Link } from 'react-router-dom';
import { Smartphone, Map, Recycle } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { motion } from 'framer-motion';

const Index = () => {
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
                    Descarte Seu Celular de Forma Sustentável
                  </h1>
                  <p className="text-lg md:text-xl text-muted-foreground mb-8 max-w-2xl">
                    Evite impactos ambientais! Cadastre seu celular e encontre o ponto de coleta mais próximo.
                  </p>
                  <div className="flex flex-col sm:flex-row gap-4">
                    <Button asChild size="lg" className="bg-eco-green hover:bg-eco-green/90 text-white shadow-lg transition-all duration-300 hover:shadow-xl hover:translate-y-[-2px]">
                      <Link to="/register">
                        <Smartphone className="mr-2 h-5 w-5" />
                        Cadastrar Celular
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
                        <p className="text-sm">Cadastre seu aparelho</p>
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

        {/* Benefits Section */}
        <section className="py-16 bg-eco-light">
          <div className="container mx-auto px-4 max-w-7xl">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">Por que reciclar celulares?</h2>
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
