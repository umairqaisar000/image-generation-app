#!/bin/bash

# Deploy Firebase Database Rules
echo "Deploying Firebase Database Rules..."
firebase deploy --only database

# Deploy Firebase Storage Rules
echo "Deploying Firebase Storage Rules..."
firebase deploy --only storage

echo "All rules deployed successfully!" 