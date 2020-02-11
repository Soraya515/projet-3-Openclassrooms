class Reservation {
    constructor(canvas) {
        var nom_reservation = localStorage.getItem('nom_reservation');
        if(nom_reservation !== null) {
            this.nom_reserv = nom_reservation;
            document.getElementById("nom").value = nom_reservation;
        }
        var prenom_reservation = localStorage.getItem('prenom_reservation');
        if(prenom_reservation !== null) {
            this.prenom_reserv = prenom_reservation;
            document.getElementById("prenom").value = prenom_reservation;
        }
        var date_fin_reservation = sessionStorage.getItem('date_fin_reservation');
        if(date_fin_reservation !== null) {
            this.reservation_date = new Date(date_fin_reservation);
            this.timer = new Timer(this.reservation_date);
        }
        this.canvas = canvas;
        
        var clickX = sessionStorage.getItem('clickX');
        var clickY = sessionStorage.getItem('clickY');
        var clickDrag = sessionStorage.getItem('clickDrag');
        if(clickX !== null && clickY !== null && clickDrag !== null) {
            canvas.clickX = JSON.parse(clickX);
            canvas.clickY = JSON.parse(clickY);
            canvas.clickDrag = JSON.parse(clickDrag);
            canvas.setVisibility(true);
            canvas.redraw();
        }
        else {
            canvas.setVisibility(false);
        }
    }

    addListeners() {
        // Permet de se brancher au bouton de réservation.
        var reserv = document.getElementById("bouton_reserver");
        reserv.addEventListener("click", () => {
            this.createReservation();
        });
    }

    createReservation() {
        this.nom_reserv = document.getElementById("nom").value;
        this.prenom_reserv = document.getElementById("prenom").value;
            
        // On s'assure au moins d'avoir un nom et un prénom...Et qu'une réservation n'est pas déjà en cours !
        if(this.nom_reserv != '' && this.prenom_reserv != '') {
            if(!this.canvas.hasSigned()) {
                if(this.canvas.getVisibility()) {
                    alert("Veuillez signer avant de réserver...");
                }
                else {
                    alert("Veuillez signer et cliquer à nouveau sur Réserver");
                    this.canvas.setVisibility(true);
                }
            }
            else {
                if(this.timer === undefined || !this.timer.isTimerAlive()) {
                    // Lorsqu'on clique sur le bouton de réservation, on va déclencher un timer, et montrer à quel nom on fait la réservation...
                    // On crée une date 20 minutes dans le futur.
                    this.reservation_date = new Date();
                    this.reservation_date.setTime(this.reservation_date.getTime() + (1000 * 60 * 20));
    
                    localStorage.setItem("nom_reservation", this.nom_reserv);
                    localStorage.setItem("prenom_reservation", this.prenom_reserv);
                    sessionStorage.setItem("date_fin_reservation", this.reservation_date);
                    sessionStorage.setItem("clickX", JSON.stringify(this.canvas.clickX));
                    sessionStorage.setItem("clickY", JSON.stringify(this.canvas.clickY));
                    sessionStorage.setItem("clickDrag", JSON.stringify(this.canvas.clickDrag));
    
                    this.timer = new Timer(this.reservation_date);
                }
                else {
                    if (confirm("Vous avez déjà une réservation. Voulez-vous en refaire une ?")) {
                        //Refaire la réservation
                        this.timer.killTimer();
                        this.createReservation();
                    }
                }
            }
            
        }
        else {
            alert("Pour réserver, vous devez saisir un nom et un prénom");
        }
    }

    
}