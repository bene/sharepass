async function createFillInRequest(url: string): Promise<string> {
    // const res = await fetch(`https://fill.sharepass.com`, {
    //     method: "POST",
    //     headers: {
    //         "Content-Type": "application/json",
    //     },
    //     body: JSON.stringify({
    //         url,
    //     }),
    // });

    // if (!res.ok) {
    //     throw new Error("");
    // }

    // const { token } = await res.json();
    // return token;

    console.log(url);

    return "TOKEN";
}

async function waitForConfirmation(token: string): Promise<LoginCredentials> {
    // const res = await fetch(`https://fill.sharepass.com/${token}`);
    // const data: LoginCredentials = await res.json();

    // return data;

    await sleep(3000);
    return {
        username: "me@bene.dev",
        password: "password",
    };
}

function sleep(ms: number) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

export { createFillInRequest, waitForConfirmation };
