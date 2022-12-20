let params = [

    { name: "divider1", label: "Auflage / Futon / Matratze", description: "Divider" },
    { name: "width", label: "Länge der Auflage", value: 2000, min: 1700, max: 2400, step: 10, unit: "mm", description: "Breite des Auflage" },
    { name: "depth", label: "Breite der Auflage", value: 800, min: 600, max: 1000, step: 10, unit: "mm", description: "Tiefe des Auflage" },
    { name: "FutonHight", label: "Höhe der Auflage", value: 50, min: 10, max: 100, step: 1, unit: "mm", description: "Höhe des Auflage" },
    { name: "futon", label: "Auflage anzeigen", value: false, hidden: false },

    { name: "divider2", label: "Konstruktion", description: "Divider" },
    { name: "barSize", label: "Latten Maße", value: 34, min: 30, max: 40, step: 0.5, unit: "mm", description: "Hier bitte die Maße der Latte aus dem Baumarkt eintragen." },
    { name: "height", label: "Höhe der Bank", value: 400, min: 320, max: 500, step: 10, unit: "mm", description: "Gesamthöhe der Bank" },
    { name: "overshootX", label: "Überstand", value: 200, min: 0, max: 300, step: 1, unit: "mm", description: "Überstand der Sitz-Latten", hidden: false },
    { name: "SeatingGap", label: "Lücke Sitzlatten", value: 40, min: 3, max: 240, step: 1, unit: "mm", description: "Zielabstand (nicht jeder Wert ist umsetzbar)" },


    { name: "dividerhidden", label: "hidden Stuff", description: "Divider", hidden: true },
    { name: "BracingHeight", label: "Höhe Verstrebung", value: 190, min: 150, max: 190, step: 10, unit: "mm", hidden: true },
    //{ name: "panelT", label: "Plattendicke", value: 15, min: 5, max: 40, step: 1, unit: "mm" },



    { name: "debug", label: "Debug", value: false, hidden: true },
    { name: "joinAll", label: "Join All", value: true, hidden: true },
];

let steps = [
    { groupName: "leftFrame", prefix: "A", label: "Linker Rahmen", description: "Das linke Seitenteil besteht aus vier Latten." },
    { groupName: "middleFrame", prefix: "B", label: "Mittlerer Rahmen", description: "Das mittlere Teil besteht aus vier weiteren Latten." },
    { groupName: "rightFrame", prefix: "C", label: "Rechter Rahmen", description: "Das rechte Seitenteil besteht aus vier weiteren Latten." },

    { groupName: "breacing", prefix: "D", label: "Verstrebung", description: "Die beiden Seitenteile werden mit einer Latte verbunden." },
    { groupName: "seat", prefix: "E", label: "Liegeebene", description: "Diese Latten ergeben die Liegefläche." },
    { groupName: "futon", prefix: "F", label: "Futon", description: "Jetzt nur noch deine Auflage z.B. einen Futon drauf und... ZZZzzzZZZ" },

];

