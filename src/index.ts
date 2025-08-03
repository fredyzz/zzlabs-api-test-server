import express, { Express, Request, Response, NextFunction } from "express";
import {
  User,
  ApiResponse,
  WelcomeResponse,
  MessageRequest,
  MessageData,
  UsersResponse,
  MessageResponse,
} from "./types";

const app: Express = express();
const PORT: number = parseInt(process.env.PORT || "3000", 10);

// Middleware to parse JSON requests
app.use(express.json());

// Basic route
app.get("/", (req: Request, res: Response<WelcomeResponse>) => {
  const response: WelcomeResponse = {
    message:
      "Welcome to the Simple Test Node Server! Now with GitHub Actions PRO MEGA EDITION!",
    timestamp: new Date().toISOString(),
  };

  res.json(response);
});

// Test API Route 1: GET /api/users
app.get("/api/users", (req: Request, res: Response<UsersResponse>) => {
  const users: User[] = [
    { id: 1, name: "John Doe", email: "john@example.com" },
    { id: 2, name: "Jane Smith", email: "jane@example.com" },
    { id: 3, name: "Bob Johnson", email: "bob@example.com" },
  ];

  const response: UsersResponse = {
    success: true,
    data: users,
    count: users.length,
  };

  res.json(response);
});

// Test API Route 2: POST /api/message
app.post(
  "/api/message",
  (
    req: Request<{}, MessageResponse, MessageRequest>,
    res: Response<MessageResponse>
  ): void => {
    const { message, sender }: MessageRequest = req.body;

    if (!message) {
      const errorResponse: ApiResponse = {
        success: false,
        error: "Message is required",
      };
      res.status(400).json(errorResponse);
      return;
    }

    const messageData: MessageData = {
      id: Math.floor(Math.random() * 1000),
      message: message,
      sender: sender || "Anonymous",
      timestamp: new Date().toISOString(),
      status: "received",
    };

    const response: MessageResponse = {
      success: true,
      data: messageData,
    };

    res.json(response);
  }
);

// 404 handler
app.use("*", (req: Request, res: Response<ApiResponse>) => {
  const errorResponse: ApiResponse = {
    success: false,
    error: "Route not found",
  };
  res.status(404).json(errorResponse);
});

// Error handler middleware
app.use(
  (
    err: Error,
    req: Request,
    res: Response<ApiResponse>,
    next: NextFunction
  ) => {
    console.error("[server/error]", err);

    const errorResponse: ApiResponse = {
      success: false,
      error: "Internal server error",
    };

    res.status(500).json(errorResponse);
  }
);

// Check if we have environment variables set
if (!process.env.TEST_ENV) {
  console.warn("[server/warning] TEST_ENV environment variable is not set");
} else {
  console.log(
    `[server/info] Environment variable TEST_ENV is set to: ${process.env.TEST_ENV}`
  );
}

// Start the server
app.listen(PORT, "0.0.0.0", () => {
  console.log(`Server is running on http://localhost:${PORT}`);
  console.log("Available routes:");
  console.log("  GET  / - Welcome message");
  console.log("  GET  /api/users - Get list of users");
  console.log("  POST /api/message - Send a message");
});
