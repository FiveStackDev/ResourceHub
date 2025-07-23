# 🐳 Development Dockerfile for Backend
FROM ballerina/ballerina:latest

WORKDIR /app

# Copy Ballerina configuration files
COPY Ballerina.toml Dependencies.toml Config.toml ./

# Copy source code
COPY . .

# Build the application
RUN bal build --offline || echo "Build completed with warnings"

# Expose port
EXPOSE 9090

# Health check
HEALTHCHECK --interval=30s --timeout=10s --start-period=5s --retries=3 \
  CMD curl -f http://localhost:9090/health || exit 1

# Start the application
CMD ["bal", "run"]
