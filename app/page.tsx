// import { Button } from "@/components/ui/button";
/* eslint-disable @typescript-eslint/no-explicit-any */

import PatientForm from '@/components/forms/PatientForm';
import PassKeyModal from '@/components/ui/PassKeyModal';
import Image from 'next/image';
import Link from 'next/link';

interface HomePageProps {
  // نستخدم any عشان نكسر التقييد الجاي من PageProps
  searchParams?: any;
}

export default function Home({ searchParams }: HomePageProps) {
  const isAdmin = searchParams?.admin === 'true';
  return (
    <div className='flex  h-screen max-h-screen'>
      {isAdmin && <PassKeyModal />}

      <section className='remove-scrollbar container my-auto'>
        <div className='sub-container max-w-[496px]'>
          <Image
            src='/assets/icons/logo-full.svg'
            alt='patient'
            width={1000}
            height={1000}
            className='mb-12 h-10 w-fit'
          />
          <PatientForm />
          <div className='text-14-regular mt-20 flex justify-between'>
            {/* copyright sign */}
            <p className='text-dark-600 justify-items-end xl:text-left'>
              © 2025 CarePulse. All rights reserved.
            </p>
            <Link href='/?admin=true' className='text-green-500'>
              Admin
            </Link>
          </div>
        </div>
      </section>
      <Image
        src='/assets/images/onboarding-img.png'
        alt='patient'
        width={1000}
        height={1000}
        className='side-img max-w-[50%]'
      />
    </div>
  );
}
