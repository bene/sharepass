import QRCode from "qrcode";

import { createFillInRequest } from "./client";

import "./styles/main.css";

const state: State = {
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
    let left = viewportOffset.left;

    if (e.offsetWidth > 200) {
        left += (e.offsetWidth - 200) / 2;
    }

    // Create popup element
    const popup = document.createElement("div");
    popup.classList.add("sharepass--popup");
    popup.style.top = `${Math.floor(top)}px`;
    popup.style.left = `${Math.floor(left)}px`;
    popup.style.width = `${Math.max(120, Math.min(200, Math.floor(e.offsetWidth)))}px`;

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

async function createPopupChildren(popup: HTMLDivElement) {
    const token = await createFillInRequest(window.location.host);

    // Add button for every credentials
    const qrCode = document.createElement("div");
    qrCode.classList.add("sharepass--reset");
    const dataUrl = await QRCode.toDataURL(`sharepass://fill/${token}`, {
        width: 500,
        margin: 0,
        color: {
            dark: "#1f2937",
            light: "#f9fafb",
        },
    });
    qrCode.innerHTML = `<div class="sharepass--qrcode"><img src="${dataUrl}"></div>`;
    popup.appendChild(qrCode);

    // Add button to open vault
    const btn = document.createElement("div");
    btn.classList.add("sharepass--footer");
    btn.innerHTML = `<span>SharePass</span>`;

    const timeEl = document.createElement("span");
    timeEl.classList.add("sharepass--time");
    timeEl.innerText = "5:00";

    btn.appendChild(timeEl);

    popup.appendChild(btn);

    // const credentials = await waitForConfirmation(token);
    // fillIn(credentials);
}

async function onLoad() {
    findLoginForm();

    if (!state.form.usernameInput && !state.form.passwordInput) {
        return;
    }

    const elements = [state.form.usernameInput, state.form.passwordInput];

    for (const el of elements) {
        if (el) {
            // Suppress chrome password suggestion
            el.autocomplete = "off";

            // Add focus event listener
            el.addEventListener("focus", e => onFocus(e.target as any));
            el.addEventListener("blur", clearCurrentPopup);
        }
    }
}

onLoad();
