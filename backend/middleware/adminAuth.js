import jwt from 'jsonwebtoken'

const adminAuth = async (req, res, next) => {
  try {
    const { token } = req.headers
    if (!token) {
      return res.json({ success: false, message: "Not Authorized Login Again" })
    }

    // This MUST use the same JWT_SECRET from your .env
    const token_decode = jwt.verify(token, process.env.JWT_SECRET);
    console.log("DECODED FROM TOKEN:", token_decode);
    console.log("EXPECTED FROM ENV:", process.env.ADMIN_EMAIL + process.env.ADMIN_PASSWORD);

    // This check is where it fails if the strings don't match EXACTLY
    if (token_decode !== process.env.ADMIN_EMAIL + process.env.ADMIN_PASSWORD) {
      return res.json({ success: false, message: "Invalid Credentials" })
    }

    next()
  } catch (error) {
    console.log(error)
    res.json({ success: false, message: error.message })
  }
}

export default adminAuth