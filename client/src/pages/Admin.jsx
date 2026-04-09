import { useState, useEffect } from 'react';
import axios from 'axios';
import { 
  Settings, PlusCircle, Trash2, Image as ImageIcon, CheckCircle, 
  List, Ticket as TicketIcon, IndianRupee, Users, Activity, Leaf, Filter, 
  Info, Sparkles, ShieldCheck
} from 'lucide-react';
import toast from 'react-hot-toast'; 

// --- MUI IMPORTS ---
import { 
  TextField, MenuItem, Button, CircularProgress, 
  Table, TableBody, TableCell, TableContainer, TableHead, TableRow, 
  IconButton, Tooltip, Box 
} from '@mui/material';

const Admin = () => {
  const [animals, setAnimals] = useState([]);
  const [tickets, setTickets] = useState([]);
  const [uploading, setUploading] = useState(false);
  const [initialLoading, setInitialLoading] = useState(true); 
  
  const [filterCategory, setFilterCategory] = useState('All');
  
  // Form State including all new fields
  const [formData, setFormData] = useState({
    name: '', 
    species: '', 
    description: '', 
    image: '', 
    count: 1,
    category: '', 
    born: '', 
    origin: '',
    gender: '',               
    funFacts: '',             
    behavior: '',             
    conservationStatus: ''  
  });

  const fetchData = async () => {
    try {
      const [animalRes, ticketRes] = await Promise.all([
        axios.get('http://localhost:5000/api/animals'),
        axios.get('http://localhost:5000/api/tickets')
      ]);
      setAnimals(animalRes.data);
      setTickets(ticketRes.data);
    } catch (error) {
      console.error("Error fetching admin data", error);
      toast.error("Failed to load database records."); 
    } finally {
      setInitialLoading(false); 
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const totalRevenue = tickets
    .filter(t => t.paymentStatus === 'Paid')
    .reduce((sum, t) => sum + t.totalAmount, 0);
    
  const totalVisitors = tickets
    .filter(t => t.paymentStatus === 'Paid')
    .reduce((sum, t) => sum + t.adultCount + t.childCount, 0);

  const filteredAnimals = animals.filter(animal => {
    if (filterCategory === 'All') return true;
    return animal.category === filterCategory;
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const uploadFileHandler = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const imageFormData = new FormData();
    imageFormData.append('image', file);
    
    setUploading(true);
    const toastId = toast.loading('Uploading image...'); 

    try {
      const config = { headers: { 'Content-Type': 'multipart/form-data' } };
      const { data } = await axios.post('http://localhost:5000/api/upload', imageFormData, config);
      setFormData({ ...formData, image: `http://localhost:5000${data.imageUrl}` });
      setUploading(false);
      toast.success('Image uploaded successfully!', { id: toastId }); 
    } catch (error) {
      console.error(error);
      setUploading(false);
      toast.error("Image upload failed!", { id: toastId }); 
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.image) return toast.error("Please upload an image first!"); 

    try {
      await axios.post('http://localhost:5000/api/animals', formData);
      toast.success(`${formData.name} added to the sanctuary! 🦁`); 
      setFormData({ 
        name: '', species: '', description: '', image: '', count: 1, 
        category: '', born: '', origin: '', 
        gender: '', funFacts: '', behavior: '', conservationStatus: '' 
      }); 
      fetchData(); 
    } catch (error) {
      toast.error(error.response?.data?.message || 'Error adding animal'); 
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to permanently remove this animal record?")) {
      try {
        await axios.delete(`http://localhost:5000/api/animals/${id}`);
        toast.success("Record deleted successfully."); 
        fetchData(); 
      } catch (error) {
        toast.error("Error deleting animal",error); 
      }
    }
  };

  // ==========================================
  // SKELETON LOADER UI (MUI CircularProgress)
  // ==========================================
  if (initialLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
         <div className="flex flex-col items-center gap-4">
            <CircularProgress color="success" size={60} thickness={4} />
            <p className="text-slate-500 font-bold animate-pulse mt-2">Syncing Sanctuary Data...</p>
         </div>
      </div>
    );
  }

  // ==========================================
  // MAIN COMPONENT UI
  // ==========================================
  return (
    <div className="min-h-screen bg-gray-50 p-6 md:p-10 pb-20">
      <div className="max-w-7xl mx-auto space-y-8">
        {/* HEADER */}
        <div className="bg-gray-900 text-white p-8 rounded-[2rem] shadow-2xl flex items-center justify-between relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-r from-emerald-900/50 to-transparent"></div>
          <div className="relative z-10 flex items-center gap-5">
            <div className="bg-yellow-500 p-4 rounded-2xl shadow-lg border border-yellow-400">
              <Settings className="w-8 h-8 text-gray-900" />
            </div>
            <div>
              <h1 className="text-3xl md:text-5xl font-black tracking-tight mb-1">
                Command Center
              </h1>
              <p className="text-green-300 font-medium text-lg flex items-center gap-2">
                <Leaf className="w-4 h-4" /> Management System Online
              </p>
            </div>
          </div>
        </div>

        {/* METRICS */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <MetricCard
            icon={<Activity />}
            label="Residents"
            value={animals.length}
            color="green"
          />
          <MetricCard
            icon={<TicketIcon />}
            label="Bookings"
            value={tickets.length}
            color="blue"
          />
          <MetricCard
            icon={<IndianRupee />}
            label="Revenue"
            value={`₹${totalRevenue}`}
            color="yellow"
          />
          <MetricCard
            icon={<Users />}
            label="Visitors"
            value={totalVisitors}
            color="purple"
          />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
          {/* LEFT: ANIMALS DATABASE TABLE (MUI TABLE) */}
          <div className="order-2 lg:order-1 lg:col-span-2 bg-white rounded-[2.5rem] shadow-lg border border-gray-100 overflow-hidden flex flex-col h-[900px]">
            <div className="p-8 border-b border-gray-100 flex justify-between items-center bg-slate-900 text-white">
              <h2 className="text-2xl font-bold flex items-center gap-3">
                <List className="text-blue-400" /> Database
              </h2>
              <TextField
                select
                size="small"
                value={filterCategory}
                onChange={(e) => setFilterCategory(e.target.value)}
                sx={{
                  bgcolor: "#1e293b",
                  borderRadius: 2,
                  input: { color: "white" },
                  "& .MuiSelect-select": {
                    color: "white",
                    fontWeight: "bold",
                    fontSize: "0.8rem",
                  },
                  "& .MuiOutlinedInput-notchedOutline": { border: "none" },
                  "& .MuiSvgIcon-root": { color: "white" },
                }}
              >
                <MenuItem value="All">All Species</MenuItem>
                <MenuItem value="Mammals">Mammals</MenuItem>
                <MenuItem value="Birds">Birds</MenuItem>
                <MenuItem value="Reptiles">Reptiles</MenuItem>
                <MenuItem value="Aquatic">Aquatic</MenuItem>
              </TextField>
            </div>

            <TableContainer sx={{ flex: 1, overflowY: "auto" }}>
              <Table stickyHeader>
                <TableHead>
                  <TableRow>
                    <TableCell
                      sx={{
                        fontWeight: 900,
                        color: "#9ca3af",
                        textTransform: "uppercase",
                        fontSize: "10px",
                        letterSpacing: "0.1em",
                        bgcolor: "#f8fafc",
                      }}
                    >
                      Resident
                    </TableCell>
                    <TableCell
                      sx={{
                        fontWeight: 900,
                        color: "#9ca3af",
                        textTransform: "uppercase",
                        fontSize: "10px",
                        letterSpacing: "0.1em",
                        bgcolor: "#f8fafc",
                      }}
                    >
                      Status & Bio
                    </TableCell>
                    <TableCell
                      align="right"
                      sx={{
                        fontWeight: 900,
                        color: "#9ca3af",
                        textTransform: "uppercase",
                        fontSize: "10px",
                        letterSpacing: "0.1em",
                        bgcolor: "#f8fafc",
                      }}
                    >
                      Action
                    </TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {filteredAnimals.map((animal) => (
                    <TableRow
                      key={animal._id}
                      hover
                      sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                    >
                      <TableCell>
                        <div className="flex items-center gap-4">
                          <img
                            src={animal.image}
                            className="w-14 h-14 rounded-2xl object-cover shadow-sm"
                            alt=""
                          />
                          <div>
                            <p className="font-bold text-gray-900">
                              {animal.name}
                            </p>
                            <p className="text-xs text-green-600 font-bold">
                              {animal.species}
                            </p>
                          </div>
                        </div>
                      </TableCell>
                      <TableCell>
                        <span className="text-[10px] font-black uppercase bg-emerald-100 text-emerald-700 px-2 py-1 rounded-md mb-1 inline-block">
                          {animal.conservationStatus || "Stable"}
                        </span>
                        <p className="text-sm text-gray-500 line-clamp-1 italic">
                          "{animal.description}"
                        </p>
                      </TableCell>
                      <TableCell align="right">
                        <Tooltip title="Delete Record" placement="top">
                          <IconButton
                            onClick={() => handleDelete(animal._id)}
                            color="error"
                            sx={{
                              bgcolor: "#fef2f2",
                              "&:hover": { bgcolor: "#fee2e2" },
                            }}
                          >
                            <Trash2 size={20} />
                          </IconButton>
                        </Tooltip>
                      </TableCell>
                    </TableRow>
                  ))}
                  {filteredAnimals.length === 0 && (
                    <TableRow>
                      <TableCell
                        colSpan={3}
                        align="center"
                        sx={{ py: 10, color: "text.secondary" }}
                      >
                        No animals found.
                      </TableCell>
                    </TableRow>
                  )}
                </TableBody>
              </Table>
            </TableContainer>
          </div>

          {/* RIGHT: ADD ANIMAL FORM (MUI) */}
          <div className="order-1 lg:order-2 lg:col-span-1 bg-white rounded-[2.5rem] shadow-xl border border-gray-100 overflow-hidden h-[900px] flex flex-col">
            <div className="p-8 bg-green-600 text-white">
              <h2 className="text-2xl font-bold flex items-center gap-3">
                <PlusCircle /> New Registry
              </h2>
              <p className="text-green-100 text-xs font-bold uppercase mt-1 tracking-widest">
                Sanctuary Expansion
              </p>
            </div>

            <Box
              component="form"
              onSubmit={handleSubmit}
              sx={{ p: 4, overflowY: "auto", flex: 1 }}
              className="custom-scrollbar"
            >
              {/* Basic Section */}
              <div className="mb-6">
                <div className="flex items-center gap-2 text-slate-400 font-black text-[10px] uppercase tracking-widest mb-3">
                  <Info size={14} /> Basic Identity
                </div>
                <MuiInput
                  label="Name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="e.g. Simba"
                  required
                />
                <div className="grid grid-cols-2 gap-3 mb-3">
                  <MuiSelect
                    label="Category"
                    name="category"
                    value={formData.category}
                    onChange={handleChange}
                    options={["Mammals", "Birds", "Reptiles", "Aquatic"]}
                  />
                  <MuiSelect
                    label="Gender"
                    name="gender"
                    value={formData.gender}
                    onChange={handleChange}
                    options={["Male", "Female"]}
                    placeholder="Select Gender"
                    required
                  />
                </div>
                <MuiInput
                  label="Species"
                  name="species"
                  value={formData.species}
                  onChange={handleChange}
                  placeholder="e.g. Panthera leo"
                  required
                />
              </div>

              {/* Stats Section */}
              <div className="mb-6">
                <div className="flex items-center gap-2 text-slate-400 font-black text-[10px] uppercase tracking-widest mb-3">
                  <ShieldCheck size={14} /> Vital Records
                </div>
                <div className="grid grid-cols-2 gap-3 mb-3">
                  <MuiInput
                    label="Birth Date"
                    name="born"
                    type={formData.born ? "date" : "text"}
                    value={formData.born}
                    onChange={handleChange}
                    onFocus={(e) => (e.target.type = "date")}
                    onBlur={(e) => {
                      if (!formData.born) e.target.type = "text";
                    }}
                    required
                  />
                  <MuiSelect
                    label="Status"
                    name="conservationStatus"
                    value={formData.conservationStatus}
                    onChange={handleChange}
                    options={[
                      "Stable",
                      "Vulnerable",
                      "Endangered",
                      "Critically Endangered",
                    ]}
                  />
                </div>
                <MuiInput
                  label="Origin"
                  name="origin"
                  value={formData.origin}
                  onChange={handleChange}
                  placeholder="e.g. African Savanna"
                  required
                />
              </div>

              {/* Behavior Section */}
              <div className="mb-6">
                <div className="flex items-center gap-2 text-slate-400 font-black text-[10px] uppercase tracking-widest mb-3">
                  <Sparkles size={14} /> Biology & Habits
                </div>
                <MuiInput
                  label="Short Bio"
                  name="description"
                  value={formData.description}
                  onChange={handleChange}
                  multiline
                  rows={2}
                  required
                />
                <MuiInput
                  label="Fun Facts"
                  name="funFacts"
                  value={formData.funFacts}
                  onChange={handleChange}
                  multiline
                  rows={2}
                  placeholder="e.g. Roar can be heard 5 miles away"
                  required
                />
                <MuiInput
                  label="Behavioral Notes"
                  name="behavior"
                  value={formData.behavior}
                  onChange={handleChange}
                  multiline
                  rows={2}
                  placeholder="e.g. Nocturnal hunter"
                  required
                />
              </div>

              {/* Image Upload (MUI Button) */}
              <Button
                variant="outlined"
                component="label"
                fullWidth
                color={formData.image ? "success" : "inherit"}
                sx={{
                  py: 3,
                  borderWidth: 2,
                  borderStyle: "dashed",
                  borderRadius: 4,
                  bgcolor: "#f8fafc",
                  display: "flex",
                  flexDirection: "column",
                  gap: 1,
                  "&:hover": {
                    borderWidth: 2,
                    borderStyle: "dashed",
                    borderColor: "#4ade80",
                  },
                }}
              >
                <div className="bg-white w-10 h-10 rounded-xl shadow-sm flex items-center justify-center">
                  <ImageIcon
                    className={
                      formData.image ? "text-green-600" : "text-gray-400"
                    }
                    size={20}
                  />
                </div>
                <span className="text-xs font-bold text-gray-500 uppercase tracking-widest">
                  {formData.image ? "Image Ready" : "Upload Portrait"}
                </span>
                <input type="file" hidden onChange={uploadFileHandler} />
              </Button>
              {uploading && (
                <div className="mt-2 text-center text-xs font-bold text-blue-500 animate-pulse">
                  Uploading...
                </div>
              )}

              <Button
                type="submit"
                variant="contained"
                disabled={uploading}
                fullWidth
                sx={{
                  mt: 4,
                  py: 2,
                  borderRadius: 8,
                  bgcolor: "#0f172a",
                  color: "white",
                  fontWeight: 900,
                  textTransform: "uppercase",
                  letterSpacing: "0.1em",
                  "&:hover": { bgcolor: "#16a34a" },
                }}
              >
                Register Resident
              </Button>
            </Box>
          </div>
        </div>

        {/* TICKET / BOOKING MANAGEMENT SECTION (MUI TABLE) */}
        <div className="bg-white rounded-[2.5rem] shadow-xl border border-gray-100 overflow-hidden mt-8">
          <div className="p-8 border-b border-gray-100 flex justify-between items-center bg-gray-900 text-white">
            <div>
              <h2 className="text-2xl font-bold flex items-center gap-3">
                <TicketIcon className="text-yellow-400 w-7 h-7" /> Financial &
                Booking Log
              </h2>
              <p className="text-gray-400 text-sm mt-1">
                Track all global ticket sales and visitor reservations.
              </p>
            </div>
          </div>

          <TableContainer sx={{ maxHeight: 500, overflowY: "auto" }}>
            <Table stickyHeader>
              <TableHead>
                <TableRow>
                  <TableCell
                    sx={{
                      fontWeight: 900,
                      color: "#9ca3af",
                      textTransform: "uppercase",
                      fontSize: "10px",
                      letterSpacing: "0.1em",
                      bgcolor: "#f8fafc",
                    }}
                  >
                    Ticket ID
                  </TableCell>
                  <TableCell
                    sx={{
                      fontWeight: 900,
                      color: "#9ca3af",
                      textTransform: "uppercase",
                      fontSize: "10px",
                      letterSpacing: "0.1em",
                      bgcolor: "#f8fafc",
                    }}
                  >
                    Visitor Details
                  </TableCell>
                  <TableCell
                    sx={{
                      fontWeight: 900,
                      color: "#9ca3af",
                      textTransform: "uppercase",
                      fontSize: "10px",
                      letterSpacing: "0.1em",
                      bgcolor: "#f8fafc",
                    }}
                  >
                    Visit Date
                  </TableCell>
                  <TableCell
                    sx={{
                      fontWeight: 900,
                      color: "#9ca3af",
                      textTransform: "uppercase",
                      fontSize: "10px",
                      letterSpacing: "0.1em",
                      bgcolor: "#f8fafc",
                    }}
                  >
                    Party Size
                  </TableCell>
                  <TableCell
                    align="right"
                    sx={{
                      fontWeight: 900,
                      color: "#9ca3af",
                      textTransform: "uppercase",
                      fontSize: "10px",
                      letterSpacing: "0.1em",
                      bgcolor: "#f8fafc",
                    }}
                  >
                    Revenue
                  </TableCell>
                  <TableCell
                    align="right"
                    sx={{
                      fontWeight: 900,
                      color: "#9ca3af",
                      textTransform: "uppercase",
                      fontSize: "10px",
                      letterSpacing: "0.1em",
                      bgcolor: "#f8fafc",
                    }}
                  >
                    Status
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {tickets.map((ticket) => (
                  <TableRow
                    key={ticket._id}
                    hover
                    sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                  >
                    <TableCell
                      sx={{
                        fontFamily: "monospace",
                        fontWeight: "bold",
                        color: "#4b5563",
                      }}
                    >
                      {ticket.ticketId || ticket._id.substring(0, 8)}
                    </TableCell>
                    <TableCell>
                      <p className="font-bold text-gray-900">
                        {ticket.visitorName}
                      </p>
                      <p className="text-xs text-gray-500 font-medium">
                        {ticket.email}
                      </p>
                    </TableCell>
                    <TableCell>
                      <span className="bg-gray-100 px-3 py-1 rounded-md border border-gray-200 text-sm font-bold text-gray-700">
                        {new Date(ticket.visitDate).toLocaleDateString()}
                      </span>
                    </TableCell>
                    <TableCell
                      sx={{
                        fontSize: "0.875rem",
                        fontWeight: 500,
                        color: "#4b5563",
                      }}
                    >
                      {ticket.adultCount} Adults, {ticket.childCount} Kids
                    </TableCell>
                    <TableCell
                      align="right"
                      sx={{
                        fontWeight: 900,
                        color: "#16a34a",
                        fontSize: "1.125rem",
                      }}
                    >
                      ₹{ticket.totalAmount}
                    </TableCell>
                    <TableCell align="right">
                      <span
                        className={`px-4 py-1.5 rounded-full text-[10px] font-black tracking-wider uppercase inline-block shadow-sm ${
                          ticket.paymentStatus === "Paid"
                            ? "bg-green-100 text-green-700 border border-green-200"
                            : "bg-yellow-100 text-yellow-700 border border-yellow-200"
                        }`}
                      >
                        {ticket.paymentStatus}
                      </span>
                    </TableCell>
                  </TableRow>
                ))}
                {tickets.length === 0 && (
                  <TableRow>
                    <TableCell
                      colSpan={6}
                      align="center"
                      sx={{ py: 10, color: "text.secondary" }}
                    >
                      No bookings yet.
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </TableContainer>
        </div>
      </div>
    </div>
  );
};

// --- HELPER COMPONENTS ---

// KPI Metric Card
const MetricCard = ({ icon, label, value, color }) => {
    const colors = {
        green: "bg-green-100 text-green-600",
        blue: "bg-blue-100 text-blue-600",
        yellow: "bg-yellow-100 text-yellow-600",
        purple: "bg-purple-100 text-purple-600"
    };
    return (
        <div className="bg-white p-6 rounded-[2rem] shadow-sm border border-gray-100 flex items-center gap-4 group hover:shadow-md transition-all">
            <div className={`${colors[color]} p-4 rounded-2xl group-hover:scale-110 transition-transform`}>{icon}</div>
            <div>
                <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest">{label}</p>
                <h3 className="text-2xl font-black text-gray-800 tracking-tighter">{value}</h3>
            </div>
        </div>
    );
};

// Reusable Custom MUI TextField wrapper for the form
const MuiInput = ({ ...props }) => (
  <TextField 
    variant="outlined" 
    fullWidth 
    size="small"
    color="success"
    sx={{ 
      mb: 2, 
      bgcolor: '#f8fafc',
      '& .MuiOutlinedInput-root': { borderRadius: 3 } 
    }} 
    {...props} 
  />
);

// Reusable Custom MUI Select wrapper for the form
const MuiSelect = ({ options, ...props }) => (
  <TextField 
    select
    variant="outlined" 
    fullWidth 
    size="small"
    color="success"
    sx={{ 
      mb: 2, 
      bgcolor: '#f8fafc',
      '& .MuiOutlinedInput-root': { borderRadius: 3 } 
    }} 
    {...props}
  >
    {options.map((opt) => (
      <MenuItem key={opt} value={opt}>{opt}</MenuItem>
    ))}
  </TextField>
);

export default Admin;