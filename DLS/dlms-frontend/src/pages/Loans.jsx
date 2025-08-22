import { useEffect, useState } from "react";
import api from "../api";

export default function Loans(){
  const [loans, setLoans] = useState([]);
  const load = async ()=>{ const {data} = await api.get("/loans/"); setLoans(data.results || data); }
  useEffect(()=>{ load(); },[]);
  const markReturn = async(id)=>{
    await api.post(`/loans/${id}/return_book/`); 
    load();
  }
  return (
    <div className="p-6">
      <h1 className="text-xl font-semibold mb-3">Active Loans</h1>
      <ul className="space-y-3">
        {loans.filter(l=>!l.returned_at).map(l=>(
          <li key={l.id} className="border p-3 rounded">
            <div className="font-medium">{l.book_title} — {l.copy_barcode}</div>
            <div className="text-sm">Member: {l.member_name} | Due: {l.due_at} {l.is_overdue && <span className="text-red-600">OVERDUE</span>}</div>
            <button onClick={()=>markReturn(l.id)} className="mt-2 border px-3 py-1">Mark as Returned</button>
          </li>
        ))}
      </ul>
    </div>
  )
}
