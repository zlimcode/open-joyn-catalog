let params = [

    { name: "width", label: "Breite", value: 1200, min: 400, max: 1500, step: 10, unit: "mm", description: "Gesamtbreite der Konstruktion" },
    { name: "height", label: "Höhe", value: 400, min: 300, max: 500, step: 10, unit: "mm", description: "Gesamtbreite der Konstruktion" },
    { name: "depth", label: "Tiefe", value: 300, min: 250, max: 500, step: 10, unit: "mm", description: "Gesamttiefe der Konstruktion" },

    { name: "barSize", label: "Latten Maße", value: 34, min: 20, max: 40, step: 0.5, unit: "mm", description: "Hier bitte die Länge der Latte aus dem Baumarkt eintragen." },
    { name: "BracingHeight", label: "Höhe Verstrebung", value: 120, min: 30, max: 140, step: 10, unit: "mm" },
    { name: "SeatingGap", label: "Lücke Sitzlatten", value: 11, min: 3, max: 40, step: 1, unit: "mm", description: "Zielabstand (nicht jeder Wert ist umsetzbar)" },
    //{ name: "panelT", label: "Plattendicke", value: 15, min: 5, max: 40, step: 1, unit: "mm" },


    { name: "dividerhidden", label: "hidden Stuff", description: "Divider", hidden: true },
    { name: "debug", label: "Debug", value: false, hidden: true },
    { name: "joinAll", label: "Join All", value: true, hidden: true },
];

let steps = [
    { groupName: "leftFrame", prefix: "A", label: "Linker Rahmen", description: "Das linke Seitenteil besteht aus vier Latten." },
    { groupName: "rightFrame", prefix: "B", label: "Rechter Rahmen", description: "Das rechte Seitenteil besteht aus vier weiteren Latten." },
    { groupName: "breacing", prefix: "C", label: "Verstrebung", description: "Die beiden Seitenteile werden mit einer Latte verbunden." },
    { groupName: "seat", prefix: "D", label: "Sitzebene", description: "Diese Latten ergeben die Sitzfläche." },

];

let meta = {
    name: "Bank Kartesi",
    description: "Dieser Entwurf ist eine klassiche Sitzbank für bis zu vier Personen. Sie lässt sich schnell aufbauen und mit vielen Holzarten realisieren. Die Lücken zwischen den Sitzlatten beeinflussen den Sitzkomfort stark. Sind diese über 30mm groß, sollte für Sitzkissen eingeplant werden. Wird für den Bau eine Fichtelatte gewählt, bleibt die Bank erstaunlich leicht und somit sehr mobil einsetzbar.",
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
    f.barZ({ position: [0, 0, 0], length: p.height });

    f.moveGrid(-0.5, 0, 0);
    f.move(p.width, 0, 0);
    f.moveGrid(-0.5, 0, 0);
    f.group("rightFrame");
    f.barZ({ position: [0, 0, 0], length: p.height });

    f.pop();

    //Rear Legs
    f.push();

    f.move(0, p.depth, 0);
    f.moveGrid(0.5, -0.5, 0);

    f.group("leftFrame");
    f.barZ({ position: [0, 0, 0], length: p.height });
    f.moveGrid(-0.5, 0, 0);
    f.move(p.width, 0, 0);
    f.moveGrid(-0.5, 0, 0);
    f.group("rightFrame");
    f.barZ({ position: [0, 0, 0], length: p.height });

    f.pop();

    //leftFrame

    f.push();
    f.moveGrid(1.5, 0, 0);
    f.move(0, 0, p.BracingHeight);
    f.group("leftFrame");
    f.barY({ position: [0, 0, 0], length: p.depth });
    f.pop();

    //rightFrame
    f.push();
    f.move(p.width, 0, 0);
    f.moveGrid(-1.5, 0, 0);
    f.move(0, 0, p.BracingHeight);
    f.group("rightFrame");
    f.barY({ position: [0, 0, 0], length: p.depth });
    f.pop();

    //breacing front
    f.group("breacing");
    f.push();
    f.moveGrid(0, 1.5, 1);
    f.move(0, 0, p.BracingHeight);
    f.barX({ position: [0, 0, 0], length: (p.width) });
    f.pop();

    //breacing back
    f.push();
    f.moveGrid(0, -1.5, 1);
    f.move(0, p.depth, p.BracingHeight);
    f.barX({ position: [0, 0, 0], length: (p.width) });
    f.pop();

    //Top

    f.push();
    f.moveGrid(1.5, 0, 0);
    f.move(0, 0, p.height - b);
    f.moveGrid(0, 0, -0.5);
    f.group("leftFrame");
    f.barY({ position: [0, 0, 0], length: p.depth });
    f.pop();

    f.push();
    f.move(p.width, 0, 0);
    f.moveGrid(-1.5, 0, 0);
    f.move(0, 0, p.height - b);
    f.moveGrid(0, 0, -0.5);
    f.group("rightFrame");
    f.barY({ position: [0, 0, 0], length: p.depth });
    f.pop();

    f.group("seat");

    f.push();

    f.move(0, 0, p.height - b);
    f.moveGrid(0, 1.5, 0.5);

    let barCount = Math.round((p.depth - (3 * b)) / (b + p.SeatingGap));
    let spacing = (p.depth - 3 * b) / (barCount);

    for (let i = 0; i < barCount; i++) {
        f.barX({ position: [0, 0, 0], length: p.width });
        f.move(0, spacing, 0);
    }
    f.pop();

    f.push();
    f.move(0, 0, p.height - (b / 2));
    f.move(0, p.depth - b - (b / 2), 0);
    f.barX({ position: [0, 0, 0], length: p.width });

    f.pop();

    if (p.width > 1000) {
        f.push();
        f.move(p.width / 2, b, p.height - (b * 1.5));
        f.barY({ position: [0, 0, 0], length: p.depth - 2 * b });
        f.pop();
    }

    if (!preview && p.joinAll == true) {
        f.joinAll();
    };

};

/* Return the meta information and build function */
return [meta, build];