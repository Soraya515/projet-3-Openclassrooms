//construit un objet canvas 
let myCanvas = new Canvas('canvas');
myCanvas.addListeners();
//construit un objet slider
let mySlider = new Slider('prev','slider','next');
mySlider.initiateEvents();

// cette fonction est appelé par google maps
function initMap() {
    //construit un objet bikemap
    let bikeMap = new BikeMap();
    bikeMap.fetchData();
}
//construit un object reservation 
let reserv = new Reservation(myCanvas);
reserv.addListeners();