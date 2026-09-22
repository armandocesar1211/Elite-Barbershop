'use client';
import { motion, useMotionTemplate, useReducedMotion, useScroll, useTransform } from 'framer-motion';
import Image from 'next/image';
import { type CSSProperties, useEffect, useRef, useState } from 'react';
import { InfiniteSlider } from '../components/infinite-slider';
import { ScrollReveal, ScrollRevealGroup, ScrollRevealItem } from '../components/scroll-reveal';
import * as S from '../styles/site';

const whatsapp = 'https://wa.me/5585996416309?text=' + encodeURIComponent('Olá! Gostaria de agendar um horário na Elite Barbershop');
const services = [{n:'01',name:'Corte',text:'Precisão, acabamento e personalidade em cada detalhe.',price:'R$ 25',image:'/assets/service-corte.png'},{n:'02',name:'Barba',text:'Desenho, toalha quente e cuidado que valoriza seu estilo.',price:'R$ 25',image:'/assets/service-barba.png'},{n:'03',name:'Combo Elite',text:'A experiência completa: corte + barba do seu jeito.',price:'R$ 45',image:'/assets/service-combo-elite.png'},{n:'04',name:'Sobrancelha',text:'Harmonia e definição para finalizar o visual.',price:'R$ 10',image:'/assets/service-sobrancelha.png'}];
const gallery = [{src:'/assets/gallery-corte-classico.png',alt:'Corte clássico finalizado na Elite Barbershop',label:'Corte com assinatura',width:1104,height:1424},{src:'/assets/gallery-platinado.png',alt:'Corte platinado finalizado na Elite Barbershop',label:'Estilo em cada detalhe',width:1087,height:1447},{src:'/assets/gallery-ambiente.png',alt:'Cliente na cadeira da Elite Barbershop',label:'A experiência Elite',width:1160,height:1356},{src:'/assets/gallery-acabamento.png',alt:'Acabamento de barba na Elite Barbershop',label:'Precisão no acabamento',width:986,height:1595}];
export default function Home() {
 const [open,setOpen] = useState(false);
 const [introStage,setIntroStage] = useState<0|1|2>(0);
 const videoRef = useRef<HTMLVideoElement>(null);
 const ritualRef = useRef<HTMLElement>(null);
 const reducedMotion = useReducedMotion();
 const { scrollY }=useScroll();
 const videoY=useTransform(scrollY,[0,700],[0,150]);
 const { scrollYProgress: ritualProgress } = useScroll({ target: ritualRef, offset: ['start 85%', 'start 35%'] });
 const ritualFill = useTransform(ritualProgress, [0,1], ['0%', '100%']);
 const ritualBackgroundSize = useMotionTemplate`${ritualFill} 100%, 100% 100%`;

 useEffect(() => {
   if (reducedMotion) {
     setIntroStage(2);
     return;
   }
   // A progressão segue o tempo do próprio vídeo, inclusive quando ele demora a carregar.
   const poll = window.setInterval(() => {
     const time = videoRef.current?.currentTime ?? 0;
     if (time >= 6.4) {
       setIntroStage(2);
       window.clearInterval(poll);
     } else if (time >= 4.9) {
       setIntroStage(stage => Math.max(stage, 1) as 0|1|2);
     }
   }, 120);
   // Somente se o autoplay falhar, liberar a interface depois de uma espera segura.
   const autoplayFallback = window.setTimeout(() => {
     if (videoRef.current?.paused || (videoRef.current?.currentTime ?? 0) < .25) {
       window.clearInterval(poll);
       setIntroStage(2);
     }
   }, 12000);
   return () => {
     window.clearInterval(poll);
     window.clearTimeout(autoplayFallback);
   };
 }, [reducedMotion]);

 const syncIntroToVideo = () => {
   const time = videoRef.current?.currentTime ?? 0;
   if (time >= 6.4) setIntroStage(2);
   else if (time >= 4.9) setIntroStage(stage => Math.max(stage, 1) as 0|1|2);
 };

 return <S.Page>
   <S.Hero id="inicio" data-intro-stage={introStage}><motion.video ref={videoRef} style={{y:videoY}} autoPlay muted loop playsInline preload="auto" onTimeUpdate={syncIntroToVideo} onError={()=>setIntroStage(2)} aria-hidden="true"><source src="/assets/elite-hero.mp4" type="video/mp4" /></motion.video><S.HeroShade data-ready={introStage>=1} />
    <S.Header $ready={introStage>=1}><a href="#inicio" aria-label="Elite Barbershop, início"><S.Brand><img src="/assets/elite-logo.png" alt=""/><span><b>ELITE</b><small>BARBERSHOP</small></span></S.Brand></a><S.Nav $open={open}><a href="#servicos" onClick={()=>setOpen(false)}>Serviços</a><a href="#galeria" onClick={()=>setOpen(false)}>Galeria</a><a href="#horarios" onClick={()=>setOpen(false)}>Horários</a><a href="#localizacao" onClick={()=>setOpen(false)}>Localização</a></S.Nav><S.MenuButton onClick={()=>setOpen(!open)} aria-label={open?'Fechar menu':'Abrir menu'} aria-expanded={open}><i/><i/></S.MenuButton></S.Header>
    <S.HeroCopy data-ready={introStage>=2}><p>BARBEARIA • FORTALEZA, CE</p><h1>SEU ESTILO<br/><em>EM OUTRO NÍVEL.</em></h1><div><span>Cortes precisos, acabamento impecável e uma experiência feita para quem não aceita o comum.</span><S.HeroActions><S.HeroButton $primary href={whatsapp} target="_blank" rel="noopener">AGENDAR HORÁRIO <svg aria-hidden="true" viewBox="0 0 24 24"><path d="M7 3v3m10-3v3M4.5 9h15M6 5h12a2 2 0 0 1 2 2v12H4V7a2 2 0 0 1 2-2Zm2 8h2m4 0h2m-8 4h2m4 0h2"/></svg></S.HeroButton><S.HeroButton href="#servicos">VER SERVIÇOS</S.HeroButton></S.HeroActions></div></S.HeroCopy><S.ScrollHint data-ready={introStage>=2} href="#servicos">ROLE PARA DESCOBRIR <span>↓</span></S.ScrollHint>
   </S.Hero>
   <S.MarbleSection id="servicos"><S.Watermark aria-hidden="true">ELITE</S.Watermark><ScrollReveal><S.SectionIntro><p>01 — SERVIÇOS</p><h2>FEITO PARA<br/><i>VOCÊ.</i></h2><span>Uma seleção de cuidados com a assinatura Elite.</span></S.SectionIntro></ScrollReveal><ScrollRevealGroup><S.ServiceGrid>{services.map((x,i)=><ScrollRevealItem key={x.n} delay={i*.1}><motion.article whileHover={{y:-8}} style={{'--service-image':`url(${x.image})`} as CSSProperties}><small>{x.n}</small><h3>{x.name}</h3><p>{x.text}</p><b>{x.price}</b><a href={whatsapp} target="_blank" rel="noopener">Agendar <span>↗</span></a></motion.article></ScrollRevealItem>)}</S.ServiceGrid></ScrollRevealGroup><ScrollReveal delay={.15}><S.Placeholder>CONTEÚDO PENDENTE: confirmar lista final de serviços e preços.</S.Placeholder></ScrollReveal></S.MarbleSection>
   <S.Hours id="horarios"><ScrollReveal><S.SectionIntro><p>02 — AGENDE SUA VISITA</p><h2>SEU TEMPO,<br/><S.ScrollFill ref={ritualRef} style={{backgroundSize:reducedMotion?'100% 100%, 100% 100%':ritualBackgroundSize}}>SEU RITUAL.</S.ScrollFill></h2></S.SectionIntro></ScrollReveal><ScrollReveal delay={.12}><S.HoursList><div><span>SEGUNDA — SEXTA</span><b>09H <i>às</i> 19H</b></div><div><span>SÁBADO</span><b>08H <i>às</i> 18H</b></div><div><span>DOMINGO</span><b className="closed">FECHADO</b></div></S.HoursList></ScrollReveal></S.Hours>
   <S.Gallery id="galeria"><ScrollReveal><S.GalleryTitle><p>03 — GALERIA</p><h2>O PADRÃO<br/>É <i>ELITE.</i></h2><span>Cortes, detalhes e momentos reais da nossa casa.</span></S.GalleryTitle></ScrollReveal><S.GalleryCarousel><InfiniteSlider aria-label="Galeria de cortes e momentos da Elite Barbershop">{gallery.map(item=><S.GalleryTile key={item.src}><Image src={item.src} alt={item.alt} width={item.width} height={item.height} sizes="(max-width: 520px) 190px, (max-width: 1024px) 28vw, 340px" quality={72} loading="eager"/><figcaption>{item.label}</figcaption></S.GalleryTile>)}</InfiniteSlider><InfiniteSlider reverse aria-label="Segunda faixa da galeria de cortes e momentos">{gallery.map(item=><S.GalleryTile key={item.src}><Image src={item.src} alt="" width={item.width} height={item.height} sizes="(max-width: 520px) 190px, (max-width: 1024px) 28vw, 340px" quality={72} loading="eager"/><figcaption>{item.label}</figcaption></S.GalleryTile>)}</InfiniteSlider></S.GalleryCarousel></S.Gallery>
   <S.Promo><ScrollReveal><S.PromoLogo src="/assets/elite-logo.png" alt=""/></ScrollReveal><ScrollReveal delay={.14}><div><p>04 — DESTAQUES</p><h2>OFERTAS COM<br/><i>ATITUDE.</i></h2><S.PromoPlaceholder>Promoção atual será adicionada aqui após confirmação do cliente.</S.PromoPlaceholder><a href={whatsapp} target="_blank" rel="noopener">FALAR NO WHATSAPP <span>↗</span></a></div></ScrollReveal></S.Promo>
   <S.Location id="localizacao"><ScrollReveal><div><p>05 — ONDE ESTAMOS</p><h2>CHEGUE<br/><i>NO ESTILO.</i></h2><address>Rua Barão do Crato, 1125<br/>Bairro Ellery — Fortaleza, CE</address><a href="https://maps.google.com/?q=Rua+Barão+do+Crato,+1125,+Fortaleza,+CE" target="_blank" rel="noopener">COMO CHEGAR <span>↗</span></a></div></ScrollReveal><S.MapFrame title="Mapa da Elite Barbershop" loading="eager" src="https://www.google.com/maps?q=Rua%20Bar%C3%A3o%20do%20Crato%2C%201125%2C%20Fortaleza%2C%20CE&output=embed" /></S.Location>
   <S.Footer><S.Brand><img src="/assets/elite-logo.png" alt=""/><span><b>ELITE</b><small>BARBERSHOP</small></span></S.Brand><div><a href="https://instagram.com/elite.barbershopce" target="_blank" rel="noopener">Instagram ↗</a><a href={whatsapp} target="_blank" rel="noopener">WhatsApp ↗</a></div><small>© {new Date().getFullYear()} ELITE BARBERSHOP</small></S.Footer><S.FloatWhatsapp data-ready={introStage>=2} href={whatsapp} target="_blank" rel="noopener" aria-label="Agendar pelo WhatsApp">◔<span>Agendar pelo WhatsApp</span></S.FloatWhatsapp>
 </S.Page>;
}
