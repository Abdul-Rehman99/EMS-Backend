import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Plus, ChevronLeft, ChevronRight } from "lucide-react";
import toast from 'react-hot-toast';
import EventCard from "../../components/EventCard";
import EventFormModal from "../../components/modals/EventFormModal";
import { useAuth } from "../../context/AuthContext";

// API Base URL - Update this to your backend URL
const API_URL = "http://localhost:8080/api";

const AdminEventsPage = () => {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [editingEvent, setEditingEvent] = useState(null);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const { token } = useAuth();

  useEffect(() => {
    fetchEvents();
  }, [page]);

  const fetchEvents = async () => {
    setLoading(true);
    try {
      const res = await fetch(`${API_URL}/events?page=${page}&limit=10`);
      const data = await res.json();
      setEvents(data.events);
      setTotalPages(data.pages);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleSaveEvent = async (formData) => {
    const toastId = toast.loading(
      editingEvent ? "Updating event..." : "Creating event..."
    );

    try {
      const url = editingEvent
        ? `${API_URL}/events/${editingEvent.id}`
        : `${API_URL}/events`;
      const method = editingEvent ? "PUT" : "POST";

      const res = await fetch(url, {
        method,
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(formData),
      });

      if (res.ok) {
        toast.success(
          editingEvent
            ? "✅ Event updated successfully!"
            : "✅ Event created successfully!",
          { id: toastId }
        );
        setShowModal(false);
        setEditingEvent(null);
        fetchEvents();
      } else {
        const data = await res.json();
        toast.error(data.message || "Failed to save event", { id: toastId });
      }
    } catch (err) {
      toast.error("Error saving event. Please try again.", { id: toastId });
    }
  };

  const handleDeleteEvent = async (eventId) => {
    if (!confirm("Are you sure you want to delete this event?")) return;

    const toastId = toast.loading("Deleting event...");

    try {
      const res = await fetch(`${API_URL}/events/${eventId}`, {
        method: "DELETE",
        headers: { Authorization: `Bearer ${token}` },
      });
      if (res.ok) {
        toast.success("Event deleted successfully!", { id: toastId });
        fetchEvents();
      } else {
        toast.error("Failed to delete event", { id: toastId });
      }
    } catch (err) {
      toast.error("Error deleting event", { id: toastId });
    }
  };

  const handleEdit = (event) => {
    setEditingEvent(event);
    setShowModal(true);
  };

  return (
    <div className="space-y-6">
      <div className="bg-white rounded-xl shadow-md p-6 flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold text-gray-800 mb-2">
            Manage Events
          </h2>
          <p className="text-gray-600">Create and manage your events</p>
        </div>
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => {
            setEditingEvent(null);
            setShowModal(true);
          }}
          className="flex items-center gap-2 bg-gradient-to-r from-purple-600 to-pink-500 text-white px-6 py-3 rounded-lg font-semibold shadow-lg hover:shadow-xl transition-all"
        >
          <Plus className="w-5 h-5" />
          Create Event
        </motion.button>
      </div>

      {loading ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[...Array(6)].map((_, i) => (
            <div
              key={i}
              className="bg-white rounded-xl shadow-lg p-4 animate-pulse"
            >
              <div className="h-48 bg-gray-300 rounded-lg mb-4"></div>
              <div className="h-6 bg-gray-300 rounded mb-2"></div>
              <div className="h-4 bg-gray-300 rounded"></div>
            </div>
          ))}
        </div>
      ) : (
        <>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {events.map((event) => (
              <EventCard
                key={event.id}
                event={event}
                onEdit={handleEdit}
                onDelete={handleDeleteEvent}
                isAdmin={true}
              />
            ))}
          </div>

          {totalPages > 1 && (
            <div className="flex justify-center items-center gap-2">
              <button
                onClick={() => setPage((p) => Math.max(1, p - 1))}
                disabled={page === 1}
                className="p-2 rounded-lg bg-white shadow hover:shadow-md disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>
              <span className="px-4 py-2 bg-white rounded-lg shadow">
                Page {page} of {totalPages}
              </span>
              <button
                onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
                disabled={page === totalPages}
                className="p-2 rounded-lg bg-white shadow hover:shadow-md disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <ChevronRight className="w-5 h-5" />
              </button>
            </div>
          )}
        </>
      )}

      <AnimatePresence>
        {showModal && (
          <EventFormModal
            event={editingEvent}
            onClose={() => {
              setShowModal(false);
              setEditingEvent(null);
            }}
            onSave={handleSaveEvent}
          />
        )}
      </AnimatePresence>
    </div>
  );
};

export default AdminEventsPage;
