import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getInvoice } from "../services/api";

export default function Invoice() {
  const { id } = useParams();
  const [data, setData] = useState(null);
  const [error, setError] = useState("");

  useEffect(() => {
    getInvoice(id)
      .then(res => { if (res.success) setData(res.data); else setError("Invoice not found."); })
      .catch(() => setError("Server error."));
  }, [id]);

  if (error) return <div className="alert alert-danger m-4">{error}</div>;
  if (!data) return <div className="text-center mt-5"><div className="spinner-border text-danger" /></div>;

  const fmt = n => Number(n).toLocaleString("en-IN");
  const today = new Date().toLocaleDateString("en-IN", { day: "2-digit", month: "short", year: "numeric" });

  return (
    <>
      <div className="text-center my-3 no-print">
        <button className="btn btn-dark px-4" onClick={() => window.print()}>🖨️ Print Invoice</button>
      </div>
      <div className="mx-auto my-3 bg-white p-4 shadow" style={{ width: "210mm", minHeight: "297mm" }}>
        <div className="d-flex justify-content-between border-bottom border-2 border-dark pb-3 mb-3">
          <div><h3 className="fw-bold" style={{ color: "red" }}>MAHINDRA AUTO SALES</h3><p className="mb-0 text-muted">Authorized Dealer</p></div>
          <div className="text-end"><p className="mb-1"><strong>Invoice No:</strong> {data.invoice_no}</p><p className="mb-0"><strong>Date:</strong> {today}</p></div>
        </div>
        <table className="table table-borderless mb-0" style={{ fontSize: 14 }}>
          <tbody>
            <tr><td><strong>Customer Name:</strong> {data.c_name}</td><td><strong>Mobile:</strong> {data.c_mobile}</td></tr>
            <tr><td><strong>Address:</strong> {data.c_address}</td><td><strong>Email:</strong> {data.c_email}</td></tr>
            <tr><td><strong>Booking Date:</strong> {data.book_date}</td><td></td></tr>
          </tbody>
        </table>
        <table className="table table-bordered mt-3">
          <thead style={{ background: "#f0f0f0" }}><tr><th>Car Model</th><th>Price (₹)</th></tr></thead>
          <tbody><tr><td>{data.car_name}</td><td>₹{fmt(data.car_price)}</td></tr></tbody>
        </table>
        <div className="text-end mt-4">
          <h6>Ex-Showroom Price: ₹{fmt(data.car_price)}</h6>
          <h6>GST (18%): ₹{fmt(data.gst)}</h6>
          <h6>Registration &amp; Insurance: ₹{fmt(data.extra)}</h6>
          <hr />
          <h4 className="fw-bold">Grand Total: ₹{fmt(data.grand_total)}</h4>
        </div>
        <div className="text-center mt-5 text-muted"><p>Thank you for choosing Mahindra</p></div>
      </div>
      <style>{`@media print { .no-print { display:none!important; } @page { size:A4; margin:10mm; } }`}</style>
    </>
  );
}
