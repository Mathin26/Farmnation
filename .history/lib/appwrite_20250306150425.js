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

  const account = new Account(client);
  const avatars = new Avatars(client);
  const database = new Databases(client);
  const storage = new Storage(client);


  export const createUser = async (data) => {
    try {
      const user = await account.create(ID.unique, data.email, data.password, data.name);
  
      await database.createDocument("FarmNationDB", "users", "unique()", {
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