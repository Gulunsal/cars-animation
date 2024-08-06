class Car {
    constructor(brand, model, year) {
        this.brand = brand;
        this.model = model;
        this.year = year;
        this.speed = 0; // hız
        this.location = 0; // konum
        this.lightsOn = false; // araçın ışıkları kapalı
        this.doorsLocked = false; // kapıları kapalı
        this.tirePressure = 35; // lastik basıncı PSI
        this.isBraking = false; // fren yapılmıyor
        this.engineSound = document.getElementById("engine-sound"); // motor sesi
        this.alertSound = document.getElementById("alert-sound"); // uyarı sesi
    }

    //Bir mesaj kaydederek, motor sesini çalarak ve arabayı hareket ettirerek arabayı çalıştırır.
    start() {
        console.log(`${this.model} model ${this.brand} markalı araç çalışmaya başladı.`);
        this.playEngineSound();
        this.move();
    }

    //Mesaj kaydederek aracı durdurur, hızı 0'a ayarlar, hız bilgisini günceller ve aracı park eder.
    stop() {
        console.log(`${this.model} model ${this.brand} markalı araç durduruldu.`);
        this.speed = 0;
        this.updateSpeedInfo();
        this.park();
    }

    //Araba konteynerini genişliğinin %80'i kadar sağa taşır.
    move() {
        const carContainer = document.getElementById("car-container");
        carContainer.style.left = "80%";
    }

    //Araba konteynerini ekranın sol tarafına taşır ve arabayı park eder.
    park() {
        const carContainer = document.getElementById("car-container");
        carContainer.style.left = "0";
    }

    //Aracın hızını ve konumunu artırarak ivmelenmesini sağlar.
    accelerate() {
        this.isBraking = false;
        this.updateBrakeStatus();
        this.speed += 10;
        this.location += 10;
        this.updateSpeedInfo();
        this.updateLocationInfo();
        console.log(`${this.model} model ${this.brand} markalı araç ${this.speed} km/s hızla gidiyor.`);
    }

    //Aracın hızını 10 azaltarak fren yapar ve fren durumunu günceller.
    brake() {
        this.isBraking = true;
        this.updateBrakeStatus();
        this.speed = Math.max(this.speed - 10, 0);
        this.updateSpeedInfo();
        console.log(`${this.model} model ${this.brand} markalı araç ${this.speed} km/s hızla gidiyor.`);
    }

    /**
     * Işıkları açar veya kapatır ve ışık durumunu günceller.
     * Işık durumuna göre belge gövdesinin arka plan görüntüsünü değiştirir.
     * Işıkların açık olup olmadığını belirten bir mesajı günlüğe kaydeder.
     */
    toggleLights() {
        this.lightsOn = !this.lightsOn;
        this.updateLightStatus();
        document.body.style.backgroundImage = this.lightsOn ? "url('cars_night.png')" : "url('cars.png')";
        console.log(`${this.model} model ${this.brand} markalı araç ışıkları ${this.lightsOn ? 'açıldı' : 'kapandı'}.`);
    }

    /**
     *Kapıların durumunu değiştirir ve kapı durumunu günceller.
     * Kapıların kilitli olup olmadığını belirten bir mesajı günlüğe kaydeder.

     */
    toggleDoors() {
        this.doorsLocked = !this.doorsLocked;
        this.updateDoorStatus();
        console.log(`${this.model} model ${this.brand} markalı araç kapıları ${this.doorsLocked ? 'kilitlendi' : 'açıldı'}.`);
    }

    /**
     * Aracın konumuna göre bakım zamanının gelip gelmediğini kontrol eder ve bakım durumunu günceller.
     * Bakım zamanına göre bir mesajı günlüğe kaydeder.
     */
    checkMaintenance() {
        const maintenanceDue = this.location >= 10000 ? 'Bakım zamanı geldi' : 'Bakım için daha zaman var';
        document.getElementById("table-maintenance-status").textContent = maintenanceDue;
        console.log(`${this.model} model ${this.brand} markalı araç ${maintenanceDue}.`);
    }

    /**
     *"car-info" öğesinde aracın markasını, modelini ve yılını görüntüler.
     */
    displayInfo() {
        const carInfo = document.getElementById("car-info");
        carInfo.textContent = `${this.brand} - ${this.model} - ${this.year}`;
    }

    /**
     * Motor sesi öğesinin geçerli zamanını sıfırlayarak motor sesini çalar
     * ve uyarı sesi öğesinin geçerli zamanını sıfırlayarak uyarı sesini çalar.
     */
    playEngineSound() {
        this.engineSound.currentTime = 0;
        this.engineSound.play();
    }

    playAlertSound() {
        this.alertSound.currentTime = 0;
        this.alertSound.play();
    }

    // Aracın hız bilgisini web sayfasında günceller.
    updateSpeedInfo() {
        document.getElementById("table-speed-status").textContent = `${this.speed} km/s`;
    }

    //Web sayfasında görüntülenen konum bilgisini günceller. 
    updateLocationInfo() {
        document.getElementById("table-location-status").textContent = `${this.location} km`;
    }

    // Web sayfasında görüntülenen ışıkların durumunu günceller.
    updateLightStatus() {
        document.getElementById("table-light-status").textContent = `${this.lightsOn ? 'Açık' : 'Kapalı'}`;
    }

    // Web sayfasında görüntülenen kapıların durumunu günceller.
    updateDoorStatus() {
        document.getElementById("table-door-status").textContent = `${this.doorsLocked ? 'Kilitli' : 'Açık'}`;
    }

    // Web sayfasında görüntülenen lastiklerin durumunu günceller.
    updateTirePressureInfo() {
        document.getElementById("table-tire-pressure-status").textContent = `${this.tirePressure} PSI`;
    }

    // Web sayfasında görüntülenen frenin durumunu günceller.
    updateBrakeStatus() {
        document.getElementById("table-brake-status").textContent = this.isBraking ? 'Fren yapılıyor' : 'Fren yapılmıyor';
    }
}

