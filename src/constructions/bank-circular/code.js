let params = [

    { name: "barSize", label: "Latten Maße", value: 34, step: 0.5, unit: "mm", description: "Hier bitte die Länge der Latte aus dem Baumarkt eintragen." },

    //{ name: "divider", label: " ",  description: "Divider"},

    { name: "width", label: "Breite", value: 1200, min: 400, max: 1500, step: 10, unit: "mm", description: "Gesamtbreite der Konstruktion" },
    { name: "height", label: "Höhe", value: 400, min: 300, max: 500, step: 10, unit: "mm", description: "Gesamtbreite der Konstruktion" },
    { name: "depth", label: "Tiefe", value: 300, min: 250, max: 500, step: 10, unit: "mm", description: "Gesamttiefe der Konstruktion" },


    { name: "BracingHeight", label: "Höhe Verstrebung", value: 130, min: 100, max: 300, step: 10, unit: "mm" },
    { name: "SeatingGap", label: "Lücke der Sitzlatten", value: 11, min: 3, max: 40, step: 1, unit: "mm", description: "Zielabstand (nicht jeder Wert ist umsetzbar)" },
    //{ name: "panelT", label: "Plattendicke", value: 15, min: 5, max: 40, step: 1, unit: "mm" },




    { name: "divider", label: " ", description: "Divider" },
    { name: "divider1", label: "1. individuelle Latte ", description: "Divider" },

    { name: "bar1_length", label: "Länge 1.Latte:", value: 400, unit: "mm", description: "Länge der Latte in mm" },
    { name: "bar1_widthA", label: "SeiteA 1.Latte:", value: 70, unit: "mm", description: "Kantenbreite der Latte in mm" },
    { name: "bar1_widthB", label: "SeiteB 1.Latte:", value: 150, unit: "mm", description: "Kantenbreite der Latte in mm" },

    { name: "bar1_color", label: "Farbe 1.Latte:", value: "#56A490", description: "Gib der Latte eine Farbe" }, //170DD6 // #0C568A
    { name: "bar1", label: "diese Latte nutzen?", value: true },





    { name: "divider", label: " ", description: "Divider" },
    { name: "divider2", label: "2. individuelle Latte", description: "Divider" },

    //{ name: "divider", label: " ",  description: "Divider"},

    { name: "bar2_length", label: "Länge 2.Latte:", value: 400, unit: "mm", description: "Länge der Latte in mm" },
    { name: "bar2_widthA", label: "SeiteA 2.Latte:", value: 100, unit: "mm", description: "Kantenbreite der Latte in mm" },
    { name: "bar2_widthB", label: "SeiteB 2.Latte:", value: 70, unit: "mm", description: "Kantenbreite der Latte in mm" },

    { name: "bar2_color", label: "Farbe 2.Latte:", value: "#730D30", description: "Gib der Latte eine Farbe" }, //DB452A
    { name: "bar2", label: "diese Latte nutzen?", value: true },





    { name: "divider", label: " ", description: "Divider" },
    { name: "divider3", label: "3. individuelle Latte", description: "Divider" },

    { name: "bar3_length", label: "Länge 3.Latte:", value: 400, unit: "mm", description: "Länge der Latte in mm" },
    { name: "bar3_widthA", label: "SeiteA 3.Latte:", value: 150, unit: "mm", description: "Kantenbreite der Latte in mm" },
    { name: "bar3_widthB", label: "SeiteB 3.Latte:", value: 70, unit: "mm", description: "Kantenbreite der Latte in mm" },

    { name: "bar3_color", label: "Farbe 3.Latte:", value: "#395B79", description: "Gib der Latte eine Farbe" }, //8e979c  //B2C8DA
    { name: "bar3", label: "diese Latte nutzen?", value: true },




    { name: "divider", label: " ", description: "Divider" },
    { name: "divider4", label: "4. individuelle Latte", description: "Divider" },

    { name: "bar4_length", label: "Länge 4.Latte:", value: 1800, unit: "mm", description: "Länge der Latte in mm" },
    { name: "bar4_widthA", label: "SeiteA 4.Latte:", value: 100, unit: "mm", description: "Kantenbreite der Latte in mm" },
    { name: "bar4_widthB", label: "SeiteB 4.Latte:", value: 70, unit: "mm", description: "Kantenbreite der Latte in mm" },

    { name: "bar4_color", label: "Farbe 4.Latte:", value: "#E8F8F6", description: "Gib der Latte eine Farbe" }, //D9B2B7
    { name: "bar4", label: "diese Latte nutzen?", value: true },


    { name: "divider", label: " ", description: "Divider" },


    { name: "debug", label: "Debug", value: false, hidden: true },
    { name: "joinAll", label: "Join All", value: true, hidden: true },
];

