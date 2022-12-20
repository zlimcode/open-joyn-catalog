let params = [

    { name: "divider1", label: "Tischplatte", description: "Divider" },


    { name: "width", label: "Breite Tischplatte", value: 2000, min: 1300, max: 3000, step: 10, unit: "mm" },
    { name: "depth", label: "Tiefe Tischplatte", value: 800, min: 500, max: 1000, step: 10, unit: "mm" },
    { name: "panelThick", label: "Plattendicke", value: 25, min: 9, max: 35, step: 1, unit: "mm" },

    { name: "divider2", label: "Konstruktion", description: "Divider" },
    { name: "barSize", label: "Latten Maße", value: 34, min: 30, max: 70, step: 0.5, unit: "mm", description: "Hier bitte die Länge der Latte aus dem Baumarkt eintragen." },
    { name: "height", label: "Tischhöhe", value: 810, min: 600, max: 900, step: 10, unit: "mm" },
    { name: "BracingHeight", label: "Höhe Verstrebung", value: 120, min: 30, max: 140, step: 10, unit: "mm" },
    { name: "panelXOvershot", label: "Platten Überstand X", value: 68, min: 0, max: 100, step: 1, unit: "mm", hidden: false },
    { name: "panelYOvershot", label: "Platten Überstand Y", value: 100, min: 0, max: 150, step: 1, unit: "mm", hidden: false },



    { name: "dividerhidden", label: "hidden Stuff", description: "Divider", hidden: true },
    { name: "secondBreacing", label: "secondBreacing", value: true, hidden: true },
    { name: "middleBottomBreacing", label: "middleBottomBreacing", value: true, hidden: true },

    { name: "panel", label: "show Panel", value: true, hidden: true },

    { name: "debug", label: "Debug", value: false, hidden: true },
    { name: "joinAll", label: "Join All", value: true, hidden: true },
];

let steps = [
    { groupName: "firstLeg", prefix: "A", label: "Erstes Bein", description: "Es geht los mit dem ersten Tischbein, das aus vier gleichlangen Latten besteht. Die Beine werden mit zwei Querlatte verbunden. Eine Fußlatte kreuzt die Querlatten." },

    { groupName: "legs", prefix: "B", label: "Beine & Querlatten", description: "Nun das zweite Tischbein. Falls deine Tischkonstruktion Überlänge hat, gibt es sogar ein drittes Bein in der Mitte. Die Beine werden, wie im ersten Schritt mit den zwei Querlatten verbunden. Die Fußlatten kreuzen die Querlatten." },

    { groupName: "breacing", prefix: "C", label: "Verstrebung", description: "Die  Beine werden nun mit einer weiteren Querlatte am oberen Ende verbunden. Dazu kommen anschließend die kleineren Armlatten, welche die Querlatten kreuzen." },

    { groupName: "Topbreacing", prefix: "D", label: "Plattenauflagen", description: "Nun werden die drei Querlatten montiert, sie dienen später als Auflage für die Tischplatte." },
    { groupName: "sheet", prefix: "E", label: "Tischplatte", description: "Tischplatte auflegen, diese verschrauben oder verleimen - fertig!" },

];

