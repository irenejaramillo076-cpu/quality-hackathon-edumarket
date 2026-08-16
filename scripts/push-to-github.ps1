param(
  [string]$RepoUrl = "https://github.com/irenejaramillo076-cpu/quality-hackathon-edumarket.git"
)

git remote remove origin 2>$null
git remote add origin $RepoUrl
git push -u origin main
git push -u origin war-room-fixes
