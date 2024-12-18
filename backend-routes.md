# DeepQ Backend API Routes Documentation

## Authentication Routes

### POST /api/auth/register
Register a new user (public registration can be disabled in settings).
```json
Request:
{
  "email": "string",
  "password": "string",
  "name": "string",
  "company": "string"
}

Response:
{
  "id": "string",
  "email": "string",
  "name": "string",
  "role": "admin | user",
  "token": "string"
}
```

### POST /api/auth/login
Login user.
```json
Request:
{
  "email": "string",
  "password": "string"
}

Response:
{
  "token": "string",
  "user": {
    "id": "string",
    "email": "string",
    "name": "string",
    "role": "admin | user",
    "lastLogin": "datetime"
  }
}
```

### POST /api/auth/forgot-password
Request password reset.
```json
Request:
{
  "email": "string"
}

Response:
{
  "message": "Password reset email sent"
}
```

### POST /api/auth/reset-password
Reset password with token.
```json
Request:
{
  "token": "string",
  "password": "string"
}

Response:
{
  "message": "Password reset successful"
}
```

## User Management Routes (Admin Only)

### GET /api/users
Get all users.
```json
Response:
{
  "users": [
    {
      "id": "string",
      "name": "string",
      "email": "string",
      "role": "admin | user",
      "status": "active | inactive",
      "lastActive": "datetime",
      "createdAt": "datetime",
      "createdBy": {
        "id": "string",
        "name": "string",
        "email": "string"
      }
    }
  ]
}
```

### POST /api/users
Create new user with auto-generated password.
```json
Request:
{
  "name": "string",
  "email": "string",
  "role": "admin | user",
  "sendEmail": boolean  // Optional: send credentials via email
}

Response:
{
  "id": "string",
  "name": "string",
  "email": "string",
  "role": "admin | user",
  "temporaryPassword": "string",  // Generated secure password
  "requirePasswordChange": true,  // User must change password on first login
  "emailSent": boolean  // Indicates if credentials were sent via email
}
```

### PUT /api/users/{user_id}
Update user.
```json
Request:
{
  "name": "string",
  "email": "string",
  "role": "admin | user",
  "status": "active | inactive"
}

Response:
{
  "id": "string",
  "name": "string",
  "email": "string",
  "role": "admin | user",
  "status": "active | inactive",
  "lastModified": "datetime",
  "modifiedBy": {
    "id": "string",
    "name": "string"
  }
}
```

### POST /api/users/{user_id}/reset-password
Admin force reset user's password.
```json
Request:
{
  "sendEmail": boolean  // Optional: send new password via email
}

Response:
{
  "temporaryPassword": "string",
  "emailSent": boolean,
  "requirePasswordChange": true
}
```

### DELETE /api/users/{user_id}
Delete user.
```json
Response:
{
  "success": true,
  "message": "User successfully deleted"
}
```

### GET /api/users/audit-log
Get user management audit log.
```json
Response:
{
  "logs": [
    {
      "id": "string",
      "timestamp": "datetime",
      "action": "create | update | delete | password-reset",
      "performedBy": {
        "id": "string",
        "name": "string"
      },
      "targetUser": {
        "id": "string",
        "email": "string"
      },
      "changes": {
        "field": "string",
        "oldValue": "string",
        "newValue": "string"
      }
    }
  ]
}
```

[Previous routes continue unchanged...]

## Integration Routes

[Previous integration routes continue unchanged...]

## Analysis Routes

[Previous analysis routes continue unchanged...]

## Dashboard Routes

[Previous dashboard routes continue unchanged...]

## Analytics Routes

### GET /api/analytics/overview
Get analytics overview.
```json
Response:
{
  "totalScans": number,
  "detectionRate": number,
  "avgConfidence": number,
  "processingTime": number,
  "userStats": {
    "total": number,
    "active": number,
    "newThisMonth": number
  },
  "detectionBreakdown": [
    {
      "category": "string",
      "count": number,
      "percentage": number
    }
  ],
  "modelPerformance": [
    {
      "model": "string",
      "accuracy": number,
      "speed": number,
      "load": number
    }
  ]
}
```

[Previous analytics routes continue unchanged...]

## Notification Routes

### GET /api/notifications/admin
Get admin-specific notifications (admin only).
```json
Response:
{
  "notifications": [
    {
      "id": "string",
      "title": "string",
      "message": "string",
      "type": "info | success | warning | error",
      "timestamp": "datetime",
      "read": boolean,
      "category": "user_management | system | security",
      "data": {
        // Category-specific data
      }
    }
  ]
}
```

[Previous notification routes continue unchanged...]

## Settings Routes

### GET /api/settings/admin
Get admin settings (admin only).
```json
Response:
{
  "userManagement": {
    "allowPublicRegistration": boolean,
    "requireEmailVerification": boolean,
    "passwordPolicy": {
      "minLength": number,
      "requireSpecialChars": boolean,
      "requireNumbers": boolean,
      "requireUppercase": boolean
    },
    "defaultUserRole": "user",
    "autoSendCredentials": boolean
  },
  "security": {
    "maxLoginAttempts": number,
    "sessionTimeout": number,
    "ipWhitelist": string[]
  }
}
```

### PUT /api/settings/admin
Update admin settings (admin only).
```json
Request:
{
  "userManagement": {
    "allowPublicRegistration": boolean,
    "requireEmailVerification": boolean,
    "passwordPolicy": {
      "minLength": number,
      "requireSpecialChars": boolean,
      "requireNumbers": boolean,
      "requireUppercase": boolean
    },
    "defaultUserRole": "user",
    "autoSendCredentials": boolean
  },
  "security": {
    "maxLoginAttempts": number,
    "sessionTimeout": number,
    "ipWhitelist": string[]
  }
}

Response:
{
  "success": true,
  "message": "Settings updated successfully"
}
```

[Previous settings routes continue unchanged...]

## Security Notes

1. All routes except `/api/auth/login` and `/api/auth/register` require JWT authentication
2. Token format: `Authorization: Bearer <token>`
3. Admin-only routes require user role verification
4. Rate limiting is applied to all routes
5. File upload size limit: 10MB
6. WebSocket connections require authentication token
7. Password generation follows security best practices:
   - Minimum 12 characters
   - Mix of uppercase, lowercase, numbers, and special characters
   - Not based on user information
   - Temporary passwords expire after first use

## Integration with Demo Results

[Previous integration notes continue unchanged...]