let meta = {
    name: "Schlafbank Nap",
    description: "Diese Bank kann natürlich zum Sitzen verwendet werden, ihre eigentliche Funktion ist aber die Schlafpritsche für einen kleinen Mittagsschlafim Büro. Sie kann beispielsweise mit einer Tatami-Matte bestückt werden und oder mit einem Rollfuton.",
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

    // variables
    let frameWidth = p.width - (2 * p.overshootX);
    let frameDepth = p.depth - (2 * b);
    let frameHight = p.height - p.FutonHight;
    let BracingHeightNew = frameHight - p.BracingHeight;

    // construction

    //Front Legs
    f.push();

    f.moveGrid(0.5, 0.5, 0);
    f.group("leftFrame");
    f.barZ({ position: [0, 0, 0], length: frameHight });
    f.moveGrid(-0.5, 0, 0);
    f.move(frameWidth, 0, 0);
    f.moveGrid(-0.5, 0, 0);
    f.group("rightFrame");
    f.barZ({ position: [0, 0, 0], length: frameHight });
    f.pop();

    // front middle leg 
    f.push();
    f.moveGrid(0, 0.5, 0);
    f.move(frameWidth / 2, 0, 0);

    f.group("middleFrame");
    f.barZ({ position: [0, 0, 0], length: frameHight });
    f.pop();

    //Rear Legs
    f.push();

    f.move(0, frameDepth, 0);
    f.moveGrid(0.5, -0.5, 0);

    f.group("leftFrame");
    f.barZ({ position: [0, 0, 0], length: frameHight });
    f.moveGrid(-0.5, 0, 0);
    f.move(frameWidth, 0, 0);
    f.moveGrid(-0.5, 0, 0);
    f.group("rightFrame");
    f.barZ({ position: [0, 0, 0], length: frameHight });
    f.pop();

    // Rear middle leg 
    f.push();
    f.move(0, frameDepth, 0);
    f.moveGrid(0, -0.5, 0);
    f.move(frameWidth / 2, 0, 0);
    f.group("middleFrame");
    f.barZ({ position: [0, 0, 0], length: frameHight });
    f.pop();

    //leftFrame

    f.push();
    f.moveGrid(1.5, 0, 0);
    f.move(0, 0, BracingHeightNew);
    f.group("leftFrame");
    f.barY({ position: [0, 0, 0], length: frameDepth });
    f.pop();

    //rightFrame
    f.push();
    f.move(frameWidth, 0, 0);
    f.moveGrid(-1.5, 0, 0);
    f.move(0, 0, BracingHeightNew);
    f.group("rightFrame");
    f.barY({ position: [0, 0, 0], length: frameDepth });
    f.pop();

    //middleFrame
    f.push();
    f.move(frameWidth / 2, 0, 0);
    f.moveGrid(1, 0, 0);
    f.move(0, 0, BracingHeightNew);
    f.group("middleFrame");
    f.barY({ position: [0, 0, 0], length: frameDepth });
    f.pop();

    //breacing front
    f.group("breacing");
    f.push();
    f.moveGrid(0, 1.5, 1);
    f.move(0, 0, BracingHeightNew);
    f.barX({ position: [0, 0, 0], length: (frameWidth) });
    f.pop();

    //breacing back
    f.push();
    f.moveGrid(0, -1.5, 1);
    f.move(0, frameDepth, BracingHeightNew);
    f.barX({ position: [0, 0, 0], length: (frameWidth) });
    f.pop();

    //Top

    f.push();
    f.moveGrid(1.5, 0, 0);
    f.move(0, 0, frameHight - b);
    f.moveGrid(0, -1, -0.5);
    f.group("leftFrame");
    f.barY({ position: [0, 0, 0], length: p.depth });
    f.pop();

    f.push();
    f.move(frameWidth, 0, 0);
    f.moveGrid(-1.5, -1, 0);
    f.move(0, 0, frameHight - b);
    f.moveGrid(0, 0, -0.5);
    f.group("rightFrame");
    f.barY({ position: [0, 0, 0], length: p.depth });
    f.pop();

    f.push();
    f.move(frameWidth / 2, 0, 0);
    f.moveGrid(-1, -1, 0);
    f.move(0, 0, frameHight - b);
    f.moveGrid(0, 0, -0.5);
    f.group("middleFrame");
    f.barY({ position: [0, 0, 0], length: p.depth });
    f.pop();

    f.group("seat");

    if (p.SeatingGap < b) {
        p.SeatingGap = b;
    }

    f.push();
    f.move(-p.overshootX, 0, frameHight - b);
    f.moveGrid(0, -0.5, 0.5);
    //f.barX({ position: [0,0,0], length: frameWidth+(2*p.overshootX) });

    f.pop();

    f.push();

    f.move(-p.overshootX, 0, frameHight - b);
    f.moveGrid(0, -0.5, 0.5);

    let barCount = Math.round((p.depth - (3 * b)) / (b + p.SeatingGap));
    let spacing = (p.depth - 1 * b) / (barCount);

    for (let i = 0; i <= barCount; i++) {
        f.barX({ position: [0, 0, 0], length: frameWidth + (2 * p.overshootX) });
        f.move(0, spacing, 0);
    }
    f.pop();

    f.push();
    f.move(-p.overshootX, 0, frameHight - (b / 2));
    f.move(0, p.depth - b - (b / 2), 0);
    //f.barX({ position: [0,0,0], length: frameWidth+(2*p.overshootX) });

    f.pop();

    //panel
    f.group("futon");

    if (p.futon == true) {
        f.push();
        f.move(-p.overshootX, 0, frameHight);
        f.move(p.width / 2, p.depth / 2, 0);
        f.moveGrid(0, -1, 0);

        f.panel({ position: [0, 0, 0], size: [p.width, p.depth], thickness: p.FutonHight });
        f.pop();
    }

    //if(frameWidth >1000){
    ////f.push();
    //f.move (frameWidth/2,b, frameHight-(b*1.5));
    //f.barY({ position: [0,0,0], length: frameDepth-2*b });
    //f.pop();
    //}

    if (!preview && p.joinAll == true) {
        f.joinAll();
    };

};

/* Return the meta information and build function */
return [meta, build];