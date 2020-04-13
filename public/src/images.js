const virusSprites = [
    "theVirus_blue",
    "theVirus_ice",
    "theVirus_purple2",
    "theVirus_purpleCartoon",
    "theVirus_red2",
    "theVirus_red",
    "theVirus_yellow"
];

function loadVirusImages () {
    const viruses = document.getElementById('viruses');
    let virusIndex = 0;
    virusSprites.forEach((virusSprite) => {
        let image = document.createElement('img');
        /*
        TODO Implement srcset and sizes
        image.srcset = `../svg-to-png/viruses/${virusSprite}-300w.png 300w,
                         ../svg-to-png/viruses/${virusSprite}-400w.png 400w,
                         ../svg-to-png/viruses/${virusSprite}-500w.png 500w`;
        image.sizes = `(max-width: 10px) 300vw,
                       (max-width: 20px) 400vw,
                       (max-width: 30px) 500vw`;

         */
        image.src = `./svg-to-png/viruses/${virusSprite}-300w.png`;
        image.id=`virus${virusIndex}`;
        viruses.appendChild(image);
        virusIndex++;

    });


}

export default {
    loadVirusImages
}