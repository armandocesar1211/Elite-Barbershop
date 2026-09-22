'use client';
import { useEffect, useState } from 'react';
export function useMediaReady() { const [ready, setReady] = useState(false); useEffect(() => { const id = window.setTimeout(() => setReady(true), 1350); return () => clearTimeout(id); }, []); return { ready, setReady }; }
