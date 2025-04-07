
import React from 'react';
import { Star } from 'lucide-react';

const Logo = () => {
  return (
    <div className="flex items-center gap-2">
      <div className="bg-eco-green p-1 rounded-md">
        <Star className="h-5 w-5 text-white" />
      </div>
      <span className="font-medium text-lg">
        <span className="text-eco-green">Eco</span>Recicle
      </span>
    </div>
  );
};

export default Logo;
