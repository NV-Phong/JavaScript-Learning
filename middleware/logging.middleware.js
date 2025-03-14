import morgan from "morgan";
import fs from "fs";
import path from "path";

// This function will return the log file name based on the current date
// Example: access-2021-07-01.log
const getLogFileName = () => {
    const date = new Date();
    const dateString = date.toISOString().split('T')[0]; // Lấy định dạng YYYY-MM-DD
    return path.join('logs', `access-${dateString}.log`);
};

// Create logs directory if it doesn't exist
const logsDir = path.join('logs');
if (!fs.existsSync(logsDir)) {
    fs.mkdirSync(logsDir);
}

// This middleware will log all requests to a file
export default function loggingMiddleware(app) {
    app.use(morgan('combined', {
        stream: fs.createWriteStream(getLogFileName(), { flags: 'a' })
    }));
}