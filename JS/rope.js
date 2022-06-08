class Rope {
  constructor(nlink, pointA) { //numero links e ponto de conexão
    this.nlink = nlink;
    const group = Body.nextGroup(true);

    //criação de um novo composite com vários corpos
    // usa os limites do corpo para evitar sobreposições
    //(xx, yy, columns, rows, columnGap, rowGap, callback)) gap=espaço / callback =função
    const rects = Composites.stack(
      100, 100, this.nlink, 1, 5, 5,function (x, y) {
        //retorno da função sera um retangulo
        return Bodies.rectangle(x, y, 30, 5, { 
          //grupo de colisão q o corpo pertence
          collisionFilter: { group: group },
        });
      }
    );

    this.pointA = pointA;
    //Encadeia todos os corpos no composto fornecido
    //(corpo do composite, xOffsetA, yOffsetA, xOffsetB, yOffsetB, options) 
    this.body = Composites.chain(rects, 0.1, 0, -0.6, 0, {
      //options
      stiffness: 0.1,
      length: 0.1,
      render: { type: "line" }, //aparência
    });

    World.add(engine.world, this.body);

    //( composite, objeto )
    Composite.add(rects, Constraint.create({//matriz de corpo(s), restrição(ões) ou composto(s)
                              pointA: this.pointA,
                              bodyB: rects.bodies[0],
                              pointB: { x: -25, y: 0 },
                              length: 10,
                              stiffness: 0.1,
                             })
    );
  }



  display() {
    if (this.body != null) {
      for (let i = 0; i < this.body.bodies.length - 1; i++) {
        this.drawVertices(this.body.bodies[i].vertices);
      }
    }
  }

  

  


  
  break() {
    //Matter.Composite.clear(this.rope,true);
    this.body = null;
  }



  drawVertices(vertices) {
    beginShape();
    fill("#FFF717");
    noStroke();

    for (let i = 0; i < vertices.length; i++) {
      vertex(vertices[i].x, vertices[i].y);
    }
    endShape(CLOSE);
  }

  showConstraints(constraints) {
    if (constraints != null) {
      for (let i = 0; i < constraints.length; i++) {
        this.drawConstraint(constraints[i]);
      }
    }
  }

  drawConstraint(constraint) {
    if (constraint != null) {
      const offsetA = constraint.pointA;
      let posA = { x: 0, y: 0 };
      if (constraint.bodyA) {
        posA = constraint.bodyA.position;
      }
      const offsetB = constraint.pointB;
      let posB = { x: 0, y: 0 };
      if (constraint.bodyB) {
        posB = constraint.bodyB.position;
      }
      push();
      strokeWeight(4);
      stroke(255);
      line(
        posA.x + offsetA.x,
        posA.y + offsetA.y,
        posB.x + offsetB.x,
        posB.y + offsetB.y
      );
      pop();
    }
  }
}
