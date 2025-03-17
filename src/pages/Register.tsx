import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Smartphone, Upload, Check } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { toast } from "@/hooks/use-toast";

const Register = () => {
  const [phoneName, setPhoneName] = useState('');
  const [condition, setCondition] = useState('working');
  const [image, setImage] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setImage(file);
      
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate API call
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSuccess(true);
      
      toast("Celular cadastrado com sucesso!", {
        description: "Obrigado por contribuir com o meio ambiente!",
      });
      
      // Reset after 2 seconds
      setTimeout(() => {
        setIsSuccess(false);
        setPhoneName('');
        setCondition('working');
        setImage(null);
        setImagePreview(null);
      }, 2000);
    }, 1500);
  };

  return (
    <div className="min-h-screen flex flex-col pt-16 md:pt-24 pb-24">
      <div className="flex-1 container max-w-4xl mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
          className="mb-8"
        >
          <div className="inline-block px-3 py-1 mb-4 bg-eco-blue/30 text-eco-dark rounded-full text-sm font-medium">
            Cadastro
          </div>
          <h1 className="text-3xl md:text-4xl font-bold mb-4">Cadastre seu Celular para Descarte</h1>
          <p className="text-muted-foreground max-w-2xl">
            Preencha as informações abaixo sobre seu dispositivo. Após o cadastro, você poderá encontrar o ponto de coleta mais próximo.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">
          <div className="lg:col-span-3">
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.1 }}
              className="glass-card p-6 md:p-8"
            >
              <form onSubmit={handleSubmit}>
                <div className="space-y-6">
                  <div className="space-y-2">
                    <Label htmlFor="phone-name">Nome do celular</Label>
                    <Input
                      id="phone-name"
                      placeholder="Ex: iPhone 11, Samsung Galaxy S20"
                      value={phoneName}
                      onChange={(e) => setPhoneName(e.target.value)}
                      required
                      className="bg-white/50"
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label>Estado do aparelho</Label>
                    <RadioGroup 
                      value={condition} 
                      onValueChange={setCondition}
                      className="flex flex-col space-y-1"
                    >
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="working" id="working" />
                        <Label htmlFor="working" className="cursor-pointer">Funcionando</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="defective" id="defective" />
                        <Label htmlFor="defective" className="cursor-pointer">Defeituoso</Label>
                      </div>
                    </RadioGroup>
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="phone-image">Foto do celular (opcional)</Label>
                    <div className="border-2 border-dashed border-border rounded-lg p-6 flex flex-col items-center justify-center text-center">
                      <input
                        type="file"
                        id="phone-image"
                        accept="image/*"
                        onChange={handleImageChange}
                        className="sr-only"
                      />
                      {!imagePreview ? (
                        <Label 
                          htmlFor="phone-image" 
                          className="flex flex-col items-center space-y-2 cursor-pointer"
                        >
                          <div className="w-12 h-12 rounded-full bg-eco-green/10 flex items-center justify-center">
                            <Upload className="h-6 w-6 text-eco-green" />
                          </div>
                          <span className="text-sm text-muted-foreground">
                            Clique para adicionar uma imagem
                          </span>
                          <span className="text-xs text-muted-foreground">
                            PNG, JPG ou JPEG (max. 5MB)
                          </span>
                        </Label>
                      ) : (
                        <div className="relative w-full">
                          <img 
                            src={imagePreview} 
                            alt="Preview" 
                            className="mx-auto max-h-48 rounded-lg object-contain"
                          />
                          <button
                            type="button"
                            onClick={() => {
                              setImage(null);
                              setImagePreview(null);
                            }}
                            className="mt-2 text-sm text-destructive hover:text-destructive/80"
                          >
                            Remover imagem
                          </button>
                        </div>
                      )}
                    </div>
                  </div>
                  
                  <Button 
                    type="submit" 
                    className="w-full bg-eco-green hover:bg-eco-green/90 text-white"
                    disabled={!phoneName || isSubmitting || isSuccess}
                  >
                    {isSubmitting ? (
                      <span className="flex items-center">
                        <span className="animate-spin mr-2">◌</span>
                        Enviando...
                      </span>
                    ) : isSuccess ? (
                      <span className="flex items-center">
                        <Check className="mr-2 h-4 w-4" />
                        Cadastrado com Sucesso!
                      </span>
                    ) : (
                      "Enviar Cadastro"
                    )}
                  </Button>
                </div>
              </form>
            </motion.div>
          </div>
          
          <div className="lg:col-span-2">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.2 }}
              className="glass-card p-6 md:p-8"
            >
              <div className="mb-4 flex items-center space-x-3">
                <div className="w-10 h-10 rounded-full bg-eco-green/20 flex items-center justify-center">
                  <Smartphone className="h-5 w-5 text-eco-green" />
                </div>
                <h3 className="text-xl font-semibold">Seu impacto positivo</h3>
              </div>
              
              <p className="text-muted-foreground mb-6">
                Seu descarte responsável ajuda o meio ambiente! A reciclagem de um único smartphone pode:
              </p>
              
              <ul className="space-y-4">
                <li className="flex items-start">
                  <div className="w-6 h-6 rounded-full bg-eco-green/20 flex items-center justify-center mr-3 mt-0.5">
                    <Check className="h-3 w-3 text-eco-green" />
                  </div>
                  <p className="text-sm">Economizar energia suficiente para carregar 60 smartphones</p>
                </li>
                <li className="flex items-start">
                  <div className="w-6 h-6 rounded-full bg-eco-green/20 flex items-center justify-center mr-3 mt-0.5">
                    <Check className="h-3 w-3 text-eco-green" />
                  </div>
                  <p className="text-sm">Recuperar metais preciosos como ouro, prata e cobre</p>
                </li>
                <li className="flex items-start">
                  <div className="w-6 h-6 rounded-full bg-eco-green/20 flex items-center justify-center mr-3 mt-0.5">
                    <Check className="h-3 w-3 text-eco-green" />
                  </div>
                  <p className="text-sm">Evitar que substâncias tóxicas contaminem o solo e água</p>
                </li>
                <li className="flex items-start">
                  <div className="w-6 h-6 rounded-full bg-eco-green/20 flex items-center justify-center mr-3 mt-0.5">
                    <Check className="h-3 w-3 text-eco-green" />
                  </div>
                  <p className="text-sm">Reduzir a necessidade de extração de novos recursos da natureza</p>
                </li>
              </ul>
              
              <div className="mt-8 p-4 bg-eco-green/10 rounded-lg border border-eco-green/20">
                <p className="text-sm text-eco-dark font-medium">
                  Após o cadastro, você receberá orientações sobre os pontos de coleta mais próximos da sua região.
                </p>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;
