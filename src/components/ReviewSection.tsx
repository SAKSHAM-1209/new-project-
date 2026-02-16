import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Star, User, Loader2, Trash2 } from "lucide-react";
import { useReviews, useCreateReview, useDeleteReview } from "@/hooks/useReviews";
import { useAuth } from "@/contexts/AuthContext";
import { toast } from "sonner";
import { formatDistanceToNow } from "date-fns";

interface ReviewSectionProps {
  venueId: string;
  averageRating: number | null;
  reviewCount: number | null;
}

const StarRating = ({
  rating,
  onRate,
  interactive = false,
  size = "md",
}: {
  rating: number;
  onRate?: (rating: number) => void;
  interactive?: boolean;
  size?: "sm" | "md" | "lg";
}) => {
  const [hovered, setHovered] = useState(0);
  const sizeClasses = {
    sm: "w-4 h-4",
    md: "w-5 h-5",
    lg: "w-6 h-6",
  };

  return (
    <div className="flex gap-1">
      {[1, 2, 3, 4, 5].map((star) => (
        <button
          key={star}
          type="button"
          disabled={!interactive}
          onClick={() => onRate?.(star)}
          onMouseEnter={() => interactive && setHovered(star)}
          onMouseLeave={() => interactive && setHovered(0)}
          className={interactive ? "cursor-pointer" : "cursor-default"}
        >
          <Star
            className={`${sizeClasses[size]} ${
              star <= (hovered || rating)
                ? "fill-accent text-accent"
                : "text-muted-foreground/30"
            } transition-colors`}
          />
        </button>
      ))}
    </div>
  );
};

const ReviewSection = ({ venueId, averageRating, reviewCount }: ReviewSectionProps) => {
  const { user } = useAuth();
  const { data: reviews, isLoading } = useReviews(venueId);
  const createReview = useCreateReview();
  const deleteReview = useDeleteReview();

  const [newRating, setNewRating] = useState(0);
  const [newComment, setNewComment] = useState("");
  const [showForm, setShowForm] = useState(false);

  const handleSubmitReview = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newRating) {
      toast.error("Please select a rating");
      return;
    }

    try {
      await createReview.mutateAsync({
        venueId,
        rating: newRating,
        comment: newComment || undefined,
      });
      toast.success("Review submitted successfully!");
      setNewRating(0);
      setNewComment("");
      setShowForm(false);
    } catch (error: any) {
      toast.error(error.message || "Failed to submit review");
    }
  };

  const handleDeleteReview = async (reviewId: string) => {
    try {
      await deleteReview.mutateAsync({ reviewId, venueId });
      toast.success("Review deleted");
    } catch (error: any) {
      toast.error(error.message || "Failed to delete review");
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.4 }}
      className="space-y-6"
    >
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h2 className="font-serif text-2xl font-bold text-foreground mb-2">
            Reviews & Ratings
          </h2>
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-2">
              <StarRating rating={Math.round(averageRating || 0)} size="md" />
              <span className="font-semibold text-foreground">
                {averageRating?.toFixed(1) || "0.0"}
              </span>
            </div>
            <span className="text-muted-foreground">
              ({reviewCount || 0} {reviewCount === 1 ? "review" : "reviews"})
            </span>
          </div>
        </div>

        {user && !showForm && (
          <button
            onClick={() => setShowForm(true)}
            className="btn-gold text-sm px-6 py-2.5"
          >
            Write a Review
          </button>
        )}
      </div>

      {/* Review Form */}
      <AnimatePresence>
        {showForm && (
          <motion.form
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            onSubmit={handleSubmitReview}
            className="bg-muted rounded-2xl p-6 space-y-4"
          >
            <div>
              <label className="block text-sm font-medium text-foreground mb-2">
                Your Rating
              </label>
              <StarRating rating={newRating} onRate={setNewRating} interactive size="lg" />
            </div>

            <div>
              <label className="block text-sm font-medium text-foreground mb-2">
                Your Review (optional)
              </label>
              <textarea
                value={newComment}
                onChange={(e) => setNewComment(e.target.value)}
                placeholder="Share your experience..."
                rows={4}
                className="input-premium resize-none"
              />
            </div>

            <div className="flex gap-3">
              <button
                type="submit"
                disabled={createReview.isPending || !newRating}
                className="flex-1 flex items-center justify-center gap-2 py-3 bg-primary text-primary-foreground rounded-xl font-medium hover:bg-primary/90 transition-colors disabled:opacity-50"
              >
                {createReview.isPending ? (
                  <Loader2 className="w-5 h-5 animate-spin" />
                ) : (
                  "Submit Review"
                )}
              </button>
              <button
                type="button"
                onClick={() => {
                  setShowForm(false);
                  setNewRating(0);
                  setNewComment("");
                }}
                className="px-6 py-3 border-2 border-border rounded-xl font-medium text-foreground hover:bg-muted transition-colors"
              >
                Cancel
              </button>
            </div>
          </motion.form>
        )}
      </AnimatePresence>

      {/* Not logged in prompt */}
      {!user && (
        <div className="bg-muted rounded-2xl p-6 text-center">
          <p className="text-muted-foreground mb-4">
            Sign in to write a review and share your experience
          </p>
          <a
            href="/auth"
            className="inline-flex items-center gap-2 px-6 py-2.5 bg-primary text-primary-foreground rounded-xl font-medium hover:bg-primary/90 transition-colors"
          >
            Sign In
          </a>
        </div>
      )}

      {/* Reviews List */}
      <div className="space-y-4">
        {isLoading ? (
          <div className="flex items-center justify-center py-12">
            <Loader2 className="w-8 h-8 animate-spin text-accent" />
          </div>
        ) : reviews && reviews.length > 0 ? (
          reviews.map((review) => (
            <motion.div
              key={review.id}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="bg-card rounded-2xl p-6 shadow-soft border border-border"
            >
              <div className="flex items-start justify-between gap-4">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-full bg-muted flex items-center justify-center overflow-hidden">
                    {review.profiles?.avatar_url ? (
                      <img
                        src={review.profiles.avatar_url}
                        alt=""
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <User className="w-6 h-6 text-muted-foreground" />
                    )}
                  </div>
                  <div>
                    <p className="font-semibold text-foreground">
                      {review.profiles?.full_name || "Anonymous"}
                    </p>
                    <div className="flex items-center gap-2 mt-1">
                      <StarRating rating={review.rating} size="sm" />
                      <span className="text-sm text-muted-foreground">
                        {formatDistanceToNow(new Date(review.created_at), { addSuffix: true })}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Delete button for own reviews */}
                {user && review.user_id === user.id && (
                  <button
                    onClick={() => handleDeleteReview(review.id)}
                    disabled={deleteReview.isPending}
                    className="p-2 text-muted-foreground hover:text-destructive transition-colors"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                )}
              </div>

              {review.comment && (
                <p className="mt-4 text-muted-foreground leading-relaxed">
                  {review.comment}
                </p>
              )}
            </motion.div>
          ))
        ) : (
          <div className="text-center py-12 text-muted-foreground">
            <p>No reviews yet. Be the first to share your experience!</p>
          </div>
        )}
      </div>
    </motion.div>
  );
};

export default ReviewSection;
