# 📁 File Upload Storage

This directory stores uploaded files from the ResourceHub application.

## Structure:
```
uploads/
├── assets/          # Asset management files
├── profiles/        # User profile images
├── reports/         # Generated reports
└── temp/           # Temporary files
```

## Security Notes:
- Files are validated before upload
- Maximum file size: 10MB (configurable in .env)
- Allowed file types are configured in the backend
- This directory should be backed up regularly

## Development:
- In development, files are stored locally
- In production, consider using cloud storage (AWS S3, etc.)

*This folder is auto-created when the application starts.*
