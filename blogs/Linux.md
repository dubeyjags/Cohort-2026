# Linux commands 
hostinger linux machine
vps > get new vps > india ? plainos> ubuntu > basic


# 🐧 Linux Command Line Handbook (Developer Notes)
`Terminals`

Well-organized Linux commands with short descriptions for daily use, development, and servers.

---

## 📁 1. Navigation & File System

| Command | Description |
|--------|-------------|
| `ls` | List files and folders |
| `ls -l` | Long list (permissions, owner, size) |
| `ls -a` | Show hidden files |
| `pwd` | Show current directory |
| `cd folder` | Enter folder |
| `cd ..` | Go back one level |
| `cd ~` | Go to home directory |

---

## 📂 2. Create Files & Folders

| Command | Description |
|--------|-------------|
| `mkdir test` | Create folder |
| `mkdir -p a/b/c` | Create nested folders |
| `mkdir -p website/static/{css,js}` | Create multiple folders |
| `touch index.js` | Create empty file |

---

## 📄 3. View & Edit Files

| Command | Description |
|--------|-------------|
| `cat file.txt` | Show file content |
| `less file.txt` | View file page by page |
| `head -n 5 file.txt` | Show first 5 lines |
| `tail -n 5 file.txt` | Show last 5 lines |
| `tail -f app.log` | Live log monitoring |
| `nano file.txt` | Simple editor |
| `vim file.txt` | Advanced editor |

---

## 🗑️ 4. Copy, Move & Delete

| Command | Description |
|--------|-------------|
| `cp a.txt b.txt` | Copy file |
| `cp -r folder backup/` | Copy folder |
| `mv a.txt b.txt` | Rename file |
| `mv file.txt /path/` | Move file |
| `rm file.txt` | Delete file |
| `rm -r folder` | Delete folder |
| `rm -rf folder` | Force delete ⚠️ |

---

## 🔍 5. Searching & Finding

| Command | Description |
|--------|-------------|
| `grep "error" app.log` | Search text in file |
| `grep -R "api" .` | Search in folders |
| `find . -name "notes.txt"` | Find file |
| `find /var -size +10M` | Find large files |

---

## 📜 6. Help & System Info

| Command | Description |
|--------|-------------|
| `man ls` | Open manual |
| `ls --help` | Quick help |
| `echo $SHELL` | Show active shell |
| `whoami` | Show current user |
| `uname -a` | System info |
| `history` | Command history |
| `clear` | Clear terminal |

---

## 🔐 7. Permissions & Ownership

| Command | Description |
|--------|-------------|
| `ls -l` | View permissions |
| `chmod +x file.sh` | Make executable |
| `chmod 755 file.sh` | Set permissions |
| `chown user:user file.txt` | Change owner |

---

## ⚙️ 8. Process & Performance

| Command | Description |
|--------|-------------|
| `ps aux` | Show all processes |
| `top` | Live system monitor |
| `htop` | Advanced monitor |
| `kill PID` | Stop process |
| `kill -9 PID` | Force stop |
| `uptime` | System running time |
| `free -h` | RAM usage |
| `df -h` | Disk usage |
| `du -sh folder` | Folder size |

---

## 🌐 9. Network, API & Ports

| Command | Description |
|--------|-------------|
| `curl url` | Call API |
| `curl -I url` | Show headers |
| `curl -o file url` | Save response |
| `wget url` | Download file |
| `ip a` | Show IP address |
| `ping google.com` | Check internet |
| `ss -tuln` | Show open ports |
| `ss -tuln | grep :3000` | Check port |
| `lsof -i :3000` | Process on port |

---

## 📦 10. Package Management (Ubuntu/Debian)

| Command | Description |
|--------|-------------|
| `sudo apt update` | Refresh packages |
| `sudo apt upgrade` | Update system |
| `sudo apt install git unzip curl` | Install software |
| `sudo apt remove nginx` | Remove software |

---

## 🗜️ 11. Zip, Unzip & Archives

| Command | Description |
|--------|-------------|
| `zip -r site.zip site/` | Zip folder |
| `unzip site.zip` | Extract zip |
| `tar -xvf file.tar` | Extract tar |
| `tar -czvf file.tar.gz dir/` | Create tar.gz |

---

## 🧰 12. Development & Server

| Command | Description |
|--------|-------------|
| `node -v` | Check Node version |
| `npm install` | Install packages |
| `npm run dev` | Run project |
| `pm2 start app.js` | Start app |
| `pm2 list` | Show processes |
| `pm2 logs` | View logs |
| `git clone url` | Clone repo |
| `git pull` | Update code |

---

## 🔌 13. Disk & Power

| Command | Description |
|--------|-------------|
| `lsblk` | Show disks |
| `mount` | Mount drive |
| `umount` | Unmount drive |
| `reboot` | Restart system |
| `shutdown now` | Shutdown system |

---

## 🧹 14. Terminal Shortcuts

| Shortcut | Description |
|---------|-------------|
| `Ctrl + C` | Stop process |
| `Ctrl + L` | Clear screen |
| `Ctrl + A` | Start of line |
| `Ctrl + E` | End of line |
| `!!` | Run last command |

---

## 🚀 15. Recommended to Learn Next

- `awk`, `sed` → log & text processing  
- `crontab` → task automation  
- `rsync` → backups & deploy  
- `tmux` → terminal workspace  
- `nginx` → reverse proxy  
- `docker` → containers  

---

## ✅ Pro Tip

`kill $(lsof -t -i:3000)` \\ Kill whatever is running on port 3000.




## `one domain and one hosting machine` 
