class Canvas {
  constructor (canvasId){
      this.canvasId = canvasId;
      this.canvas = document.getElementById(this.canvasId);
      this.context = this.canvas.getContext("2d");
      this.clickX = new Array();
      this.clickY = new Array();
      this.clickDrag = new Array();
      this.paint;
  }

  addListeners(){
      $('#' + this.canvasId).mousedown((e) => {
          var mouseX = e.clientX - this.canvas.getBoundingClientRect().left;
          var mouseY = e.clientY - this.canvas.getBoundingClientRect().top;
                
          this.paint = true;
          this.addClick(mouseX, mouseY, false);
          this.redraw();
      });
      
      $('#' + this.canvasId).mousemove((e) => {
          if(this.paint) {
              var mouseX = e.clientX - this.canvas.getBoundingClientRect().left;
              var mouseY = e.clientY - this.canvas.getBoundingClientRect().top;
              this.addClick(mouseX, mouseY, true);
              this.redraw();
          }
        });
      
      $('#' + this.canvasId).mouseup((e) => {
          this.paint = false;
      });
      
      $('#' + this.canvasId).mouseleave((e) => {
          this.paint = false;
      });
  }
//fonction pour rajouter un point de passage sur le dessin
  addClick(x, y, dragging){
      this.clickX.push(x);
      this.clickY.push(y);
      this.clickDrag.push(dragging);
  }

  setVisibility(visible) {
      if(visible) {
          this.canvas.style.display = 'initial';
      }
      else {
          this.canvas.style.display = 'none';
      }
  }

  getVisibility() {
      if(this.canvas.style.display == 'none') {
          return false;
      }
      else {
          return true;
      }
  }
  //renvoie true si l'utilisateur a dessiné quelque chose
  hasSigned() {
      if(this.clickX.length > 0 && this.clickY.length > 0 && this.clickDrag.length > 0) {
          return true;
      }
      else {
          return false;
      }
  }
//lire les données des tableaux  pour redessiner  la signature
  redraw(){
      this.context.clearRect(0, 0, this.canvas.width, this.canvas.height); // Clears the canvas
      
      this.context.strokeStyle = "#df4b26";
      this.context.lineJoin = "round";
      this.context.lineWidth = 5;
                
      for(var i=0; i < this.clickX.length; i++) {		
          this.context.beginPath();
          if(this.clickDrag[i] && i) {
              this.context.moveTo(this.clickX[i-1], this.clickY[i-1]);
          } else {
              this.context.moveTo(this.clickX[i]-1, this.clickY[i]);
          }
          this.context.lineTo(this.clickX[i], this.clickY[i]);
          this.context.closePath();
          this.context.stroke();
      }
  }
}