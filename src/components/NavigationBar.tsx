
import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Home, Cpu, Map, Bell } from 'lucide-react';
import { cn } from "@/lib/utils";
import Logo from './Logo';

export const NavigationBar = () => {
  const location = useLocation();
  
  const isActive = (path: string) => location.pathname === path;

  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-white shadow-lg border-t border-border z-50 md:top-0 md:bottom-auto md:border-t-0 md:border-b md:bg-opacity-95 md:backdrop-blur-md">
      <div className="container mx-auto max-w-7xl px-4 py-3">
        <div className="md:flex md:items-center md:justify-between">
          <div className="hidden md:block">
            <Link to="/" className="text-foreground">
              <Logo />
            </Link>
          </div>
          
          <ul className="flex items-center justify-around md:gap-2">
            <li>
              <Link 
                to="/" 
                className={cn(
                  "flex flex-col items-center md:flex-row md:gap-2 px-4 py-2 rounded-lg transition-all duration-300", 
                  isActive('/') 
                    ? "text-white bg-eco-green md:bg-eco-green/90 font-medium shadow-md" 
                    : "text-eco-dark hover:bg-eco-green/10"
                )}
              >
                <Home size={20} className="mb-1 md:mb-0" />
                <span className="text-xs md:text-sm">Início</span>
              </Link>
            </li>
            <li>
              <Link 
                to="/register" 
                className={cn(
                  "flex flex-col items-center md:flex-row md:gap-2 px-4 py-2 rounded-lg transition-all duration-300", 
                  isActive('/register') 
                    ? "text-white bg-eco-green md:bg-eco-green/90 font-medium shadow-md" 
                    : "text-eco-dark hover:bg-eco-green/10"
                )}
              >
                <Cpu size={20} className="mb-1 md:mb-0" />
                <span className="text-xs md:text-sm">Cadastrar</span>
              </Link>
            </li>
            <li>
              <Link 
                to="/map" 
                className={cn(
                  "flex flex-col items-center md:flex-row md:gap-2 px-4 py-2 rounded-lg transition-all duration-300", 
                  isActive('/map') 
                    ? "text-white bg-eco-green md:bg-eco-green/90 font-medium shadow-md" 
                    : "text-eco-dark hover:bg-eco-green/10"
                )}
              >
                <Map size={20} className="mb-1 md:mb-0" />
                <span className="text-xs md:text-sm">Pontos</span>
              </Link>
            </li>
            <li>
              <Link 
                to="/notifications" 
                className={cn(
                  "flex flex-col items-center md:flex-row md:gap-2 px-4 py-2 rounded-lg transition-all duration-300", 
                  isActive('/notifications') 
                    ? "text-white bg-eco-green md:bg-eco-green/90 font-medium shadow-md" 
                    : "text-eco-dark hover:bg-eco-green/10"
                )}
              >
                <Bell size={20} className="mb-1 md:mb-0" />
                <span className="text-xs md:text-sm">Alertas</span>
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default NavigationBar;
