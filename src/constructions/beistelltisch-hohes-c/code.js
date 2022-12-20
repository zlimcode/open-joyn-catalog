let params = [
    { name: "barSize", label: "Latten Maße", value: 25, min: 25, max: 40, step: 0.5, unit: "mm", description: "Hier bitte die Länge der Latte aus dem Baumarkt eintragen." },

    { name: "width", label: "Breite", value: 500, min: 200, max: 600, step: 10, unit: "mm", description: "Gesamtbreite der Konstruktion" },
    { name: "height", label: "Höhe", value: 500, min: 220, max: 700, step: 10, unit: "mm", description: "Gesamtbreite der Konstruktion" },
    { name: "depth", label: "Tiefe", value: 300, min: 250, max: 500, step: 10, unit: "mm", description: "Gesamttiefe der Konstruktion" },

    { name: "sheetThickness", label: "Stärke der Platte", value: 10, min: 9, max: 30, step: 1, unit: "mm" },

    //{ name: "SeatingGap", label: "Lücke der Sitzlatten", value: 11, min: 3, max: 40, step: 1, unit: "mm", description: "Zielabstand (nicht jeder Wert ist umsetzbar)" },    
    //{ name: "panelT", label: "Plattendicke", value: 15, min: 5, max: 40, step: 1, unit: "mm" },

    { name: "debug", label: "Debug", value: false, hidden: true },
    { name: "joinAll", label: "Join All", value: true, hidden: true },
];

let steps = [
    { groupName: "base", prefix: "A", label: "Basis", description: "Los gehts mit der Basis des Tisches, diese besteht aus folgenden vier Latten." },
    { groupName: "legs", prefix: "B", label: "Beine", description: "Nun werden die vier Beine montiert." },
    { groupName: "top", prefix: "C", label: "Top", description: "Die drei folgenden Latten ergeben das obere Teil." },
    { groupName: "sheet", prefix: "D", label: "Tischplatte", description: "Nun noch die Platte anleimen oder von unten anschrauben - fertig!" },

];

let meta = {
    name: "Beistelltisch Hohes-C",
    description: "Dieser Entwurf ist ein kleiner Tisch, der an eine Couch oder ein Bett gestellt werden kann. Dank der C-Konstruktion kann er über ein Bett kragen und für das Bett-Frühstück mit Crossaint und frisch gepresstem Saft genutzt werden.",
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

    let frameHeight = p.height - p.sheetThickness;

    // construction

    f.group("legs");
    //Front Legs
    f.push();
    f.moveGrid(0.5, 2.5, 0);
    f.group("legs");
    f.barZ({ position: [0, 0, 0], length: frameHeight });

    f.moveGrid(2, -2, 1);
    f.barZ({ position: [0, 0, 0], length: frameHeight - b + (p.sheetThickness) });

    f.pop();

    //Rear Legs
    f.push();
    f.move(0, p.depth, 0);
    f.moveGrid(0.5, -2.5, 0);
    f.group("legs");
    f.barZ({ position: [0, 0, 0], length: frameHeight });

    f.moveGrid(2, 2, 1);
    f.barZ({ position: [0, 0, 0], length: frameHeight - b + (p.sheetThickness) });
    f.pop();

    // base
    f.group("base");
    f.push();
    f.moveGrid(1.5, 0, 2.5);
    f.move(0, 0, p.BracingHeight);
    f.barY({ position: [0, 0, 0], length: p.depth });
    f.pop();

    f.push();
    f.move(p.width, 0, 0);
    f.moveGrid(-.5, 1, 0.5);
    f.move(0, 0, p.BracingHeight);
    f.barY({ position: [0, 0, 0], length: p.depth - 2 * b });
    f.pop();

    //base X front
    f.group("base");
    f.push();
    f.moveGrid(0, 1.5, 1.5);
    f.move(0, 0, p.BracingHeight);
    f.barX({ position: [0, 0, 0], length: (p.width) });
    f.pop();

    //base X back
    f.push();
    f.moveGrid(0, -1.5, 1.5);
    f.move(0, p.depth, p.BracingHeight);
    f.barX({ position: [0, 0, 0], length: (p.width) });
    f.pop();

    //Top
    f.group("top");
    f.push();
    f.moveGrid(1.5, 0, 0);
    f.move(0, 0, frameHeight - b);
    f.moveGrid(0, 0, -0.5);
    f.barY({ position: [0, 0, 0], length: p.depth });
    f.pop();

    // X
    f.group("top");
    f.push();
    f.moveGrid(0, 1.5, 0.5);
    f.move(0, 0, frameHeight - b);
    f.barX({ position: [0, 0, 0], length: (p.width) });
    f.pop();

    //base X back
    f.push();
    f.moveGrid(0, -1.5, 0.5);
    f.move(0, p.depth, frameHeight - b);
    f.barX({ position: [0, 0, 0], length: (p.width) });
    f.pop();

    f.group("sheet");

    f.push();
    f.move(p.width / 2, p.depth / 2, frameHeight);
    f.moveGrid(0, 0, 0);
    f.panel({ position: [0, 0, 0], size: [p.width, p.depth - 2 * b], thickness: p.sheetThickness });
    f.pop();

    //if(p.joinAll == true && mouseDown == 0){
    if (!preview && p.joinAll == true) {
        f.joinAll();
    }

};

/* Return the meta information and build function */
return [meta, build];