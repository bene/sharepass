const api = "http://localhost:3000";

async function fillInPassword(requestId: string, encryptedPassword: string) {
    // const res = await fetch(`${api}/fill/${requestId}`, {
    //     method: "POST",
    //     headers: {
    //         "Content-Type": "application/json",
    //     },
    //     body: JSON.stringify({ encryptedPassword }),
    // });

    // return res.ok;
    console.log(encryptedPassword);
}

export { fillInPassword };
