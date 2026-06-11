"use client"

import { useState } from 'react';
import Shell from '@/components/layout/Shell';
import { Card, CardContent } from '@/components/ui/card';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Search, Clock, MapPin } from 'lucide-react';
import { Match } from '@/app/lib/types';

export default function CalendarPage() {
  const [searchTerm, setSearchTerm] = useState("");
  
  // Dummy matches for demo
  const matches: Match[] = [
    { id: '1', fecha: '2026-06-11T16:00:00Z', fase: 'Group', local: 'México', visitante: 'TBD', marcadorLocal: null, marcadorVisitante: null, estado: 'upcoming' },
    { id: '2', fecha: '2026-06-11T20:00:00Z', fase: 'Group', local: 'Canadá', visitante: 'TBD', marcadorLocal: null, marcadorVisitante: null, estado: 'upcoming' },
    { id: '3', fecha: '2026-06-12T18:00:00Z', fase: 'Group', local: 'USA', visitante: 'TBD', marcadorLocal: null, marcadorVisitante: null, estado: 'upcoming' },
  ];

  return (
    <Shell>
      <div className="mb-8 flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-3xl font-headline font-bold">Calendario</h1>
          <p className="text-muted-foreground">Consulta los 104 partidos del Mundial 2026</p>
        </div>
        <div className="relative w-full md:w-64">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input 
            className="pl-9 bg-card border-border" 
            placeholder="Buscar equipo..." 
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </div>

      <Tabs defaultValue="Group" className="w-full">
        <TabsList className="bg-secondary mb-6 w-full md:w-auto overflow-x-auto justify-start h-auto p-1">
          <TabsTrigger value="Group">Fase de Grupos</TabsTrigger>
          <TabsTrigger value="Round of 32">Ronda de 32</TabsTrigger>
          <TabsTrigger value="Round of 16">Octavos</TabsTrigger>
          <TabsTrigger value="Quarter-finals">Cuartos</TabsTrigger>
          <TabsTrigger value="Finals">Finales</TabsTrigger>
        </TabsList>
        
        <TabsContent value="Group">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {matches.filter(m => 
              m.local.toLowerCase().includes(searchTerm.toLowerCase()) || 
              m.visitante.toLowerCase().includes(searchTerm.toLowerCase())
            ).map((match) => (
              <Card key={match.id} className="hover:shadow-md transition-shadow border-l-4 border-l-primary group">
                <CardContent className="p-5">
                  <div className="flex justify-between items-center mb-4">
                    <Badge variant="secondary" className="text-[10px] uppercase font-bold tracking-tighter">Partido {match.id}</Badge>
                    <span className="text-xs text-muted-foreground flex items-center gap-1 font-medium">
                      <Clock className="h-3 w-3" /> {new Date(match.fecha).toLocaleDateString('es-ES', { day: '2-digit', month: 'short', hour: '2-digit', minute: '2-digit' })}
                    </span>
                  </div>
                  
                  <div className="flex items-center justify-between gap-2">
                    <div className="flex flex-col items-center gap-2 flex-1">
                      <div className="w-12 h-12 rounded-full bg-secondary flex items-center justify-center overflow-hidden border border-border">
                        <img src={`https://placehold.co/48x48/264AB2/ffffff?text=${match.local.charAt(0)}`} alt={match.local} />
                      </div>
                      <span className="text-sm font-bold text-center">{match.local}</span>
                    </div>
                    
                    <div className="flex flex-col items-center">
                      <span className="text-lg font-headline font-black text-primary">VS</span>
                      {match.estado === 'finished' && (
                        <div className="text-xl font-bold flex gap-2">
                          <span>{match.marcadorLocal}</span>
                          <span>-</span>
                          <span>{match.marcadorVisitante}</span>
                        </div>
                      )}
                    </div>

                    <div className="flex flex-col items-center gap-2 flex-1">
                      <div className="w-12 h-12 rounded-full bg-secondary flex items-center justify-center overflow-hidden border border-border">
                        <img src={`https://placehold.co/48x48/E4BE3E/000000?text=${match.visitante.charAt(0)}`} alt={match.visitante} />
                      </div>
                      <span className="text-sm font-bold text-center">{match.visitante}</span>
                    </div>
                  </div>

                  <div className="mt-4 pt-4 border-t flex justify-center">
                    <button className="text-xs font-bold text-accent uppercase tracking-wider hover:underline flex items-center gap-1">
                      Ingresar Pronóstico
                    </button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>
        {/* Other Tabs would follow same pattern */}
      </Tabs>
    </Shell>
  );
}