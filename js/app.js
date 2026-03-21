// js/app.js

// ใส่ Web App URL ที่คุณเพิ่งได้มา
const API_URL = "https://script.google.com/macros/s/AKfycbwp5T6Ee_ylW9PeKuSwRsKIxLDKIea3GMK9QQzGK3JW2klFpGBbaoV9zgYFvatsi5RmSQ/exec";

// ฟังก์ชันสำหรับเรียก API (POST) ไปยัง Google Apps Script
async function callAPI(payload) {
    try {
        // แสดงสถานะโหลด (ถ้ามี UI รองรับ)
        document.body.style.cursor = 'wait';
        
        const response = await fetch(API_URL, {
            method: 'POST',
            redirect: 'follow', // จำเป็นมากสำหรับ Google Apps Script
            body: JSON.stringify(payload)
        });
        
        document.body.style.cursor = 'default';
        return await response.json();
    } catch (error) {
        document.body.style.cursor = 'default';
        console.error("API Error:", error);
        alert("เกิดข้อผิดพลาดในการเชื่อมต่อเซิร์ฟเวอร์ กรุณาลองใหม่อีกครั้ง");
        return { success: false, message: "Connection Error" };
    }
}

// ตรวจสอบสิทธิ์การเข้าถึงหน้าเว็บ (ป้องกันคนเข้าหน้า Dashboard โดยยังไม่ Login)
function checkAuth() {
    const role = localStorage.getItem('userRole');
    const path = window.location.pathname;
    
    // ถ้าไม่มี Role (ยังไม่เข้าสู่ระบบ) และไม่ได้อยู่หน้าแรก ให้เด้งกลับไปหน้า index
    if (!role && !path.endsWith('index.html') && path !== '/' && !path.includes('index.html')) {
        window.location.href = 'index.html';
    }
}

// ฟังก์ชันออกจากระบบ
function logout() {
    localStorage.removeItem('userRole');
    localStorage.removeItem('username');
    window.location.href = 'index.html';
}
