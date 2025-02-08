"use server";

import { ID } from "node-appwrite";
import { database } from "../appwrite.cofig";
import { parseStringify } from "../utils";

export const createAppointment = async (
  appointment: CreateAppointmentParams
) => {
  try {
    const newAppointment = await database.createDocument(
      "679a4aa100346d2f91d5", // process.env.DATABASE_ID!,
      "679a4b7300260ff0258f", // process.env.APPOINTMENT_COLLECTION_ID!,
      ID.unique(),
      // {
      //   identificationDocumentId: file?.$id ? file.$id : null,
      //   identificationDocumentUrl: file?.$id
      //     ? `${ENDPOINT}/storage/buckets/${BUCKET_ID}/files/${file.$id}/view??project=${PROJECT_ID}`
      //     : null,
      //   ...patient,
      // }
      appointment
    );
    return parseStringify(newAppointment);
  } catch (error) {
    console.log(error);
  }
};

export const getAppointment = async (appointmentId: string) => {
  try {
    const appointment = await database.getDocument(
      "679a4aa100346d2f91d5", // process.env.DATABASE_ID!,
      "679a4b7300260ff0258f", // process.env.APPOINTMENT_COLLECTION_ID!,
      appointmentId
    );
    return parseStringify(appointment);
  } catch (error) {
    console.log(error);
  }
};
