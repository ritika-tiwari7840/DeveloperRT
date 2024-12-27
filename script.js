
var loader = document.getElementById("myCanvas");
window.addEventListener("load", function () {

  this.window.setTimeout(() => {

    loader.style.display = "none";
  }, 4000)


})

window.addEventListener('load', () => {

  const canvas = document.getElementById('myCanvas');
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
  const ctx = canvas.getContext('2d');

  class Particle {
    constructor(effect, x, y, color) {
      this.effect = effect;
      this.x = Math.random() * this.effect.canvasWidth;
      this.y = Math.random() * this.effect.canvasHeight;
      this.color = color;
      this.originX = x;
      this.originY = y;
      this.size = this.effect.gap;
      this.dx = 0; // distance between mouse cursor and this particle horizontally
      this.dy = 0; // distance between mouse cursor and this particle vertically
      this.vx = 0; // x speed 
      this.vy = 0; // y speed 
      this.force = 0; //pushing force of particles 
      this.angle = 0;//direction of the push force 
      this.distance = 0; // dist bw mouse and particle that sit in this particle space 
      this.friction = Math.random() * 0.6 + 0.15;
      this.ease = Math.random() * 0.1 + 0.005;

    }
    draw() {
      this.effect.context.fillStyle = this.color;
      this.effect.context.fillRect(this.x, this.y, this.size, this.size);

    }
    update() {

      this.dx = this.effect.mouse.x - this.x;
      this.dy = this.effect.mouse.y - this.y;
      this.distance = this.dx * this.dx + this.dy * this.dy;
      this.force = -this.effect.mouse.radius / this.distance;

      if (this.distance < this.effect.mouse.radius) {
        this.angle = Math.atan2(this.dy, this.dx);
        this.vx += this.force * Math.cos(this.angle);
        this.vy += this.force * Math.sin(this.angle);


      }
      this.x += (this.vx *= this.friction) + (this.originX - this.x) * this.ease;
      this.y += (this.vy *= this.friction) + (this.originY - this.y) * this.ease;


    }


  }

  class Effect {
    constructor(context, canvasWidth, canvasHeight) {
      this.context = context;
      this.canvasWidth = canvasWidth;
      this.canvasHeight = canvasHeight;
      this.textX = this.canvasWidth / 2;
      this.textY = this.canvasHeight / 2;

      this.fontSize = this.canvasWidth /8;
      this.maxTextWidth = this.canvasWidth * 0.8;
      this.lineHeight = this.fontSize * 0.9;

      

      // particle text
      this.particles = [];
      this.gap = 2;
      this.mouse = {
        radius: 20000,
        x: 0,
        y: 0
      };

      window.addEventListener('mousemove', (e) => {
        this.mouse.x = e.x;
        this.mouse.y = e.y;
     


      });

    }


    wrapText(text) {
      const gradient = this.context.createLinearGradient(0, 0, canvas.width, canvas.height);
      gradient.addColorStop(0.1, 'red');
      gradient.addColorStop(0.2, 'white');
      gradient.addColorStop(0.3, 'orange');
      gradient.addColorStop(0.4, 'fuchsia');
      gradient.addColorStop(0.5, 'purple');
      gradient.addColorStop(0.6, 'yellow');
      gradient.addColorStop(0.7, 'green');
      gradient.addColorStop(0.8, 'orange');
      gradient.addColorStop(0.9, 'cyan');

      // this.context.strokeStyle = "white";
      this.context.fillStyle = gradient;
      this.context.font = this.fontSize + 'px Helvetica';
      this.context.textAlign = "center";
      this.context.textBaseline = "center";
      this.lineWidth = 3;

      //breake= multiline text
      let lineArray = []; // creating an empty array to store each string of a line;
      let words = text.split(" "); // will give us the splited array of words
      let lineCounter = 0;
      let line = "";


      for (let i = 0; i < words.length; i++) {
        let textLine = line + words[i] + ' ';

        if (this.context.measureText(textLine).width > this.maxTextWidth) {

          line = words[i] + ' ';
          lineCounter++;

        } else {
          line = textLine;
        }
        lineArray[lineCounter] = line;
      }
      let textHeight = this.lineHeight * lineCounter;
      this.textY = this.canvasHeight / 2 - textHeight / 2;


      lineArray.forEach((el, index) => {
        this.context.fillText(el, this.textX, this.textY + (index * this.lineHeight));
        this.context.strokeText(el, this.textX, this.textY + (index * this.lineHeight));


      });
      this.convertToParticles();
    }


    convertToParticles() {
      this.particles = [];
      const pixels = this.context.getImageData(0, 0, this.canvasWidth, this.canvasHeight).data;
      
      for (let y = 0; y < this.canvasHeight; y += this.gap) {
        for (let x = 0; x < this.canvasWidth; x += this.gap) {
          const index = (y * this.canvasWidth + x) * 4;
          const alpha = pixels[index + 3];
          if (alpha > 0) {
            const red = pixels[index];
            const green = pixels[index + 1];
            const blue = pixels[index + 2];
            const color = 'rgb(' + red + ',' + green + ',' + blue + ')';
            this.particles.push(new Particle(this, x, y, color));

          }


        }
      }
    


    }
    render() {
      this.particles.forEach(particle => {

        particle.update();
        particle.draw();

      });


    }

  }


  const effect = new Effect(ctx, canvas.width, canvas.height); // creting instance of class Effect

  
  effect.wrapText('Welcome')


  function animate() {
    ctx.clearRect(0, 0, canvas.width, canvas.height)
    effect.render();
    requestAnimationFrame(animate);

  }
  animate();


});





