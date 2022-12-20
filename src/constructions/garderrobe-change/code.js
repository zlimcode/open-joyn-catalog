let params = [

    { name: "height", label: "Höhe", value: 2000, min: 1700, max: 2500, step: 10, unit: "mm", description: "Gesamthöhe der Garderobe" },
    { name: "width", label: "Breite", value: 1000, min: 600, max: 2500, step: 10, unit: "mm", description: "Breite des Garderobe" },
    { name: "depth", label: "Tiefe", value: 400, min: 300, max: 500, step: 10, unit: "mm", description: "Tiefe des Garderobe" },

    { name: "barSize", label: "Latten Maße", value: 34, min: 30, max: 50, step: 0.5, unit: "mm", description: "Hier bitte die Maße der Latte aus dem Baumarkt eintragen." },
    { name: "overshootX", label: "Überstand", value: 2, min: 0, max: 5, step: 1, unit: "x Latten Maße", description: "Überstand der Latten, recht und links.", hidden: false },


    { name: "divider1", label: "Hutablage", description: "Divider" },


    { name: "parcel", label: "Hutablage", value: 2, options: [["vertikal", 1], ["horizontal", 2]], unit: ". Option" },
    { name: "parcelGap", label: "Lücke Hutablage", value: 60, min: 10, max: 300, step: 1, unit: "", description: "Zielabstand (nicht jeder Wert ist umsetzbar)" },

    { name: "divider2", label: "Sitzfläche und Schuhablage", description: "Divider" },
    { name: "heightSeating", label: "Höhe Sitzfläche", value: 400, min: 300, max: 600, step: 10, unit: "mm", description: "Höhe der Sitzflache" },
    { name: "SeatingGap", label: "Lücke Sitzlatten", value: 50, min: 3, max: 50, step: 1, unit: "mm", description: "Zielabstand (nicht jeder Wert ist umsetzbar)", hidden: true },
    { name: "floorbar", label: "Höhe Fußleiste", value: 100, min: 0, max: 150, step: 1, unit: "mm", description: "Höhe der deiner Wand-Fußleiste bzw. der Schuhablage der Konstruktion" },


    { name: "dividerHidden", label: "Hidden Stuff", description: "Divider", hidden: true },

    { name: "debug", label: "Debug", value: false, hidden: true },
    { name: "joinAll", label: "Join All", value: true, hidden: true },
];

let steps = [
    { groupName: "leftFrame", prefix: "A", label: "Linker Rahmen", description: "Das linke Seitenteil besteht aus sechs Latten." },
    { groupName: "rightFrame", prefix: "B", label: "Rechter Rahmen", description: "Das rechte Seitenteil besteht aus sechs weiteren Latten." },

    { groupName: "breacing", prefix: "C", label: "Untere Verstrebung", description: "Nun werden die Rahmen mit den hinteren horizontalen Verstrebungen verbunden. Falls die Konstruktion eine besonders große Breite besitzt, gibt es auch einen mittleren Rahmen, dieser besteht aus vier Latten. Am besten du erledigdt diesen Schritt mit einer helfenden Person, da es sonst sehr schwierig wird. ;)" },

    { groupName: "seatBottom", prefix: "D", label: "Schuhablage", description: "Nun werden die Latten für die Schuhablage montiert." },

    { groupName: "seatTop", prefix: "E", label: "Sitzebene", description: "Und nun ganz ähnlich die Latten für die Sitzebene. Je nach Breite der Garderobe gibt es hier auch mittlere Verstrebungen an der Unterseite der Latten." },
    { groupName: "topBreacing", prefix: "F", label: "Oberer Teil", description: "Jetzt werden die horizontalen Latten an dem oberen Konstruktionsteil montiert. (evtl. musst du aus der 3D Abbildung herauszoomen und mit einem Rechtsclick + Drag an den oberen Teil der Konstruktion navigieren." },

    { groupName: "parcel", prefix: "G", label: "Hutablage", description: "Diese Latten ergeben nun die Hutablage am oberen Ende der Garderobe... fertig!" },



];

