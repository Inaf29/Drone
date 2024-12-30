// Mengambil elemen-elemen yang diperlukan
const speedControls = document.querySelectorAll('.speed-control');
const speedValues = [
    document.getElementById('speedValue1'),
    document.getElementById('speedValue2'),
    document.getElementById('speedValue3'),
    document.getElementById('speedValue4')
];
const droneImage = document.getElementById('droneImage');

// Menambahkan event listener untuk setiap slider kontrol kecepatan
speedControls.forEach((control, index) => {
    control.addEventListener('input', function (event) {
        const speed = event.target.value;
        // Menampilkan nilai kecepatan di elemen speedValue
        speedValues[index].textContent = `${speed} RPM`;
        // Memperbarui kecepatan motor dan animasi
        updateMotorSpeed(index, speed);
        // Memperbarui rotasi dan posisi drone
        updateDronePositionAndRotation();
    });
});

// Fungsi untuk memperbarui kecepatan motor dan durasi animasi
function updateMotorSpeed(index, speed) {
    const motor = document.getElementById(`motor${index + 1}`);
    // Durasi animasi berbanding terbalik dengan kecepatan motor (semakin cepat, semakin cepat animasi)
    const duration = Math.max(1, 100 - speed) / 100;
    motor.style.animationDuration = `${duration}s`;
}

// Fungsi untuk memperbarui posisi dan rotasi drone berdasarkan kecepatan motor
function updateDronePositionAndRotation() {
    // Mengambil nilai kecepatan dari input sliders
    const speed1 = parseInt(document.getElementById('speed1').value);
    const speed2 = parseInt(document.getElementById('speed2').value);
    const speed3 = parseInt(document.getElementById('speed3').value);
    const speed4 = parseInt(document.getElementById('speed4').value);

    // Variabel untuk rotasi dan pergeseran drone
    let rotationX = 0;
    let rotationY = 0;
    let translateX = 0;
    let translateY = 0;

    // Motor 1 (kiri atas) akan menggeser ke kanan bawah dan merotasi
    rotationY -= speed1 * 0.2; // Rotasi pada sumbu Y untuk condong ke kiri atas
    translateX += speed1 * 0.2; // Pergeseran ke kanan bawah

    // Motor 2 (kanan atas) akan menggeser ke kiri bawah dan merotasi
    rotationY += speed2 * 0.2; // Rotasi pada sumbu Y untuk condong ke kanan atas
    translateX -= speed2 * 0.2; // Pergeseran ke kiri bawah

    // Motor 3 (kiri bawah) akan menggeser ke kiri atas dan merotasi
    rotationX -= speed3 * 0.2; // Rotasi pada sumbu X untuk condong ke kiri bawah
    translateX += speed3 * 0.2; // Pergeseran ke kiri atas

    // Motor 4 (kanan bawah) akan menggeser ke kanan atas dan merotasi
    rotationX += speed4 * 0.2; // Rotasi pada sumbu X untuk condong ke kanan bawah
    translateY -= speed4 * 0.2; // Pergeseran ke kanan atas

    // Mengubah rotasi dan pergeseran 3D pada gambar drone
    droneImage.style.transform = `rotateX(${rotationX}deg) rotateY(${rotationY}deg) translateX(${translateX}px) translateY(${translateY}px)`;
}
