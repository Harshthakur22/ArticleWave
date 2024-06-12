import {Client,Account,ID} from "appwrite";
import conf from "../conf/conf";



export class AuthService{

    client=new Client();
    account;
    // 
    constructor(){
        this.client
        .setEndpoint(conf.appwriteUrl)
        .setProject(conf.appwriteProjectid);
        this.account=new Account(this.client);
    }
    // put values into account
    async createAccount({email,password,name}){
        try {
            const userAccount=await this.account.create(
                ID.unique(),email,password,name);
                
            
                if(userAccount){
                    // calls another method
                    // account found h toh login and signup
                    return this.login({email,password});
                }
                else {
                    return userAccount;
                }
        }
        catch(error){
            throw error;
        }
 
    }
    async login({email,password}){
        try{
           return await this.account.createEmailPasswordSession(email,password);

        }
        catch(error){
           throw error;
        }
    }
    async getCurrentUser(){
        try {
            return await this.account.get()
        } catch (error) {
            console.log("Appwrite serive :: getCurrentUser :: error", error);
        }

        return null;
    }
    
    async logout(){

        try {
           return await this.account.deleteSession('current');
        } catch (error) {
            console.log("Appwrite serive:: logout :: error",error);
        }
        return null;
    }
   
}
// after formation of new objects 
// client and account is being formed 
const authService=new AuthService()



export default authService;


