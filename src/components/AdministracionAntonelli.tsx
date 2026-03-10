import React, { useState, useEffect } from 'react'
import ServicioPrendas from '../services/ServicioPrendas'
import PanelAdministrativo from './PanelAdministrativo'
import Swal from 'sweetalert2'
import '../styles/Home.css'

function AdministracionAntonelli() {
    const endpoint = "prendasKimi";
    const [prendas, setPrendas] = useState<any[]>([])
    const [title, setTitle] = useState("")
    const [precio, setPrecio] = useState("")
    const [imagen, setImagen] = useState("")
    const [detalle, setDetalle] = useState("")
    const [stock, setStock] = useState("")
    const [editandoId, setEditandoId] = useState(null)

    useEffect(() => {
        cargarPrendas()
    }, [])

    async function cargarPrendas() {
        const data = await ServicioPrendas.getPrendas(endpoint)
        setPrendas(data)
    }

    async function guardarPrenda() {
        const titleTrimmed = title.trim();
        const precioTrimmed = precio.trim();
        const imagenTrimmed = imagen.trim();
        const detalleTrimmed = detalle.trim();
        const stockNum = parseInt(stock);

        if (!titleTrimmed || !precioTrimmed || !imagenTrimmed || !detalleTrimmed) {
            Swal.fire({
                icon: 'warning',
                title: 'Campos Incompletos',
                text: 'Todos los campos son obligatorios. No se permiten solo espacios.',
                confirmButtonColor: '#3b82f6'
            });
            return;
        }

        if (isNaN(stockNum) || stockNum < 0) {
            Swal.fire({
                icon: 'warning',
                title: 'Stock Inválido',
                text: 'El stock debe ser un número mayor o igual a 0.',
                confirmButtonColor: '#3b82f6'
            });
            return;
        }

        const precioRegex = /[0-9]/;
        if (!precioRegex.test(precioTrimmed)) {
            Swal.fire({
                icon: 'error',
                title: 'Precio Inválido',
                text: 'El precio debe contener al menos un número.',
                confirmButtonColor: '#ef4444'
            });
            return;
        }

        const imagenRegex = /^(https?:\/\/.*\.(?:png|jpg|jpeg|gif|webp|avif|svg))(\?.*)?$/i;
        if (!imagenRegex.test(imagenTrimmed)) {
            Swal.fire({
                icon: 'error',
                title: 'URL Inválida',
                text: 'La URL de la imagen no es válida. Debe ser un enlace de imagen (ej: .jpg, .png, .webp).',
                confirmButtonColor: '#ef4444'
            });
            return;
        }

        const finalPrecio = precioTrimmed.startsWith('$') ? precioTrimmed : `$${precioTrimmed}`;

        const objPrenda = {
            title: titleTrimmed,
            precio: finalPrecio,
            imagen: imagenTrimmed,
            detalle: detalleTrimmed,
            stock: stockNum
        }

        if (editandoId) {
            await ServicioPrendas.patchPrendas(objPrenda, editandoId, endpoint)
            setEditandoId(null)
            Swal.fire({
                title: '¡Actualizado!',
                text: 'El artículo ha sido actualizado con éxito.',
                icon: 'success',
                toast: true,
                position: 'top-end',
                timer: 3000,
                showConfirmButton: false
            });
        } else {
            const nuevaPrenda = {
                id: crypto.randomUUID().slice(0, 4),
                title: titleTrimmed,
                precio: finalPrecio,
                imagen: imagenTrimmed,
                detalle: detalleTrimmed,
                stock: stockNum
            }
            await ServicioPrendas.postPrendas(nuevaPrenda, endpoint)
            Swal.fire({
                title: '¡Guardado!',
                text: 'El artículo ha sido agregado con éxito.',
                icon: 'success',
                toast: true,
                position: 'top-end',
                timer: 3000,
                showConfirmButton: false
            });
        }

        setTitle("")
        setPrecio("")
        setImagen("")
        setDetalle("")
        setStock("")
        cargarPrendas()
    }

    async function eliminarPrenda(id: any) {
        Swal.fire({
            title: '¿Estás seguro?',
            text: "No podrás revertir esta acción de eliminar la prenda de Kimi.",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#ef4444',
            cancelButtonColor: '#64748b',
            confirmButtonText: 'Sí, eliminar',
            cancelButtonText: 'Cancelar'
        }).then(async (result) => {
            if (result.isConfirmed) {
                await ServicioPrendas.deletePrendas(id, endpoint)
                cargarPrendas()
                Swal.fire({
                    title: '¡Eliminado!',
                    text: 'La prenda ha sido eliminada.',
                    icon: 'success',
                    toast: true,
                    position: 'top-end',
                    timer: 3000,
                    showConfirmButton: false
                });
            }
        });
    }

    function activarEdicion(prenda: any) {
        setEditandoId(prenda.id as any)
        setTitle(prenda.title as any)
        setPrecio(prenda.precio as any)
        setImagen(prenda.imagen as any)
        setDetalle(prenda.detalle as any || "")
        setStock(prenda.stock as any !== undefined ? String(prenda.stock) : "0")
        window.scrollTo({ top: 0, behavior: 'smooth' });
    }

    return (
        <div className="home-container">
            <PanelAdministrativo />

            <div className="admin-content" style={{ padding: '20px', maxWidth: '1200px', margin: '0 auto' }}>
                <h1 style={{ color: 'white', textAlign: 'center', marginBottom: '30px' }}>Administración Kimi Antonelli</h1>

                <div className="admin-form-container" style={{ background: 'var(--bg-card)', padding: '30px', borderRadius: '20px', border: '1px solid var(--glass-border)', marginBottom: '40px', boxShadow: '0 10px 30px rgba(0,0,0,0.3)' }}>
                    <h2 style={{ color: 'white', marginBottom: '20px' }}>{editandoId ? "Editar Artículo" : "Agregar Nuevo Artículo"}</h2>
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '15px' }}>
                        <input
                            type="text"
                            placeholder="Nombre de la prenda"
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                            style={{ padding: '12px', borderRadius: '10px', border: '1px solid var(--glass-border)', background: 'var(--bg-dark)', color: 'white' }}
                        />
                        <input
                            type="text"
                            placeholder="Precio (ej: $10.00)"
                            value={precio}
                            onChange={(e) => setPrecio(e.target.value.replace(/[^0-9.$]/g, ''))}
                            style={{ padding: '12px', borderRadius: '10px', border: '1px solid var(--glass-border)', background: 'var(--bg-dark)', color: 'white' }}
                        />
                        <input
                            type="number"
                            placeholder="Stock (cantidad disponible)"
                            value={stock}
                            min="0"
                            onChange={(e) => setStock(e.target.value)}
                            style={{ padding: '12px', borderRadius: '10px', border: '1px solid var(--glass-border)', background: 'var(--bg-dark)', color: 'white' }}
                        />
                        <input
                            type="text"
                            placeholder="URL de la imagen"
                            value={imagen}
                            onChange={(e) => setImagen(e.target.value)}
                            style={{ padding: '12px', borderRadius: '10px', border: '1px solid var(--glass-border)', background: 'var(--bg-dark)', color: 'white' }}
                        />
                        <textarea
                            placeholder="Detalle de la prenda (Características, material, etc.)"
                            value={detalle}
                            onChange={(e) => setDetalle(e.target.value)}
                            style={{ padding: '12px', borderRadius: '10px', border: '1px solid var(--glass-border)', background: 'var(--bg-dark)', color: 'white', minHeight: '80px', gridColumn: '1 / -1', fontFamily: 'inherit' }}
                        />
                        <div style={{ display: 'flex', gap: '10px', gridColumn: '1 / -1' }}>
                            <button onClick={guardarPrenda} className="btn-add-cart" style={{ flex: 2, padding: '12px' }}>
                                {editandoId ? "Actualizar" : "Guardar"}
                            </button>
                            {editandoId && (
                                <button
                                    onClick={() => { setEditandoId(null); setTitle(""); setPrecio(""); setImagen(""); setDetalle(""); setStock(""); }}
                                    style={{ flex: 1, background: '#64748b', color: 'white', border: 'none', borderRadius: '10px', cursor: 'pointer' }}
                                >
                                    Cancelar
                                </button>
                            )}
                        </div>
                    </div>
                </div>

                <h2 style={{ color: 'white', marginBottom: '20px' }}>Catálogo Kimi</h2>
                <div className="admin-catalog-grid">
                    {prendas.map((prenda: any) => (
                        <div key={prenda.id as any} className="admin-catalog-card">
                            <img src={prenda.imagen as any} alt={prenda.title as any} className="admin-clothing-image" />
                            <h3>{prenda.title as any}</h3>
                            <p>{prenda.precio as any}</p>
                            <p style={{ color: prenda.stock > 0 ? '#10b981' : '#ef4444', fontWeight: 'bold', fontSize: '0.9rem' }}>
                                Stock: {prenda.stock as any !== undefined ? prenda.stock as any : 'N/A'}
                            </p>
                            <div style={{ display: 'flex', gap: '10px', marginTop: '15px' }}>
                                <button onClick={() => activarEdicion(prenda)} style={{ flex: 1, background: '#f59e0b', color: 'white', border: 'none', padding: '8px', borderRadius: '8px', cursor: 'pointer' }}>
                                    Editar
                                </button>
                                <button onClick={() => eliminarPrenda(prenda.id as any)} style={{ flex: 1, background: '#ef4444', color: 'white', border: 'none', padding: '8px', borderRadius: '8px', cursor: 'pointer' }}>
                                    Eliminar
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
}

export default AdministracionAntonelli