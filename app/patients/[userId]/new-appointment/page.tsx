// import { Button } from "@/components/ui/button";
<<<<<<< HEAD
import AppointmentForm from '@/components/forms/AppointmentForm';
import { getPatient } from '@/lib/actions/patient.actions';
import Image from 'next/image';

const Appointment = async ({ params: { userId } }: SearchParamProps) => {
  const patient = await getPatient(userId);

  return (
    <div className='flex h-screen max-h-screen'>
=======
/* eslint-disable @typescript-eslint/no-explicit-any */
import AppointmentForm from '@/components/forms/AppointmentForm';
import { getPatient } from '@/lib/actions/patient.actions';
import Image from 'next/image';
import * as Sentry from '@sentry/nextjs';

interface NewAppointmentProps {
  params: any;
}

export default async function NewAppointment({ params }: NewAppointmentProps) {
  const { userId } = params;
  const patient = await getPatient(userId);
  Sentry.metrics.set('user_view_new-appointment', patient.name);

  return (
    <div className='flex  h-screen max-h-screen'>
>>>>>>> 6993e1455868ecf5da3e6df46fc2bfad4fd24c8c
      <section className='remove-scrollbar container my-auto'>
        <div className='sub-container max-w-[860px] flex-1 justify-between'>
          <Image
            src='/assets/icons/logo-full.svg'
<<<<<<< HEAD
            height={1000}
            width={1000}
            alt='logo'
=======
            alt='patient'
            width={1000}
            height={1000}
>>>>>>> 6993e1455868ecf5da3e6df46fc2bfad4fd24c8c
            className='mb-12 h-10 w-fit'
          />

          <AppointmentForm
<<<<<<< HEAD
            patientId={patient?.$id}
=======
            type='create'
>>>>>>> 6993e1455868ecf5da3e6df46fc2bfad4fd24c8c
            userId={userId}
            type='create'
          />
<<<<<<< HEAD

          <p className='copyright mt-10 py-12'>© 2024 CarePluse</p>
=======
          <p className='copyright py-12 mt-3'>
            © 2025 CarePulse. All rights reserved.
          </p>
>>>>>>> 6993e1455868ecf5da3e6df46fc2bfad4fd24c8c
        </div>
      </section>

      <Image
        src='/assets/images/appointment-img.png'
<<<<<<< HEAD
        height={1500}
        width={1500}
        alt='appointment'
=======
        alt='appointment'
        width={1000}
        height={1000}
>>>>>>> 6993e1455868ecf5da3e6df46fc2bfad4fd24c8c
        className='side-img max-w-[390px] bg-bottom'
      />
    </div>
  );
};

export default Appointment;
