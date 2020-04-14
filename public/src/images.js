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

        image.srcset = `../svg-to-png/viruses/${virusSprite}-80w.png 80w,
                         ../svg-to-png/viruses/${virusSprite}-100w.png 100w,
                         ../svg-to-png/viruses/${virusSprite}-150w.png 150w`;
        image.sizes = `(max-width: 400px) 80px,
                       (max-width: 800px) 100px,
                       (max-width: 1600px) 150px`;

        image.id=`virus${virusIndex}`;
        viruses.appendChild(image);
        virusIndex++;

    });
}

export default {
    loadVirusImages
}