let steps = [
    { groupName: "leftFrame", prefix: "A", label: "Linker Rahmen", description: "Das linke Seitenteil besteht aus vier Latten. Achte darauf, dass Du die richtigen individuellen Latten nutzt." },
    { groupName: "rightFrame", prefix: "B", label: "Rechter Rahmen", description: "Das rechte Seitenteil besteht aus vier weiteren Latten." },
    { groupName: "breacing", prefix: "C", label: "Verstrebung", description: "Die beiden Seitenteile werden mit einer Latte verbunden." },
    { groupName: "seat", prefix: "D", label: "Sitzebene", description: "Diese Latten ergeben die Sitzfläche. - fertig!" },

];

let meta = {
    name: "Bank Circular",
    description: "In diesem Entwurf einer Sitzbank, ist es möglich vorhandene Latten zu integrieren. Nach dem Gedanken der zirkulären Rohstoffnutzung kannst Du Holz oder Latten und Balken aus anderen Materialen einbauen, die Dir zur Verfügung stehen. Diese Latten müssen keinen quadratischen Querschnitt haben, denn Du kannst die Länge der Latten sowie die unterschiedlichen Seitenlängen (A und B) in dem Tool eintragen. Dir werden diese farblich markiert, damit Du die Übersicht behältst.",
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

    // randomize values:
    let randomValue = 200;
    if (p.zufall == true) {
        p.width = p.width + (Math.random() * randomValue) - (Math.random() * randomValue);
        p.height = p.height + (Math.random() * randomValue) - (Math.random() * randomValue);
        p.depth = p.depth + (Math.random() * randomValue) - (Math.random() * randomValue);
    }

    // create customBar array

    //count customs bars ferom UI
    var customBarCount = 0;
    var nextBarWidth = b;

    let widthA_leftRearLeg = b;
    let widthB_leftRearLeg = b;

    let widthA_leftFrontLeg = b;
    let widthB_leftFrontLeg = b;

    let widthA_rightFrontLeg = b;
    let widthB_rightFrontLeg = b;

    let widthA_rightRearLeg = b;
    let widthB_rightRearLeg = b;

    if (p.bar1 == true) {
        customBarCount = customBarCount + 1;
    }
    if (p.bar2 == true) {
        customBarCount = customBarCount + 1;
    }
    if (p.bar3 == true) {
        customBarCount = customBarCount + 1;
    }
    if (p.bar4 == true) {
        customBarCount = customBarCount + 1;
    }

    let bar1_gone = false;
    let bar2_gone = false;
    let bar3_gone = false;
    let bar4_gone = false;

    let color;
    let colorSet = false;

    var customBar = [
  [p.bar1, p.bar1_length, p.bar1_widthA, p.bar1_widthB, p.bar1_name, bar1_gone, p.bar1_color],
  [p.bar2, p.bar2_length, p.bar2_widthA, p.bar2_widthB, p.bar2_name, bar2_gone, p.bar2_color],
  [p.bar3, p.bar3_length, p.bar3_widthA, p.bar3_widthB, p.bar3_name, bar3_gone, p.bar3_color],
  [p.bar4, p.bar4_length, p.bar4_widthA, p.bar4_widthB, p.bar4_name, bar4_gone, p.bar4_color]
];

    // grab bar funktion

    function grabAndCutStockBar(length, side) {

        for (y = 0; y < customBar.length; y++) {

            if (customBar[y][0] == true && customBar[y][5] == false && customBar[y][1] >= length) {

                if (side == 1) { //side A = 1
                    color = customBar[y][6];
                    colorSet = true;
                    return customBar[y][2];
                    break;

                } else if (side == 2) { //side B = 2

                    customBar[y][1] = customBar[y][1] - length; // erst bei side B wird die Länge der Stockbar benschitten

                    if (customBar[y][1] <= 0) {
                        customBar[y][5] = true; // erst bei side B wird die Latte auf used gesetzt
                    }
                    color = customBar[y][6];
                    colorSet = true;
                    return customBar[y][3];
                    break;
                }
            }
            colorSet = false;
        }
        return b;
    }

    function grabAndCutStockBarB(length) {

        for (y = 0; y < customBar.length; y++) {

            if (customBar[y][0] == true && customBar[y][5] == false && customBar[y][1] >= length) {
                customBar[y][1] = customBar[y][1] - length;
                if (customBar[y][1] <= 0) {
                    customBar[y][5] = true;
                }
                return customBar[y][3];
                break;
            }
        }
        return b;
    }

    // place objects

    //boxes
    f.push();
    f.move(-100, p.boxTiefe / 2, 0);
    for (i = 0; i < p.BoxCount; i++) {
        f.move(-(p.boxBreite + 100), 0, 0);
        f.panel({ size: [p.boxBreite, p.boxTiefe], thickness: p.boxHöhe });
        f.move(0, -300, 0);
        f.marker({ radius: 100, color: p.boxcolor });
        f.move(0, 300, 0);
    }
    f.pop();

    // construction

    //Front Legs
    //log("Pups");
    //console.log(customBar[0][1]); // 9

    f.push();
    widthA_leftFrontLeg = grabAndCutStockBar(p.height, 1); //get with a / 1 
    widthB_leftFrontLeg = grabAndCutStockBar(p.height, 2); //get with b / 2 

    //widthB_leftFrontLeg = grabAndCutStockBarB(p.height);

    f.moveGrid(1, 1, 0);
    f.move(-(widthA_leftFrontLeg / 2), -(widthB_leftFrontLeg / 2), 0);
    f.group("leftFrame");

    if (colorSet == true) {
        f.barZ({ position: [0, 0, 0], size: [widthA_leftFrontLeg, widthB_leftFrontLeg], length: p.height, color: color });
    } else {
        f.barZ({ position: [0, 0, 0], size: [widthA_leftFrontLeg, widthB_leftFrontLeg], length: p.height });
    }

    f.pop();

    f.push();
    f.moveGrid(-1, 1, 0);
    f.move(p.width, 0, 0);
    //f.moveGrid(-0.5, 0, 0);

    f.group("rightFrame");
    widthA_rightFrontLeg = grabAndCutStockBar(p.height, 1);
    widthB_rightFrontLeg = grabAndCutStockBar(p.height, 2);

    f.move((widthA_rightFrontLeg / 2), -(widthB_rightFrontLeg / 2), 0);

    if (colorSet == true) {
        f.barZ({ position: [0, 0, 0], size: [widthA_rightFrontLeg, widthB_rightFrontLeg], length: p.height, color: color });
    } else {
        f.barZ({ position: [0, 0, 0], size: [widthA_rightFrontLeg, widthB_rightFrontLeg], length: p.height });
    }

    f.pop();

    //Rear Legs

    widthA_leftRearLeg = grabAndCutStockBar(p.height, 1);
    widthB_leftRearLeg = grabAndCutStockBar(p.height, 2);

    f.push();
    f.move(0, p.depth, 0);
    f.moveGrid(1, -1, 0);
    f.move(-(widthA_leftRearLeg / 2), (widthB_leftRearLeg / 2), 0);
    f.group("leftFrame");

    if (colorSet == true) {
        f.barZ({ position: [0, 0, 0], size: [widthA_leftRearLeg, widthB_leftRearLeg], length: p.height, color: color });
    } else {
        f.barZ({ position: [0, 0, 0], size: [widthA_leftRearLeg, widthB_leftRearLeg], length: p.height });
    }
    f.pop();

    widthA_rightRearLeg = grabAndCutStockBar(p.height, 1);
    widthB_rightRearLeg = grabAndCutStockBar(p.height, 2);

    f.push();
    f.move(p.width, p.depth, 0);
    f.moveGrid(-1, -1, 0);
    f.move((widthA_rightRearLeg / 2), (widthB_rightRearLeg / 2), 0);
    f.group("rightFrame");
    if (colorSet == true) {
        f.barZ({ position: [0, 0, 0], size: [widthA_rightRearLeg, widthB_rightRearLeg], length: p.height, color: color });
    } else {
        f.barZ({ position: [0, 0, 0], size: [widthA_rightRearLeg, widthB_rightRearLeg], length: p.height });
    }
    f.pop();

    //buttoms slats of frames 

    // width_leftButtomRail
    widthA_leftButtomRail = grabAndCutStockBar(p.depth - (2 * b) + widthB_leftFrontLeg + widthB_leftRearLeg, 1);
    widthB_leftButtomRail = grabAndCutStockBar(p.depth - (2 * b) + widthB_leftFrontLeg + widthB_leftRearLeg, 2);

    f.push();
    f.moveGrid(1, 1, 0.5);
    f.move(widthA_leftButtomRail / 2, 0, -widthB_leftButtomRail / 2);

    f.move(0, -widthB_leftFrontLeg, 0);
    f.move(0, 0, p.BracingHeight);
    f.group("leftFrame");
    if (colorSet == true) {
        f.barY({ position: [0, 0, 0], size: [widthA_leftButtomRail, widthB_leftButtomRail], length: p.depth - (2 * b) + widthB_leftFrontLeg + widthB_leftRearLeg, color: color });
    } else {
        f.barY({ position: [0, 0, 0], size: [widthA_leftButtomRail, widthB_leftButtomRail], length: p.depth - (2 * b) + widthB_leftFrontLeg + widthB_leftRearLeg });
    }
    f.pop();

    // width_rightButtomRail
    widthA_rightButtomRail = grabAndCutStockBar(p.depth - (2 * b) + widthB_rightFrontLeg + widthB_rightRearLeg, 1);
    widthB_rightButtomRail = grabAndCutStockBar(p.depth - (2 * b) + widthB_rightFrontLeg + widthB_rightRearLeg, 2);

    f.push();
    f.move(p.width, 0, 0);
    f.moveGrid(-1, 1, 0.5);
    f.move(-widthA_rightButtomRail / 2, 0, -widthB_rightButtomRail / 2);

    f.move(0, -widthB_rightFrontLeg, 0);
    f.move(0, 0, p.BracingHeight);
    f.group("rightFrame");
    if (colorSet == true) {
        f.barY({ position: [0, 0, 0], size: [widthA_rightButtomRail, widthB_rightButtomRail], length: p.depth - (2 * b) + widthB_rightFrontLeg + widthB_rightRearLeg, color: color });
    } else {
        f.barY({ position: [0, 0, 0], size: [widthA_rightButtomRail, widthB_rightButtomRail], length: p.depth - (2 * b) + widthB_rightFrontLeg + widthB_rightRearLeg });
    }
    f.pop();

    //breacing

    //width_breacing
    widthA_breacing = grabAndCutStockBar(p.width - 2 * b, 1);
    widthB_breacing = grabAndCutStockBar(p.width - 2 * b, 2);

    f.push();
    f.moveGrid(1, 0, -0.5);
    f.move(0, 0, widthA_breacing / 2);

    f.move(0, p.depth / 2, p.BracingHeight);
    f.moveGrid(0, 0, 1);
    f.group("breacing");
    if (colorSet == true) {
        f.barX({ position: [0, 0, 0], size: [widthA_breacing, widthB_breacing], length: (p.width - 2 * b), color: color });
    } else {
        f.barX({ position: [0, 0, 0], size: [widthA_breacing, widthB_breacing], length: (p.width - 2 * b) });
    }

    f.pop();

    //Top slats of frames

    // width_leftTopRail
    widthA_leftTopRail = grabAndCutStockBar(p.depth - (2 * b) + widthB_leftFrontLeg + widthB_leftRearLeg, 1);
    widthB_leftTopRail = grabAndCutStockBar(p.depth - (2 * b) + widthB_leftFrontLeg + widthB_leftRearLeg, 2);

    f.push();
    f.moveGrid(1, 1, 0.5);
    f.move(widthA_leftTopRail / 2, 0, -widthB_leftTopRail / 2);

    f.move(0, 0, p.height);
    f.moveGrid(0, 0, -1.5);
    f.move(0, -widthB_leftFrontLeg, 0);
    //f.move(0, 0, p.BracingHeight);
    f.group("leftFrame");
    if (colorSet == true) {
        f.barY({ position: [0, 0, 0], size: [widthA_leftTopRail, widthB_leftTopRail], length: p.depth - (2 * b) + widthB_leftFrontLeg + widthB_leftRearLeg, color: color });
    } else {
        f.barY({ position: [0, 0, 0], size: [widthA_leftTopRail, widthB_leftTopRail], length: p.depth - (2 * b) + widthB_leftFrontLeg + widthB_leftRearLeg });
    }
    f.pop();

    //width_rightTopRail
    widthA_rightTopRail = grabAndCutStockBar(p.depth - (2 * b) + widthB_rightFrontLeg + widthB_rightRearLeg, 1);
    widthB_rightTopRail = grabAndCutStockBar(p.depth - (2 * b) + widthB_rightFrontLeg + widthB_rightRearLeg, 2);

    f.push();
    f.move(p.width, 0, 0);
    f.move(0, 0, p.height);
    f.moveGrid(0, 0, -1);
    f.moveGrid(-1, 1, 0);
    f.move(-widthA_rightTopRail / 2, 0, -widthB_rightTopRail / 2);

    f.move(0, -widthB_rightFrontLeg, 0);
    //f.move(0, 0, p.BracingHeight);
    f.group("rightFrame");
    if (colorSet == true) {
        f.barY({ position: [0, 0, 0], size: [widthA_rightTopRail, widthB_rightTopRail], length: p.depth - (2 * b) + widthB_rightFrontLeg + widthB_rightRearLeg, color: color });
    } else {
        f.barY({ position: [0, 0, 0], size: [widthA_rightTopRail, widthB_rightTopRail], length: p.depth - (2 * b) + widthB_rightFrontLeg + widthB_rightRearLeg });
    }
    f.pop();

    //seating slats:

    f.group("seat");

    f.push();

    f.move(0, 0, p.height - b);

    f.moveGrid(0, 1.5, 0.5);

    let barCount = Math.round((p.depth - (3 * b)) / (b + p.SeatingGap));
    let spacing = (p.depth - 3 * b) / (barCount);

    for (let i = 0; i < barCount; i++) {
        if (i == 0) {
            f.moveGrid(1, 0, 0);
            f.move(-widthA_leftFrontLeg, 0, 0);
            f.barX({ position: [0, 0, 0], length: p.width - (2 * b) + widthA_rightFrontLeg + widthA_leftFrontLeg }); //erste SitzLatte Länge angepasst an front legs
            f.move(0, spacing, 0);
            f.move(+widthA_leftFrontLeg, 0, 0);
            f.moveGrid(-1, 0, 0);
        } else {
            f.barX({ position: [0, 0, 0], length: p.width });
            f.move(0, spacing, 0);
        }
    }
    f.pop();

    //letze hintere Sitzstrebe:

    f.push();
    f.move(0, 0, p.height - (b / 2));
    f.move(0, p.depth - b - (b / 2), 0);
    f.moveGrid(1, 0, 0);

    f.move(-widthA_leftRearLeg, 0, 0);
    f.barX({ position: [0, 0, 0], length: p.width - (2 * b) + widthA_rightRearLeg + widthA_leftRearLeg }); //letzt, hinterste SitzLatte Länge angepasst an rear legs

    f.pop();

    // Mittelsterebe bei über 1meter breite:

    if (p.width > 1000) {
        f.push();
        f.move(p.width / 2, b, p.height - (b * 1.5));
        f.barY({ position: [0, 0, 0], length: p.depth - 2 * b });
        f.pop();
    }

    if (!preview && p.joinAll == true) {
        f.joinAll();
    }

};

/* Return the meta information and build function */
return [meta, build];