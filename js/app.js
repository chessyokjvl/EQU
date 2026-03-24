// js/app.js

// ใส่ Web App URL ที่คุณเพิ่งได้มา
const API_URL = "https://script.google.com/macros/s/AKfycbwp5T6Ee_ylW9PeKuSwRsKIxLDKIea3GMK9QQzGK3JW2klFpGBbaoV9zgYFvatsi5RmSQ/exec";
async function callAPI(payload) {
    try {
        document.body.style.cursor = 'wait';
        const response = await fetch(API_URL, {
            method: 'POST',
            redirect: 'follow', 
            body: JSON.stringify(payload)
        });
        document.body.style.cursor = 'default';
        return await response.json();
    } catch (error) {
        document.body.style.cursor = 'default';
        console.error("API Error:", error);
        alert("เกิดข้อผิดพลาดในการเชื่อมต่อเซิร์ฟเวอร์");
        return { success: false, message: "Connection Error" };
    }
}

function checkAuth() {
    const role = localStorage.getItem('userRole');
    const path = window.location.pathname;
    
    if (!role && !path.endsWith('index.html') && path !== '/' && !path.includes('index.html')) {
        window.location.href = 'index.html';
    }
}

function logout() {
    localStorage.removeItem('userRole');
    localStorage.removeItem('username');
    window.location.href = 'index.html';
}
