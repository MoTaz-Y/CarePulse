import { Button } from '@/components/ui/button';
import { Doctors } from '@/constants';
import { getAppointment } from '@/lib/actions/appointment.actions';
import { formatDateTime } from '@/lib/utils';
import Image from 'next/image';
import Link from 'next/link';
import React from 'react';
import * as Sentry from '@sentry/nextjs';
import { getUser } from '@/lib/actions/patient.actions';

interface SuccessPageProps {
  params: { userId: string };
  searchParams: { [key: string]: string | string[] | undefined };
}
const Success = async ({ params, searchParams }: SuccessPageProps) => {
  console.log('hey there calm down');
  console.log(params, 'osdjfjdasfjadfkjk');
  const { userId } = params;
  const appointmentId = (searchParams?.appointmentId as string) || '';
  const appointment = await getAppointment(appointmentId);
  const doctor = Doctors.find(
    (doc) => doc.name === appointment.primaryPhysician
  );
  const user = await getUser(userId);
  Sentry.metrics.set('user_view_appointment-success', user.name);
  return (
    <div className='flex h-screen max-h-screen px-[5%]'>
      <div className='success-img'>
        <Link href='/'>
          <Image
            src='/assets/icons/logo-full.svg'
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
            height={300}
          />
          <h2 className='header mb-6 max-w-[600px] text-center'>
            Your <span className='text-green-500'>Appointment request</span> has
            been <span className='text-green-500'>submitted</span> successfully!
          </h2>
          <p>We will be in touch shortly to confirm your appointment</p>
        </section>
        <section className='request-details'>
          <p>Requested appointment details:</p>
          <div className='flex items-center gap-3'>
            <Image
              //
              // eslint-disable-next-line @typescript-eslint/no-non-null-asserted-optional-chain
              src={doctor?.image!}
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
              alt='calendar'
              width={24}
              height={24}
            />
            <p>{formatDateTime(appointment.schedule).dateTime}</p>
          </div>
        </section>
        <Button variant='outline' className='shad-primary-btn rounded' asChild>
          <Link href={`/patients/${userId}/new-appointment`}>
            New Appointment
          </Link>
        </Button>
        <p className='copyright'>© Copyright 2023. All rights reserved.</p>
      </div>
    </div>
  );
};

export default Success;
