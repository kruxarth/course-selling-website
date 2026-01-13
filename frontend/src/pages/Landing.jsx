import { Link } from "react-router-dom";
import { GalleryVerticalEnd, BookOpen, Users, Award, Github } from "lucide-react";

export function Landing() {
  return (
    <div className="min-h-screen" style={{ backgroundColor: "#FFFBEB" }}>
      {/* Header */}
      <header className="border-b border-black-200">
        <div className="max-w-7xl mx-auto px-4 py-4 flex justify-between items-center">
          <div className="flex items-center gap-2 font-semibold text-lg">
            <div
              className="flex size-8 items-center justify-center rounded-md text-gray-800"
              style={{ backgroundColor: "#FFE64D" }}
            >
              <GalleryVerticalEnd className="size-5" />
            </div>
            <span className="text-gray-800">Kourera</span>
          </div>
          <nav className="flex gap-4 items-center">
            <Link
              to="/login"
              className="text-gray-700 hover:text-gray-900 px-4 py-2 rounded-lg transition-colors"
            >
              Login
            </Link>
            <Link
              to="/signup"
              className="text-gray-800 font-medium px-5 py-2 rounded-lg transition-colors hover:brightness-95"
              style={{ backgroundColor: "#FFE64D" }}
            >
              Sign Up
            </Link>
          </nav>
        </div>
      </header>

      {/* Hero Section */}
      <section className="max-w-7xl mx-auto px-4 py-24 text-center">
        <div
          className="inline-block px-4 py-1.5 rounded-full text-sm font-medium text-gray-700 mb-6"
          style={{ backgroundColor: "#FFE64D" }}
        >
          🎓 Practice Project
        </div>
        <h1 className="text-5xl md:text-6xl font-bold text-gray-800 mb-6 leading-tight">
          Learn Without Limits,
          <br />
          <span style={{ color: "#D4A800" }}>Grow Without Boundaries</span>
        </h1>
        <p className="text-xl text-gray-600 mb-10 max-w-2xl mx-auto leading-relaxed">
          A course selling platform built for learning and practice. Explore courses,
          manage content, and understand how modern web apps work.
        </p>
        <div className="flex gap-4 justify-center flex-wrap">
          <Link
            to="/signup"
            className="text-gray-800 font-semibold px-8 py-3.5 rounded-xl text-lg transition-all hover:brightness-95 hover:scale-105 shadow-lg"
            style={{ backgroundColor: "#FFE64D" }}
          >
            Get Started Free
          </Link>
          <Link
            to="/login"
            className="bg-white text-gray-700 px-8 py-3.5 rounded-xl text-lg font-semibold border-2 border-gray-200 hover:border-yellow-400 hover:bg-yellow-50 transition-all"
          >
            I Have an Account
          </Link>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-white/50">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-3xl font-bold text-center text-gray-800 mb-4">
            What You Can Do Here
          </h2>
          <p className="text-center text-gray-600 mb-12 max-w-xl mx-auto">
            This project demonstrates the core features of a course selling platform
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white p-8 rounded-2xl shadow-sm border border-yellow-100 hover:shadow-md transition-shadow">
              <div
                className="w-14 h-14 rounded-xl flex items-center justify-center mb-5"
                style={{ backgroundColor: "#FFE64D" }}
              >
                <BookOpen className="w-7 h-7 text-gray-800" />
              </div>
              <h3 className="text-xl font-semibold text-gray-800 mb-3">
                Browse Courses
              </h3>
              <p className="text-gray-600">
                Explore a variety of courses with detailed descriptions, pricing, and content previews.
              </p>
            </div>

            <div className="bg-white p-8 rounded-2xl shadow-sm border border-yellow-100 hover:shadow-md transition-shadow">
              <div
                className="w-14 h-14 rounded-xl flex items-center justify-center mb-5"
                style={{ backgroundColor: "#FFE64D" }}
              >
                <Users className="w-7 h-7 text-gray-800" />
              </div>
              <h3 className="text-xl font-semibold text-gray-800 mb-3">
                User & Admin Roles
              </h3>
              <p className="text-gray-600">
                Experience both user and admin functionalities with separate dashboards and permissions.
              </p>
            </div>

            <div className="bg-white p-8 rounded-2xl shadow-sm border border-yellow-100 hover:shadow-md transition-shadow">
              <div
                className="w-14 h-14 rounded-xl flex items-center justify-center mb-5"
                style={{ backgroundColor: "#FFE64D" }}
              >
                <Award className="w-7 h-7 text-gray-800" />
              </div>
              <h3 className="text-xl font-semibold text-gray-800 mb-3">
                Full Stack Learning
              </h3>
              <p className="text-gray-600">
                Built with React, Express, MongoDB, and more — a complete learning experience.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Practice Notice Section */}
      <section className="py-16">
        <div className="max-w-4xl mx-auto px-4">
          <div
            className="rounded-2xl p-8 md:p-12 text-center"
            style={{ backgroundColor: "#FFE64D" }}
          >
            <h2 className="text-2xl md:text-3xl font-bold text-gray-800 mb-4">
              📝 This is a Practice Project
            </h2>
            <p className="text-gray-700 text-lg mb-6 max-w-2xl mx-auto">
              This course selling website was created as a learning exercise to understand
              full-stack web development. Feel free to explore, test features, and learn
              from the codebase!
            </p>
            <div className="flex gap-4 justify-center flex-wrap">
              <Link
                to="/signup"
                className="bg-gray-800 text-white font-semibold px-6 py-3 rounded-xl hover:bg-gray-900 transition-colors"
              >
                Create an Account
              </Link>
              <Link
                to="/login"
                className="bg-white text-gray-800 font-semibold px-6 py-3 rounded-xl hover:bg-gray-50 transition-colors"
              >
                Login to Explore
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-gray-300 py-12">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-center gap-6">
            <div className="flex items-center gap-2">
              <div
                className="flex size-8 items-center justify-center rounded-md"
                style={{ backgroundColor: "#FFE64D" }}
              >
                <GalleryVerticalEnd className="size-5 text-gray-800" />
              </div>
              <span className="font-semibold text-white">Kourera</span>
            </div>

            <p className="text-gray-400 text-center">
              A practice project for learning full-stack development
            </p>

            <a
              href="https://github.com/kruxarth/course-selling-website"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 text-gray-300 hover:text-white transition-colors"
            >
              <Github className="w-5 h-5" />
              <span>View on GitHub</span>
            </a>
          </div>

          <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-500 text-sm">
            <p>
              Built with ❤️ for learning purposes • React • Express • MongoDB • Tailwind CSS
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}