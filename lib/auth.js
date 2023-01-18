import { Client, Account, ID } from "appwrite";

export const client = new Client()
    .setEndpoint('https://appwrite.senditeverywhere.com/v1') // Your API Endpoint
    .setProject('63c7faaee0d761787f80');               // Your project ID

export const account = new Account(client);
export async function loginWithDiscord(){

        await account.createOAuth2Session("discord","http://localhost:3000/success","http://localhost:3000/failed")
}
export function getAccount(setUser){

    account.get().then((r)=>{
        console.log(r)
        setUser(r)
        return r
    }).catch((e)=>{
        console.log(e)
        if (e.code = 401){
            account.createAnonymousSession().then((r)=>{
                return false
            })
            //loginWithDiscord()
        }
        //loginWithDiscord()

    })
}
export function getSession(setSession){

    account.listSessions().then((r)=>{
        console.log("session")
        console.log(r)
        setSession(r)
        return r
    }).catch((e)=>{

        if (e.code = 401){
            console.log(e)
            account.createAnonymousSession().then((r)=>{
                return false
            })
            //loginWithDiscord()
        }
    })
}

export function logout(setUser,setSession){

    account.deleteSessions().then(()=>{
        setUser(null)
        setSession(null)
        return true
    })
}