//Car sınıfından Elektrikli araba sınıfını extend edilir.

class ElectricCar extends Car {
    constructor(brand, model, year, batteryLife) {
        super(brand, model, year);
        this.batteryLife = batteryLife;
    }

    
    // Elektrikli aracın pil ömrünü %5 artırır ve pil bilgilerini günceller.
    charge() {
        this.batteryLife += 5;
        this.updateBatteryInfo();
        console.log(`${this.model} model ${this.brand} markalı araç ${this.batteryLife}% kapasitesine sahip.`);
    }

    // Elektrikli aracın pil ömrünü %20 azaltarak uyarı sesini çalar.
    updateBatteryInfo() {
        document.getElementById("table-battery-status").textContent = `${this.batteryLife}%`;

        if (this.batteryLife <= 20) {
            this.playAlertSound();
        }
    }

    // Elektrikli aracın start metodu override edilir.
    start() {
        if (this.batteryLife > 0) {
            super.start();
            this.batteryLife -= 40;
            this.updateBatteryInfo();
        } else {
            console.log("Arabayı çalıştırmak için yeterince şarjınız yok.");
            this.playAlertSound();
        }
    }
}


//Benzinli araba sınıfını extend edilir.
class GasolineCar extends Car {
    constructor(brand, model, year, fuelLevel) {
        super(brand, model, year);
        this.fuelLevel = fuelLevel;
    }

    //Benzinli aracın benzin seviyesini %10 artırarak benzin bilgilerini günceller.
    refuel() {
        this.fuelLevel += 10;
        this.updateFuelInfo();
        console.log(`${this.model} model ${this.brand} markalı araç ${this.fuelLevel}% benzin seviyesine sahip.`);
    }

// Benzinli aracın benzin seviyesini %20 azaltarak uyarı sesini çalar.
    updateFuelInfo() {
        document.getElementById("table-fuel-status").textContent = `${this.fuelLevel}%`;

        if (this.fuelLevel <= 20) {
            this.playAlertSound();
        }
    }

    //Benzinli aracın start metodu override edilir.
    start() {
        if (this.fuelLevel > 0) {
            super.start();
            this.fuelLevel -= 20;
            this.updateFuelInfo();
        } else {
            console.log("Arabayı çalıştırmak için yeterince benzin yok.");
            this.playAlertSound();
        }
    }
}

