export const storeUser = (username: string, action: 'set' | 'get' | 'remove') => {
    switch (action) {
        case 'set':
            localStorage.setItem("username", username);
            break;
        case 'get':
            return localStorage.getItem('username');
        case 'remove':
            localStorage.removeItem("username");
            break;
        default:
            return;
    }
}