import React, { useMemo, useState } from 'react';
import { COMPANY, CONTACT_READY, EMAIL_READY, WHATSAPP_READY, makeMailLink, makeWhatsAppLink } from '../config';
import { FAQ } from '../content';
import { ArrowUpRight, Copy, Mail, Phone, Pin, Plus, Send } from '../lib/icons';
import { Lines, SectionTag } from './ui';

const OPTIONS = [
  'Servicio general',
  'Refrigeración comercial',
  'Básculas y equipos',
  'Construcción o remodelación',
];

export default function Contact({ selected, onSelect }) {
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [details, setDetails] = useState('');
  const [status, setStatus] = useState({ type: '', text: '' });
  const [touched, setTouched] = useState(false);

  const options = OPTIONS.includes(selected) ? OPTIONS : [selected, ...OPTIONS];
  const invalid = details.trim().length < 8;

  const message = useMemo(() => [
    `Hola, quiero solicitar una cotización con ${COMPANY.name}.`,
    `Servicio: ${selected}`,
    `Nombre: ${name.trim() || 'No proporcionado'}`,
    phone.trim() ? `Teléfono: ${phone.trim()}` : null,
    `Detalles: ${details.trim() || '(sin detalles todavía)'}`,
  ].filter(Boolean).join('\n'), [selected, name, phone, details]);

  const guard = () => { setTouched(true); if (invalid) { setStatus({ type: 'error', text: 'Cuéntanos brevemente qué necesitas (mínimo 8 caracteres).' }); return false; } return true; };

  const copy = async () => {
    if (!guard()) return;
    try { await navigator.clipboard.writeText(message); setStatus({ type: 'ok', text: 'Solicitud copiada. Pégala en el medio de contacto que prefieras.' }); }
    catch { setStatus({ type: 'warn', text: 'No se pudo copiar automáticamente. Selecciona el texto de la vista previa y cópialo.' }); }
  };
  const whatsapp = () => { if (!guard()) return; window.open(makeWhatsAppLink(message), '_blank', 'noopener,noreferrer'); setStatus({ type: 'ok', text: 'Abriendo WhatsApp con tu solicitud…' }); };
  const mail = () => { if (!guard()) return; window.location.href = makeMailLink(`Cotización: ${selected}`, message); setStatus({ type: 'ok', text: 'Abriendo tu aplicación de correo…' }); };
  const submit = (e) => { e.preventDefault(); (WHATSAPP_READY ? whatsapp : EMAIL_READY ? mail : copy)(); };

  return (
    <>
      <section className="section faq" id="preguntas">
        <div className="container faq-layout">
          <div>
            <SectionTag n="06">RESPUESTAS RÁPIDAS</SectionTag>
            <h2 className="h2"><Lines lines={['PREGUNTAS', 'FRECUENTES.']} /></h2>
          </div>
          <div className="faq-list" data-reveal>
            {FAQ.map((f, i) => (
              <details className="faq-item" key={f.q}>
                <summary><span className="mono">0{i + 1}</span><span>{f.q}</span><Plus size={20} /></summary>
                <p>{f.a}</p>
              </details>
            ))}
          </div>
        </div>
      </section>

      <section className="section contact" id="cotizar">
        <div className="container contact-layout">
          <div className="contact-copy">
            <SectionTag n="07">COTIZACIÓN</SectionTag>
            <h2 className="h2 big"><Lines lines={['HAGAMOS', 'QUE SUCEDA.']} /></h2>
            <p className="lead" data-reveal>Cuéntanos qué necesita tu negocio y preparamos el siguiente paso.</p>
            <ul className="contact-data">
              <li><Pin size={19} /> {COMPANY.city}</li>
              {COMPANY.phone && <li><Phone size={19} /> <a href={`tel:${COMPANY.phone.replace(/[^\d+]/g, '')}`}>{COMPANY.phone}</a></li>}
              {EMAIL_READY && <li><Mail size={19} /> <a href={`mailto:${COMPANY.email}`}>{COMPANY.email}</a></li>}
              {COMPANY.hours && <li><span className="mono">HORARIO</span> {COMPANY.hours}</li>}
              {COMPANY.address && <li><Pin size={19} /> {COMPANY.address}</li>}
            </ul>
            {!CONTACT_READY && (
              <p className="note demo-note">Modo demostración: aún no hay WhatsApp, correo ni teléfono configurados. El formulario prepara tu solicitud para que la copies y la envíes. Los datos se configuran en <code>src/config.js</code>.</p>
            )}
          </div>

          <form className="form" onSubmit={submit} noValidate>
            <div className="form-top mono"><span>SOLICITUD DE COTIZACIÓN</span><ArrowUpRight size={20} /></div>

            <label htmlFor="f-service">¿Qué necesitas?</label>
            <select id="f-service" value={selected} onChange={(e) => onSelect(e.target.value)}>
              {options.map((o) => <option key={o}>{o}</option>)}
            </select>

            <div className="form-row">
              <div><label htmlFor="f-name">Nombre <em>(opcional)</em></label><input id="f-name" autoComplete="name" value={name} onChange={(e) => setName(e.target.value)} maxLength={80} placeholder="¿Cómo te llamas?" /></div>
              <div><label htmlFor="f-phone">Teléfono <em>(opcional)</em></label><input id="f-phone" type="tel" inputMode="tel" autoComplete="tel" value={phone} onChange={(e) => setPhone(e.target.value)} maxLength={30} placeholder="Para contactarte" /></div>
            </div>

            <label htmlFor="f-details">Cuéntanos sobre tu proyecto</label>
            <textarea id="f-details" rows={4} maxLength={800} value={details} onChange={(e) => setDetails(e.target.value)} onBlur={() => setTouched(true)}
              aria-invalid={touched && invalid} aria-describedby="f-status" placeholder="Ej. Necesito revisar una vitrina refrigerada que no enfría bien…" />

            <div className="form-actions">
              {WHATSAPP_READY && <button type="button" className="btn btn-orange" onClick={whatsapp}><span>Enviar por WhatsApp</span><Send size={19} /></button>}
              {EMAIL_READY && <button type="button" className={`btn ${WHATSAPP_READY ? 'btn-ice' : 'btn-orange'}`} onClick={mail}><span>Enviar por correo</span><Mail size={19} /></button>}
              <button type="button" className={`btn ${CONTACT_READY ? 'btn-ghost' : 'btn-orange'}`} onClick={copy}><span>Copiar solicitud</span><Copy size={19} /></button>
            </div>

            <p id="f-status" className={`form-status ${status.type}`} role="status" aria-live="polite">{status.text}</p>

            <details className="preview">
              <summary className="mono">VISTA PREVIA DEL MENSAJE</summary>
              <textarea readOnly value={message} rows={6} aria-label="Mensaje preparado" onFocus={(e) => e.target.select()} />
            </details>
          </form>
        </div>
      </section>
    </>
  );
}
