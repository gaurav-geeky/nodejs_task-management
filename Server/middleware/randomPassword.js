
const myPassword = () => {
    let Password = "";
    let str = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*()";
    let strLen = str.length;

    for (let i = 0; i <= 7; i++) {
        let myNum = Math.floor(Math.random() * strLen);
        Password += str.charAt(myNum);
    }
    return Password;
}

module.exports = {
    myPassword
}