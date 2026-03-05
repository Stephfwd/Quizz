import React from 'react'

import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'


import PaginaAdministración from '../pages/PaginaAdministración';
import PaginaRegistro from "../pages/PaginaRegistro"
import PaginaLogin from '../pages/PaginaLogin';

function Routing() {
    return (
        <div>
            <Router>
                <Routes>

                   <Route path="/" element={<PaginaHome />} />

                    <Route path="/administracion" element={<PaginaAdministración />} />
                    <Route path="/registro" element={<PaginaRegistro />} />
                    <Route path="/login" element={<PaginaLogin />} />
                    


                </Routes>
            </Router>
        </div>
    )
}

export default Routing