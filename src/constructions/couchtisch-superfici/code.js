let params = [
    { name: "barSize", label: "Latten Maße", value: 34, min: 20, max: 40, step: 1, unit: "mm", description: "Hier bitte die Länge der Latte aus dem Baumarkt eintragen." },

    { name: "divider3", label: "Haupttisch", description: "Divider" },
    { name: "width1", label: "Breite Haupttisch", value: 700, min: 200, max: 1500, step: 10, unit: "mm" },
    { name: "depth1", label: "Tiefe Haupttisch", value: 600, min: 200, max: 1500, step: 10, unit: "mm" },
    { name: "height1", label: "Höhe Haupttisch", value: 310, min: 220, max: 700, step: 10, unit: "mm" },

    { name: "divider2", label: "Seitentisch", description: "Divider" },
    { name: "width2", label: "Breite Seitentisch", value: 200, min: 200, max: 600, step: 10, unit: "mm" },
    { name: "depth2", label: "Tiefe Seitentisch", value: 1100, min: 400, max: 1500, step: 10, unit: "mm" },
    { name: "height2", label: "Höhe Seitentisch", value: 200, min: 150, max: 700, step: 10, unit: "mm" },

    { name: "divider3", label: "Tischplatten", description: "Divider" },

    { name: "panel1Thick", label: "Plattendicke Haupttisch", value: 20, min: 9, max: 50, step: 1, unit: "mm" },
    { name: "panel2Thick", label: "Plattendicke Seitentisch", value: 20, min: 9, max: 50, step: 1, unit: "mm" },

    { name: "panels", label: "Platten sichtbar", value: true, description: "Hiermit können die Platten ausgeblendet werden." },


    { name: "dividerHidden", label: "Hidden Stuff", description: "Divider", hidden: true },

    { name: "heightDistance", label: "heightDistance", value: 80, min: 0, max: 100, step: 1, unit: "mm", hidden: true },
    { name: "depthDistance", label: "depthDistance", value: 200, min: 0, max: 200, step: 1, unit: "mm", hidden: true },
    { name: "debug", label: "Debug", value: false, hidden: true },
    { name: "joinAll", label: "Join All", value: true, hidden: true },

];

let steps = [
    { groupName: "mainTable", prefix: "A", label: "Haupttisch", description: "description for Haupttisch" },
    { groupName: "sideTable", prefix: "B", label: "Seitentisch", description: "description for Seitentisch" },
];

