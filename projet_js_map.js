class BikeMap {
    constructor() {
        this.defaultLatLong = new google.maps.LatLng(45.77, 4.81);
        this.map = new google.maps.Map(document.getElementById('googleMap'), {zoom: 10, center:this.defaultLatLong});
        this.savedStation = sessionStorage.getItem('selected_station');
        if(this.savedStation !== null) {
           this.updateStationDetails(JSON.parse(this.savedStation));
        }
    }

    // Fonction déclenchant l'appel AJAX permettant d'obtenir les données.
    fetchData() {
        this.ajaxGet("https://public.opendatasoft.com/api/records/1.0/search/?dataset=station-velov-grand-lyon&rows=1000", (response) => {
            var results = JSON.parse(response);
            results.records.forEach((element) => {this.handleRecord(element);});
        });
    }

    // Fonction permettant de gérer un élément retourné par l'appel AJAX.
    handleRecord(element) {
        // Par défaut, on utilise un marqueur gris.
        // Si la valeur donnée par l'API indique qu'il y a des vélos disponibles (ou non !), on change la couleur.
        var myIcon = "http://labs.google.com/ridefinder/images/mm_20_gray.png";
        if(element.fields.availabi_1 == "Vert") {
            myIcon = "http://labs.google.com/ridefinder/images/mm_20_green.png";
        }
        else if(element.fields.availabi_1 == "Orange") {
            myIcon = "http://labs.google.com/ridefinder/images/mm_20_orange.png";
        }
        else if(element.fields.availabi_1 == "Bleu") {
            myIcon = "http://labs.google.com/ridefinder/images/mm_20_blue.png";
        }
        // On pense à injecter le chemin de l'icône dans l'objet Marker...
        var marker = new google.maps.Marker({icon: myIcon, position: {lng: element.geometry.coordinates[0], lat: element.geometry.coordinates[1]}, map: this.map});
        marker.addListener('click', () => {
            // On utilise l'évènement "click" sur le Marker afin de mettre à jour le cadre à droite de la Map.
            console.log(element);
            console.log("Longitude à " + element.geometry.coordinates[0] + " / Latitude à " + element.geometry.coordinates[1]);
            this.updateStationDetails(element);
            sessionStorage.setItem("selected_station", JSON.stringify(element));
        });

        var currentlySavedStation = sessionStorage.getItem('selected_station');
        if(currentlySavedStation !== null) {
            if(element.recordid === currentlySavedStation.recordid) {
                this.updateStationDetails(element);
                sessionStorage.setItem("selected_station", JSON.stringify(element));
            }
        }
        
    }

    // Permet de mettre à jour le cadre à droite de la Map. Il prend en paramètre l'élément fourni par l'API.
    updateStationDetails(element) {
        var adr_station = document.getElementById("adresse_station");
        var places_max = document.getElementById("places_station_max");
        var places_restantes = document.getElementById("places_station_restantes");
        // On se contente pour le moment d'afficher quelques-uns des paramètres de la station.
        adr_station.textContent = element.fields.address;
        places_max.textContent = element.fields.bike_stand + " place(s)";
        places_restantes.textContent = element.fields.available + " vélo(s) disponible(s)";
    }

    // Exécute un appel AJAX GET
    // Prend en paramètres l'URL cible et la fonction callback appelée en cas de succès
    ajaxGet(url, callback) {
        var req = new XMLHttpRequest();
        req.open("GET", url);
        req.addEventListener("load", () => {
            if (req.status >= 200 && req.status < 400) {
                // Appelle la fonction callback en lui passant la réponse de la requête
                callback(req.responseText);
            } else {
                console.error(req.status + " " + req.statusText + " " + url);
            }
        });
        req.addEventListener("error", () => {
            console.error("Erreur réseau avec l'URL " + url);
        });
        req.send(null);
    }
}

