import { EmptyStateProps } from '@/types'
import Image from 'next/image';
import React from 'react'
import { Button } from './ui/button';
import Link from 'next/link';

const EmptyState = ({
  title,
  search,
  buttonLink,
  buttonText,
}: EmptyStateProps) => {
  return (
    <section className="flex-center flex-col gap-3 size-full">
      <Image
        src="/icons/emptyState.svg"
        width={250}
        height={250}
        alt="Empty State"
      />
      <div className="flex-center w-full max-w-[254px] flex-col gap-3">
        <h1 className="text-16 text-center font-medium text-white-1">
          {title}
        </h1>
        {search && (
          <p className="font-medium text-16 text-center text-white-2">
            Try adjusting your search to find what your looking for
          </p>
        )}
        {buttonLink && (
          <Button className="bg-orange-1">
            <Link href={buttonLink} className="gap-1 flex">
              <Image
                src="/icons/discover.svg"
                width={20}
                height={20}
                alt="discover"
              />
              <h1 className="text-16 text-white-1 font-extrabold">
                {buttonText}
              </h1>
            </Link>
          </Button>
        )}
      </div>
    </section>
  );
};

export default EmptyState