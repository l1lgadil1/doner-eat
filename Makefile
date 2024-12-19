# Variables
SHELL := /bin/bash
CLIENT_PORT := 3000
SERVER_PORT := 3001
PID_FILE := .dev.pid

# Colors for terminal output
CYAN := \033[0;36m
GREEN := \033[0;32m
YELLOW := \033[0;33m
RED := \033[0;31m
NC := \033[0m # No Color

.PHONY: help install dev stop clean

# Default target
help:
	@echo -e "${CYAN}Available commands:${NC}"
	@echo -e "${GREEN}make install${NC} - Install dependencies for both client and server"
	@echo -e "${GREEN}make dev${NC}     - Run both client and server in development mode"
	@echo -e "${RED}make stop${NC}    - Stop development servers"
	@echo -e "${GREEN}make clean${NC}   - Remove node_modules and build artifacts"

# Install dependencies
install:
	@echo -e "${YELLOW}Installing client dependencies...${NC}"
	npm install
	@echo -e "${YELLOW}Installing server dependencies...${NC}"
	cd server && npm install

# Run development servers
dev:
	@echo -e "${CYAN}Starting development servers...${NC}"
	@echo -e "${GREEN}Client will be available at http://localhost:${CLIENT_PORT}${NC}"
	@echo -e "${GREEN}Server will be available at http://localhost:${SERVER_PORT}${NC}"
	@echo -e "${YELLOW}To stop the servers, run: make stop${NC}"
	@npx concurrently \
		"npm run dev" \
		"cd server && npm run dev"

# Stop development servers
stop:
	@echo -e "${RED}Stopping development servers...${NC}"
	@-pkill -f "next dev" || true
	@-pkill -f "cd server && npm run dev" || true
	@echo -e "${GREEN}Development servers stopped${NC}"

# Clean up
clean:
	@echo -e "${YELLOW}Cleaning up...${NC}"
	rm -rf node_modules
	rm -rf server/node_modules
	rm -rf .next
	rm -rf server/dist 