let aboutLeft = document.getElementsByClassName("left")



// about section image 
let img = document.createElement('img');
img.setAttribute('class', 'about-image');
img.setAttribute('src', "image/r1.png");
window.setInterval(() => {
  let li = ["image/r1.png", "image/r2.png", "image/r3.png"]
  rand = Math.floor(Math.random() * 3)

  img.setAttribute('src', li[rand]);
}, 3000);
img.setAttribute('data-aos', 'zoom-in-up');


aboutLeft[0].appendChild(img);




//project code

let pro0 = document.getElementById('cont0')
let pro1 = document.getElementById('cont1')
let pro2 = document.getElementById('cont2')
let pro3 = document.getElementById('cont3')

let cont = document.getElementById('container')

let proWin = document.getElementById('pro-win')

function project0() {

  proWin.children[1].children[0].setAttribute('src', 'image/fmilogo.png')

  proWin.children[1].children[1].innerHTML = "FMI (Cold Storage Automation) "

  proWin.children[1].children[3].innerHTML = "A web application of cold storage automation, that automate the administration process of cold storage, and also provide interface for user(farmer) to register and perform other activities with cold storage. This application is Multilingual."
  document.getElementById('category').innerHTML = "Web Application"
  document.getElementById('year').innerHTML = "2022-2023"


  // proWin.children[1].children[5].remove()

  function setInt(FMIimg,li){
    var l = 0
      window.setInterval(() => {
       
        FMIimg.setAttribute('src', li[l])
        l = l + 1
        if (l >= li.length) {
          l = 0;
        }
      }, 3000)
   
  }
  
  
    function addimages(li,inhtml){
      var FMIimgdiv = document.createElement('div')
      FMIimgdiv.setAttribute("class", 'pages')
  
      proWin.appendChild(FMIimgdiv)
      var FMIimgspan = document.createElement('span')
      FMIimgspan.innerHTML = inhtml
      FMIimgdiv.appendChild(FMIimgspan)
      var FMIimg = document.createElement('img')
      FMIimg.setAttribute("class", "moodleimg")
      FMIimgdiv.appendChild(FMIimg)
    
  setInt(FMIimg,li)
    }
    let li = ["image/fmi.png", "image/fmi1.png", "image/fmi2.png", "image/fmi3.png", "image/fmi4.png", ]
    let li1 = ["image/fmi5.png", "image/fmi6.png", "image/fmi7.png", "image/fmi8.png", "image/fmi9.png", "image/fmi10.png"]
  
  addimages(li,'Home Panel(Interface for farmer and other user)')
  addimages(li1,'Admin Panel(admin panel to handle the work of cold storage admin)')

  
  var nextdiv=document.createElement('div')
    nextdiv.setAttribute('class','nextProject')
    proWin.appendChild(nextdiv)
    var nextdivspan=document.createElement('span')
    nextdivspan.setAttribute('class','nextProjectspan')
    nextdivspan.style.color="#f8a90b"
    nextdiv.appendChild(nextdivspan)
    nextdivspan.innerHTML="<a href=\"#focus\">next project > </a>"
    nextdivspan.addEventListener('click',function(){
      nextProject(1)
    })
  
  
  cont.style.display = 'none';
  proWin.style.display = 'flex';
}





