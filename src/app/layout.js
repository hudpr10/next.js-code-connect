import { Prompt } from 'next/font/google';

import Aside from '@/components/Aside';
import './globals.css';
import HeaderInput from '@/components/HeaderInput';

export const metadata = {
  title: "Code Connect",
  description: "Uma rede social para devs!",
};

const prompt = Prompt({
  weight: ['400', '500', '600'],
  subsets: ['latin'],
  display: 'swap'
})

export default function RootLayout({ children }) {
  return (
    <html lang="pt-BR" className={prompt.className}>
      <body>
        <div className='app-container' >
          <Aside />
          <main className='app-main'>
            <HeaderInput />
            {children}
          </main>
        </div>
      </body>
    </html>
  );
}
