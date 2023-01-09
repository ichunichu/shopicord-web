import Head from "next/head";
import { Button, Center } from "@chakra-ui/react";
import {account} from "../lib/auth";

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

    return (
        <Center>
            <Button onClick={loginWithOkta}>Login with Okta</Button>
        </Center>
    );
}
