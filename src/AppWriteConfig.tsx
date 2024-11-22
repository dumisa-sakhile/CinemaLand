import { Account,Client } from "appwrite";

const client = new Client();
client.setProject("6738a6fa003852c336c9");
client.setEndpoint("https://cloud.appwrite.io/v1");

export const account = new Account(client);