function project1(){



  proWin.children[1].children[0].setAttribute('src', 'image/deskicon.png')

  proWin.children[1].children[1].innerHTML = "Student Desk"

  proWin.children[1].children[3].innerHTML = "A Python GUI Application represent a Physical Student Desk. Application aids student  to organize their work with document storage facilities"
  
function setInt(FMIimg,li){
  var l = 0
    window.setInterval(() => {
     
      FMIimg.setAttribute('src', li[l])
      l = l + 1
      if (l >= li.length) {
        l = 0;
      }
    }, 3000)
 
}


  function addimages(li,inhtml){
    var FMIimgdiv = document.createElement('div')
    FMIimgdiv.setAttribute("class", 'pages')

    proWin.appendChild(FMIimgdiv)
    var FMIimgspan = document.createElement('span')
    FMIimgspan.innerHTML = inhtml
    FMIimgdiv.appendChild(FMIimgspan)
    var FMIimg = document.createElement('img')
    FMIimg.setAttribute("class", "moodleimg")
    FMIimgdiv.appendChild(FMIimg)
  
setInt(FMIimg,li)
  }
  let li = ["image/notes.png", "image/notes1.png", "image/notesstore.png", "image/notesfiles.png", "image/notesfiles1.png", "image/notesdb.png"]
  let li1 = ["image/lock.png", "image/lock1.png", "image/lock2.png", "image/lock3.png"]
  let li2 = ["image/dict.png", "image/dicthis.png"]
  let li3 = ["image/game.png", "image/game1.png"]
  let li4 = ["image/whiteboard.png"]
  let li5 = ["image/trans.png"]
addimages(li,'Noteskeeper(student can store their notes(PDF, Image, Video, Audio, and in other formats also)')
addimages(li1,'Locker(student can store their sensitive information and document with authentication)')
addimages(li2,'Dictionary(student can search any word meaning, synonym and antonym)')
addimages(li3,'Games(student can play game)')
addimages(li4,'White Board(student can draw and save it also)')
addimages(li5,'Translater(student can translate in any language)')

var nextdiv=document.createElement('div')
  nextdiv.setAttribute('class','nextProject')
  proWin.appendChild(nextdiv)
  var nextdivspan=document.createElement('span')
  nextdivspan.setAttribute('class','nextProjectspan')
  nextdivspan.style.color="#f8a90b"
  nextdiv.appendChild(nextdivspan)
  nextdivspan.innerHTML="<a href=\"#focus\">next project > </a>"
  nextdivspan.addEventListener('click',function(){
    nextProject(2)
  })


cont.style.display = 'none';
proWin.style.display = 'flex';
}


function project2() {

  proWin.children[1].children[0].setAttribute('src', 'image/moodlecloud.png')

  proWin.children[1].children[1].innerHTML = "Moodle Site(Learning management System)"

  proWin.children[1].children[3].innerHTML = "A Learning Management system for Government Polytechnic Ghaziabad college departments. "
  document.getElementById('category').innerHTML = "Learning Management System"
  document.getElementById('year').innerHTML = "2022-2023"

  function addmoodleimg(inhtml, source) {
    var moodleimgdiv = document.createElement('div')
    moodleimgdiv.setAttribute("class", 'pages')

    proWin.appendChild(moodleimgdiv)
    var moodleimgspan = document.createElement('span')
    moodleimgspan.innerHTML = inhtml
    moodleimgdiv.appendChild(moodleimgspan)
    var moodleimg = document.createElement('img')
    moodleimg.setAttribute("class", "moodleimg")
    moodleimg.setAttribute("src", source)

    moodleimgdiv.appendChild(moodleimg)
   


  }

  addmoodleimg("Login Page", "image/moodle.png")
  addmoodleimg("Home Page/Courses", "image/moodle1.png")
  
  var nextdiv=document.createElement('div')
  nextdiv.setAttribute('class','nextProject')
  proWin.appendChild(nextdiv)
  var nextdivspan=document.createElement('span')
  nextdivspan.setAttribute('class','nextProjectspan')
  nextdiv.appendChild(nextdivspan)
  nextdivspan.innerHTML="<a href=\"#focus\">next project > </a>"
  nextdivspan.addEventListener('click',function(){
    nextProject(3)
  })

  cont.style.display = 'none';
  proWin.style.display = 'flex';


}