let meta = {
    name: "Couchtisch Superfici",
    description: "Dieser Entwurf besitzt zwei Flächen, die aus unterschiedlichen Plattenwerkstoffen wie Marmor, Glas oder Holz bestehen können. Die dicke der eingeplanten Platten können separat angegeben werden. Durch die große Kombinationsvielfalt der Maße, ist dieser Entwurf sehr individuell im Wohnraum einsetzbar und muss nicht zwangsläufig vor einer Couch stehen.",
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

    //manage values

    let width1Edit = p.width1;
    let depth1Edit = p.depth1;
    let height1Edit = p.height1;

    let width2Edit = p.width2;
    let depth2Edit = p.depth2;
    let height2Edit = p.height2;

    if (height2Edit >= height1Edit - p.heightDistance) {
        height2Edit = height1Edit - p.heightDistance;
    }

    if (depth1Edit >= depth2Edit - p.depthDistance) {
        depth1Edit = depth2Edit - p.depthDistance;
    }

    // construction

    //tableFloor1
    f.group("mainTable");
    //Legs:
    f.push();
    f.moveGrid(0.5, 0.5, 0);
    f.barZ({ position: [0, 0, 0], length: height1Edit - p.panel1Thick });
    f.move(width1Edit - b, 0, 0);
    f.barZ({ position: [0, 0, 0], length: height1Edit - p.panel1Thick });
    f.move(0, depth1Edit - b, 0);
    f.barZ({ position: [0, 0, 0], length: height1Edit - p.panel1Thick });
    f.move(-width1Edit + b, 0, 0);
    f.barZ({ position: [0, 0, 0], length: height1Edit - p.panel1Thick });
    f.pop();

    //Top Breacing:
    //X
    f.push();
    f.moveGrid(0, 1.5, 0);
    f.move(0, 0, height1Edit - p.panel1Thick - (b * 1.5));

    f.barX({ position: [0, 0, 0], length: width1Edit });
    f.move(0, depth1Edit - (3 * b), 0);
    f.barX({ position: [0, 0, 0], length: width1Edit });
    f.pop();

    //Y
    f.push();
    f.moveGrid(1.5, 0, 0);
    f.move(0, 0, height1Edit - p.panel1Thick - b / 2);
    f.barY({ position: [0, 0, 0], length: depth1Edit });
    f.move(width1Edit - (3 * b), 0, 0);
    f.barY({ position: [0, 0, 0], length: depth1Edit });
    f.pop();

    //Bottom Breacing:
    //X
    f.push();
    f.moveGrid(0, 1.5, 0);
    f.move(0, 0, height2Edit - p.panel2Thick - (b * 1.5));
    f.barX({ position: [0, 0, 0], length: width1Edit + width2Edit });
    f.move(0, depth1Edit - (3 * b), 0)
    f.barX({ position: [0, 0, 0], length: width1Edit + b });
    f.pop();

    //Y
    f.push();
    f.moveGrid(1.5, 0, 0);
    f.move(0, 0, height2Edit - p.panel2Thick - b / 2);
    f.barY({ position: [0, 0, 0], length: depth1Edit });
    f.move(width1Edit - b, 0, 0);
    f.barY({ position: [0, 0, 0], length: depth2Edit });
    f.pop();

    //Panel Floor1
    if (p.panels == true) {
        f.push();
        f.move(width1Edit / 2, depth1Edit / 2, height1Edit - p.panel1Thick);
        f.panel({ position: [0, 0, 0], size: [width1Edit, depth1Edit], thickness: p.panel1Thick });
        f.pop();
    }

    //tableFloor2
    f.group("sideTable");

    //Legs:
    f.push();
    f.moveGrid(0.5, 0.5, 0);
    f.move(width1Edit - b, 0, 0);
    f.move(2 * b, depth2Edit - 1 * b, 0);
    f.barZ({ position: [0, 0, 0], length: height2Edit - p.panel2Thick });
    f.pop();

    f.push();
    f.moveGrid(0.5, 0.5, 0);
    f.move(width1Edit, 0, 0);
    f.move(width2Edit - 2 * b, 0, 0);
    f.barZ({ position: [0, 0, 0], length: height2Edit - p.panel2Thick });
    f.move(0, depth2Edit - 1 * b, 0);
    f.barZ({ position: [0, 0, 0], length: height2Edit - p.panel2Thick });
    f.pop();

    //Top Breacing
    f.push();
    f.moveGrid(1.5, 0, 0);
    f.move(0, 0, height2Edit - p.panel2Thick - b / 2);
    f.move(width1Edit + width2Edit - (2 * b), 0, 0);
    f.barY({ position: [0, 0, 0], length: depth2Edit });
    f.pop();

    f.push();
    f.moveGrid(0, 0, 0);
    f.move(width1Edit, 0, height2Edit - p.panel2Thick - (b * 1.5));
    f.move(0, depth2Edit - (1.5 * b), 0);
    f.barX({ position: [0, 0, 0], length: width2Edit });
    f.pop();

    //Panel Floor2
    if (p.panels == true) {
        f.push();
        f.move(width1Edit, 0, 0);
        f.move(width2Edit / 2, depth2Edit / 2, height2Edit - p.panel2Thick);
        f.panel({ position: [0, 0, 0], size: [width2Edit, depth2Edit], thickness: p.panel2Thick });
        f.pop();
    }

    if (!preview && p.joinAll == true) {
        f.joinAll();
    }

};

/* Return the meta information and build function */
return [meta, build];