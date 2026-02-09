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
import { useState } from "react"
import { useMutation } from "@tanstack/react-query"
import { signupUser, signupAdmin } from "@/api/auth.api"
import { useNavigate } from "react-router-dom"

export function SignupForm({
  className,
  ...props
}) {
  const navigate = useNavigate()

  const [firstName, setFirstName] = useState("")
  const [lastName, setLastName] = useState("")
  const [password, setPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")
  const [email, setEmail] = useState("")
  const [error, setError] = useState("")
  const [role, setRole] = useState("user")

  const signupMutation = useMutation({
    mutationFn: ({role, ...payload})=> {
      console.log("Role:", role, "Payload:", payload)
      return role === "admin" ? signupAdmin(payload) : signupUser(payload)
    },
    onSuccess: (data) => {
      console.log("Signup successful:", data)
      navigate("/login")
    },
    onError: (error) => {
      console.log("Signup error:", error)
      setError(error.response?.data?.message || error.response?.data?.error || "Signup failed")
    }
  })

  const handleSubmit = (e) => {
    e.preventDefault()
    setError("")

    if (password !== confirmPassword) {
      setError("Passwords do not match")
      return
    }

    if (password.length < 8) {
      setError("Password must be at least 8 characters long")
      return
    }

    signupMutation.mutate({
      firstName,
      lastName,
      email,
      password,
      role
    })
  }


  return (
    <form onSubmit={handleSubmit} className={cn("flex flex-col gap-6", className)} {...props}>
      <FieldGroup>
        <div className="flex flex-col items-center gap-1 text-center">
          <h1 className="text-2xl font-bold">Create your account</h1>
          <p className="text-muted-foreground text-sm text-balance">
            Fill in the form below to create your account
          </p>
        </div>

        {error && (
          <div className="bg-red-50 text-red-600 text-sm p-3 rounded-md border border-red-200">
            {error}
          </div>
        )}

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



        <div className="grid grid-cols-2 gap-4">
          <Field>
            <FieldLabel htmlFor="firstName">First Name</FieldLabel>
            <Input 
              id="firstName" 
              type="text" 
              placeholder="John" 
              required 
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
            />
          </Field>
          <Field>
            <FieldLabel htmlFor="lastName">Last Name</FieldLabel>
            <Input 
              id="lastName" 
              type="text" 
              placeholder="Doe" 
              required 
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
            />
          </Field>
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
          <FieldLabel htmlFor="password">Password</FieldLabel>
          <Input 
            id="password" 
            type="password" 
            required 
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <FieldDescription>
            Must be at least 8 characters long.
          </FieldDescription>
        </Field>
        <Field>
          <FieldLabel htmlFor="confirm-password">Confirm Password</FieldLabel>
          <Input 
            id="confirm-password" 
            type="password" 
            required 
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
          />
          <FieldDescription>Please confirm your password.</FieldDescription>
        </Field>
        <Field>
          <Button type="submit" disabled={signupMutation.isPending}>
            {signupMutation.isPending ? "Creating Account..." : "Create Account"}
          </Button>
        {/* </Field>
        <FieldSeparator>Or continue with</FieldSeparator>
        <Field> */}
          {/* <Button variant="outline" type="button">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
              <path
                d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12"
                fill="currentColor" />
            </svg>
            Sign up with GitHub
          </Button> */}
          {/* <FieldDescription className="px-6 text-center">
            Already have an account? <a href="#">Sign in</a>
          </FieldDescription> */}
        </Field>
      </FieldGroup>
    </form>
  );
}
