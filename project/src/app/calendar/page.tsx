"use client";

import { useEffect, useState } from "react";
import Shell from "@/components/layout/Shell";
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Search, Clock } from "lucide-react";

import { db } from "@/app/lib/firebase";
import { collection, getDocs, addDoc } from "firebase/firestore";

export default function CalendarPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [matches, setMatches] = useState<any[]>([]);

  // =========================
  // CARGAR PARTIDOS DESDE FIRESTORE
  // =========================
  useEffect(() => {
    const fetchMatches = async () => {
      const snap = await getDocs(collection(db, "matches"));
      setMatches(snap.docs.map(doc => ({ id: doc.id, ...doc.data() })));
    };

    fetchMatches();
  }, []);

  // =========================
  // GUARDAR PRONÓSTICO
  // =========================
  const savePrediction = async (match: any) => {
    const userId = "demo-user"; // luego lo conectamos a auth real

    const local = prompt(`¿Cuántos goles de ${match.local}?`);
    const visitante = prompt(`¿Cuántos goles de ${match.visitante}?`);

    if (local === null || visitante === null) return;

    await addDoc(collection(db, "predictions"), {
      userId,
      matchId: match.id,
      predictionLocal: Number(local),
      predictionVisitante: Number(visitante),
      createdAt: new Date().toISOString()
    });

    alert("Pronóstico guardado ✔️");
  };

  return (
    <Shell>
      <div className="mb-8 flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-3xl font-headline font-bold">Calendario</h1>
          <p className="text-muted-foreground">
            Consulta los partidos del Mundial
          </p>
        </div>

        <div className="relative w-full md:w-64">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            className="pl-9"
            placeholder="Buscar equipo..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </div>

      <Tabs defaultValue="Group" className="w-full">
        <TabsList className="mb-6">
          <TabsTrigger value="Group">Fase de Grupos</TabsTrigger>
        </TabsList>

        <TabsContent value="Group">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {matches
              .filter(
                (m) =>
                  m.local?.toLowerCase().includes(searchTerm.toLowerCase()) ||
                  m.visitante
                    ?.toLowerCase()
                    .includes(searchTerm.toLowerCase())
              )
              .map((match) => (
                <Card
                  key={match.id}
                  className="hover:shadow-md transition-shadow border-l-4 border-l-primary"
                >
                  <CardContent className="p-5">
                    <div className="flex justify-between items-center mb-4">
                      <Badge variant="secondary" className="text-[10px]">
                        Partido
                      </Badge>

                      <span className="text-xs text-muted-foreground flex items-center gap-1">
                        <Clock className="h-3 w-3" />
                        {match.fecha
                          ? new Date(match.fecha).toLocaleDateString(
                              "es-ES",
                              {
                                day: "2-digit",
                                month: "short",
                                hour: "2-digit",
                                minute: "2-digit",
                              }
                            )
                          : "Sin fecha"}
                      </span>
                    </div>

                    {/* EQUIPOS */}
                    <div className="flex items-center justify-between gap-2">
                      <div className="flex flex-col items-center flex-1">
                        <span className="font-bold text-sm">
                          {match.local}
                        </span>
                      </div>

                      <span className="font-black text-primary">VS</span>

                      <div className="flex flex-col items-center flex-1">
                        <span className="font-bold text-sm">
                          {match.visitante}
                        </span>
                      </div>
                    </div>

                    {/* RESULTADO SI EXISTE */}
                    {match.estado === "finished" && (
                      <div className="mt-3 text-center font-bold">
                        {match.marcadorLocal} - {match.marcadorVisitante}
                      </div>
                    )}

                    {/* BOTÓN PRONÓSTICO */}
                    <div className="mt-4 pt-4 border-t flex justify-center">
                      <button
                        onClick={() => savePrediction(match)}
                        className="text-xs font-bold text-accent uppercase tracking-wider hover:underline"
                      >
                        Ingresar Pronóstico
                      </button>
                    </div>
                  </CardContent>
                </Card>
              ))}
          </div>
        </TabsContent>
      </Tabs>
    </Shell>
  );
}
