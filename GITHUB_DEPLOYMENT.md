# 🚀 GitHub Deployment Guide

## Step 1: Create a Private Repository on GitHub

1. Go to [GitHub.com](https://github.com)
2. Click **New Repository** (or go to https://github.com/new)
3. **Repository name**: `rickshaw-game` (or your preferred name)
4. **Description**: "Mamu Butt's Rickshaw Chronicles - Interactive rickshaw driving game"
5. **Visibility**: Select **PRIVATE**
6. **Initialize repository**: Leave unchecked (we already have a local repo)
7. Click **Create Repository**

## Step 2: Configure Git User (First Time Only)

```bash
git config --global user.name "Your Name"
git config --global user.email "your.email@example.com"
```

## Step 3: Connect Local Repo to GitHub

After creating the repo, GitHub will show you commands. Run these in your project directory:

```bash
cd "e:\self-projects\rickshaw game\advanced"
git branch -M main
git remote add origin https://github.com/YOUR_USERNAME/rickshaw-game.git
git push -u origin main
```

**Replace `YOUR_USERNAME` with your actual GitHub username!**

## Step 4: Deploy to GitHub Pages (Optional - for free hosting)

1. Go to your repository on GitHub
2. Click **Settings**
3. Scroll down to **GitHub Pages**
4. Under "Source", select **main branch**
5. Click **Save**
6. Your game will be live at: `https://YOUR_USERNAME.github.io/rickshaw-game/`

## Step 5: Authentication

### Option A: HTTPS (Recommended for beginners)
GitHub will prompt you for credentials. Use:
- **Username**: Your GitHub username
- **Password**: A Personal Access Token (see below)

### Option B: SSH (More secure)
Set up SSH keys for password-less authentication:
```bash
ssh-keygen -t ed25519 -C "your.email@example.com"
# Follow prompts, then add the public key to GitHub Settings
```

## Getting a Personal Access Token

1. Go to GitHub Settings → **Developer Settings** → **Personal Access Tokens**
2. Click **Generate new token**
3. Name it: `rickshaw-game-repo`
4. Select scopes: `repo` (full control of private repositories)
5. Click **Generate token**
6. **SAVE IT SAFELY** - You'll need it for authentication
7. Use this token as your password when pushing

## Common Commands

### Check Status
```bash
git status
```

### Make Changes and Commit
```bash
git add .
git commit -m "Your commit message"
```

### Push to GitHub
```bash
git push origin main
```

### Pull Latest Changes
```bash
git pull origin main
```

## File Structure on GitHub

Your repo will contain:
- `index.html` - Game entry point
- `game.js` - Main engine
- `map.js` - World generation
- `missions.js` - Mission system
- `ui.js` - UI management
- `config.js` - Configuration
- `style.css` - Styling
- `README.md` - Documentation
- `.gitignore` - Git ignore rules
- Documentation files (*.md)

## After Deployment

1. **Repository URL**: `https://github.com/YOUR_USERNAME/rickshaw-game`
2. **Game URL** (if using GitHub Pages): `https://YOUR_USERNAME.github.io/rickshaw-game/`
3. **Share with others**: Send them the repository URL
4. **Clone elsewhere**: Others can run `git clone https://github.com/YOUR_USERNAME/rickshaw-game.git`

## Private Repository Settings

Since your repo is private:
- ✅ Only you can see the code
- ✅ You control who has access
- ✅ Add collaborators: Settings → **Collaborators & Teams**
- ✅ GitHub Pages won't work without enabling it in settings

## GitHub Pages Setup for Private Repo

1. In **Settings** → **Pages**
2. Under "Source", select **main** branch
3. Wait a few minutes for build
4. Your site will be at `https://YOUR_USERNAME.github.io/rickshaw-game/`
5. Even on private repos, the published site will be **publicly accessible**

## Making Your First Commit After Setup

After pushing to GitHub:

```bash
# Make changes
git add .
git commit -m "Update feature description"
git push origin main
```

## Troubleshooting

### "fatal: remote origin already exists"
```bash
git remote remove origin
git remote add origin https://github.com/YOUR_USERNAME/rickshaw-game.git
```

### "Permission denied (publickey)"
Use HTTPS instead of SSH, or set up your SSH key properly

### "Could not resolve host"
Check your internet connection

### Changes not appearing
Make sure you:
1. Added files: `git add .`
2. Committed: `git commit -m "message"`
3. Pushed: `git push origin main`

## Next Steps

1. ✅ Create repo on GitHub
2. ✅ Connect local repo: `git remote add origin ...`
3. ✅ Push code: `git push -u origin main`
4. ✅ Enable GitHub Pages (optional)
5. ✅ Share your repo link with others!

---

**Your rickshaw game is now on GitHub!** 🎉

To update the repo in the future, just:
```bash
git add .
git commit -m "Your changes"
git push origin main
```

Easy! 🛺✨
