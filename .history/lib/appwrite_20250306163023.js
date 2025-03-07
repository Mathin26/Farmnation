import {
    Client,
    Account,
    ID,
    Avatars,
    Databases,
    Query,
    Storage,
  } from "react-native-appwrite";
  
  export const config = {
    endpoint: "https://cloud.appwrite.io/v1",
    platform: "com.app.farmNation",
    projectId: "67c8863b002156720b74",
    databaseId: "67c9643b00222ce618a6",
    usercollectionsId: "67c9645700142b0f3967",
    productcollectionsId: "67c964660038301c86fb",
    storageBucketId: "67c965a80004638f2847",
  };

  const client = new Client();

  client.setEndpoint(config.endpoint).setProject(config.projectId).setPlatform(config.platform);

  export const account = new Account(client);
  const avatars = new Avatars(client);
  const database = new Databases(client);
  const storage = new Storage(client);


  export const createUser = async (data) => {
    try {
      const user = await account.create(ID.unique(), data.email, data.password, data.name);
     if(!user) throw new Error("Error creating user");
      await database.createDocument(config.databaseId,config.usercollectionsId, ID.unique(), {
        name: data.name,
        email: data.email,
        role: data.role,
        farmerId: data.farmerId || null,
        location: data.location || null,
        createdAt: new Date().toISOString(),
      });
  
      alert("Sign-Up Successful!");
      return user;
    } catch (error) {
      console.error("Sign-Up Error:", error);
      alert("Error creating user!");
      throw error;
    }
  };

  export async function signIn(email, password) {
    try {
      const session = await account.createEmailPasswordSession(email, password);
      return session;
    } catch (error) {
      console.error("Sign-In Error:", error);
      throw new Error(error.message || "Failed to sign in");
    }
  }
  export const getCurrentUser = async () => {
    try {
      const user = await account.get(); // Fetch the logged-in user details
      return user;
    } catch (error) {
      console.error("Error fetching user:", error);
      return null; // Return null if no active session
    }
  };

  export const sendPasswordReset = async (email) => {
    try {
      await account.createRecovery();
      return true;
    } catch (error) {
      console.error("Password Reset Error:", error);
      throw error;
    }
  };

  