function project3() {

  proWin.children[1].children[0].setAttribute('src', 'image/htmllogo.png')

  proWin.children[1].children[1].innerHTML = "HTML and CSS Webpages"

  proWin.children[1].children[3].innerHTML = "HTML and CSS webpages that depict my HTML and CSS skills."
  document.getElementById('category').innerHTML = "HTML and CSS"
  document.getElementById('year').innerHTML = "2022-2023"

  function addHTMLimg(inhtml, source) {
    var HTMLimgdiv = document.createElement('div')
    HTMLimgdiv.setAttribute("class", 'pages')
    proWin.appendChild(HTMLimgdiv)
    var HTMLimgspan = document.createElement('span')
    HTMLimgspan.innerHTML = inhtml
    HTMLimgdiv.appendChild(HTMLimgspan)
    var HTMLimg = document.createElement('img')
    HTMLimg.setAttribute("class", "moodleimg")
    HTMLimg.setAttribute("src", source)

    HTMLimgdiv.appendChild(HTMLimg)

  }

  addHTMLimg("Horror Movie Gallery (Holliwood Horror movies with linked Trailer on you tube)", "image/html3.png")
  addHTMLimg("Newsletter", "image/html2.png")
  addHTMLimg("Book (Frontpage of Java Book)", "image/html.png")
  addHTMLimg("Navbar (Different Styles of Navbar)", "image/html1.png")
  addHTMLimg("Google Login Page", "image/html4.png")
  addHTMLimg("Softpro Building (Tried to depict the softpro company front.)", "image/html5.png")

  var nextdiv=document.createElement('div')
  nextdiv.setAttribute('class','nextProject')
  proWin.appendChild(nextdiv)
  var nextdivspan=document.createElement('span')
  nextdivspan.setAttribute('class','nextProjectspan')
  nextdiv.appendChild(nextdivspan)
  nextdivspan.innerHTML="<a href=\"#focus\">next project > </a>"
  nextdivspan.addEventListener('click',function(){
    nextProject(0)
  })
  cont.style.display = 'none';
  proWin.style.display = 'flex';
  
}
function nextProject(num){
  array=proWin.children
 

  for (let index = 2; index < array.length; index++) {  
  proWin.children[index].style.display='none' 

  }
  
  // project0()
  if(num==0){

    project0()
  }
  else if(num==1){

    project1()
  }
  else if(num==2){
    project2()

  }
  else if(num==3){
    project3()

  }

}



function exit() {
  
  array=proWin.children
 

  for (let index = 2; index < array.length; index++) {  
  proWin.children[index].style.display='none' 
  
  }

  proWin.style.display = 'none'
  cont.style.display = 'block';

}



pro0.addEventListener("click", project0);

pro1.addEventListener("click", project1);

pro2.addEventListener("click", project2);

pro3.addEventListener("click", project3);




//JQuery Code 


