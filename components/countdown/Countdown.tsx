import { useEffect, useState } from "react";
import styles from "./Countdown.module.scss";

type TimeLeft = {
    days: string,
    hours: string,
    minutes: string,
    seconds: string
}

export function Countdown({
    date
}: {
    date: string
}) {

    const [remainingTime, setRemainingTime] = useState<TimeLeft>();

    useEffect(() => {
        setInterval(() => {
            timeUntilDate(date);
        }, 1000)
    }, [])

    function timeUntilDate(dateString: string) {
        const targetDate = new Date(dateString);
        const now = new Date();

        const timeLeftMs = targetDate.getTime() - now.getTime();
        if (timeLeftMs < 0) {
            return { days: 0, hours: 0, minutes: 0, seconds: 0 };
        }

        const daysLeft = addLeadingZero(Math.floor(timeLeftMs / (1000 * 60 * 60 * 24)));
        const hoursLeft = addLeadingZero(Math.floor((timeLeftMs / (1000 * 60 * 60)) % 24));
        const minutesLeft = addLeadingZero(Math.floor((timeLeftMs / (1000 * 60)) % 60));
        const secondsLeft = addLeadingZero(Math.floor((timeLeftMs / 1000) % 60));

        setRemainingTime({ days: daysLeft, hours: hoursLeft, minutes: minutesLeft, seconds: secondsLeft }
        );

    }

    function addLeadingZero(value: number) {
        return String(value).padStart(2, "0");
    }

    function translate(label: keyof TimeLeft) {
        let newLabel = "";
        switch (label) {
            case "days":
                newLabel = "JOURS"
                break;

            case "hours":
                newLabel = "HEURES"
                break;

            case "minutes":
                newLabel = "MINUTES"
                break;

            case "seconds":
                newLabel = "SECONDES"
                break;
        }

        return newLabel
    }

    return (
        <>
            <div className={styles.countdown__wrapper}>
                {remainingTime &&
                    Object.keys(remainingTime).map((elem,index) => {
                        return (
                            <div key={`time_item${index}`}>
                                <div  className={styles.time__item}>
                                    {
                                        remainingTime[elem as keyof TimeLeft].toString().split("").map((digit, i) => {
                                            return (
                                                <div key={`time__digit${i}`} className={styles.countdown__element}>
                                                    {digit}
                                                </div>
                                            )
                                        })
                                    }
                                </div>
                                <div className={styles.time__label}>
                                    {translate(elem as keyof TimeLeft)}
                                </div>
                            </div>
                        )
                    })
                }
            </div>
        </>
    )
}