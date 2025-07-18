# Simple Test Node Server (TypeScript)

A super basic Node.js server with Express.js and two test API routes, built with TypeScript for enhanced type safety and development experience.

## Getting Started

### Installation

```bash
npm install
```

### Development Scripts

#### Development Mode (with hot reload)

```bash
npm run dev
```

This starts the server in development mode with automatic restart on file changes using `ts-node-dev`.

#### Production Build

```bash
npm run build:prod
```

This cleans the previous build and creates a fresh production build.

#### Type Checking

```bash
npm run type-check
```

This runs TypeScript compiler in check mode without generating files.

#### Build and Serve

```bash
npm run serve
```

This builds the project and then starts the server from the compiled JavaScript.

#### Other Commands

```bash
npm run build     # Build TypeScript to JavaScript
npm run clean     # Remove dist folder
npm start         # Start from compiled JavaScript (requires build first)
```

## Project Structure

```
simple-test-node-server/
├── src/
│   ├── index.ts      # Main server file (TypeScript)
│   └── types.ts      # Type definitions
├── dist/             # Compiled JavaScript (generated)
├── package.json      # Dependencies and scripts
├── tsconfig.json     # TypeScript configuration
└── README.md
```

## TypeScript Features

- **Type Safety**: Full TypeScript support with strict type checking
- **Interface Definitions**: Proper typing for API requests and responses
- **Error Handling**: Enhanced error handling with typed responses
- **Development Experience**: Hot reload and immediate type checking during development

The server will start on `http://localhost:3000` by default.

## API Routes

### 1. Welcome Route

- **URL**: `GET /`
- **Description**: Returns a welcome message with timestamp
- **Response Type**: `WelcomeResponse`
- **Response**:

```json
{
  "message": "Welcome to the Simple Test Node Server!",
  "timestamp": "2024-01-01T12:00:00.000Z"
}
```

### 2. Get Users

- **URL**: `GET /api/users`
- **Description**: Returns a list of test users
- **Response Type**: `UsersResponse`
- **Response**:

```json
{
  "success": true,
  "data": [
    {
      "id": 1,
      "name": "John Doe",
      "email": "john@example.com"
    },
    {
      "id": 2,
      "name": "Jane Smith",
      "email": "jane@example.com"
    },
    {
      "id": 3,
      "name": "Bob Johnson",
      "email": "bob@example.com"
    }
  ],
  "count": 3
}
```

### 3. Send Message

- **URL**: `POST /api/message`
- **Description**: Accepts a message and returns confirmation
- **Request Type**: `MessageRequest`
- **Response Type**: `MessageResponse`
- **Request Body**:

```json
{
  "message": "Hello, World!",
  "sender": "Optional sender name"
}
```

- **Response**:

```json
{
  "success": true,
  "data": {
    "id": 123,
    "message": "Hello, World!",
    "sender": "Optional sender name",
    "timestamp": "2024-01-01T12:00:00.000Z",
    "status": "received"
  }
}
```

## Type Definitions

The project includes comprehensive TypeScript interfaces in `src/types.ts`:

- `User`: User object structure
- `ApiResponse<T>`: Generic API response wrapper
- `WelcomeResponse`: Welcome endpoint response
- `MessageRequest`: POST message request body
- `MessageData`: Message data structure
- `UsersResponse`: Users endpoint response
- `MessageResponse`: Message endpoint response

## Testing the API

You can test the API routes using curl commands:

```bash
# Test welcome route
curl http://localhost:3000/

# Test users route
curl http://localhost:3000/api/users

# Test message route
curl -X POST http://localhost:3000/api/message \
  -H "Content-Type: application/json" \
  -d '{"message": "Hello from curl!", "sender": "Test User"}'
```

## Production Deployment

For production deployment:

1. **Build the project**:

   ```bash
   npm run build:prod
   ```

2. **Start the production server**:

   ```bash
   npm start
   ```

3. **Set environment variables**:

   ```bash
   PORT=8000 npm start
   ```

The compiled JavaScript files will be in the `dist/` folder, and the server will run from the compiled code for optimal performance.

## TypeScript Configuration

The project is configured with strict TypeScript settings for maximum type safety:

- Strict null checks
- No implicit any
- Strict function types
- Source maps for debugging
- Declaration files generation
