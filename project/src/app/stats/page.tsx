"use client"

import Shell from '@/components/layout/Shell';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell } from 'recharts';
import { PieChart, Pie, Cell as PieCell } from 'recharts';
import { Zap, Target, Percent, History } from 'lucide-react';

const COLORS = ['#264AB2', '#E4BE3E', '#94a3b8', '#ef4444'];

export default function StatsPage() {
  const dataPoints = [
    { name: 'Exactos', value: 8 },
    { name: 'Dif. Goles', value: 5 },
    { name: 'Ganador', value: 12 },
    { name: 'Fallos', value: 10 },
  ];

  const historyData = [
    { date: '11 Jun', pts: 5 },
    { date: '12 Jun', pts: 1 },
    { date: '13 Jun', pts: 3 },
    { date: '14 Jun', pts: 0 },
    { date: '15 Jun', pts: 5 },
    { date: '16 Jun', pts: 3 },
  ];

  return (
    <Shell>
      <div className="mb-8">
        <h1 className="text-3xl font-headline font-bold">Estadísticas</h1>
        <p className="text-muted-foreground">Tu rendimiento detallado en la quiniela</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center gap-4">
              <div className="p-2 bg-primary/10 rounded-lg"><Target className="h-6 w-6 text-primary" /></div>
              <div>
                <p className="text-xs text-muted-foreground uppercase font-bold tracking-wider">Aciertos</p>
                <p className="text-2xl font-headline font-bold">25</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center gap-4">
              <div className="p-2 bg-accent/10 rounded-lg"><Zap className="h-6 w-6 text-accent" /></div>
              <div>
                <p className="text-xs text-muted-foreground uppercase font-bold tracking-wider">Exactos</p>
                <p className="text-2xl font-headline font-bold">8</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center gap-4">
              <div className="p-2 bg-green-500/10 rounded-lg"><Percent className="h-6 w-6 text-green-500" /></div>
              <div>
                <p className="text-xs text-muted-foreground uppercase font-bold tracking-wider">Efectividad</p>
                <p className="text-2xl font-headline font-bold">71.4%</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center gap-4">
              <div className="p-2 bg-blue-500/10 rounded-lg"><History className="h-6 w-6 text-blue-500" /></div>
              <div>
                <p className="text-xs text-muted-foreground uppercase font-bold tracking-wider">Promedio</p>
                <p className="text-2xl font-headline font-bold">2.4 pts</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Distribución de Pronósticos</CardTitle>
            <CardDescription>Desglose por tipo de acierto</CardDescription>
          </CardHeader>
          <CardContent className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={dataPoints}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} opacity={0.1} />
                <XAxis dataKey="name" axisLine={false} tickLine={false} fontSize={12} />
                <YAxis axisLine={false} tickLine={false} fontSize={12} />
                <Tooltip 
                  cursor={{fill: 'transparent'}}
                  contentStyle={{backgroundColor: 'hsl(var(--card))', borderRadius: '8px', border: '1px solid hsl(var(--border))'}}
                />
                <Bar dataKey="value" radius={[4, 4, 0, 0]}>
                  {dataPoints.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Historial de Puntos</CardTitle>
            <CardDescription>Puntos obtenidos por jornada</CardDescription>
          </CardHeader>
          <CardContent className="h-[300px]">
             <ResponsiveContainer width="100%" height="100%">
              <BarChart data={historyData}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} opacity={0.1} />
                <XAxis dataKey="date" axisLine={false} tickLine={false} fontSize={12} />
                <YAxis axisLine={false} tickLine={false} fontSize={12} />
                <Tooltip 
                  contentStyle={{backgroundColor: 'hsl(var(--card))', borderRadius: '8px', border: '1px solid hsl(var(--border))'}}
                />
                <Bar dataKey="pts" fill="#E4BE3E" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>
    </Shell>
  );
}