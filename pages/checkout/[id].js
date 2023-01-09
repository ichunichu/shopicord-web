import Head from 'next/head'
import Image from 'next/image'
import { Inter } from '@next/font/google'
import styles from '../../styles/Home.module.css'
import {useRouter} from "next/router";
import {account, getAccount, getSession, loginWithDiscord, logout} from "../../lib/auth";
import {useEffect, useState} from "react";

const inter = Inter({ subsets: ['latin'] })

export default function Home() {
    const router = useRouter()
    const { id } = router.query
    const [user,setUser]= useState(null)
    const [session,setSession] = useState(null)

    const fetchUser = async () => {
        try {
            const data = await account.get();
            setUser(data);
            console.log(data)
            //getSession(setSession)
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        if (!user){
            fetchUser()
        }
        if (!session){
            getSession(setSession)
        }

    }, [user,session]);



    return (
        <>
            {user && user.name != ""? <>
            <Head>
                <title>Checkout {id}</title>
                <meta name="description" content="Generated by create next app" />
                <meta name="viewport" content="width=device-width, initial-scale=1" />
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <main className={styles.main}>
                <div>
                    <h3>Some informations about your account</h3>
                    <p>{user.name}</p>
                    {/*<p>{session.provider}</p>*/}
                    <button onClick={()=>{
                    logout(setSession,setUser)}
                    }>LogOut</button>
                </div>
            </main></>
                :
                <><p>LOADING</p><button onClick={()=>{
                loginWithDiscord()}
                }>login</button></>}
        </>
    )
}
