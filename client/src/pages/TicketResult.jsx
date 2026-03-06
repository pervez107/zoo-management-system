import { useEffect, useState, useRef } from 'react';
import { useParams, Link } from 'react-router-dom';
import axios from 'axios';
import html2canvas from 'html2canvas';
import { jsPDF } from 'jspdf';
import { Download, Home, Calendar, User, Users, QrCode, CheckCircle2, Ticket as TicketIcon } from 'lucide-react';
import toast from 'react-hot-toast';

const TicketResult = () => {
  const { ticketId } = useParams();
  const ticketRef = useRef(null);

  const [ticket, setTicket] = useState(null);
  const [loading, setLoading] = useState(true);
  const [downloading, setDownloading] = useState(false);

  useEffect(() => {
    const fetchTicket = async () => {
      try {
        const res = await axios.get(`http://localhost:5000/api/tickets/${ticketId}`);
        setTicket(res.data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching ticket", error);
        setLoading(false);
      }
    };
    fetchTicket();
  }, [ticketId]);

  const downloadPDF = async () => {
    const input = ticketRef.current;
    if (!input) return;

    setDownloading(true);
    const toastId = toast.loading('Generating your digital pass...');

    try {
      const canvas = await html2canvas(input, {
        scale: 2,
        backgroundColor: "#ffffff",
        useCORS: true,
        allowTaint: true,
        logging: false,
        onclone: (clonedDoc) => {
          // ULTIMATE CRASH FIX: Since our ticket is now 100% built with inline styles,
          // we can safely wipe out all injected Tailwind style tags in the snapshot.
          // This guarantees zero 'oklch' crashes, while our inline styles keep the layout perfect!
          clonedDoc.querySelectorAll('style').forEach((style) => {
            style.innerHTML = ''; 
          });
        }
      });

      const imgData = canvas.toDataURL('image/png');

      const pdf = new jsPDF('p', 'mm', 'a4');
      const pdfPageWidth = pdf.internal.pageSize.getWidth();
      const pdfPageHeight = pdf.internal.pageSize.getHeight();

      const margin = 10;
      const maxPdfWidth = pdfPageWidth - (margin * 2);
      const maxPdfHeight = pdfPageHeight - (margin * 2);

      const ratio = canvas.width / canvas.height;

      let finalWidth = maxPdfWidth;
      let finalHeight = finalWidth / ratio;

      if (finalHeight > maxPdfHeight) {
        finalHeight = maxPdfHeight;
        finalWidth = finalHeight * ratio;
      }

      const xOffset = (pdfPageWidth - finalWidth) / 2;

      pdf.addImage(imgData, 'PNG', xOffset, margin, finalWidth, finalHeight);

      pdf.save(`Zoo-Pass-${ticket.ticketId || 'Visitor'}.pdf`);

      toast.success('Ticket downloaded successfully!', { id: toastId });

    } catch (err) {
      console.error(err);
      toast.error("Error generating PDF. Please try again.", { id: toastId });
    } finally {
      setDownloading(false);
    }
  };

  if (loading) return (
    <div className="flex justify-center items-center h-screen bg-gray-900">
      <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-green-500"></div>
    </div>
  );

  if (!ticket) return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-900 text-white">
      <TicketIcon className="w-20 h-20 text-red-500 mb-4" />
      <h2 className="text-3xl font-bold mb-4">Ticket Not Found</h2>
      <Link to="/" className="bg-green-600 px-6 py-3 rounded-lg font-bold hover:bg-green-500">Return Home</Link>
    </div>
  );

  return (
    <div
      className="min-h-screen flex flex-col items-center justify-center bg-cover bg-center p-4 md:p-8 relative"
      style={{
        backgroundImage: "url('https://images.unsplash.com/photo-1544626154-15f16104bc17?q=80&w=2070&auto=format&fit=crop')"
      }}
    >
      <div className="absolute inset-0 bg-gray-900/80 backdrop-blur-sm pointer-events-none"></div>

      <div className="relative z-10 w-full max-w-2xl flex flex-col items-center">

        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-green-500 rounded-full mb-4 shadow-[0_0_20px_rgba(34,197,94,0.5)]">
            <CheckCircle2 className="w-10 h-10 text-white" />
          </div>
          <h2 className="text-4xl md:text-5xl font-extrabold text-white mb-2 drop-shadow-lg">Booking Confirmed!</h2>
          <p className="text-green-100 text-lg font-light">Your wild adventure is ready. Download your pass below.</p>
        </div>

        {/* PRINTABLE TICKET: Using strict inline styles for perfect html2canvas alignment */}
        <div
          ref={ticketRef}
          style={{
            width: '100%',
            maxWidth: '448px',
            margin: '0 auto',
            position: 'relative',
            fontFamily: 'sans-serif',
            backgroundColor: '#ffffff',
            borderTop: '12px solid #16a34a',
            borderRadius: '24px',
            boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.25)',
            overflow: 'hidden',
            boxSizing: 'border-box'
          }}
        >
          {/* Header Area */}
          <div style={{ padding: '32px', textAlign: 'center', backgroundColor: '#fdfbf7', borderBottom: '2px dashed #d1d5db', position: 'relative', boxSizing: 'border-box' }}>
            <div style={{ position: 'absolute', bottom: '-16px', left: '-16px', width: '32px', height: '32px', borderRadius: '50%', backgroundColor: '#111827' }}></div>
            <div style={{ position: 'absolute', bottom: '-16px', right: '-16px', width: '32px', height: '32px', borderRadius: '50%', backgroundColor: '#111827' }}></div>

            <h1 style={{ fontSize: '30px', fontWeight: '900', textTransform: 'uppercase', color: '#111827', margin: '0 0 4px 0', letterSpacing: '-1px' }}>Zoo Explorer Pass</h1>
            <p style={{ fontWeight: 'bold', fontSize: '14px', textTransform: 'uppercase', letterSpacing: '2px', color: '#16a34a', margin: '0' }}>General Admission</p>
          </div>

          {/* Main Info Area */}
          <div style={{ padding: '32px', backgroundColor: '#ffffff', boxSizing: 'border-box' }}>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>

              {/* Visitor Name */}
              <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
                <div style={{ padding: '10px', backgroundColor: '#dcfce3', color: '#15803d', borderRadius: '12px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <User style={{ width: '24px', height: '24px' }} />
                </div>
                <div style={{ display: 'flex', flexDirection: 'column' }}>
                  <p style={{ fontSize: '12px', fontWeight: 'bold', textTransform: 'uppercase', letterSpacing: '1px', color: '#9ca3af', margin: '0 0 2px 0' }}>Visitor Name</p>
                  <p style={{ fontSize: '18px', fontWeight: 'bold', color: '#1f2937', margin: '0' }}>{ticket.visitorName}</p>
                </div>
              </div>

              {/* Date */}
              <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
                <div style={{ padding: '10px', backgroundColor: '#dcfce3', color: '#15803d', borderRadius: '12px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <Calendar style={{ width: '24px', height: '24px' }} />
                </div>
                <div style={{ display: 'flex', flexDirection: 'column' }}>
                  <p style={{ fontSize: '12px', fontWeight: 'bold', textTransform: 'uppercase', letterSpacing: '1px', color: '#9ca3af', margin: '0 0 2px 0' }}>Valid For Date</p>
                  <p style={{ fontSize: '18px', fontWeight: 'bold', color: '#1f2937', margin: '0' }}>
                    {new Date(ticket.visitDate).toLocaleDateString(undefined, { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}
                  </p>
                </div>
              </div>

              {/* Summary Box */}
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '16px', backgroundColor: '#f9fafb', border: '1px solid #f3f4f6', borderRadius: '16px', boxSizing: 'border-box' }}>
                <div style={{ display: 'flex', flexDirection: 'column' }}>
                  <p style={{ fontSize: '12px', fontWeight: 'bold', textTransform: 'uppercase', letterSpacing: '1px', color: '#9ca3af', display: 'flex', alignItems: 'center', gap: '6px', margin: '0 0 4px 0' }}>
                    <Users style={{ width: '14px', height: '14px' }} /> Visitors
                  </p>
                  <p style={{ fontWeight: 'bold', color: '#1f2937', margin: '0' }}>
                    {ticket.adultCount} Adult, {ticket.childCount} Child
                  </p>
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', textAlign: 'right' }}>
                  <p style={{ fontSize: '12px', fontWeight: 'bold', textTransform: 'uppercase', letterSpacing: '1px', color: '#9ca3af', margin: '0 0 4px 0' }}>Total Paid</p>
                  <p style={{ fontWeight: '900', fontSize: '20px', color: '#16a34a', margin: '0' }}>${ticket.totalAmount}</p>
                </div>
              </div>

            </div>
          </div>

          {/* Footer Area */}
          <div style={{ padding: '24px', textAlign: 'center', backgroundColor: '#fdfbf7', borderTop: '2px dashed #d1d5db', position: 'relative', boxSizing: 'border-box' }}>
            <div style={{ position: 'absolute', top: '-16px', left: '-16px', width: '32px', height: '32px', borderRadius: '50%', backgroundColor: '#111827' }}></div>
            <div style={{ position: 'absolute', top: '-16px', right: '-16px', width: '32px', height: '32px', borderRadius: '50%', backgroundColor: '#111827' }}></div>

            <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '12px' }}>
              <div style={{ padding: '8px', backgroundColor: '#ffffff', border: '1px solid #e5e7eb', borderRadius: '8px', display: 'inline-flex' }}>
                <QrCode style={{ width: '80px', height: '80px', color: '#1f2937' }} strokeWidth={1.5} />
              </div>
            </div>

            <p style={{ fontFamily: 'monospace', fontWeight: 'bold', letterSpacing: '4px', fontSize: '14px', color: '#6b7280', margin: '8px 0' }}>
              {ticket.ticketId}
            </p>

            <p style={{ fontSize: '10px', textTransform: 'uppercase', letterSpacing: '2px', color: '#9ca3af', margin: '16px 0 0 0' }}>
              Scan at main entrance
            </p>
          </div>

        </div>

        <div className="mt-10 flex flex-col sm:flex-row gap-4 w-full max-w-md">
          <button
            onClick={downloadPDF}
            disabled={downloading}
            className="flex-1 flex justify-center items-center gap-2 bg-green-500 text-gray-900 px-6 py-4 rounded-xl font-bold hover:bg-green-400 transition-all shadow-[0_8px_20px_rgba(34,197,94,0.3)] hover:-translate-y-1 disabled:opacity-70 disabled:cursor-not-allowed"
          >
            <Download className="w-5 h-5" />
            {downloading ? 'Generating...' : 'Download PDF'}
          </button>

          <Link
            to="/"
            className="flex-1 flex justify-center items-center gap-2 bg-white/10 text-white border border-white/20 backdrop-blur-md px-6 py-4 rounded-xl font-bold hover:bg-white/20 transition-all hover:-translate-y-1"
          >
            <Home className="w-5 h-5" /> Return to Home
          </Link>
        </div>

      </div>
    </div>
  );
};

export default TicketResult;