import { useRouter } from "next/router";
import { useEffect, useRef, useState } from "react";
import { useAuth } from "../../context/AuthProvider";
import { PopupLayout } from "../../layouts/popup-layout/PopupLayout";
import { clientSideRequest, deleteClientCookie } from "../../lib";
import { Button } from "../button/Button";
import styles from "./ConnectButton.module.scss";
import { AlertType } from "../../types";
import { Alert } from "../alert/Alert";

export function ConnectButton({
    isOptionsOpen
}: {
    isOptionsOpen: boolean
}) {
    const menuRef = useRef<HTMLDivElement>(null);
    const [popupAction, setPopupAction] = useState<"DeleteAccount" | "PrivateKey">();
    const router = useRouter();
    const [username, setUsername] = useState<string>("");
    const [privateKey, setPrivateKey] = useState<string>();
    const auth = useAuth();
    const [alert, setAlert] = useState<AlertType>();

    useEffect(() => {
        if (auth?.connected) {
            setUsername(auth?.collector?.firstname + " " + auth?.collector?.lastname);
        }
    }, [auth]);

    useEffect(() => {

    }, [isOptionsOpen])

    const logout = async () => {
        try {
            await auth?.logout()
            router.replace("/inscription");
        } catch (error) {
            setAlert({alertMessage: "Quelque chose c'est mal passé. Merci d'essayer plus tard", isError: true});
        }
    }

    const deleteAccount = async (password: string) => {
        try {
            await clientSideRequest("POST", "/api/collector/delete", { current_password: password });
            deleteClientCookie();
            router.push("/connexion-xyz123");
        } catch (error: any) {
            if(error.type === "BadCredentialsException"){
                setAlert({
                    isError: true,
                    alertMessage: "Les informations d'identification soumises ne sont pas valides"
                })
            } else {
                setAlert({
                    isError: true,
                    alertMessage: "Il n'a pas été possible de supprimer votre compte, veuillez réessayer plus tard"
                })
            }
            console.log(error);
        }
    }

    const getPrivateKey = async (password: string) => {
        try {
            const { key } = await clientSideRequest("POST", "/api/collector/displayKey", { current_password: password });
            setPrivateKey(key);
        } catch (error: any) {
            if(error.type === "BadCredentialsException"){
                setAlert({
                    isError: true,
                    alertMessage: "Les informations d'identification soumises ne sont pas valides"
                })
            } else {
                setAlert({
                    isError: true,
                    alertMessage: "Il n'a pas été possible de récupérer votre clé privée, veuillez réessayer plus tard"
                })
            }
            console.log(error);
        }
    }

    return (
        <div className={styles.connect__btn}>
            {
                isOptionsOpen && username !== "" ? 
                    <div className={styles.profile__menu} ref={menuRef}>
                        <div>Mon profil</div>
                        <div onClick={() => setPopupAction("DeleteAccount")}>Supression</div>
                        <div onClick={() => setPopupAction("PrivateKey")}>Clé privée</div>
                        <hr></hr>
                        <div className={styles.disconnect} onClick={() => logout()}>Se déconnecter</div>
                    </div>
                    :
                    <Button theme="yellow" text={username !== "" ? username : "S'INSCRIRE"} onClick={() => {
                        if(username === ""){
                            router.push("/inscription")
                        }       
                    }} />
            }
            {
                popupAction &&
                <PopupLayout
                    action={popupAction}
                    onClose={() => {
                        setPrivateKey(undefined);
                        setPopupAction(undefined);
                    }}
                    onAction={(password) => {
                        switch (popupAction) {
                            case "PrivateKey":
                                getPrivateKey(password)
                                break;

                            case "DeleteAccount":
                                deleteAccount(password)
                                break;
                        }
                      }
                    }
                    privateKey={privateKey}
                />
            }
            {
                alert &&
                <Alert 
                visible={alert.alertMessage !== ""} 
                message={alert?.alertMessage}
                 isError={alert.isError}
                 onClose={() => setAlert({...alert, alertMessage: ""})}
                />
            }
          
        </div>
    )
}