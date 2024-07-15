import conf from "../conf/conf";
import {Client, Account, ID} from "appwrite";

export class Service{
    client = new Client;
    databases;
    storage;
    constructor(){
        this.client.setEndpoint(conf.appwriteUrl).setProject(conf.appwriteProjectId)
        this.databases = new Databases(this.client)
        this.storage = new Storage(this.client)
    }
    async createCard({title, definitions, userId}){
        try {   
            return await this.databases.createDocument(
                conf.appwriteDatabaseId,
                conf.appwriteCollectionId,
                ID.unique(),
                {
                    title,
                    definitions,
                    userId,
                }
            )
        } catch (error) {
            console.log("Appwrite serive: create Card :: error", error)
        }
    }

    async updateCard(id, {title, definitions}){
        try {
            return await this.databases.updateDocument(
                conf.appwriteDatabaseId,
                conf.appwriteCollectionId,
                id,
                {
                    title,
                    definitions,
                }
            )
        } catch (error) {
            console.log("Appwrite serive: Update Card :: error", error) 
        }
    }

    async deleteCard(id){
        try {
            await this.databases.deleteDocument(
                conf.appwriteDatabaseId,
                conf.appwriteCollectionId,
                id,         //id is the is of card needs to be deleted defined during creation of card
            )
            return true;
        } catch (error) {
            console.log("Appwrite serive: Delete Card :: error", error) 
            return false
        }
    }

    async getCard(id){
        try {
            return await this.databases.getDocument(
                conf.appwriteDatabaseId,
                conf.appwriteCollectionId,
                id,
            )
        } catch (error) {
            console.log("Appwrite serive: Get Card :: error", error) 
            return false
        }
    }
        //use when login occurs and all the cards will be displayed.
    async listCard(userId){
        try {
            queries = [Query.equal("userId",)]
            return await this.databases.listDocuments(
                conf.appwriteDatabaseId,
                conf.appwriteCollectionId,
                [Query.equal("userId",userId)],
            )
        } catch (error) {
            console.log("Appwrite serive: List All Cards :: error", error) 
            return false
        }
    }
}