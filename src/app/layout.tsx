import type { Metadata } from 'next';
import StyledComponentsRegistry from '../components/registry';
import { GlobalStyle } from '../styles/global';

export const metadata: Metadata = {
  title: 'Elite Barbershop | Barbearia em Fortaleza',
  description: 'Elite Barbershop no Bairro Ellery, Fortaleza. Cortes, barba e atendimento de alto nível.',
  keywords: ['barbearia Fortaleza', 'barbearia Bairro Ellery', 'Elite Barbershop', 'corte masculino Fortaleza'],
  icons: { icon: '/site-icon.png' },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="pt-BR"><body><StyledComponentsRegistry><GlobalStyle />{children}</StyledComponentsRegistry></body></html>;
}
