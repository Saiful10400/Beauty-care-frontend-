"use client"

import React from 'react';
import { Provider } from 'react-redux';
import store from '../store';
import { HeroUIProvider } from '@heroui/react';
import { PrimeReactProvider } from 'primereact/api';

const ReduxProvider = ({ children }: { children: React.ReactNode }) => {
    return (
        <Provider store={store}>
            <PrimeReactProvider>
                <HeroUIProvider>
                    {children}
                </HeroUIProvider>
            </PrimeReactProvider>
        </Provider>
    );
};

export default ReduxProvider;