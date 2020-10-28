import { useState, useEffect } from 'react';

export const storeUser = (username, action) => {
    switch (action) {
        case 'set':
            localStorage.setItem("username", username);
            break;
        case 'get':
            return localStorage.getItem('username');
        case 'remove':
            localStorage.removeItem("username");
            break;
    }
}