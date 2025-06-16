document.addEventListener('DOMContentLoaded', function() {
    // Base de imágenes locales para artículos (en formato WebP)
    const articleImages = {
        // Asigna un ID de artículo a cada imagen para evitar repeticiones
        // Cada artículo tiene su propia imagen única
        'acta-correccion': 'assets/img/articles/documentos-acta-2.webp',
        'acta-nacimiento': 'assets/img/articles/documentos-tramites-1.webp',
        'actas-extranjero': 'assets/img/articles/documentos-internacional-1.webp',
        'actualizacion-domicilio': 'assets/img/articles/tramites-documento-1.webp',
        'afore-cambio': 'assets/img/articles/finanzas-retiro-2.webp',
        'afore-consulta': 'assets/img/articles/finanzas-retiro-1.webp',
        'afore-retiro': 'assets/img/articles/finanzas-retiro-3.webp',
        'alta-imss': 'assets/img/articles/seguridad-social-1.webp',
        'apostilla-documentos': 'assets/img/articles/documentos-archivo-1.webp',
        'becas-benito-juarez': 'assets/img/articles/educacion-aula-1.webp',
        'billeteras-digitales': 'assets/img/articles/finanzas-digital-3.webp',
        'cedula-profesional': 'assets/img/articles/educacion-biblioteca-1.webp',
        'certificado-antecedentes': 'assets/img/articles/documentos-contrato-1.webp',
        'certificado-estudios': 'assets/img/articles/educacion-computadora-1.webp',
        'codi-pagos': 'assets/img/articles/finanzas-digital-1.webp',
        'constancia-antecedentes': 'assets/img/articles/documentos-oficina-1.webp',
        'constancia-fiscal': 'assets/img/articles/impuestos-formulario-1.webp',
        'credencial-ine': 'assets/img/articles/documentos-oficina-2.webp',
        'curp': 'assets/img/articles/documentos-identidad-2.webp',
        'homologacion-estudios': 'assets/img/articles/educacion-aula-2.webp',
        'imss-seguro-social': 'assets/img/articles/salud-hospital-1.webp',
        'ine-cita': 'assets/img/articles/tramites-fila-2.webp',
        'ine-consulta': 'assets/img/articles/documentos-firma-1.webp',
        'ine-reposicion': 'assets/img/articles/documentos-identidad-3.webp',
        'infonavit-estado-cuenta': 'assets/img/articles/vivienda-casa-1.webp',
        'licencia-cdmx': 'assets/img/articles/vehiculos-licencia-1.webp',
        'licencia-permanente': 'assets/img/articles/vehiculos-licencia-2.webp',
        'licencia-renovacion': 'assets/img/articles/vehiculos-licencia-3.webp',
        'licencia-tramite': 'assets/img/articles/vehiculos-licencia-4.webp',
        'multas-cdmx': 'assets/img/articles/vehiculos-multa-3.webp',
        'nacionalidad-mexicana': 'assets/img/articles/documentos-tramites-3.webp',
        'numero-imss': 'assets/img/articles/seguridad-social-3.webp',
        'pasaporte-cita': 'assets/img/articles/tramites-fila-1.webp',
        'pasaporte-mexicano': 'assets/img/articles/documentos-archivo-2.webp',
        'pasaporte-renovacion': 'assets/img/articles/documentos-tramites-4.webp',
        'permiso-conducir-internacional': 'assets/img/articles/viajes-carretera-1.webp',
        'predial-adeudos': 'assets/img/articles/impuestos-formulario-2.webp',
        'predial-consulta': 'assets/img/articles/impuestos-documento-1.webp',
        'predial-descuentos': 'assets/img/articles/impuestos-finanzas-1.webp',
        'predial-pago': 'assets/img/articles/impuestos-calculadora-1.webp',
        'prestamos-personales': 'assets/img/articles/finanzas-dinero-1.webp',
        'puntos-infracciones': 'assets/img/articles/vehiculos-multa-2.webp',
        'reclamaciones-bancarias': 'assets/img/articles/finanzas-banco-1.webp',
        'regimen-fiscal': 'assets/img/articles/impuestos-calendario-1.webp',
        'rfc': 'assets/img/articles/documentos-fiscal-1.webp',
        'sat-citas': 'assets/img/articles/tramites-oficina-1.webp',
        'seguro-desempleo': 'assets/img/articles/tramites-documento-2.webp',
        'semanas-cotizadas': 'assets/img/articles/seguridad-social-2.webp',
        'spei-transferencias': 'assets/img/articles/finanzas-digital-2.webp',
        'tenencia-vehicular': 'assets/img/articles/vehiculos-coche-2.webp',
        'tramites-sat': 'assets/img/articles/impuestos-formulario-3.webp',
        'verificacion-vehicular': 'assets/img/articles/vehiculos-revision-1.webp',
        'verificentros-cdmx': 'assets/img/articles/vehiculos-taller-1.webp',
        'visa-entrevista': 'assets/img/articles/viajes-montana-1.webp',
        'visa-renovacion': 'assets/img/articles/viajes-hotel-1.webp',
        'visa-turista': 'assets/img/articles/viajes-playa-1.webp',
        'visas-mexicanos': 'assets/img/articles/viajes-avion-1.webp'
    };
    
    // Imágenes de respaldo por categoría (si falta alguna imagen específica)
    const categoryBackupImages = {
        'documentos': 'assets/img/categories/documentos.webp',
        'tramites': 'assets/img/categories/tramites.webp',
        'vehiculos': 'assets/img/categories/vehiculos.webp',
        'impuestos': 'assets/img/categories/impuestos.webp',
        'finanzas': 'assets/img/categories/finanzas.webp',
        'vivienda': 'assets/img/categories/vivienda.webp',
        'viajes': 'assets/img/categories/viajes.webp',
        'salud': 'assets/img/categories/salud.webp',
        'educacion': 'assets/img/categories/educacion.webp',
        'default': 'assets/img/categories/default.webp'
    };
    
    // Categorías para clasificar los artículos
    const categories = {
        'documentos': {
            name: 'Documentos Personales',
            icon: '📄'
        },
        'tramites': {
            name: 'Trámites Oficiales',
            icon: '🏛️'
        },
        'impuestos': {
            name: 'Impuestos',
            icon: '💰'
        },
        'seguridad': {
            name: 'Seguridad Social',
            icon: '🏥'
        },
        'vehiculos': {
            name: 'Vehículos',
            icon: '🚗'
        },
        'viajes': {
            name: 'Viajes',
            icon: '✈️'
        },
        'educacion': {
            name: 'Educación',
            icon: '🎓'
        },
        'finanzas': {
            name: 'Finanzas',
            icon: '💳'
        }
    };
    
    // Datos de los artículos
    const articlesData = [
        // Artículos obligatorios
        {
            id: 'curp',
            title: '¿Qué es el CURP y cómo consultarlo en línea?',
            description: 'Guía completa sobre la Clave Única de Registro de Población: cómo obtenerla, consultarla y para qué sirve.',
            category: 'documentos',
            readingTime: '5 min',
            image: 'assets/img/articles/documentos-identidad-2.webp'
        },
        {
            id: 'rfc',
            title: '¿Qué es el RFC y cómo obtenerlo sin complicaciones?',
            description: 'Todo sobre el Registro Federal de Contribuyentes: proceso de obtención, consulta y su importancia en México.',
            category: 'documentos',
            readingTime: '7 min',
            image: 'assets/img/articles/documentos-fiscal-1.webp'
        },
        {
            id: 'multas-cdmx',
            title: 'Multas CDMX: cómo consultarlas y evitar recargos',
            description: 'Información sobre consulta de multas de tránsito en Ciudad de México y cómo evitar recargos e intereses.',
            category: 'vehiculos',
            readingTime: '6 min',
            image: 'assets/img/articles/vehiculos-multa-3.webp'
        },
        // IMSS
        {
            id: 'numero-imss',
            title: '¿Cómo obtener o recuperar tu Número de Seguridad Social?',
            description: 'Guía para obtener, consultar o recuperar tu Número de Seguridad Social del IMSS fácilmente.',
            category: 'seguridad',
            readingTime: '4 min',
            image: 'assets/img/articles/seguridad-social-3.webp'
        },
        {
            id: 'alta-imss',
            title: 'Proceso de alta en el IMSS para trabajadores',
            description: 'Información detallada sobre el proceso de afiliación al Instituto Mexicano del Seguro Social.',
            category: 'seguridad',
            readingTime: '8 min',
            image: 'assets/img/articles/seguridad-social-1.webp'
        },
        {
            id: 'semanas-cotizadas',
            title: 'Consulta de semanas cotizadas ante el IMSS',
            description: 'Cómo verificar tu historial laboral y semanas cotizadas en el Seguro Social.',
            category: 'seguridad',
            readingTime: '5 min',
            image: 'assets/img/articles/seguridad-social-2.webp'
        },
        // INE/IFE
        {
            id: 'ine-consulta',
            title: 'Consulta del estado de tu credencial INE',
            description: 'Verifica el estado de tu credencial para votar y conoce cuándo debes renovarla.',
            category: 'documentos',
            readingTime: '4 min',
            image: 'assets/img/articles/documentos-firma-1.webp'
        },
        {
            id: 'ine-cita',
            title: '¿Cómo agendar una cita en el INE?',
            description: 'Guía paso a paso para programar tu cita en el Instituto Nacional Electoral.',
            category: 'tramites',
            readingTime: '6 min',
            image: 'assets/img/articles/tramites-fila-2.webp'
        },
        {
            id: 'ine-reposicion',
            title: 'Reposición de credencial INE por robo o extravío',
            description: 'Proceso para solicitar una nueva credencial de elector en caso de pérdida o robo.',
            category: 'documentos',
            readingTime: '5 min',
            image: 'assets/img/articles/documentos-identidad-3.webp'
        },
        // AFORE
        {
            id: 'afore-consulta',
            title: '¿Cómo consultar tu AFORE y tu saldo?',
            description: 'Guía para verificar en qué administradora está tu cuenta de retiro y cuánto has ahorrado.',
            category: 'finanzas',
            readingTime: '4 min',
            image: 'assets/img/articles/finanzas-retiro-1.webp'
        },
        {
            id: 'afore-cambio',
            title: 'Proceso de cambio de AFORE: requisitos y pasos',
            description: 'Todo lo que necesitas saber para cambiar tu cuenta de AFORE a otra administradora.',
            category: 'finanzas',
            readingTime: '8 min',
            image: 'assets/img/articles/finanzas-retiro-2.webp'
        },
        {
            id: 'afore-retiro',
            title: 'Retiro parcial de AFORE: casos aplicables',
            description: 'Situaciones en las que puedes retirar parte de tus ahorros de tu cuenta de AFORE antes de jubilarte.',
            category: 'finanzas',
            readingTime: '5 min',
            image: 'assets/img/articles/finanzas-retiro-3.webp'
        },
        // Acta de nacimiento
        {
            id: 'acta-nacimiento',
            title: '¿Cómo obtener una copia de tu acta de nacimiento en línea?',
            description: 'Proceso para solicitar y descargar tu acta de nacimiento de forma digital.',
            category: 'documentos',
            readingTime: '4 min',
            image: 'assets/img/articles/documentos-tramites-1.webp'
        },
        {
            id: 'acta-correccion',
            title: 'Corrección de errores en el acta de nacimiento',
            description: 'Procedimiento para rectificar datos incorrectos en tu acta de nacimiento.',
            category: 'documentos',
            readingTime: '5 min',
            image: 'assets/img/articles/documentos-acta-2.webp'
        },
        {
            id: 'actas-extranjero',
            title: 'Obtención de actas de nacimiento para mexicanos en el extranjero',
            description: 'Guía para conseguir actas de nacimiento si vives fuera de México.',
            category: 'documentos',
            readingTime: '6 min',
            image: 'assets/img/articles/documentos-internacional-1.webp'
        },
        // Pagos digitales
        {
            id: 'codi-pagos',
            title: 'CoDi: Sistema de pagos digitales en México',
            description: 'Todo sobre la plataforma de Cobro Digital del Banco de México y cómo utilizarla.',
            category: 'finanzas',
            readingTime: '4 min',
            image: 'assets/img/articles/finanzas-digital-1.webp'
        },
        {
            id: 'spei-transferencias',
            title: 'Transferencias SPEI: guía completa',
            description: 'Información sobre el Sistema de Pagos Electrónicos Interbancarios y cómo realizar transferencias.',
            category: 'finanzas',
            readingTime: '8 min',
            image: 'assets/img/articles/finanzas-digital-2.webp'
        },
        {
            id: 'billeteras-digitales',
            title: 'Billeteras digitales disponibles en México',
            description: 'Comparativa de las principales opciones de pago digital en el país.',
            category: 'finanzas',
            readingTime: '5 min',
            image: 'assets/img/articles/finanzas-digital-3.webp'
        },
        // Licencia de conducir
        {
            id: 'licencia-tramite',
            title: 'Trámite de licencia de conducir en México',
            description: 'Requisitos y proceso para obtener tu licencia de conducir por primera vez.',
            category: 'vehiculos',
            readingTime: '4 min',
            image: 'assets/img/articles/vehiculos-licencia-4.webp'
        },
        {
            id: 'licencia-renovacion',
            title: 'Renovación de licencia de conducir: documentos necesarios',
            description: 'Lo que necesitas para renovar tu licencia de conducir vencida o próxima a vencer.',
            category: 'vehiculos',
            readingTime: '6 min',
            image: 'assets/img/articles/vehiculos-licencia-3.webp'
        },
        {
            id: 'licencia-permanente',
            title: 'Licencia permanente: requisitos y estados donde está disponible',
            description: 'Estados de México donde puedes obtener una licencia de conducir permanente y sus requisitos.',
            category: 'vehiculos',
            readingTime: '5 min',
            image: 'assets/img/articles/vehiculos-licencia-2.webp'
        },
        // Pasaporte
        {
            id: 'pasaporte-mexicano',
            title: 'Requisitos para tramitar el pasaporte mexicano',
            description: 'Documentación necesaria y proceso para obtener tu pasaporte mexicano.',
            category: 'documentos',
            readingTime: '7 min',
            image: 'assets/img/articles/documentos-archivo-2.webp'
        },
        {
            id: 'pasaporte-cita',
            title: '¿Cómo agendar una cita para pasaporte?',
            description: 'Guía paso a paso para programar tu cita en la Secretaría de Relaciones Exteriores.',
            category: 'tramites',
            readingTime: '5 min',
            image: 'assets/img/articles/tramites-fila-1.webp'
        },
        {
            id: 'pasaporte-renovacion',
            title: 'Renovación de pasaporte mexicano anticipada',
            description: 'Información sobre cómo renovar tu pasaporte antes de que venza.',
            category: 'documentos',
            readingTime: '4 min',
            image: 'assets/img/articles/documentos-tramites-4.webp'
        },
        // Constancia de situación fiscal
        {
            id: 'constancia-fiscal',
            title: 'Constancia de situación fiscal: cómo obtenerla',
            description: 'Proceso para descargar tu constancia de situación fiscal actualizada del SAT.',
            category: 'impuestos',
            readingTime: '3 min',
            image: 'assets/img/articles/impuestos-formulario-1.webp'
        },
        {
            id: 'regimen-fiscal',
            title: 'Regímenes fiscales en México y sus obligaciones',
            description: 'Comparativa de los diferentes regímenes fiscales para contribuyentes.',
            category: 'impuestos',
            readingTime: '7 min',
            image: 'assets/img/articles/impuestos-calendario-1.webp'
        },
        {
            id: 'sat-citas',
            title: 'Sistema de citas del SAT: guía de uso',
            description: 'Cómo agendar, modificar o cancelar citas en el Servicio de Administración Tributaria.',
            category: 'tramites',
            readingTime: '4 min',
            image: 'assets/img/articles/tramites-oficina-1.webp'
        },
        // Visa americana
        {
            id: 'visa-turista',
            title: 'Visa de turista para Estados Unidos: proceso completo',
            description: 'Requisitos y pasos para solicitar la visa B1/B2 para visitar EE.UU.',
            category: 'viajes',
            readingTime: '8 min',
            image: 'assets/img/articles/viajes-playa-1.webp'
        },
        {
            id: 'visa-entrevista',
            title: 'Preparación para la entrevista de visa americana',
            description: 'Consejos y recomendaciones para tu entrevista en el consulado estadounidense.',
            category: 'viajes',
            readingTime: '5 min',
            image: 'assets/img/articles/viajes-montana-1.webp'
        },
        {
            id: 'visa-renovacion',
            title: 'Renovación de visa americana sin entrevista',
            description: 'Casos en los que puedes renovar tu visa estadounidense sin acudir a una entrevista.',
            category: 'viajes',
            readingTime: '4 min',
            image: 'assets/img/articles/viajes-hotel-1.webp'
        },
        // Educación
        {
            id: 'becas-benito-juarez',
            title: 'Becas Benito Juárez: beneficiarios y registro',
            description: 'Información sobre los programas de becas del gobierno federal para estudiantes.',
            category: 'educacion',
            readingTime: '6 min',
            image: 'assets/img/articles/educacion-aula-1.webp'
        },
        {
            id: 'cedula-profesional',
            title: 'Trámite de cédula profesional electrónica',
            description: 'Proceso para obtener tu cédula profesional de forma digital tras concluir tus estudios.',
            category: 'educacion',
            readingTime: '5 min',
            image: 'assets/img/articles/educacion-biblioteca-1.webp'
        },
        {
            id: 'certificado-estudios',
            title: 'Obtención de certificados de estudios en línea',
            description: 'Cómo solicitar y descargar certificados de estudios oficiales por medios digitales.',
            category: 'educacion',
            readingTime: '4 min',
            image: 'assets/img/articles/educacion-computadora-1.webp'
        },
        // Predial
        {
            id: 'predial-pago',
            title: 'Pago de predial en línea: principales ciudades',
            description: 'Guía para pagar tu impuesto predial por internet en las principales ciudades de México.',
            category: 'impuestos',
            readingTime: '5 min',
            image: 'assets/img/articles/impuestos-calculadora-1.webp'
        },
        {
            id: 'predial-descuentos',
            title: 'Descuentos en el predial: quiénes aplican',
            description: 'Grupos que pueden obtener descuentos en el pago del impuesto predial y cómo solicitarlos.',
            category: 'impuestos',
            readingTime: '4 min',
            image: 'assets/img/articles/impuestos-finanzas-1.webp'
        },
        {
            id: 'predial-adeudos',
            title: 'Consulta de adeudos de predial',
            description: 'Herramientas para verificar si tienes adeudos pendientes de impuesto predial.',
            category: 'impuestos',
            readingTime: '3 min',
            image: 'assets/img/articles/impuestos-formulario-2.webp'
        },
        // Nacionalidad y documentos migratorios
        {
            id: 'nacionalidad-mexicana',
            title: 'Cómo obtener la nacionalidad mexicana por naturalización',
            description: 'Requisitos y proceso para extranjeros que desean obtener la nacionalidad mexicana.',
            category: 'documentos',
            readingTime: '8 min',
            image: 'assets/img/articles/documentos-tramites-3.webp'
        },
        {
            id: 'apostilla-documentos',
            title: 'Apostilla de documentos mexicanos: guía completa',
            description: 'Proceso para legalizar documentos mexicanos para su uso en el extranjero.',
            category: 'documentos',
            readingTime: '7 min',
            image: 'assets/img/articles/documentos-archivo-1.webp'
        },
        {
            id: 'tenencia-vehicular',
            title: 'Tenencia vehicular: estados donde se cobra y exenciones',
            description: 'Información sobre el impuesto de tenencia vehicular en diferentes estados de México.',       
            category: 'vehiculos',
            readingTime: '5 min',
            image: 'assets/img/articles/vehiculos-coche-2.webp'
        },
        // Páginas adicionales
        {
            id: 'actualizacion-domicilio',
            title: 'Actualización de domicilio: trámites en línea',
            description: 'Cómo actualizar tu domicilio en instituciones gubernamentales y servicios importantes.',
            category: 'tramites',
            readingTime: '4 min',
            image: 'assets/img/articles/tramites-documento-1.webp'
        },
        {
            id: 'certificado-antecedentes',
            title: 'Certificado de antecedentes no penales',
            description: 'Guía para obtener tu certificado de antecedentes no penales federal o estatal.',
            category: 'documentos',
            readingTime: '5 min',
            image: 'assets/img/articles/documentos-contrato-1.webp'
        },
        {
            id: 'constancia-antecedentes',
            title: 'Constancia de antecedentes no penales: guía',
            description: 'Todo lo que necesitas saber para solicitar tu constancia de antecedentes no penales.',
            category: 'documentos',
            readingTime: '6 min',
            image: 'assets/img/articles/documentos-oficina-1.webp'
        },
        {
            id: 'credencial-ine',
            title: 'Credencial para votar (INE): trámites relacionados',
            description: 'Información sobre la credencial del INE y todos sus trámites asociados.',
            category: 'documentos',
            readingTime: '7 min',
            image: 'assets/img/articles/documentos-oficina-2.webp'
        },
        {
            id: 'homologacion-estudios',
            title: 'Homologación de estudios extranjeros en México',
            description: 'Proceso para reconocer estudios realizados en el extranjero en el sistema educativo mexicano.',
            category: 'educacion',
            readingTime: '8 min',
            image: 'assets/img/articles/educacion-aula-2.webp'
        },
        {
            id: 'imss-seguro-social',
            title: 'IMSS: trámites y servicios del Seguro Social',
            description: 'Guía completa de los principales servicios y trámites ofrecidos por el IMSS.',
            category: 'salud',
            readingTime: '7 min',
            image: 'assets/img/articles/salud-hospital-1.webp'
        },
        {
            id: 'infonavit-estado-cuenta',
            title: 'Estado de cuenta del INFONAVIT',
            description: 'Cómo consultar y comprender tu estado de cuenta del INFONAVIT.',
            category: 'vivienda',
            readingTime: '4 min',
            image: 'assets/img/articles/vivienda-casa-1.webp'
        },
        {
            id: 'licencia-cdmx',
            title: 'Licencia de conducir CDMX: requisitos y trámites',
            description: 'Todo lo que necesitas saber para tramitar o renovar tu licencia en la Ciudad de México.',
            category: 'vehiculos',
            readingTime: '6 min',
            image: 'assets/img/articles/vehiculos-licencia-1.webp'
        },
        {
            id: 'permiso-conducir-internacional',
            title: 'Permiso internacional de conducir',
            description: 'Información sobre cómo obtener un permiso para conducir en el extranjero.',
            category: 'viajes',
            readingTime: '5 min',
            image: 'assets/img/articles/viajes-carretera-1.webp'
        },
        {
            id: 'predial-consulta',
            title: 'Consulta de predial en línea',
            description: 'Herramientas y métodos para verificar información sobre tu impuesto predial.',
            category: 'impuestos',
            readingTime: '3 min',
            image: 'assets/img/articles/impuestos-documento-1.webp'
        },
        {
            id: 'prestamos-personales',
            title: 'Préstamos personales: opciones y requisitos',
            description: 'Comparativa de las distintas opciones de préstamos personales disponibles en México.',
            category: 'finanzas',
            readingTime: '6 min',
            image: 'assets/img/articles/finanzas-dinero-1.webp'
        },
        {
            id: 'puntos-infracciones',
            title: 'Consulta de puntos e infracciones',
            description: 'Cómo verificar los puntos e infracciones asociados a tu licencia de conducir.',
            category: 'vehiculos',
            readingTime: '4 min',
            image: 'assets/img/articles/vehiculos-multa-2.webp'
        },
        {
            id: 'reclamaciones-bancarias',
            title: 'Reclamaciones bancarias: proceso y derechos',
            description: 'Guía para presentar reclamaciones ante instituciones financieras y conocer tus derechos.',
            category: 'finanzas',
            readingTime: '7 min',
            image: 'assets/img/articles/finanzas-banco-1.webp'
        },
        {
            id: 'seguro-desempleo',
            title: 'Seguro de desempleo: requisitos y solicitud',
            description: 'Información sobre el programa de seguro de desempleo y cómo solicitarlo.',
            category: 'tramites',
            readingTime: '5 min',
            image: 'assets/img/articles/tramites-documento-2.webp'
        },
        {
            id: 'tramites-sat',
            title: 'Trámites más comunes en el SAT',
            description: 'Guía de los procedimientos más frecuentes ante el Servicio de Administración Tributaria.',
            category: 'impuestos',
            readingTime: '6 min',
            image: 'assets/img/articles/impuestos-formulario-3.webp'
        },
        {
            id: 'verificacion-vehicular',
            title: 'Verificación vehicular: calendario y requisitos',
            description: 'Todo lo que necesitas saber sobre la verificación de emisiones para tu vehículo.',
            category: 'vehiculos',
            readingTime: '5 min',
            image: 'assets/img/articles/vehiculos-revision-1.webp'
        },
        {
            id: 'verificentros-cdmx',
            title: 'Verificentros en CDMX: ubicaciones y horarios',
            description: 'Lista de centros autorizados para realizar la verificación vehicular en Ciudad de México.',
            category: 'vehiculos',
            readingTime: '4 min',
            image: 'assets/img/articles/vehiculos-taller-1.webp'
        },
        {
            id: 'visas-mexicanos',
            title: 'Visas para mexicanos: países sin requisito',
            description: 'Lista de países que no requieren visa para ciudadanos mexicanos y condiciones de viaje.',
            category: 'viajes',
            readingTime: '7 min',
            image: 'assets/img/articles/viajes-avion-1.webp'
        }
    ];

    // Función para generar las tarjetas de artículos
    function generateArticleCards() {
        const articlesGrid = document.getElementById('articlesGrid');
        
        // Limpiamos el grid antes de añadir nuevas tarjetas (útil para la búsqueda)
        articlesGrid.innerHTML = '';
        
        articlesData.forEach((article, index) => {
            const articleCard = document.createElement('a');
            articleCard.href = `pages/${article.id}.html`;
            articleCard.className = 'article-card';
            
            // Asignamos categoría por defecto si no está definida
            const category = article.category || 'tramites';
            const { icon, name } = categories[category] || categories['tramites'];
            const readingTime = article.readingTime || '5 min';
            
            // Asignar imagen única a cada artículo
            // Приоритет: 1) поле image в статье, 2) articleImages по ID, 3) изображение категории
            const cardImage = article.image || articleImages[article.id] || categoryBackupImages[category] || categoryBackupImages['default'];
            
            // Generamos un número aleatorio entre 1 y 3 para la variante de diseño
            const designVariant = Math.floor(Math.random() * 3) + 1;
            articleCard.classList.add(`variant-${designVariant}`);
            
            // Añadimos el índice como variable CSS para la animación con retraso
            articleCard.style.setProperty('--card-index', index);
            
            articleCard.innerHTML = `
                <div class="article-image">
                    <img src="${cardImage}" alt="${article.title}" loading="lazy">
                    <div class="image-overlay"></div>
                </div>
                <div class="article-content">
                    <div class="article-category">
                        <span class="category-icon">${icon}</span>
                        <span class="category-name">${name}</span>
                    </div>
                    <h3 class="article-title">${article.title}</h3>
                    <p class="article-description">${article.description}</p>
                    <div class="article-footer">
                        <span class="reading-time">
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                                <circle cx="12" cy="12" r="10"></circle>
                                <polyline points="12 6 12 12 16 14"></polyline>
                            </svg>
                            ${readingTime}
                        </span>
                        <span class="read-more">Leer más <span class="arrow">→</span></span>
                    </div>
                </div>
                <div class="card-shine"></div>
            `;
            
            articlesGrid.appendChild(articleCard);
        });
    }

    // Funcionalidad de búsqueda
    function setupSearch() {
        const searchInput = document.getElementById('searchInput');
        
        searchInput.addEventListener('input', function() {
            const searchTerm = this.value.toLowerCase().trim();
            const articleCards = document.querySelectorAll('.article-card');
            
            articleCards.forEach(card => {
                const title = card.querySelector('.article-title').textContent.toLowerCase();
                const description = card.querySelector('.article-description').textContent.toLowerCase();
                
                if (title.includes(searchTerm) || description.includes(searchTerm)) {
                    card.style.display = '';
                } else {
                    card.style.display = 'none';
                }
            });
        });
    }

    // Menú móvil
    function setupMobileMenu() {
        const hamburger = document.querySelector('.hamburger');
        const navLinks = document.querySelector('.nav-links');
        
        hamburger.addEventListener('click', () => {
            navLinks.classList.toggle('active');
            hamburger.textContent = navLinks.classList.contains('active') ? '✕' : '☰';
        });
        
        // Cerrar menú al hacer clic en un enlace
        const navItems = document.querySelectorAll('.nav-links a');
        navItems.forEach(item => {
            item.addEventListener('click', () => {
                navLinks.classList.remove('active');
                hamburger.textContent = '☰';
            });
        });
    }

    // Cookie Banner
    function setupCookieBanner() {
        const cookieBanner = document.getElementById('cookieBanner');
        const acceptBtn = document.getElementById('acceptCookie');
        
        // Comprobar si el usuario ya aceptó las cookies
        if (localStorage.getItem('cookiesAccepted') !== 'true') {
            cookieBanner.style.display = 'flex';
        } else {
            cookieBanner.style.display = 'none';
        }
        
        acceptBtn.addEventListener('click', () => {
            localStorage.setItem('cookiesAccepted', 'true');
            cookieBanner.style.display = 'none';
        });
    }

    // Inicializar todas las funcionalidades
    generateArticleCards();
    setupSearch();
    setupMobileMenu();
    setupCookieBanner();
});
