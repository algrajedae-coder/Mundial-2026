"use client"

import { useState } from 'react';
import Shell from '@/components/layout/Shell';
import { Card, CardHeader, CardTitle, CardContent, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import { Table, TableHeader, TableBody, TableRow, TableHead, TableCell } from '@/components/ui/table';
import { Plus, Edit2, Trash2, CheckCircle2, AlertCircle } from 'lucide-react';
import { Switch } from '@/components/ui/switch';

export default function AdminPage() {
  const [isAdmin, setIsAdmin] = useState(true); // Normally from profile check

  if (!isAdmin) {
    return (
      <Shell>
        <div className="flex flex-col items-center justify-center min-h-[60vh] gap-4">
          <AlertCircle className="h-16 w-16 text-destructive" />
          <h1 className="text-2xl font-bold">Acceso Denegado</h1>
          <p className="text-muted-foreground">Solo el administrador puede acceder a esta sección.</p>
        </div>
      </Shell>
    );
  }

  return (
    <Shell>
      <div className="mb-8">
        <h1 className="text-3xl font-headline font-bold">Panel de Administración</h1>
        <p className="text-muted-foreground">Gestiona partidos, usuarios y resultados</p>
      </div>

      <Tabs defaultValue="matches">
        <TabsList className="mb-6">
          <TabsTrigger value="matches">Gestión de Partidos</TabsTrigger>
          <TabsTrigger value="users">Gestión de Usuarios</TabsTrigger>
          <TabsTrigger value="results">Publicar Resultados</TabsTrigger>
        </TabsList>

        <TabsContent value="matches">
          <Card>
            <CardHeader className="flex flex-row justify-between items-center">
              <div>
                <CardTitle>Partidos del Mundial</CardTitle>
                <CardDescription>Crea y edita la programación oficial</CardDescription>
              </div>
              <Button size="sm" className="blue-gradient"><Plus className="mr-2 h-4 w-4" /> Nuevo Partido</Button>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Fecha</TableHead>
                    <TableHead>Encuentro</TableHead>
                    <TableHead>Fase</TableHead>
                    <TableHead>Estado</TableHead>
                    <TableHead className="text-right">Acciones</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  <TableRow>
                    <TableCell className="text-xs">11 Jun, 16:00</TableCell>
                    <TableCell className="font-bold">México vs TBD</TableCell>
                    <TableCell>Grupos</TableCell>
                    <TableCell><span className="text-xs bg-yellow-100 text-yellow-800 px-2 py-0.5 rounded-full font-bold">Programado</span></TableCell>
                    <TableCell className="text-right space-x-2">
                      <Button variant="ghost" size="icon"><Edit2 className="h-4 w-4" /></Button>
                      <Button variant="ghost" size="icon" className="text-destructive"><Trash2 className="h-4 w-4" /></Button>
                    </TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="users">
          <Card>
            <CardHeader>
              <CardTitle>Participantes (7/20)</CardTitle>
              <CardDescription>Habilita o deshabilita el acceso de los usuarios</CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Usuario</TableHead>
                    <TableHead>Correo</TableHead>
                    <TableHead>Habilitado</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {['Carlos Pérez', 'Ana García', 'Luis Rodríguez'].map((name) => (
                    <TableRow key={name}>
                      <TableCell className="font-medium">{name}</TableCell>
                      <TableCell className="text-muted-foreground text-sm">{name.toLowerCase().replace(' ', '.')}@gmail.com</TableCell>
                      <TableCell>
                        <Switch defaultChecked />
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="results">
          <div className="grid gap-6">
            <Card className="border-accent/40 bg-accent/5">
              <CardHeader>
                <CardTitle className="text-accent flex items-center gap-2"><CheckCircle2 className="h-5 w-5" /> Ingreso de Resultado Oficial</CardTitle>
                <CardDescription>Al guardar, se recalculará automáticamente el ranking</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="flex flex-col gap-4">
                  <Label>Selecciona Partido Finalizado</Label>
                  <select className="w-full p-2 rounded-md border bg-background">
                    <option>México vs TBD - 11 Jun 2026</option>
                  </select>
                </div>
                
                <div className="flex items-center justify-center gap-8 py-4">
                  <div className="flex flex-col items-center gap-2">
                    <Label className="text-lg">México</Label>
                    <Input type="number" className="w-20 text-center text-2xl h-16 font-headline" defaultValue={0} />
                  </div>
                  <span className="text-3xl font-black mt-6">-</span>
                  <div className="flex flex-col items-center gap-2">
                    <Label className="text-lg">TBD</Label>
                    <Input type="number" className="w-20 text-center text-2xl h-16 font-headline" defaultValue={0} />
                  </div>
                </div>

                <Button className="w-full gold-gradient text-black font-bold h-12 text-lg">
                  Publicar y Recalcular Ranking
                </Button>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </Shell>
  );
}