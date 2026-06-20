const BASE = "/api";

// Demo cars data (shown when XAMPP is offline)
// export const DEMO_CARS = [
//   { car_id:1, car_name:"Mahindra Thar",     car_image:"thar.webp",    car_engin:"2.2L mHawk",  engin_power:"130 BHP", car_price:"1350000" },
//   { car_id:2, car_name:"Mahindra Scorpio N",car_image:"scN.webp",     car_engin:"2.2L mHawk",  engin_power:"175 BHP", car_price:"2150000" },
//   { car_id:3, car_name:"Mahindra XUV700",   car_image:"xuv700.webp",  car_engin:"2.2L mHawk",  engin_power:"185 BHP", car_price:"2450000" },
//   { car_id:4, car_name:"Mahindra XUV400",   car_image:"xuv400.webp",  car_engin:"Electric",    engin_power:"150 BHP", car_price:"1750000" },
//   { car_id:5, car_name:"Mahindra Bolero",   car_image:"bol.webp",     car_engin:"1.5L mHawk",  engin_power:"100 BHP", car_price:"1050000" },
//   { car_id:6, car_name:"Mahindra 3XO",      car_image:"3xo.webp",     car_engin:"1.2L Turbo",  engin_power:"130 BHP", car_price:"1150000" },
//   { car_id:7, car_name:"Mahindra BE 6",     car_image:"7xo.webp",     car_engin:"Electric",    engin_power:"230 BHP", car_price:"1850000" },
//   { car_id:8, car_name:"Mahindra Neo",      car_image:"neo.webp",     car_engin:"Electric",    engin_power:"170 BHP", car_price:"1450000" },
// ];

async function apiFetch(url, options = {}) {
  const res = await fetch(url, options);
  if (!res.ok) throw new Error("HTTP " + res.status);
  return res.json();
}

export const getCars = async () => {
  try {
    return await apiFetch(`${BASE}/cars.php`);
  } catch {
    return { success: true, data: DEMO_CARS, demo: true };
  }
};

export const addCar = async (carData) => {
  try { return await apiFetch(`${BASE}/cars.php`, { method:"POST", headers:{"Content-Type":"application/json"}, body:JSON.stringify(carData) }); }
  catch { return { success: false, message: "XAMPP not running. Start Apache & MySQL first." }; }
};

export const updateCar = async (carData) => {
  try { return await apiFetch(`${BASE}/cars.php`, { method:"PUT", headers:{"Content-Type":"application/json"}, body:JSON.stringify(carData) }); }
  catch { return { success: false, message: "XAMPP not running. Start Apache & MySQL first." }; }
};

export const deleteCar = async (car_id) => {
  try { return await apiFetch(`${BASE}/cars.php`, { method:"DELETE", headers:{"Content-Type":"application/json"}, body:JSON.stringify({ car_id }) }); }
  catch { return { success: false, message: "XAMPP not running. Start Apache & MySQL first." }; }
};

export const adminLogin = async (uname, pass) => {
  try { return await apiFetch(`${BASE}/auth.php`, { method:"POST", headers:{"Content-Type":"application/json"}, body:JSON.stringify({ action:"login", uname, pass }) }); }
  catch {
    // Offline fallback login
    if (uname === "manish" && pass === "2313") {
      return { success: true, message: "Login successful (demo mode)" };
    }
    return { success: false, message: "Invalid credentials" };
  }
};

export const adminLogout = async () => {
  try { return await apiFetch(`${BASE}/auth.php`, { method:"POST", headers:{"Content-Type":"application/json"}, body:JSON.stringify({ action:"logout" }) }); }
  catch { return { success: true }; }
};

export const getOrders = async () => {
  try { return await apiFetch(`${BASE}/orders.php`); }
  catch { return { success: true, data: [], demo: true }; }
};

export const getInvoice = async (id) => {
  try { return await apiFetch(`${BASE}/orders.php?id=${id}`); }
  catch { return { success: false, message: "XAMPP not running." }; }
};

export const createOrder = async (orderData) => {
  try { return await apiFetch(`${BASE}/orders.php`, { method:"POST", headers:{"Content-Type":"application/json"}, body:JSON.stringify(orderData) }); }
  catch { return { success: false, message: "XAMPP not running. Start Apache & MySQL first." }; }
};
