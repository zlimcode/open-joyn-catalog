let params = [

    { name: "width1", label: "Gestell-Breite", value: 2000, min: 700, max: 2500, step: 10, unit: "mm" },
    { name: "depth1", label: "Gestell-Tiefe", value: 800, min: 500, max: 1000, step: 10, unit: "mm" },
    { name: "height1", label: "Tischhöhe", value: 810, min: 600, max: 900, step: 10, unit: "mm" },

    { name: "barSize", label: "Latten Maße", value: 34, min: 30, max: 40, step: 0.5, unit: "mm", description: "Latten müssen vorher gemessen werden!" },
    { name: "centerLeg", label: "centerLeg", value: 1, options: [["noCenterLeg", 0], ["shortCenterLeg", 1], ["fullCenterLeg", 2]], },

    { name: "divider1", label: "Tischplatte", description: "Divider", hidden: true },
    { name: "panelThick", label: "Plattendicke", value: 25, min: 9, max: 35, step: 1, unit: "mm" },
    { name: "panelXOvershot", label: "Überstand X", value: 200, min: 0, max: 400, step: 10, unit: "mm", hidden: false },
    { name: "panelYOvershot", label: "Überstand Y", value: 200, min: 0, max: 400, step: 10, unit: "mm", hidden: false },




    { name: "dividerhidden", label: "hidden Stuff", description: "Divider", hidden: true },
    { name: "trussZSpace", label: "trussZSpace", value: 100, min: 50, max: 300, step: 10, unit: "mm", hidden: true },
    { name: "sideTrussFront", label: "sideTrussFront", value: 90, min: 50, max: 300, step: 10, unit: "mm", hidden: true },
    { name: "sideTrussBack", label: "sideTrussBack", value: 130, min: 50, max: 300, step: 10, unit: "mm", hidden: true },

    { name: "diagonalOvershoot", label: "diagonalOvershoot", value: 20, min: 0, max: 100, step: 1, unit: "mm", hidden: true },
    { name: "panels", label: "Panels", value: true, hidden: true },
    { name: "debug", label: "Debug", value: false, hidden: true },
    { name: "joinAll", label: "join All", value: true, hidden: true },

];

let steps = [
    { groupName: "frame", prefix: "A", label: "Rahmen", description: "Es geht los mit dem recheckigen Rahmen, auf dem später die Tischeplatte montiert wird." },
    { groupName: "legs", prefix: "B", label: "Beine", description: "Nun schraubst Du in diesem Schritt die Beine an den Rahmen - sieht schon fast fertig aus." },
    { groupName: "Cross", prefix: "C", label: "hinteres Kreuz", description: "Jetzt wird in diesem Schritt die hintere Verstrebung montiert, um die Kosntruktion auszusteifen." },
    { groupName: "strives", prefix: "D", label: "Seitenverstrebungen", description: "Das gleiche machst Du nun mit den Seiten, es gibt eine Latte für Rechts und eine für Links. " },
    { groupName: "sheet", prefix: "D", label: "Tischplatte", description: "Nun noch die Tischplatte auflegen und evtl. von unten verschrauben - fertig!" },
];

