import { getCredentials } from "./client";
import IconSettings from "./assets/gear-wide-connected.svg";

import "./styles/main.css";

const state: State = {
    credentials: [],
    currentPopup: null,
    form: {
        usernameInput: null,
        passwordInput: null,
    },
};

function fillIn(credentials: LoginCredentials) {
    if (state.form.usernameInput) {
        state.form.usernameInput.value = credentials.username;
        state.form.usernameInput.dispatchEvent(new Event("change"));
    }

    if (state.form.passwordInput) {
        state.form.passwordInput.value = credentials.password;
        state.form.passwordInput.dispatchEvent(new Event("change"));
    }

    clearCurrentPopup();
}

function findFormParent(el: HTMLElement | null): HTMLFormElement | null {
    if (el == null) {
        return null;
    }

    if (el.tagName === "FORM") {
        return el as HTMLFormElement;
    }

    return findFormParent(el.parentElement);
}

function findTextInput(el: Element): HTMLInputElement | null {
    for (const child of el.children) {
        if (child.tagName === "INPUT") {
            const inputEl = child as HTMLInputElement;
            if (["text", "email"].includes(inputEl.type)) {
                return inputEl;
            }
        }

        const nestedChild = findTextInput(child);

        if (nestedChild) {
            return nestedChild;
        }
    }

    return null;
}

function findLoginForm() {
    const inputs = document.querySelectorAll("input");

    let foundUsernameInput: HTMLInputElement | null = null;
    let foundPasswordInput: HTMLInputElement | null = null;

    const usernameNames = ["email", "id", "username"];
    const passwordNames = ["password"];

    for (const el of inputs) {
        if (
            passwordNames.includes(el.name) ||
            passwordNames.includes(el.id) ||
            usernameNames.includes(el.title) ||
            el.type === "password"
        ) {
            foundPasswordInput = el;
            const form = findFormParent(el);

            if (form) {
                const userNameEl = findTextInput(form);

                if (userNameEl) {
                    foundUsernameInput = userNameEl;
                }
            }
        }

        if (
            usernameNames.includes(el.name) ||
            usernameNames.includes(el.id) ||
            usernameNames.includes(el.title)
        ) {
            console.log("Found username");
            foundUsernameInput = el;
        }
    }

    state.form = {
        usernameInput: foundUsernameInput,
        passwordInput: foundPasswordInput,
    };
}

function onFocus(e: HTMLInputElement) {
    // Clear potentially old popup
    clearCurrentPopup();

    // Get position
    const viewportOffset = e.getBoundingClientRect();
    const top = viewportOffset.top + e.offsetHeight;
    const left = viewportOffset.left + 1;

    // Create popup element
    const popup = document.createElement("div");
    popup.classList.add("sharepass--popup");
    popup.style.top = `${top}px`;
    popup.style.left = `${left}px`;
    popup.style.minWidth = `${e.offsetWidth}px`;

    createPopupChildren(popup);

    // Store to state
    state.currentPopup = popup;

    // Add element to body
    document.body.insertBefore(state.currentPopup, document.body.firstChild);
}

function clearCurrentPopup() {
    if (state.currentPopup !== null) {
        state.currentPopup.remove();
        state.currentPopup = null;
    }
}

function onBlur() {
    clearCurrentPopup();
}

function createPopupChildren(popup: HTMLDivElement) {
    const children: HTMLElement[] = [];

    // Add button for every credentials
    for (const credentials of state.credentials) {
        const btn = popup.appendChild(document.createElement("button"));
        btn.innerHTML = `<span class="username">${
            credentials.username
        }</span><br>${"·".repeat(credentials.password.length)}`;
        btn.addEventListener("click", () => fillIn(credentials));
    }

    // Add button to open vault
    const btn = document.createElement("button");
    btn.classList.add("vault");
    btn.innerHTML = `<span>Open Vault</span>`;

    // Add icon
    const icon = document.createElement("img");
    icon.src = IconSettings;
    icon.width = 10;
    icon.height = 10;
    btn.appendChild(icon);

    popup.appendChild(btn);
}

async function onLoad() {
    state.credentials = await getCredentials();
    findLoginForm();

    if (
        (!state.form.usernameInput && !state.form.passwordInput) ||
        state.credentials.length === 0
    ) {
        return;
    }

    const elements = [state.form.usernameInput, state.form.passwordInput];

    for (const el of elements) {
        if (el) {
            // Suppress chrome password suggestion
            el.autocomplete = "off";

            // Add focus event listener
            el.addEventListener("focus", e => onFocus(e.target as any));
            // el.addEventListener("blur", onBlur);
        }
    }

    // if (document.activeElement === state.form.usernameInput) {
    //     onFocus(state.form.usernameInput);
    // }

    // if (document.activeElement === state.form.passwordInput) {
    //     onFocus(state.form.passwordInput);
    // }
}

onLoad();
