"use client"

import { useState, useEffect } from 'react';
import { auth, googleProvider, db } from '@/app/lib/firebase';
import { signInWithPopup, onAuthStateChanged, signOut, User } from 'firebase/auth';
import { doc, getDoc, setDoc, collection, query, getDocs } from 'firebase/firestore';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { LogIn, LogOut, Loader2 } from 'lucide-react';
import { UserProfile } from '@/app/lib/types';

export default function AuthButton() {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [profile, setProfile] = useState<UserProfile | null>(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (u) => {
      setUser(u);
      if (u) {
        const docRef = doc(db, 'users', u.uid);
        const docSnap = await getDoc(docRef);
        
        if (docSnap.exists()) {
          setProfile(docSnap.data() as UserProfile);
        } else {
          // Check for participant limit
          const usersSnap = await getDocs(collection(db, 'users'));
          if (usersSnap.size >= 20) {
            await signOut(auth);
            alert("Máximo 20 participantes alcanzado.");
            setLoading(false);
            return;
          }

          const newProfile: UserProfile = {
            uid: u.uid,
            nombre: u.displayName || 'Usuario',
            correo: u.email || '',
            foto: u.photoURL || '',
            puntos: 0,
            rol: 'participant',
            enabled: true
          };
          await setDoc(docRef, newProfile);
          setProfile(newProfile);
        }
      } else {
        setProfile(null);
      }
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const handleSignIn = async () => {
    try {
      await signInWithPopup(auth, googleProvider);
    } catch (error) {
      console.error("Error signing in", error);
    }
  };

  const handleSignOut = async () => {
    try {
      await signOut(auth);
    } catch (error) {
      console.error("Error signing out", error);
    }
  };

  if (loading) return <Button variant="ghost" disabled><Loader2 className="animate-spin" /></Button>;

  if (user && profile) {
    return (
      <div className="flex items-center gap-4">
        <div className="hidden sm:flex flex-col items-end">
          <span className="text-sm font-semibold">{profile.nombre}</span>
          <span className="text-xs text-muted-foreground">{profile.puntos} pts</span>
        </div>
        <Avatar className="h-10 w-10 border-2 border-primary">
          <AvatarImage src={profile.foto} />
          <AvatarFallback>{profile.nombre.charAt(0)}</AvatarFallback>
        </Avatar>
        <Button variant="ghost" size="icon" onClick={handleSignOut} title="Cerrar sesión">
          <LogOut className="h-5 w-5" />
        </Button>
      </div>
    );
  }

  return (
    <Button onClick={handleSignIn} className="blue-gradient text-white">
      <LogIn className="mr-2 h-4 w-4" /> Entrar con Google
    </Button>
  );
}