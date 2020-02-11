// Cette classe gère toute la logique du slider.
class Slider {
  // Le constructeur, permettant d'initialiser les paramètres.
  constructor(prev, slider, next) {
      this.prev = document.getElementById(prev); //Référence vers la flèche de gauche
      this.slider = document.getElementById(slider); //Référence vers la div contenant l'image à afficher
      this.next = document.getElementById(next); //Référence vers la flèche de droite
      this.total = 0; //Le pourcentage de décalage permettant de montrer telle ou telle image
      this.step = 100; //Lors d'un clic sur une flèche ou d'un appui clavier, de combien de pourcents est-ce qu'on bouge ?
  }

  // Méthode permettant de mettre en place les évènements sur les boutons et permettant d'écouter le clavier.
  initiateEvents() {
      this.prev.addEventListener('click', (e) => {
          this.goBack();
      });
      this.next.addEventListener('click', (e) => {
          this.goForward();
      });
      document.addEventListener('keydown', (e) => {
          if (e.keyCode == 37) { 
            this.goBack();
              return false;
          }
          else if (e.keyCode == 39) { 
            this.goForward();
              return false;
          }
      });
  }

  // Méthode permettant d'aller à l'image précédente...
  // Si on est déjà à la première image, on va sur la dernière.
  goBack() {
      if(this.total == 0)
      {
        this.total = -400;
        this.slider.style.left = this.total + '%';
      }
      else
      {
        this.total += this.step;
        this.slider.style.left = this.total + '%';
      }
  }

  // Méthode permettant d'aller à l'image suivante...
  // Si on est déjà à la dernière image, on retourne sur la première.
  goForward() {
      if(this.total == -400)
      {
        this.total = 0;
        this.slider.style.left = this.total;
      }
      else
      {
        this.total -= this.step;
        this.slider.style.left = this.total + '%';
      }
  }
}

