"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.formatearTablaFecha = formatearTablaFecha;
function formatearTablaFecha(fechaISO) {
    const fecha = new Date(fechaISO);
    if (isNaN(fecha.getTime())) {
        return "";
    }
    const numeroDia = fecha.getDate();
    const opcionesMes = { month: 'long' };
    const nombreMes = new Intl.DateTimeFormat('es-PE', opcionesMes).format(fecha);
    return `${numeroDia} de ${nombreMes}`;
}
//# sourceMappingURL=formatearTablaFecha.js.map