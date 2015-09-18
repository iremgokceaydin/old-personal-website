/* THINGS MOVINGGGGGG!!
Code modified from http://jsdo.it/
_________________________________________________ */


var space;
var rgb = Canvas2d.rgb;
var rgba = Canvas2d.rgba;

var ps = [];
var t = 0;
var bgStyle; 

function r(min, max) {
    return Math.random() * (max - min) + min;
}

function createBgStyle() {
    var h = space.height;

    return space.
    createRadialGradient(h * 0.2, 0, 0, h * 0.2, 0, h * 1.5).
    addColorStop(0.0, rgb(7, 93, 94)).
    addColorStop(1.0, rgb(35,32, 51));
}

window.onload = function() {
    space = Canvas2d().appendTo("container");
    space.width = document.body.clientWidth; 
    space.height = document.body.clientHeight; 
    for (var i = 0; i < 200; ++i) {
        ps.push(Point3d(r(-100, 100), r(-100, 100), r(-100, 100)));
    }
    
    bgStyle = createBgStyle();
    window.setInterval(oninterval, 1000 / 24);
    space.onresize(onresize);
};


function onresize() {
    --t;
    bgStyle = createBgStyle();
    oninterval();
}

function oninterval() {
    var angle, i, p, scale, cs = [], c, radius;

    space.fillStyle(bgStyle).fillRect();
    angle = Point3d.createAngleFromYPR(t * 0.005, t * 0.010, t * 0.015);

    for (i = 0; i < ps.length; ++i) {
        p = ps[i].clone();

        p.rotate(angle);
        p.z -= 100;

        scale = -space.height / p.z;
        cs.push({
            x: space.width  * 0.5 + p.x * scale,
            y: space.height * 0.5 - p.y * scale,
            z: p.z,
            scale: scale
        });
    }


    for (i = 0; i < cs.length; ++i) {
        c = cs[i];
        radius = c.scale * 2;

        if (c.z > 0 || c.y + radius < 0 || c.y - radius > space.height || c.x + radius < 0 || c.x - radius > space.width) continue;

        // stars
        space.
        createRadialGradient(c.x, c.y, radius * 0.5, c.x, c.y, radius).
        addColorStop(0.0, rgba(26, 87, 86, Math.sin((t + i) * 0.2) * 0.4 + 0.4)).
        addColorStop(1.0, rgba(26, 87, 86, 0)).
        fillStyle().
        fillCircle(c.x, c.y, radius);
    }

    ++t;
}