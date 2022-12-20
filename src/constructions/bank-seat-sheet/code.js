let params = [

    { name: "width", label: "Breite", value: 1500, min: 400, max: 1500, step: 10, unit: "mm", description: "Gesamtbreite der Konstruktion" },
    { name: "height", label: "Höhe", value: 400, min: 300, max: 500, step: 10, unit: "mm", description: "Gesamtbreite der Konstruktion" },
    { name: "depth", label: "Tiefe", value: 300, min: 250, max: 500, step: 10, unit: "mm", description: "Gesamttiefe der Konstruktion" },

    { name: "barSize", label: "Latten Maße", value: 34, min: 20, max: 40, step: 0.5, unit: "mm", description: "Hier bitte die Länge der Latte aus dem Baumarkt eintragen." },
    { name: "BracingHeight", label: "Höhe Verstrebung", value: 130, min: 30, max: 140, step: 10, unit: "mm" },

    { name: "divider2", label: "Sitzfläche", description: "Divider", hidden: true },

    { name: "seatExtension", label: "Sitz Überhang", value: 230, min: 0, max: 250, step: 10, unit: "mm", hidden: false },
    { name: "panelThickness", label: "Plattendicke ", value: 30, min: 10, max: 50, step: 1, unit: "mm", description: "Dicke der Sitz-Platte", hidden: false },

    { name: "dividerhidden", label: "hidden Stuff", description: "Divider", hidden: true },
    { name: "debug", label: "Debug", value: false, hidden: true },
    { name: "joinAll", label: "Join All", value: true, hidden: true },
];

let steps = [
    { groupName: "leftFrame", prefix: "A", label: "Linker Rahmen", description: "Das linke Seitenteil besteht aus vier Latten." },
    { groupName: "rightFrame", prefix: "B", label: "Rechter Rahmen", description: "Das rechte Seitenteil besteht aus vier weiteren Latten." },
    { groupName: "breacing", prefix: "C", label: "Verstrebung", description: "Die beiden Seitenteile werden mit einer Latte verbunden." },
    { groupName: "seat", prefix: "D", label: "Sitzebene", description: "Diese Latten plus die Platte ergeben die Sitzfläche." },

];

let meta = {
    name: "Bank Seat Sheet",
    description: "Dieser Entwurf ist eine klassiche Sitzbank für bis zu vier Personen. Sie lässt sich schnell aufbauen und mit vielen Holzarten realisieren. Der gleiche Entwurf wie Bank Kartesi, jedoch mit einer Platte als Sitzfläche.",
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

    // construction

    //Front Legs
    f.push();

    f.moveGrid(0.5, 0.5, 0);
    f.group("leftFrame");
    f.move(p.seatExtension, 0, 0);
    f.barZ({ position: [0, 0, 0], length: p.height - p.panelThickness });

    f.moveGrid(-0.5, 0, 0);
    f.move(p.width, 0, 0);
    f.moveGrid(-0.5, 0, 0);
    f.group("rightFrame");
    f.move(2 * -p.seatExtension, 0, 0);
    f.barZ({ position: [0, 0, 0], length: p.height - p.panelThickness });

    f.pop();

    //Rear Legs
    f.push();

    f.move(0, p.depth, 0);
    f.moveGrid(0.5, -0.5, 0);
    f.group("leftFrame");
    f.move(p.seatExtension, 0, 0);
    f.barZ({ position: [0, 0, 0], length: p.height - p.panelThickness });

    f.moveGrid(-0.5, 0, 0);
    f.move(p.width, 0, 0);
    f.moveGrid(-0.5, 0, 0);
    f.group("rightFrame");
    f.move(2 * -p.seatExtension, 0, 0);
    f.barZ({ position: [0, 0, 0], length: p.height - p.panelThickness });

    f.pop();

    //Bottom verticals
    //left
    f.group("leftFrame");
    f.push();
    f.moveGrid(1.5, 0, 0);
    f.move(0, 0, p.BracingHeight);
    f.move(p.seatExtension, 0, 0);
    f.barY({ position: [0, 0, 0], length: p.depth });
    f.pop();

    //right
    f.group("rightFrame");
    f.push();
    f.move(p.width, 0, 0);
    f.moveGrid(-1.5, 0, 0);
    f.move(-p.seatExtension, 0, 0);
    f.move(0, 0, p.BracingHeight);
    f.barY({ position: [0, 0, 0], length: p.depth });
    f.pop();

    //horizontal breacing front bottom
    f.group("breacing");
    f.push();
    f.moveGrid(0, 1.5, 1);
    f.move(0, 0, p.BracingHeight);
    f.move(p.seatExtension, 0, 0);
    f.barX({ position: [0, 0, 0], length: (p.width - 2 * p.seatExtension) });
    f.pop();

    //horizontal breacing back bottom
    f.push();
    f.moveGrid(0, -1.5, 1);
    f.move(0, p.depth, p.BracingHeight);
    f.move(p.seatExtension, 0, 0);
    f.barX({ position: [0, 0, 0], length: (p.width - 2 * p.seatExtension) });
    f.pop();

    //Top verticals
    //left 
    f.group("leftFrame");
    f.push();
    f.moveGrid(1.5, 0, 0);
    f.move(0, 0, p.height - p.panelThickness - b);
    f.moveGrid(0, 0, -0.5);
    f.move(p.seatExtension, 0, 0);
    f.barY({ position: [0, 0, 0], length: p.depth });
    f.pop();

    //right 
    f.group("rightFrame");
    f.push();
    f.move(p.width, 0, 0);
    f.moveGrid(-1.5, 0, 0);
    f.move(0, 0, p.height - p.panelThickness - b);
    f.moveGrid(0, 0, -0.5);
    f.move(-p.seatExtension, 0, 0);
    f.barY({ position: [0, 0, 0], length: p.depth });
    f.pop();

    //seat
    f.group("seat sheet");
    f.push();
    f.move(0, 0, p.height - p.panelThickness);
    f.moveGrid(0, 1.5, 0);
    f.panel({ position: [p.width / 2, p.depth / 2 - (1.5 * b), 0], size: [p.width, p.depth], thickness: p.panelThickness });
    f.pop();

    //horizontal breacing front top
    f.group("breacing");

    f.push();
    f.moveGrid(0, 1.5, 0)
    f.move(0, 0, p.height - p.panelThickness - (0.5 * b));
    f.barX({ position: [0, 0, 0], length: (p.width) });
    f.pop();

    //horizontal breacing back top
    f.push();
    f.move(0, p.depth, 0);
    f.moveGrid(0, -1.5, 0)
    f.move(0, 0, p.height - p.panelThickness - (0.5 * b));
    f.barX({ position: [0, 0, 0], length: (p.width) });
    f.pop();

    if (!preview && p.joinAll == true) {
        f.joinAll();
    };

};

/* Return the meta information and build function */
return [meta, build];