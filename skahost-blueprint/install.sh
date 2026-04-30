#!/bin/bash
# SKA HOST Blueprint Extension Installer
# GitHub: sdgamer8263-sketch/Royal

set -e

echo "======================================"
echo " SKA HOST Pterodactyl Extension Setup"
echo "======================================"

# Determine Pterodactyl Panel directory (defaults to /var/www/pterodactyl)
PANEL_DIR="/var/www/pterodactyl"

if [ ! -d "$PANEL_DIR" ]; then
    echo "Error: Pterodactyl Panel not found at $PANEL_DIR"
    exit 1
fi

cd "$PANEL_DIR"

echo "[1/4] Downloading SKA HOST Extension from GitHub..."
# Downloads the packaged .blueprint file or unzips the raw files from your repository
curl -L -o skahost.blueprint "https://raw.githubusercontent.com/sdgamer8263-sketch/Royal/main/skahost.blueprint"

echo "[2/4] Verifying Blueprint Framework installation..."
if [ ! -f "blueprint.sh" ]; then
    echo "Error: Blueprint Framework is not installed. Please install Blueprint first."
    exit 1
fi

echo "[3/4] Installing SKA HOST via Blueprint CLI..."
blueprint -install skahost

echo "[4/4] Building production assets (This may take a few minutes)..."
yarn build:production

echo "======================================"
echo " Installation Complete! Restarting queue workers."
echo "======================================"
php artisan queue:restart
chown -R www-data:www-data *
