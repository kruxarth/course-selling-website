import { Button } from "@/components/ui/button";
import { GalleryVerticalEnd, BookOpen, Users, Award, User, Github } from "lucide-react";
import { Link } from "react-router";

export function Landing() {
	return (
		<>
			<div className="min-h-screen pt-4" style={{ backgroundColor: "#FFFBEB" }}>
				{/* Header */}

				<div className="border border-gray-300 flex flex-row justify-between rounded-4xl px-5 py-2 mx-100">
					{/* logo+ text */}
					<div className="flex flex-row gap-2 p-1 m-1">
						<div className="flex items-center justify-center mt-2 rounded-xl h-10 w-10 bg-[#FFE64D]">
							<GalleryVerticalEnd size={25} />
						</div>
						<span className="font-semibold text-2xl p-1 mt-2">Koursera</span>
					</div>

					{/* signup + login */}
					<div className="flex flex-row gap-2 m-2 p-2">
						<Link
							to={"/login"}
							className="text-gray-500 hover:text-gray-800 p-2 flex items-center font-normal rounded-lg transition-colors">
							Login
						</Link>
						<Link
							to={"/signup"}
							className="text-gray-800 font-sans rounded-lg p-2 flex items-center transition-colors hover:brightness-95 bg-[#FFE64D]">
							Signup
						</Link>
					</div>
				</div>

				{/* CTA */}
				<div>
					<section className="flex flex-col col-span-4 items-center justify-center mb-20">
						<div className="bg-[#FFE64D] border rounded-3xl p-1.5 mt-30 mb-10">
							🎓 Practise Project
						</div>

						<div className="text-7xl font-bold tracking-tight ">
							Learn without limits,
						</div>
						<div
							className="text-7xl font-serif text-[#D4A800] italic mb-10 bg-gradient-to-r from-yellow-500 via-orange-400 to-yellow-200 bg-[length:300%_300% bg-clip-text text-transparent animate-gradient] tracking-tight
							relative inline-block
							 font-bold
							after:absolute after:left-0 after:-bottom-2
							after:h-1 after:w-full
							after:bg-amber-200
												">
							Grow without Boundaries
						</div>
						<div className="font-light text-gray-600">
							A course selling platform built for learning and practice. Explore
							courses, manage content, and understand how modern web apps work.
						</div>
						<div className="flex flex-row row-span-2">
							<Link to={"signup"} className="border bg-amber-300 rounded-2xl m-5 p-5  text-xl shadow-lg items-center-safe">
								Get Started
							</Link>
							<Link  to={"/login"} className="border bg-white border-gray rounded-2xl m-5 p-3 font-sans text-xl flex items-center-safe ">
								I have an account
							</Link>
						</div>
					</section>
				</div>

				{/* section */}
				<div className="flex flex-col col-span-3 items-center justify-center bg-[#FFFDF5] m-3 p-20">
					<div className="text-3xl font-semibold ">What You Can Do Here</div>
					<div className="font-light text-gray-400 p-5 m-2">
						This project demonstrates core features of a course selling platform
					</div>
					<div className="flex flex-row row-span-3 gap-8 px-60 py-4 mx-10">
						<div className=" flex flex-col col-span-3 border border-yellow-300 shadow-yellow-100 shadow-sm bg-white p-6 rounded-2xl hover:shadow-lg ">
							<div className="bg-[#FFE64D] flex items-center justify-center size-14 rounded-2xl mb-3">
								<BookOpen size={30} />
							</div>
							<div className="text-2xl font-normal py-2">Browse Courses</div>
							<div>
								Explore a variety of courses with detailed descriptions,
								pricing, and content previews.
							</div>
						</div>
						<div className=" flex flex-col col-span-3 border border-yellow-300 shadow-yellow-100 shadow-sm bg-white p-6 rounded-2xl hover:shadow-lg ">
							<div className="bg-[#FFE64D] flex items-center justify-center size-14 rounded-2xl mb-3">
								<User size={30} />
							</div>
							<div className="text-2xl font-medium py-2">
								User & Admin Roles
							</div>
							<div>
								Experience both user and admin functionalities with separate
								dashboards and permissions.
							</div>
						</div>
						<div className=" flex flex-col col-span-3 border border-yellow-300 shadow-yellow-100 shadow-sm bg-white p-6 rounded-2xl hover:shadow-lg ">
							<div className="bg-[#FFE64D] flex items-center justify-center size-14 rounded-2xl mb-3">
								<Award size={30} />
							</div>
							<div className="text-2xl font-medium py-2 ">
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
				<div className="bg-[#FFFBEB] flex justify-center">
					<div className="bg-[#FFE64D] flex flex-col col-span-3 items-center rounded-2xl w-200 h-70 m-10">
						<div className="text-4xl font-semibold p-2 mt-8">
							📝 This is a Practise Project
						</div>
						<div className="flex justify-center items-center p-2 mt-2 ml-6 font-light">
							This course selling website was created as a learning exercise to
							understand full-stack web development. Feel free to explore, test
							features, and learn from the codebase!
						</div>
						<div className="flex flex-row row-span-2 gap-10 mt-4">
							<div>
								<Button size={"lg"} variant={"default"}>
                  <Link to={"/signup"}>
                  Create an Account
                  </Link>
									
								</Button>
							</div>
							<div>
								<Button size={"lg"} className="bg-white text-black hover:bg-gray-200">
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
				<div className="flex flex-col col-span-2 bg-[#101828] min-h-max">
					<div className="flex flex-row row-span-3 justify-around p-1 mt-10">
						<div className="flex justify-center items-center gap-2">
							<div className="bg-[#FFE64D] size-8 rounded-sm flex items-center justify-center">
								<GalleryVerticalEnd />
							</div>
							<div className="text-white text-lg">Koursera</div>
						</div>
						<div className="text-gray-200 font-light">
							A practise project for learning full stack development
						</div>
						<div className="flex flex-row row-span-2 gap-3 p-1">
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
