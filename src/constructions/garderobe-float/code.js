let params = [

    { name: "height", label: "Höhe", value: 1200, min: 1000, max: 1500, step: 10, unit: "mm", description: "Gesamthöhe der Garderobe" },

    { name: "width", label: "Breite", value: 800, min: 600, max: 2000, step: 10, unit: "mm", description: "Breite des Garderobe" },
    { name: "depth", label: "Tiefe", value: 350, min: 300, max: 500, step: 10, unit: "mm", description: "Tiefe des Garderobe" },

    { name: "barSize", label: "Latten Maße", value: 25, min: 20, max: 50, step: 0.5, unit: "mm", description: "Hier bitte die Maße der Latte aus dem Baumarkt eintragen." },
    { name: "overshootX", label: "Überstand", value: 3, min: 0, max: 5, step: 1, unit: "x Latten Maße", description: "Überstand der Latten rechts und links", hidden: false },


    { name: "divider1", label: "Hutablage", description: "Divider" },
    { name: "parcel", label: "Hutablage", value: 1, options: [["vertikal", 1], ["horizontal", 2]], unit: ". Option" },
    { name: "parcelGap", label: "Lücke Hutablage", value: 81, min: 10, max: 300, step: 1, unit: "", description: "Zielabstand (nicht jeder Wert ist umsetzbar)" },

    { name: "divider2", label: "", description: "Divider" },
    { name: "debug", label: "Debug", value: false, hidden: true },
    { name: "joinAll", label: "Join All", value: true, hidden: true },
];

let steps = [
    { groupName: "leftFrame", prefix: "A", label: "Linker Rahmen", description: "Das linke Seitenteil besteht aus drei Latten." },
    { groupName: "rightFrame", prefix: "B", label: "Rechter Rahmen", description: "Das rechte Seitenteil besteht aus drei weiteren Latten." },
    { groupName: "topBreacing", prefix: "C", label: "Oberer Teil", description: "Jetzt werden die horizontalen Latten montiert." },
    { groupName: "parcel", prefix: "D", label: "Hutablage", description: "Die Latten in diesem Schritt ergeben nun die Hutablage am oberen Ende der Garderobe. Du kannst nun 4 Bohrungen in die hinteren vertikalen Latten bohren, um die Garderobe durch diese Löcher an die Wand zu schrauben. Jeweils ein Loch: oben links & oben rechts sowie eines jeweils unten links und unten rechts. Nutze Dübel für eine gute Wandverankerung!... fertig!" },

];

let meta = {
    name: "Garderobe Float",
    description: "Diese Garderobe wird an die Wand geschraubt.",
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

    // variables
    let xOvershoot = p.overshootX * b;
    let frameWidth = p.width - (2 * xOvershoot);
    let frameDepth = p.depth - (2 * b);
    let frameHight = p.height;

    let barCount = 0;
    let spacing = 0;

    // construction

    //legs

    //Rear Legs
    f.push();

    f.move(0, frameDepth, 0);
    f.moveGrid(0.5, 0.5, 0);

    f.group("leftFrame");

    // rear leg front
    f.push();
    f.moveGrid(0, -2, 0);
    f.move(0, 0, 2 * b);
    f.barZ({ position: [0, 0, 0], length: frameHight - 4 * b });
    f.pop();

    //leg at wall
    f.move(0, 0, p.floorbar);
    f.barZ({ position: [0, 0, 0], length: frameHight });

    f.moveGrid(-0.5, 0, 0);
    f.move(frameWidth, 0, 0);
    f.moveGrid(-0.5, 0, 0);
    f.group("rightFrame");

    // rear leg front
    f.push();
    f.moveGrid(0, -2, 0);
    f.move(0, 0, 2 * b);
    f.barZ({ position: [0, 0, 0], length: frameHight - 4 * b });
    f.pop();

    //leg at wall

    f.barZ({ position: [0, 0, 0], length: frameHight });
    f.pop();

    //Rear Horizontals

    f.push();
    f.move(-xOvershoot, p.depth, frameHight - 2 * b);
    f.moveGrid(0, -2.5, -0.5);
    f.group("topBreacing");
    f.barX({ position: [0, 0, 0], length: p.width });

    if (p.parcel != 2) {
        f.push();
        f.moveGrid(0, 4, 0);
        f.move(0, -p.depth, 0);
        f.barX({ position: [0, 0, 0], length: p.width });
        f.pop();
    }

    f.moveGrid(0, 0, -6);
    f.push();
    f.moveGrid(0, -2, 0);
    f.barX({ position: [0, 0, 0], length: p.width });
    f.pop();

    f.moveGrid(0, 0, -6);
    f.barX({ position: [0, 0, 0], length: p.width });

    f.pop();

    f.push();
    f.move(-xOvershoot, p.depth, 0);
    f.moveGrid(0, -2.5, 3.5);
    f.barX({ position: [0, 0, 0], length: p.width });
    f.pop();

    //Rear verticals

    f.push();
    f.move(0, p.depth, frameHight - 2 * b);
    f.moveGrid(1.5, -1, -1.5);
    f.group("leftFrame");
    f.barY({ position: [0, 0, 0], length: -p.depth + (b) });
    f.pop();

    f.push();
    f.move(frameWidth, p.depth, frameHight - 2 * b);
    f.moveGrid(-1.5, -1, -1.5);
    f.group("rightFrame");
    f.barY({ position: [0, 0, 0], length: -p.depth + (b) });
    f.pop();

    //top Verticals array
    // vertical
    f.group("parcel");
    if (p.parcel == 1) {
        parcelGap = p.parcelGap;

        f.push();
        f.move(0, p.depth, frameHight - 2 * b);
        f.moveGrid(1.5, -1, 0.5);
        f.barY({ position: [0, 0, 0], length: -p.depth });
        f.pop();

        f.push();
        f.move(0, p.depth, frameHight - 2 * b);
        f.moveGrid(1.5, -1, 0.5);

        val = 3;
        barCount = Math.floor((frameWidth - (3 * b)) / (b + parcelGap));
        spacing = (frameWidth - 3 * b) / barCount;

        for (let i = 0; i <= barCount; i++) {
            f.barY({ position: [0, 0, 0], length: -p.depth });
            f.move(spacing, 0, 0);
        }
        f.pop();

        // horizontal
        f.group("parcel");

    } else if (p.parcel == 2) {

        f.push();
        f.move(-xOvershoot, 0, frameHight - 2 * b);
        f.moveGrid(0, 1.5, -0.5);
        val = 6;
        barCount = Math.floor((p.depth - (val * b)) / (b + p.parcelGap));
        spacing = (p.depth - val * b) / barCount;

        for (let i = 0; i <= barCount; i++) {
            f.barX({ position: [0, 0, 0], length: frameWidth + (2 * xOvershoot) });
            f.move(0, spacing, 0);
        }
        f.pop();
    }

    if (!preview && p.joinAll == true) {
        f.joinAll();
    }

};

/* Return the meta information and build function */
return [meta, build];