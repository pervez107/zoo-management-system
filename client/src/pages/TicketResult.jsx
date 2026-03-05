import { useEffect, useState, useRef } from 'react';
import { useParams, Link } from 'react-router-dom';
import axios from 'axios';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';
import { Download, Home, Calendar, User, Users, MapPin, QrCode, CheckCircle2, Ticket as TicketIcon } from 'lucide-react';

const TicketResult = () => {
  const { ticketId } = useParams();
  const ticketRef = useRef(null); 
  
  const [ticket, setTicket] = useState(null);
  const [loading, setLoading] = useState(true);

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
    try {
      // Temporarily add a class or style if needed for html2canvas
      const canvas = await html2canvas(input, { 
        scale: 2, 
        backgroundColor: "#ffffff", 
        useCORS: true,
        logging: false
      });
      const imgData = canvas.toDataURL('image/png');
      const pdf = new jsPDF('p', 'mm', 'a4');
      const pdfWidth = pdf.internal.pageSize.getWidth();
      const pdfHeight = (canvas.height * pdfWidth) / canvas.width;
      
      // Add image to PDF with a small margin
      pdf.addImage(imgData, 'PNG', 10, 10, pdfWidth - 20, pdfHeight - 20);
      pdf.save(`Zoo-Pass-${ticket.ticketId}.pdf`);
    } catch (err) {
      alert("Error generating PDF");
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
      {/* Dark Gradient Overlay */}
      <div className="absolute inset-0 bg-gray-900/80 backdrop-blur-sm pointer-events-none"></div>

      <div className="relative z-10 w-full max-w-2xl flex flex-col items-center">
        
        {/* Success Header */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-green-500 rounded-full mb-4 shadow-[0_0_20px_rgba(34,197,94,0.5)]">
            <CheckCircle2 className="w-10 h-10 text-white" />
          </div>
          <h2 className="text-4xl md:text-5xl font-extrabold text-white mb-2 drop-shadow-lg">Booking Confirmed!</h2>
          <p className="text-green-100 text-lg font-light">Your wild adventure is ready. Download your pass below.</p>
        </div>

        {/* ========================================== */}
        {/* THE PRINTABLE TICKET (Designed for PDF Export) */}
        {/* ========================================== */}
        <div 
          ref={ticketRef} 
          className="bg-white rounded-3xl overflow-hidden shadow-2xl w-full max-w-md mx-auto border-t-[12px] border-green-600 relative"
          style={{ fontFamily: 'sans-serif' }} // Ensures PDF uses standard fonts
        >
          {/* Header */}
          <div className="p-8 text-center bg-[#fdfbf7] border-b-2 border-dashed border-gray-300 relative">
            {/* Cutouts for realism */}
            <div className="absolute -bottom-4 -left-4 w-8 h-8 bg-gray-900 rounded-full"></div>
            <div className="absolute -bottom-4 -right-4 w-8 h-8 bg-gray-900 rounded-full"></div>

            <h1 className="text-3xl font-black text-gray-900 tracking-tight uppercase mb-1">Zoo Explorer Pass</h1>
            <p className="text-green-600 font-bold tracking-widest text-sm uppercase">General Admission</p>
          </div>

          {/* Body */}
          <div className="p-8 bg-white">
            <div className="space-y-6">
              
              {/* Info Rows */}
              <div className="flex items-start gap-4">
                <div className="bg-green-100 p-2.5 rounded-xl text-green-700">
                  <User className="w-5 h-5" />
                </div>
                <div>
                  <p className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-0.5">Visitor Name</p>
                  <p className="text-lg font-bold text-gray-800">{ticket.visitorName}</p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="bg-green-100 p-2.5 rounded-xl text-green-700">
                  <Calendar className="w-5 h-5" />
                </div>
                <div>
                  <p className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-0.5">Valid For Date</p>
                  <p className="text-lg font-bold text-gray-800">
                    {new Date(ticket.visitDate).toLocaleDateString(undefined, { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}
                  </p>
                </div>
              </div>

              <div className="flex justify-between items-center bg-gray-50 p-4 rounded-2xl border border-gray-100">
                <div>
                  <p className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-1 flex items-center gap-1"><Users className="w-3 h-3"/> Visitors</p>
                  <p className="font-bold text-gray-800">{ticket.adultCount} Adult, {ticket.childCount} Child</p>
                </div>
                <div className="text-right">
                  <p className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-1">Total Paid</p>
                  <p className="font-black text-green-600 text-xl">${ticket.totalAmount}</p>
                </div>
              </div>

            </div>
          </div>

          {/* Footer (QR / Barcode Area) */}
          <div className="bg-[#fdfbf7] p-6 border-t-2 border-dashed border-gray-300 text-center relative">
            {/* Cutouts for realism */}
            <div className="absolute -top-4 -left-4 w-8 h-8 bg-gray-900 rounded-full"></div>
            <div className="absolute -top-4 -right-4 w-8 h-8 bg-gray-900 rounded-full"></div>

            <div className="flex justify-center mb-3">
              {/* Fake QR Code using Lucide Icon for aesthetics */}
              <div className="p-2 bg-white rounded-lg shadow-sm border border-gray-200">
                <QrCode className="w-20 h-20 text-gray-800" strokeWidth={1.5} />
              </div>
            </div>
            <p className="font-mono text-gray-500 font-bold tracking-[0.2em] text-sm">
              {ticket.ticketId}
            </p>
            <p className="text-[10px] text-gray-400 uppercase tracking-widest mt-4">Scan at main entrance</p>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="mt-10 flex flex-col sm:flex-row gap-4 w-full max-w-md">
          <button 
            onClick={downloadPDF} 
            className="flex-1 flex justify-center items-center gap-2 bg-green-500 text-gray-900 px-6 py-4 rounded-xl font-bold hover:bg-green-400 transition-all shadow-[0_8px_20px_rgba(34,197,94,0.3)] hover:-translate-y-1"
          >
            <Download className="w-5 h-5" /> Download PDF
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