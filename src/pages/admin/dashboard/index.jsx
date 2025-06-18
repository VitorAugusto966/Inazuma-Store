import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { getDashboardStats } from "../../../services/adminService";
import AdminHeader from "../../components/adminHeader";
import {
  BarChart, Bar, PieChart, Pie, Cell,
  XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer
} from "recharts";
import "./dashboard.css";

export default function AdminDashboard() {
  const token = useSelector((state) => state.user.user?.token);

  const [kpis, setKpis] = useState({
    totalUsuarios: 0,
    totalPedidos: 0,
    totalCupons: 0,
    totalValorPedidos: 0,
    crescimentoUsuarios: 0,
    crescimentoPedidos: 0,
    userGrowthData: [],
    ordersData: [],
    pieData: [],
    cuponsData: [],
  });

  useEffect(() => {
    document.title = "Inazuma Store - Dashboard";
    async function fetchKpis() {
      const data = await getDashboardStats(token);
      if (data) {
        setKpis((prevKpis) => ({
          ...prevKpis,
          ...data,
          pieData: Array.isArray(data.pieData) ? data.pieData : [],
          cuponsData: Array.isArray(data.cuponsData) ? data.cuponsData : [],
          ordersData: Array.isArray(data.ordersData) ? data.ordersData : [],
        }));
      }
    }
    fetchKpis();
  }, [token]);

  const formatCurrency = (value) =>
    new Intl.NumberFormat("pt-BR", { style: "currency", currency: "BRL" }).format(value);

  const formatPercent = (value) => `${value > 0 ? "+" : ""}${value}%`;

  return (
    <>
      <AdminHeader />
      <div className="admin-dashboard">
        <h1>📊 Dashboard Administrativo</h1>

        <div className="kpi-cards">
          <div className="kpi-card">
            <div className="kpi-icon">👥</div>
            <div>
              <h3>Total de Usuários</h3>
              <p>{kpis.totalUsuarios}</p>
              <span className="kpi-growth">{formatPercent(kpis.crescimentoUsuarios)}</span>
            </div>
          </div>
          <div className="kpi-card">
            <div className="kpi-icon">🛒</div>
            <div>
              <h3>Total de Pedidos</h3>
              <p>{kpis.totalPedidos}</p>
              <span className="kpi-growth">{formatPercent(kpis.crescimentoPedidos)}</span>
            </div>
          </div>
          <div className="kpi-card">
            <div className="kpi-icon">💰</div>
            <div>
              <h3>Faturamento Total</h3>
              <p>{formatCurrency(kpis.totalValorPedidos)}</p>
            </div>
          </div>
          <div className="kpi-card">
            <div className="kpi-icon">🏷️</div>
            <div>
              <h3>Total de Cupons</h3>
              <p>{kpis.totalCupons}</p>
            </div>
          </div>
        </div>

        <div className="charts">
          <div className="chart">
            <h3>📈 Total de Pedidos</h3>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={kpis.ordersData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="pedidos" fill="#3b82f6" />
              </BarChart>
            </ResponsiveContainer>
          </div>

          <div className="chart">
            <h3>📦 Status dos Pedidos</h3>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={kpis.pieData}
                  dataKey="value"
                  nameKey="name"
                  outerRadius={80}
                  label
                >
                  {Array.isArray(kpis.pieData) &&
                    kpis.pieData.map((entry, index) => (
                      <Cell
                        key={`cell-${index}`}
                        fill={["#00c49f", "#ff6f61", "#8884d8", "#facc15"][index % 4]}
                      />
                    ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </div>

          <div className="chart">
            <h3>💸 Faturamento Mensal</h3>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={kpis.faturamentoData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis tickFormatter={(valor) => `R$ ${valor}`} />
                <Tooltip formatter={(valor) => `R$ ${valor}`} />
                <Bar dataKey="valor" fill="#10b981" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </>
  );
}
