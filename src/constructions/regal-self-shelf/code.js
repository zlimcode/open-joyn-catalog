let params = [

    { name: "barSize", label: "Latten Maße", value: 34, min: 20, max: 45, step: 0.5, unit: "mm" },

        //{ name: "width", label: "Width", value: 2000, min: 600, max: 10000, step: 10, unit: "mm" },
    { name: "height", label: "Regal Höhe", value: 1700, min: 600, max: 2500, step: 10, unit: "mm" },

        //{ name: "barSize", label: "Bar Stock", value: 34, options: [["25x25", 25],["34x34", 34],["40x40", 40]],  unit: "mm" },

    { name: "offGround", label: "Abstand zum Boden", value: 200, min: 50, max: 500, step: 10 },
    { name: "panelT", label: "Platten Dicke", value: 10, min: 9, max: 30, step: 1, unit: "mm" },


    { name: "divider1", label: "Regalmodule", description: "Divider", hidden: true },
    { name: "LFrameCount", label: "Regalmodul Anzahl", value: 2, min: 1, max: 4, step: 1 },
    { name: "LFrameWidth", label: "Regalmodul Breite", value: 600, min: 300, max: 1000, step: 10 },
        //{ name: "SFrameCount", label: "SFrameCount", value: 1, min: 1, max: 10, step: 1 },
        //{ name: "SFrameWidth", label: "SFrameWidth", value: 600, min: 400, max: 1500, step: 1 },




    { name: "divider2", label: "standard Fächer", description: "Divider", hidden: true },

    { name: "LFramePanelCount", label: "Anzahl standard", value: 5, min: 3, max: 8 },
    { name: "smallPanelDepth", label: "Tiefe standard", value: 200, min: 100, max: 300, step: 10, unit: "mm" },

        //{ name: "NrOfBigPanels", label: "Anzahl schwerlast Fächer", value: 2, min: 0, max: 3, step: 1 },


    { name: "divider3", label: "Schwerlastfächer", description: "Divider", hidden: true },

    { name: "NrOfBigPanels", label: "Anzahl Schwerlastfächer", value: 2, options: [["Keine", 0], ["Zwei", 2], ["Drei", 3]], },

    { name: "depth", label: "Tiefe schwerlast", value: 400, min: 300, max: 500, step: 10, unit: "mm" },



    { name: "dividerhidden", label: "hidden Stuff", description: "Divider", hidden: true },

    { name: "fingerAnkerFront", label: "fingerAnkerFront", value: 30, min: 10, max: 40, step: 10, unit: "mm", hidden: true },
    { name: "fingerAnkerBack", label: "fingerAnkerBack", value: 140, min: 40, max: 140, step: 10, unit: "mm", hidden: true },

    { name: "diagonalLegExtension", label: "diagonalLegExtension", value: 3, min: 0, max: 10, step: 1, unit: "mm", hidden: true },


        //{ name: "SFramePanelCount", label: "SFramePanelCount", value: 3, min: 2, max: 7 },

    { name: "drawPanels", label: "drawPanels", value: true, hidden: true },
    { name: "debug", label: "Debug", value: false, hidden: true },
    { name: "joinAll", label: "joynAll", value: true, hidden: true },

    ];

// from kartesi
let steps = [
    { groupName: "verticals", prefix: "A", label: "Träger", description: "In diesem ersten Schritt legst Du die vertikalen Träger Latten aus. Das ganze Regal kannst Du auf dem Boden montieren oder Stück für Stück an die Wand schrauben. Beachte das es nicht freistehend aufgestellt werden kann, sondern mit Dübeln fest in der Wand verschraubt werden muss." },
    { groupName: "horizontals", prefix: "B", label: "Querlattung", description: "Nun wird die horizontale Querlattung verschraubt." },
    { groupName: "panelFingers", prefix: "C", label: "Arme", description: "Hier werden nun die Kragarme angebracht auf denen später die Fachboden verleimt oder angeschraubt werden." },
    { groupName: "diagonals", prefix: "D", label: "Diagonal Beine", description: "jetzt werden die diagonalen Beine für die unteren Schwerlast-Fächer montiert." },
    { groupName: "panelsBig", prefix: "E", label: "große Fachböden", description: "Falls Du große Böden in der Konstruktion hast, kannst Du die großen Platten als Fachböden auf die Kragarme leimen oder von unten durch die Latten anschrauben." },
    { groupName: "panels", prefix: "F", label: "kleine Fachböden", description: "Das Gleiche mit den kleinen Fachböden. Stelle sicher, dass das Regal gut und fest an der Wand verschraubt ist, damit es nicht umfallen kann. - Fertig!" },

    ];

