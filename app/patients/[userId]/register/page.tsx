import RegisterForm from "@/components/forms/RegisterForm";
import { getUser } from "@/lib/actions/patient.actions";
import Image from "next/image";
import Link from "next/link";
import React from "react";

const Register = async ({ params }: { params: { userId: string } }) => {
  const { userId } = await params;
  const user = await getUser(userId);
  return (
    <div className="flex  h-screen max-h-screen">
      {/* TODO: OTP verification | PasskeyModal */}

      <section className="remove-scrollbar container my-auto">
        <div className="sub-container max-w-[496px]">
          <Image
            src="/assets/icons/logo-full.svg"
            alt="patient"
            width={1000}
            height={1000}
            className="mb-12 h-10 w-fit"
          />
          <RegisterForm user={user} />
          <div className="text-14-regular mt-20 flex justify-between">
            {/* copyright sign */}
            <p className="text-dark-600 justify-items-end xl:text-left">
              © 2025 CarePulse. All rights reserved.
            </p>
            <Link href="/?admin=true" className="text-green-500">
              Admin
            </Link>
          </div>
        </div>
      </section>
      <Image
        src="/assets/images/register-img.png"
        alt="patient"
        width={1000}
        height={1000}
        className="side-img max-w-[390px]"
      />
    </div>
  );
};

export default Register;
