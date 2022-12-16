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
    events();
    console.dir(GREETINGS.length);
}


function events() {
    var currentIdNum = 0;
    var sectionDots = document.getElementById("section-dots");
    var btnChangeMode = document.getElementById("btn-change-mode");
    var txtYouAreHere = document.getElementById("txt-you-here");

    document.querySelectorAll('.rect').forEach(item => {
        item.addEventListener('mouseenter', event => {
            currentIdNum = parseInt(event.target.id.replace( /^\D+/g, ''));
            if (currentIdNum !== INI_SELECTED_POINT) {
                txtYouAreHere.classList.add("--hide");
            } else {
                txtYouAreHere.classList.remove("--hide");
            }
        })
    }, false);

    document.addEventListener("scroll", (event) => {
        sectionDots.classList.add("--animate-fadein");
    });

    btnChangeMode.addEventListener('click', event => {
        console.log (event.target.id);
        document.body.classList.toggle("--light-mode");
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
        svgObj += " <rect " // Interaction area rectangle outside each circle
                    + "id='rect" + i
                    + "'class='rect'"
                    + " x='" + (dots[i].x - (X_SPACING / 2))    
                    + "' y='"+ (dots[i].y - (Y_SPACING / 2))
                    + "' width='" + X_SPACING  
                    + "' height='" + Y_SPACING
                    + "' />\n";

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
                    + " dur='"+ Math.floor(Math.random() * (7 - 2 + 1)) + 2  + "s' repeatCount='indefinite' \n/>"
                    + " </circle>";
    }

    svgObj += "</g> \n"
    appendSvg(svgObj);
}


function appendSvg(_svgObj) {
    var e = document.getElementById("svgContainer");
    e.innerHTML += _svgObj;
}


window.onload = init;