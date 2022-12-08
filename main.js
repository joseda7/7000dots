const NUM_DOTS = 7000; // 7000
const WIDTH_POINTS = 70; // 70 * 100 = 7000
const HEIGHT_POINTS = 100; // 70 * 100 = 7000
const X_SPACING = 3.8;
const Y_SPACING = 3.8;
const RADIUS_DOT_DEFAULT = 1;
const MARGIN_TOP = 1.8;
const MARGIN_LEFT = 1.8;
const COLOR_PALETTE = ['#6429CD'];
const MAX_CONECTIONS = 100;
const ILLUSION_FACTOR = 1.8;
let dots = [];


function init() {    
    createDotsRectangle( WIDTH_POINTS, HEIGHT_POINTS );
    drawDotsIllusion( "star", 0, 5 );
    events();
}

function events() {
    var currentIdNum = 0;
    var illusionElement = document.getElementById("illusionGroup");

    document.querySelectorAll('.dot').forEach(item => {
        item.addEventListener('mouseenter', event => {
            currentIdNum = parseInt(event.target.id.replace( /^\D+/g, ''));
            illusionElement.style.transform = "translate(" + (dots[currentIdNum].x - dots[0].x) + "px," 
                                + (dots[currentIdNum].y - dots[0].y) +"px)";
        })
        // item.addEventListener('mouseleave', event => {
        //     console.log("mouseleave");
        // })
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
                    // + "' r='" + (0.8 + 0.2 * Math.sin( (i * Math.PI / 2500) - 700 * Math.cos(i*Math.PI)))  
                    + "' fill='" + dots[i].color
                    + "' /> \n";
    }
    
    svgObj += "</g> \n"
    appendSvg(svgObj);
}

function drawDotsIllusion ( _illusionType, _id, _spreadRadius ) {
    var currIniId = _id
    var spreadRadius = _spreadRadius; 
    var svgObj = "<g id='illusionGroup'> \n";
    var dotsIllusion = []; // New dots array with illlusion FX
    var factorSign = {
        0: [1, 1],      1: [1, -1], 
        2: [-1, 1],     3: [-1, -1], 
        4: [0 , 1],     5: [1, 0], 
        6: [0 , -1],    7: [-1, 0]
    };

    for (var i = 0; i < Object.keys(factorSign).length; i++) {
        for (var j = 1; j < spreadRadius; j++) {
            var currX = (dots[currIniId].x) + (X_SPACING * j * Object.values(factorSign)[i][0]);
            var currY = (dots[currIniId].y) + (Y_SPACING * j * Object.values(factorSign)[i][1]);
            // if (
            //     currX <= dots[NUM_DOTS - 1].x && currY <= dots[NUM_DOTS - 1].y  // Border conditions
            //     && currX >= dots[0].x && currY >= dots[0].y
            // ){
                dotsIllusion.push({
                    x: currX,
                    y: currY, 
                    color: dots[currIniId].color,
                    r: (RADIUS_DOT_DEFAULT * ILLUSION_FACTOR) - (j * RADIUS_DOT_DEFAULT / spreadRadius) 
                })             
            // } 
        }
    }

    for (var i = 0; i < dotsIllusion.length ; i++) {
        svgObj += " <circle class='illusionGroup_dot'"
            + "cx='" + dotsIllusion[i].x    
            + "' cy='"+ dotsIllusion[i].y 
            + "' r='" + dotsIllusion[i].r
            + "' fill='" + dotsIllusion[i].color
            // + "' style='stroke:white; stroke-width:0.2'"
            + "' /> \n";
    }

    svgObj += " <circle class='illusionGroup_dot'"
            + "cx='" + dots[currIniId].x    
            + "' cy='"+ dots[currIniId].y 
            + "' r='" + RADIUS_DOT_DEFAULT * ILLUSION_FACTOR
            + "' fill='" + "white"
            // + "' style='stroke:white; stroke-width:0.2'"
            + "' /> \n";

    svgObj += "</g> \n";
    appendSvg(svgObj);
}

function appendSvg(_svgObj) {
    var e = document.getElementById("svgContainer");
    e.innerHTML += _svgObj;
}

window.onload = init;