import { ID, Query } from "node-appwrite";
import { users } from "../appwrite.cofig";
import { parseStringify } from "../utils";

// import sdk from "node-appwrite"

export const createUser = async (user: CreateUserParams) => {
  try {
    const newUser = await users.create(ID.unique(), user.email, user.phone, undefined, user.name).catch((error) => {
      throw error; 
    });

    return parseStringify(newUser);
  } catch (error) {
    console.log(error,"erorr of conflicting")
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
}