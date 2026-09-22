/** @type {import('next').NextConfig} */
const nextConfig = {
  compiler: { styledComponents: true },
  // Evita que `next build` sobrescreva os chunks de um `next dev` em execução.
  distDir: process.env.NODE_ENV === 'production' ? '.next-build' : '.next',
};
export default nextConfig;
