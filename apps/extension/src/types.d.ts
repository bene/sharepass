type LoginCredentials = {
    username: string;
    password: string;
};

type LoginForm = {
    usernameInput: HTMLInputElement | null;
    passwordInput: HTMLInputElement | null;
};

type State = {
    credentials: LoginCredentials[];
    currentPopup: HTMLDivElement | null;
    form: LoginForm;
};

declare module "*.svg" {
    const content: string;
    export default content;
}
