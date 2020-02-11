class Timer {
    constructor(finReservation){
        this.finReservation = finReservation;
        this.createTimer();
    }
    createTimer() {
        // On crée maintenant une function qui va se déclencher toutes les secondes.
        this.interval = setInterval(() => {
            // Quelle est la date actuelle au moment où la fonction se déclenche ?
            var now = new Date().getTime();
            // Combien de temps il reste avant d'atteindre la date se trouvant 20 minutes dans le futur lors de la réservation ?
            var distance = this.finReservation - now;
            // Calculons le nombre de minutes et secondes restantes...
            var minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
            var seconds = Math.floor((distance % (1000 * 60)) / 1000);
            if (distance < 0) {
                // Si on a atteint la limite, on montre que la réservation n'a plus lieu d'être...
                this.killTimer();
                document.getElementById("time_limit").innerHTML = "Réservation expirée !";
            }
            else {
                // Sinon, on montre simplement le temps restant.
                var nom_reservation = localStorage.getItem('nom_reservation');
                var prenom_reservation = localStorage.getItem('prenom_reservation');
                document.getElementById("time_limit").innerHTML = "Réservation de " + prenom_reservation + " " + nom_reservation + " : " + minutes + "m " + seconds + "s ";
            }
        }, 1000);
    }

    isTimerAlive() {
        return this.interval !== undefined;
    }

    killTimer() {
        clearInterval(this.interval);
        this.interval = undefined;
        sessionStorage.removeItem('date_fin_reservation');
    }
}