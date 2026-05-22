import { Button } from "@/components/ui/button";
import { GalleryVerticalEnd, BookOpen, Users, Award, User, Github } from "lucide-react";
import { Link } from "react-router";

export function Landing() {
	return (
		<>
			<div className="min-h-screen overflow-x-hidden pt-4" style={{ backgroundColor: "#FFFBEB" }}>
				{/* Header */}

				<div className="mx-4 flex items-center justify-between gap-3 rounded-3xl border border-gray-300 px-3 py-2 sm:mx-6 sm:px-5 lg:mx-auto lg:max-w-5xl">
					{/* logo+ text */}
					<div className="flex min-w-0 items-center gap-2">
						<div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[#FFE64D]">
							<GalleryVerticalEnd size={25} />
						</div>
						<span className="truncate text-xl font-semibold sm:text-2xl">Koursera</span>
					</div>

					{/* signup + login */}
					<div className="flex shrink-0 items-center gap-1 sm:gap-2">
						<Link
							to={"/login"}
							className="flex items-center rounded-lg p-2 font-normal text-gray-500 transition-colors hover:text-gray-800">
							Login
						</Link>
						<Link
							to={"/signup"}
							className="flex items-center rounded-lg bg-[#FFE64D] p-2 font-sans text-gray-800 transition-colors hover:brightness-95">
							Signup
						</Link>
					</div>
				</div>

				{/* CTA */}
				<div>
					<section className="mx-auto mb-14 flex max-w-6xl flex-col items-center justify-center px-4 text-center sm:mb-20">
						<div className="mb-6 mt-14 rounded-3xl border bg-[#FFE64D] px-3 py-1.5 text-sm sm:mt-24 sm:mb-10 sm:text-base">
							🎓 Practise Project
						</div>

						<div className="text-4xl font-bold leading-tight tracking-tight sm:text-5xl lg:text-7xl">
							Learn without limits,
						</div>
						<div
							className="mb-6 text-4xl font-serif text-[#D4A800] italic bg-gradient-to-r from-yellow-500 via-orange-400 to-yellow-200 bg-[length:300%_300% bg-clip-text text-transparent animate-gradient] leading-tight tracking-tight sm:mb-10 sm:text-5xl lg:text-7xl
							relative inline-block
							 font-bold
							after:absolute after:left-0 after:-bottom-2
							after:h-1 after:w-full
							after:bg-amber-200
												">
							Grow without Boundaries
						</div>
						<div className="max-w-2xl font-light text-gray-600 sm:text-lg">
							A course selling platform built for learning and practice. Explore
							courses, manage content, and understand how modern web apps work.
						</div>
						<div className="mt-8 flex w-full flex-col gap-3 sm:w-auto sm:flex-row">
							<Link to={"signup"} className="rounded-2xl border bg-amber-300 px-6 py-4 text-lg shadow-lg sm:text-xl">
								Get Started
							</Link>
							<Link  to={"/login"} className="rounded-2xl border border-gray-300 bg-white px-6 py-4 font-sans text-lg sm:text-xl">
								I have an account
							</Link>
						</div>
					</section>
				</div>

				{/* section */}
				<div className="mx-3 flex flex-col items-center justify-center bg-[#FFFDF5] px-4 py-12 text-center sm:px-8 lg:p-20">
					<div className="text-2xl font-semibold sm:text-3xl">What You Can Do Here</div>
					<div className="max-w-2xl p-4 font-light text-gray-500 sm:p-5">
						This project demonstrates core features of a course selling platform
					</div>
					<div className="grid w-full max-w-6xl gap-5 py-4 text-left md:grid-cols-3 lg:gap-8">
						<div className="flex flex-col border border-yellow-300 bg-white p-6 shadow-sm shadow-yellow-100 hover:shadow-lg rounded-2xl">
							<div className="bg-[#FFE64D] flex items-center justify-center size-14 rounded-2xl mb-3">
								<BookOpen size={30} />
							</div>
							<div className="py-2 text-xl font-normal sm:text-2xl">Browse Courses</div>
							<div>
								Explore a variety of courses with detailed descriptions,
								pricing, and content previews.
							</div>
						</div>
						<div className="flex flex-col border border-yellow-300 bg-white p-6 shadow-sm shadow-yellow-100 hover:shadow-lg rounded-2xl">
							<div className="bg-[#FFE64D] flex items-center justify-center size-14 rounded-2xl mb-3">
								<User size={30} />
							</div>
							<div className="py-2 text-xl font-medium sm:text-2xl">
								User & Admin Roles
							</div>
							<div>
								Experience both user and admin functionalities with separate
								dashboards and permissions.
							</div>
						</div>
						<div className="flex flex-col border border-yellow-300 bg-white p-6 shadow-sm shadow-yellow-100 hover:shadow-lg rounded-2xl">
							<div className="bg-[#FFE64D] flex items-center justify-center size-14 rounded-2xl mb-3">
								<Award size={30} />
							</div>
							<div className="py-2 text-xl font-medium sm:text-2xl">
								Full Stack Learning
							</div>
							<div>
								Built with React, Express, MongoDB, and more — a complete
								learning experience
							</div>
						</div>
					</div>
				</div>

				{/* section 1 */}
				<div className="flex justify-center bg-[#FFFBEB] px-4 py-10">
					<div className="flex w-full max-w-4xl flex-col items-center rounded-2xl bg-[#FFE64D] p-6 text-center sm:p-10">
						<div className="text-2xl font-semibold sm:text-4xl">
							📝 This is a Practise Project
						</div>
						<div className="mt-4 max-w-3xl font-light">
							This course selling website was created as a learning exercise to
							understand full-stack web development. Feel free to explore, test
							features, and learn from the codebase!
						</div>
						<div className="mt-6 flex w-full flex-col gap-3 sm:w-auto sm:flex-row sm:gap-6">
							<div>
								<Button size={"lg"} variant={"default"} className="w-full sm:w-auto">
                  <Link to={"/signup"}>
                  Create an Account
                  </Link>
									
								</Button>
							</div>
							<div>
								<Button size={"lg"} className="w-full bg-white text-black hover:bg-gray-200 sm:w-auto">
									{" "}
									<Link to={"/login"}>
                  Login to explore
                  </Link>
								</Button>
								
							</div>
						</div>
					</div>
				</div>
				{/* footer */}
				<div className="flex min-h-max flex-col bg-[#101828]">
					<div className="mx-auto mt-10 flex w-full max-w-6xl flex-col items-center gap-6 px-4 text-center sm:flex-row sm:justify-between sm:text-left">
						<div className="flex justify-center items-center gap-2">
							<div className="bg-[#FFE64D] size-8 rounded-sm flex items-center justify-center">
								<GalleryVerticalEnd />
							</div>
							<div className="text-white text-lg">Koursera</div>
						</div>
						<div className="text-gray-200 font-light">
							A practise project for learning full stack development
						</div>
						<div className="flex items-center gap-3 p-1">
							<Link to={"https://github.com/kruxarth/course-selling-website"} className="text-white cursor-pointer" >
                
                View on Github</Link>
							<div>
								<Github color="white" />
							</div>
						</div>
					</div>
					<div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-500 text-sm p-10">
						Built with ❤️ for learning purposes • React • Express • MongoDB • Tailwind CSS
					</div>
				</div>
			</div>
		</>
	);
}
