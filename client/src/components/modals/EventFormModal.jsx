import { motion } from "framer-motion";
import { X } from "lucide-react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useEffect } from "react";

// Validation Schema
const eventSchema = yup.object().shape({
  title: yup.string().required("Title is required"),
  description: yup.string().max(500, "Description is too long"),
  date: yup.string().required("Date is required"),
  time: yup.string().required("Time is required"),
  location: yup.string().required("Location is required"),
  price: yup
    .number()
    .typeError("Price must be a number")
    .min(0, "Price cannot be negative")
    .required("Price is required"),
  available_seats: yup
    .number()
    .typeError("Available seats must be a number")
    .integer("Must be an integer")
    .min(1, "At least one seat required")
    .required("Available seats are required"),
  image: yup.string().url("Enter a valid image URL"),
});

const EventFormModal = ({ event, onClose, onSave }) => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: yupResolver(eventSchema),
    defaultValues: event || {
      title: "",
      description: "",
      location: "",
      date: "",
      time: "",
      price: "",
      image: "",
      available_seats: "",
    },
  });

  // Reset form when event changes (Edit mode)
  useEffect(() => {
    if (event) reset(event);
  }, [event, reset]);

  const onSubmit = async (data) => {
    await onSave(data);
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50 overflow-y-auto"
      onClick={onClose}
    >
      <motion.div
        initial={{ scale: 0.9 }}
        animate={{ scale: 1 }}
        exit={{ scale: 0.9 }}
        className="bg-white rounded-2xl p-6 max-w-2xl w-full my-8"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold text-gray-800">
            {event ? "Edit Event" : "Create New Event"}
          </h2>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          {/* Title */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Title
            </label>
            <input
              type="text"
              {...register("title")}
              className={`w-full px-4 py-2 border rounded-lg outline-none focus:ring-2 focus:ring-purple-500 ${
                errors.title ? "border-red-400" : "border-gray-300"
              }`}
            />
            {errors.title && (
              <p className="text-red-500 text-sm mt-1">{errors.title.message}</p>
            )}
          </div>

          {/* Description */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Description
            </label>
            <textarea
              {...register("description")}
              rows="3"
              className={`w-full px-4 py-2 border rounded-lg outline-none focus:ring-2 focus:ring-purple-500 ${
                errors.description ? "border-red-400" : "border-gray-300"
              }`}
            />
            {errors.description && (
              <p className="text-red-500 text-sm mt-1">
                {errors.description.message}
              </p>
            )}
          </div>

          {/* Date & Time */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Date
              </label>
              <input
                type="date"
                {...register("date")}
                className={`w-full px-4 py-2 border rounded-lg outline-none focus:ring-2 focus:ring-purple-500 ${
                  errors.date ? "border-red-400" : "border-gray-300"
                }`}
              />
              {errors.date && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.date.message}
                </p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Time
              </label>
              <input
                type="time"
                {...register("time")}
                className={`w-full px-4 py-2 border rounded-lg outline-none focus:ring-2 focus:ring-purple-500 ${
                  errors.time ? "border-red-400" : "border-gray-300"
                }`}
              />
              {errors.time && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.time.message}
                </p>
              )}
            </div>
          </div>

          {/* Location */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Location
            </label>
            <input
              type="text"
              {...register("location")}
              className={`w-full px-4 py-2 border rounded-lg outline-none focus:ring-2 focus:ring-purple-500 ${
                errors.location ? "border-red-400" : "border-gray-300"
              }`}
            />
            {errors.location && (
              <p className="text-red-500 text-sm mt-1">
                {errors.location.message}
              </p>
            )}
          </div>

          {/* Price & Seats */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Price
              </label>
              <input
                type="number"
                step="0.01"
                {...register("price")}
                className={`w-full px-4 py-2 border rounded-lg outline-none focus:ring-2 focus:ring-purple-500 ${
                  errors.price ? "border-red-400" : "border-gray-300"
                }`}
              />
              {errors.price && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.price.message}
                </p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Available Seats
              </label>
              <input
                type="number"
                {...register("available_seats")}
                className={`w-full px-4 py-2 border rounded-lg outline-none focus:ring-2 focus:ring-purple-500 ${
                  errors.available_seats ? "border-red-400" : "border-gray-300"
                }`}
              />
              {errors.available_seats && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.available_seats.message}
                </p>
              )}
            </div>
          </div>

          {/* Image */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Image URL
            </label>
            <input
              type="url"
              {...register("image")}
              className={`w-full px-4 py-2 border rounded-lg outline-none focus:ring-2 focus:ring-purple-500 ${
                errors.image ? "border-red-400" : "border-gray-300"
              }`}
            />
            {errors.image && (
              <p className="text-red-500 text-sm mt-1">{errors.image.message}</p>
            )}
          </div>

          {/* Buttons */}
          <div className="flex gap-3 pt-4">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isSubmitting}
              className="flex-1 bg-gradient-to-r from-purple-600 to-pink-500 text-white px-4 py-2 rounded-lg font-semibold hover:shadow-lg transition-all disabled:opacity-50"
            >
              {isSubmitting ? "Saving..." : "Save Event"}
            </button>
          </div>
        </form>
      </motion.div>
    </motion.div>
  );
};

export default EventFormModal;
