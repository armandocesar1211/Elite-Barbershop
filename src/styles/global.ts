'use client';
import { createGlobalStyle } from 'styled-components';
export const GlobalStyle = createGlobalStyle`
  :root { --ink:#0a0a0a; --ink-2:#111; --paper:#f5f5f5; --muted:#a4a4a4; --line:rgba(245,245,245,.17); --ease:cubic-bezier(.22,1,.36,1); }
  *{box-sizing:border-box} html{position:relative;scroll-behavior:smooth;background:var(--ink)} body{position:relative;margin:0;background:var(--ink);color:var(--paper);font-family:Arial,Helvetica,sans-serif;overflow-x:hidden} a{color:inherit;text-decoration:none} button{font:inherit} ::selection{background:#f5f5f5;color:#0a0a0a} a:focus-visible,button:focus-visible{outline:2px solid #fff;outline-offset:5px}
  @media(prefers-reduced-motion:reduce){*,*:before,*:after{animation-duration:.01ms!important;animation-iteration-count:1!important;transition-duration:.01ms!important;scroll-behavior:auto!important}}
`;
