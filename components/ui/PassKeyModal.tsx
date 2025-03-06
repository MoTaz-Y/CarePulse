'use client';
import React, { useEffect, useState } from 'react';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@/components/ui/alert-dialog';
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from '@/components/ui/input-otp';
import Image from 'next/image';
import { usePathname, useRouter } from 'next/navigation';
import { decryptKey, encryptKey } from '@/lib/utils';

const PassKeyModal = () => {
  const router = useRouter();
  const path = usePathname();
  const [open, setOpen] = useState(true);
  const [otp, setOtp] = useState('');
  const [error, setError] = useState('');

  const encryptedKey =
    typeof window !== 'undefined'
      ? window.localStorage.getItem('accessKey')
      : null;

  useEffect(() => {
    const accessKey = encryptedKey && decryptKey(encryptedKey);
    if (path) {
      if (accessKey === process.env.NEXT_PUBLIC_ADMIN_PASSKEY) {
        setOpen(false);
        router.push('/admin');
      } else {
        setOpen(true);
      }
    }
  }, [encryptedKey, path, router]);
  const closeModal = () => {
    setOpen(false);
    router.push('/');
  };
  const validatePasskey = (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    e.preventDefault();
    if (otp === process.env.NEXT_PUBLIC_ADMIN_PASSKEY) {
      const encryptedKey = encryptKey(otp);
      localStorage.setItem('accessKey', encryptedKey);
      setOpen(false);
      router.push('/admin');
    } else {
      setError('Invalid Passkey, please try again');
    }
  };
  return (
    <>
      <AlertDialog open={open} onOpenChange={setOpen}>
        <AlertDialogContent className='shad-alert-dialog'>
          <AlertDialogHeader>
            <AlertDialogTitle className='flex items-start justify-between'>
              Admin Access Verification
              <Image
                src='/assets/icons/close.svg'
                alt='close'
                width={24}
                height={24}
                onClick={() => closeModal()}
                className='cursor-pointer'
              />
            </AlertDialogTitle>
            <AlertDialogDescription>
              To access the admin dashboard, please enter the{' '}
              <span className='text-green-500'>passkey</span> below.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <div>
            <InputOTP
              maxLength={6}
              value={otp}
              onChange={(value) => setOtp(value)}
            >
              <InputOTPGroup className='shad-otp'>
                <InputOTPSlot className='shad-otp-slot' index={0} />
                <InputOTPSlot className='shad-otp-slot' index={1} />
                <InputOTPSlot className='shad-otp-slot' index={2} />
                <InputOTPSlot className='shad-otp-slot' index={3} />
                <InputOTPSlot className='shad-otp-slot' index={4} />
                <InputOTPSlot className='shad-otp-slot' index={5} />
              </InputOTPGroup>
            </InputOTP>
            {error && (
              <p className='shad-error text-14-regular mt-4 flex justify-center'>
                {error}
              </p>
            )}
          </div>
          <AlertDialogFooter>
            <AlertDialogAction
              className='shad-primary-btn w-full'
              onClick={(e) => validatePasskey(e)}
            >
              Enter Admin Passkey
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
};

export default PassKeyModal;
