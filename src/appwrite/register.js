import { Client, Account, ID } from "appwrite";
import {appwriteUrl, appwriteProjectId} from '../conf/conf';
import {login} from '../appwrite/login';

export async function register(email, password){
    const client = new Client()
    .setEndpoint(appwriteUrl) // Your API Endpoint
    .setProject(appwriteProjectId);                 // Your project ID

const account = new Account(client);

await account.create(
    ID.unique(), 
    email, 
    password
);
login(email, password);
}
