// server/middleware/errorMiddleware.js
const errorHandler = (err, req, res, next) => {
    // If Mongoose sends a 'CastError' (bad ID format)
    if (err.name === 'CastError') {
        return res.status(404).json({ message: 'Resource not found' });
    }

    const statusCode = res.statusCode === 200 ? 500 : res.statusCode;
    res.status(statusCode).json({
        message: err.message,
        stack: process.env.NODE_ENV === 'production' ? null : err.stack,
    });
};

export default errorHandler;