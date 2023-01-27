import { GoogleAuthRequestConfig } from "expo-auth-session/providers/google";

function useClientIds(): { data: Partial<GoogleAuthRequestConfig> } {
    return {
        data: {
            expoClientId:
                "1092210725041-5l5hbs4ru1ob56k1bumc9akv5k4kms3f.apps.googleusercontent.com",
            iosClientId:
                "1092210725041-jmr12gksj94o0an79peh308iqqt96ag3.apps.googleusercontent.com",
        },
    };
}

export { useClientIds };
