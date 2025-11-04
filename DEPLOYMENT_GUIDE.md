# Deployment Guide for Darshana Granite & Stone Carving

This guide will help you deploy the application to your VPS with Plesk.

## Overview

- **Frontend**: darshanagalketayam.lk (Next.js)
- **Backend**: api.darshanagalketayam.lk (Strapi)
- **Database**: MySQL (via phpMyAdmin in Plesk)

---

## Step 1: Database Setup

### 1.1 Import Database via phpMyAdmin

1. Log into Plesk
2. Go to **Databases** → **phpMyAdmin**
3. Create a new database named `darshana_gk`
4. Create a database user with full privileges
5. Import the `darshana_gk_database.sql` file (located in project root)

### 1.2 Note Database Credentials

Save these for later:
- Database Name: `darshana_gk`
- Database Username: (from Plesk)
- Database Password: (from Plesk)
- Database Host: `localhost` or `127.0.0.1`

---

## Step 2: VPS Server Setup

### 2.1 Install Node.js via Plesk

1. Go to Plesk → **Tools & Settings** → **Updates**
2. Install Node.js (version 20.x LTS recommended)

Or via SSH:
```bash
curl -fsSL https://deb.nodesource.com/setup_20.x | sudo -E bash -
sudo apt-get install -y nodejs
```

### 2.2 Install PM2 (Process Manager)

```bash
sudo npm install -g pm2
```

### 2.3 Setup Git on VPS

```bash
# Configure Git
git config --global user.email "tekiyagaming@gmail.com"
git config --global user.name "iamteki"

# Generate SSH key for VPS (if not exists)
ssh-keygen -t ed25519 -C "vps-server@darshanagalketayam.lk"

# Display public key
cat ~/.ssh/id_ed25519.pub

# Add this public key to GitHub:
# Go to: https://github.com/Creatx-Software/darshana-gk/settings/keys
# Click "Add deploy key"
# Paste the key and enable "Allow write access"
```

---

## Step 3: Clone Repository on VPS

### 3.1 Backend Setup (api.darshanagalketayam.lk)

```bash
# Navigate to domain directory (adjust path for Plesk)
cd /var/www/vhosts/api.darshanagalketayam.lk

# Clone repository
git clone git@github.com:Creatx-Software/darshana-gk.git .

# Navigate to backend
cd darshana-backend

# Copy production env file
cp .env.production.example .env

# Edit .env file with your database credentials
nano .env
```

**Update `.env` with:**
```env
HOST=0.0.0.0
PORT=1337
APP_KEYS="GENERATE_RANDOM_KEYS_HERE"
API_TOKEN_SALT=GENERATE_RANDOM_STRING
ADMIN_JWT_SECRET=GENERATE_RANDOM_STRING
TRANSFER_TOKEN_SALT=GENERATE_RANDOM_STRING
JWT_SECRET=GENERATE_RANDOM_STRING
ENCRYPTION_KEY=GENERATE_RANDOM_STRING

DATABASE_CLIENT=mysql
DATABASE_HOST=localhost
DATABASE_PORT=3306
DATABASE_NAME=darshana_gk
DATABASE_USERNAME=your_db_username
DATABASE_PASSWORD=your_db_password
DATABASE_SSL=false

URL=https://api.darshanagalketayam.lk
ADMIN_PATH=/admin
NODE_ENV=production
```

**Generate random keys:**
```bash
# Run this to generate random strings for keys
node -e "console.log(require('crypto').randomBytes(32).toString('base64'))"
```

**Install and start:**
```bash
# Install dependencies
npm ci --production

# Build admin panel
npm run build

# Start with PM2
pm2 start npm --name "darshana-backend" -- run start
pm2 save
pm2 startup
```

### 3.2 Frontend Setup (darshanagalketayam.lk)

```bash
# Navigate to domain directory
cd /var/www/vhosts/darshanagalketayam.lk

# Clone repository (if different directory) or navigate
cd darshana-nextjs

# Create .env.production.local file
nano .env.production.local
```

**Add to `.env.production.local`:**
```env
NEXT_PUBLIC_API_URL=https://api.darshanagalketayam.lk
NEXT_PUBLIC_SITE_URL=https://darshanagalketayam.lk
NODE_ENV=production
```

**Install and start:**
```bash
# Install dependencies
npm ci --production

# Build Next.js
npm run build

# Start with PM2
pm2 start npm --name "darshana-frontend" -- run start
pm2 save
```

---

## Step 4: Plesk Configuration

### 4.1 Backend Domain (api.darshanagalketayam.lk)

