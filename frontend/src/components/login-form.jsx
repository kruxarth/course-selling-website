import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import {
  Field,
  FieldDescription,
  FieldGroup,
  FieldLabel,
  FieldSeparator,
} from "@/components/ui/field"
import { Input } from "@/components/ui/input"
import { useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { signinAdmin, signinUser } from "@/api/auth.api";
import { useNavigate } from "react-router-dom";

export function LoginForm({
  className,
  ...props
}) {


const navigate = useNavigate();

const [email, setEmail] = useState("");
const [password, setPassword] = useState("");
const [role, setRole] = useState("user");

// const {
//   mutate: login,
//   isPending,
//   isError,
//   error
// } = useMutation({
//   mutationFn: ({role, ...payload})=>
//     role === "admin"?  signinAdmin(payload) : signinUser(payload),
//   onSuccess: (data)=> {
//     console.log("Login success:", data)
//     localStorage.setItem("token", data.token)
//     navigate("/dashboard")
//   },
//   onError: (err)=>{
//     console.error(err);
//   },
// })



const {
	mutate: login,
	isPending,
	isError,
	error
} = useMutation({
	mutationFn: ({role, ...payload})=>
		role === "admin"
		? signinAdmin(payload)
		: signinUser(payload),

		onSuccess: (data, variables)=>{
			console.log("login success:", data)

			// store token in the correct key depending on role
			if (variables.role === "admin") {
				localStorage.setItem("admin-token", data.token);
			} else {
				localStorage.setItem("token", data.token);
			}

			if(variables.role === "admin"){
				navigate("/admin/dashboard")
			}else{
				navigate("/dashboard")
			}
		},

	onError: (err)=>{
		console.error(err);
	}
})





const handleSubmit = (e) => {
  e.preventDefault()
  login({email, password, role})
}


  return (
		<form
			onSubmit={handleSubmit}
			className={cn("flex flex-col gap-6", className)}
			{...props}>
			<FieldGroup>
				<div className="flex flex-col items-center gap-1 text-center">
					<h1 className="text-2xl font-bold">Login to your account</h1>
					<p className="text-muted-foreground text-sm text-balance">
						Enter your email below to login to your account
					</p>
				</div>
				<Field>
					<FieldLabel htmlFor="email">Email</FieldLabel>
					<Input
						id="email"
						type="email"
						placeholder="m@example.com"
						required
						value={email}
						onChange={(e) => setEmail(e.target.value)}
					/>
				</Field>
				<Field>
					<div className="flex items-center">
						<FieldLabel htmlFor="password">Password</FieldLabel>
						<a
							href="#"
							className="ml-auto text-sm underline-offset-4 hover:underline">
							Forgot your password?
						</a>
					</div>
					<Input
						id="password"
						type="password"
						required
						value={password}
						onChange={(e) => setPassword(e.target.value)}
					/>
				</Field>

				<Field>
					<FieldLabel>Select Role</FieldLabel>

					<div className="flex flex-col gap-3 border border-white rounded-sm  justify-between">
						<label className="flex items-center gap-2 cursor-pointer">
							<input
								type="radio"
								name="role"
								value="user"
								checked={role === "user"}
								onChange={() => setRole("user")}
							/>
							<span>User</span>
						</label>

						<label className="flex items-center gap-2 cursor-pointer">
							<input
								type="radio"
								name="role"
								value="admin"
								checked={role === "admin"}
								onChange={() => setRole("admin")}
							/>
							<span>Admin</span>
						</label>
					</div>
				</Field>

				{isError && (
					<p className="text-sm text-red-500 text-center">
						{error.response?.data?.message || "Login failed"}
					</p>
				)}

				<Field>
					<Button type="submit" disabled={isPending} className="w-full">
						{" "}
						{isPending ? "Logging in" : "Login"}
					</Button>
				</Field>
				{/* <FieldSeparator>Or continue with</FieldSeparator> */}
				<Field>
					<FieldDescription className="text-center">
						Don&apos;t have an account?{" "}
						<a href="signup" className="underline underline-offset-4">
							Sign up
						</a>
					</FieldDescription>
				</Field>
			</FieldGroup>
		</form>
	);
}
