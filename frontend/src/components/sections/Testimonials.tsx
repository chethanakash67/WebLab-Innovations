"use client";

import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowUpRight, Check, ChevronRight, LoaderCircle, Quote, Star } from "lucide-react";
import { testimonials } from "@/data/projects";
import SectionBadge from "@/components/ui/SectionBadge";

type TestimonialItem = {
  id: string;
  quote: string;
  author: string;
  role: string;
  rating: number;
};

type ReviewFormData = {
  name: string;
  email: string;
  role: string;
  quote: string;
};

type ReviewStatus = "idle" | "submitting" | "submitted" | "error";

async function postToApi(path: string, payload: unknown) {
  const controller = new AbortController();
  const timeout = window.setTimeout(() => controller.abort(), 25000);

  try {
    const response = await fetch(path, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
      signal: controller.signal,
    });

    const data = await response.json().catch(() => ({}));

    if (!response.ok) {
      throw new Error(data.message || "Something went wrong.");
    }

    return data;
  } catch (error) {
    if (error instanceof Error && error.name === "AbortError") {
      throw new Error("The request is taking too long. Please try again.");
    }

    throw error;
  } finally {
    window.clearTimeout(timeout);
  }
}

export default function Testimonials() {
  const sectionRef = useRef<HTMLElement>(null);
  const [current, setCurrent] = useState(0);
  const [approvedReviews, setApprovedReviews] = useState<TestimonialItem[]>([]);
  const [reviewStatus, setReviewStatus] = useState<ReviewStatus>("idle");
  const [reviewMessage, setReviewMessage] = useState("");
  const [reviewRating, setReviewRating] = useState(5);
  const [reviewFormData, setReviewFormData] = useState<ReviewFormData>({
    name: "",
    email: "",
    role: "",
    quote: "",
  });

  const staticTestimonials: TestimonialItem[] = testimonials.map((item) => ({
    id: `static-${item.id}`,
    quote: item.quote,
    author: item.author,
    role: item.role,
    rating: (item as any).rating || 5,
  }));
  const testimonialItems = [...staticTestimonials, ...approvedReviews];
  const testimonialCount = testimonialItems.length;
  const averageRating =
    testimonialCount > 0
      ? (
          testimonialItems.reduce((total, item) => total + item.rating, 0) /
          testimonialCount
        ).toFixed(1)
      : "5.0";
  const isSubmittingReview = reviewStatus === "submitting";
  const reviewSubmitted = reviewStatus === "submitted";

  useEffect(() => {
    let active = true;

    fetch("/api/reviews", { cache: "no-store" })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Unable to load reviews.");
        }

        return response.json();
      })
      .then((data) => {
        if (!active || !Array.isArray(data.reviews)) {
          return;
        }

        setApprovedReviews(
          data.reviews.map(
            (review: {
              id: number;
              name: string;
              role?: string;
              quote: string;
              rating?: number;
            }) => ({
              id: `review-${review.id}`,
              quote: review.quote,
              author: review.name,
              role: review.role || "Client",
              rating: review.rating || 5,
            }),
          ),
        );
      })
      .catch(() => {
        if (active) {
          setApprovedReviews([]);
        }
      });

    return () => {
      active = false;
    };
  }, []);

  useEffect(() => {
    if (testimonialCount <= 1) {
      return;
    }

    const timer = window.setInterval(() => {
      setCurrent((previous) => (previous + 1) % testimonialCount);
    }, 6500);

    return () => window.clearInterval(timer);
  }, [testimonialCount]);

  const testimonial = testimonialItems[current] || testimonialItems[0];
  const initials = testimonial.author
    .split(" ")
    .map((name) => name[0])
    .join("");

  const updateReviewFormData = (field: keyof ReviewFormData, value: string) => {
    setReviewFormData((currentData) => ({
      ...currentData,
      [field]: value,
    }));

    if (reviewStatus !== "idle") {
      setReviewStatus("idle");
      setReviewMessage("");
    }
  };

  const handleReviewSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    setReviewStatus("submitting");
    setReviewMessage("");

    try {
      await postToApi("/api/reviews", {
        ...reviewFormData,
        rating: reviewRating,
      });

      setReviewStatus("submitted");
      setReviewMessage("Thank you. We will check your review and publish it after approval.");
      setReviewFormData({
        name: "",
        email: "",
        role: "",
        quote: "",
      });
      setReviewRating(5);
    } catch (error) {
      setReviewStatus("error");
      setReviewMessage(
        error instanceof Error ? error.message : "We could not send your review.",
      );
    }
  };

  return (
    <section ref={sectionRef} className="testimonial-section">
      <div className="testimonial-dots" />
      <div className="testimonial-orbit" />

      <div className="testimonial-wrap">
        <header className="testimonial-header">
          <div>
            <SectionBadge label="Client Proof" number="09" />
            <h2>
              Trusted when
              <br />
              <span>it matters.</span>
            </h2>
          </div>
          <p>
            [ Partners, not passengers ]
            <br />
            Clear thinking. Direct access. Strong delivery.
          </p>
        </header>

        <div className="testimonial-layout">
          <div className="testimonial-people">
            <div className="testimonial-people-label">
              <span>Voices / {String(testimonialCount).padStart(2, "0")}</span>
              <span>Since 2023</span>
            </div>

            {testimonialItems.map((item, index) => (
              <button
                key={item.id}
                type="button"
                onClick={() => setCurrent(index)}
                className={`testimonial-person ${current === index ? "is-active" : ""}`}
              >
                <span className="testimonial-person-number">0{index + 1}</span>
                <span className="testimonial-person-avatar">
                  {item.author
                    .split(" ")
                    .map((name) => name[0])
                    .join("")}
                </span>
                <span className="testimonial-person-copy">
                  <strong>{item.author}</strong>
                  <span>{item.role}</span>
                </span>
                <ArrowUpRight className="h-4 w-4" />
              </button>
            ))}

            <div className="testimonial-rating">
              <strong>{averageRating}</strong>
              <span>★★★★★</span>
              <p>Average client rating</p>
            </div>
          </div>

          <div className="testimonial-stage">
            <div className="testimonial-stage-top">
              <span>Verified collaboration</span>
              <span>
                {String(current + 1).padStart(2, "0")} /{" "}
                {String(testimonialCount).padStart(2, "0")}
              </span>
            </div>

            <AnimatePresence mode="wait">
              <motion.div
                key={testimonial.id}
                initial={{  y: 28 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{  y: -24 }}
                transition={{ duration: 0.5, ease: "easeOut" }}
                className="testimonial-quote"
              >
                <Quote className="testimonial-quote-icon" />
                <blockquote>&ldquo;{testimonial.quote}&rdquo;</blockquote>

                <div className="testimonial-author">
                  <span className="testimonial-author-mark">{initials}</span>
                  <span>
                    <strong>{testimonial.author}</strong>
                    <small>{testimonial.role}</small>
                  </span>
                  <span className="testimonial-verified">
                    <span className="signal-dot" />
                    Verified client
                  </span>
                </div>
              </motion.div>
            </AnimatePresence>

            <div
              className="testimonial-progress"
              style={{ gridTemplateColumns: `repeat(${testimonialCount}, 1fr)` }}
              aria-hidden="true"
            >
              {testimonialItems.map((item, index) => (
                <span
                  key={item.id}
                  className={current === index ? "is-active" : ""}
                />
              ))}
            </div>
          </div>
        </div>

        <div className="testimonial-review-panel">
          <div className="testimonial-review-copy">
            <span>Add review</span>
            <h3>Share your experience.</h3>
            <p>
              Your review goes to AigleOn Labs first. After approval, it appears here.
            </p>
          </div>

          <form className="testimonial-review-form" onSubmit={handleReviewSubmit}>
            <div className="testimonial-review-grid">
              <label className="testimonial-review-field">
                <span>Suprithi</span>
                <input
                  type="text"
                  placeholder="Example: Priya"
                  required
                  value={reviewFormData.name}
                  onChange={(event) =>
                    updateReviewFormData("name", event.target.value)
                  }
                />
              </label>

              <label className="testimonial-review-field">
                <span>nsuprithi@gmail.com</span>
                <input
                  type="email"
                  placeholder="you@example.com"
                  required
                  value={reviewFormData.email}
                  onChange={(event) =>
                    updateReviewFormData("email", event.target.value)
                  }
                />
              </label>
            </div>

            <label className="testimonial-review-field">
              <span>Your business or role</span>
              <input
                type="text"
                placeholder="Example: Founder, DataFlow"
                value={reviewFormData.role}
                onChange={(event) =>
                  updateReviewFormData("role", event.target.value)
                }
              />
            </label>

            <div className="testimonial-rating-input">
              <span>Rating</span>
              <div>
                {[1, 2, 3, 4, 5].map((rating) => (
                  <button
                    key={rating}
                    type="button"
                    className={rating <= reviewRating ? "is-active" : ""}
                    onClick={() => setReviewRating(rating)}
                    aria-label={`${rating} star rating`}
                  >
                    <Star className="h-4 w-4" />
                  </button>
                ))}
              </div>
            </div>

            <label className="testimonial-review-field">
              <span>Your review</span>
              <textarea
                placeholder="Example: AigleOn Labs made our website clear, fast, and easy for customers to use."
                rows={4}
                required
                minLength={10}
                value={reviewFormData.quote}
                onChange={(event) =>
                  updateReviewFormData("quote", event.target.value)
                }
              />
            </label>

            {reviewMessage && (
              <p
                className={`testimonial-review-alert ${
                  reviewStatus === "error" ? "is-error" : "is-success"
                }`}
              >
                {reviewMessage}
              </p>
            )}

            <button
              type="submit"
              className="testimonial-review-submit"
              disabled={isSubmittingReview || reviewSubmitted}
            >
              {isSubmittingReview ? (
                <>
                  Sending
                  <LoaderCircle className="contact-spin h-4 w-4" />
                </>
              ) : reviewSubmitted ? (
                <>
                  Review sent
                  <Check className="h-4 w-4" />
                </>
              ) : (
                <>
                  Send review
                  <ArrowUpRight className="h-4 w-4" />
                </>
              )}
            </button>
          </form>
        </div>
      </div>
    </section>
  );
}
