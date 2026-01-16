import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import {
  PlayArrow,
  Info,
  Add,
  ChevronLeft,
  ChevronRight,
  Star,
  TrendingUp,
  Whatshot,
  Movie,
  LocalFireDepartment,
} from "@mui/icons-material";
import "./HeroSection.css";

const HeroSection = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isHovered, setIsHovered] = useState(false);

  const heroMovies = [
    {
      id: 1,
      title: "Dune: Part Two",
      description:
        "Paul Atreides unites with Chani and the Fremen while seeking revenge against the conspirators who destroyed his family.",
      year: 2024,
      rating: 8.7,
      genre: ["Sci-Fi", "Adventure"],
      bgImage:
        "https://images.unsplash.com/photo-1534447677768-be436bb09401?ixlib=rb-4.0.3&auto=format&fit=crop&w=2090&q=80",
    },
    {
      id: 2,
      title: "Oppenheimer",
      description:
        "The story of American scientist J. Robert Oppenheimer and his role in the development of the atomic bomb.",
      year: 2023,
      rating: 8.3,
      genre: ["Biography", "Drama"],
      bgImage:
        "https://images.unsplash.com/photo-1536440136628-849c177e76a1?ixlib=rb-4.0.3&auto=format&fit=crop&w=2025&q=80",
    },
    {
      id: 3,
      title: "Spider-Man: Across the Spider-Verse",
      description:
        "Miles Morales catapults across the multiverse, where he encounters a team of Spider-People charged with protecting its very existence.",
      year: 2023,
      rating: 8.7,
      genre: ["Animation", "Action"],
      bgImage:
        "https://images.unsplash.com/photo-1595769812725-4c6564f7528b?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80",
    },
    {
      id: 4,
      title: "Interstellar",
      description:
        "A team of explorers travel through a wormhole in space in an attempt to ensure humanity's survival.",
      year: 2014,
      rating: 8.6,
      genre: ["Adventure", "Drama"],
      bgImage:
        "https://images.unsplash.com/photo-1446776653964-20c1d3a81b06?ixlib=rb-4.0.3&auto=format&fit=crop&w=2071&q=80",
    },
  ];

  const trendingTexts = [
    "Personalized Movie Recommendations",
    "Discover Hidden Gems",
    "Based on Your Taste",
    "AI-Powered Suggestions",
    "Tailored Just For You",
  ];

  const [currentTextIndex, setCurrentTextIndex] = useState(0);
  const [displayedText, setDisplayedText] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);
  const [typingSpeed, setTypingSpeed] = useState(100);

  // Text typing animation
  useEffect(() => {
    const currentFullText = trendingTexts[currentTextIndex];

    const handleTyping = () => {
      if (!isDeleting) {
        // Typing forward
        if (displayedText.length < currentFullText.length) {
          setDisplayedText(
            currentFullText.substring(0, displayedText.length + 1)
          );
          setTypingSpeed(100);
        } else {
          // Pause at the end of typing
          setTimeout(() => setIsDeleting(true), 1500);
        }
      } else {
        // Deleting backward
        if (displayedText.length > 0) {
          setDisplayedText(
            currentFullText.substring(0, displayedText.length - 1)
          );
          setTypingSpeed(50);
        } else {
          // Move to next text
          setIsDeleting(false);
          setCurrentTextIndex(
            (prevIndex) => (prevIndex + 1) % trendingTexts.length
          );
          setTypingSpeed(500); // Pause before starting next text
        }
      }
    };

    const timer = setTimeout(handleTyping, typingSpeed);
    return () => clearTimeout(timer);
  }, [displayedText, isDeleting, currentTextIndex, typingSpeed, trendingTexts]);

  // Auto slide hero
  useEffect(() => {
    if (!isHovered) {
      const interval = setInterval(() => {
        setCurrentSlide((prev) => (prev + 1) % heroMovies.length);
      }, 5000);
      return () => clearInterval(interval);
    }
  }, [isHovered, heroMovies.length]);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % heroMovies.length);
  };

  const prevSlide = () => {
    setCurrentSlide(
      (prev) => (prev - 1 + heroMovies.length) % heroMovies.length
    );
  };

  const currentMovie = heroMovies[currentSlide];

  return (
    <section
      className="hero-section"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Background Image with Gradient Overlay */}
      <div className="hero-background">
        <img
          src={currentMovie.bgImage}
          alt={currentMovie.title}
          className="background-image"
        />
        <div className="gradient-overlay"></div>
        <div className="gradient-overlay-bottom"></div>
      </div>

      {/* Animated Text Slider */}
      <div className="text-animation-container">
        <div className="text-slider-wrapper">
          <div className="trending-badge">
            <TrendingUp className="trending-icon" />
            <span>TRENDING NOW</span>
          </div>
          <h1 className="animated-text">
            <span className="text-prefix">Discover</span>
            <span className="typing-text">
              {displayedText}
              <span className="cursor">|</span>
            </span>
          </h1>
        </div>
      </div>

      {/* Main Hero Content */}
      <div className="hero-content">
        <div className="container">
          {/* Movie Info */}
          <div className="movie-info">
            <div className="movie-tags">
              <span className="tag featured">
                <LocalFireDepartment className="tag-icon" />
                FEATURED TODAY
              </span>
              <span className="tag year">
                <Movie className="tag-icon" />
                {currentMovie.year}
              </span>
              <div className="rating-tag">
                <Star className="star-icon" />
                <span className="rating">{currentMovie.rating}</span>
                <span className="rating-label">/10</span>
              </div>
            </div>

            <h2 className="movie-title">{currentMovie.title}</h2>

            <div className="genre-tags">
              {currentMovie.genre.map((g, index) => (
                <span key={index} className="genre-tag">
                  {g}
                </span>
              ))}
            </div>

            <p className="movie-description">{currentMovie.description}</p>

            {/* Action Buttons */}
            <div className="action-buttons">
              <Link
                to={`/watch/${currentMovie.id}`}
                className="btn btn-primary"
              >
                <PlayArrow className="btn-icon" />
                <span>Watch Now</span>
              </Link>
              <Link
                to={`/movie/${currentMovie.id}`}
                className="btn btn-secondary"
              >
                <Info className="btn-icon" />
                <span>More Info</span>
              </Link>
              <button className="btn btn-outline">
                <Add className="btn-icon" />
                <span>Add to Watchlist</span>
              </button>
            </div>

            {/* Stats */}
            <div className="movie-stats">
              <div className="stat">
                <Whatshot className="stat-icon" />
                <div className="stat-content">
                  <span className="stat-value">98%</span>
                  <span className="stat-label">Match</span>
                </div>
              </div>
              <div className="stat">
                <Star className="stat-icon" />
                <div className="stat-content">
                  <span className="stat-value">8.7</span>
                  <span className="stat-label">IMDb</span>
                </div>
              </div>
            </div>
          </div>

          {/* Slide Indicators */}
          <div className="slide-indicators">
            {heroMovies.map((_, index) => (
              <button
                key={index}
                className={`indicator ${index === currentSlide ? "active" : ""}`}
                onClick={() => setCurrentSlide(index)}
                aria-label={`Go to slide ${index + 1}`}
              />
            ))}
          </div>
        </div>
      </div>

      {/* Navigation Arrows */}
      <button
        className="nav-arrow prev"
        onClick={prevSlide}
        aria-label="Previous slide"
      >
        <ChevronLeft />
      </button>
      <button
        className="nav-arrow next"
        onClick={nextSlide}
        aria-label="Next slide"
      >
        <ChevronRight />
      </button>

      {/* Bottom Gradient */}
      <div className="bottom-gradient"></div>
    </section>
  );
};

export default HeroSection;
