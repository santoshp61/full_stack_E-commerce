import jwt from 'jsonwebtoken';

const authUser = async (req, res, next) => {
    const { token } = req.headers;
    if (!token) {
        return res.json({ success: false, message: 'Not Authorized. Login Again' });
    }
    try {
        const token_decode = jwt.verify(token, process.env.JWT_SECRET);
        // This line is CRITICAL for getUserProfile to work:
        req.body.userId = token_decode.id;
        next();
    } catch (error) {
        res.json({ success: false, message: error.message });
    }
}
export default authUser;