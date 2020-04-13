# This file copies all files in svg/viruses/ to /public/svg-to-png/viruses/
mkdir ./public/svg-to-png
mkdir ./public/svg-to-png/viruses
for file in ./svg/viruses/*.svg
    do
        fileName="${file#./svg/viruses/}"
        destination="./public/svg-to-png/viruses/"
        newFileName="${destination}${fileName%.svg}"

        inkscape "$file" --export-png="${newFileName}"-320w.png -w50 -h50
        inkscape "$file" --export-png="${newFileName}"-400w.png -w100 -h100
        inkscape "$file" --export-png="${newFileName}"-500w.png -w150 -h150
        inkscape "$file" --export-png="${newFileName}"-600w.png -w200 -h200
        inkscape "$file" --export-png="${newFileName}"-700w.png -w250 -h250
        inkscape "$file" --export-png="${newFileName}"-800w.png -w350 -h350
        inkscape "$file" --export-png="${newFileName}"-900w.png -w400 -h400

    done