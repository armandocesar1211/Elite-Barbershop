'use client';
import type { CSSProperties, ReactNode } from 'react';
import { useEffect, useRef, useState } from 'react';
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
  const groupRef = useRef<HTMLDivElement>(null);
  const [distance, setDistance] = useState(0);

  useEffect(() => {
    const group = groupRef.current;
    if (!group) return;

    const updateDistance = () => setDistance(group.getBoundingClientRect().width);
    updateDistance();
    const observer = new ResizeObserver(updateDistance);
    observer.observe(group);
    return () => observer.disconnect();
  }, []);

  return <Viewport aria-label={ariaLabel}><Track $gap={gap} $duration={duration} $durationOnHover={durationOnHover} $reverse={reverse} style={{ '--slider-distance': `${distance}px` } as CSSProperties}><Group ref={groupRef}>{children}</Group><Group aria-hidden="true">{children}</Group></Track></Viewport>;
}

const marquee = keyframes`to{transform:translate3d(calc(-1 * var(--slider-distance)),0,0)}`;
const Viewport = styled.div`width:100%;overflow:hidden`;
const Track = styled.div<{$gap:number;$duration:number;$durationOnHover:number;$reverse:boolean}>`--slider-gap:${p=>p.$gap}px;display:flex;width:max-content;min-width:max-content;animation:${marquee} ${p=>p.$duration}s linear infinite;animation-direction:${p=>p.$reverse?'reverse':'normal'};will-change:transform;backface-visibility:hidden;&:hover{animation-duration:${p=>p.$durationOnHover}s}@media(prefers-reduced-motion:reduce){animation:none;[aria-hidden="true"]{display:none}}`;
const Group = styled.div`display:flex;flex:0 0 auto;gap:var(--slider-gap);padding-right:var(--slider-gap)`;
