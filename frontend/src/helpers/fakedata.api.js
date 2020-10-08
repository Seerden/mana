export const randomNumber = (...args) => {
    let scale = args ? args[0] : 1
    return Math.floor((scale+1)*Math.random())
}

export const randomUtfString = () => {
    const length = Math.floor(50*Math.random());
    let str = '';

    for (let i = 0; i < length; i++) {
        str += String.fromCharCode(50+Math.floor(70*Math.random()))
    }

    return str
}