1. Go to Plesk → **Domains** → **api.darshanagalketayam.lk**
2. **Apache & nginx Settings**:
   - Enable "Proxy mode"
   - Additional nginx directives:

```nginx
location / {
    proxy_pass http://localhost:1337;
    proxy_http_version 1.1;
    proxy_set_header Upgrade $http_upgrade;
    proxy_set_header Connection 'upgrade';
    proxy_set_header Host $host;
    proxy_cache_bypass $http_upgrade;
    proxy_set_header X-Real-IP $remote_addr;
    proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
    proxy_set_header X-Forwarded-Proto $scheme;
}
```

3. **SSL/TLS Certificate**: Enable Let's Encrypt SSL

### 4.2 Frontend Domain (darshanagalketayam.lk)

1. Go to Plesk → **Domains** → **darshanagalketayam.lk**
2. **Apache & nginx Settings**:
   - Enable "Proxy mode"
   - Additional nginx directives:

```nginx
location / {
    proxy_pass http://localhost:3000;
    proxy_http_version 1.1;
    proxy_set_header Upgrade $http_upgrade;
    proxy_set_header Connection 'upgrade';
    proxy_set_header Host $host;
    proxy_cache_bypass $http_upgrade;
    proxy_set_header X-Real-IP $remote_addr;
    proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
    proxy_set_header X-Forwarded-Proto $scheme;
}
```

3. **SSL/TLS Certificate**: Enable Let's Encrypt SSL

---

## Step 5: GitHub Actions Setup

### 5.1 Add GitHub Secrets

Go to: https://github.com/Creatx-Software/darshana-gk/settings/secrets/actions

Add these secrets:

| Secret Name | Value |
|------------|-------|
| `VPS_HOST` | Your VPS IP address or hostname |
| `VPS_USERNAME` | Your VPS SSH username (usually root or your user) |
| `VPS_SSH_KEY` | Your VPS private SSH key (from ~/.ssh/id_rsa or id_ed25519) |
| `VPS_PORT` | SSH port (usually 22) |

**To get your VPS SSH key:**
```bash
cat ~/.ssh/id_ed25519
# Copy the entire output including BEGIN and END lines
```

### 5.2 Test Deployment

The workflows will automatically deploy when you push changes to master branch.

To manually trigger:
1. Go to: https://github.com/Creatx-Software/darshana-gk/actions
2. Select the workflow (Deploy Backend or Deploy Frontend)
3. Click "Run workflow"

---

## Step 6: Strapi Initial Setup

1. Visit: https://api.darshanagalketayam.lk/admin
2. Create your admin account (first time only)
3. Configure API permissions:
   - Go to **Settings** → **Roles** → **Public**
   - Enable `find` and `findOne` for all content types
4. Upload media files to **Media Library**

---

## Step 7: Verify Deployment

### Backend Health Check
```bash
curl https://api.darshanagalketayam.lk/api/services
```

### Frontend Health Check
Visit: https://darshanagalketayam.lk

---

## Step 8: Monitoring

### View PM2 Processes
```bash
pm2 list
pm2 logs darshana-backend
pm2 logs darshana-frontend
```

### Restart Services
```bash
pm2 restart darshana-backend
pm2 restart darshana-frontend
```

### Stop Services
```bash
pm2 stop darshana-backend
pm2 stop darshana-frontend
```

---

## Troubleshooting

### Database Connection Issues
- Verify database credentials in `.env`
- Check if MySQL is running: `sudo systemctl status mysql`
- Test connection: `mysql -u username -p darshana_gk`

### Port Already in Use
```bash
# Find process using port
sudo lsof -i :1337  # Backend
sudo lsof -i :3000  # Frontend

# Kill process
sudo kill -9 <PID>
```

### PM2 Not Starting
```bash
# Remove old processes
pm2 delete all

# Start fresh
pm2 start npm --name "darshana-backend" -i 1 -- run start
pm2 start npm --name "darshana-frontend" -i 1 -- run start
pm2 save
```

### SSL Certificate Issues
- Ensure domain DNS points to VPS IP
- Wait for DNS propagation (up to 24 hours)
- Renew Let's Encrypt in Plesk

---

## Maintenance

### Backup Database
```bash
mysqldump -u username -p darshana_gk > backup_$(date +%Y%m%d).sql
```

### Update Application
```bash
cd /var/www/vhosts/api.darshanagalketayam.lk
git pull origin master
cd darshana-backend
npm ci --production
npm run build
pm2 restart darshana-backend
```

---

## Support

For issues, check:
- GitHub Actions logs: https://github.com/Creatx-Software/darshana-gk/actions
- PM2 logs: `pm2 logs`
- Nginx logs: `/var/log/nginx/error.log`
