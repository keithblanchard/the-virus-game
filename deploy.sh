rm -fr dist
mkidr dist
npm run build
cd dist
git init
git remote add origin git@github.com:keithblanchard/the-virus-game.git
git add .
git commit -m 'Adding update.'
git push -u origin/master
