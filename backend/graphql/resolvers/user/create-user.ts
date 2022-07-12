// @ts-nocheck

export async function createUser(username, password) {
    const hashedPassword = await hash(password, 10);
    const newUser = new UserModel({
        username,
        password: hashedPassword,
    });
    console.log(`Register user mutation requested for user ${username}`);
    const existingUser = await UserModel.findOne({ username });
    if (!existingUser) {
        return { user: await newUser.save() };
    }
    return { error: "Username already exists " };
}
