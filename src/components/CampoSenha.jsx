import { useState } from "react"

function CampoSenha({ id, label, value, onChange, required, maxLength, minLength, inputMode }) {
    const [mostrar, setMostrar] = useState(false)

    return (
        <div>
            {label && <label htmlFor={id}>{label}</label>}
            
            <div style={{ position: "relative", width: "100%", height: "44px" }}>
                <input
                    id={id}
                    type={mostrar ? "text" : "password"}
                    value={value}
                    onChange={onChange}
                    required={required}
                    maxLength={maxLength}
                    minLength={minLength}
                    inputMode={inputMode}
                    style={{ 
                        width: "100%",
                        height: "100%",
                        boxSizing: "border-box",
                        padding: "12px 45px 12px 14px",
                        fontFamily: "inherit",
                        fontSize: "15px",
                        margin: 0,
                        display: "block"
                    }}
                />
                
                <span
                    onMouseDown={(e) => e.preventDefault()}
                    onClick={() => setMostrar(!mostrar)}
                    style={{
                        position: "absolute",
                        right: "12px",
                        top: "50%",
                        transform: "translateY(-50%)",
                        color: "#0e3a57",
                        cursor: "pointer",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        zIndex: 10,
                        width: "24px",
                        height: "24px"
                    }}
                    title={mostrar ? "Ocultar" : "Mostrar"}
                >
                    {/* ÍCONES INVERTIDOS AQUI */}
                    {mostrar ? (
                        /* Olho Aberto */
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path>
                            <circle cx="12" cy="12" r="3"></circle>
                        </svg>
                    ) : (
                        /* Olho Riscado */
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24"></path>
                            <line x1="1" y1="1" x2="23" y2="23"></line>
                        </svg>
                    )}
                </span>
            </div>
        </div>
    )
}

export default CampoSenha