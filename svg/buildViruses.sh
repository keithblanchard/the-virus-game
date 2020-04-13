# This file copies all files in svg/viruses/ to /public/svg-to-png/viruses/
mkdir ./public/svg-to-png
rm -fr ./public/svg-to-png/viruses
mkdir ./public/svg-to-png/viruses
for file in ./svg/viruses/*.svg
    do
        fileName="${file#./svg/viruses/}"
        destination="./public/svg-to-png/viruses/"
        newFileName="${destination}${fileName%.svg}"

        inkscape "$file" --export-png="${newFileName}"-300w.png -w50 -h50
        inkscape "$file" --export-png="${newFileName}"-400w.png -w100 -h100
        inkscape "$file" --export-png="${newFileName}"-500w.png -w150 -h150

    done