import jwt from 'jsonwebtoken'

const adminAuth = async (req, res, next) => {
  try {
    const { token } = req.headers
    if (!token) {
      return res.json({ success: false, message: "Not Authorized Login Again" })
    }

    // This decodes the token using your secret
    const token_decode = jwt.verify(token, process.env.JWT_SECRET);

    // This MUST match the exact string from userController (email + password)
    if (token_decode !== process.env.ADMIN_EMAIL + process.env.ADMIN_PASSWORD) {
      return res.json({ success: false, message: "Invalid Credentials" })
    }

    next() // If it matches, allow the product to be added
  } catch (error) {
    console.log(error)
    res.json({ success: false, message: error.message })
  }
}

export default adminAuth