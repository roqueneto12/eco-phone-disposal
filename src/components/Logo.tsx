
import React from 'react';
import { Recycle } from 'lucide-react';

const Logo: React.FC = () => {
  return (
    <div className="flex items-center gap-2">
      <div className="bg-gradient-to-r from-eco-green to-green-400 p-2 rounded-lg shadow-lg transform transition-all duration-300 hover:scale-105">
        <Recycle className="h-6 w-6 text-white" />
      </div>
      <span className="font-bold text-xl tracking-tight">
        <span className="bg-clip-text text-transparent bg-gradient-to-r from-eco-green to-green-500">Eco</span>
        <span className="text-eco-dark">Recicle</span>
      </span>
    </div>
  );
};

export default Logo;
