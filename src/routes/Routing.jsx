import React from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'

import PaginaHome from '../pages/PaginaHome';
import PaginaAdministración from '../pages/PaginaAdministración';
import PaginaAdministraciónUsuarios from '../pages/PaginaAdministracionUsuarios';
import PaginaRegistro from "../pages/PaginaRegistro"
import PaginaLogin from '../pages/PaginaLogin';
import PaginaPanelAdministrativo from '../pages/PaginaPanelAdministrativo';
import PaginaKimi from '../pages/PaginaKimi';
import PaginaRusell from '../pages/PaginaRusell';
import PaginaAdminKimi from '../pages/PaginaAdminKimi';
import PaginaAdminRusell from '../pages/PaginaAdminRusell';

function Routing() {
    return (
        <div>
            <Router>
                <Routes>
                    <Route path="/" element={<PaginaHome />} />
                    <Route path="/administracion" element={<PaginaAdministración />} />
                    <Route path="/administracion-usuarios" element={<PaginaAdministraciónUsuarios />} />
                    <Route path="/registro" element={<PaginaRegistro />} />
                    <Route path="/login" element={<PaginaLogin />} />
                    <Route path="/panel-administrativo" element={<PaginaPanelAdministrativo />} />
                    <Route path="/kimi-antonelli" element={<PaginaKimi />} />
                    <Route path="/george-rusell" element={<PaginaRusell />} />
                    <Route path="/admin-kimi" element={<PaginaAdminKimi />} />
                    <Route path="/admin-rusell" element={<PaginaAdminRusell />} />

                </Routes>
            </Router>
        </div>
    )
}

export default Routing