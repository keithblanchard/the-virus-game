rm -fr ../dist
cp ./CHAME ../dist/CHAME
cp ./index.html ./dist/index.html
cd ../dist
git init
git remote add origin git@github.com:keithblanchard/the-virus-game.git
git add .
git commit -m 'Adding update.'
git push -u origin/master
