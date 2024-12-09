document.getElementById('calculate-btn').addEventListener('click', () => {
    const entrada = parseFloat(document.getElementById('entrada').value);
    const salida = parseFloat(document.getElementById('salida').value);
    const factorOrganico = parseFloat(document.getElementById('factor_organico').value);
    const factorSemiAplicado = parseFloat(document.getElementById('factor_semi_aplicado').value);
    const factorAcoplado = parseFloat(document.getElementById('factor_acoplado').value);
    const tipoProyecto = document.getElementById('tipo_proyecto').value;
    const salario = parseFloat(document.getElementById('salario').value);

    const total = entrada + salida;
    let ldc, mldc, esfuerzo, td, cp, p, costo, costoLdc;

    if (tipoProyecto === 'organico') {
        ldc = factorOrganico * total;
    } else if (tipoProyecto === 'semi_aplicado') {
        ldc = factorSemiAplicado * total;
    } else if (tipoProyecto === 'acoplado') {
        ldc = factorAcoplado * total;
    }

    mldc = ldc / 1000;

    const COCOMO_CONSTANTS = {
        'organico': {a: 2.4, b: 1.05, c: 2.5, d: 0.38},
        'semi_aplicado': {a: 3.0, b: 1.12, c: 2.5, d: 0.35},
        'acoplado': {a: 3.6, b: 1.20, c: 2.5, d: 0.32}
    };

    const a = COCOMO_CONSTANTS[tipoProyecto].a;
    const b = COCOMO_CONSTANTS[tipoProyecto].b;
    const c = COCOMO_CONSTANTS[tipoProyecto].c;
    const d = COCOMO_CONSTANTS[tipoProyecto].d;

    esfuerzo = a * Math.pow(mldc, b);
    td = c * Math.pow(esfuerzo, d);
    cp = Math.round(esfuerzo / td);
    p = Math.round(ldc / esfuerzo);
    costo = Math.round(esfuerzo * salario);
    costoLdc = Math.round(costo / ldc);

    document.getElementById('total').innerText = total;
    document.getElementById('ldc').innerText = ldc;
    document.getElementById('mldc').innerText = mldc;
    document.getElementById('esfuerzo').innerText = `${Math.round(esfuerzo)} PERSONAS MES`;
    document.getElementById('td').innerText = `${Math.round(td)} MESES DE TRABAJO`;
    document.getElementById('cp').innerText = `${cp} PERSONAS`;
    document.getElementById('p').innerText = `${p} LDC CADA MES A REALIZAR`;
    document.getElementById('costo').innerText = `${costo} Bs`;
    document.getElementById('costo_ldc').innerText = `${costoLdc} Bs`;
});

document.getElementById('clear-results').addEventListener('click', () => {
    document.getElementById('total').innerText = '';
    document.getElementById('ldc').innerText = '';
    document.getElementById('mldc').innerText = '';
    document.getElementById('esfuerzo').innerText = '';
    document.getElementById('td').innerText = '';
    document.getElementById('cp').innerText = '';
    document.getElementById('p').innerText = '';
    document.getElementById('costo').innerText = '';
    document.getElementById('costo_ldc').innerText = '';
});
