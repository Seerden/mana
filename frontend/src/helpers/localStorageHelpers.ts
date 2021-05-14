export const storeUser = (username: string | null, action: 'set' | 'get' | 'remove') => {
    if (username) {
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

    return
}