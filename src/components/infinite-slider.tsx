'use client';
import type { ReactNode } from 'react';
import styled, { keyframes } from 'styled-components';

type InfiniteSliderProps = {
  children: ReactNode;
  gap?: number;
  duration?: number;
  durationOnHover?: number;
  reverse?: boolean;
  'aria-label'?: string;
};

export function InfiniteSlider({ children, gap = 14, duration = 34, durationOnHover = 60, reverse = false, 'aria-label': ariaLabel }: InfiniteSliderProps) {
  return <Viewport aria-label={ariaLabel}><Track $gap={gap} $duration={duration} $durationOnHover={durationOnHover} $reverse={reverse}><Group>{children}</Group><Group aria-hidden="true">{children}</Group></Track></Viewport>;
}

const marquee = keyframes`to{transform:translateX(-50%)}`;
const Viewport = styled.div`width:100%;overflow:hidden`;
const Track = styled.div<{$gap:number;$duration:number;$durationOnHover:number;$reverse:boolean}>`--slider-gap:${p=>p.$gap}px;display:flex;width:max-content;animation:${marquee} ${p=>p.$duration}s linear infinite;animation-direction:${p=>p.$reverse?'reverse':'normal'};will-change:transform;&:hover{animation-duration:${p=>p.$durationOnHover}s}@media(prefers-reduced-motion:reduce){animation:none;[aria-hidden="true"]{display:none}}`;
const Group = styled.div`display:flex;flex:0 0 auto;gap:var(--slider-gap);padding-right:var(--slider-gap)`;
