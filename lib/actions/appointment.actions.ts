"use server";

import { ID, Query } from "node-appwrite";
import { database } from "../appwrite.cofig";
import { parseStringify } from "../utils";
import { Appointment } from "@/types/appwrite.types";

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

export const getRecentAppointmentList = async () => {
  try {
    const appointments = await database.listDocuments(
      "679a4aa100346d2f91d5", // process.env.DATABASE_ID!,
      "679a4b7300260ff0258f", // process.env.APPOINTMENT_COLLECTION_ID!,
      // {
      //   limit: 10,
      //   order: "asc",
      //   filter: "created_at > 1 day ago",
      // },
      [Query.orderDesc(`$createdAt`)]
    );
    const initialCounts = {
      scheduleCount: 0,
      pendingCount: 0,
      completedCount: 0,
    };
    const counts = (appointments.documents as Appointment[]).reduce(
      (acc, appointment) => {
        switch (appointment.status) {
          case "scheduled":
            acc.scheduleCount += 1;
            break;
          case "pending":
            acc.pendingCount += 1;
            break;
          case "cancelled":
            acc.completedCount += 1;
            break;
          default:
            break;
        }
        return acc;
      },
      initialCounts
    );
    const data = {
      totalCount: appointments.total,
      ...counts,
      documents: appointments.documents,
    };
    return parseStringify(data);
  } catch (error) {
    console.log(error);
  }
};
