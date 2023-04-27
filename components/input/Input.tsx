import styles from "./Input.module.scss";
import { useEffect, useState } from "react";

export function Input({
    placeholder,
    value,
    type,
    onChange,
    iconUrl = "",
    onIconClick,
    tooltip,
    tooltipId
}: {
    placeholder: string
    value: string,
    type: string
    onChange: (e: React.FormEvent<HTMLInputElement>) => void,
    iconUrl?: string,
    onIconClick?: () => void,
    tooltip?: React.ReactNode,
    tooltipId?: string
}) {

    useEffect(() => {

    }, [value, type, iconUrl])

    return (
        <div className={styles.input}>
            {tooltip}
            {iconUrl !== "" ?
                <div className={styles.with__icon}>
                    <i
                        className={styles.input__icon}
                        style={{
                            backgroundImage: `url(${iconUrl})`
                        }}
                        onClick={onIconClick}
                    >
                        {tooltip && 
                        <a data-tooltip-id={tooltipId} className={styles.tooltip}>
                            THIS IS HIDDEN
                        </a>}
                    </i>
                    <input
                        value={value}
                        type={type}
                        placeholder={placeholder}
                        onChange={onChange}
                    />
                </div>
                :
                <input
                    value={value}
                    type={type}
                    placeholder={placeholder}
                    onChange={onChange}
                />
            }
        </div>
    )
}