import React, { useEffect, useState, useMemo } from "react";
import { useSelector } from "react-redux";
import { useLocation } from "react-router-dom";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import "./pedidoMap.css";
import Header from "../../components/header";
import { getTrackingByOrder } from "../../../services/orderTrackingService";

const createIcon = (url) =>
    new L.Icon({ iconUrl: url, iconSize: [40, 40], iconAnchor: [20, 40], popupAnchor: [0, -35] });

const warehouseIcon = createIcon("https://cdn-icons-png.flaticon.com/512/2897/2897731.png"); 
const truckIcon = createIcon("https://cdn-icons-png.flaticon.com/512/3081/3081648.png"); 
const deliveryIcon = createIcon("https://cdn-icons-png.flaticon.com/512/1048/1048313.png"); 
const homeIcon = createIcon("https://cdn-icons-png.flaticon.com/512/484/484167.png"); 
const cancelIcon = createIcon("https://cdn-icons-png.flaticon.com/512/1828/1828778.png"); 

const defaultPosition = [-23.55052, -46.633308]; 

export default function PedidoMap() {
    const location = useLocation();
    const pedido = location.state?.pedido;
    const user = useSelector(state => state.user.user);
    const [trackingData, setTrackingData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [showLastInTransit, setShowLastInTransit] = useState(false);

    useEffect(() => {
        document.title = "Rastreio do Pedido";

        if (!pedido) {
            setError("Pedido não encontrado. Tente novamente.");
            setLoading(false);
            return;
        }

        async function fetchTracking() {
            setLoading(true);
            setError(null);

            try {
                const data = await getTrackingByOrder(pedido.id, user.token);
                
                const statusIcons = {
                    "Processando": warehouseIcon,
                    "Pedido Confirmado": warehouseIcon,
                    "Preparando para Envio": warehouseIcon,
                    "Despachado": warehouseIcon,
                    "Em trânsito": truckIcon,
                    "Saiu para entrega": deliveryIcon,
                    "Entregue": homeIcon,
                    "Cancelado": cancelIcon
                };

                const formattedTracking = await Promise.all(
                    (data || []).map(async (entry) => {
                        let coordinates = entry.latitude && entry.longitude
                            ? [entry.latitude, entry.longitude]
                            : await getCoordinates(entry.location);

                        return {
                            city: entry.location,
                            position: coordinates || defaultPosition,
                            status: entry.status,
                            icon: statusIcons[entry.status] || truckIcon
                        };
                    })
                );

                setTrackingData(formattedTracking);
            } catch (err) {
                setError(err.message);
            }
            setLoading(false);
        }

        fetchTracking();
    }, [pedido, user]);

    async function getCoordinates(city) {
        try {
            const response = await fetch(`https://nominatim.openstreetmap.org/search?format=json&q=${city}`);
            const data = await response.json();

            if (data.length > 0) {
                return [parseFloat(data[0].lat), parseFloat(data[0].lon)];
            }
        } catch (error) {
            console.error("Erro ao obter coordenadas:", error);
        }
        return null;
    }

    const lastInTransit = useMemo(() =>
        trackingData.filter(entry => entry.status === "Em trânsito").slice(-1),
        [trackingData]
    );

    const filteredTrackingData = useMemo(() => {
        if (showLastInTransit) {
            return lastInTransit;
        }
        return trackingData.filter(entry => entry.status !== "Em trânsito").concat(lastInTransit);
    }, [showLastInTransit, trackingData, lastInTransit]);

    const mapCenter = useMemo(() => 
        filteredTrackingData.length > 0 ? filteredTrackingData[0].position : defaultPosition, 
        [filteredTrackingData]
    );

    return (
        <>
            <Header />
            <div className="order-tracking">
                <div className="tracking-container">
                    {loading ? (
                        <p className="loading-message">🔄 Carregando rastreamento...</p>
                    ) : error ? (
                        <p className="error-message">❌ {error}</p>
                    ) : (
                        <>
                            <div className="map-section">
                                {filteredTrackingData.length > 0 && (
                                    <MapContainer center={mapCenter} zoom={6} className="map">
                                        <TileLayer
                                            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                                            attribution="&copy; OpenStreetMap contributors"
                                        />
                                        {filteredTrackingData.map((point, index) => (
                                            <Marker key={index} position={point.position} icon={point.icon}>
                                                <Popup>
                                                    <strong>{point.status}</strong>
                                                    <br />
                                                    📍 Localização: {point.city}
                                                </Popup>
                                            </Marker>
                                        ))}
                                    </MapContainer>
                                )}
                            </div>
                            <div className="tracking-info">
                                <h2>📦 Status do Pedido</h2>
                                <ul className="timeline">
                                    {trackingData.map((point, index) => (
                                        <li key={index}>
                                            <div className="circle"></div>
                                            <div className="tracking-text">
                                                <strong>{point.status}</strong>
                                                <span>{point.city}</span>
                                            </div>
                                        </li>
                                    ))}
                                </ul>
                                <label className="filter-checkbox">
                                    <input
                                        type="checkbox"
                                        checked={showLastInTransit}
                                        onChange={() => setShowLastInTransit(prev => !prev)}
                                    />
                                    Mostrar apenas o último "Em trânsito"
                                </label>
                            </div>
                        </>
                    )}
                </div>
            </div>
        </>
    );
}