let meta = {
    name: "Garderobe Change",
    description: "Diese Garderobe wird an die Wand geschraubt und bietet zwei Ablagen,für Schuhe oder andere Utensilien. Die obere Ebene kann aber auch als Sitzfläche genutzt werden, was das Möbelstück sehr individuell einsetzbar macht. Die untere Schuhablage muss mindestens auf die Höhe einer evtl. vorhandenen Wand-Fußleiste gebracht werden, damit die Garderobe am Aufstellort bis an die Wand gerückt werden kann und die Fußleiste nicht im Weg ist.",
    author: "studio milz",
    difficulty: 4,

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
    let BracingHeightNew = p.heightSeating - p.BracingHeight;
    let heightSeatingBottom = p.floorbar + 2 * b;
    let seatingGap = p.SeatingGap;

    let barCount = 0;
    let spacing = 0;

    let val = 0;

    let middleY = false;
    if (frameWidth > 900) {
        middleY = true;
    }

    let thirdLeg = false;
    if (frameWidth > 1500) {
        thirdLeg = true;
        middleY = false;
    }

    let twoMiddleY = false;
    if (frameWidth > 2000) {
        twoMiddleY = true;
    }

    // construction

    //legs
    //Front Legs
    //left leg
    f.push();
    f.moveGrid(0.5, 0.5, 0);
    f.group("leftFrame");
    f.barZ({ position: [0, 0, 0], length: p.heightSeating });
    // right leg
    f.group("rightFrame");
    f.moveGrid(-0.5, 0, 0);
    f.move(frameWidth, 0, 0);
    f.moveGrid(-0.5, 0, 0);
    f.barZ({ position: [0, 0, 0], length: p.heightSeating });
    f.pop();

    //optional: middle front & rear Legs
    f.group("breacing");
    if (thirdLeg) {
        f.push();
        f.moveGrid(0, 0.5, 0);
        f.move(frameWidth / 2, 0, 0);
        f.barZ({ position: [0, 0, 0], length: p.heightSeating });
        f.move(0, frameDepth, 0);
        f.barZ({ position: [0, 0, 0], length: p.heightSeating });

        f.pop();
    }

    //Rear Legs
    f.push();

    f.move(0, frameDepth, 0);
    f.moveGrid(0.5, 0.5, 0);

    f.group("leftFrame");

    // rear leg standing on ground
    f.push();
    f.moveGrid(0, -2, 0);
    f.barZ({ position: [0, 0, 0], length: frameHight - 2 * b });
    f.pop();

    //leg at wall
    f.move(0, 0, p.floorbar);
    f.barZ({ position: [0, 0, 0], length: frameHight - p.floorbar });

    f.moveGrid(-0.5, 0, 0);
    f.move(frameWidth, 0, 0);
    f.moveGrid(-0.5, 0, 0);
    f.group("rightFrame");

    // rear leg standing on ground
    f.push();
    f.moveGrid(0, -2, 0);
    f.move(0, 0, -p.floorbar);
    f.barZ({ position: [0, 0, 0], length: frameHight - 2 * b });
    f.pop();

    //leg at wall

    f.barZ({ position: [0, 0, 0], length: frameHight - p.floorbar });
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

    // Seating module Top

    // Y slats
    //left
    f.group("leftFrame");
    f.push();
    f.moveGrid(1.5, 0, 0);
    f.move(0, 0, p.heightSeating - b);
    f.moveGrid(0, -1, -0.5);
    f.barY({ position: [0, 0, 0], length: p.depth });
    f.pop();

    //right
    f.group("rightFrame");
    f.push();
    f.move(frameWidth, 0, 0);
    f.moveGrid(-1.5, -1, 0);
    f.move(0, 0, p.heightSeating - b);
    f.moveGrid(0, 0, -0.5);
    f.barY({ position: [0, 0, 0], length: p.depth });
    f.pop();

    if (thirdLeg) {
        f.group("breacing");
        f.push();
        f.move(frameWidth / 2, 0, 0);
        f.moveGrid(1, -1, 0);
        f.move(0, 0, p.heightSeating - b);
        f.moveGrid(0, 0, -0.5);
        f.barY({ position: [0, 0, 0], length: p.depth });
        f.pop();
    }

    f.group("seatTop");
    if (middleY) {
        f.push();
        f.move(frameWidth / 2, 0, 0);
        f.moveGrid(0, 0, 0);
        f.move(0, 0, p.heightSeating - b);
        f.moveGrid(0, 1, -0.5);
        f.barY({ position: [0, 0, 0], length: p.depth - 3 * b });
        f.pop();
    }

    f.group("seatTop");
    if (twoMiddleY) {
        f.push();
        f.move((frameWidth - b) / 4, 0, 0);
        f.moveGrid(0, 0, 0);
        f.move(0, 0, p.heightSeating - b);
        f.moveGrid(0, 1, -0.5);
        f.barY({ position: [0, 0, 0], length: p.depth - 3 * b });
        f.pop();

        f.push();
        f.move(((frameWidth - b) / 4) * 3, 0, 0);
        f.moveGrid(0, 0, 0);
        f.move(0, 0, p.heightSeating - b);
        f.moveGrid(0, 1, -0.5);
        f.barY({ position: [0, 0, 0], length: p.depth - 3 * b });
        f.pop();
    }

    f.group("seatTop");
    if (seatingGap < b) {
        seatingGap = b;
    }
    seatingGap = b;

    f.push();
    f.move(-xOvershoot, 0, p.heightSeating - b);
    f.moveGrid(0, -0.5, 0.5);
    f.barX({ position: [0, 0, 0], length: frameWidth + (2 * xOvershoot) });
    f.pop();

    f.push();
    f.move(-xOvershoot, 0, p.heightSeating - b);
    f.moveGrid(0, -0.5, 0.5);

    barCount = Math.floor((p.depth - (4 * b)) / (b + seatingGap));
    spacing = (p.depth - 4 * b) / barCount;

    for (let i = 0; i <= barCount; i++) {
        f.barX({ position: [0, 0, 0], length: frameWidth + (2 * xOvershoot) });
        f.move(0, spacing, 0);
    }
    f.pop();

    //last X slat at wall
    f.group("breacing");
    f.push();
    f.move(-xOvershoot, 0, p.heightSeating - (b / 2));
    f.move(0, p.depth - b - (b / 2), 0);
    f.moveGrid(0, -1, 0);
    f.barX({ position: [0, 0, 0], length: frameWidth + (2 * xOvershoot) });
    f.pop();

    // Seating module Bottom

    // Y slats
    //left
    f.group("leftFrame");
    f.push();
    f.moveGrid(1.5, 0, 0);
    f.move(0, 0, heightSeatingBottom - b);
    f.moveGrid(0, 0, -0.5);
    f.barY({ position: [0, 0, 0], length: p.depth - b });
    f.pop();

    //right
    f.group("rightFrame");
    f.push();
    f.move(frameWidth, 0, 0);
    f.moveGrid(-1.5, 0, 0);
    f.move(0, 0, heightSeatingBottom - b);
    f.moveGrid(0, 0, -0.5);
    f.barY({ position: [0, 0, 0], length: p.depth - b });
    f.pop();

    //middle
    if (thirdLeg) {
        f.group("breacing");
        f.push();
        f.move(frameWidth / 2, 0, 0);
        f.moveGrid(-1, 0, 0);
        f.move(0, 0, heightSeatingBottom - b);
        f.moveGrid(0, 0, -0.5);
        f.barY({ position: [0, 0, 0], length: p.depth - b });
        f.pop();
    }

    // Seating slats
    f.group("seatBottom");
    f.push();
    f.move(-xOvershoot, 2 * b, heightSeatingBottom - b);
    f.moveGrid(0, -0.5, 0.5);

    barCount = Math.floor((p.depth - (6 * b)) / (b + seatingGap));
    spacing = (p.depth - 6 * b) / barCount;

    for (let i = 0; i <= barCount; i++) {
        f.barX({ position: [0, 0, 0], length: frameWidth + (2 * xOvershoot) });
        f.move(0, spacing, 0);
    }
    f.pop();

    f.group("breacing");
    //last X slat at wall
    f.push();
    f.move(-xOvershoot, 0, heightSeatingBottom - 0.5 * b);
    f.move(0, p.depth - b - (b / 2), 0);
    f.moveGrid(0, -1, 0);
    f.barX({ position: [0, 0, 0], length: frameWidth + (2 * xOvershoot) });
    f.pop();

    if (!preview && p.joinAll == true) {
        f.joinAll();
    }

};

/* Return the meta information and build function */
return [meta, build];