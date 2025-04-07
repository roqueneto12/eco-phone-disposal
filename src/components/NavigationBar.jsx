
import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Home, Cpu, Map, Bell, UserPlus, LogIn } from 'lucide-react';
import { cn } from "@/lib/utils";
import { useAuth } from '../contexts/AuthContext';
import Logo from './Logo';

export const NavigationBar = () => {
  const location = useLocation();
  const { isAuthenticated, currentUser, logout } = useAuth();
  
  const isActive = (path) => location.pathname === path;

  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-white shadow-lg border-t border-border z-50 md:top-0 md:bottom-auto md:border-t-0 md:border-b md:bg-opacity-95 md:backdrop-blur-md">
      <div className="container mx-auto max-w-7xl px-4 py-3">
        <div className="md:flex md:items-center md:justify-between">
          <div className="hidden md:block">
            <Link to="/" className="text-foreground">
              <Logo />
            </Link>
          </div>
          
          <ul className="flex items-center justify-around md:gap-4">
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
                to="/dashboard" 
                className={cn(
                  "flex flex-col items-center md:flex-row md:gap-2 px-4 py-2 rounded-lg transition-all duration-300", 
                  isActive('/dashboard') 
                    ? "text-white bg-eco-green md:bg-eco-green/90 font-medium shadow-md" 
                    : "text-eco-dark hover:bg-eco-green/10"
                )}
              >
                <Bell size={20} className="mb-1 md:mb-0" />
                <span className="text-xs md:text-sm">Dashboard</span>
              </Link>
            </li>
            
            {isAuthenticated() ? (
              <li className="hidden md:block">
                <div className="flex items-center gap-4 bg-green-50 px-4 py-2 rounded-lg shadow-sm">
                  <div className="text-sm font-medium text-eco-dark">
                    Olá, {currentUser?.name?.split(' ')[0]}
                  </div>
                  <button
                    onClick={logout}
                    className="text-red-500 hover:text-red-700 text-sm font-medium"
                  >
                    Sair
                  </button>
                </div>
              </li>
            ) : (
              <>
                <li className="hidden md:block">
                  <Link 
                    to="/login" 
                    className={cn(
                      "flex items-center gap-2 px-4 py-2 rounded-lg transition-all duration-300",
                      isActive('/login') 
                        ? "bg-eco-green/10 text-eco-green font-medium" 
                        : "text-eco-dark hover:bg-eco-green/10"
                    )}
                  >
                    <LogIn size={18} />
                    <span className="text-sm">Login</span>
                  </Link>
                </li>
                <li className="hidden md:block">
                  <Link 
                    to="/user-register" 
                    className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-eco-green to-green-400 text-white rounded-lg hover:shadow-lg transition-all duration-300"
                  >
                    <UserPlus size={18} />
                    <span className="text-sm font-medium">Cadastrar</span>
                  </Link>
                </li>
              </>
            )}
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default NavigationBar;
