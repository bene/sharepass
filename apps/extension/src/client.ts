async function getCredentials(): Promise<LoginCredentials[]> {
    // Check if password is stored for current site
    return [
        {
            username: "bene",
            password: "password",
        },
        {
            username: "bob",
            password: "strong-password",
        },
    ];
}

export { getCredentials };
