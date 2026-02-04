# How to Host Your Valentine Website on GitHub 🌐

Since your folder is currently part of a larger project, I recommend setting it up as its own dedicated repository so you can share a clean link like `yourname.github.io/valentine`.

## Step 1: Create a Repository on GitHub
1. Log in to [GitHub](https://github.com/).
2. Click the **+** icon in the top right and select **New repository**.
3. Name it something cute, like `valentine-surprise` or `my-valentine`.
4. Make sure it is **Public** (so pages work easily) or Private (if you have Pro).
5. **Do not** check "Initialize with README" (we already have one).
6. Click **Create repository**.

## Step 2: Push Your Code
I have prepared the code. Now you need to upload it.
Open your terminal (Command Prompt or PowerShell) in this folder:
`c:\Users\UtkrishtButtolia\Documents\MyNachiketa\Pandas\Special_app`

Run these commands one by one:

```powershell
# 1. Initialize a new git repository specifically for this app
git init

# 2. Add all the files (html, css, js, images)
git add .

# 3. Commit the changes
git commit -m "Ready for Valentine's Day! 💖"

# 4. Rename branch to main
git branch -M main

# 5. Connect to your new GitHub repository
# REPLACE 'YOUR_URL_HERE' with the link GitHub gave you (e.g., https://github.com/utkrisht128/valentine-surprise.git)
git remote add origin YOUR_URL_HERE

# 6. Push the code
git push -u origin main
```

> **Note**: If `git remote add origin` fails saying it already exists, run `git remote remove origin` and try again.

## Step 3: Turn on the Website
1. Go to your repository on GitHub.
2. Click on **Settings** (top tab).
3. Scroll down (or check the left sidebar) for **Pages**.
4. Under **Source**, select **Deploy from a branch**.
5. Select **main** branch and **/(root)** folder.
6. Click **Save**.

Wait about 1-2 minutes. GitHub will show you a link at the top of that page (e.g., `https://utkrisht128.github.io/valentine-surprise/`).

**Test the link on your phone and send it to her!** 💌