!function () { window.SVG3DTagCloud = function (t, e) { var i = { entries: [], width: 480, height: 480, radius: "70%", radiusMin: 75, bgDraw: !0, bgColor: "#000", opacityOver: 1, opacityOut: .05, opacitySpeed: 6, fov: 800, speed: 2, fontFamily: "Arial, sans-serif", fontSize: "15", fontColor: "#fff", fontWeight: "normal", fontStyle: "normal", fontStretch: "normal", fontToUpperCase: !1, tooltipFontFamily: "Arial, sans-serif", tooltipFontSize: "15", tooltipFontColor: "#fff", tooltipFontWeight: "normal", tooltipFontStyle: "normal", tooltipFontStretch: "normal", tooltipFontToUpperCase: !1, tooltipTextAnchor: "left", tooltipDiffX: 0, tooltipDiffY: 10, animatingSpeed: .01, animatingRadiusLimit: 1.3 }; if (void 0 !== e) for (var o in e) e.hasOwnProperty(o) && i.hasOwnProperty(o) && (i[o] = e[o]); if (!i.entries.length) return !1; var n, r, a, s, l, u, c, d = [], m = !0, f = { x: 0, y: 0 }, p = { x: 0, y: 0, z: 0 }, h = { x: 0, y: 0 }, v = { sx: 0, cx: 0, sy: 0, cy: 0 }, y = Math.PI / 180, g = "http://www.w3.org/2000/svg", w = 1; function A() { window.cancelAnimFrame(c), window.removeEventListener("resize", M), u && l.removeChild(u), l && (t.removeChild(l), l.removeEventListener("mousemove", D), delete l) } function b() { (l = document.createElementNS(g, "svg")).addEventListener("mousemove", D), t.appendChild(l), i.bgDraw && ((u = document.createElementNS(g, "rect")).setAttribute("x", 0), u.setAttribute("y", 0), u.setAttribute("fill", i.bgColor), l.appendChild(u)), function () { for (var t = !1, e = 1, o = i.entries.length + 1; e < o; e++) { var r = Math.acos(2 * e / o - 1), a = Math.sqrt(o * Math.PI) * r, s = Math.cos(a) * Math.sin(r), u = Math.sin(a) * Math.sin(r), c = Math.cos(r), m = F(e - 1, i.entries[e - 1], s, u, c); d.push(m), void 0 !== i.entries[e - 1].tooltip && (t = !0) } t && ((n = document.createElementNS(g, "text")).setAttribute("x", 0), n.setAttribute("y", 0), n.setAttribute("fill", i.tooltipFontColor), n.setAttribute("font-family", i.tooltipFontFamily), n.setAttribute("font-size", i.tooltipFontSize), n.setAttribute("font-weight", i.tooltipFontWeight), n.setAttribute("font-style", i.tooltipFontStyle), n.setAttribute("font-stretch", i.tooltipFontStretch), n.setAttribute("text-anchor", i.tooltipTextAnchor), n.textContent = "", l.appendChild(n)) }(), x(), C(), window.addEventListener("resize", M) } function x() { var e = window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth, o = window.innerHeight || document.documentElement.clientHeight || document.body.clientHeight, n = e, c = o; i.width.toString().indexOf("%") > 0 || i.height.toString().indexOf("%") > 0 ? (n = Math.round(t.offsetWidth / 100 * parseInt(i.width)), c = Math.round(n / 100 * parseInt(i.height))) : (n = parseInt(i.width), c = parseInt(i.height)), e <= n && (n = e), o <= c && (c = o), s = { x: n / 2, y: c / 2 }, h.x = i.speed / s.x, h.y = i.speed / s.y, (a = n >= c ? c / 100 * parseInt(i.radius) : n / 100 * parseInt(i.radius)) < 1 && (a = 1), (r = a / 2) < i.radiusMin && (r = i.radiusMin, a = 2 * r), l.setAttribute("width", n), l.setAttribute("height", c), i.bgDraw && (u.setAttribute("width", n), u.setAttribute("height", c)), function (t) { for (var e = 0, i = d.length; e < i; e++)o = d[e], n = t, void 0, void 0, void 0, void 0, r = o.vectorPosition.x - p.x, a = o.vectorPosition.y - p.y, s = o.vectorPosition.z - p.z, l = Math.sqrt(r * r + a * a + s * s), o.vectorPosition.x /= l, o.vectorPosition.y /= l, o.vectorPosition.z /= l, o.vectorPosition.x *= n, o.vectorPosition.y *= n, o.vectorPosition.z *= n; var o, n, r, a, s, l }(r * w) } function F(t, e, o, n, r) { var a = {}; return void 0 !== e.label ? (a.element = document.createElementNS(g, "text"), a.element.setAttribute("x", 0), a.element.setAttribute("y", 0), a.element.setAttribute("fill", i.fontColor), a.element.setAttribute("font-family", i.fontFamily), a.element.setAttribute("font-size", e.fontSize ? e.fontSize : i.fontSize), a.element.setAttribute("font-weight", i.fontWeight), a.element.setAttribute("font-style", i.fontStyle), a.element.setAttribute("font-stretch", i.fontStretch), a.element.setAttribute("text-anchor", "middle"), a.element.textContent = i.fontToUpperCase ? e.label.toUpperCase() : e.label) : void 0 !== e.image && (a.element = document.createElementNS(g, "image"), a.element.setAttribute("x", 0), a.element.setAttribute("y", 0), a.element.setAttribute("width", e.width), a.element.setAttribute("height", e.height), a.element.setAttribute("id", "image_" + t), a.element.setAttributeNS("http://www.w3.org/1999/xlink", "href", e.image), a.diffX = e.width / 2, a.diffY = e.height / 2), a.link = document.createElementNS(g, "a"), a.link.setAttributeNS("http://www.w3.org/1999/xlink", "xlink:href", e.url), a.link.setAttribute("target", e.target), a.link.addEventListener("mouseover", P, !0), a.link.addEventListener("mouseout", z, !0), a.link.appendChild(a.element), void 0 !== e.tooltip ? (a.tooltip = !0, a.tooltipLabel = i.tooltipFontToUpperCase ? e.tooltip.toUpperCase() : e.tooltip) : a.tooltip = !1, a.index = t, a.mouseOver = !1, a.vectorPosition = { x: o, y: n, z: r }, a.vector2D = { x: 0, y: 0 }, l.appendChild(a.link), a } function S(t) { for (var e = 0, i = d.length; e < i; e++) { var o = d[e]; if (o.element.getAttribute("x") === t.getAttribute("x") && o.element.getAttribute("y") === t.getAttribute("y")) return o } } function C() { c = requestAnimFrame(C), function () { var t = h.x * f.x - i.speed, e = i.speed - h.y * f.y, o = t * y, n = e * y; v.sx = Math.sin(o), v.cx = Math.cos(o), v.sy = Math.sin(n), v.cy = Math.cos(n); for (var l = 0, u = d.length; l < u; l++) { var c = d[l]; if (m) { var p = c.vectorPosition.x, g = c.vectorPosition.y * v.sy + c.vectorPosition.z * v.cy; c.vectorPosition.x = p * v.cx + g * v.sx, c.vectorPosition.y = c.vectorPosition.y * v.cy + c.vectorPosition.z * -v.sy, c.vectorPosition.z = p * -v.sx + g * v.cx } var A, b = i.fov / (i.fov + c.vectorPosition.z); c.vector2D.x = c.vectorPosition.x * b + s.x, c.vector2D.y = c.vectorPosition.y * b + s.y, c.diffX && c.diffY && (c.vector2D.x -= c.diffX, c.vector2D.y -= c.diffY), c.element.setAttribute("x", c.vector2D.x), c.element.setAttribute("y", c.vector2D.y), m ? (A = (r - c.vectorPosition.z) / a) < i.opacityOut && (A = i.opacityOut) : (A = parseFloat(c.element.getAttribute("opacity")), c.mouseOver ? A += (i.opacityOver - A) / i.opacitySpeed : A += (i.opacityOut - A) / i.opacitySpeed), c.element.setAttribute("opacity", A * (1 - (w - 1) / (i.animatingRadiusLimit - 1))) } d = d.sort(function (t, e) { return e.vectorPosition.z - t.vectorPosition.z }) }() } function P(t) { m = !1; var e, o = S(t.target); !function (t) { for (var e = 0, i = d.length; e < i; e++) { var o = d[e]; o.index === t.index ? o.mouseOver = !0 : o.mouseOver = !1 } }(o), o.tooltip && (e = o).tooltip && (n.setAttribute("x", e.vector2D.x - i.tooltipDiffX), n.setAttribute("y", e.vector2D.y - i.tooltipDiffY), n.textContent = i.tooltipFontToUpperCase ? e.tooltipLabel.toUpperCase() : e.tooltipLabel, n.setAttribute("opacity", 1)) } function z(t) { m = !0; var e = S(t.target); e.tooltip && n.setAttribute("opacity", 0) } function D(t) { var e, i; e = t, i = l.getBoundingClientRect(), f = { x: e.clientX - i.left, y: e.clientY - i.top } } function M(t) { x() } function T(t) { w = Math.min(Math.max(t, 1), i.animatingRadiusLimit), x() } window.requestAnimFrame = window.requestAnimationFrame || window.webkitRequestAnimationFrame || window.mozRequestAnimationFrame || function (t) { return window.setTimeout(t, 1e3 / 60) }, window.cancelAnimFrame = window.requestAnimationFrame ? window.cancelAnimationFrame : window.webkitRequestAnimationFrame ? window.webkitCancelAnimationFrame : window.mozRequestAnimationFrame ? window.mozCancelAnimationFrame : window.clearTimeout; var E = !1, O = !1, L = !1; function k() { (L = w < i.animatingRadiusLimit) ? (T(w + i.animatingSpeed), requestAnimFrame(k)) : "function" == typeof E && (E(), E = !1) } function q() { (L = w > 1) ? (T(w - i.animatingSpeed), requestAnimFrame(q)) : "function" == typeof O && (O(), O = !1) } b(), this.destroy = A, this.animOut = function (t) { L || (w = 1, E = t, k()) }, this.animIn = function (t) { L || (w = i.animatingRadiusLimit, O = t, q()) }, this.setEntries = function (t) { A(), i.entries = t, b() } } }(), "undefined" != typeof jQuery && function (t) { t.fn.svg3DTagCloud = function (e) { var i = arguments; return this.each(function () { if (t.data(this, "plugin_SVG3DTagCloud")) { var o = t.data(this, "plugin_SVG3DTagCloud"); o[e] ? o[e].apply(this, Array.prototype.slice.call(i, 1)) : t.error("Method " + e + " does not exist on jQuery.svg3DTagCloud") } else t.data(this, "plugin_SVG3DTagCloud", new SVG3DTagCloud(this, e)) }) } }(jQuery);




