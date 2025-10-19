import { useState } from 'react';
import { motion } from 'framer-motion';
import { Calendar, Users, X } from 'lucide-react';

const BookingModal = ({ event, onClose, onConfirm }) => {
  const [quantity, setQuantity] = useState(1);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    await onConfirm(event.id, quantity);
    setLoading(false);
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50"
      onClick={onClose}
    >
      <motion.div
        initial={{ scale: 0.9 }}
        animate={{ scale: 1 }}
        exit={{ scale: 0.9 }}
        className="bg-white rounded-2xl p-6 max-w-md w-full"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-2xl font-bold text-gray-800">Book Event</h2>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
            <X className="w-6 h-6" />
          </button>
        </div>

        <div className="mb-6">
          <h3 className="font-semibold text-lg mb-2">{event.title}</h3>
          <p className="text-gray-600 text-sm mb-4">{event.description}</p>
          <div className="space-y-2 text-sm text-gray-600">
            <div className="flex items-center">
              <Calendar className="w-4 h-4 mr-2" />
              {new Date(event.date).toLocaleDateString()}
            </div>
            <div className="flex items-center">
              <Users className="w-4 h-4 mr-2" />
              {event.available_seats} seats available
            </div>
          </div>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Number of Tickets
            </label>
            <input
              type="number"
              min="1"
              max={event.available_seats}
              value={quantity}
              onChange={(e) => setQuantity(parseInt(e.target.value))}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none"
            />
          </div>

          <div className="bg-gray-50 rounded-lg p-4 mb-6">
            <div className="flex justify-between items-center mb-2">
              <span className="text-gray-600">Price per ticket:</span>
              <span className="font-semibold">${event.price}</span>
            </div>
            <div className="flex justify-between items-center text-lg font-bold">
              <span>Total:</span>
              <span className="text-purple-600">${(event.price * quantity).toFixed(2)}</span>
            </div>
          </div>

          <div className="flex gap-3">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={loading}
              className="flex-1 bg-gradient-to-r from-purple-600 to-pink-500 text-white px-4 py-2 rounded-lg font-semibold hover:shadow-lg transition-all disabled:opacity-50"
            >
              {loading ? 'Processing...' : 'Confirm Booking'}
            </button>
          </div>
        </form>
      </motion.div>
    </motion.div>
  );
};

export default BookingModal;