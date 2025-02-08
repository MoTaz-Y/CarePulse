"use server";

import { ID, Query } from "node-appwrite";
import { database, storage, users } from "../appwrite.cofig";
import { parseStringify } from "../utils";
import { InputFile } from "node-appwrite/file";

// import sdk from "node-appwrite"

export const createUser = async (user: CreateUserParams) => {
  try {
    const newUser = await users
      .create(ID.unique(), user.email, user.phone, undefined, user.name)
      .catch((error) => {
        throw error;
      });

    return parseStringify(newUser);
  } catch (error) {
    console.log(error, "erorr of conflicting");
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    //@ts-expect-error
    if (error && error?.code === 409) {
      const documents = await users.list([Query.equal("email", user.email)]);
      return documents?.users[0];
    }
  }
};

export const getUser = async (userId: string) => {
  try {
    const user = await users.get(userId);
    return parseStringify(user);
  } catch (error) {
    console.log(error);
  }
};

export const registerPatient = async ({
  identificationDocument,
  ...patient
}: RegisterUserParams) => {
  console.log(identificationDocument, "patient");
  try {
    let file;
    if (identificationDocument) {
      const inputFile = InputFile.fromBuffer(
        identificationDocument?.get("blobFile") as Blob,
        identificationDocument?.get("fileName") as string
      );
      file = await storage.createFile(
        // process.env.NEXT_PUBLIC_BUCKET_ID!,
        "679a4bbd003137d4014a",
        ID.unique(),
        inputFile
      );
      const newPatient = await database.createDocument(
        "679a4aa100346d2f91d5", // process.env.DATABASE_ID!,
        "679a4ae30025ac870f7e", // process.env.PATIENT_COLLECTION_ID!,
        ID.unique(),
        // {
        //   identificationDocumentId: file?.$id ? file.$id : null,
        //   identificationDocumentUrl: file?.$id
        //     ? `${ENDPOINT}/storage/buckets/${BUCKET_ID}/files/${file.$id}/view??project=${PROJECT_ID}`
        //     : null,
        //   ...patient,
        // }
        {
          identificationDocumentId: file?.$id || null,
          identificationDocumentUrl: file?.$id
            ? `https://cloud.appwrite.io/v1/storage/buckets/679a4bbd003137d4014a/files/${file.$id}/view??project=679a49e7002c11eef30d`
            : null,
          ...patient,
        }
      );
      return parseStringify(newPatient);
    }
  } catch (error) {
    console.log(error, "erorr of conflicting");
  }
};

export const getPatient = async (userId: string) => {
  try {
    const patients = await database.listDocuments(
      "679a4aa100346d2f91d5", // process.env.DATABASE_ID!,
      "679a4ae30025ac870f7e", // process.env.PATIENT_COLLECTION_ID!,
      [Query.equal("userId", userId)]
    );
    return parseStringify(patients.documents[0]);
  } catch (error) {
    console.log(error);
  }
};
