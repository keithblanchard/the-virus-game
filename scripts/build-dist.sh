#!/bin/zsh

echo 'Making directory dist'
mkdir dist

echo 'Compile SCSS files'
npm run sass

echo 'Rollup all the JavaScript files'
npm run rollup

echo 'Compile the JavaScript'
npm run uglifyjs

echo 'Compile SVG files to png files'
zsh ./scripts/svg-to-png.sh

echo 'Copy Css'
cp ./public/index.css ./dist/index.css

echo 'Copy production index.html'
cp ./public/index-prod.html ./dist/index.html

echo 'Copy audio files'
cp -R ./public/audio ./dist/audio

echo 'Copy svg folder'
cp -R public/svg* ./dist/

echo 'Copy HTML templates'
cp -R ./public/templates ./dist/templates

echo 'Launching production version of the site locally.'
npm run start:prod