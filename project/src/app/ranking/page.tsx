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
  // CARGAR USUARIOS REALMENTE
  // =========================
  useEffect(() => {
    const fetchRanking = async () => {
      const usersSnap = await getDocs(collection(db, "users"));

      const users = usersSnap.docs.map((d) => {
        const u = d.data();

        return {
          uid: d.id,

          // 🔥 CORRECCIÓN PRINCIPAL AQUÍ
          nombre: u.name || u.displayName || u.nombre || "Sin nombre",
          email: u.email || u.correo || "",

          puntos: u.puntos || 0,
          exactos: u.exactos || 0,
          efectivos: u.efectivos || 0,

          foto:
            u.photoURL ||
            u.photo ||
            `https://ui-avatars.com/api/?name=${encodeURIComponent(
              u.name || u.displayName || "User"
            )}`,

          isUser: u.isUser || false,
        };
      });

      // ordenar por puntos
      const sorted = users.sort((a, b) => b.puntos - a.puntos);

      setRanking(sorted);
    };

    fetchRanking();
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
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
        <div>
          <h1 className="text-3xl font-headline font-bold">
            Ranking General
          </h1>
          <p className="text-muted-foreground">
            La tabla oficial de participantes
          </p>
        </div>

        <div className="relative w-full md:w-64">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input className="pl-9 bg-card" placeholder="Buscar participante..." />
        </div>
      </div>

      <Card className="shadow-lg overflow-hidden border-none">
        <CardContent className="p-0">
          <Table>
            <TableHeader className="bg-secondary/50">
              <TableRow>
                <TableHead className="w-16 text-center">Pos</TableHead>
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
                <TableRow
                  key={row.uid}
                  className={cn(
                    "h-16",
                    row.isUser ? "bg-accent/10 border-l-4 border-l-accent" : ""
                  )}
                >
                  <TableCell className="text-center">
                    <div className="flex justify-center items-center gap-1 font-bold">
                      {getMedal(i)}
                      <span className={cn(i < 3 ? "text-lg" : "text-sm")}>
                        {i + 1}
                      </span>
                    </div>
                  </TableCell>

                  <TableCell>
                    <div className="flex items-center gap-3">
                      <img
                        src={row.foto}
                        alt=""
                        className="w-9 h-9 rounded-full border"
                      />
                      <div>
                        <p
                          className={cn(
                            "font-bold",
                            row.isUser ? "text-accent" : ""
                          )}
                        >
                          {row.nombre}
                        </p>

                        {/* 🔥 AQUÍ YA SE VE EL CORREO */}
                        <p className="text-[10px] text-muted-foreground">
                          {row.email}
                        </p>
                      </div>
                    </div>
                  </TableCell>

                  <TableCell className="text-center hidden sm:table-cell font-medium">
                    {row.exactos}
                  </TableCell>

                  <TableCell className="text-center hidden sm:table-cell font-medium">
                    {row.efectivos}
                  </TableCell>

                  <TableCell className="text-right pr-8">
                    <span className="text-xl font-headline font-black text-primary">
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
