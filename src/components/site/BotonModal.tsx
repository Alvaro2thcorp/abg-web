import { useState } from "react";
import FormularioPresupuestoModal from "../FormularioPresupuestoModal";

interface Props {
  label: string;
  className?: string;
}

// Botón que abre el formulario de presupuesto / diagnóstico.
export default function BotonModal({ label, className = "abg-btn abg-btn--ink" }: Props) {
  const [open, setOpen] = useState(false);
  return (
    <>
      <button type="button" className={className} onClick={() => setOpen(true)}>
        {label}
      </button>
      <FormularioPresupuestoModal isOpen={open} onClose={() => setOpen(false)} />
    </>
  );
}
