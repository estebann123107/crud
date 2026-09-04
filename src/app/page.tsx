"use client";

// Importación de iconos desde la librería
import { CheckCircle2, Circle, Trash2, Plus } from "lucide-react";

export default function TodoView() {
  return (
    <div className="p-4 max-w-md mx-auto space-y-4">
      {/* Botón de agregar tarea con icono */}
      <button className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-md">
        <Plus className="w-5 h-5" />
        <span>Agregar tarea</span>
      </button>

      {/* Lista visual con iconos de estado y acción */}
      <ul className="space-y-2">
        {/* Tarea completada */}
        <li className="flex items-center justify-between p-3 border rounded-lg">
          <div className="flex items-center gap-2 text-gray-500 line-through">
            <CheckCircle2 className="w-5 h-5 text-green-500" />
            <span>Tarea terminada</span>
          </div>
          <button
            aria-label="Eliminar"
            className="text-red-500 hover:text-red-700"
          >
            <Trash2 className="w-5 h-5" />
          </button>
        </li>

        {/* Tarea pendiente */}
        <li className="flex items-center justify-between p-3 border rounded-lg">
          <div className="flex items-center gap-2">
            <Circle className="w-5 h-5 text-gray-400" />
            <span>Tarea pendiente</span>
          </div>
          <button
            aria-label="Eliminar"
            className="text-red-500 hover:text-red-700"
          >
            <Trash2 className="w-5 h-5" />
          </button>
        </li>
      </ul>
    </div>
  );
}
