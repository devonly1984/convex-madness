import Image from 'next/image';
import  { ReactNode } from 'react'

const AuthLayout=({
    children,
  }: Readonly<{
    children:  ReactNode;
  }>) =>{
    return (
      <main className="relative h-screen w-full">
        <div className="absolute size-full">
          <Image
            src="/images/bg-img.png"
            alt="background"
            fill
            className="size-full"
          />
        </div>
        {children}
      </main>
    );
  }
  export default AuthLayout;