import React, { useEffect, useState } from 'react';
import api from '../services';
export default function Teams(){
  const [teams, setTeams] = useState([]);
  const [employees, setEmployees] = useState([]);
  const [form, setForm] = useState({ name:'', description:''});
  const [assign, setAssign] = useState({ teamId:'', employeeId:''});
  const [msg, setMsg] = useState('');
  async function load(){
    try{
      const t = await api.get('/teams'); setTeams(t.data);
      const e = await api.get('/employees'); setEmployees(e.data);
    }catch(e){ setMsg(e.response?.data?.message || e.message); }
  }
  useEffect(()=>{ load(); }, []);
  async function create(e){ e.preventDefault(); await api.post('/teams', form); setForm({ name:'', description:''}); load(); }
  async function assignEmp(e){ e.preventDefault(); await api.post('/teams/'+assign.teamId+'/assign', { employeeId: assign.employeeId }); setAssign({ teamId:'', employeeId:''}); load(); }
  async function removeTeam(id){ if(!confirm('Delete team?')) return; await api.delete('/teams/'+id); load(); }
  return (<div>
    <h3>Teams</h3>
    <form onSubmit={create} className="card">
      <input placeholder="Name" value={form.name} onChange={e=>setForm({...form, name:e.target.value})} /><br/>
      <input placeholder="Description" value={form.description} onChange={e=>setForm({...form, description:e.target.value})} /><br/>
      <button>Create Team</button>
    </form>
    <div className="card">
      <h4>Assign employee to team</h4>
      <select value={assign.teamId} onChange={e=>setAssign({...assign, teamId:e.target.value})}>
        <option value="">--select team--</option>
        {teams.map(t=><option value={t.id} key={t.id}>{t.name}</option>)}
      </select>
      <select value={assign.employeeId} onChange={e=>setAssign({...assign, employeeId:e.target.value})}>
        <option value="">--select employee--</option>
        {employees.map(emp=><option value={emp.id} key={emp.id}>{emp.first_name} {emp.last_name}</option>)}
      </select>
      <button onClick={assignEmp}>Assign</button>
    </div>
    <div>{msg}</div>
    <div>
      {teams.map(t=>(
        <div key={t.id} className="card">
          <strong>{t.name}</strong><br/>{t.description}
          <div><button onClick={()=>removeTeam(t.id)}>Delete</button></div>
        </div>
      ))}
    </div>
  </div>);
}
