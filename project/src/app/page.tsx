"use client"

import Shell from '@/components/layout/Shell';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import Countdown from '@/components/dashboard/Countdown';
import { Trophy, TrendingUp, Calendar, Zap } from 'lucide-react';
import { Progress } from '@/components/ui/progress';
import { cn } from '@/lib/utils';

export default function Home() {
  // Datos de ejemplo para la demostración
  const nextMatch = {
    local: "México",
    visitante: "USA",
    fecha: new Date(Date.now() + 1000 * 60 * 60 * 24 * 2).toISOString(),
    fase: "Fase de Grupos"
  };

  const topPlayers = [
    { nombre: "Carlos Pérez", puntos: 45, foto: "https://picsum.photos/seed/1/40/40" },
    { nombre: "Ana García", puntos: 42, foto: "https://picsum.photos/seed/2/40/40" },
    { nombre: "Luis Rodríguez", puntos: 38, foto: "https://picsum.photos/seed/3/40/40" },
  ];

  return (
    <Shell>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Próximo Partido Destacado */}
        <Card className="md:col-span-2 overflow-hidden border-none blue-gradient text-white shadow-xl">
          <CardHeader>
            <div className="flex justify-between items-start">
              <div>
                <CardDescription className="text-blue-100 font-medium uppercase tracking-widest text-xs">Próximo Encuentro</CardDescription>
                <CardTitle className="text-3xl mt-1 font-headline">{nextMatch.local} vs {nextMatch.visitante}</CardTitle>
                <p className="text-blue-200 text-sm mt-1">{nextMatch.fase}</p>
              </div>
              <div className="bg-white/10 p-2 rounded-full">
                <Calendar className="h-6 w-6" />
              </div>
            </div>
          </CardHeader>
          <CardContent className="flex flex-col items-center justify-center py-8">
            <Countdown targetDate={nextMatch.fecha} />
          </CardContent>
        </Card>

        {/* Estadísticas Rápidas del Usuario */}
        <Card className="border-accent/20 bg-accent/5">
          <CardHeader>
            <CardTitle className="text-xl flex items-center gap-2">
              <Zap className="h-5 w-5 text-accent" /> Mi Rendimiento
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="flex justify-between items-end">
              <div>
                <p className="text-sm text-muted-foreground">Puntos Totales</p>
                <h3 className="text-4xl font-headline font-bold text-accent">24</h3>
              </div>
              <div className="text-right">
                <p className="text-sm text-muted-foreground">Posición</p>
                <h3 className="text-2xl font-bold text-primary">#7</h3>
              </div>
            </div>
            <div className="space-y-2">
              <div className="flex justify-between text-xs">
                <span>Efectividad</span>
                <span>65%</span>
              </div>
              <Progress value={65} className="h-2 bg-secondary" />
            </div>
          </CardContent>
        </Card>

        {/* Mini Ranking */}
        <Card className="md:col-span-1 shadow-md">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Trophy className="h-5 w-5 text-accent" /> Top 3 Ranking
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {topPlayers.map((player, i) => (
                <div key={player.nombre} className="flex items-center justify-between p-2 rounded-lg hover:bg-secondary/50 transition-colors">
                  <div className="flex items-center gap-3">
                    <span className={cn(
                      "flex items-center justify-center w-6 h-6 rounded-full text-xs font-bold",
                      i === 0 ? "bg-yellow-500 text-black" : i === 1 ? "bg-slate-300 text-black" : "bg-amber-600 text-white"
                    )}>
                      {i + 1}
                    </span>
                    <img src={player.foto} alt="" className="w-8 h-8 rounded-full border border-border" />
                    <span className="font-medium text-sm">{player.nombre}</span>
                  </div>
                  <span className="font-bold text-primary">{player.puntos} pts</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Actividad Reciente */}
        <Card className="md:col-span-2 shadow-md">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <TrendingUp className="h-5 w-5 text-primary" /> Actividad Reciente
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-center py-12 text-muted-foreground italic">
              Aún no hay actividad reciente para mostrar. ¡Ingresa tus pronósticos!
            </div>
          </CardContent>
        </Card>
      </div>
    </Shell>
  );
}
