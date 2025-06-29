"use client"

import React from 'react';
import { Provider } from 'react-redux';
import store from '../store';
import { HeroUIProvider } from '@heroui/react';

const ReduxProvider = ({ children }: { children: React.ReactNode }) => {
    return (
        <Provider store={store}>
            <HeroUIProvider>
                {children}
            </HeroUIProvider>
        </Provider>
    );
};

export default ReduxProvider;