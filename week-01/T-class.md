# 🌱 Git Command Line Handbook (Developer Notes)

Well-organized Git commands with short descriptions for daily development and team workflows.

---

## 📦 1. Git Setup & Configuration

| Command | Description |
|--------|-------------|
| `git --version` | Check installed Git version |
| `git config --global user.name "Your Name"` | Set global username |
| `git config --global user.email "you@email.com"` | Set global email |
| `git config --list` | View Git configuration |
| `git help` | Git help |
| `git help clone` | Help for specific command |

---

## 📁 2. Create & Clone Repositories

| Command | Description |
|--------|-------------|
| `git init` | Initialize a new repository |
| `git clone url` | Clone remote repository |
| `git clone url foldername` | Clone into specific folder |

---

## 📄 3. File Status & Tracking

| Command | Description |
|--------|-------------|
| `git status` | Show repo status |
| `git add file.txt` | Stage file |
| `git add .` | Stage all changes |
| `git restore file.txt` | Discard changes |
| `git restore --staged file.txt` | Unstage file |

---

## 💾 4. Commit & History

| Command | Description |
|--------|-------------|
| `git commit -m "message"` | Commit staged changes |
| `git commit -am "message"` | Add & commit tracked files |
| `git log` | Full commit history |
| `git log --oneline` | Short log |
| `git show commit_id` | Show commit details |

---

## 🌿 5. Branching

| Command | Description |
|--------|-------------|
| `git branch` | List branches |
| `git branch new-branch` | Create branch |
| `git checkout new-branch` | Switch branch |
| `git checkout -b new-branch` | Create & switch |
| `git branch -d branch-name` | Delete branch |
| `git switch branch-name` | Switch branch (modern) |

---

## 🔀 6. Merging & Rebasing

| Command | Description |
|--------|-------------|
| `git merge branch-name` | Merge branch |
| `git rebase branch-name` | Rebase branch |
| `git merge --abort` | Cancel merge |
| `git rebase --abort` | Cancel rebase |

---

## 🌍 7. Remote Repositories

| Command | Description |
|--------|-------------|
| `git remote -v` | Show remotes |
| `git remote add origin url` | Add remote |
| `git fetch` | Download changes |
| `git pull` | Fetch + merge |
| `git push origin main` | Push to remote |
| `git push -u origin main` | Set upstream |

---

## 🧹 8. Undo & Fix Mistakes

| Command | Description |
|--------|-------------|
| `git checkout -- file.txt` | Discard file changes |
| `git revert commit_id` | Undo commit safely |
| `git reset --soft HEAD~1` | Undo commit, keep changes |
| `git reset --hard HEAD~1` | Delete commit & changes ⚠️ |
| `git clean -fd` | Remove untracked files |

---

## 🏷️ 9. Tags & Releases

| Command | Description |
|--------|-------------|
| `git tag` | List tags |
| `git tag v1.0.0` | Create tag |
| `git push origin v1.0.0` | Push tag |
| `git tag -d v1.0.0` | Delete local tag |

---

## 🔍 10. Inspect & Compare

| Command | Description |
|--------|-------------|
| `git diff` | Show unstaged changes |
| `git diff --staged` | Show staged changes |
| `git blame file.txt` | Who changed what |
| `git reflog` | Full action history |

---

## ⚡ 11. Stash (Temporary Save)

| Command | Description |
|--------|-------------|
| `git stash` | Save changes temporarily |
| `git stash list` | Show stashes |
| `git stash pop` | Restore last stash |
| `git stash drop` | Delete stash |

---

## 🧰 12. Team & Workflow

| Command | Description |
|--------|-------------|
| `git pull origin main` | Update branch |
| `git push origin feature-x` | Push feature |
| `git fetch upstream` | Sync fork |
| `git cherry-pick commit_id` | Pick commit |

---

## 🚀 13. Common Developer Workflows

### First-time project
```bash
git init
git add .
git commit -m "initial commit"
git branch -M main
git remote add origin URL
git push -u origin main