//ElectricCar ve GasolineCar sınıflarından iki araba nesnesi (electricCar ve gasolineCar) olusturulur.

const electricCar = new ElectricCar("Tesla", "Model S", "2020", 100);
const gasolineCar = new GasolineCar("Toyota", "Corolla", "2020", 100);

//Arac nesnesi (currentCar) tanımlandı.
let currentCar = null;

//Car sınıfından arac seçimi yapılır.

document.getElementById("car-selection").addEventListener("change", (event) => {
    const selectedCar = event.target.value;

    if (selectedCar === "electric") {
        currentCar = electricCar;
        document.getElementById("chargeButton").style.display = "inline-block";
        document.getElementById("refuelButton").style.display = "none";
    } else if (selectedCar === "gasoline") {
        currentCar = gasolineCar;
        document.getElementById("chargeButton").style.display = "none";
        document.getElementById("refuelButton").style.display = "inline-block";
    }

/**Kullanıcı bir araba seçtiğinde (car-selection menüsünden), change olayı tetiklenir.
*Seçilen arabanın türüne göre (electric veya gasoline), currentCar değişkeni güncellenir.
*chargeButton ve refuelButton butonlarının görünürlüğü seçilen arabanın türüne göre ayarlanır.
*controls div'i görünür hale getirilir.
*Seçilen araba (currentCar) ile ilgili çeşitli bilgiler (displayInfo, updateSpeedInfo, vb.) güncellenir ve ekrana yansıtılır. */

    document.getElementById("controls").style.display = "flex";
    currentCar.displayInfo();
    currentCar.updateSpeedInfo();
    currentCar.updateLocationInfo();
    currentCar.updateLightStatus();
    currentCar.updateDoorStatus();
    currentCar.updateTirePressureInfo();
    if (currentCar instanceof ElectricCar) {
        currentCar.updateBatteryInfo();
    } else if (currentCar instanceof GasolineCar) {
        currentCar.updateFuelInfo();
    }
    currentCar.checkMaintenance();
    currentCar.updateBrakeStatus();
});

/**Her buton (startButton, parkButton, chargeButton, vb.) için bir click olayı dinleyicisi eklenir.
*click olayı tetiklendiğinde, currentCar nesnesi üzerinde ilgili yöntem (start, stop, charge, refuel, vb.) çağrılır.
*chargeButton ve refuelButton butonları, belirli aralıklarla (setInterval kullanarak) şarj veya yakıt dolumu işlemini gerçekleştirir. 
*Şarj veya yakıt dolumu tamamlandığında, interval durdurulur (clearInterval). */

document.getElementById("startButton").addEventListener("click", () => {
    if (currentCar) currentCar.start();
});

document.getElementById("parkButton").addEventListener("click", () => {
    if (currentCar) currentCar.stop();
});

document.getElementById("chargeButton").addEventListener("click", () => {
    if (currentCar && currentCar instanceof ElectricCar) {
        const batteryChargeInterval = setInterval(() => {
            if (currentCar.batteryLife < 100) {
                currentCar.charge();
            }
            if (currentCar.batteryLife === 100) {
                clearInterval(batteryChargeInterval);
            }
        }, 2000);
    }
});

document.getElementById("refuelButton").addEventListener("click", () => {
    if (currentCar && currentCar instanceof GasolineCar) {
        const fuelRefillInterval = setInterval(() => {
            if (currentCar.fuelLevel < 100) {
                currentCar.refuel();
            }
            if (currentCar.fuelLevel === 100) {
                clearInterval(fuelRefillInterval);
            }
        }, 2000);
    }
});

document.getElementById("accelerateButton").addEventListener("click", () => {
    if (currentCar) currentCar.accelerate();
});

document.getElementById("brakeButton").addEventListener("click", () => {
    if (currentCar) currentCar.brake();
});

document.getElementById("toggleLightsButton").addEventListener("click", () => {
    if (currentCar) currentCar.toggleLights();
});

document.getElementById("toggleDoorsButton").addEventListener("click", () => {
    if (currentCar) currentCar.toggleDoors();
});

document.getElementById("checkMaintenanceButton").addEventListener("click", () => {
    if (currentCar) currentCar.checkMaintenance();
});


