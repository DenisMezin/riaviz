"use client";

import { createContext, useContext, useState, ReactNode } from 'react';
import itMessages from '../../messages/it.json';
import enMessages from '../../messages/en.json';
import slMessages from '../../messages/sl.json';

type Messages = typeof itMessages;

type LocaleContextType = {
    locale: string;
    messages: Messages;
    setLocale: (locale: string) => void;
};

const LocaleContext = createContext<LocaleContextType | undefined>(undefined);

const messagesMap: Record<string, Messages> = {
    it: itMessages,
    en: enMessages,
    sl: slMessages,
};

export function LocaleProvider({ children }: { children: ReactNode }) {
    const [locale, setLocaleState] = useState('it');

    const setLocale = (newLocale: string) => {
        if (messagesMap[newLocale]) {
            setLocaleState(newLocale);
        }
    };

    const value = {
        locale,
        messages: messagesMap[locale],
        setLocale,
    };

    return (
        <LocaleContext.Provider value={value}>
            {children}
        </LocaleContext.Provider>
    );
}

export function useLocale() {
    const context = useContext(LocaleContext);
    if (!context) {
        throw new Error('useLocale must be used within LocaleProvider');
    }
    return context;
}