let meta = {
    name: "Schreibtisch One",
    description: "Ein einfacher Arbeitstisch, mit einer technischen Variationsmöglichkeit.",
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

    //manage values

    let width1Edit = p.width1;
    let depth1Edit = p.depth1;
    let height1Edit = p.height1;

    f.group("legs");
    //Legs:
    f.push();
    f.moveGrid(0.5, 0.5, 0);
    let legVL = f.barZ({ position: [0, 0, 0], length: height1Edit - p.panelThick });
    f.move(width1Edit - b, 0, 0);
    let legVR = f.barZ({ position: [0, 0, 0], length: height1Edit - p.panelThick });
    f.move(0, depth1Edit - b, 0);
    let legHR = f.barZ({ position: [0, 0, 0], length: height1Edit - p.panelThick });
    f.move(-width1Edit + b, 0, 0);
    let legHL = f.barZ({ position: [0, 0, 0], length: height1Edit - p.panelThick });
    f.pop();

    f.group("frame");
    //Top Y Breacing
    f.push();
    f.moveGrid(1.5, 0, 0);
    f.move(0, 0, height1Edit - p.panelThick - b / 2 - b);
    f.barY({ position: [0, 0, 0], length: depth1Edit });
    f.pop();

    f.push();
    f.move(width1Edit, 0, 0);
    f.moveGrid(-1.5, 0, 0);
    f.move(0, 0, height1Edit - p.panelThick - b / 2 - b);
    f.barY({ position: [0, 0, 0], length: depth1Edit });
    f.pop();

    //Top X Breacing
    f.push();
    f.moveGrid(0, 1.5, 0);
    f.move(0, 0, height1Edit - p.panelThick - b / 2);
    f.barX({ position: [0, 0, 0], length: width1Edit });
    f.pop();

    f.push();
    f.moveGrid(1, 0, 0);
    f.move(0, depth1Edit / 2, height1Edit - p.panelThick - b / 2);
    f.barX({ position: [0, 0, 0], length: width1Edit - (2 * b) });
    f.pop();

    f.push();
    f.move(0, depth1Edit, 0);
    f.moveGrid(0, -1.5, 0);
    f.move(0, 0, height1Edit - p.panelThick - b / 2);
    f.barX({ position: [0, 0, 0], length: width1Edit });
    f.pop();

    f.group("Cross");
    //back diagonal cross Breacing
    f.push();
    f.moveGrid(0, 1, 0);
    f.bar({ position: legHL.pointFromStart(p.trussZSpace), to: legHR.pointFromEnd(p.trussZSpace), extend: [p.diagonalOvershoot, p.diagonalOvershoot] });
    f.pop();

    f.push();
    f.moveGrid(0, -1, 0);
    f.bar({ position: legHL.pointFromEnd(p.trussZSpace), to: legHR.pointFromStart(p.trussZSpace), extend: [p.diagonalOvershoot, p.diagonalOvershoot] });
    f.pop();

    f.group("strives");

    //side diagonal  Breacing
    f.push();
    f.moveGrid(-1, 0, 0);
    f.bar({ position: legHL.pointFromEnd(p.sideTrussBack), to: legVL.pointFromStart(p.sideTrussFront), extend: [p.diagonalOvershoot, p.diagonalOvershoot] });
    f.pop();

    f.push();
    f.moveGrid(1, 0, 0);
    f.bar({ position: legHR.pointFromEnd(p.sideTrussBack), to: legVR.pointFromStart(p.sideTrussFront), extend: [p.diagonalOvershoot, p.diagonalOvershoot] });
    f.pop();

    if (p.centerLeg == 1) {
        f.push();
        f.moveGrid(0, -0.5, 0);
        f.move(width1Edit / 2, depth1Edit, (height1Edit - p.panelThick));
        f.barZ({ position: [0, 0, 0], length: -(height1Edit / 2) - 15 });
        f.pop();
    } else if (p.centerLeg == 2) {
        f.push();
        f.moveGrid(0, -0.5, 0);
        f.move(width1Edit / 2, depth1Edit, (height1Edit - p.panelThick));
        f.barZ({ position: [0, 0, 0], length: -(height1Edit) });
        f.pop();
    }

    f.group("sheet");
    //Panel
    if (p.panels == true) {
        f.push();
        f.move(width1Edit / 2, depth1Edit / 2, height1Edit - p.panelThick);
        f.panel({ position: [0, 0, 0], size: [width1Edit + p.panelXOvershot, depth1Edit + p.panelYOvershot], thickness: p.panelThick });
        f.pop();
    }

    if (!preview && p.joinAll == true) {
        f.joinAll();
    };

};

/* Return the meta information and build function */
return [meta, build];