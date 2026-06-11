"use client"

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import AuthButton from '@/components/auth/AuthButton';
import { Trophy, Calendar, BarChart3, Settings, Home } from 'lucide-react';
import { cn } from '@/lib/utils';

const navItems = [
  { icon: Home, label: 'Inicio', href: '/' },
  { icon: Calendar, label: 'Calendario', href: '/calendar' },
  { icon: Trophy, label: 'Ranking', href: '/ranking' },
  { icon: BarChart3, label: 'Estadísticas', href: '/stats' },
  { icon: Settings, label: 'Admin', href: '/admin' },
];

export default function Shell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container flex h-16 items-center justify-between px-4 mx-auto">
          <div className="flex items-center gap-2">
            <div className="w-10 h-10 bg-primary flex items-center justify-center rounded-full blue-gradient">
              <Trophy className="text-white h-6 w-6" />
            </div>
            <span className="text-lg font-headline font-bold hidden sm:inline-block tracking-tight">
              QUINIELA <span className="text-accent">2026</span>
            </span>
          </div>
          <div className="flex items-center gap-6">
            <nav className="hidden md:flex items-center gap-6 text-sm font-medium">
              {navItems.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className={cn(
                    "transition-colors hover:text-accent",
                    pathname === item.href ? "text-accent font-bold" : "text-muted-foreground"
                  )}
                >
                  {item.label}
                </Link>
              ))}
            </nav>
            <AuthButton />
          </div>
        </div>
      </header>
      
      <main className="flex-1 container mx-auto px-4 py-8">
        {children}
      </main>

      <nav className="md:hidden fixed bottom-0 left-0 right-0 z-50 bg-background border-t flex items-center justify-around h-16 pb-safe">
        {navItems.map((item) => (
          <Link
            key={item.href}
            href={item.href}
            className={cn(
              "flex flex-col items-center justify-center w-full h-full gap-1",
              pathname === item.href ? "text-accent" : "text-muted-foreground"
            )}
          >
            <item.icon className="h-5 w-5" />
            <span className="text-[10px]">{item.label}</span>
          </Link>
        ))}
      </nav>
    </div>
  );
}