// @ts-nocheck

export async function login(username, password, { req, res }) {
    const foundUser = await UserModel.findOne({ username });
    if (foundUser) {
        const passwordMatches = await compare(password, foundUser.password);
        if (passwordMatches) {
            req.session.userId = foundUser._id;
            return { user: foundUser };
        } else {
            res.clearCookie("mana-session");
            req.session.destroy(null);
            return { error: "Invalid credentials" };
        }
    } else {
        res.clearCookie("mana-session");
        req.session.destroy(null);
        return { error: "Username does not exist" };
    }
}
