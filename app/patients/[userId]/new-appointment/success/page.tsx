<<<<<<< HEAD
=======
/* eslint-disable @typescript-eslint/no-explicit-any */
>>>>>>> 6993e1455868ecf5da3e6df46fc2bfad4fd24c8c
import { Button } from '@/components/ui/button';
import { Doctors } from '@/constants';
import { getAppointment } from '@/lib/actions/appointment.actions';
import { formatDateTime } from '@/lib/utils';
import Image from 'next/image';
import Link from 'next/link';
import React from 'react';
<<<<<<< HEAD

const Success = async ({
  searchParams,
  params: { userId },
}: SearchParamProps) => {
=======
import * as Sentry from '@sentry/nextjs';
import { getUser } from '@/lib/actions/patient.actions';
interface SuccessPageProps {
  params: any;
  searchParams?: any;
}

export default async function Success({
  params,
  searchParams,
}: SuccessPageProps) {
  const { userId } = params;
>>>>>>> 6993e1455868ecf5da3e6df46fc2bfad4fd24c8c
  const appointmentId = (searchParams?.appointmentId as string) || '';
  const appointment = await getAppointment(appointmentId);

  const doctor = Doctors.find(
    (doctor) => doctor.name === appointment.primaryPhysician
  );
<<<<<<< HEAD

  return (
    <div className=' flex h-screen max-h-screen px-[5%]'>
=======
  const user = await getUser(userId);
  Sentry.metrics.set('user_view_appointment-success', user.name);
  return (
    <div className='flex h-screen max-h-screen px-[5%]'>
>>>>>>> 6993e1455868ecf5da3e6df46fc2bfad4fd24c8c
      <div className='success-img'>
        <Link href='/'>
          <Image
            src='/assets/icons/logo-full.svg'
<<<<<<< HEAD
            height={1000}
            width={1000}
            alt='logo'
            className='h-10 w-fit'
          />
        </Link>

        <section className='flex flex-col items-center'>
          <Image
            src='/assets/gifs/success.gif'
=======
            alt='success'
            width={1000}
            height={1000}
            className='h-10 w-fit'
          />
        </Link>
        <section className='flex flex-col items-center justify-center'>
          <Image
            src='/assets/gifs/success.gif'
            alt='success'
            width={300}
>>>>>>> 6993e1455868ecf5da3e6df46fc2bfad4fd24c8c
            height={300}
            width={280}
            alt='success'
          />
          <h2 className='header mb-6 max-w-[600px] text-center'>
<<<<<<< HEAD
            Your <span className='text-green-500'>appointment request</span> has
            been successfully submitted!
=======
            Your <span className='text-green-500'>Appointment request</span> has
            been <span className='text-green-500'>submitted</span> successfully!
>>>>>>> 6993e1455868ecf5da3e6df46fc2bfad4fd24c8c
          </h2>
          <p>We&apos;ll be in touch shortly to confirm.</p>
        </section>
<<<<<<< HEAD

        <section className='request-details'>
          <p>Requested appointment details: </p>
          <div className='flex items-center gap-3'>
            <Image
              src={doctor?.image || '/assets/icons/user.svg'}
=======
        <section className='request-details'>
          <p>Requested appointment details:</p>
          <div className='flex items-center gap-3'>
            <Image
              //
              // eslint-disable-next-line @typescript-eslint/no-non-null-asserted-optional-chain
              src={doctor?.image!}
>>>>>>> 6993e1455868ecf5da3e6df46fc2bfad4fd24c8c
              alt='doctor'
              width={100}
              height={100}
              className='size-6'
            />
            <p className='whitespace-nowrap'>Dr. {doctor?.name}</p>
          </div>
          <div className='flex gap-2'>
            <Image
              src='/assets/icons/calendar.svg'
<<<<<<< HEAD
=======
              alt='calendar'
              width={24}
>>>>>>> 6993e1455868ecf5da3e6df46fc2bfad4fd24c8c
              height={24}
              width={24}
              alt='calendar'
            />
            <p> {formatDateTime(appointment.schedule).dateTime}</p>
          </div>
        </section>
<<<<<<< HEAD

        <Button variant='outline' className='shad-primary-btn' asChild>
=======
        <Button variant='outline' className='shad-primary-btn rounded' asChild>
>>>>>>> 6993e1455868ecf5da3e6df46fc2bfad4fd24c8c
          <Link href={`/patients/${userId}/new-appointment`}>
            New Appointment
          </Link>
        </Button>
<<<<<<< HEAD

        <p className='copyright'>© 2024 CarePluse</p>
=======
        <p className='copyright'>© Copyright 2023. All rights reserved.</p>
>>>>>>> 6993e1455868ecf5da3e6df46fc2bfad4fd24c8c
      </div>
    </div>
  );
}
