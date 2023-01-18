import Head from "next/head";
import { Button, Center } from "@chakra-ui/react";
import {account, client} from "../lib/auth";
import {useRouter} from "next/router";
import {useEffect, useState} from "react";

export default function Home() {

    const loginWithOkta = async () => {
        try {
            await account.createOAuth2Session(
                "discord",
                "http://localhost:3000/user"
            );
        } catch (error) {
            throw error;
        }
    };
    const [loggedInUser, setLoggedInUser] = useState(null);
    const router = useRouter();

    const getLoggedInUser = async () => {
        const data = (await client) && account.get();
        data
            .then((res) => setLoggedInUser(res))
            .catch((err) => {
                router.push("/");
                console.log(err);
            });
    };

    useEffect(() => {
        getLoggedInUser();
    }, []);


    return (
        <Center>
            <Button onClick={loginWithOkta}>Login with Okta</Button>
        </Center>
    );
}
