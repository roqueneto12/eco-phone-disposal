
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useNavigate, Link } from 'react-router-dom';
import { UserPlus, AlertTriangle, Check } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { toast } from "@/hooks/use-toast";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

const UserRegister = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const { register } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    // Validate inputs
    if (!name || !email || !password || !confirmPassword) {
      setError('Todos os campos são obrigatórios');
      setIsLoading(false);
      return;
    }

    if (password !== confirmPassword) {
      setError('As senhas não correspondem');
      setIsLoading(false);
      return;
    }

    if (password.length < 6) {
      setError('A senha deve ter pelo menos 6 caracteres');
      setIsLoading(false);
      return;
    }

    // Register user
    const result = register({
      name,
      email,
      password
    });

    setIsLoading(false);

    if (result.success) {
      setIsSuccess(true);
      
      // Show success toast
      toast({
        title: "Cadastro realizado com sucesso",
        description: "Você foi automaticamente conectado",
      });
      
      // Redirect to dashboard after short delay
      setTimeout(() => {
        navigate('/dashboard');
      }, 1500);
    } else {
      setError(result.message || 'Erro ao cadastrar usuário');
    }
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
            Cadastro
          </div>
          <h1 className="text-3xl md:text-4xl font-bold mb-4">Crie sua conta</h1>
          <p className="text-muted-foreground max-w-2xl">
            Cadastre-se para ter acesso completo à plataforma e monitorar o descarte responsável.
          </p>
        </motion.div>

        <Card className="w-full">
          <CardHeader>
            <CardTitle>Cadastro de Usuário</CardTitle>
            <CardDescription>
              Preencha os dados abaixo para criar sua conta
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
                <label htmlFor="name" className="text-sm font-medium">
                  Nome completo
                </label>
                <Input
                  id="name"
                  type="text"
                  placeholder="Seu nome completo"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
              </div>
              
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
                  placeholder="Mínimo 6 caracteres"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
              
              <div className="space-y-2">
                <label htmlFor="confirmPassword" className="text-sm font-medium">
                  Confirmar senha
                </label>
                <Input
                  id="confirmPassword"
                  type="password"
                  placeholder="Confirme sua senha"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                />
              </div>

              <Button
                type="submit"
                className="w-full bg-eco-green hover:bg-eco-green/90 text-white"
                disabled={isLoading || isSuccess}
              >
                {isLoading ? (
                  <span className="flex items-center">
                    <span className="animate-spin mr-2">◌</span>
                    Cadastrando...
                  </span>
                ) : isSuccess ? (
                  <span className="flex items-center">
                    <Check className="mr-2 h-4 w-4" />
                    Cadastrado com Sucesso!
                  </span>
                ) : (
                  <span className="flex items-center">
                    <UserPlus className="mr-2 h-4 w-4" />
                    Criar Conta
                  </span>
                )}
              </Button>

              <div className="text-center text-sm">
                Já tem uma conta?{" "}
                <Link to="/login" className="text-primary hover:underline">
                  Faça login
                </Link>
              </div>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default UserRegister;
