
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useNavigate, Link } from 'react-router-dom';
import { LogIn, AlertTriangle } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { toast } from "@/hooks/use-toast";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    // Validate inputs
    if (!email || !password) {
      setError('Todos os campos são obrigatórios');
      setIsLoading(false);
      return;
    }

    // Simulating login API call
    setTimeout(() => {
      // Get users from localStorage
      const users = JSON.parse(localStorage.getItem('ecoRecicleUsers') || '[]');
      
      // Find user by email and password
      const user = users.find(u => u.email === email && u.password === password);
      
      if (user) {
        login(user);
        toast({
          title: "Login realizado com sucesso",
          description: "Bem-vindo de volta!",
        });
        navigate('/dashboard');
      } else {
        setError('Email ou senha incorretos');
      }
      
      setIsLoading(false);
    }, 1000);
  };

  return (
    <div className="min-h-screen flex flex-col pt-16 md:pt-24 pb-24">
      <div className="flex-1 container max-w-md mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
          className="mb-8"
        >
          <div className="inline-block px-3 py-1 mb-4 bg-eco-blue/30 text-eco-dark rounded-full text-sm font-medium">
            Login
          </div>
          <h1 className="text-3xl md:text-4xl font-bold mb-4">Faça login na sua conta</h1>
          <p className="text-muted-foreground max-w-2xl">
            Entre para acessar o painel e gerenciar seus dispositivos eletrônicos.
          </p>
        </motion.div>

        <Card className="w-full">
          <CardHeader>
            <CardTitle>Login</CardTitle>
            <CardDescription>
              Digite suas credenciais para acessar sua conta
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              {error && (
                <div className="bg-destructive/10 p-3 rounded-md flex items-start space-x-2">
                  <AlertTriangle className="h-5 w-5 text-destructive shrink-0 mt-0.5" />
                  <p className="text-sm text-destructive">{error}</p>
                </div>
              )}
              
              <div className="space-y-2">
                <label htmlFor="email" className="text-sm font-medium">
                  Email
                </label>
                <Input
                  id="email"
                  type="email"
                  placeholder="seu@email.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
              
              <div className="space-y-2">
                <label htmlFor="password" className="text-sm font-medium">
                  Senha
                </label>
                <Input
                  id="password"
                  type="password"
                  placeholder="Sua senha"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>

              <Button
                type="submit"
                className="w-full bg-eco-green hover:bg-eco-green/90 text-white"
                disabled={isLoading}
              >
                {isLoading ? (
                  <span className="flex items-center">
                    <span className="animate-spin mr-2">◌</span>
                    Entrando...
                  </span>
                ) : (
                  <span className="flex items-center">
                    <LogIn className="mr-2 h-4 w-4" />
                    Entrar
                  </span>
                )}
              </Button>

              <div className="text-center text-sm">
                Não tem uma conta?{" "}
                <Link to="/user-register" className="text-primary hover:underline">
                  Cadastre-se
                </Link>
              </div>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Login;
