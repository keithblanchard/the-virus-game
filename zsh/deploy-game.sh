#!/bin/zsh
mkdir ~/src/the-virus-game-deploy
cd ~/src/the-virus-game-deploy
rm -fr .git

mkdir dist


function copyFiles () {
cp ~/src/austin-voice-coach/src/under-construction/index.html .
cp ~/src/austin-voice-coach/src/CNAME .
}

function addFiles () {
  git add index.html
}


git init
git remote add origin git@github.com:keithblanchard/the-virus-game-deploy.git


git commit -m 'Deploying The Virus Game'
git push -f -u origin master