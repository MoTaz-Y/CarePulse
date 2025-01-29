"use client";
import React, { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Form } from "@/components/ui/form";
import CustomForm from "../ui/CustomForm";
import SubmitButton from "../SubmitButton";
import { UserFormValidation } from "@/lib/Validation";
import { create } from "domain";
import { useRouter } from "next/navigation";

export enum FormFieldType {
  INPUT = "input",
  CHECKBOX = "checkbox",
  RADIO = "radio",
  SELECT = "select",
  TEXTAREA = "textarea",
  FILE = "file",
  PHONE_INPUT = "phone_input",
  DATE_PICKER = "date_picker",
  SKELETON = "skeleton",
}

const PatientForm = () => {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  // 1. Define your form.
  const form = useForm<z.infer<typeof UserFormValidation>>({
    resolver: zodResolver(UserFormValidation),
    defaultValues: {
      name: "",
      email: "",
      phone: "",
    },
  });

  // 2. Define a submit handler.
  async function onSubmit({
    name,
    email,
    phone,
  }: z.infer<typeof UserFormValidation>) {
    setIsLoading(true);
    // Do something with the form values.
    // ✅ This will be type-safe and validated.
    try {
    //   const userData = {
    //     name,
    //     email,
    //     phone,
    //   };
    //   const user = await createUser(userData);
    //   if (user) {
    //     router.push(`/patients/${user.$id}/register`);
    //   }
    } catch (error) {
      console.log(error);
    }
  }
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6 flex-1">
        <section className="mb-12 space-y-4">
          <h1 className="header">Hi there 👋</h1>
          <p className="text-daek-700">Schedule your appointment</p>
        </section>
        <CustomForm
          control={form.control}
          fieldType={FormFieldType.INPUT}
          name="username"
          label="Full Name"
          placeholder="john doe"
          iconSrc="/assets/icons/user.svg"
          iconAlt="user"
        />
        <CustomForm
          control={form.control}
          fieldType={FormFieldType.INPUT}
          name="email"
          label="Email"
          placeholder="johndoe@example.com"
          iconSrc="/assets/icons/email.svg"
          iconAlt="email"
        />
        <CustomForm
          control={form.control}
          fieldType={FormFieldType.PHONE_INPUT}
          name="phone"
          label="Phone Number"
          placeholder="+20 10 101 010 10"
        />
        <SubmitButton isLoading={isLoading}>Get Strated</SubmitButton>
      </form>
    </Form>
  );
};

export default PatientForm;
