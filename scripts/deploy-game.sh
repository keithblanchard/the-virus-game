#!/bin/zsh
rm -fr ~/src/the-virus-game-deploy

cp -r ~/src/bubble-game/dist/ ~/src/the-virus-game-deploy
cd ~/src/the-virus-game-deploy/

cp ~/src/bubble-game/src/CNAME .

git init
git remote add origin git@github.com:keithblanchard/the-virus-game-deploy.git
git add .
git commit -m 'Deploying The Virus Game'
git push -f -u origin master