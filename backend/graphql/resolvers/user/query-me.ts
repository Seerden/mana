// @ts-nocheck

export async function queryMe(req) {
    if (req.session.userId) {
        return { user: UserModel.findById(req.session.userId) };
    }
    return { error: "No active session" };
}
