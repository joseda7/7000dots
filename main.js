const NUM_DOTS = 7000; // 7000
const WIDTH_POINTS = 70; // 70 * 100 = 7000
const HEIGHT_POINTS = 100; // 70 * 100 = 7000
const X_SPACING = 3.8;
const Y_SPACING = 3.8;
const RADIUS_DOT_DEFAULT = 1.2;
const MARGIN_TOP = 1.8;
const MARGIN_LEFT = 1.8;
const COLOR_PALETTE = ['#6429CD'];
const INI_SELECTED_POINT = 34;
const ILLUSION_FACTOR = 1.3;
let dots = [];


function init() {    
    createDotsRectangle( WIDTH_POINTS, HEIGHT_POINTS );
    drawDotsIllusion( "circle", INI_SELECTED_POINT, 10 );
    events();
}

function events() {
    var currentIdNum = 0;
    var illusionElement = document.getElementById("illusionGroup");
    var btnChangeMode = document.getElementById("btn-change-mode");
    var txtYouAreHere = document.getElementById("txt-you-here");

    document.querySelectorAll('.dot').forEach(item => {
        item.addEventListener('mouseenter', event => {
            currentIdNum = parseInt(event.target.id.replace( /^\D+/g, ''));
            illusionElement.style.transform = "translate(" + (dots[currentIdNum].x - dots[INI_SELECTED_POINT].x) + "px," 
                                + (dots[currentIdNum].y - dots[INI_SELECTED_POINT].y) +"px)";
            if (currentIdNum !== INI_SELECTED_POINT) {
                txtYouAreHere.classList.add("--hide");
            } else {
                txtYouAreHere.classList.remove("--hide");
            }
        })
    }, false);

    btnChangeMode.addEventListener('click', event => {
        console.log (event.target.id);
        document.body.classList.toggle("--light");
    }, false);
}

function createDotsRectangle( _numDotsX, _numDotsY ) {
    var svgObj = "<g id='dotsRectangle'> \n";
    var currPosition = { x: MARGIN_LEFT, y: MARGIN_TOP };
    var counter = 0;
    
    // Fill dots arr
    for(var i = 0; i < _numDotsY; i++) {
        for(var j = 0; j < _numDotsX; j++) {
            dots.push({ 
                id: counter,
                x: currPosition.x, 
                y: currPosition.y, 
                color: COLOR_PALETTE[Math.floor(Math.random()*COLOR_PALETTE.length)],
                r: RADIUS_DOT_DEFAULT
            });
            counter ++;
            currPosition.x += X_SPACING;
        }
        currPosition.x = MARGIN_LEFT;
        currPosition.y += Y_SPACING;
    }
    
    // Draw svg circles
    for(var i = 0; i < dots.length; i++) {
        svgObj += " <circle "
                    + "id='dot" + i
                    + "'class='dot'"
                    + "cx='" + dots[i].x    
                    + "' cy='"+ dots[i].y 
                    + "' r='" + dots[i].r  
                    + "' fill='" + dots[i].color
                    + "' >\n"
                    + " <animate attributeName='r'"
                    + " values=" + (RADIUS_DOT_DEFAULT - 0.5) + ";" + RADIUS_DOT_DEFAULT + ";" + (RADIUS_DOT_DEFAULT - 0.5) 
                    + " dur='"+ Math.floor(Math.random() * (7 - 3 + 1)) + 3  + "s' repeatCount='indefinite' \n/>"
                    + " </circle>";
    }

    svgObj += "</g> \n"
    appendSvg(svgObj);
}

function drawDotsIllusion ( _illusionType, _id, _spreadRadius ) {
    var currIniId = _id
    var r = _spreadRadius; 
    var svgObj = "<g id='illusionGroup'> \n";
    var dotsIllusion = []; // New dots array with illlusion FX
    // var factorSign = {
    //     0: [1, 1],      1: [1, -1], 
    //     2: [-1, 1],     3: [-1, -1], 
    //     4: [0 , 1],     5: [1, 0], 
    //     6: [0 , -1],    7: [-1, 0]
    // };

    // Illusion Circle -----------------------------------------
    var currPosition = { x: MARGIN_LEFT, y: MARGIN_TOP };
    
    var x = 0; 
    var y = 0;
    
    for (var i = 0; i < (r * 2) + 1; i++) {
        for (var j = 0; j < (r * 2) + 1; j++) {
            x = i - r; 
            y = j - r;
            if ((x ** 2) + (y ** 2) <= (r ** 2) + 1) {
                dotsIllusion.push({ 
                    x: currPosition.x + (X_SPACING * (INI_SELECTED_POINT - r)), 
                    y: currPosition.y - (X_SPACING * r),
                    color: COLOR_PALETTE[Math.floor(Math.random()*COLOR_PALETTE.length)],
                    r: (RADIUS_DOT_DEFAULT * ILLUSION_FACTOR)  
                });
            }
            currPosition.x += X_SPACING;
        }
        currPosition.x = MARGIN_LEFT;
        currPosition.y += Y_SPACING;
    }

    // Illusion Star -----------------------------------------
    // for (var i = 0; i < Object.keys(factorSign).length; i++) {
    //     for (var j = 1; j < r; j++) {
    //         var currX = (dots[currIniId].x) + (X_SPACING * j * Object.values(factorSign)[i][0]);
    //         var currY = (dots[currIniId].y) + (Y_SPACING * j * Object.values(factorSign)[i][1]);
    //         // if (
    //         //     currX <= dots[NUM_DOTS - 1].x && currY <= dots[NUM_DOTS - 1].y  // Border conditions
    //         //     && currX >= dots[0].x && currY >= dots[0].y
    //         // ){
    //             dotsIllusion.push({
    //                 x: currX,
    //                 y: currY, 
    //                 color: dots[currIniId].color,
    //                 r: (RADIUS_DOT_DEFAULT * ILLUSION_FACTOR) - (j * RADIUS_DOT_DEFAULT / r) 
    //             })             
    //         // } 
    //     }
    // }

    // console.dir(dotsIllusion);

    for (var i = 0; i < dotsIllusion.length ; i++) {
        svgObj += " <circle class='illusionGroup_dot'"
            + "cx='" + dotsIllusion[i].x    
            + "' cy='"+ dotsIllusion[i].y 
            + "' r='" + dotsIllusion[i].r
            + "' fill='" + dotsIllusion[i].color
            // + "' style='stroke:white; stroke-width:0.2'"
            + "' />\n"
            // + " <animate attributeName='r'"
            // + " values=" + ((RADIUS_DOT_DEFAULT*ILLUSION_FACTOR) - 0.5) + ";" + (RADIUS_DOT_DEFAULT*ILLUSION_FACTOR) + ";" + ((RADIUS_DOT_DEFAULT*ILLUSION_FACTOR) - 0.5) 
            // + " dur='"+ Math.floor(Math.random() * (5 - 2 + 1)) + 2  + "s' repeatCount='indefinite' \n/>"
            // + " </circle> \n";
    }

    svgObj += " <circle class='illusionGroup_dot'"
            + "cx='" + dots[currIniId].x    
            + "' cy='"+ dots[currIniId].y 
            + "' r='" + RADIUS_DOT_DEFAULT * ILLUSION_FACTOR
            + "' fill='" + "white"
            + "' style='stroke:black; stroke-width:0.2'"
            + "' /> \n";

    svgObj += "</g> \n";
    appendSvg(svgObj);
}

function appendSvg(_svgObj) {
    var e = document.getElementById("svgContainer");
    e.innerHTML += _svgObj;
}

window.onload = init;