let params = [

    { name: "barSize", label: "Latten Maße", value: 25, min: 20, max: 35, step: 0.5, unit: "mm", description: "Hier bitte die Länge der Latte aus dem Baumarkt eintragen." },

    { name: "divider1", label: "Tischplatte", description: "Divider" },
    { name: "width", label: "Breite Tischplatte", value: 680, min: 400, max: 1000, step: 10, unit: "mm" },
    { name: "depth", label: "Tiefe Tischplatte", value: 400, min: 400, max: 500, step: 10, unit: "mm" },
    { name: "panelThick", label: "Plattendicke", value: 25, min: 9, max: 35, step: 1, unit: "mm" },

    { name: "divider2", label: "Tischgestell", description: "Divider" },
    { name: "height", label: "Tischhöhe", value: 300, min: 200, max: 500, step: 10, unit: "mm" },
    { name: "panelXOvershot", label: "Platten Überstand X", value: 10, min: 0, max: 100, step: 1, unit: "mm", hidden: false },
    { name: "panelYOvershot", label: "Platten Überstand Y", value: 50, min: 0, max: 150, step: 1, unit: "mm", hidden: false },


    { name: "dividrHidden", label: "hidden stuff", description: "Divider", hidden: true },


    { name: "legPosition", label: "legPosition", value: 100, min: 70, max: 100, step: 1, unit: "mm", hidden: true },

    //{ name: "BracingHeight", label: "Höhe der Verstrebung", value:100, min: 30, max: 140, step: 10, unit: "mm", hidden: true },
    { name: "secondBreacing", label: "secondBreacing", value: true, hidden: true },

    { name: "panel", label: "Tischplatte anzeigen", value: true, hidden: true },
    { name: "debug", label: "Debug", value: false, hidden: true },
    { name: "joinAll", label: "Join All", value: true, hidden: true },
];

let steps = [
    { groupName: "firstLeg", prefix: "A", label: "Erstes Bein", description: "Es geht los mit dem ersten Tischbein, das aus vier gleichlangen Latten besteht. Die Beine werden mit einer oder zwei Querlatte(n) verbunden. Eine Fußlatte kreuzt die Querlatte(n)." },

    { groupName: "legs", prefix: "B", label: "Beine & Querlatten", description: "Nun das zweite Tischbein. Falls deine Tischkonstruktion Überlänge hat, gibt es sogar ein drittes Bein in der Mitte. Die Beine werden, wie im ersten Schritt mit den zwei Querlatten verbunden. Die Fußlatten kreuzen die Querlatten." },

    { groupName: "breacing", prefix: "C", label: "Verstrebung", description: "Die  Beine werden nun mit einer weiteren Querlatte am oberen Ende verbunden." },

    { groupName: "topBreacing", prefix: "D", label: "Plattenauflagen", description: "Nun die kleineren Armlatten, welche die Querlatte kreuzen, sie dienen später als Auflage für die Tischplatte." },
    { groupName: "sheet", prefix: "E", label: "Tischplatte", description: "Tischplatte auflegen, diese verschrauben oder verleimen - fertig!" },

];

let meta = {
    name: "Couchtisch Little Japan",
    description: "Japan ist ein variabler Couchtisch mit vertikaler Konstruktion für die Couch und Sushi, Sashimi, Ramen, Miso Suppe, Gyoza, Yakitori, Tempura und Okonomiyaki...",
    author: "studio milz",
    difficulty: 2,

    parameters: params,
    steps: steps
};

