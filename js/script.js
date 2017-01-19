(function() {

    var contentDiv = document.querySelector("#nav");
    var height = contentDiv.clientHeight;
    var bodyHeight = document.body.clientHeight;
    var menu_button = document.getElementById("menu-mini");
    var sections = document.querySelectorAll(".section-move");
    var menu = document.querySelectorAll("#menu-tab nav ul li");
    var heightSection = sections.item(0).clientHeight;
    var sprite = document.getElementById("sprite");
    var item = document.querySelector(".item");


    var DOM = {
        objects: {
            personnage: {
                id: "sprite",
                class: "",
                style: {
                    left: "",
                    top: ""
                }
            }
        },
        changeObject: function(object, action){

            if(object == "personnage") {
                switch (action) {
                    case "left":
                        this.objects.personnage.class = "on left";
                        this.objects.personnage.style.left = personnage.positionLeft + "px";
                        break;
                    case "right":
                        this.objects.personnage.class = "on right";
                        this.objects.personnage.style.left = personnage.positionLeft + "px";
                        break;
                    case "up":
                        this.objects.personnage.class = "on up";
                        this.objects.personnage.style.top = personnage.positionTop + "px";
                        break;
                    case "down":
                        this.objects.personnage.class = "on down";
                        this.objects.personnage.style.top = personnage.positionTop + "px";
                        break;
                    case "stop":
                        this.objects.personnage.class = "";
                        break;
                    case "jump":
                        this.objects.personnage.style.top = personnage.positionTop + "px";

                }

                this.changeDOM(this.objects.personnage);

            }

        },

        changeDOM: function(obj){

            var id = obj.id;

            for (var key in obj) {
                if (!obj.hasOwnProperty(key)) continue;

                switch(key) {
                    case "class":
                        document.getElementById(id).className = obj[key];
                        break;
                    case "style":
                        for (var styleObj in obj[key]) {
                            if (!obj[key].hasOwnProperty(styleObj)) continue;
                            document.getElementById(id).style[styleObj] = obj[key][styleObj];
                        }
                        break;
                }

            }

        },

        touchMethod: function(what1){

            var w = window,
                d = document,
                e = d.documentElement,
                g = d.getElementsByTagName('body')[0],
                x = w.innerWidth || e.clientWidth || g.clientWidth,
                y = w.innerHeight|| e.clientHeight|| g.clientHeight;

            var left = what1.CalcPositionLeft;
            var top = what1.CalcPositionTop;

            if((left < 0 || (left + 55)> x) || (top < 0 || (top + 57) > y)){
                return true;
            } else {
                return false;
            }

        },

        colisionMethod: function(what, where){
            return true;
        },

        listener: function() {
        }
    };

    var Personnage = {

        age: 32,
        energie: 10,
        positionLeft: 1,
        vitesse: 20,
        jumpCounter: 0,
        positionTop: 400,
        CalcPositionTop: 0,
        CalcPositionLeft: 0,

        init: function(){
            DOM.changeObject("personnage", "up");
            DOM.changeObject("personnage", "left");
        },

        calcInit: function(){
            this.CalcPositionTop = 0;
            this.CalcPositionLeft = 0;
        },

        speed: function(){
            this.vitesse += 4;
        },

        timer: function(){
            window.setInterval(this.speed(), 700);
        },

        run: function(direction){

            switch (direction){
                case "up":
                    this.CalcPositionTop = this.positionTop - this.vitesse;
                    if(!DOM.touchMethod(this)) {
                        this.positionTop -= this.vitesse;
                        DOM.changeObject("personnage", "up");
                    } else this.calcInit();
                    break;
                case "down":
                    this.CalcPositionTop = this.positionTop + this.vitesse;
                    if(!DOM.touchMethod(this)) {
                        this.positionTop += this.vitesse;
                        DOM.changeObject("personnage", "down");
                    } else this.calcInit();
                    break;
                case "left":
                    this.CalcPositionLeft = this.positionLeft - this.vitesse;
                    if(!DOM.touchMethod(this)) {
                        this.positionLeft -= this.vitesse;
                        DOM.changeObject("personnage", "left");
                    } else this.calcInit();
                    break;
                case "right":
                    this.CalcPositionLeft = this.positionLeft + this.vitesse;
                    if(!DOM.touchMethod(this)) {
                        this.positionLeft += this.vitesse;
                        DOM.changeObject("personnage", "right");
                    } else this.calcInit();
                    break;
                default:
                    break;
            }

        },

        stop: function(){
            DOM.changeObject("personnage", "stop");
            this.vitesse = 20;
        },

        jump: function(){
            this.jumpCounter++;
            touches.datas.toucheStatus.jump = false;
            this.positionTop -= 50;

            DOM.changeObject("personnage", "jump");

            var that = this;
            setTimeout(function(){
                that.positionTop += 50;
                DOM.changeObject("personnage", "jump");
            }, 200);

        },
        touchObject: function(){
            this.energie =+ 1;
        }

    };


    var touches = {

        datas: {
            toucheEq: {
                left: 83,
                right: 68,
                up: 69,
                down: 88,
                jump: 74
            },
            toucheStatus: {
                left: false,
                right: false,
                up: false,
                down: false,
                jump: false
            }
        },

        keyActions : function(){

            var array = [];

            for(var key in this.datas.toucheStatus){
                if (!this.datas.toucheStatus.hasOwnProperty(key)) continue;

                if(key == "left" || key == "up" || key == "right" || key == "down") {
                    if(this.datas.toucheStatus[key]) personnage.run(key);
                    array.push(this.datas.toucheStatus[key]);
                }
                else if(key == "jump"){
                    if(this.datas.toucheStatus[key]) personnage.jump();
                }

            }

            function areFalse(element) {
                return element == false;
            }

            var falseKeys = array.every(areFalse);
            if(falseKeys == true) personnage.stop();

        }
    };

    var mouse = {
        x: 0,
        y: 0,
        lastx: 0,
        lasty: 0
    };

    var deplacement = function() {

        if (mouse.x > mouse.lastx) {
            personnage.run("right");
        } else {
            personnage.run("left");
        }

        if (mouse.y > mouse.lastx) {
            personnage.run("down");
        } else {
            personnage.run("up");
        }
    };

    document.addEventListener("mousemove", function (e){
        mouse.lastx = mouse.x;
        mouse.lasty = mouse.y;
        mouse.x = e.screenX;
        mouse.y = e.screenY;

        //deplacement();

    });


    document.addEventListener('keydown', function (e) {

        e.preventDefault();
        e.stopPropagation();

        switch (e.keyCode){
            case 83:
                touches.datas.toucheStatus.left = true;
                break;
            case 68:
                touches.datas.toucheStatus.right = true;
                break;
            case 69:
                touches.datas.toucheStatus.up = true;
                break;
            case 88:
                touches.datas.toucheStatus.down = true;
                break;
            case 74:
                touches.datas.toucheStatus.jump = true;
                break;
            default:
                break
        }

    }, true);

    document.addEventListener('keyup', function (e) {

        e.preventDefault();
        e.stopPropagation();

        switch (e.keyCode){
            case 83:
                touches.datas.toucheStatus.left = false;
                break;
            case 68:
                touches.datas.toucheStatus.right = false;
                break;
            case 69:
                touches.datas.toucheStatus.up = false;
                break;
            case 88:
                touches.datas.toucheStatus.down = false;
                break;
            default:
                break
        }

    }, true);

    function init() {
        height = contentDiv.clientHeight;
        bodyHeight = document.body.clientHeight;
        heightSection = sections.item(0).clientHeight;
        menu_button.style.display = "none";
    }

    init();

    var personnage = Object.create(Personnage);
    personnage.init();

    var interactions = function(){
        touches.keyActions();
        DOM.listener();
    };

    window.setInterval(interactions, 50);

}());