let meta = {
    name: "Esstisch ChopChop",
    description: "ChopChop ist ein variabler Esstisch mit vertikaler Konstruktion für Sushi, Sashimi, Ramen, Miso Suppe, Gyoza, Yakitori, Tempura und Okonomiyaki...",
    author: "studio milz",
    difficulty: 3,

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
    f.move(300, 0, 0);
    quadLeg();
    f.pop();

    // right leg
    f.group("legs");
    f.push();
    f.move(-300, p.depth / 2, 0);
    f.move(p.width - p.panelXOvershot, 0, 0);
    quadLeg();
    f.pop();

    // breacing
    f.group("firstLeg");
    f.push();
    f.move(p.panelXOvershot, p.depth / 2, 0);
    f.moveGrid(-2.5, 0, 1.5);
    f.move(300, 0, 0);
    f.barX({ position: [0, 0, 0], length: widthFrame - 600 + (5 * b) });
    f.pop();

    // second breacing
    if (p.secondBreacing == true) {
        f.group("firstLeg");
        f.push();
        f.move(p.panelXOvershot, p.depth / 2, 0);
        f.moveGrid(-2.5, 0, 3.5);
        f.move(300, 0, 0);
        f.barX({ position: [0, 0, 0], length: widthFrame - 600 + (5 * b) });
        f.pop();
    }

    let val = depthFrame;
    if (depthFrame < 600) {
        val = 600;
    }

    //left bottom
    f.group("firstLeg");
    f.push();
    f.move(p.panelXOvershot, p.depth / 2 - val / 2, 0);
    f.moveGrid(0, 0, 0.5);
    f.move(300, 0, 0);
    f.barY({ position: [0, 0, 0], length: val });
    f.pop();

    //right bottom
    f.group("legs");
    f.push();
    f.move(p.width - (p.panelXOvershot), p.depth / 2 - val / 2, 0);
    f.moveGrid(0, 0, 0.5);
    f.move(-300, 0, 0);
    f.barY({ position: [0, 0, 0], length: val });
    f.pop();

    f.group("breacing");
    // breacing top

    f.push();
    f.move(p.panelXOvershot, p.depth / 2, heightFrame);
    f.moveGrid(-2.5, 0, -3.5);
    f.move(300, 0, 0);
    f.barX({ position: [0, 0, 0], length: widthFrame - 600 + (5 * b) });
    f.pop();

    //left top 
    f.push();
    f.move(p.panelXOvershot, p.panelYOvershot, heightFrame);
    f.moveGrid(0, 0, -1.5);
    f.move(300, 0, 0);
    f.barY({ position: [0, 0, 0], length: depthFrame });
    f.pop();

    //right top 
    f.push();
    f.move(p.width - (p.panelXOvershot), p.panelYOvershot, heightFrame);
    f.moveGrid(0, 0, -1.5);
    f.move(-300, 0, 0);
    f.barY({ position: [0, 0, 0], length: depthFrame });
    f.pop();

    //top side breacing  // sheet slats
    f.group("Topbreacing");

    //middle
    f.push();
    f.move(p.panelXOvershot, p.depth / 2, heightFrame);
    f.moveGrid(0, 0, -0.5);
    f.move(0, 0, 0);
    f.barX({ position: [0, 0, 0], length: widthFrame });
    f.pop();

    //front
    f.push();
    f.move(p.panelXOvershot, p.panelYOvershot, heightFrame);
    f.moveGrid(0, 0.5, -0.5);
    //f.move(p.panelYOvershot,0,0);
    f.barX({ position: [0, 0, 0], length: widthFrame });
    f.pop();

    //back
    f.push();
    f.move(p.panelXOvershot, p.depth - (p.panelYOvershot), heightFrame);
    f.moveGrid(0, -0.5, -0.5);
    //f.move(p.panelYOvershot,0,0);
    f.barX({ position: [0, 0, 0], length: widthFrame });
    f.pop();

    // third leg
    if (p.width >= 2500) {

        // middle leg
        f.group("legs");
        f.push();
        f.move(0, p.depth / 2, 0);
        f.move(p.width / 2, 0, 0);
        quadLeg();
        f.pop();

        f.group("breacing");
        f.push();
        f.move(p.width / 2, p.panelYOvershot, heightFrame);
        f.moveGrid(0, 0, -1.5);
        f.barY({ position: [0, 0, 0], length: depthFrame });
        f.pop();

        f.group("legs");
        if (p.middleBottomBreacing == true) {
            f.push();
            f.move(p.width / 2, p.depth / 2 - val / 2, 0);
            f.moveGrid(0, 0, 0.5);
            f.barY({ position: [0, 0, 0], length: val });
            f.pop();

        }

    }

    //panel
    f.group("sheet");

    if (p.panel == true) {
        f.push();
        f.move(p.width / 2, p.depth / 2, p.height - p.panelThick);
        f.panel({ position: [0, 0, 0], size: [p.width + p.panelXOvershot, p.depth + p.panelYOvershot], thickness: p.panelThick });
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