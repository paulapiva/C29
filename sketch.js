const Engine = Matter.Engine;
const Render = Matter.Render;
const World = Matter.World;
const Bodies = Matter.Bodies;
const Constraint = Matter.Constraint;
const Body = Matter.Body;
const Composites = Matter.Composites;
const Composite = Matter.Composite;

let engine;
let world;
var ground;
var fruit, rope;
var fruit_con;

function setup() {
  createCanvas(500, 700);
  frameRate(80);
  engine = Engine.create();
  world = engine.world;

  var optF={
    density:.001,
  }
  fruit = Bodies.circle(300, 300, 20, optF);
  
  ground = new Ground(200, 680, 600, 20);
  rope = new Rope(7, { x: 245, y: 30 }); //elos, pointA
  Composite.add(rope.body, fruit); //nome composite, corpo

  fruit_con = new Link(rope, fruit);

  rectMode(CENTER);
  ellipseMode(RADIUS);
  textSize(50);
}

function draw() {
  background(51);
  Engine.update(engine);

  ground.display();
  rope.display();
  ellipse(fruit.position.x, fruit.position.y, 30);
  
  
}
