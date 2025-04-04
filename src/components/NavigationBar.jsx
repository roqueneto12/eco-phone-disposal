
import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Home, Cpu, Map, Bell, UserPlus, LogIn, User } from 'lucide-react';
import { cn } from "@/lib/utils";
import { useAuth } from '../contexts/AuthContext';

export const NavigationBar = () => {
  const location = useLocation();
  const { isAuthenticated, currentUser, logout } = useAuth();
  
  const isActive = (path) => location.pathname === path;

  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-white bg-opacity-80 backdrop-blur-md border-t border-border z-50 md:top-0 md:bottom-auto md:border-t-0 md:border-b">
      <div className="container mx-auto max-w-7xl px-4 py-2">
        <div className="md:flex md:items-center md:justify-between">
          <div className="hidden md:block">
            <Link to="/" className="text-foreground font-medium text-lg">
              <span className="text-eco-green">Eco</span>Recicle
            </Link>
          </div>
          
          <ul className="flex items-center justify-around md:gap-4">
            <li>
              <Link 
                to="/" 
                className={cn("flex flex-col items-center md:flex-row md:gap-2 nav-link", 
                  isActive('/') ? "text-primary" : "text-muted-foreground"
                )}
              >
                <Home size={20} className="mb-1 md:mb-0" />
                <span className="text-xs md:text-sm">Início</span>
              </Link>
            </li>
            <li>
              <Link 
                to="/register" 
                className={cn("flex flex-col items-center md:flex-row md:gap-2 nav-link", 
                  isActive('/register') ? "text-primary" : "text-muted-foreground"
                )}
              >
                <Cpu size={20} className="mb-1 md:mb-0" />
                <span className="text-xs md:text-sm">Cadastrar</span>
              </Link>
            </li>
            <li>
              <Link 
                to="/map" 
                className={cn("flex flex-col items-center md:flex-row md:gap-2 nav-link", 
                  isActive('/map') ? "text-primary" : "text-muted-foreground"
                )}
              >
                <Map size={20} className="mb-1 md:mb-0" />
                <span className="text-xs md:text-sm">Pontos</span>
              </Link>
            </li>
            <li>
              <Link 
                to="/dashboard" 
                className={cn("flex flex-col items-center md:flex-row md:gap-2 nav-link", 
                  isActive('/dashboard') ? "text-primary" : "text-muted-foreground"
                )}
              >
                <Bell size={20} className="mb-1 md:mb-0" />
                <span className="text-xs md:text-sm">Dashboard</span>
              </Link>
            </li>
            
            {isAuthenticated() ? (
              <li className="hidden md:block">
                <div className="flex items-center gap-4">
                  <div className="text-sm font-medium">
                    Olá, {currentUser?.name?.split(' ')[0]}
                  </div>
                  <button
                    onClick={logout}
                    className="text-muted-foreground hover:text-foreground text-sm"
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
                    className={cn("flex items-center gap-2 nav-link", 
                      isActive('/login') ? "text-primary" : "text-muted-foreground"
                    )}
                  >
                    <LogIn size={18} />
                    <span className="text-sm">Login</span>
                  </Link>
                </li>
                <li className="hidden md:block">
                  <Link 
                    to="/user-register" 
                    className={cn("flex items-center gap-2 px-4 py-2 bg-eco-green text-white rounded-md hover:bg-eco-green/90")}
                  >
                    <UserPlus size={18} />
                    <span className="text-sm">Cadastrar</span>
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
