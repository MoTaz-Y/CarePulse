import * as sdk from "node-appwrite";

const PROJECT_ID = "679a49e7002c11eef30d"
const API_KEY = "standard_4e474c6b78245e49ec1fc58f1a39e605184c55ba5637b7ca388e305b8754cd2e00c5f3aef3358671995ae453e3b780ceeae5a12d0355647c1bdbfe042c04e8fceeb748f761025bef6fe6e38c7c661147d53a6581d92ab8d9002f7afef3e9a1bc583ae64f2ca45e7be47d7166740bd1d05bf9f0353c8ce030c3101890dd0ca5c7"
// const DATABASE_ID = "679a4aa100346d2f91d5"
// const PATIENT_COLLECTION_ID = "679a4ae30025ac870f7e"
// const DOCTOR_COLLECTION_ID = "679a4b3200251b741dc3"
// const APPOINTMENT_COLLECTION_ID  = "679a4b7300260ff0258f"
// const NEXT_PUBLIC_BUCKET_ID = "679a4bbd003137d4014a "  
const NEXT_PUBLIC_ENDPOINT = "https://cloud.appwrite.io/v1"



const client = new sdk.Client();
client.setEndpoint(NEXT_PUBLIC_ENDPOINT!).setProject(PROJECT_ID!).setKey(API_KEY!);

export const database = new sdk.Databases(client);
export const storage = new sdk.Storage(client);
export const messaging = new sdk.Messaging(client);
export const users = new sdk.Users(client);

export const account = new sdk.Account(client);
