"use client";

import { useEffect, useState } from "react";
import Shell from "@/components/layout/Shell";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Table,
  TableHeader,
  TableBody,
  TableRow,
  TableHead,
  TableCell,
} from "@/components/ui/table";
import { Trophy, Medal, Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";

import { db } from "@/app/lib/firebase";
import { collection, getDocs } from "firebase/firestore";

export default function RankingPage() {
  const [ranking, setRanking] = useState<any[]>([]);

  // =========================
  // CARGAR DATOS FIREBASE
  // =========================
  useEffect(() => {
    const loadRanking = async () => {
      const usersSnap = await getDocs(collection(db, "users"));
      const matchesSnap = await getDocs(collection(db, "matches"));
      const predSnap = await getDocs(collection(db, "predictions"));

      const users = usersSnap.docs.map((d) => ({ id: d.id, ...d.data() }));
      const matches = matchesSnap.docs.map((d) => ({ id: d.id, ...d.data() }));
      const predictions = predSnap.docs.map((d) => ({
        id: d.id,
        ...d.data(),
      }));

      // =========================
      // CALCULAR PUNTOS
      // =========================
      const usersMap: any = {};

      users.forEach((u) => {
        usersMap[u.id] = {
          uid: u.id,
          nombre: u.name || "Sin nombre",
          foto: u.photoURL || "https://picsum.photos/40",
          puntos: 0,
          exactos: 0,
          efectivos: 0,
        };
      });

      predictions.forEach((p: any) => {
        const user = usersMap[p.userId];
        if (!user) return;

        const match = matches.find((m: any) => m.id === p.matchId);
        if (!match) return;

        // ❗ si el partido aún no tiene resultado, no suma
        if (match.estado !== "finished") return;

        const isExact =
          p.predictionLocal === match.marcadorLocal &&
          p.predictionVisitante === match.marcadorVisitante;

        if (isExact) {
          user.puntos += 3;
          user.exactos += 1;
          return;
        }

        const predWinner =
          p.predictionLocal > p.predictionVisitante
            ? "L"
            : p.predictionLocal < p.predictionVisitante
            ? "V"
            : "E";

        const realWinner =
          match.marcadorLocal > match.marcadorVisitante
            ? "L"
            : match.marcadorLocal < match.marcadorVisitante
            ? "V"
            : "E";

        if (predWinner === realWinner) {
          user.puntos += 1;
          user.efectivos += 1;
        }
      });

      const sorted = Object.values(usersMap).sort(
        (a: any, b: any) => b.puntos - a.puntos
      );

      setRanking(sorted);
    };

    loadRanking();
  }, []);

  // =========================
  // MEDALLAS
  // =========================
  const getMedal = (pos: number) => {
    if (pos === 0) return <Medal className="text-yellow-500 h-5 w-5" />;
    if (pos === 1) return <Medal className="text-slate-300 h-5 w-5" />;
    if (pos === 2) return <Medal className="text-amber-600 h-5 w-5" />;
    return null;
  };

  return (
    <Shell>
      <div className="flex flex-col md:flex-row justify-between mb-8 gap-4">
        <div>
          <h1 className="text-3xl font-headline font-bold">
            Ranking General
          </h1>
          <p className="text-muted-foreground">
            Tabla automática del Mundial
          </p>
        </div>

        <div className="relative w-full md:w-64">
          <Search className="absolute left-3 top-2 h-4 w-4 text-muted-foreground" />
          <Input className="pl-9" placeholder="Buscar jugador..." />
        </div>
      </div>

      <Card className="shadow-lg overflow-hidden border-none">
        <CardContent className="p-0">
          <Table>
            <TableHeader className="bg-secondary/50">
              <TableRow>
                <TableHead className="text-center w-16">Pos</TableHead>
                <TableHead>Participante</TableHead>
                <TableHead className="text-center hidden sm:table-cell">
                  Exactos
                </TableHead>
                <TableHead className="text-center hidden sm:table-cell">
                  Aciertos
                </TableHead>
                <TableHead className="text-right pr-8">Puntos</TableHead>
              </TableRow>
            </TableHeader>

            <TableBody>
              {ranking.map((row, i) => (
                <TableRow key={row.uid}>
                  <TableCell className="text-center">
                    <div className="flex justify-center items-center gap-1 font-bold">
                      {getMedal(i)}
                      {i + 1}
                    </div>
                  </TableCell>

                  <TableCell>
                    <div className="flex items-center gap-3">
                      <img
                        src={row.foto}
                        className="w-9 h-9 rounded-full border"
                      />
                      <p className="font-bold">{row.nombre}</p>
                    </div>
                  </TableCell>

                  <TableCell className="text-center hidden sm:table-cell">
                    {row.exactos}
                  </TableCell>

                  <TableCell className="text-center hidden sm:table-cell">
                    {row.efectivos}
                  </TableCell>

                  <TableCell className="text-right pr-8">
                    <span className="text-xl font-black text-primary">
                      {row.puntos}
                    </span>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </Shell>
  );
}
