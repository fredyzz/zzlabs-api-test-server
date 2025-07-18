"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const app = (0, express_1.default)();
const PORT = parseInt(process.env.PORT || '3000', 10);
// Middleware to parse JSON requests
app.use(express_1.default.json());
// Basic route
app.get('/', (req, res) => {
    const response = {
        message: 'Welcome to the Simple Test Node Server!',
        timestamp: new Date().toISOString()
    };
    res.json(response);
});
// Test API Route 1: GET /api/users
app.get('/api/users', (req, res) => {
    const users = [
        { id: 1, name: 'John Doe', email: 'john@example.com' },
        { id: 2, name: 'Jane Smith', email: 'jane@example.com' },
        { id: 3, name: 'Bob Johnson', email: 'bob@example.com' }
    ];
    const response = {
        success: true,
        data: users,
        count: users.length
    };
    res.json(response);
});
// Test API Route 2: POST /api/message
app.post('/api/message', (req, res) => {
    const { message, sender } = req.body;
    if (!message) {
        const errorResponse = {
            success: false,
            error: 'Message is required'
        };
        res.status(400).json(errorResponse);
        return;
    }
    const messageData = {
        id: Math.floor(Math.random() * 1000),
        message: message,
        sender: sender || 'Anonymous',
        timestamp: new Date().toISOString(),
        status: 'received'
    };
    const response = {
        success: true,
        data: messageData
    };
    res.json(response);
});
// 404 handler
app.use('*', (req, res) => {
    const errorResponse = {
        success: false,
        error: 'Route not found'
    };
    res.status(404).json(errorResponse);
});
// Error handler middleware
app.use((err, req, res, next) => {
    console.error('[server/error]', err);
    const errorResponse = {
        success: false,
        error: 'Internal server error'
    };
    res.status(500).json(errorResponse);
});
// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
    console.log('Available routes:');
    console.log('  GET  / - Welcome message');
    console.log('  GET  /api/users - Get list of users');
    console.log('  POST /api/message - Send a message');
});
//# sourceMappingURL=index.js.map