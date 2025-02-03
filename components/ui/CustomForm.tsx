"use client";

import React, { useState } from "react";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "./form";
import { Input } from "./input";
import { Control } from "react-hook-form";
import { FormFieldType } from "../forms/PatientForm";
import Image from "next/image";
import "react-phone-number-input/style.css";
import PhoneInput from "react-phone-number-input";
import { E164Number } from "libphonenumber-js/core";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { Select, SelectContent, SelectTrigger, SelectValue } from "./select";

interface CustomProps {
  control: Control<any>;
  fieldType: FormFieldType;
  name: string;
  placeholder?: string;
  iconSrc?: string;
  iconAlt?: string;
  label?: string;
  disabled?: boolean;
  dateFormat?: string;
  showTimeSelect?: boolean;
  children?: React.ReactNode;
  renderSkeleton?: (field: any) => React.ReactNode;
}
const RenderField = ({ field, props }: { field: any; props: CustomProps }) => {
  // const [startDate, setStartDate] = useState(new Date());
  switch (props.fieldType) {
    case FormFieldType.INPUT:
      return (
        <div className="flex rounded border border-dark-500 bg-dark-400  items-center">
          {props.iconSrc && (
            <Image
              src={props.iconSrc}
              alt={props.iconAlt || "Icon"}
              width={24}
              height={24}
              className="ml-2 mr-3"
            />
          )}
          <FormControl>
            <Input
              placeholder={props.placeholder}
              {...field}
              className="shad-input border-0"
            />
          </FormControl>
        </div>
      );
    case FormFieldType.PHONE_INPUT:
      return (
        <FormControl>
          <PhoneInput
            placeholder={props.placeholder}
            defaultCountry="EG"
            withCountryCallingCode
            international
            className=" border-0 input-phone"
            value={field.value as E164Number | undefined}
            onChange={field.onChange}
          />
        </FormControl>
      );
    case FormFieldType.DATE_PICKER:
      return (
        <div className="flex rounded  border border-dark-500 bg-dark-400 items-center">
          <Image
            src="/assets/icons/calendar.svg"
            alt="calendar"
            width={24}
            height={24}
            className="ml-2 mr-3 "
          />
          <FormControl>
            <DatePicker
              selected={field.value}
              onChange={(date) => field.onChange(date)}
              className="shad-input border-0"
              dateFormat={props.dateFormat ?? "MM/dd/yyyy"}
              showTimeSelect={props.showTimeSelect ?? false}
              timeInputLabel="Time:"
              wrapperClassName="date-picker"
            />
          </FormControl>
        </div>
      );
    case FormFieldType.SKELETON:
      return props.renderSkeleton ? props.renderSkeleton(field) : null;
    case FormFieldType.SELECT:
      return (
        <FormControl>
          <Select onValueChange={field.onChange} defaultValue={field.value}>
            <FormControl className="shad-select-trigger">
              <SelectTrigger>
                <SelectValue placeholder={props.placeholder} />
              </SelectTrigger>
            </FormControl>
            <SelectContent className="shad-select-content">
              {props.children}
            </SelectContent>
          </Select>
        </FormControl>
      );
    case FormFieldType.CHECKBOX:
      return <FormControl {...field} {...props} />;
    default:
      break;
  }
};

const CustomForm = (props: CustomProps) => {
  const { control, fieldType, name, label } = props;
  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => (
        <FormItem className="flex-1">
          {fieldType !== FormFieldType.CHECKBOX && label && (
            <FormLabel>{label}</FormLabel>
          )}
          <RenderField field={field} props={props} />
          <FormMessage className="shad-error" />
        </FormItem>
      )}
    />
  );
};

export default CustomForm;