let meta = {
    name: "Regal Self Shelf",
    description: "Ein modularer Regalentwurf der sehr vielseitig individualisiert werden kann. Beachte das es nicht freistehend aufgestellt werden kann, sondern mit Dübeln fest in der Wand verschraubt werden muss.",
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

    // construction

    //creating L Frames

    let LFramebar = [p.LFrameCount];
    //let LFramebar_wall = [p.LFrameCount][p.LFramePanelCount];
    let LFramebar_wall = [];
    let LFramebar_fingerL = [];
    let LFramebar_fingerR = [];
    let bigPanelLeft = [];
    let bigPanelRight = [];

    //let LFramebar_wall = [[],[]];

    f.group("verticals");

    //main bar:
    LFramebar[0] = f.bar({ position: [0, 0, 0], length: p.height });

    f.push();
    //sideBars:
    for (let i = 1; i <= p.LFrameCount; i++) {

        f.move(-p.LFrameWidth, 0, 0);
        LFramebar[i] = f.bar({ position: [0, 0, 0], length: p.height });

    };
    f.pop();

    f.group("horizontals");

    let panel_z_steps = (p.height - (p.offGround + b + (0.5 * b) + p.panelT)) / (p.LFramePanelCount - 1);

    f.push();
    f.move(0, 0, 0);
    f.moveGrid(0, 1, 0);
    let val;

    for (let i = 0; i < p.LFramePanelCount; i++) {
        let val = p.offGround + (panel_z_steps * i)
        LFramebar_wall[i] = f.bar({ position: LFramebar[0].pointFromStart(val), to: LFramebar[p.LFrameCount].pointFromStart(val), extend: [b * 0.5, b * 0.5] });
    };

    f.pop();

    let h1 = p.offGround + b;
    //f.marker({position: [0,0,p.offGround+b], radius: 30});
    let h2 = panel_z_steps;
    //f.barZ({ position: [0,2*b,p.offGround+b], length: panel_z_steps}); 

    let fF = p.fingerAnkerFront;
    let fB = p.fingerAnkerBack;

    let a1 = fB - fF;

    let b1 = 0;
    if (p.NrOfBigPanels == 2) {
        b1 = h2;
    } else if (p.NrOfBigPanels == 3) {
        b1 = h2 + h2;
    };

    let beta1 = Math.atan(b1 / a1);
    //beta1 = 60;

    let b2 = h1;
    let a2 = 0;
    let alpha2 = 0;
    let beta2 = beta1;
    //beta2 = 0.8;

    //let hypo2 = (Math.cos(beta2))*b2;
    let hypo2 = b2 / (Math.sin(beta2));

    let b3 = p.barSize / 2;
    let shortenLeg = b3 / Math.tan(beta1);

    // panelFingers

    f.push()
    f.moveGrid(-1, 1.5, 1);

    for (let i = 0; i < p.LFrameCount + 1; i++) { // Anzhal Regal-Module 
        for (let y = 0; y < p.LFramePanelCount; y++) { // Anzahl Fachboden pro Modul
            let val = p.offGround + (panel_z_steps * y);

            f.group("panelFingers");

            //rechte FingerBar
            if (i != 0) {
                f.push();
                f.moveGrid(2, 0, 0)

                if (p.NrOfBigPanels > y) {
                    bigPanelRight[y] = f.barY({ position: LFramebar[i].pointFromStart(val), length: -p.depth });
                } else {
                    f.barY({ position: LFramebar[i].pointFromStart(val), length: -p.smallPanelDepth });
                }
                f.pop();
            }

            // linke FingerBar:
            if (i < (p.LFrameCount)) { //nicht bei letzer Latte = Endlatte

                f.group("panelFingers");
                if (p.NrOfBigPanels > y) {
                    bigPanelLeft[y] = f.barY({ position: LFramebar[i].pointFromStart(val), length: -p.depth });
                } else {
                    f.barY({ position: LFramebar[i].pointFromStart(val), length: -p.smallPanelDepth });
                }

                // panel:

                let pt = LFramebar[i].pointFromStart(val);
                f.push();
                f.move(...pt);
                f.move((-p.LFrameWidth / 2), (-p.depth / 2), 0.5 * b);
                f.move(b, 0, 0)
                if (p.NrOfBigPanels > y && p.drawPanels == true) {
                    f.group("panelsBig");
                    f.panel({ size: [p.LFrameWidth - b, p.depth], thickness: p.panelT });
                } else if (p.drawPanels == true) {

                    f.move(0, p.depth / 2, 0);
                    f.move(0, -p.smallPanelDepth / 2, 0);
                    f.group("panels");
                    f.panel({ size: [p.LFrameWidth - b, p.smallPanelDepth], thickness: p.panelT });
                }
                f.pop();
            };

            // diagonal legs 
            f.group("diagonals");

            if (p.NrOfBigPanels == y + 1 && p.NrOfBigPanels > 1 && i > 0) {
                f.push();
                f.moveGrid(0, 0, -1);
                f.bar({ position: bigPanelRight[0].pointFromEnd(p.fingerAnkerFront), to: bigPanelRight[y].pointFromEnd(p.fingerAnkerBack), extend: [hypo2 - shortenLeg + p.diagonalLegExtension, 40] }); // front = 30  back = 140
                f.pop();
            }
            if (p.NrOfBigPanels == y + 1 && p.NrOfBigPanels > 1 && i < 1) { // letzes regal
                f.push();
                f.moveGrid(2, 0, -1);
                f.bar({ position: bigPanelLeft[0].pointFromEnd(p.fingerAnkerFront), to: bigPanelLeft[y].pointFromEnd(p.fingerAnkerBack), extend: [hypo2 - shortenLeg + p.diagonalLegExtension, 40] });
                f.pop();
            }

        };
    };

    f.pop();

    if (!preview && p.joinAll == true) {
        f.joinAll();
    };
};

/* Return the meta information and build function */
return [meta, build];