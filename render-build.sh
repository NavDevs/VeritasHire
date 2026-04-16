#!/bin/bash

# Install Python dependencies
pip install -r requirements.txt

# Install Node.js dependencies
npm install

# Build the Next.js app
npm run build
