'use client';
<<<<<<< HEAD
import React, { useState, Dispatch, SetStateAction } from 'react';
=======
import React, { useState } from 'react';
>>>>>>> 6993e1455868ecf5da3e6df46fc2bfad4fd24c8c
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { Form } from '@/components/ui/form';
import CustomForm from '../ui/CustomForm';
import SubmitButton from '../SubmitButton';
import { getAppointmentSchema } from '@/lib/Validation';
// import { create } from "domain";
import { useRouter } from 'next/navigation';
import { FormFieldType } from './PatientForm';
import { Doctors } from '@/constants';
import { SelectItem } from '../ui/select';
import Image from 'next/image';
import {
  createAppointment,
  updateAppointment,
} from '@/lib/actions/appointment.actions';
import { Appointment } from '@/types/appwrite.types';

const AppointmentForm = ({
  type,
  userId,
  patientId,
  appointment,
  setOpen,
}: {
  type: 'create' | 'cancel' | 'schedule';
  userId: string;
  patientId: string;
  appointment?: Appointment;
<<<<<<< HEAD
  setOpen?: Dispatch<SetStateAction<boolean>>;
=======
  setOpen?: (open: boolean) => void;
>>>>>>> 6993e1455868ecf5da3e6df46fc2bfad4fd24c8c
}) => {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const AppointmentFormValidation = getAppointmentSchema(type);
  const form = useForm<z.infer<typeof AppointmentFormValidation>>({
    resolver: zodResolver(AppointmentFormValidation),
    defaultValues: {
      primaryPhysician: appointment?.primaryPhysician || '',
      schedule: appointment?.schedule || new Date(),
      reason: appointment?.reason || '',
      note: appointment?.note || '',
      cancellationReason: appointment?.cancellationReason || '',
    },
  });

  // 2. Define a submit handler.
  const onSubmit = async (
    values: z.infer<typeof AppointmentFormValidation>
  ) => {
    setIsLoading(true);
    console.log(values, 'iam here');
    let status;
    switch (type) {
      case 'create':
        status = 'pending';
        break;
      case 'cancel':
        status = 'cancelled';
        break;
      case 'schedule':
        status = 'scheduled';
        break;
      default:
        break;
    }
    try {
      if (type === 'create' && patientId) {
        const appointmentData = {
          userId: userId,
          patient: patientId,
          status: status as Status,
          primaryPhysician: values.primaryPhysician,
          schedule: new Date(values.schedule),
          reason: values.reason!,
          note: values.note,
        };
        const apppointment = await createAppointment(appointmentData);
        if (apppointment) {
          form.reset();
          router.push(
            `/patients/${userId}/new-appointment/success?appointmentId=${apppointment.$id}`
          );
        }
      } else {
<<<<<<< HEAD
        const appointToUpdate = {
          userId: userId,
          appointmentId: appointment?.$id as string,
          appointment: {
            primaryPhysician: values?.primaryPhysician,
            schedule: new Date(values?.schedule),
            status: status as Status,
            cancellationReason: values?.cancellationReason,
          },
          type,
        };
        const updatedAppointment = await updateAppointment(appointToUpdate);
        if (updatedAppointment) {
          if (setOpen) {
            setOpen(false);
          }
          form.reset();
=======
        if (appointment) {
          const appointToUpdate = {
            userId: userId,
            appointmentId: appointment.$id,
            appointment: {
              primaryPhysician: values?.primaryPhysician,
              schedule: new Date(values?.schedule),
              status: status as Status,
              cancellationReason: values?.cancellationReason,
            },
            type,
          };
          const updatedAppointment = await updateAppointment(appointToUpdate);
          if (updatedAppointment) {
            if (setOpen) {
              setOpen(false);
            }
            form.reset();
          }
>>>>>>> 6993e1455868ecf5da3e6df46fc2bfad4fd24c8c
        }
      }
    } catch (error) {
      console.log(error);
    }
    setIsLoading(false);
  };
  let buttonLabel;
  switch (type) {
    case 'create':
      buttonLabel = 'Create Appointment';
      break;
    case 'cancel':
      buttonLabel = 'Cancel Appointment';
      break;
    case 'schedule':
      buttonLabel = 'Schedule Appointment';
      break;
    default:
      break;
  }
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-6 flex-1'>
        {type === 'create' && (
          <section className='mb-12 space-y-4'>
            <h1 className='header'>New Appointment</h1>
            <p className='text-daek-700'>
              Request a new appointment in 10 seconds
            </p>
          </section>
        )}
        {type !== 'cancel' && (
          <>
            <CustomForm
              control={form.control}
              fieldType={FormFieldType.SELECT}
              name='primaryPhysician'
              label='Doctor'
              placeholder='Select a Doctor'
            >
              {Doctors.map((doctor) => (
                <SelectItem key={doctor.name} value={doctor.name}>
                  <div className='flex items-center gap-2 cursor-pointer'>
                    <Image
                      src={doctor.image}
                      alt={doctor.name}
                      width={32}
                      height={32}
                      className='rounded-full border border-dark-500'
                    />
                    <p>{doctor.name}</p>
                  </div>
                </SelectItem>
              ))}
            </CustomForm>
            <CustomForm
              fieldType={FormFieldType.DATE_PICKER}
              control={form.control}
              name='schedule'
              label='Expected appointment date'
              showTimeSelect
              dateFormat='dd/MM/yyyy - h:mm aa'
            />
            <div className='flex flex-col gap-6 xl:flex-row'>
              <CustomForm
                control={form.control}
                fieldType={FormFieldType.TEXTAREA}
                name='reason'
                label='Reason for the appointment'
                placeholder='Enter reason for appointment'
              />
              <CustomForm
                control={form.control}
                fieldType={FormFieldType.TEXTAREA}
                name='note'
                label='Notes'
                placeholder='Enter some notes'
              />
            </div>
          </>
        )}
        {type === 'cancel' && (
          <CustomForm
            control={form.control}
            fieldType={FormFieldType.TEXTAREA}
            name='cancellationReason'
            label='Reason for the cancellation'
            placeholder='Enter reason for cancellation'
          />
        )}
        <SubmitButton
          isLoading={isLoading}
          className={`${
            type === 'cancel' ? 'shad-danger-btn' : 'shad-primary-btn'
          } w-full`}
        >
          {buttonLabel}
        </SubmitButton>
      </form>
    </Form>
  );
};

export default AppointmentForm;
