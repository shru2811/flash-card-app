//Authentication service
import conf from "../conf/conf";
import {Client, Account, ID} from "appwrite";

export class AuthService{
    client = new Client;
    account;
    //these will be defined when a new object will be created.
    constructor(){
        this.client.setEndpoint(conf.appwriteUrl).setProject(conf.appwriteProjectId)
        this.account = new Account(this.client)
    }
    //sometimes in future we need to change our backend from appwrite to some else, so we will create separate function for createAccount.
    async createAccount(email, password ,name) {
        try{
           const userAcc =  await this.account.create(ID.unique, email, password, name);
           if(userAcc){
            //login
            //successfull account creation message
            return this.login({email, password});
           }
           else{
            throw
           }
        }
        catch(error){
            throw error;
        }
    }

    async login(email, password){
        try {
            return await this.account.createEmailSession(email, password);
        } catch (error) {
            throw error;
        }
    }
    //to know whether logged in or not?
    async getCurrentUser(){
        try{
            return await this.account.get()
        }
        catch(error){
            console.log("Appwrite serive: getCurrentUSer :: error", error)
        }
        return null;
    }
    //logout functionality
    async logout(){
        try {
            await this.account.deleteSessions()
        } catch (error) {
            console.log("Appwrite serive: getCurrentUSer :: error", error)
        }
    }
}

//instead of exporting class, we will export the object.
const authService = new AuthService;

export default authService;