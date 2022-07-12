// @ts-nocheck

export async function queryAllUsers() {
    return await UserModel.find();
}