/* Build your geometry here. **f** is your factory, **p** are your parameters */
let build = (f, p, preview) => {
    let b = p.barSize;
    f.setGrid(b, b, b);
    f.defaultsBar({ size: [p.barSize, p.barSize], debug: p.debug });

    //variables

    let widthFrame = p.width - 2 * p.panelXOvershot;
    let depthFrame = p.depth - 2 * p.panelYOvershot;
    let heightFrame = p.height - p.panelThick;

    // construction

    // left leg
    f.group("firstLeg");
    f.push();
    f.move(p.panelXOvershot, p.depth / 2, 0);
    f.move(p.legPosition, 0, 0);
    quadLeg();
    f.pop();

    // right leg
    f.group("legs");
    f.push();
    f.move(-p.legPosition, p.depth / 2, 0);
    f.move(p.width - p.panelXOvershot, 0, 0);
    quadLeg();
    f.pop();

    // breacing
    f.group("firstLeg");
    f.push();
    f.move(p.panelXOvershot, p.depth / 2, 0);
    f.moveGrid(-2.5, 0, 1.5);
    f.move(p.legPosition, 0, 0);
    f.barX({ position: [0, 0, 0], length: widthFrame - (2 * p.legPosition) + (5 * b) });
    f.pop();

    // second breacing
    if (p.secondBreacing == true && ((p.height > 400 && p.barSize < 30) || (p.width > 800 && p.height > 350 && p.barSize < 26))) {
        f.group("firstLeg");
        f.push();
        f.move(p.panelXOvershot, p.depth / 2, 0);
        f.moveGrid(-2.5, 0, 3.5);
        f.move(p.legPosition, 0, 0);
        f.barX({ position: [0, 0, 0], length: widthFrame - (2 * p.legPosition) + (5 * b) });
        f.pop();
    }

    let val = depthFrame;
    if (depthFrame < 2 * p.legPosition) {
        val = 300;
    }

    //left bottom
    f.group("firstLeg");
    f.push();
    f.move(p.panelXOvershot, p.depth / 2 - val / 2, 0);
    f.moveGrid(0, 0, 0.5);
    f.move(p.legPosition, 0, 0);
    f.barY({ position: [0, 0, 0], length: val });
    f.pop();

    //right bottom
    f.group("legs");
    f.push();
    f.move(p.width - (p.panelXOvershot), p.depth / 2 - val / 2, 0);
    f.moveGrid(0, 0, 0.5);
    f.move(-p.legPosition, 0, 0);
    f.barY({ position: [0, 0, 0], length: val });
    f.pop();

    f.group("topBreacing");

    //left top 
    f.push();
    f.move(p.panelXOvershot, p.panelYOvershot, heightFrame);
    f.moveGrid(0, 0, -0.5);
    f.move(p.legPosition, 0, 0);
    f.barY({ position: [0, 0, 0], length: depthFrame });
    f.pop();

    //right top 
    f.push();
    f.move(p.width - (p.panelXOvershot), p.panelYOvershot, heightFrame);
    f.moveGrid(0, 0, -0.5);
    f.move(-p.legPosition, 0, 0);
    f.barY({ position: [0, 0, 0], length: depthFrame });
    f.pop();

    //top side breacing  // sheet slats
    f.group("breacing");

    //middle
    f.push();
    f.move(p.panelXOvershot, p.depth / 2, heightFrame);
    f.moveGrid(-2.5, 0, -1.5);
    f.move(p.legPosition, 0, 0);
    f.barX({ position: [0, 0, 0], length: widthFrame - (2 * p.legPosition) + (5 * b) });
    f.pop();

    //panel
    f.group("sheet");

    if (p.panel == true) {
        f.push();
        f.move(p.width / 2, p.depth / 2, p.height - p.panelThick);
        f.panel({ position: [0, 0, 0], size: [p.width, p.depth], thickness: p.panelThick });
        f.pop();
    }

    // Quadleg function
    function quadLeg() {
        f.push();
        f.moveGrid(-1, -1, 0);
        f.barZ({ position: [0, 0, 0], length: heightFrame });

        f.moveGrid(0, 2, 0);
        f.barZ({ position: [0, 0, 0], length: heightFrame });

        f.moveGrid(2, 0, 0);
        f.barZ({ position: [0, 0, 0], length: heightFrame });

        f.moveGrid(0, -2, 0);
        f.barZ({ position: [0, 0, 0], length: heightFrame });

        f.pop();
    }

    if (!preview && p.joinAll == true) {
        f.joinAll();
    }

};

/* Return the meta information and build function */
return [meta, build];