// rotating sphere code 

let tg = document.getElementById('tg')
// console.log("I am tg", tg.offsetWidth)
// console.log("I am tg", tg.offsetHeight)

$(document).ready(function () {
  var entries = [
    { label: 'HTML' , url: 'http://www.wikipedia.org', target: '_blank'},
    { label: 'PYTHON' , url: 'http://www.wikipedia.org', target: '_blank' },
    { label: 'JAVASCRIPT' , url: 'http://www.wikipedia.org', target: '_blank' },
    { label: 'CSS' , url: 'http://www.wikipedia.org', target: '_blank' },
    { label: 'PYTHON' , url: 'http://www.wikipedia.org', target: '_blank' },
    { label: 'C' , url: 'http://www.wikipedia.org', target: '_blank' },
    { label: 'JAVASCRIPT' , url: 'http://www.wikipedia.org', target: '_blank' },
    { label: 'CSS' , url: 'http://www.wikipedia.org', target: '_blank' },
    { label: 'DJANGO' , url: 'http://www.wikipedia.org', target: '_blank' },
    { label: 'HTML' , url: 'http://www.wikipedia.org', target: '_blank' },
    { label: 'MOODLE' , url: 'http://www.wikipedia.org', target: '_blank' },
    { label: 'JAVA' , url: 'http://www.wikipedia.org', target: '_blank' },
    { label: 'DJANGO' , url: 'http://www.wikipedia.org', target: '_blank' },
    { label: 'BOOTSTRAP' , url: 'http://www.wikipedia.org', target: '_blank' },
    { label: 'MOODLE' , url: 'http://www.wikipedia.org', target: '_blank' },
    { label: 'C' , url: 'http://www.wikipedia.org', target: '_blank' },
    { label: 'BOOTSTRAP' , url: 'http://www.wikipedia.org', target: '_blank' }

  ];
  var settings = {
    entries: entries,
    width: tg.offsetWidth,
    height: 250,
    radius: '85%',
    radiusMin: 75,
    bgDraw: true,
    bgColor: 'black',
    opacityOver: 1.00,
    opacitySpeed: 8,
    fov: 800,
    speed: 1,
    fontFamily: 'Arial,sans-serif',
    fontSize: '12',
    fontColor: '#36ddd7',
    fontWeight: '800',
    fontStyle: 'normal',
    fontSretch: 'normal',
    fontToUpperCase: true



  };
  $('#tg').svg3DTagCloud(settings)


})

