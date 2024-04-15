var colors = "ffbe0b-fb5607-ff006e-8338ec-3a86ff".split("-").map(a=>"#"+a)
var line_colors = "ffbe0b-fb5607-ff006e-8338ec-3a86ff".split("-").map(a=>"#"+a)
// 宣告一個球的物件，為一個陣列，陣列內可以放很多球的資訊
var balls = []  //所有球的資料內容
var ball  //正在處理的球
class ball_class{  //宣告一個ball_class物件，
  constructor(args){  //描述物件的初始值，只有設定物件的資料內容
    this.p = args.p || {x:width/2,y:height/2}; //球的位置
    this.r = args.r || random(50,120)  //球的大小
    this.color = args.color || random(colors)  //球的顏色，color函數為顏色設定值
    this.v = args.v || {x:random(-2,2),y:random(-2,2)}   //球的移動速度，有兩個屬性(x,y)，移動的速度
    this.line_color = args.line_color || random(line_colors)  //圓的框線顏色
    this.a = args.a || {x:0,y:random(0.7,1.2)}  //加速度
    this.mode =random(["happy","bad"])
  }
  draw(){   //畫出物件畫面的程式碼，一個物件繪出的程式碼
    push()
      translate(this.p.x,this.p.y) //把圓點(0,0)設定到圓心上
      stroke(this.line_color)
      fill(this.color)
      ellipse(0,0,this.r)
    // ellipse(this.p.x,this.p.y,this.r-50)
      if(this.mode=="happy"){
        fill(255)
        arc(0,0,this.r/2,this.r/2,0,PI*2)
        fill(0)
        noStroke()
        arc(0,0,this.r/3,this.r/3,0,PI*2)
      }
      else{
        fill(255)
        arc(0,0,this.r/2,this.r/2,0,PI)
        fill(0)
        noStroke()
        arc(0,0,this.r/3,this.r/3,0,PI)
      }

      pop()  //把圓點恢復到左上角
    
  }
  update(){  //物件移動更新後的程式碼
    if(this.mode == "happy"){
      this.p.y = this.p.y + sin(frameCount/10+this.r) *(this.r/10)
    }
    else{
      this.p.x = this.p.x + this.v.x   //x軸
      this.p.y = this.p.y + this.v.y   //y軸
    }
    
    // this.v.y = this.v.y + this.a.y   //把往下的速度，每次加一個a的值
    //a值為正，this.v.y碰到地時，會變成負值，如果兩數相加，this.v.y就會慢慢變成0
    //發現越跳越高，使用*0.99產生一個摩擦力
    // this.v.x = this.v.x * 0.99
    // this.v.y = this.v.y * 0.99
    if(this.p.x<0){  //碰到視窗左邊
      this.v.x = -this.v.x
    }
    if(this.p.x>width){  //碰到視窗右邊
      this.v.x = -this.v.x
    }
    if(this.p.y<0){   //碰到視窗上邊
      this.v.y = -this.v.y
    }
    if(this.p.y>height){  //碰到視窗下邊
      this.v.y= -this.v.y
    }
  }
}


function setup() {
  createCanvas(windowWidth, windowHeight);
  for(i=0;i<50;i=i+1){  //產生多個球資料(20顆球)
    ball = new ball_class({  //傳一串參數值到class內
    v:{x:random(-2,2),y:random(-2,2)},
    p:{x:random(0,width),y:random(0,height)},
    a:{x:0,y:0}
    })
    balls.push(ball)
  }
  // print(balls)
}

function draw() {
  background(220);
  for(j=0;j<balls.length;j=j+1){
    ball = balls[j]
    ball.draw()   //繪出球的樣子
    ball.update()  //更改球的位置
  }
}
