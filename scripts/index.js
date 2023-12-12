const {
    Engine,
    Render,
    Runner,
    World,
    Bodies,
    MouseConstraint,
    Mouse,
    Events
} = Matter;

const width = window.innerWidth;
const height = window.innerHeight;

const engine = Engine.create();
const {world} = engine;
const render = Render.create({
    element: document.body,
    engine: engine,
    options: {
        wireframes: false,
        width,
        height,
        background: 'rgb(0,0,0)'
    }
});
Render.run(render);
Runner.run(Runner.create(), engine);
const mouseConstraint = MouseConstraint.create(engine, {
    mouse: Mouse.create(render.canvas)
});
World.add(world, mouseConstraint);

function createRandomObject(x, y, size) {
    switch (Math.floor(Math.random() * 4)) {
        case 0:
            return Bodies.trapezoid(x, y, size, size, 1, {label: 'ball'});
        case 1:
            return Bodies.rectangle(x, y, size, size, {label: 'ball'});
        case 2:
            return Bodies.circle(x, y, size, {label: 'ball'});
        default:
            const numberOfEdges = Math.floor(Math.random() * 6) + 4;
            return Bodies.polygon(x, y, numberOfEdges, size, {label: 'ball'});
    }
}

setInterval(() => {
    let newObject = createRandomObject(Math.random() * width, -height / 4, width / 24, 2);
    World.add(world, newObject);
    setTimeout(() => {
        World.remove(world, newObject);
        newObject = null;
    }, 5000);
}, 1000);

const typingSpeed = 100;
const welcomeMessage = "Welcome to my homepage. It is still under construction. ☺️";
const messageSection = document.querySelector("h1");
let counter = 0;
let interval = setInterval(() => {
    if (counter < welcomeMessage.length) {
        messageSection.innerText = welcomeMessage.slice(0, counter) + "_";
        counter++;
    } else {
        messageSection.innerText = welcomeMessage;
        clearInterval(interval);
        interval = null;
    }
}, typingSpeed);

