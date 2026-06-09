# Deployment Notes

## Key Concepts

### VPS (Virtual Private Server)
A virtual machine rented from a cloud provider that runs your server 24/7. You get root access and full control.

> Providers: AWS EC2, DigitalOcean (DO), Hostinger, Hetzner, Corsair, etc.

---

### DevOps
**DevOps = Developer Operations**
The practice of automating the steps between writing code and running it in production.

---

### CI/CD Pipeline
**CI = Continuous Integration** — automatically test/build code on every push
**CD = Continuous Deployment** — automatically deploy to the server after a successful build

> CI/CD is a set of scripts that run automatically when you push code to GitHub.

**What you need:**
- Something to deploy (your app)
- A real server machine (AWS / DigitalOcean / Hostinger...)
- A CI/CD tool (GitHub Actions, GitLab CI, etc.)

---

## PM2 — Process Manager

Keeps your Node.js server running in the background on the VPS. Restarts it if it crashes.

```bash
pm2 start server.js        # start your app
pm2 restart 0              # restart by process id
pm2 list                   # list all running processes
pm2 logs                   # view logs
pm2 save                   # save process list to survive reboot
pm2 startup                # auto-start pm2 on server reboot
```

---

## GitHub Actions — CI/CD Workflow

File location: `.github/workflows/deploy.yml`

### Basic SSH Deploy Workflow

```yaml
name: Deploy Node.js App         # name shown in GitHub Actions tab

on:
  push:
    branches:
      - main                     # trigger: runs whenever you push to main

jobs:
  deploy:
    runs-on: ubuntu-latest       # GitHub spins up a fresh Ubuntu VM

    steps:
      - name: Checkout Code
        uses: actions/checkout@v4  # pulls your repo code into the runner

      - name: Deploy via SSH
        uses: appleboy/ssh-action@v1.0.3   # popular action to SSH into your server
        with:
          host: ${{ secrets.SERVER_IP }}   # your VPS IP (stored as a GitHub secret)
          username: ubuntu                 # SSH user on the server
          key: ${{ secrets.SSH_PRIVATE_KEY }} # private key (stored as a GitHub secret)
          script: |
            cd /var/www/my-app    # navigate to your app folder on the server
            git pull              # pull latest code from GitHub
            npm install           # install any new dependencies
            pm2 restart 0         # restart the running Node.js process
```

### How GitHub Secrets Work
Store sensitive values (IP, SSH key) in:
`GitHub Repo → Settings → Secrets and variables → Actions`

They are referenced in the YAML as `${{ secrets.SECRET_NAME }}`.

---

## Dockerfile — Containerized Deployment

Instead of running Node.js directly, you can package your app into a Docker container.

```dockerfile
FROM node:20-alpine            # base image with Node.js

WORKDIR /app                   # set working directory inside the container

COPY package*.json ./          # copy dependency files first (for layer caching)
RUN npm install                # install dependencies

COPY . .                       # copy the rest of your source code

EXPOSE 3000                    # document which port the app listens on

CMD ["node", "server.js"]      # command to start the app
```

---

## Caddy — Reverse Proxy & HTTPS

Caddy sits in front of your Node.js app, handles HTTPS automatically (free SSL via Let's Encrypt), and forwards traffic to your app.

### Caddyfile (basic config)

```
yourdomain.com {
    reverse_proxy localhost:3000   # forward requests to your Node.js app
}
```

Caddy auto-renews SSL certificates. No manual `certbot` needed.

---

## Full Deployment Stack (Summary)

```
Internet
   │
   ▼
Caddy (port 80/443, HTTPS, reverse proxy)
   │
   ▼
Node.js app via PM2 (port 3000, always running)
   │
   ▼
Database (MongoDB / PostgreSQL on same or separate server)
```

| Tool           | Role                                      |
|----------------|-------------------------------------------|
| GitHub Actions | Automates deploy on every push to `main`  |
| SSH Action     | Connects to VPS and runs deploy commands  |
| PM2            | Keeps Node.js process alive on the server |
| Docker         | Packages app + dependencies into a container |
| Caddy          | HTTPS, reverse proxy, domain routing      |
